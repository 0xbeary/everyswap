"use client"

import { SwapsDataTable } from "@/components/swaps-data-table"
import { mockSwapData } from "@/data/mockSwaps"

export default function Home() {
  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Latest Swaps</h1>
        <p className="text-muted-foreground">
          Latest Everyswap swap transactions (Tutorial Mode - Mock Data)
        </p>
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            📚 <strong>Tutorial Mode:</strong> This page is displaying mock data for demonstration purposes. 
            In a real implementation, this would connect to your Squid indexer&apos;s GraphQL API to fetch live swap data.
          </p>
        </div>
      </div>
      <SwapsDataTable data={mockSwapData} />
    </div>
  )
}
