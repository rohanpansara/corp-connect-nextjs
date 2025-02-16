import { Input } from '@/components/ui/input'
import { BiSearchAlt } from 'react-icons/bi'
import { FaX } from 'react-icons/fa6'

interface SearchInputProps {
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onClear: () => void
  placeholder?: string
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange, onClear, placeholder = 'Search anything...' }) => {
  return (
    <div className='relative min-w-[300px]'>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className='w-full text-xs text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600 placeholder:text-gray-400 placeholder:dark:text-gray-500 placeholder:pl-[1.25rem]'
      />
      {!value && (
        <BiSearchAlt className='absolute left-3 top-[54%] transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500' />
      )}
      {value && (
        <button
          onClick={onClear}
          className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
          aria-label='Clear search'
        >
          <FaX className='w-3 h-3 fill-gray-400 hover:fill-gray-500 dark:fill-gray-500 dark:hover:fill-gray-400' />
        </button>
      )}
    </div>
  )
}

export default SearchInput
