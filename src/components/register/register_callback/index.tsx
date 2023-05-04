import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { activeUser } from '@/apiRequests/registerRequest'
import { AppConst } from '@/app-const'

export default function RegisterCallback() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const urlParam = new URLSearchParams(window.location.search)
  const token = urlParam.get('token') || ''
  if (token == '') {
    navigate(AppConst.LOGIN_URL)
  }
  useEffect(() => {
    console.log(token)
    activeUser(token, dispatch, navigate)
  }, [])

  return <div>RegisterCallback</div>
}
