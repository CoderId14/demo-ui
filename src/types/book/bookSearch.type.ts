export interface BookParamRequest {
  id?: number
  title?: string
  content?: string
  shortDescription?: string
  categories?: number[]
  tags?: number[]
  thumbnail?: string | null
  thumbnailUrl?: string
  user?: number
  page?: number
  size?: number
  detail?: boolean | string
}
