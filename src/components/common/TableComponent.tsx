import { flexRender, Table } from '@tanstack/react-table'

interface TableComponentProps<T> {
  table: Table<T>
  columns: any[]
  loading: boolean
}

const TableComponent = <T,>({ table, columns, loading }: TableComponentProps<T>) => {
  return (
    <div className='overflow-x-auto'>
      <table className='w-full border-collapse border border-gray-300'>
        <thead>
          {table.getHeaderGroups()?.map(headerGroup => (
            <tr key={headerGroup?.id} className='bg-gray-200'>
              {headerGroup?.headers?.map(header => (
                <th key={header.id} className='border border-gray-300 p-2 text-left text-sm'>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns?.length || 1} className='text-center py-4 text-gray-500 italic'>
                Loading...
              </td>
            </tr>
          ) : (table?.getRowModel()?.rows || []).length ? (
            table.getRowModel()?.rows?.map(row => (
              <tr key={row.id} className='border-b border-gray-300'>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className='border border-gray-300 p-2 text-sm'>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns?.length || 1} className='text-center py-4 text-gray-500 italic'>
                No results found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default TableComponent
