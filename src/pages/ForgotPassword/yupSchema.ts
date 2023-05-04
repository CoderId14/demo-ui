import yup from '@/Utils/yupGlobal'

export const formSchema = yup.object().shape({
  usernameOrEmail: yup
    .string()
    .matches(/^(?:[A-Zd][A-Zd_-]{4,25}|[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4})$/i, 'Email or username invalid')
    .required('Username or Email is required')
    .min(4, 'Username or Email length should be at least 4 characters')
    .max(25, 'Username or Email length cannot exceed more than 25 characters')
})
