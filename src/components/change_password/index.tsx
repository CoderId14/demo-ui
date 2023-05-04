import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser } from '../../redux/store'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { changPassword, getUserByToken } from '@/apiRequests/forgotRequest'
import { formSchema } from './yupSchema'
import { Button, Form, Input } from 'antd'

interface IFormInput {
  usernameOrEmail: string
  password: string
  rePassword: string
}

const ChangePasswordForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(selectUser).forgotPassword
  const email = user.email

  const urlParam = new URLSearchParams(window.location.search)

  const tokenFromEmail = urlParam.get('token') || ''

  useEffect(() => {
    if (tokenFromEmail) {
      if (email == null) getUserByToken(tokenFromEmail, dispatch, navigate)
    } else {
      navigate('/login')
    }
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormInput>({
    mode: 'onChange',
    resolver: yupResolver(formSchema)
  })

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log('data from form: ', data)
    const { usernameOrEmail, password } = data
    const request = {
      usernameOrEmail: usernameOrEmail,
      password: password,
      token: tokenFromEmail
    }
    console.log('data request: ', request)
    changPassword(request, dispatch, navigate)
  }
  return (
    <Form onFinish={handleSubmit(onSubmit)}>
      <Form.Item className='mb-3' name='usernameOrEmail' label='Email or Username'>
        <Input type='text' readOnly value={email || 'Email khong hop le'} {...register('usernameOrEmail')} />
      </Form.Item>
      <Form.Item className='mb-3' name='password' label='New Password'>
        <Input type='password' placeholder='Password' {...register('password')} />
        {errors.rePassword && <p className='fw-bold text-uppercase text-danger'> {errors?.password?.message}</p>}
      </Form.Item>
      <Form.Item className='mb-3' name='re-password' label='Re New Password'>
        <Input type='password' placeholder='Re Password' {...register('rePassword')} />
        {errors.rePassword && <p className='fw-bold text-uppercase text-danger'> {errors?.rePassword?.message}</p>}
      </Form.Item>
      <Button type='primary' htmlType='submit'>
        Submit
      </Button>
    </Form>
  )
}

export default ChangePasswordForm
