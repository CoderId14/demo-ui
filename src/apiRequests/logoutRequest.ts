import { AppConst } from '@/app-const'
import { logoutStart, logoutSuccess, logoutFailed } from '@/redux/authSlice'

import { NavigateFunction } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Dispatch } from 'redux'

export const logOut = async (dispatch: Dispatch, navigate: NavigateFunction) => {
  dispatch(logoutStart())
  try {
    dispatch(logoutSuccess('Logout succcess'))
    navigate(AppConst.HOME_URL)
    toast.success('Logged out successfully')
  } catch (error) {
    dispatch(logoutFailed('log out failed'))
    toast.error('Logged out failed')
  }
}
