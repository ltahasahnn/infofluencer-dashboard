"use client"
import clsx from "clsx"
import * as React from "react"

// Components
import { Checkbox } from "@/components/ui/checkbox"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import {
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnFiltersState,
  getSortedRowModel,
  getCoreRowModel,
  VisibilityState,
  useReactTable,
  SortingState,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table"
import {
  TableHeader,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Table,
} from "@/components/ui/table"

export type Influencer = {
  id: string
  email: string
}

export function InfluencerTable({ loading }: { loading: boolean }) {
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [rowSelection, setRowSelection] = React.useState({})
  const [data, setData] = React.useState<Influencer[]>([
    { id: "1", email: "john.doe@example.com" },
    { id: "2", email: "jane.smith@example.com" },
    { id: "3", email: "alice@example.com" },
    { id: "4", email: "bob@example.com" },
  ])

  const columns: ColumnDef<Influencer>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value: boolean) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <div>{row.getValue("email")}</div>,
    },
  ]

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
    state: { sorting, columnFilters, columnVisibility, rowSelection },
  })

  return (
    <div className="w-full">
      <div className="flex items-center justify-between flex-wrap gap-4 py-4">
        {!loading ? (
          <input
            placeholder="Search emails..."
            value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("email")?.setFilterValue(event.target.value)}
            className="sm:max-w-sm w-full dark:bg-input/30 border border-input shrink-0 focus-visible:border-black/50 dark:focus-visible:border-white/50 outline-none max-sm:order-1 p-2 rounded-md text-sm"
          />
        ) : (
          <Skeleton className="h-10 w-96" />
        )}

        {!loading ?
          <div className="flex items-center gap-2 ml-auto">
            {table.getSelectedRowModel().rows.length > 0 ? (
              <Button variant="red" className="h-9">
                Clear ({table.getSelectedRowModel().rows.length})
              </Button>
            ) : (
              <span className="mt-1 text-sm flex items-center gap-1 text-gray-500 dark:text-gray-300">
                Total {"( "}<div className="dark:text-white text-gray-800 font-bold">{data.length}</div>{" )"}
              </span>
            )}
          </div>
          :
          <Skeleton className="h-10 w-20" />
        }
      </div>

      <div className={clsx("overflow-hidden rounded-md", !loading && "border")}>
        {!loading ? (
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        ) : (
          <Skeleton className="h-40 w-full" />
        )}
      </div>
    </div>
  )
}
