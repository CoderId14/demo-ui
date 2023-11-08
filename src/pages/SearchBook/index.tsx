import classNames from 'classnames/bind'
import styles from './search.module.scss'
import { Button, Col, DatePicker, Divider, Form, Input, Row, Select, SelectProps, Skeleton, Space } from 'antd'
import { useEffect, useState } from 'react'
import { useFetchCategories } from '@/services/client/categoryService'
import { Category } from '@/types/category/category.type'
import { useFetchTags } from '@/services/client/tagService'
import { ITag } from '@/types/tag/tag.type'
import { BookParamRequest } from '@/types/book/bookSearch.type'
import { useFetchBooks } from '@/services/client/bookService'
import ListCard from '@/components/ListCard'
import { BookDetails } from '@/types/book/book.type'
import { convertBooksToBookDetails } from '@/Utils/convert'
import { useLocation } from 'react-router'
const { RangePicker } = DatePicker
const cx = classNames.bind(styles)

const rangeConfig = {
  rules: [{ type: 'array' as const, message: 'Please select time!' }]
}
function convertToTagOptions(data: ITag[]) {
  const tagOptions: SelectProps['options'] = []
  data.map((tag) => {
    const tempData = {
      label: tag.tagName,
      value: tag.tagId
    }
    tagOptions.push(tempData)
  })
  return tagOptions
}
function convertToCategoryOptions(data: Category[]) {
  const categoryOptions: SelectProps['options'] = []
  data.map((category) => {
    const tempData = {
      label: category.categoryName,
      value: category.categoryId
    }
    categoryOptions.push(tempData)
  })
  return categoryOptions
}
interface IFieldValue {
  title?: string
  categories?: number[]
  tags?: number[]
  createdDate?: string[]
}

function SearchBook() {
  const { state } = useLocation()
  console.log("state: ",state)
  const [form] = Form.useForm()
  const { data: categoriesData, isFetching: isFetchingCategory } = useFetchCategories({})
  const [categoryOptions, setCategoryOptions] = useState<SelectProps['options'] | undefined>()
  const [tagOptions, setTagOptions] = useState<SelectProps['options'] | undefined>()
  const [searchParams, setSearchParams] = useState<BookParamRequest>({
    page: 0,
    size: 30,
    detail: true,
    title: state.title || undefined,
    categories: Array.from(state?.categories.keys()).flat().join(",") || undefined,
    tags: state.tags?.join(',') || undefined
  })
  const [bookData, setBookData] = useState<BookDetails[] | undefined>()
  const { data: booksData, isFetching: isFetchingBook } = useFetchBooks(searchParams)
  const { data: tagsData, isFetching: isFetchingTag } = useFetchTags({})
  const onFinish = (fieldsValue: IFieldValue) => {
    const searchFields: BookParamRequest = {
      categories: fieldsValue?.categories ? fieldsValue?.categories?.join(',') : undefined,
      tags: fieldsValue?.tags ? fieldsValue?.tags?.join(',') : undefined,
      title: fieldsValue?.title ? fieldsValue?.title : undefined,
      createdDate: fieldsValue?.createdDate ? new Date(fieldsValue.createdDate[0]).toISOString() : undefined
    }

    // Should format date value before submit.
    setSearchParams((prev) => ({
      ...prev,
      ...searchFields
    }))
    console.log('Received values of form: ', searchParams)
  }

  useEffect(() => {
    if (categoriesData?.content) {
      setCategoryOptions(convertToCategoryOptions(categoriesData.content))
    }
    if (tagsData?.content) {
      setTagOptions(convertToTagOptions(tagsData.content))
    }
    if (booksData?.content) {
      setBookData(convertBooksToBookDetails(booksData.content))
    }
  }, [categoriesData, tagsData, booksData])
  if (isFetchingCategory || isFetchingTag || isFetchingBook) {
    return <Skeleton />
  }
  console.log("Array.from(state?.categories.entries()) : ",Array.from(state?.categories.entries()) )
  return (
    <Form
      form={form}
      id='form'
      onFinish={onFinish}
      initialValues={{
        title: state.title,
        categories: {label: state?.categories.values().next().value, value: state?.categories.keys().next().value},
        tags: state.tags
      }}
    >
      <Row justify={'center'}>
        <Form.Item name='title' label='Title' className={cx('search mt-32')}>
          <Input></Input>
        </Form.Item>
      </Row>
      <Row justify={'space-between'}>
        <Col span={8}>
          <Form.Item label='Categories' name='categories'>
            <Select
              mode='multiple'
              allowClear
              style={{ width: '100%' }}
              placeholder='Please select'
              options={categoryOptions}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label='Tags' name='tags'>
            <Select
              mode='multiple'
              allowClear
              style={{ width: '100%' }}
              placeholder='Please select'
              options={tagOptions}
            />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item name='createdDate' label='Publish Date' {...rangeConfig}>
            <RangePicker />
          </Form.Item>
        </Col>
      </Row>
      <Row justify={'center'}>
        <Form.Item>
          <Space>
            <Button type='primary' htmlType='submit'>
              Search
            </Button>
            <Button
              onClick={() => {
                form.resetFields()
              }}
            >
              Clear
            </Button>
          </Space>
        </Form.Item>
      </Row>
      <Divider></Divider>
      <ListCard books={bookData ? bookData : []}></ListCard>
    </Form>
  )
}

export default SearchBook
