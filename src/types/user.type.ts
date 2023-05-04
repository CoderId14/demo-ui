export type Roles = {
  id: number
  createBy: string
  modifyBy: string
  createDate: string
  modifiedDate: string
  roleName: string
}
export type UserDto = {
  userId: number
  email: string
  username: string
  name: string
  isActive: boolean
  avatar: string
  roles: Roles
  createDate: string
  modifiedDate: string
}
export interface ResponseRegister {
  status: string
  message: string
  responseData: UserDto
}

export type UserFromToken = {
  username: string
}

export interface ResponseGetUserFromToken {
  status: string
  message: string
  responseData: UserFromToken
}
