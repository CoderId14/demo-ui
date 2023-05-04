export interface Tag {
  tagId: number
  tagName: string
  description: string
  modifiedDate: string
}

export interface TagSearchParams {
  id?: number
  name?: string
  books?: number[]
}
