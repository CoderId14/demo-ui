import yup from '@/Utils/yupGlobal'

export const formSchema = yup.object().shape({
  password: yup
    .string()
    .required('Password is required')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/,
      'Password must minimum 4 characters, at least 1 letter and 1 number'
    )
    .max(16, ' Password length cannot exceed more than 16 characters'),
  rePassword: yup
    .string()
    .required('Re-Password is required')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/,
      'Password must minimum 4 characters, at least 1 letter and 1 number'
    )
    .max(16, 'Password length cannot exceed more than 16 characters')
    .oneOf([yup.ref('password')], 'Password do not match')
})
