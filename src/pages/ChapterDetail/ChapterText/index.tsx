import TestComponent from '@/components/testComponent'
import { Book } from '@/types/book/book.type'
import { Chapter } from '@/types/chapter/chapter.type'
import { ReadOutlined } from '@ant-design/icons'
import { Editor } from '@tinymce/tinymce-react'
import { Card, Divider, Image, Row } from 'antd'
import Title from 'antd/lib/typography/Title'
import { useRef } from 'react'
interface Props {
  chapter: Chapter
  book: Book
}
function ChapterText({ chapter, book }: Props) {
  const editorRef: any = useRef(null)
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent())
    }
  }

  return (
    <>
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

export default ChapterText
