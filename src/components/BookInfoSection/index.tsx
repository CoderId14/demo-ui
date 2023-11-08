import { convertBooksToBookDetails } from '@/Utils/convert'
import { useFetchBooks } from '@/services/client/bookService'
import { BookDetails } from '@/types/book/book.type'
import {
  UnorderedListOutlined,
  FileTextOutlined,
  EyeOutlined,
  PlusOutlined,
  ContainerOutlined,
  MinusOutlined
} from '@ant-design/icons'
import { Alert, Button, Col, Divider, Image, Rate, Row, Skeleton, Space, Tag, Typography } from 'antd'
import { memo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ContentSection from './ContentSection'
import { useAddBookMark, useRemoveBookMark } from '../../services/client/userService'
const { Title, Text } = Typography

interface Props {
  bookId: number
}
function BookInfoSection({ bookId }: Props) {
  console.log('BookInfoSection rerendered')
  const navigate = useNavigate()
  const { data, error, isFetching } = useFetchBooks({
    detail: true,
    id: bookId
  })
  const useAddBookMarkMutation = useAddBookMark()
  const useRemoveBookMarkMutation = useRemoveBookMark()
  const handleAddBookMark = () => {
    useAddBookMarkMutation.mutate({ bookId: book.bookId })
    setIsBookMark(true)
  }

  const handleRemoveBookMark = () => {
    useRemoveBookMarkMutation.mutate({ bookId: book.bookId })
    setIsBookMark(false)
  }

  const handleRedirect = (entry: {label: any, value: any}) => {
    const data:any = { categories: new Map() }
    data.categories.set(entry.value, entry.label)
    navigate('/search', { state: data })
  }

  let bookData: BookDetails[] = []
  if (data?.content) {
    bookData = convertBooksToBookDetails(data.content)
  }
  const book = bookData[0]
  const [isBookMark, setIsBookMark] = useState(book?.liked || false)
  if (isFetching) {
    return <Skeleton />
  }
  if (error) {
    return <Alert message='Error' description='Some error occurred while fetching chapters' type='error' showIcon />
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
          <Image src={book?.thumbnailUrl}></Image>
        </Col>
        <Col style={{ position: 'relative' }}>
          <Title>{book?.title}</Title>
          <Text type='secondary'>Author: {book?.author}</Text>

          <div style={{ marginTop: 10, marginBottom: 30 }}>
            <Space direction='vertical' size={[0, 10]}>
              <Space size={[4, 8]} wrap>
                <UnorderedListOutlined style={{ fontSize: 24 }} />
                {book?.categories.map((category) => {
                  return (
                    <a onClick={() => handleRedirect({label: category.categoryName, value: category.categoryId})}>
                      <Tag color='magenta'>{category?.categoryName}</Tag>
                    </a>
                  )
                })}
              </Space>
              <Space>
                <FileTextOutlined style={{ fontSize: 24 }} />
                {book?.latestChapters[0]?.chapterNumber} Chapters
              </Space>
              <Space>
                <EyeOutlined style={{ fontSize: 24 }} />
                {book?.viewCount} View
              </Space>
            </Space>

            <div>
              <Space>
                <Rate disabled defaultValue={book?.averageRating} />
                <span style={{ fontSize: 24 }}>
                  {' '}
                  {book?.averageRating} ({book?.reviewCount})
                </span>
              </Space>
            </div>
          </div>
          <div>
            <Space wrap>
              <Button type='primary' shape='round' size='large'>
                Read
              </Button>
              <Button
                type='primary'
                shape='round'
                size='large'
                icon={isBookMark ? <MinusOutlined /> : <PlusOutlined />}
                className='d-flex align-items-center'
                onClick={isBookMark ? handleRemoveBookMark : handleAddBookMark}
              >
                Bookmark
              </Button>
            </Space>
          </div>
        </Col>
      </Row>
      <Divider orientation='left'>
        <Space className='d-flex align-items-center'>
          <ContainerOutlined style={{ fontSize: 32 }} />
          <Title level={3}>Content</Title>
        </Space>
      </Divider>
      <ContentSection content={book?.content}></ContentSection>
    </>
  )
}

export default memo(BookInfoSection)
