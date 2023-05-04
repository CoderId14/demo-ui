import axiosInstance from '@/config/axios'
import {
  changePasswordFailed,
  changePasswordStart,
  changePasswordSuccess,
  clearStateForgotPassword,
  sendMailRecoveryFailed,
  sendMailRecoveryStart,
  sendMailRecoverySuccess,
  setEmail,
  setEmailFailed
} from '@/redux/userSlice'
import { ResponseGetEmail, ResponseGetMailToken } from '@/types/mail.type'
import { ResponseGetUserFromToken } from '@/types/user.type'
import { NavigateFunction } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AnyAction, Dispatch } from 'redux'

export const getUserByToken = async (token: string, dispatch: Dispatch<AnyAction>, navigate: NavigateFunction) => {
  try {
    const res = await axiosInstance.get<ResponseGetUserFromToken>('/user/forgot-password', {
      params: {
        token: token
      }
    })
    console.log('res.data getUserByToken = ' + JSON.stringify(res.data))
    const temp: ResponseGetEmail = {
      ...res.data,
      responseData: res.data.responseData.username
    }
    dispatch(setEmail(temp))
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === 400) {
        dispatch(setEmailFailed)
        navigate('/login')
        toast.error(error.response.data.message)
      } else if (error.code === 'ERR_NETWORK') {
        toast.error(error.response.data.message)
      } else if (error.response.status === 409) {
        dispatch(clearStateForgotPassword)
        toast.error(error.response.data.message)
        navigate('/login')
      }
    }
  }
}

interface IChangePassword {
  usernameOrEmail: string
  password: string
  token: string
}

export const changPassword = async (
  data: IChangePassword,
  dispatch: Dispatch<AnyAction>,
  navigate: NavigateFunction
) => {
  dispatch(changePasswordStart)
  try {
    const res = await axiosInstance.post('/user/change-password', data)
    console.log('res.data = ' + JSON.stringify(res.data))
    dispatch(changePasswordSuccess)
    toast.success(res.data.message)
    navigate('/login')
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === 400) {
        dispatch(changePasswordFailed)
        error.response.data.messages.forEach((message: string) => {
          toast.error(message)
        })
        // Token is invalid
      } else if (error.response.status === 409) {
        dispatch(clearStateForgotPassword)
        toast.error(error.response.data.message)
        navigate('/login')
      }
    }
  }
}

export const sendMailForgotPassword = async (
  usernameOrEmail: string,
  dispatch: Dispatch<AnyAction>) => {
  dispatch(sendMailRecoveryStart)
  try {
    const res = await axiosInstance.post<ResponseGetMailToken>('/user/forgot-password', {
      usernameOrEmail
    })
    console.log('res.data = ' + JSON.stringify(res.data))
    dispatch(sendMailRecoverySuccess(res.data))
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === 400) {
        dispatch(sendMailRecoveryFailed(error.response.data.message))
        toast.error(error.response.data.message)
      } else if (error.response.status === 401) {
        dispatch(sendMailRecoveryFailed(error.response.data.message))
        toast.error(error.response.data.message)
      }
    }
  }
}

export const forgotPasswords = async (
  usernameOrEmail: string,
  dispatch: Dispatch<AnyAction>,
  navigate: NavigateFunction
) => {
  try {
    const res = await axiosInstance.get<ResponseGetEmail>('/user', {
      params: {
        usernameOrEmail: usernameOrEmail
      }
    })
    dispatch(setEmail(res.data))
    navigate('/verify')
    sendMailForgotPassword(res.data.responseData, dispatch)
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === 400) {
        dispatch(sendMailRecoveryFailed(error.response.data.message))
        toast.error(error.response.data.message)
      }
    }
  }
}
