import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface TableFiltersProps {
  filters: Record<string, any>
  setFilters: (filters: Record<string, any>) => void
}

const TableFilters: React.FC<TableFiltersProps> = ({ filters, setFilters }) => {
  const handleChange = (key: string, value: any) => {
    setFilters((prev: Record<string, any>) => ({ ...prev, [key]: value }))
  }

  return (
    <div className='flex gap-4 mb-4'>
      {/* Search Input */}
      <Input
        placeholder='Search...'
        value={filters.searchedString || ''}
        onChange={e => handleChange('searchedString', e.target.value)}
      />

      {/* Role Dropdown */}
      <Select onValueChange={value => handleChange('role', value)} value={filters.role || ''}>
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder='Select Role' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='ADMIN'>Admin</SelectItem>
          <SelectItem value='USER'>User</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

export default TableFilters
