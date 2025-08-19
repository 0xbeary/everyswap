"use client"

import { useEffect, useState } from "react"
import { SwapsDataTable, SwapData } from "@/components/swaps-data-table"

export default function Home() {
  const [swaps, setSwaps] = useState<SwapData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSwaps = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/swaps?limit=50')
        
        if (!response.ok) {
          throw new Error('Failed to fetch swaps')
        }
        
        const data = await response.json()
        setSwaps(data.swaps)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchSwaps()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading swaps...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-red-500">Error: {error}</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Latest Swaps</h1>
        <p className="text-muted-foreground">
          Real-time swap transactions from the indexer
        </p>
      </div>
      <SwapsDataTable data={swaps} />
    </div>
  )
}
