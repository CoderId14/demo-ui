import {
  BookOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined} from '@ant-design/icons'
import { Layout } from 'antd'
import React, { useState } from 'react'

import styles from './adminLayout.module.scss'

import classNames from 'classnames/bind'
import { ItemType } from 'antd/lib/menu/hooks/useItems'
import Sider from './Sider'
import HeaderComponent from './header'
import { Link } from 'react-router-dom'
import { AppConst } from '@/app-const'

const cx = classNames.bind(styles)
const { Content } = Layout

interface Props {
  items?: ItemType[] | undefined
  children?: JSX.Element[] | JSX.Element
}

function DashLayout(props: Props) {
  const [collapsed, setCollapsed] = useState(false)
  console.log('admin re render')
  const items = [
    {
      key: '1',
      icon: <BookOutlined />,
      label: <Link to={AppConst.WRITER_DASHBOARD_URL}>DASHBOARD</Link>
    },
  ]
  return (
    <Layout>
      <HeaderComponent collapsed={true}></HeaderComponent>

      <Layout className={cx('site-layout')}>
        <Sider items={items} collapsed={collapsed}></Sider>
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: 'trigger',
          onClick: () => setCollapsed(!collapsed)
        })}

        <Content
          className={cx('site-layout-background')}
          style={{
            margin: '24px 16px',
            minHeight: 280
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default DashLayout
