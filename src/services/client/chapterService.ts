import { addChapter, deleteChapter, getChapter, getChapterDetail, searchChapter, searchChapterImgs, updateChapter } from '@/apiRequests/chapter/chapterRequest'
import {
  Chapter,
  ChapterImagesSearchParams,
  ChapterImgsSearchResponse,
  ChapterSearchParams,
  ChapterSearchResponse
} from '@/types/chapter/chapter.type'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export function useFetchChapters(params: ChapterSearchParams) {
  const queryClient = useQueryClient()

  const queryKey = ['chapters', params]

  const queryOptions = {
    onSuccess: (data: ChapterSearchResponse) => {
      queryClient.setQueryData(queryKey, data)
    }
  }

  const query = useQuery(queryKey, () => searchChapter(params), queryOptions)

  return {
    status: query.status,
    data: query.data,
    error: query.error,
    isFetching: query.isFetching
  }
}

export function useFetchChapterImgs(params: ChapterImagesSearchParams) {
  const queryClient = useQueryClient()

  const queryKey = ['chapterImg', params]

  const queryOptions = {
    onSuccess: (data: ChapterImgsSearchResponse) => {
      queryClient.setQueryData(queryKey, data)
    }
  }

  const query = useQuery(queryKey, () => searchChapterImgs(params), queryOptions)

  return {
    status: query.status,
    data: query.data,
    error: query.error,
    isFetching: query.isFetching
  }
}
interface Props {
  chapterId: number
}

export function useFetchChapterDetail({ chapterId }: Props) {
  const queryClient = useQueryClient()
  const queryKey = ['chapters', chapterId]

  const queryOptions = {
    onSuccess: (data: Chapter) => {
      queryClient.setQueryData(queryKey, data)
    }
  }

  const query = useQuery(queryKey, () => getChapterDetail(chapterId), queryOptions)

  return {
    status: query.status,
    data: query.data,
    error: query.error,
    isFetching: query.isFetching
  }
}






export function useFetchChapter(chapterId: string | number) {
  const queryClient = useQueryClient()

  const queryKey = ['chapter', chapterId]

  const queryOptions = {
    onSuccess: (data: Chapter) => {
      queryClient.setQueryData(queryKey, data)
    }
  }

  const query = useQuery(queryKey, () => getChapter(chapterId), queryOptions)

  return {
    status: query.status,
    data: query.data,
    error: query.error,
    isFetching: query.isFetching
  }
}
export function useUpdateChapter() {
  const queryClient = useQueryClient()
  return useMutation((info: Chapter) => updateChapter(info), {
    onMutate: async (info) => {
      await queryClient.cancelQueries(['chapter', info.id])
      const previouChapter = queryClient.getQueryData(['chapter', info.id])

      // Return a context object with the snapshotted value
      return { previouChapter }
    },
    onError: (_err, info, context) => {
      queryClient.setQueryData(['chapter', info.id], context?.previouChapter)
    },
    onSettled: (_info) => {
      queryClient.invalidateQueries({ queryKey: ['chapters'] })
    }
  })
}
export function useAddChapter() {
  const queryClient = useQueryClient()
  return useMutation((info: Chapter) => addChapter(info), {
    onMutate: async (info) => {
      await queryClient.cancelQueries(['chapter', info.id])
      const previouChapter = queryClient.getQueryData(['chapter', info.id])

      // Return a context object with the snapshotted value
      return { previouChapter }
    },
    onError: (_err, info, context) => {
      queryClient.setQueryData(['chapter', info.id], context?.previouChapter)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['chapters'] })
    }
  })
}

export function useDeleteBook() {
  const queryClient = useQueryClient()
  return useMutation((chapterId: string | number) => deleteChapter(chapterId), {
    onMutate: async (chapterId) => {
      await queryClient.cancelQueries(['chapters'])
      const previouChapter: Chapter | undefined = queryClient.getQueryData(['chapter', chapterId])

      // Return a context object with the snapshotted value
      return { previouChapter }
    },
    onError: (_err, chapterId, context) => {
      queryClient.setQueryData(['chapter', chapterId], context?.previouChapter)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['chapters'] })
    }
  })
}