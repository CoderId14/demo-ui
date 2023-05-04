import { useSelector } from 'react-redux'
import { selectAuth, selectUser } from '../../redux/store'
import { Link } from 'react-router-dom'

const MailRedirect = () => {
  const user = useSelector(selectAuth).register.user
  const emailVerify = user.email

  const emailRecovery = useSelector(selectUser).forgotPassword.email

  if (emailVerify) {
    return (
      <h1>
        {' '}
        Go to <a href='https://gmail.com/'>{emailVerify}</a> to verify your account
      </h1>
    )
  } else {
    if (emailRecovery) {
      return (
        <h1>
          {' '}
          Go to <a href='https://gmail.com/'>{emailRecovery}</a> to recovery your password
        </h1>
      )
    }
    return (
      <h1>
        {' '}
        Go back to <Link to='/login'>Login</Link>
      </h1>
    )
  }
}

export default MailRedirect
