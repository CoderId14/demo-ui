import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { loginUserWithGoogle } from '@/apiRequests/loginRequest'

export default function GoogleCallBack() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const urlParam = new URLSearchParams(window.location.search)

  useEffect(() => {
    const token = urlParam.get('token') ? urlParam.get('token') : ''
    console.log(token)
    loginUserWithGoogle(token, dispatch, navigate)
  }, [])

  return <div>GoogleCallBack</div>
}
