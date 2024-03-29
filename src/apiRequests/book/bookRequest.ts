import { toast } from 'react-toastify'
import { BookMarkParamRequest, BookParamRequest } from '../../types/book/bookSearch.type'
import {
  BookAddInfo,
  BookResponse,
  BookUpdateInfo,
  IAddRatingRequest,
  IBookRating,
  IBookRatingResponse,
  IBookRatingSearchParams,
  IUpdateRatingRequest
} from '@/types/book/book.type'
import axios from 'axios'
import axiosInstance, { ErrorResponse } from '@/config/axios'
import { ApiResponse } from '@/types/common.type'

export const fetchRecommendations = async () => {
  try {
    const res = await axiosInstance.get<BookResponse>('/book/v1/viewCount', {
      params: {
        "book.isActive": true
      }
    }
    )

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

export const searchBook = async (params: BookParamRequest) => {
  try {
    const res = await axiosInstance.get<BookResponse>('/book/v1/search', {
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

export const updateBook = async (info: BookUpdateInfo) => {
  try {
    const res = await axiosInstance.put<BookResponse>('/book/v1/' + info.id, info)

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

export const addBook = async (info: BookAddInfo) => {
  try {
    const res = await axiosInstance.post<BookResponse>('/writer/book/v1', info)

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

export const deleteBook = async (bookId: string | number) => {
  try {
    const res = await axiosInstance.delete<ApiResponse>('/book/v1/' + bookId)

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

export const searchBookMark = async (params: BookMarkParamRequest) => {
  try {
    const res = await axiosInstance.get<BookResponse>('/user/v1/get-books-liked', {
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

export const searchBookRating = async (params: IBookRatingSearchParams) => {
  try {
    const res = await axiosInstance.get<IBookRatingResponse>('/book-rating/v1/search', {
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

export const addBookRating = async (request: IAddRatingRequest) => {
  try {
    const res = await axiosInstance.post<IBookRating>('/book-rating/v1', request, {
      headers: {
        'content-type': 'application/json'
      }
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

export const updateBookRating = async (request: IUpdateRatingRequest) => {
  try {
    const res = await axiosInstance.put<IBookRating>('/book-rating/v1', request, {
      headers: {
        'content-type': 'application/json'
      }
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

export const deleteBookRating = async (id: number | string) => {
  try {
    const res = await axiosInstance.put<ApiResponse>('/book-rating/v1/' + id, {
      headers: {
        'content-type': 'application/json'
      }
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
