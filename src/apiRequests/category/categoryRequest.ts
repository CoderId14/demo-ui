import { AppConst } from '@/app-const'
import axiosInstance from '@/config/axios'
import { Category, CategorySearchParams } from '@/types/category/category.type'
import { toast } from 'react-toastify'

export const getCategories = async (params: CategorySearchParams) => {
  try {
    const res = await axiosInstance.get('/category/v1/search', {
      headers: {
        'content-type': 'application/json'
      },
      params: params
    })
    const data: Category = res.data
    return data
  } catch (err: any) {
    // catch error
    if (err.response) {
      if (err.response.status === 400) {
        toast.error(AppConst.DEFAULT_MESSAGE_400)
      } else if (err.response.status === 404) {
        toast.error(AppConst.DEFAULT_MESSAGE_404)
      } else if (err.response.status === 401) {
        toast.error(AppConst.DEFAULT_MESSAGE_401)
      }
    }
  }
}
