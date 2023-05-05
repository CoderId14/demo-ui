export interface LatestChapter {
  title: string
  modifiedDate: string
  bookId: number
  id: number
  chapterNumber: number
}

export interface Chapter {
  id: number
  bookId: number
  title: string
  content?: string
  chapterNumber: number
  modifiedDate: string
}

export interface ChapterSearchResponse {
  content: Chapter[]
  page: number
  size: number
  totalElements: number
  totalPages: number
  last: boolean
}

export interface ChapterSearchParams {
  book: number
  name?: string
  size?: number
  sort?: string
}

export interface ChapterImagesSearchParams {
  chapterId: number
  size?: number
  sort?: string
}
export interface IChapterImg {
  id: number
  fileUrl: string
  imgNumber: number
}

export interface ImgChapterList {
  content: IChapterImg[]
  page: number
  size: number
  totalElements: number
  totalPages: number
  last: boolean
}
export interface ChapterImgsSearchResponse {
  chapterId: number
  imgChapterList: ImgChapterList
}
