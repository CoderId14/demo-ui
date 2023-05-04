import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ResponseRegister } from '@/types/user.type'
import {
  loginInitialState,
  registerInitialState,
  logoutInitialState,
  loginGoogleInitialState,
  DataLogin
} from '@/types/auth.type'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    login: loginInitialState,
    register: registerInitialState,
    logout: logoutInitialState,
    loginGoogle: loginGoogleInitialState
  },
  reducers: {
    loginStart: (state: any) => {
      state.login.isFetching = true
    },
    loginSuccess: (state: any, action: PayloadAction<DataLogin>) => {
      console.log('action: ' + JSON.stringify(action.payload))
      state.login.isFetching = false
      state.login.user = {
        username: action.payload.sub,
        accessToken: action.payload.accessToken,
        roles: action.payload.roles
      }
      state.login.error = false
      state.login.message = 'Login successfully'
    },
    loginGoogleSuccess: (state: any, action) => {
      console.log('action google login: ' + JSON.stringify(action.payload))
      state.login.isFetching = false
      state.login.user = {
        username: action.payload.responseData,
        accessToken: action.payload.accessToken,
        roles: 'ROLE_USER'
      }
      state.login.error = false
      state.login.message = action.payload.message
    },
    loginFailed: (state: any, action: PayloadAction<string>) => {
      state.login.isFetching = false
      state.login.error = true
      state.login.message = action.payload
    },
    loginGoogle: (state: any, action: PayloadAction<string>) => {
      state.loginGoogle.accessToken = action.payload
    },

    registerStart: (state: any) => {
      state.register.isFetching = true
    },
    registerSuccess: (state: any, action: PayloadAction<ResponseRegister>) => {
      state.register.user = {
        email: action.payload.responseData.email,
        username: action.payload.responseData.username
      }
      state.register.isFetching = false
      state.register.error = false
      state.register.success = true
      state.register.message = action.payload.message
    },
    registerFailed: (state: any, action: PayloadAction<string>) => {
      state.register.isFetching = false
      state.register.error = true
      state.register.success = false
      state.register.message = action.payload
    },
    logoutStart: (state: any) => {
      state.logout.isFetching = true
    },
    logoutSuccess: (state: any, action: PayloadAction<string>) => {
      state.logout.isFetching = false
      state.logout.error = false
      state.login.user = null
      state.login.message = null
      state.logout.message = action.payload
    },
    logoutFailed: (state: any, action: PayloadAction<string>) => {
      state.logout.isFetching = false
      state.logout.error = true
      state.logout.message = action.payload
    }
  }
})

export const {
  loginStart,
  loginFailed,
  loginSuccess,
  loginGoogleSuccess,
  registerStart,
  registerFailed,
  registerSuccess,
  logoutStart,
  logoutSuccess,
  logoutFailed
} = authSlice.actions

export default authSlice.reducer
