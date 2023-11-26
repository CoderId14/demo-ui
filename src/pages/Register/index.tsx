import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { SubmitHandler } from 'react-hook-form'
import { registerUser, isUsernameExist, isEmailExist } from '@/apiRequests/registerRequest'
import debounce from 'lodash.debounce'
import { formSchema } from './yupSchema'
import classNames from 'classnames/bind'
import styles from './Register.module.scss'
import { Button, Form, Input, Typography } from 'antd'
import { selectAuth, selectCheck } from '../../redux/store'
import { useEffect } from 'react'

const cx = classNames.bind(styles)

interface IFormInput {
  name: string
  username: string
  password: string
  rePassword: string
  email: string
}

function Register() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const register = useSelector(selectAuth).register
  const checkUsername = useSelector(selectCheck).username
  const checkEmail = useSelector(selectCheck).email

  const isFetchingUsername = checkUsername.isFetching
  const isFetchingEmail = checkEmail.isFetching
  const isFetching = register.isFetching

  const [form] = Form.useForm()

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log('data from form: ', data)
    console.log('test ', form.getFieldValue('username'))
    const { username, password, email, name } = data
    const request = {
      username: username,
      password: password,
      name: name,
      email: email
    }
    console.log('data request: ', request)
    registerUser(request, dispatch, navigate)
  }
  const yupSync = {
    async validator({ field }: any, value: any) {
      formSchema.validateSyncAt(field, { [field]: value })
    }
  }

  const checkUsernameExist = async () => {
    const username: string = form.getFieldValue('username')
    if (username.length >= 4 && username.match(/^(?=.{4,50}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/))
      isUsernameExist(username, dispatch, navigate)
  }
  const checkEmailExist = async () => {
    const email: string = form.getFieldValue('email')
    if (email.length >= 4 && email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) isEmailExist(email, dispatch, navigate)
  }

  const debounceOnChangeUsername = debounce(checkUsernameExist, 700)
  const debounceOnChangeEmail = debounce(checkEmailExist, 700)
  console.log('refresh')
  useEffect(() => {
    if (checkUsername.error) {
      form.setFields([
        {
          name: 'username',
          errors: [checkUsername.message]
        }
      ])
    }
  }, [isFetchingUsername])
  useEffect(() => {
    if (checkEmail.error) {
      form.setFields([
        {
          name: 'email',
          errors: [checkEmail.message]
        }
      ])
    }
  }, [isFetchingEmail])
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
        <Form.Item name='name' rules={[yupSync]}>
          <Input placeholder='Full name'></Input>
        </Form.Item>
        <Form.Item name='username' rules={[yupSync]}>
          <Input onChange={debounceOnChangeUsername} placeholder='Username'></Input>
        </Form.Item>

        <Form.Item name='password' rules={[yupSync]}>
          <Input.Password placeholder='Password'></Input.Password>
        </Form.Item>

        <Form.Item
          name='rePassword'
          rules={[
            {
              required: true,
              message: 'Please confirm your password!'
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('The two passwords that you entered do not match!'))
              }
            })
          ]}
        >
          <Input.Password placeholder='Re Password'></Input.Password>
        </Form.Item>

        <Form.Item name='email' rules={[yupSync]}>
          <Input placeholder='Email' onChange={debounceOnChangeEmail}></Input>
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit' block loading={isFetching}>
            Register
          </Button>
        </Form.Item>
        <Form.Item className={cx('extras')}>
          <div className={cx('center-items')}>
            <div>
              <Typography.Text type='secondary'>Already have an Account?</Typography.Text>

              <Link to='/login' className='text'>
                Login
              </Link>
            </div>
          </div>
        </Form.Item>
      </Form>
    </section>
  )
}

export default Register
