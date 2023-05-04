import { logOut } from '@/apiRequests/logoutRequest'
import { AppConst } from '@/app-const'
import { selectAuth } from '@/redux/store'
import { HomeOutlined, LoginOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Breadcrumb, Col, Dropdown, MenuProps, Row, Space } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'

function NavBarChapterDetail() {
  const login = useSelector(selectAuth).login
  const user = login?.user ? login.user : null
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = () => {
    if (user) logOut(dispatch, navigate)
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <NavLink to='/' onClick={handleLogout}>
          <LogoutOutlined style={{ fontSize: 24 }} />
          Logout
        </NavLink>
      )
    },
    {
      key: '2',
      label: (
        <NavLink to={AppConst.LOGIN_URL}>
          <LoginOutlined style={{ fontSize: 24 }} />, Login
        </NavLink>
      )
    }
  ]
  return (
    <Row gutter={16} style={{ height: 50 }} align={'middle'}>
      <Col span={11} offset={1}>
        <Row wrap={false}>
          <Space wrap={false}>
            <NavLink to={AppConst.HOME_URL}>
              <HomeOutlined style={{ fontSize: 24 }} />
            </NavLink>
            <Breadcrumb
              style={{ whiteSpace: 'nowrap' }}
              items={[
                {
                  title: 'Home'
                },
                {
                  title: <Link to={AppConst.HOME_URL}>Test</Link>
                },
                {
                  title: <Link to={AppConst.HOME_URL}>Test</Link>
                },
                {
                  title: 'An Application'
                }
              ]}
            />
          </Space>
        </Row>
      </Col>
      <Col span={11}>
        <Row justify={'end'}>
          <Dropdown menu={{ items }} placement='bottomRight'>
            <Avatar icon={<UserOutlined style={{ fontSize: 24 }} />} />
          </Dropdown>
        </Row>
      </Col>
    </Row>
  )
}

export default NavBarChapterDetail
