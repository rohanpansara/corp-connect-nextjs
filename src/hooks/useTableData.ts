import { apiClient } from '@/app/api/apiClient'
import { useState, useEffect } from 'react'

interface TableDataProps<T> {
  data: T[]
  total: number
  loading: boolean
  filters: Record<string, any>
  setFilters: (filters: Record<string, any>) => void
  page: number
  setPage: (page: number) => void
  pageSize: number
  setPageSize: (size: number) => void
}

const useTableData = <T>(apiEndpoint: string): TableDataProps<T> => {
  const [data, setData] = useState<T[]>([])
  const [total, setTotal] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [filters, setFilters] = useState<Record<string, any>>({})
  const [page, setPage] = useState<number>(0)
  const [pageSize, setPageSize] = useState<number>(10)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await apiClient.get(apiEndpoint, {
          params: { pageNumber: page, rowsPerPage: pageSize, ...filters },
        })

        setData(response.data.content || [])
        setTotal(response.data.totalElements || 0)
      } catch (error) {
        console.error('Error fetching table data:', error)
      }
      setLoading(false)
    }

    fetchData()
  }, [apiEndpoint, filters, page, pageSize])

  return { data, total, loading, filters, setFilters, page, setPage, pageSize, setPageSize }
}

export default useTableData
