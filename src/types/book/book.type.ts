import { Category } from '../category/category.type'
import { LatestChapter } from '../chapter/chapter.type'
import { PageParams } from '../common.type'
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
  reviewCount: number
  averageRating: number
  premium: boolean
  liked: boolean
  novel: boolean
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
  reviewCount: number
  averageRating: number
  premium: boolean
  liked: boolean
  novel: boolean
}
export interface BookResponse {
  content: Book[]
  page: number
  size: number
  totalElements: number
  totalPages: number
  last: boolean
}

export interface IBookRating {
  id: number
  bookId: number
  userId: number
  name: string
  rating: number
  ratingId: number
  comment: string
  modifiedDate: string
}

export interface IBookRatingResponse {
  content: IBookRating[]
  page: number
  size: number
  totalElements: number
  totalPages: number
  last: boolean
}

export interface IBookRatingSearchParams extends PageParams {
  book: number
}

export interface IAddRatingRequest {
  bookId: number
  rating: number
  comment: string
}
export interface IUpdateRatingRequest {
  ratingId: number
  comment: string
  rating: number
}
