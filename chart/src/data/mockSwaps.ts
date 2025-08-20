// Mock swap data for tutorial purposes
// This replaces the real API data with fake examples

export const mockSwapData = [
  {
    id: "1",
    timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(), // 2 minutes ago
    blockNumber: 12345678,
    transactionId: "0xed5dd8...cb1e",
    amounts: {
      amount0: "-150.5",
      amount1: "52.24",
      amountUSD: "52.24",
      isBuy: false,
      swapType: "sell",
      amountColor: "#ef4444"
    },
    addresses: {
      recipient: "0x6a59...688d"
    },
    pool: {
      id: "mxt-wm-pool",
      token0: {
        symbol: "MXT",
        name: "Magic Crystal Token",
        decimals: 18
      },
      token1: {
        symbol: "WM",
        name: "Wizard Money",
        decimals: 18
      },
      feeTier: "3000",
      liquidity: "1234567890",
      prices: {
        token0Price: "0.347",
        token1Price: "2.88"
      },
      metrics: {
        volumeUSD: "125678.90",
        totalValueLockedUSD: "987654.32"
      }
    }
  },
  {
    id: "2",
    timestamp: new Date(Date.now() - 4 * 60 * 1000).toISOString(), // 4 minutes ago
    blockNumber: 12345677,
    transactionId: "0x87c949...5425",
    amounts: {
      amount0: "850.75",
      amount1: "-2992.41",
      amountUSD: "2992.41",
      isBuy: true,
      swapType: "buy",
      amountColor: "#22c55e"
    },
    addresses: {
      recipient: "0x6a59...688d"
    },
    pool: {
      id: "wm-bunana-pool",
      token0: {
        symbol: "WM",
        name: "Wizard Money",
        decimals: 18
      },
      token1: {
        symbol: "BUNANA",
        name: "Banana Coin",
        decimals: 18
      },
      feeTier: "3000",
      liquidity: "9876543210",
      prices: {
        token0Price: "3.52",
        token1Price: "0.284"
      },
      metrics: {
        volumeUSD: "456789.12",
        totalValueLockedUSD: "2345678.90"
      }
    }
  },
  {
    id: "3",
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 minutes ago
    blockNumber: 12345676,
    transactionId: "0x634b99...6e32",
    amounts: {
      amount0: "162.45",
      amount1: "-573.80",
      amountUSD: "573.80",
      isBuy: true,
      swapType: "buy",
      amountColor: "#22c55e"
    },
    addresses: {
      recipient: "0xddf8...6587"
    },
    pool: {
      id: "wm-bunana-pool",
      token0: {
        symbol: "WM",
        name: "Wizard Money",
        decimals: 18
      },
      token1: {
        symbol: "BUNANA",
        name: "Banana Coin",
        decimals: 18
      },
      feeTier: "3000",
      liquidity: "9876543210",
      prices: {
        token0Price: "3.53",
        token1Price: "0.283"
      },
      metrics: {
        volumeUSD: "456789.12",
        totalValueLockedUSD: "2345678.90"
      }
    }
  },
  {
    id: "4",
    timestamp: new Date(Date.now() - 28 * 60 * 1000).toISOString(), // 28 minutes ago
    blockNumber: 12345675,
    transactionId: "0x9e85cb...75e7",
    amounts: {
      amount0: "21.05",
      amount1: "-74.02",
      amountUSD: "74.02",
      isBuy: true,
      swapType: "buy",
      amountColor: "#22c55e"
    },
    addresses: {
      recipient: "0xe07f...90ee"
    },
    pool: {
      id: "wm-bunana-pool",
      token0: {
        symbol: "WM",
        name: "Wizard Money",
        decimals: 18
      },
      token1: {
        symbol: "BUNANA",
        name: "Banana Coin",
        decimals: 18
      },
      feeTier: "3000",
      liquidity: "9876543210",
      prices: {
        token0Price: "3.52",
        token1Price: "0.284"
      },
      metrics: {
        volumeUSD: "456789.12",
        totalValueLockedUSD: "2345678.90"
      }
    }
  },
  {
    id: "5",
    timestamp: new Date(Date.now() - 34 * 60 * 1000).toISOString(), // 34 minutes ago
    blockNumber: 12345674,
    transactionId: "0x3a0a13...e41a",
    amounts: {
      amount0: "13.55",
      amount1: "-47.72",
      amountUSD: "47.72",
      isBuy: true,
      swapType: "buy",
      amountColor: "#22c55e"
    },
    addresses: {
      recipient: "0x3b7b...5130"
    },
    pool: {
      id: "wm-bunana-pool",
      token0: {
        symbol: "WM",
        name: "Wizard Money",
        decimals: 18
      },
      token1: {
        symbol: "BUNANA",
        name: "Banana Coin",
        decimals: 18
      },
      feeTier: "3000",
      liquidity: "9876543210",
      prices: {
        token0Price: "3.52",
        token1Price: "0.284"
      },
      metrics: {
        volumeUSD: "456789.12",
        totalValueLockedUSD: "2345678.90"
      }
    }
  },
  {
    id: "6",
    timestamp: new Date(Date.now() - 36 * 60 * 1000).toISOString(), // 36 minutes ago
    blockNumber: 12345673,
    transactionId: "0xd17ca9...5bba",
    amounts: {
      amount0: "-95.25",
      amount1: "42.62",
      amountUSD: "42.62",
      isBuy: false,
      swapType: "sell",
      amountColor: "#ef4444"
    },
    addresses: {
      recipient: "0x6a59...688d"
    },
    pool: {
      id: "crik-wm-pool",
      token0: {
        symbol: "CRIK",
        name: "Cricket Token",
        decimals: 18
      },
      token1: {
        symbol: "WM",
        name: "Wizard Money",
        decimals: 18
      },
      feeTier: "3000",
      liquidity: "5432109876",
      prices: {
        token0Price: "0.448",
        token1Price: "2.23"
      },
      metrics: {
        volumeUSD: "78965.43",
        totalValueLockedUSD: "567890.12"
      }
    }
  },
  {
    id: "7",
    timestamp: new Date(Date.now() - 39 * 60 * 1000).toISOString(), // 39 minutes ago
    blockNumber: 12345672,
    transactionId: "0x54e63c...d088",
    amounts: {
      amount0: "-22.75",
      amount1: "7.51",
      amountUSD: "7.51",
      isBuy: false,
      swapType: "sell",
      amountColor: "#ef4444"
    },
    addresses: {
      recipient: "0x6a59...688d"
    },
    pool: {
      id: "bubu-wm-pool",
      token0: {
        symbol: "BUBU",
        name: "Bubble Token",
        decimals: 18
      },
      token1: {
        symbol: "WM",
        name: "Wizard Money",
        decimals: 18
      },
      feeTier: "3000",
      liquidity: "3456789012",
      prices: {
        token0Price: "0.33",
        token1Price: "3.03"
      },
      metrics: {
        volumeUSD: "234567.89",
        totalValueLockedUSD: "1234567.45"
      }
    }
  },
  {
    id: "8",
    timestamp: new Date(Date.now() - 59 * 60 * 1000).toISOString(), // 59 minutes ago
    blockNumber: 12345671,
    transactionId: "0xc39492...f8df",
    amounts: {
      amount0: "-67.89",
      amount1: "18.12",
      amountUSD: "18.12",
      isBuy: false,
      swapType: "sell",
      amountColor: "#ef4444"
    },
    addresses: {
      recipient: "0xc886...daa3"
    },
    pool: {
      id: "ninja-wm-pool",
      token0: {
        symbol: "NINJA",
        name: "Shadow Ninja Token",
        decimals: 18
      },
      token1: {
        symbol: "WM",
        name: "Wizard Money",
        decimals: 18
      },
      feeTier: "3000",
      liquidity: "2345678901",
      prices: {
        token0Price: "0.267",
        token1Price: "3.75"
      },
      metrics: {
        volumeUSD: "123456.78",
        totalValueLockedUSD: "876543.21"
      }
    }
  },
  {
    id: "9",
    timestamp: new Date(Date.now() - 92 * 60 * 1000).toISOString(), // 92 minutes ago
    blockNumber: 12345670,
    transactionId: "0x973a46...5d01",
    amounts: {
      amount0: "18.87",
      amount1: "-66.44",
      amountUSD: "66.44",
      isBuy: true,
      swapType: "buy",
      amountColor: "#22c55e"
    },
    addresses: {
      recipient: "0x3194...84b6"
    },
    pool: {
      id: "wm-bunana-pool",
      token0: {
        symbol: "WM",
        name: "Wizard Money",
        decimals: 18
      },
      token1: {
        symbol: "BUNANA",
        name: "Banana Coin",
        decimals: 18
      },
      feeTier: "3000",
      liquidity: "9876543210",
      prices: {
        token0Price: "3.52",
        token1Price: "0.284"
      },
      metrics: {
        volumeUSD: "456789.12",
        totalValueLockedUSD: "2345678.90"
      }
    }
  },
  {
    id: "10",
    timestamp: new Date(Date.now() - 93 * 60 * 1000).toISOString(), // 93 minutes ago
    blockNumber: 12345669,
    transactionId: "0x043bbe...3953",
    amounts: {
      amount0: "-532.15",
      amount1: "1756.98",
      amountUSD: "1756.98",
      isBuy: false,
      swapType: "sell",
      amountColor: "#ef4444"
    },
    addresses: {
      recipient: "0x4721...4731"
    },
    pool: {
      id: "bubu-wm-pool",
      token0: {
        symbol: "BUBU",
        name: "Bubble Token",
        decimals: 18
      },
      token1: {
        symbol: "WM",
        name: "Wizard Money",
        decimals: 18
      },
      feeTier: "3000",
      liquidity: "3456789012",
      prices: {
        token0Price: "0.33",
        token1Price: "3.03"
      },
      metrics: {
        volumeUSD: "234567.89",
        totalValueLockedUSD: "1234567.45"
      }
    }
  }
]
