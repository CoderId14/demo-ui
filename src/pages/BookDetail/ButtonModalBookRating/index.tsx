import React, { useState } from 'react'
import { Button, Form, Input, Modal, Rate } from 'antd'
import { useUpdateBookRating, useAddBookRating } from '../../../services/client/bookService'
import { IAddRatingRequest, IUpdateRatingRequest } from '@/types/book/book.type'

interface Values {
  comment: string
  rating: number
}

interface IinitialValues {
  comment?: string
  rating?: number
}

interface CollectionCreateFormProps {
  open: boolean
  onCreate: (values: Values) => void
  onCancel: () => void
  initialValue?: IinitialValues
}

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({ open, onCreate, onCancel, initialValue }) => {
  const [form] = Form.useForm()
  return (
    <Modal
      open={open}
      title='Rating Book'
      okText='Submit'
      cancelText='Cancel'
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields()
            onCreate(values)
          })
          .catch((info) => {
            console.log('Validate Failed:', info)
          })
      }}
    >
      <Form
        form={form}
        layout='vertical'
        name='form_in_modal'
        initialValues={{ rating: initialValue?.rating, comment: initialValue?.comment }}
      >
        <Form.Item
          name='comment'
          label='Comment'
          rules={[
            { required: true, message: 'Please input the comment of rating!' },
            { max: 150, message: "Please don't enter comment exceed 150 charaters" }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name='rating' label='Rating' rules={[{ required: true, message: 'Please choose rating!' }]}>
          <Rate />
        </Form.Item>
      </Form>
    </Modal>
  )
}
interface UpdateProps {
  comment: string
  rating: number
  ratingId: number
}
interface Props {
  initialValues?: UpdateProps
  isUpdate?: boolean
  bookId: number
  ratingId?: number
}
type PropsWithInitialValues<T> = T extends { isUpdate: true } ? { initialValues: UpdateProps } : {}

type ComponentProps = Props & PropsWithInitialValues<Props>
function ButtonModalBookRating({ initialValues, isUpdate = false, bookId, ratingId }: ComponentProps) {
  const [open, setOpen] = useState(false)

  const onCreate = async (values: Values) => {
    console.log('Received values of form: ', values)
    if (isUpdate) {
      const updateData: IUpdateRatingRequest = { ratingId: ratingId ? ratingId : 0, ...values }
      useUpdateBookRatingMutation.mutate(updateData)
    } else {
      const addData: IAddRatingRequest = { ...values, bookId: bookId }
      useAddBookRatingMutation.mutate(addData)
    }
    setOpen(false)
  }
  const useUpdateBookRatingMutation = useUpdateBookRating()
  const useAddBookRatingMutation = useAddBookRating()
  return (
    <div>
      <Button
        type='primary'
        onClick={() => {
          setOpen(true)
        }}
      >
        {isUpdate ? 'Edit Rating' : 'Add Rating'}
      </Button>
      <CollectionCreateForm
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false)
        }}
        initialValue={{ comment: initialValues?.comment, rating: initialValues?.rating }}
      />
    </div>
  )
}

export default ButtonModalBookRating
