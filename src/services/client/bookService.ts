import {
  addBook,
  addBookRating,
  deleteBook,
  deleteBookRating,
  fetchRecommendations,
  searchBook,
  searchBookMark,
  searchBookRating,
  updateBook,
  updateBookRating
} from '@/apiRequests/book/bookRequest'
import {
  Book,
  BookAddInfo,
  BookResponse,
  BookUpdateInfo,
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

export function useUpdateBook() {
  const queryClient = useQueryClient()
  return useMutation((info: BookUpdateInfo) => updateBook(info), {
    onMutate: async (_newBook) => {
      await queryClient.cancelQueries(['books'])
      const previouBooks = queryClient.getQueryData(['books'])

      // Return a context object with the snapshotted value
      return { previouBooks }
    },
    onError: (_err, _newBook, context) => {
      queryClient.setQueryData(['books'], context?.previouBooks)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] })
    }
  })
}
export function useAddBook() {
  const queryClient = useQueryClient()
  return useMutation((info: BookAddInfo) => addBook(info), {
    onMutate: async (_newBook) => {
      await queryClient.cancelQueries(['books'])
      const previouBooks = queryClient.getQueryData(['books'])
      queryClient.invalidateQueries({ queryKey: ['books'] })
      // Return a context object with the snapshotted value
      return { previouBooks }
    },
    onError: (_err, _newBook, context) => {
      queryClient.setQueryData(['books'], context?.previouBooks)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] })
    }
  })
}

export function useDeleteBook() {
  const queryClient = useQueryClient()
  return useMutation((bookId: string | number) => deleteBook(bookId), {
    onMutate: async (bookId) => {
      await queryClient.cancelQueries(['books'])
      const previouBooks: BookResponse | undefined = queryClient.getQueryData(['books'])
      if (previouBooks) {
        const content: Book[] = previouBooks.content
        content.filter((book: Book) => book.bookId != bookId)
        previouBooks.content = content
      }
      // Return a context object with the snapshotted value
      return { previouBooks }
    },
    onError: (_err, _bookId, context) => {
      queryClient.setQueryData(['books'], context?.previouBooks)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] })
    }
  })
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
