import { useSelector } from 'react-redux'
import { selectAuth } from '@/redux/store'

const HomeAdmin = () => {
  const login = useSelector(selectAuth).login
  const user = login?.user ? login.user : null

  return (
    <>
      <h1>Hello admin {user && user.username} </h1>
    </>
  )
}

export default HomeAdmin
