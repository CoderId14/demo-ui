import axiosInstance from "@/config/axios";
import { useFetchUserInfo } from "@/services/client/userService";
import { useQueryClient } from "@tanstack/react-query";
import { Row, Input, Tag, Button, Modal, Skeleton, message, Image, Form } from "antd";
import { useState } from "react";

function UserInfoSection() {
    const { data, isFetching } = useFetchUserInfo()
    const queryClient = useQueryClient()
  
    const handleOk = async () => {
      try {
        const response = await axiosInstance.get('/user/v1/open-premium')
        queryClient.invalidateQueries({ queryKey: ['user'] })
        message.success(response.data)
        setIsModalOpen(false)
      } catch (error: any) {
        message.error(error.message)
      }
    }
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isModalWriterOpen, setIsModalWriterOpen] = useState(false)
    const showModal = () => {
      setIsModalOpen(true)
    }
  
    const handleCancel = () => {
      setIsModalOpen(false)
    }

    const handleOkWriter = async () => {
        try {
          const response = await axiosInstance.post('/writer/book/v1/promote', {
            userId: data?.userId,
            roleName: 'ROLE_WRITER'
          })
          queryClient.invalidateQueries({ queryKey: ['user'] })
          message.success(response.data)
          setIsModalWriterOpen(false)
        } catch (error: any) {
          message.error(error.message)
        }
      }


    const showModalWriter = () => {
        setIsModalWriterOpen(true)
    }

    const handleCancelWriter = () => {
        setIsModalWriterOpen(false)
    }
    if (isFetching) {
      return <Skeleton />
    }
    return (
      <>
        <Row justify={'center'}>
          <Image
            src={data?.avatar || 'https://cdnimg.vietnamplus.vn/uploaded/xpcwvovt/2023_04_26/avatar.jpg'}
            style={{ height: '200px' }}
          />
        </Row>
        <Row
          style={{
            backgroundColor: '#f5f6fc',
            marginBottom: 48
          }}
          gutter={16}
          justify={'center'}
        >
          <Row style={{ marginTop: 10, marginBottom: 30 }}>
            <Form initialValues={{ name: data?.name, coin: data?.coin }}>
              <Form.Item label='Name' name={'name'}>
                <Input disabled></Input>
              </Form.Item>
              <Form.Item label='Coin' name={'coin'}>
                <Input disabled></Input>
              </Form.Item>

              {data?.roles?.find((role) => role.match('ROLE_USER_VIP')) ? (
                <Tag color='magenta'>VIP</Tag>
              ) : (
                <Button type='primary' onClick={showModal}>
                  <a>OPEN VIP</a>
                </Button>
              )}

              {data?.roles?.find((role) => role.match('ROLE_WRITER')) ? (
                <Tag color='magenta'>WRITER</Tag>
              ) : (
                <Button type='primary' onClick={showModalWriter}>
                  <a>PROMOTE WRITER</a>
                </Button>
              )}
              <Modal title='OPEN VIP' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>
                  Cost of open VIP is <strong>100</strong> coin. Are you agree?{' '}
                </p>
              </Modal>
              <Modal
                title='Request Promote to Creator'
                open={isModalWriterOpen}
                onOk={handleOkWriter}
                onCancel={handleCancelWriter}
              >
                <p>Do you want to promote to Creator?</p>
              </Modal>
            </Form>
          </Row>
        </Row>
      </>
    )
}

export default UserInfoSection;