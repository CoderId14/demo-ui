import { message } from 'antd'
import { Navigate, Outlet } from 'react-router-dom'

interface Props {
  isAllowed: boolean
  redirectPath?: string
  children: JSX.Element
}

function PrivateRoute({ isAllowed, children, redirectPath = '/login' }: Props) {
  if (!isAllowed) {
    message.warning('You must login first')
    return <Navigate to={redirectPath} replace />
  }
  return children ? children : <Outlet></Outlet>
}

export default PrivateRoute
