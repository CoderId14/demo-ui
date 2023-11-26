import yup from '@/Utils/yupGlobal'

export const formSchema = yup.object().shape({
  name: yup
  .string()
  .required('Full Name is required')
  .matches(
    /^(?=.{4,50}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
    "Name don't contain special characters"
  )
  .max(50, ' Full Name length cannot exceed more than 50 characters'),
  username: yup
    .string()
    .required('Username is required')
    .matches(
      /^(?=.{4,50}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username must minimum 4 characters and don't contain special characters"
    )
    .max(50, ' Username length cannot exceed more than 50 characters'),
  email: yup
    .string()
    .required('Email is required')
    .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Email invalid')
    .max(50, ' Email length cannot exceed more than 50 characters'),
  password: yup
    .string()
    .required('Password is required')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/,
      "Password must minimum 4 characters, at least 1 letter and 1 number and don't contain special characters"
    )
    .max(50, ' Password length cannot exceed more than 50 characters'),
  rePassword: yup
    .string()

    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/,
      "Password must minimum 4 characters, at least 1 letter and 1 number and don't contain special characters"
    )
    .max(50, 'Password length cannot exceed more than 50 characters')
    .oneOf([yup.ref('password')], 'Password do not match')
    .required('Re-Password is required')
})
