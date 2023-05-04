import { registerFailed, registerStart, registerSuccess } from '@/redux/authSlice'
import { NavigateFunction } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Dispatch } from 'redux'
import axiosInstance from '@/config/axios'
import { ResponseRegister } from '@/types/user.type'
import {
  emailCheckFail,
  emailCheckStart,
  emailCheckSuccess,
  usernameCheckFail,
  usernameCheckStart,
  usernameCheckSuccess
} from '@/redux/checkSlice'

export const isEmailExist = async (email: string, dispatch: Dispatch, _navigate: NavigateFunction) => {
  dispatch(emailCheckStart())
  console.log('registerStart')
  try {
    const res = await axiosInstance.post('auth/register/email', {
      email: email
    })
    console.log(res)
    console.log('count')
    if (res.data) dispatch(emailCheckFail('email already exists'))
    else dispatch(emailCheckSuccess())
  } catch (e) {
    console.log(e)
  }
}
export const isUsernameExist = async (username: string, dispatch: Dispatch, _navigate: NavigateFunction) => {
  dispatch(usernameCheckStart())
  console.log('registerStart')
  try {
    const res = await axiosInstance.post('auth/register/username', {
      username: username
    })
    console.log(res)
    console.log('count')
    if (res.data) dispatch(usernameCheckFail('username already exists'))
    else dispatch(usernameCheckSuccess())
  } catch (e) {
    console.log(e)
  }
}

interface UserRegister {
  username: string
  email: string
  password: string
}
export const registerUser = async (user: UserRegister, dispatch: Dispatch, navigate: NavigateFunction) => {
  dispatch(registerStart)
  try {
    const res = await axiosInstance.post<ResponseRegister>('/auth/v1/register', user)
    dispatch(registerSuccess(res.data))
    navigate('/verify')
    toast.success(res.data.message)
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === 400) {
        dispatch(registerFailed(error.response.data.message))
        toast.error(error.response.data.message)
      }
    } else if (error.request) {
      console.log(error.request)
    } else {
      console.log(error.request)
      dispatch(registerFailed('Register failed'))
    }
  }
}

export const activeUser = async (token: string, dispatch: Dispatch, navigate: NavigateFunction) => {
  dispatch(registerStart)
  const request = {
    token: token
  }
  try {
    const res = await axiosInstance.post('/auth/register/confirm', request)
    toast.success(res.data)
    navigate('/login')
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === 400) {
        toast.error(error.response.data.message)
      }
    }
  }
}
