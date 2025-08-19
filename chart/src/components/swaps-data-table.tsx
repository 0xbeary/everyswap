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

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

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
  }
  addresses: {
    sender: string
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
      tvlUSD: string
    }
  }
}

export const columns: ColumnDef<SwapData>[] = [
  {
    accessorKey: "timestamp",
    header: "Time",
    cell: ({ row }) => {
      const timestamp = parseInt(row.getValue("timestamp"))
      const date = new Date(timestamp * 1000) // Convert from Unix timestamp
      return (
        <div className="font-medium">
          {date.toLocaleTimeString()}
        </div>
      )
    },
  },
  {
    accessorKey: "pool",
    header: "Pool",
    cell: ({ row }) => {
      const pool = row.getValue("pool") as SwapData["pool"]
      return (
        <div className="font-medium">
          {pool.token0.symbol}/{pool.token1.symbol}
        </div>
      )
    },
  },
  {
    accessorKey: "amounts.amountUSD",
    header: "Amount USD",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amounts.amountUSD") as string)
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "addresses.sender",
    header: "Sender",
    cell: ({ row }) => {
      const address = row.getValue("addresses.sender") as string
      return (
        <div className="font-mono text-sm">
          {address.slice(0, 6)}...{address.slice(-4)}
        </div>
      )
    },
  },
  {
    accessorKey: "addresses.recipient",
    header: "Recipient",
    cell: ({ row }) => {
      const address = row.getValue("addresses.recipient") as string
      return (
        <div className="font-mono text-sm">
          {address.slice(0, 6)}...{address.slice(-4)}
        </div>
      )
    },
  },
  {
    accessorKey: "transactionId",
    header: "Transaction",
    cell: ({ row }) => {
      const txId = row.getValue("transactionId") as string
      return (
        <div className="font-mono text-sm">
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
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter by pool..."
          value={(table.getColumn("pool")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("pool")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
