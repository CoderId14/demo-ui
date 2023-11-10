import { useFetchBookRatings } from '@/services/client/bookService'
import { IBookRating } from '@/types/book/book.type'
import { UserOutlined } from '@ant-design/icons'
import { Col, Divider, List, Rate, Row, Skeleton, Typography } from 'antd'
import convertISOTimeToUserTimeZone from '../../../Utils/timeFormat'
import ButtonModalBookRating from '../ButtonModalBookRating'
import { useSelector } from 'react-redux'
import { selectAuth } from '@/redux/store'
const { Paragraph } = Typography
interface Props {
  bookId: number
}
function RatingSection({ bookId }: Props) {
  const { data, isFetching } = useFetchBookRatings({ book: bookId })
  const login = useSelector(selectAuth).login
  const user = login?.user ? login.user : null
  if (isFetching) {
    return <Skeleton paragraph={true}></Skeleton>
  }
  return (
    <List
      dataSource={data?.content}
      renderItem={(item: IBookRating) => (
        <Row key={item.id}>
          <Col style={{ display: 'flex', justifyContent: 'space-between' }} span={24}>
            <div>
              <UserOutlined></UserOutlined>
              <span>{item.name}</span>
            </div>
            {((user && user.userId === item.userId) || user?.roles.includes("ROLE_ADMIN")) && (
            <ButtonModalBookRating
              bookId={bookId}
              ratingId={item.ratingId}
              isUpdate
              initialValues={{ comment: item.comment, rating: item.rating, ratingId: item.id }}
            ></ButtonModalBookRating>)}

          </Col>
          <div>
            <Rate defaultValue={item.rating} disabled></Rate>
            <Paragraph>Comment: {item.comment}</Paragraph>
            <Paragraph>{convertISOTimeToUserTimeZone(item.modifiedDate, { includeSeconds: true })} ago</Paragraph>
          </div>
          <Divider></Divider>
        </Row>
      )}
    ></List>
  )
}

export default RatingSection
