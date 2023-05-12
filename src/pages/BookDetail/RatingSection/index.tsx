import { useFetchBookRatings } from '@/services/client/bookService'
import { IBookRating } from '@/types/book/book.type'
import { UserOutlined } from '@ant-design/icons'
import { Col, List, Rate, Row, Skeleton, Typography } from 'antd'
import convertISOTimeToUserTimeZone from '../../../Utils/timeFormat'
import ButtonModalBookRating from '../ButtonModalBookRating'
const { Paragraph } = Typography
interface Props {
  bookId: number
}
function RatingSection({ bookId }: Props) {
  const { data, isFetching } = useFetchBookRatings({ book: bookId })
  if (isFetching) {
    return <Skeleton paragraph={true}></Skeleton>
  }
  return (
    <List
      dataSource={data?.content}
      renderItem={(item: IBookRating) => (
        <Row key={item.id}>
          <Col>
            <Col style={{ display: 'flex', justifyContent: 'space-between' }} span={24}>
              <div>
                <UserOutlined></UserOutlined>
                <span>{item.name}</span>
              </div>
              <ButtonModalBookRating
                bookId={bookId}
                isUpdate
                initialValues={{ comment: item.comment, rating: item.rating, ratingId: item.id }}
              ></ButtonModalBookRating>
            </Col>
            <Rate defaultValue={item.rating} disabled></Rate>
            <Paragraph>{item.comment}</Paragraph>
            <Paragraph>{convertISOTimeToUserTimeZone(item.modifiedDate, { includeSeconds: true })}</Paragraph>
          </Col>
        </Row>
      )}
    ></List>
  )
}

export default RatingSection
