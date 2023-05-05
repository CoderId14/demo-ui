import { logOut } from '@/apiRequests/logoutRequest'
import { AppConst } from '@/app-const'
import { selectAuth } from '@/redux/store'
import { HomeOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Breadcrumb, Button, Col, Dropdown, Row, Space } from 'antd'
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
          {user?.accessToken ? (
            <div>
              <Dropdown
                menu={{
                  items: [
                    {
                      key: '1',
                      icon: <UserOutlined />,
                      label: <span onClick={() => navigate('/')}>User Profile</span>
                    },
                    {
                      key: '2',
                      icon: <LogoutOutlined />,
                      label: <span onClick={handleLogout}>Logout</span>
                    }
                  ]
                }}
              >
                <Avatar icon={<UserOutlined />} />
              </Dropdown>
            </div>
          ) : (
            <Button type='primary' size='large'>
              Login
            </Button>
          )}
        </Row>
      </Col>
    </Row>
  )
}

export default NavBarChapterDetail
