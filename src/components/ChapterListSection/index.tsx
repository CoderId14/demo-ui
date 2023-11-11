import { ReadOutlined, SortAscendingOutlined } from '@ant-design/icons';
import { Alert, Col, Divider, List, Row, Skeleton, Space, Typography } from 'antd';
import { formatDistance } from 'date-fns';
import { memo } from 'react';
import { Link } from 'react-router-dom';

import { useFetchChapters } from '@/services/client/chapterService';
import { Chapter } from '@/types/chapter/chapter.type';
import { AppConst } from '@/app-const';

const { Title, Paragraph } = Typography;

interface Props {
  bookId: number;
}

function ChapterListSection({ bookId }: Props) {
  console.log('ChapterListSection re rendered');

  const { data, error, isFetching } = useFetchChapters({
    book: bookId,
  });

  if (isFetching) {
    return <Skeleton />;
  }

  if (error) {
    return (
      <Alert
        message="Error"
        description="Some error occurred while fetching chapters"
        type="error"
        showIcon
      />
    );
  }

  if (!data) {
    return <Skeleton />;
  }

  const chapterData: Chapter[] = data.content;
  const latestChapter = chapterData[0];

  return (
    <>
      <Divider orientation="left">
        <Space className="d-flex align-items-center">
          <ReadOutlined style={{ fontSize: 32 }} />
          <Title level={3}>Chapter List</Title>
        </Space>
      </Divider>

      <Row>
        <Col span={23}>
            {latestChapter && (
              <>
                <Title level={5}>
                  Latest Release: Chapter {latestChapter.chapterNumber}: {latestChapter.title}
                </Title>
                <Paragraph>
                  {formatDistance(new Date(latestChapter.modifiedDate), new Date(), {
                    addSuffix: true,
                  })}
                </Paragraph>
              </>
            )}
        </Col>

        <Col>
          <SortAscendingOutlined />
        </Col>
      </Row>

      <Divider />

      <List
        bordered
        dataSource={chapterData}
        renderItem={(item) => (
          <List.Item>
            <Link to={AppConst.BOOK_DETAIL_URL + item.bookId + AppConst.CHAPTER_DETAIL_URL + item.id}>
              Chapter {item?.chapterNumber}: {item?.title}
            </Link>
          </List.Item>
        )}
      />
    </>
  );
}

export default memo(ChapterListSection);
