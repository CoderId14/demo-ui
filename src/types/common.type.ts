export interface ApiResponse {
  success: boolean
  message: string
}

export interface PageParams {
  page?: number
  size?: number
  sort?: string
}
