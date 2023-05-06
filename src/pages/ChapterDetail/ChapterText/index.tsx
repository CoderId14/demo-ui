import NavBarChapterDetail from '@/components/NavBarChapterDetail'
import TestComponent from '@/components/testComponent'
import { useFetchChapterDetail } from '@/services/client/chapterService'
import { Book } from '@/types/book/book.type'
import { Chapter } from '@/types/chapter/chapter.type'
import { ReadOutlined } from '@ant-design/icons'
import { Card, Divider, Image, Row, Skeleton } from 'antd'
import Title from 'antd/lib/typography/Title'
import { memo } from 'react'
interface Props {
  chapter: Chapter
  book: Book
}
function ChapterText({ chapter, book }: Props) {

  const { data, isFetching } = useFetchChapterDetail({
    chapterId: Number(chapter.id)
  })

  console.log("re rendering chapterText")
  if (isFetching) {
    return <Skeleton />
  }
  return (
    <>
      <NavBarChapterDetail book={book}></NavBarChapterDetail>

      <Row justify={'center'}>
        <Card cover={<Image src={book?.thumbnailUrl} width={300}></Image>}></Card>
      </Row>
      <Row justify={'center'}>
        <Title level={4}>{book?.title}</Title>
      </Row>
      <Row justify={'center'} style={{ marginBottom: 48 }}>
        <Title level={5}>{book?.author}</Title>
      </Row>
      <Divider>
        <ReadOutlined />
      </Divider>
      <Row>
        <Title level={3}>
          Chapter {data?.chapterNumber}: {data?.title}{' '}
        </Title>
      </Row>
      <TestComponent content={data?.content} />
      <Divider></Divider>
    </>
  )
}

export default memo(ChapterText)
