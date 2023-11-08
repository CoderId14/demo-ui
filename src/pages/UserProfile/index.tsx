import axiosInstance from '@/config/axios'
import { useFetchUserInfo } from '@/services/client/userService'
import { Button, Col, Form, Image, Input, Row, Skeleton } from 'antd'
import { toast } from 'react-toastify'
function UserProfile() {
  const { data, isFetching } = useFetchUserInfo()

  const handleSubmit = async () => {
    try {
      const response = await axiosInstance.get('/user/v1/open-premium')
      toast.success(response.data)
    } catch (error: any) {
      toast.error(error.message)
    }
  }
  if (isFetching) {
    return <Skeleton />
  }
  return (
    <>
      <Row
        style={{
          backgroundColor: '#f5f6fc',
          marginBottom: 48
        }}
        gutter={16}
      >
        <Col lg={{ span: 8, offset: 2 }}>
          <Image src={data?.avatar || 'https://cdnimg.vietnamplus.vn/uploaded/xpcwvovt/2023_04_26/avatar.jpg'}></Image>
        </Col>
        <Col style={{ position: 'relative' }}>
          <div style={{ marginTop: 10, marginBottom: 30 }}>
            
              <Form initialValues={{ name: data?.name, coin: data?.coin }}>
                <Form.Item label='Name' name={'name'}>
                  <Input></Input>
                </Form.Item>

                <Form.Item label='Coin' name={'coin'}>
                  <Input disabled></Input>
                </Form.Item>

                {data?.roles?.find((role) => role.match('ROLE_USER_VIP')) ? (
                  'VIP'
                ) : (
                  <Button type='primary' onClick={handleSubmit}>
                    <a>OPEN VIP</a>
                  </Button>
                )}
              </Form>
        
          </div>
        </Col>
      </Row>
    </>
  )
}

export default UserProfile
