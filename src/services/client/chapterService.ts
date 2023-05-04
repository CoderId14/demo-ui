import { getChapterDetail, searchChapter } from '@/apiRequests/chapter/chapterRequest'
import { Chapter, ChapterSearchParams, ChapterSearchResponse } from '@/types/chapter/chapter.type'
import { useQuery, useQueryClient } from '@tanstack/react-query'

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
