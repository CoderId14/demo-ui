export interface BookParamRequest {
  id?: number
  title?: string
  content?: string
  shortDescription?: string
  categories?: string
  tags?: string
  thumbnail?: string | null
  thumbnailUrl?: string
  createdDate?: string
  user?: number
  page?: number
  size?: number
  detail?: boolean | string
  isActive?: boolean
}

export interface BookMarkParamRequest {
  book?: number
  page: number
  size: number
}
