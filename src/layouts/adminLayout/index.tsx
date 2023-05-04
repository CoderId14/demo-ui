import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons'
import { Layout } from 'antd'
import React, { useState } from 'react'

import styles from './adminLayout.module.scss'

import classNames from 'classnames/bind'
import { ItemType } from 'antd/lib/menu/hooks/useItems'
import { NavbarMain } from '@/components/Navbar'
import Sider from '@/components/sider'
const cx = classNames.bind(styles)
const { Header, Content } = Layout

interface Props {
  items?: ItemType[] | undefined
  children?: JSX.Element[] | JSX.Element
}

function AdminLayout(props: Props) {
  const [collapsed, setCollapsed] = useState(false)
  console.log('admin re render')
  const items = [
    {
      key: '1',
      icon: <UserOutlined />,
      label: 'Quản Lý',
      children: []
    }
  ]
  return (
    <Layout>
      <Sider items={items} collapsed={collapsed}></Sider>
      <Layout className={cx('site-layout')}>
        <Header className={cx('site-layout-background')} style={{ padding: 0 }}>
          <NavbarMain></NavbarMain>

          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed)
          })}
        </Header>
        <Content
          className={cx('site-layout-background')}
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default AdminLayout
