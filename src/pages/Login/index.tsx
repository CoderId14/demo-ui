import { useEffect } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { selectAuth } from '@/redux/store'
import { SubmitHandler } from 'react-hook-form'
import { loginUser } from '@/apiRequests/loginRequest'
import { formSchema } from './yupSchema'
import { Button, Checkbox, Form, Input, Typography } from 'antd'

import { GooglePlusOutlined } from '@ant-design/icons'

import classNames from 'classnames/bind'
import styles from './Login.module.scss'
import { toast } from 'react-toastify'
import { HOST_NAME } from '@/environments'
const cx = classNames.bind(styles)

interface IFormInput {
  usernameOrEmail: string
  password: string
}

const LOGIN_GOOGLE_URL  = `${HOST_NAME}/oauth2/authorize/google?redirect_uri=${HOST_NAME}/oauth2/callback/google`
function Login() {
  const login = useSelector(selectAuth).login
  const user = login?.user ? login.user : null
  const isFetching = login.isFetching

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [form] = Form.useForm()
  useEffect(() => {
    if (user) {
      toast.info('You already login')
      navigate('/')
    }
  })

  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    console.log('data form ', data)
    const request = {
      username: data.usernameOrEmail,
      password: data.password
    }
    loginUser(request, dispatch, navigate)
  }
  useEffect(() => {
    if (login.error && !login.isFetching) {
      console.log('before display error')
      if (login.message.includes('Username') || login.message.includes('account')) {
        form.setFields([
          {
            name: 'usernameOrEmail',
            errors: [login.message]
          }
        ])
      } else if (login.message.includes('Password')) {
        form.setFields([
          {
            name: 'password',
            errors: [login.message]
          }
        ])
      }
    }
  }, [isFetching])

  const yupSync = {
    async validator({ field }: any, value: any) {
      await formSchema.validateSyncAt(field, { [field]: value })
    }
  }

  return (
    <section className={cx('container')}>
      <Form
        size='large'
        form={form}
        onFinish={onSubmit}
        name='basic'
        wrapperCol={{ offset: 8, span: 8 }}
        initialValues={{ remember: true }}
        autoComplete='off'
      >
        <Form.Item name='usernameOrEmail' rules={[yupSync]}>
          <Input placeholder='Username'></Input>
        </Form.Item>

        <Form.Item name='password' rules={[yupSync]}>
          <Input.Password placeholder='Password'></Input.Password>
        </Form.Item>
        <Form.Item name='remember' valuePropName='checked' wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox>Remember</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit' block loading={isFetching}>
            Login
          </Button>
        </Form.Item>
        <Form.Item className={cx('extras')}>
          <div className={cx('center-items')}>
            <div>
              <Typography.Text type='secondary'>Need an Account?</Typography.Text>

              <Link to='/register' className='text'>
                Register
              </Link>
            </div>
            <div>
              <Link to='/forgot' className='text'>
                Forgot Password
              </Link>
            </div>
          </div>

          <Button type='default' block className={cx('btn-google')}>
            <GooglePlusOutlined className={cx('icon-google')} />
            <a href={LOGIN_GOOGLE_URL}>
              Login With Google
            </a>
          </Button>
        </Form.Item>
      </Form>
    </section>
  )
}

export default Login
