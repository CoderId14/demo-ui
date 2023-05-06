import { Category } from '../category/category.type'
import { LatestChapter } from '../chapter/chapter.type'
export interface Book {
  bookId: number
  title: string
  content: string
  shortDescription: string
  categories?: Category[]
  tags?: string[]
  thumbnail: string | null
  thumbnailUrl: string
  author: string
  latestChapters?: LatestChapter[]
  viewCount: number
  likeCount: number
  averageRating: number
  premium: boolean
  liked: boolean
}
export interface BookDetails {
  bookId: number
  title: string
  content: string
  shortDescription: string
  categories: Category[]
  tags: string[]
  thumbnail: string | null
  thumbnailUrl: string
  author: string
  latestChapters: LatestChapter[]
  viewCount: number
  likeCount: number
  averageRating: number
  premium: boolean
  liked: boolean
}
export interface BookResponse {
  content: Book[]
  page: number
  size: number
  totalElements: number
  totalPages: number
  last: boolean
}
