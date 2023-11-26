import Sider from '@/components/sider'
import { Layout } from 'antd'
import UserInfoSection from './UserInfo'
import { NavLink } from 'react-router-dom'
import { AppConst } from '@/app-const'
import { useFetchUserInfo } from '@/services/client/userService'
import { useEffect, useState } from 'react'
export type Item = {
  key: string
  icon?: JSX.Element | undefined
  label: string | JSX.Element
}

interface SiderProps{
  collapsed: boolean
  items: Item[]
}

function UserProfile() {
  const { data } = useFetchUserInfo();
  const [permission, setPermission] = useState<boolean>(false);
  const siderProps: SiderProps = {
    collapsed: false,
    items: [
      {
        key: 'sub-1',
        icon: undefined,
        label: 'User Profile'
      },
      {
        key: 'sub-2',
        icon: undefined,
        label: 'User Book'
      },
      {
        key: 'sub-3',
        icon: undefined,
        label: 'User History'
      },
      {
        key: 'sub-4',
        icon: undefined,
        label: permission ? <NavLink to={AppConst.WRITER_DASHBOARD_URL}>Creator</NavLink> : <></>
      }
    ]
  }
  useEffect(() => {
    if (data) {
      setPermission(data?.roles?.find((role) => role.match('ROLE_WRITER'))? true : false);
    }
  }, [data])
  return (
    <>
      <Layout>
        <Sider collapsed={siderProps.collapsed} items={siderProps.items}></Sider>
        <Layout.Content>
          <UserInfoSection></UserInfoSection>
        </Layout.Content>
        
      </Layout>
    </>
  )
}

export default UserProfile
