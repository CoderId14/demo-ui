import { searchBook } from '@/apiRequests/book/bookRequest'
import { BookResponse } from '@/types/book/book.type'
import { BookParamRequest } from '@/types/book/bookSearch.type'
import { useQuery, useQueryClient } from '@tanstack/react-query'

export function useFetchBooks(params: BookParamRequest) {
  const queryClient = useQueryClient()

  const queryKey = ['books', params]

  const queryOptions = {
    onSuccess: (data: BookResponse) => {
      queryClient.setQueryData(queryKey, data)
    }
  }

  const query = useQuery(queryKey, () => searchBook(params), queryOptions)

  return query
}
