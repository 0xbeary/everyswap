// Next.js Route Handler for fetching the latest swaps from the indexer GraphQL
import { NextResponse } from 'next/server';

// In Codespaces, use localhost since both services run in the same container
const GRAPHQL_ENDPOINT = process.env.INDEXER_GRAPHQL_URL || 'http://localhost:4000/graphql';

// Type definitions for the GraphQL response
interface Token {
  id: string;
  symbol: string;
  name: string;
  decimals: number;
}

interface Pool {
  id: string;
  token0: Token;
  token1: Token;
  feeTier: string;
  liquidity: string;
  token0Price: string;
  token1Price: string;
  volumeUSD: string;
  totalValueLockedUSD: string;
}

interface Transaction {
  id: string;
  blockNumber: number;
}

interface Swap {
  id: string;
  amount0: string;
  amount1: string;
  amountUSD: string;
  recipient: string;
  timestamp: string;
  transaction: Transaction;
  pool: Pool;
}

interface SwapsQueryResponse {
  data: {
    swaps: Swap[];
  };
  errors?: Array<{ message: string }>;
}

const LATEST_SWAPS_QUERY = `
  query LatestSwaps($limit: Int = 20) {
    swaps(orderBy: timestamp_DESC, limit: $limit) {
      id
      amount0
      amount1
      amountUSD
      recipient
      timestamp
      transaction {
        id
        blockNumber
      }
      pool {
        id
        token0 {
          id
          symbol
          name
          decimals
        }
        token1 {
          id
          symbol
          name
          decimals
        }
        feeTier
        liquidity
        token0Price
        token1Price
        volumeUSD
        totalValueLockedUSD
      }
    }
  }
`;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get('limit') || '20', 10), 100); // Cap at 100

    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: LATEST_SWAPS_QUERY,
        variables: { limit },
      }),
    });

    if (!response.ok) {
      console.error('GraphQL request failed:', response.status, response.statusText);
      return NextResponse.json(
        { error: 'Failed to fetch latest swaps from indexer' }, 
        { status: 500 }
      );
    }

    const result: SwapsQueryResponse = await response.json();
    
    if (result.errors) {
      console.error('GraphQL errors:', result.errors);
      return NextResponse.json(
        { error: 'GraphQL query failed', details: result.errors }, 
        { status: 500 }
      );
    }

    // Format the response for easier consumption and filter out swaps under $1 USD
    const formattedSwaps = result.data.swaps
      .filter((swap: Swap) => parseFloat(swap.amountUSD) > 1)
      .map((swap: Swap) => {
        // Determine if this is a buy or sell based on amount0 sign
        // Negative amount0 typically means selling token0 for token1 (sell)
        // Positive amount0 typically means buying token0 with token1 (buy)
        const isBuy = parseFloat(swap.amount0) > 0;
        
        return {
      id: swap.id,
      timestamp: swap.timestamp,
      blockNumber: swap.transaction.blockNumber,
      transactionId: swap.transaction.id,
      amounts: {
        amount0: swap.amount0,
        amount1: swap.amount1,
        amountUSD: swap.amountUSD,
        isBuy: isBuy,
        swapType: isBuy ? 'buy' : 'sell',
        amountColor: isBuy ? '#22c55e' : '#ef4444', // green for buy, red for sell
      },
      addresses: {
        recipient: swap.recipient,
      },
      pool: {
        id: swap.pool.id,
        token0: {
          symbol: swap.pool.token0.symbol,
          name: swap.pool.token0.name,
          decimals: swap.pool.token0.decimals,
        },
        token1: {
          symbol: swap.pool.token1.symbol,
          name: swap.pool.token1.name,
          decimals: swap.pool.token1.decimals,
        },
        feeTier: swap.pool.feeTier,
        liquidity: swap.pool.liquidity,
        prices: {
          token0Price: swap.pool.token0Price,
          token1Price: swap.pool.token1Price,
        },
        metrics: {
          volumeUSD: swap.pool.volumeUSD,
          totalValueLockedUSD: swap.pool.totalValueLockedUSD,
        },
      },
    };
  });

    return NextResponse.json({
      success: true,
      count: formattedSwaps.length,
      swaps: formattedSwaps,
    });

  } catch (error) {
    console.error('Error fetching latest swaps:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}
