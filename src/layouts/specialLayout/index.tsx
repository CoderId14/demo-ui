
import { Layout } from 'antd'
import { Content, Footer } from 'antd/lib/layout/layout'

interface Props {
  children: JSX.Element[] | JSX.Element
}

function SpecialLayout(props: Props) {
  return (
    <Layout>
      <Layout>
        <Content style={{ padding: '0 50px' }}>{props.children}</Content>
      </Layout>
      <Footer
        style={{
          textAlign: 'center'
        }}
      >
        footer
      </Footer>
    </Layout>
  )
}

export default SpecialLayout
