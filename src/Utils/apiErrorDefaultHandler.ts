import { AppConst } from '@/app-const'

import { toast } from 'react-toastify'

export default function apiErrorDefaultsHandler(errorCode: number) {
  if (errorCode === 400) {
    toast.error(AppConst.DEFAULT_MESSAGE_400)
  } else if (errorCode === 401) {
    toast.error(AppConst.DEFAULT_MESSAGE_401)
  }
}
