import { useState, useEffect } from 'react'
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox' // ShadCN Checkbox
import { Input } from '@/components/ui/input' // ShadCN Input
import { apiClient } from '@/app/api/apiClient'
import Pagination from './Pagination'
import { UserDTO } from '@/types/User'

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[]
  data: TData[] // Ensure this accepts the correct data type
  apiEndpoint: string
}

export function DataTable<TData>({ apiEndpoint, columns }: DataTableProps<TData>) {
  const [data, setData] = useState<UserDTO[]>([])
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState(0)
  const [filters, setFilters] = useState<Record<string, string | number | boolean>>({})

  // Fetch data when filters, page, or pageSize change
  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = { pageNumber: page, rowsPerPage: pageSize, ...filters }
        const response = await apiClient.get(apiEndpoint, { params })
        setData(response.data.content)
        setTotal(response.data.totalElements)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [apiEndpoint, page, pageSize, filters])

  console.log('Data for Table:', data)

  // Handle filter changes
  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })
  console.log('Rows Length:', table.getRowModel().rows.length)
  return (
    <div className='p-4'>
      {/* Filters */}
      <div className='flex space-x-2 mb-4'>
        <Input placeholder='Search...' onChange={e => handleFilterChange('searchedString', e.target.value)} />
        <Checkbox onCheckedChange={checked => handleFilterChange('isActive', checked)} />
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
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
          {table?.getRowModel()?.rows?.length ? (
            table.getRowModel().rows.map(row => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className='text-center'>
                No results found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      <Pagination total={total} page={page} setPage={setPage} pageSize={pageSize} setPageSize={setPageSize} />
    </div>
  )
}
