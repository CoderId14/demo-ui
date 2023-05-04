import { Dispatch } from 'react'
import { NavigateFunction } from 'react-router-dom'
import { AnyAction } from 'redux'
import jwtDecode from 'jwt-decode'
import { loginFailed, loginGoogleSuccess, loginStart, loginSuccess } from '../redux/authSlice'
import axiosInstance from '../config/axios'

import { toast } from 'react-toastify'
import { AppConst } from '@/app-const'
import { JwtInfo, ResponseLogin } from '@/types/auth.type'

export const loginUser = async (
  payload: { username: string; password: string },
  dispatch: Dispatch<AnyAction>,
  navigate: NavigateFunction
) => {
  dispatch(loginStart())
  try {
    console.log('login started ')
    const res = await axiosInstance.post<ResponseLogin>('auth/v1/login', payload)
    const dataJwt: JwtInfo = jwtDecode(res.data.responseData.accessToken)

    const data = {
      ...dataJwt,
      accessToken: res.data.responseData.accessToken
    }
    console.log('jwt decode: ', data)
    // Data luu vao store
    dispatch(loginSuccess(data))
    if (dataJwt.roles.includes('ROLE_ADMIN')) {
      navigate(AppConst.HOME_ADMIN_URL)
    } else {
      navigate(AppConst.HOME_URL)
    }

    toast.success(res.data.message)
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === 400) {
        console.log('before loginFailed')
        const data = error.response.data as any
        dispatch(loginFailed(data.message))
      } else if (error.response.status === 401) {
        console.log('before loginFailed')
        dispatch(loginFailed(AppConst.LOGIN_FAILED_401))
        // Account is not active
      } else if (error.response.status === 406) {
        dispatch(loginFailed(error.response.data.message))
        toast.error(error.response.data.message)
      } else if (error.code === 'ERR_NETWORK') {
        dispatch(loginFailed('Network Error'))
      } else {
        dispatch(loginFailed('Internal Error'))
      }
    }
  }
}

export const loginUserWithGoogle = async (
  accessToken: string | null,
  dispatch: Dispatch<AnyAction>,
  navigate: NavigateFunction
) => {
  dispatch(loginStart())
  try {
    const res = await axiosInstance.get('/user/current-user', {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    })
    console.log('login with google')

    console.log('res: ', res)
    dispatch(
      loginGoogleSuccess({
        ...res.data,
        accessToken: accessToken
      })
    )
    navigate(AppConst.HOME_URL)
    return res
  } catch (error) {
    dispatch(loginFailed)
  }
}
