import axiosInstance, { ErrorResponse } from '@/config/axios'
import { CategorySearchParams, CategorySearchResponse } from '@/types/category/category.type'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'react-toastify'

export const searchCategory = async (params: CategorySearchParams) => {
  try {
    const res = await axiosInstance.get<CategorySearchResponse>('/category/v1/search', {
      headers: {
        'content-type': 'application/json'
      },
      params
    })

    return res.data
  } catch (error: any) {
    if (axios.isCancel(error)) {
      // request was cancelled
    } else if (error.response) {
      // server returned an error
      const data = error.response.data as any
      toast.error(data.message)
      return { error: data } as ErrorResponse
    } else {
      // network error
      toast.error('Network error occurred.')
      return { error: 'Network error occurred.' } as ErrorResponse
    }
  }
}

export function useFetchCategories(params: CategorySearchParams) {
  const queryClient = useQueryClient()

  const queryKey = ['categories', params]

  const queryOptions = {
    onSuccess: (data: CategorySearchResponse) => {
      queryClient.setQueryData(queryKey, data)
    }
  }

  const query = useQuery(queryKey, () => searchCategory(params), queryOptions)

  return query
}
