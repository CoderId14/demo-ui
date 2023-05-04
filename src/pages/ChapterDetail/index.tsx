import TestComponent from '@/components/testComponent'
import { useFetchBooks } from '@/services/client/bookService'
import { useFetchChapterDetail } from '@/services/client/chapterService'
import { Book } from '@/types/book/book.type'
import { Chapter } from '@/types/chapter/chapter.type'
import { ReadOutlined } from '@ant-design/icons'
import { Editor } from '@tinymce/tinymce-react'
import { Card, Divider, Image, Row, Skeleton } from 'antd'
import Title from 'antd/lib/typography/Title'
import { useRef } from 'react'
import { useParams } from 'react-router-dom'

function ChapterDetail() {
  const editorRef: any = useRef(null)
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent())
    }
  }
  const { chapterId, bookId } = useParams()

  const { data, isFetching } = useFetchChapterDetail({
    chapterId: Number(chapterId)
  })
  let chapter: Chapter = {
    id: 0,
    bookId: 0,
    title: '',
    chapterNumber: 0,
    modifiedDate: ''
  }
  const { data: books, isFetching: isFetchingBook } = useFetchBooks({
    id: Number(bookId)
  })
  let bookData: Book[] = []
  if (data) {
    chapter = data
  }
  if (isFetchingBook) {
    return <Skeleton />
  }
  if (books?.content) {
    bookData = books?.content
  }
  const book = bookData[0]

  if (isFetching) {
    return <Skeleton />
  }

  return (
    <>
      <Row justify={'center'}>
        <Card cover={<Image src='https://m.media-amazon.com/images/I/41D218qFfJL.jpg' width={300}></Image>}></Card>
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
          Chapter {chapter.chapterNumber}: {chapter.title}{' '}
        </Title>
      </Row>
      <TestComponent content={chapter?.content} />

      <Divider></Divider>

      <Editor
        apiKey='pmfqllzhlpfn980wmee9dndck6vclx7hy331lmx0dcimpm6l'
        onInit={(_evt, editor) => (editorRef.current = editor)}
        initialValue='<p>This is the initial content of the editor.</p>'
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
          ],
          toolbar:
            'undo redo | formatselect | ' +
            'bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
      <button onClick={log}>Log editor content</button>
    </>
  )
}

export default ChapterDetail
