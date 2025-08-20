"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

// Type definitions for the swap data from our API
export type SwapData = {
  id: string
  timestamp: string
  blockNumber: number
  transactionId: string
  amounts: {
    amount0: string
    amount1: string
    amountUSD: string
    isBuy?: boolean
    swapType?: string
    amountColor?: string
  }
  addresses: {
    recipient: string
  }
  pool: {
    id: string
    token0: {
      symbol: string
      name: string
      decimals: number
    }
    token1: {
      symbol: string
      name: string
      decimals: number
    }
    feeTier: string
    liquidity: string
    prices: {
      token0Price: string
      token1Price: string
    }
    metrics: {
      volumeUSD: string
      totalValueLockedUSD: string
    }
  }
}

export const columns: ColumnDef<SwapData>[] = [
  {
    accessorKey: "timestamp",
    header: "⏰ Time",
    cell: ({ row }) => {
      const timestamp = row.getValue("timestamp") as string
      const date = new Date(timestamp) // Parse ISO string directly
      return (
        <div className="nes-text font-bold">
          {date.toLocaleTimeString()}
        </div>
      )
    },
  },
  {
    accessorKey: "pool",
    header: "🎮 Pool",
    cell: ({ row }) => {
      const pool = row.getValue("pool") as SwapData["pool"]
      return (
        <div className="nes-text font-bold" style={{ color: '#333', fontWeight: 'bold' }}>
          {pool.token0.symbol}/{pool.token1.symbol}
        </div>
      )
    },
  },
  {
    accessorFn: (row) => row.amounts.amountUSD,
    id: "amountUSD",
    header: () => {
      return <div className="nes-text is-primary text-right">💰 Amount USD</div>
    },
    
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amountUSD") as string)
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)

      // Determine if this is a buy or sell based on amount0 sign
      const amounts = row.original.amounts
      const isBuy = parseFloat(amounts.amount0) > 0
      const color = isBuy ? '#22c55e' : '#ef4444' // green for buy, red for sell

      return (
        <div 
          className="nes-text text-right font-bold" 
          style={{ color }}
        >
          {formatted}
        </div>
      )
    },
  },
  {
    accessorFn: (row) => row.addresses.recipient,
    id: "recipient", 
    header: "👤 Recipient",
    cell: ({ row }) => {
      const address = row.getValue("recipient") as string
      return (
        <div className="nes-text font-mono text-sm">
          {address.slice(0, 6)}...{address.slice(-4)}
        </div>
      )
    },
  },
  {
    accessorKey: "transactionId",
    header: "📄 Transaction",
    cell: ({ row }) => {
      const txId = row.getValue("transactionId") as string
      return (
        <div className="nes-text font-mono text-sm">
          {txId.slice(0, 8)}...{txId.slice(-4)}
        </div>
      )
    },
  },
]

interface SwapsDataTableProps {
  data: SwapData[]
}

export function SwapsDataTable({ data }: SwapsDataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [globalFilter, setGlobalFilter] = React.useState("")

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, columnId, value) => {
      const searchValue = value.toLowerCase().trim()
      const rowData = row.original
      
      // Search in token symbols (with null checks)
      const token0Symbol = (rowData.pool.token0.symbol || '').toLowerCase()
      const token1Symbol = (rowData.pool.token1.symbol || '').toLowerCase()
      
      // Search in token names (with null checks)
      const token0Name = (rowData.pool.token0.name || '').toLowerCase()
      const token1Name = (rowData.pool.token1.name || '').toLowerCase()
      
      // Search in amount USD (convert to string first)
      const amountUSD = String(rowData.amounts.amountUSD || '').toLowerCase()
      
      // Search in recipient address
      const recipient = (rowData.addresses.recipient || '').toLowerCase()
      
      // Search in transaction ID
      const transactionId = (rowData.transactionId || '').toLowerCase()
      
      return (
        token0Symbol.includes(searchValue) ||
        token1Symbol.includes(searchValue) ||
        token0Name.includes(searchValue) ||
        token1Name.includes(searchValue) ||
        amountUSD.includes(searchValue) ||
        recipient.includes(searchValue) ||
        transactionId.includes(searchValue)
      )
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <div className="nes-field max-w-sm  w-96 bg-white">
          <input 
            type="text"
            className="nes-input"
            placeholder="Filter by tokens, pool, or amount..."
            value={globalFilter ?? ""}
            onChange={(event) => setGlobalFilter(event.target.value)}
          />
        </div>
      </div>
      <div className="nes-container with-title bg-black is-rounded" style={{ padding: '2rem 1rem 1rem 1rem', overflow: 'hidden', backgroundColor: 'transparent' }}>
        <p className="title" style={{ backgroundColor: 'transparent' }}>🎮 Swap Data</p>
        <div className="nes-table-responsive" style={{ padding: '0.5rem', overflow: 'auto', marginTop: '1rem' }}>
          <table className="nes-table is-bordered is-centered" style={{ width: '100%', tableLayout: 'fixed' }}>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th key={header.id} className="nes-text" style={{ wordWrap: 'break-word' }}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    )
                  })}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className={row.getIsSelected() ? "is-success" : ""}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} style={{ wordWrap: 'break-word', overflow: 'hidden' }}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="nes-text is-error text-center py-8"
                  >
                    No results found!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex items-center justify-end space-x-4 py-4">
        <div className="flex-1 nes-text text-sm" style={{ color: '#000' }}>
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <button
            type="button"
            className={`nes-btn ${!table.getCanPreviousPage() ? 'is-disabled' : ''}`}
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </button>
          <button
            type="button"
            className={`nes-btn is-primary ${!table.getCanNextPage() ? 'is-disabled' : ''}`}
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
