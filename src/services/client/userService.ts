import { getUserInfo } from '@/apiRequests/user'
import axiosInstance, { ErrorResponse } from '@/config/axios'
import { UserInfo } from '@/types/user/user.type'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'react-toastify'

interface IBookMark {
  bookId: number
}
export const addBookMark = async (info: IBookMark) => {
  try {
    const res = await axiosInstance.post<string>('/user/v1/like-book', info)

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

export const removeBookMark = async (info: IBookMark) => {
  try {
    const res = await axiosInstance.post<string>('/user/v1/unLike-book', info)

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

export function useAddBookMark() {
  const queryClient = useQueryClient()
  return useMutation((info: IBookMark) => addBookMark(info), {
    onMutate: async (info) => {
      await queryClient.cancelQueries(['books', { id: info }])
      const previouBooks = queryClient.getQueryData(['books', { id: info }])
      // Return a context object with the snapshotted value
      return { previouBooks }
    },
    onError: (_err, info, context) => {
      queryClient.setQueryData(['books', { id: info }], context?.previouBooks)
    },
    onSettled: (info) => {
      queryClient.invalidateQueries({ queryKey: ['books', { id: info }] })
    }
  })
}

export function useRemoveBookMark() {
  const queryClient = useQueryClient()
  return useMutation((info: IBookMark) => removeBookMark(info), {
    onMutate: async (info) => {
      await queryClient.cancelQueries(['books', { id: info }])
      const previouBooks = queryClient.getQueryData(['books', { id: info }])
      // Return a context object with the snapshotted value
      return { previouBooks }
    },
    onError: (_err, info, context) => {
      queryClient.setQueryData(['books', { id: info }], context?.previouBooks)
    },
    onSettled: (info) => {
      queryClient.invalidateQueries({ queryKey: ['books', { id: info }] })
    }
  })
}

export function useFetchUserInfo() {
  const queryClient = useQueryClient()

  const queryKey = ['user']

  const queryOptions = {
    onSuccess: (data: UserInfo) => {
      queryClient.setQueryData(queryKey, data)
    }
  }

  const query = useQuery(queryKey, () => getUserInfo(), queryOptions)

  return query
}
