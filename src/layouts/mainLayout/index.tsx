import { NavbarMain } from '@/components/Navbar'

import { Layout } from 'antd'
import { Content, Footer } from 'antd/lib/layout/layout'

interface Props {
  children: JSX.Element[] | JSX.Element
}

function MainLayout(props: Props) {
  return (
    <Layout>
      <NavbarMain></NavbarMain>
      <Layout>
        <Content style={{ padding: '0 50px' }}>{props.children}</Content>
      </Layout>
      <Footer
        style={{
          textAlign: 'center'
        }}
      >
        Created by DTH
      </Footer>
    </Layout>
  )
}

export default MainLayout
