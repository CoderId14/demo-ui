import { AppConst } from '@/app-const'
import { toast } from 'react-toastify'
import { BookParamRequest } from '../../types/book/bookSearch.type'
import { Book, BookResponse } from '@/types/book/book.type'
import { error } from 'console'
import axios from 'axios'
import axiosInstance, { ErrorResponse } from '@/config/axios'

export const searchBook = async <T>(params: BookParamRequest) => {
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
