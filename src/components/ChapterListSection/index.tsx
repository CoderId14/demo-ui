import { ReadOutlined, SortAscendingOutlined } from '@ant-design/icons'
import { Divider, Space, Skeleton, List, Typography, Alert, Row, Col } from 'antd'
import { formatDistance } from 'date-fns'
import { memo } from 'react'

import { useFetchChapters } from '@/services/client/chapterService'
import { Chapter } from '@/types/chapter/chapter.type'
const { Title, Paragraph } = Typography
interface Props {
  bookId: number
}
function ChapterListSection({ bookId }: Props) {
  console.log('ChapterListSection re rendered')
  const { data, error, isFetching } = useFetchChapters({
    book: bookId
  })
  if (isFetching) {
    return <Skeleton></Skeleton>
  }
  if (error) {
    return <Alert message='Error' description='Some error occurred while fetching chapters' type='error' showIcon />
  }
  if (!data) {
    return <Skeleton></Skeleton>
  }
  const chapterData: Chapter[] = data.content
  const latestChapter = chapterData[0]
  return (
    <>
      <Divider orientation='left'>
        <Space className='d-flex align-items-center'>
          <ReadOutlined style={{ fontSize: 32 }} />
          <Title level={3}>Chapter List</Title>
        </Space>
      </Divider>
      <Row>
        <Col span={23}>
          <Space align='center'>
            {latestChapter && (
              <>
                <Title level={5}>
                  Latest Release: Chapter {latestChapter.chapterNumber}: {latestChapter.title}
                </Title>
                <Paragraph>
                  {formatDistance(new Date(latestChapter.modifiedDate), new Date(), {
                    addSuffix: true
                  })}
                </Paragraph>
              </>
            )}
          </Space>
        </Col>
        <Col>
          <SortAscendingOutlined />
        </Col>
      </Row>
      <Divider></Divider>
      <List
        header={<div>Header</div>}
        footer={<div>Footer</div>}
        bordered
        dataSource={chapterData}
        renderItem={(item) => (
          <List.Item>
            <Typography.Text mark>Chapter</Typography.Text> {item?.chapterNumber}: {item?.title}
          </List.Item>
        )}
      />
    </>
  )
}

export default memo(ChapterListSection)
