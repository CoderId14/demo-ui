import { AppConst } from '@/app-const'
import axiosInstance from '@/config/axios'
import { ITag, TagSearchParams } from '@/types/tag/tag.type'
import { toast } from 'react-toastify'

export const getTags = async (params: TagSearchParams) => {
  try {
    const res = await axiosInstance.get('/tag/v1/search', {
      headers: {
        'content-type': 'application/json'
      },
      params: params
    })
    const data: ITag = res.data
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
