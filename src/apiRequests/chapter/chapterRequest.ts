import axiosInstance, { ErrorResponse } from '@/config/axios'
import {
  Chapter,
  ChapterImagesSearchParams,
  ChapterImgsSearchResponse,
  ChapterSearchParams,
  ChapterSearchResponse
} from '@/types/chapter/chapter.type'
import { ApiResponse } from '@/types/common.type'
import axios from 'axios'
import { toast } from 'react-toastify'

export const searchChapter = async (params: ChapterSearchParams) => {
  try {
    const res = await axiosInstance.get<ChapterSearchResponse>('/chapter/v1/search', {
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

export const searchChapterImgs = async (params: ChapterImagesSearchParams) => {
  try {
    const res = await axiosInstance.get<ChapterImgsSearchResponse>('/chapterImg/v1/search/' + params.chapterId, {
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

export const getChapterDetail = async (chapterId: number) => {
  try {
    const res = await axiosInstance.get<Chapter>('/chapter/v1/' + chapterId, {
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
export const getChapter = async (chapterId: string | number) => {
  try {
    const res = await axiosInstance.get<Chapter>('/chapter/v1/' + chapterId, {
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
export const updateChapter = async (info: Chapter) => {
  try {
    const res = await axiosInstance.put<Chapter>('/chapter/v1/' + Number(info.id), info)

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

export const addChapter = async (info: Chapter) => {
  try {
    const res = await axiosInstance.post<Chapter>('/chapter/v1/add', info)

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
export const deleteChapter = async (chapterId: string | number) => {
  try {
    const res = await axiosInstance.delete<ApiResponse>('/chapter/v1/' + chapterId)

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