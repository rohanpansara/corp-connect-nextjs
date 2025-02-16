import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  total: number // Total number of items
  page: number // Current page
  setPage: (page: number) => void // Function to set the page
  pageSize: number // Number of items per page
  setPageSize: (size: number) => void // Function to set the page size
}

const Pagination: React.FC<PaginationProps> = ({ total, page, setPage, pageSize, setPageSize }) => {
  const totalPages = Math.ceil(total / pageSize)

  return (
    <div className='flex items-center justify-between mt-4'>
      {/* Previous Button */}
      <Button variant='outline' onClick={() => setPage(page - 1)} disabled={page === 1}>
        <ChevronLeft className='w-4 h-4' />
        Previous
      </Button>

      {/* Page Info */}
      <span className='text-sm font-medium'>
        Page {page} of {totalPages}
      </span>

      {/* Page Size Dropdown */}
      <select
        className='border rounded-md p-2 text-sm'
        value={pageSize}
        onChange={e => setPageSize(Number(e.target.value))}
      >
        <option value={5}>5 per page</option>
        <option value={10}>10 per page</option>
        <option value={20}>20 per page</option>
      </select>

      {/* Next Button */}
      <Button variant='outline' onClick={() => setPage(page + 1)} disabled={page === totalPages}>
        Next
        <ChevronRight className='w-4 h-4' />
      </Button>
    </div>
  )
}

export default Pagination
