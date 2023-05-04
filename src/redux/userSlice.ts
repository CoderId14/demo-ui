import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ResponseGetEmail, ResponseGetMailToken } from '../types/mail.type'

interface forgotPasswordInitialState {
  email: string | null
  token: string | null
  message?: string
  error: boolean
  isFetching: boolean
}

const forgotPasswordInitialState: forgotPasswordInitialState = {
  email: null,
  token: null,
  message: '',
  error: false,
  isFetching: false
}

const userSlice = createSlice({
  name: 'user',
  initialState: {
    forgotPassword: forgotPasswordInitialState
  },
  reducers: {
    setEmail: (state: any, action: PayloadAction<ResponseGetEmail>) => {
      state.forgotPassword.email = action.payload.responseData
    },
    setEmailFailed: (state: any) => {
      state.forgotPassword.email = null
    },

    sendMailRecoveryStart: (state: any) => {
      state.forgotPassword.isFetching = true
    },
    sendMailRecoverySuccess: (state: any, action: PayloadAction<ResponseGetMailToken>) => {
      state.forgotPassword.email = action.payload.responseData.email
      state.forgotPassword.token = action.payload.responseData.token
      state.forgotPasswords.message = action.payload.message
      state.forgotPassword.error = false
      state.forgotPassword.isFetching = false
    },
    sendMailRecoveryFailed: (state: any, action: PayloadAction<string>) => {
      state.forgotPassword.email = ''
      state.forgotPassword.token = ''
      state.forgotPasswords.message = action.payload
      state.forgotPassword.error = false
      state.forgotPassword.isFetching = false
    },
    changePasswordStart: (state: any) => {
      state.forgotPasswords.isFetching = true
    },
    changePasswordSuccess: (state: any) => {
      state.forgotPassword.email = null
      state.forgotPassword.token = null
      state.forgotPassword.error = false
      state.forgotPasswords.isFetching = false
    },
    changePasswordFailed: (state: any) => {
      state.forgotPassword.error = true
    },
    clearStateForgotPassword: (state: any) => {
      state.forgotPassword.email = null
      state.forgotPassword.token = null
      state.forgotPassword.error = false
      state.forgotPasswords.isFetching = false
    }
  }
})

export const {
  setEmail,
  sendMailRecoverySuccess,
  sendMailRecoveryStart,
  sendMailRecoveryFailed,
  changePasswordStart,
  changePasswordFailed,
  changePasswordSuccess,
  clearStateForgotPassword,
  setEmailFailed
} = userSlice.actions

export default userSlice.reducer
