export interface Category {
  categoryId: number
  categoryName: string
  description: string
  modifiedDate: string
}

export interface CategorySearchParams {
  id?: number
  name?: string
  books?: number[]
}
