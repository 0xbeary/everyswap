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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading swaps...</div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-red-500">Error: {(error as Error).message}</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Latest Swaps</h1>
        <p className="text-muted-foreground">
          Latest Everyswap swap transactions
        </p>
      </div>
      <SwapsDataTable data={data ?? []} />
    </div>
  )
}
