import { Link, useNavigate } from 'react-router-dom'
import { selectAuth } from '../../redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { logOut } from '@/apiRequests/logoutRequest'

import { Avatar, Button, Dropdown, Space } from 'antd'
import { HomeOutlined, LogoutOutlined, UnorderedListOutlined, UserOutlined } from '@ant-design/icons'

import classNames from 'classnames/bind'
import styles from './Nav.module.scss'
import { AppConst } from '@/app-const'
import { Header } from 'antd/lib/layout/layout'
import Search from 'antd/es/input/Search'

const cx = classNames.bind(styles)
export const NavbarMain = () => {
  const login = useSelector(selectAuth).login
  const user = login?.user ? login.user : null
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = () => {
    if (user) logOut(dispatch, navigate)
  }

  
  return (
    <>
      <Header className={cx('layout-page-header')} style={{ backgroundColor: 'white' }}>
        <div className={cx('item')}>
          <Space size={[40,10]} align='center'>
            <Link to={AppConst.HOME_URL}>
              <HomeOutlined style={{ fontSize: 36, marginTop: 4 }} />
            </Link>
            <Dropdown
              menu={{
                items: [
                  {
                    key: '1',
                    icon: <UserOutlined className={cx('icon-action')} />,
                    label: <span onClick={() => navigate('/')}>User Profile</span>
                  },
                  {
                    key: '2',
                    icon: <LogoutOutlined className={cx('icon-action')} />,
                    label: <span onClick={handleLogout}>Logout</span>
                  }
                ]
              }}
            >
              <Space align='center'>
                <UnorderedListOutlined style={{fontSize: 24}}/>
                <strong >Category</strong>
              </Space> 
            </Dropdown>
            <div style={{display: 'flex', alignItems: 'center'}}>
            <Search></Search>
            </div>
          </Space>
          
        </div>
        {user?.accessToken ? (
          <div className={cx('item')}>
            <Dropdown
              menu={{
                items: [
                  {
                    key: '1',
                    icon: <UserOutlined className={cx('icon-action')} />,
                    label: <span onClick={() => navigate('/')}>User Profile</span>
                  },
                  {
                    key: '2',
                    icon: <LogoutOutlined className={cx('icon-action')} />,
                    label: <span onClick={handleLogout}>Logout</span>
                  }
                ]
              }}
            >
              <Avatar icon={<UserOutlined className={cx('avatar')} />} />
            </Dropdown>
          </div>
        ) : (
          <Button type='primary' size='large'>
            Login
          </Button>
        )}
      </Header>
    </>
  )
}
