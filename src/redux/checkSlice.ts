import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface initialStateI {
  isFetching: boolean
  error: boolean
  message: string
}

const initialState: initialStateI = {
  isFetching: false,
  error: false,
  message: ''
}

const checkSlice = createSlice({
  name: 'check',
  initialState: {
    username: initialState,
    email: initialState
  },
  reducers: {
    usernameCheckFail: (state: any, action: PayloadAction<string>) => {
      state.username.isFetching = false
      state.username.error = true
      state.username.message = action.payload
    },
    usernameCheckStart: (state: any) => {
      state.username.error = false
      state.username.isFetching = true
    },
    usernameCheckSuccess: (state: any) => {
      state.username.error = false
      state.username.isFetching = false
      state.username.message = ''
    },
    emailCheckFail: (state: any, action: PayloadAction<string>) => {
      state.email.isFetching = false
      state.email.error = true
      state.email.message = action.payload
    },
    emailCheckStart: (state: any) => {
      state.email.error = false
      state.email.isFetching = true
    },
    emailCheckSuccess: (state: any) => {
      state.email.error = false
      state.email.isFetching = false
      state.email.message = ''
    }
  }
})

export const {
  usernameCheckStart,
  usernameCheckSuccess,
  usernameCheckFail,
  emailCheckFail,
  emailCheckStart,
  emailCheckSuccess
} = checkSlice.actions

export default checkSlice.reducer
