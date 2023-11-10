export interface UserLogin {
  username: string
  password: string
  accessToken?: string
}

export interface User {
  username: string
  accessToken?: string
  roles: string
  userId: number
}

export interface UserGoogleLoginSliceState {
  accessToken: string | undefined
  isFetching: boolean
  error: boolean
  message: string
}
export const loginGoogleInitialState: UserGoogleLoginSliceState = {
  accessToken: undefined,
  isFetching: false,
  error: false,
  message: ''
}

export interface UserRegister {
  username: string
  password: string
  email: string
}

export interface UserLoginSliceState {
  user: User | undefined
  isFetching: boolean
  error: boolean
  message: string
}

export interface UserRegisterSliceState {
  user: { email: string; username: string }
  isFetching: boolean
  error: boolean
  success: boolean
  message: string
}
export interface UserLogoutSliceState {
  isFetching: boolean
  error: boolean
  success: boolean
}

export const loginInitialState: UserLoginSliceState = {
  user: undefined,
  isFetching: false,
  error: false,
  message: ''
}

export const registerInitialState: UserRegisterSliceState = {
  user: { email: '', username: '' },
  isFetching: false,
  error: false,
  success: false,
  message: ''
}
export const logoutInitialState: UserLogoutSliceState = {
  isFetching: false,
  error: false,
  success: false
}

export interface DataLogin {
  email: string
  exp: number
  iat: number
  roles: string
  sub: string
  userId: number
  accessToken: string
}

export interface ResponseLogin {
  status: string
  message: string
  responseData: {
    accessToken: string
    refreshToken: string
    username: string
  }
}
export interface JwtInfo {
  email: string
  exp: number
  iat: number
  roles: string
  sub: string
  userId: number
}
