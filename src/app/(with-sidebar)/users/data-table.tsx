"use client";

import { useEffect, useState } from "react";
import {
  ColumnDef,
  flexRender,
  SortingState,
  VisibilityState,
  ColumnFiltersState,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSubContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { HiViewColumns } from "react-icons/hi2";
import SearchInput from "@/components/common/SearchInput";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onNoResultsFound: () => void; // New prop for the parent to know when no results are found
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onNoResultsFound,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // Check if no results after filtering
  const noResults = table.getRowModel().rows?.length === 0;

  // Notify parent about no results
  useEffect(() => {
    if (noResults) {
      onNoResultsFound(); // Pass the information to the parent
    }
  }, [noResults, onNoResultsFound]);

  return (
    <div className="rounded-md border w-full bg-sidebarBackground">
      {/* Filters */}
      <div className="flex items-center justify-end px-3 pt-3 gap-2">
        <SearchInput
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
          onClear={() => table.getColumn("name")?.setFilterValue("")}
          placeholder="Search by name..."
        />
        {/* Column visibility */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="plain"
              className="rounded-[5px] h-8 px-2 py-1 text-sm border-[1px] shadow-sm border-gray-300 dark:border-gray-600"
            >
              <HiViewColumns />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel className="hover:cursor-default">
              Show/Hide Columns
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  className="hover:cursor-pointer"
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table */}
      <div className="p-3">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-[12px]">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody className="p-3">
            {noResults ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-12 text-center text-gray-400 italic"
                >
                  No results.
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows?.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-xs">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2 p-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className={
            !table.getCanPreviousPage()
              ? "cursor-not-allowed"
              : "hover:cursor-pointer"
          }
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className={
            !table.getCanNextPage()
              ? "cursor-not-allowed"
              : "hover:cursor-pointer"
          }
        >
          Next
        </Button>
      </div>
    </div>
  );
}
