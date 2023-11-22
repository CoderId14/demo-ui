export interface UserInfo {
  userId: number
  email: string
  username: string
  name: string | null
  isActive: boolean
  avatar: string | null
  roles: string[]
  createDate: string
  modifyDate: string
  coin: number
}

export interface IUserResponse {
  userId: number
  email: string
  username: string
  name: string
  isActive: boolean
  avatar: string
  roles: string[]
  createDate: string
  modifyDate: string
  coin: number
}