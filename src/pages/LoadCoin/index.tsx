
import axiosInstance from '@/config/axios'
import { Button, Card, Col, Collapse, CollapseProps, Form, Input, Row } from 'antd'

const items: CollapseProps['items'] = [
  {
    key: '1',
    label: (
      <p>
        <img src='https://cdn.haitrieu.com/wp-content/uploads/2022/10/Icon-VNPAY-QR.png'
          style={{ width: '16px', height: '16px' }}
        alt='VNPAY'></img>
        <span>VNPAY</span>
      </p>
    ),
    children: (
      <>
        <Form.Item label='Coin' name='coin'>
          <Input type='number' style={{
            'width': '50%'
          }}></Input>
        </Form.Item>
        <Form.Item >
          <Button htmlType='submit' type='primary'>
            Confirm Payment
          </Button>
        </Form.Item>
      </>
    )
  }
]

function LoadCoin() {
  const handleSubmit = async (field: any) => {
    try {
      const response = await axiosInstance.get('/user/v1/load-coin?coin=' + field.coin)
      window.location.replace(response.data)
    } catch (error) {
      console.log('Error:', error)
    }
  }

  return (
    <Form onFinish={handleSubmit}>
      <Row>
        <Col span={6}>
          <Card title={<p style={{'textAlign': 'center'}}>DETAIL</p>}>
            <p>NOTE: </p>
            <p>- You can only load money into your account via domestic bank</p>
            <p>- 1 coin = 1000 VND</p>
            <p>STEPS:</p>
            <p>1. Enter the amount of money you want to load into your account</p>
            <p>2. Click on the payment method you want to use</p>
            <p>3. Follow the instructions to complete the payment</p>  
            <p>4. Wait for the system to confirm the payment</p>
          </Card>
        </Col>
        <Col span={18}>
          <Card title='Make a Payment'>
            <Card type='inner' title='Domestic Bank'>
              <Collapse items={items} />
            </Card>
          </Card>
        </Col>
      </Row>
    </Form>
  )
}

export default LoadCoin
