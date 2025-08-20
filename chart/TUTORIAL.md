# Tutorial: Connecting Squid Indexer to Next.js Chart

This tutorial branch demonstrates how to connect a Squid indexer to a Next.js application to display live swap data.

## Overview

This branch shows the frontend implementation using **mock data** for tutorial purposes. The real implementation would connect to your Squid indexer's GraphQL endpoint to fetch live swap transactions.

## Current State (Tutorial Mode)

- ✅ Next.js application with modern UI components
- ✅ Data table displaying swap transactions
- ✅ Mock data with realistic token names and values
- ⚠️ **API route removed** - using static mock data instead

## What You'll Learn

1. How to structure swap data for display
2. How to build a responsive data table
3. How to format timestamps, currency amounts, and addresses
4. How to prepare your frontend for real API integration

## Mock Data Structure

The mock data (`src/data/mockSwaps.ts`) includes:

### Fun Token Names
- **MXT** (Magic Crystal Token) / **WM** (Wizard Money)
- **BUNANA** (Banana Coin) / **WM** (Wizard Money)  
- **CRIK** (Cricket Token) / **WM** (Wizard Money)
- **BUBU** (Bubble Token) / **WM** (Wizard Money)
- **NINJA** (Shadow Ninja Token) / **WM** (Wizard Money)

### Data Points
- Timestamps (recent transactions)
- USD amounts ($7.51 - $2,992.41)
- Pool information with token pairs
- Transaction hashes and recipient addresses
- Buy/sell indicators with color coding

## Next Steps: Real Implementation

To connect to a real Squid indexer, you would:

### 1. Restore API Route

Create `src/app/api/swaps/route.ts`:

```typescript
import { NextResponse } from 'next/server';

const GRAPHQL_ENDPOINT = process.env.INDEXER_GRAPHQL_URL || 'http://localhost:4000/graphql';

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
        token0 { symbol name decimals }
        token1 { symbol name decimals }
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
  // GraphQL query implementation
  // See original implementation for full code
}
```

### 2. Update Frontend for API Calls

Replace the mock data import in `src/app/page.tsx`:

```typescript
"use client"

import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SwapsDataTable, SwapData } from "@/components/swaps-data-table"

const queryClient = new QueryClient()

async function fetchSwaps(limit: number = 50) {
  const response = await fetch(`/api/swaps?limit=${limit}`)
  if (!response.ok) {
    throw new Error('Failed to fetch swaps')
  }
  const data = await response.json()
  return data.swaps as SwapData[]
}

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <SwapsPage />
    </QueryClientProvider>
  )
}

function SwapsPage() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['swaps', 50],
    queryFn: () => fetchSwaps(50),
  })

  // Loading and error handling
  // Real-time data display
}
```

### 3. Environment Configuration

Add to `.env.local`:

```bash
INDEXER_GRAPHQL_URL=http://localhost:4000/graphql
```

### 4. Squid Indexer Requirements

Your Squid indexer should expose a GraphQL endpoint with the following schema:

```graphql
type Swap {
  id: String!
  amount0: String!
  amount1: String!
  amountUSD: String!
  recipient: String!
  timestamp: String!
  transaction: Transaction!
  pool: Pool!
}

type Transaction {
  id: String!
  blockNumber: Int!
}

type Pool {
  id: String!
  token0: Token!
  token1: Token!
  feeTier: String!
  liquidity: String!
  token0Price: String!
  token1Price: String!
  volumeUSD: String!
  totalValueLockedUSD: String!
}

type Token {
  id: String!
  symbol: String!
  name: String!
  decimals: Int!
}
```

## Running the Tutorial

```bash
cd chart
npm install
npm run dev
```

Visit `http://localhost:3000` to see the mock data in action!

## Key Features Demonstrated

- 🎮 **Pool Information**: Token pairs with symbols and names
- ⏰ **Real-time Timestamps**: Formatted time display
- 💰 **USD Values**: Properly formatted currency amounts
- 📄 **Transaction Links**: Truncated transaction hashes
- 👤 **Address Display**: Shortened recipient addresses
- 🎨 **Color Coding**: Green for buys, red for sells
- 📊 **Sorting & Filtering**: Interactive data table

## Architecture Benefits

This approach provides:
- **Separation of Concerns**: Frontend and indexer are independent
- **Real-time Updates**: GraphQL subscriptions possible
- **Scalability**: Indexed data is much faster than direct blockchain queries
- **Flexibility**: Easy to add new data points and filters

---

*This tutorial branch demonstrates frontend implementation. The actual Squid indexer implementation would be in the main project directory.*
