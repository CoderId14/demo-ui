
import { useFetchBookRatings } from '@/services/client/bookService';
import { IBookRating } from '@/types/book/book.type';
import { UserOutlined } from '@ant-design/icons';
import { Col, Divider, List, Rate, Row, Skeleton, Typography } from 'antd';
import convertISOTimeToUserTimeZone from '../../../Utils/timeFormat';
import ButtonModalBookRating from '../ButtonModalBookRating';
import { useSelector } from 'react-redux';
import { selectAuth } from '@/redux/store';

const { Paragraph } = Typography;

interface Props {
  bookId: number;
}

function RatingSection({ bookId }: Props) {
  const { data, isFetching } = useFetchBookRatings({ book: bookId });
  const login = useSelector(selectAuth).login;
  const user = login?.user ?? null;

  if (isFetching) {
    return <Skeleton paragraph={true} />;
  }

  return (
    <List
      dataSource={data?.content}
      renderItem={(item: IBookRating) => (
        <Row key={item.id} style={{ marginBottom: '16px' }}>
          <Col span={24}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <UserOutlined style={{ marginRight: '8px' }} />
                <span>{item.name}</span>
              </div>
              {((user && user.userId === item.userId) || user?.roles.includes('ROLE_ADMIN')) && (
                <ButtonModalBookRating
                  bookId={bookId}
                  ratingId={item.ratingId}
                  isUpdate
                  initialValues={{ comment: item.comment, rating: item.rating, ratingId: item.id }}
                />
              )}
            </div>
            <div style={{ marginTop: '8px' }}>
              <Rate defaultValue={item.rating} disabled />
              <Paragraph style={{ margin: '8px 0' }}>{item.comment}</Paragraph>
              <Paragraph style={{ color: '#8c8c8c' }}>
                {convertISOTimeToUserTimeZone(item.modifiedDate, { includeSeconds: true })} ago
              </Paragraph>
            </div>
          </Col>
          <Divider />
        </Row>
      )}
    />
  );
}

export default RatingSection;
