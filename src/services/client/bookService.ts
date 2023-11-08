import {
  addBookRating,
  deleteBookRating,
  fetchRecommendations,
  searchBook,
  searchBookMark,
  searchBookRating,
  updateBookRating
} from '@/apiRequests/book/bookRequest'
import {
  BookResponse,
  IAddRatingRequest,
  IBookRating,
  IBookRatingResponse,
  IBookRatingSearchParams,
  IUpdateRatingRequest
} from '@/types/book/book.type'
import { BookMarkParamRequest, BookParamRequest } from '@/types/book/bookSearch.type'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

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

export function useFetchBookRecommendations() {
  const queryClient = useQueryClient()

  const queryKey = ['book-recommendations']

  const queryOptions = {
    onSuccess: (data: BookResponse) => {
      queryClient.setQueryData(queryKey, data)
    }
  }

  const query = useQuery(queryKey, () => fetchRecommendations(), queryOptions)

  return query
}

export function useFetchBookMarks(params: BookMarkParamRequest) {
  const queryClient = useQueryClient()

  const queryKey = ['books', params]

  const queryOptions = {
    onSuccess: (data: BookResponse) => {
      queryClient.setQueryData(queryKey, data)
    }
  }

  const query = useQuery(queryKey, () => searchBookMark(params), queryOptions)

  return query
}
export function useFetchBookRatings(params: IBookRatingSearchParams) {
  const queryClient = useQueryClient()

  const queryKey = ['book-rating', params]

  const queryOptions = {
    onSuccess: (data: IBookRatingResponse) => {
      queryClient.setQueryData(queryKey, data)
    }
  }

  const query = useQuery(queryKey, () => searchBookRating(params), queryOptions)

  return query
}

export function useUpdateBookRating() {
  const queryClient = useQueryClient()
  return useMutation((info: IUpdateRatingRequest) => updateBookRating(info), {
    onMutate: async (_info) => {
      await queryClient.cancelQueries(['book-rating'])
      const previouBooks = queryClient.getQueryData(['book-rating'])

      // Return a context object with the snapshotted value
      return { previouBooks }
    },
    onError: (_err, _info, context) => {
      queryClient.setQueryData(['book-rating'], context?.previouBooks)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['book-rating'] })
    }
  })
}
export function useAddBookRating() {
  const queryClient = useQueryClient()
  return useMutation((info: IAddRatingRequest) => addBookRating(info), {
    onMutate: async (_info) => {
      await queryClient.cancelQueries(['book-rating'])
      const previouBooks = queryClient.getQueryData(['book-rating'])

      // Return a context object with the snapshotted value
      return { previouBooks }
    },
    onError: (_err, _info, context) => {
      queryClient.setQueryData(['book-rating'], context?.previouBooks)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['book-rating'] })
    }
  })
}

export function useDeleteBookRating() {
  const queryClient = useQueryClient()
  return useMutation((id: string | number) => deleteBookRating(id), {
    onMutate: async (id) => {
      await queryClient.cancelQueries(['book-rating'])
      const previousData: IBookRatingResponse | undefined = queryClient.getQueryData(['book-rating'])
      if (previousData) {
        const content: IBookRating[] = previousData.content
        content.filter((item: IBookRating) => item.id != id)
        previousData.content = content
      }
      // Return a context object with the snapshotted value
      return { previousData }
    },
    onError: (_err, _bookId, context) => {
      queryClient.setQueryData(['book-rating'], context?.previousData)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['book-rating'] })
    }
  })
}
