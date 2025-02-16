'use client'

import { apiClient } from '@/app/api/apiClient'
import { Button } from '@/components/ui/button'
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  OnChangeFn,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import ColumnVisibilityDropdown from './ColumnVisibilityDropdown'
import SearchInput from './SearchInput'
import TableComponent from './TableComponent'

interface PaginatedDataTableProps<TData> {
  columns: any[]
  apiEndpoint: string
}

const PaginatedDataTable = <TData,>({ columns, apiEndpoint }: PaginatedDataTableProps<TData>) => {
  const [data, setData] = useState([])

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)

  // Fetch data from API based on current page and page size
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await apiClient.get(`${apiEndpoint}`, {
          params: { pageNumber: currentPage - 1, rowsPerPage: pageSize },
        })
        console.log(response.data)
        setData(response.data.items)
        setTotalPages(response.data.totalPages)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
      setLoading(false)
    }
    fetchData()
  }, [currentPage, pageSize, apiEndpoint])

  const table = useReactTable<TData>({
    data,
    columns,
    state: { sorting, columnFilters, columnVisibility },
    onSortingChange: setSorting as OnChangeFn<SortingState>,
    onColumnFiltersChange: setColumnFilters as OnChangeFn<ColumnFiltersState>,
    onColumnVisibilityChange: setColumnVisibility as OnChangeFn<VisibilityState>,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div className='rounded-md border w-full bg-sidebarBackground p-3'>
      {/* Filters and Column Visibility */}
      <div className='flex items-center justify-between pb-3'>
        <SearchInput
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={event => table.getColumn('name')?.setFilterValue(event.target.value)}
          onClear={() => table.getColumn('name')?.setFilterValue('')}
          placeholder='Search by name...'
        />
        <ColumnVisibilityDropdown table={table} />
      </div>

      {/* Table */}
      <TableComponent table={table} columns={columns} loading={loading} />

      {/* Pagination Controls */}
      <div className='flex items-center justify-end space-x-2 pt-3'>
        <Button
          variant='outline'
          size='sm'
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant='outline'
          size='sm'
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
        <select
          value={pageSize}
          onChange={e => setPageSize(Number(e.target.value))}
          className='border p-1 rounded-md text-sm'
        >
          {[10, 20, 30, 50].map(size => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default PaginatedDataTable
