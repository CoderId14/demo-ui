import { Category } from '../category/category.type'
import { LatestChapter } from '../chapter/chapter.type'
import { PageParams } from '../common.type'
import { ITag } from '../tag/tag.type'
export interface Book {
  bookId: number
  title: string
  content: string
  shortDescription: string
  categories?: Category[]
  tags?: ITag[]
  thumbnail: string | null
  thumbnailUrl: string
  author: string
  latestChapters?: LatestChapter[]
  viewCount: number
  likeCount: number
  averageRating: number
  totalChapter: number
  reviewCount: number
  premium: boolean
  novel: boolean
  liked: boolean
}
export interface BookDetails {
  bookId: number
  title: string
  content: string
  shortDescription: string
  categories: Category[]
  tags: ITag[]
  thumbnail: string | null
  thumbnailUrl: string
  author: string
  latestChapters: LatestChapter[]
  viewCount: number
  likeCount: number
  totalChapter: number
  averageRating: number
  reviewCount: number
  premium: boolean
  novel: boolean
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
export interface BookUpdateInfo {
  id: string | number
  title: string
  content: string
  categories: number[]
  tags: number[]
  thumbnail?: string | null
  thumbnailUrl: string
  isPremium: boolean
  isNovel: boolean
}

export interface BookAddInfo {
  title: string
  content: string
  categories: number[]
  tags: number[]
  thumbnail?: string | null
  thumbnailUrl: string
  isPremium: boolean
  isNovel: boolean
}