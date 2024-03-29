import { AppConst } from '@/app-const'
import { BookDetails, BookUpdateInfo } from '@/types/book/book.type'
import { Category } from '@/types/category/category.type'
import { ITag } from '@/types/tag/tag.type'
import { ContainerOutlined, UnorderedListOutlined, UploadOutlined } from '@ant-design/icons'
import { Editor } from '@tinymce/tinymce-react'
import { Divider, Space, Switch, Input, Row, Checkbox, Button, Form, Typography, Skeleton, message, UploadProps, Upload } from 'antd'
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import ChapterListSection from './ChapterListSection'
import axiosInstance from '@/config/axios'
import { getDownloadURL, ref } from 'firebase/storage'
import { storage } from '@/config-firebsae'
import { useUpdateBook } from '@/services/client/bookService'
import ContentSection from '@/components/BookInfoSection/ContentSection'
import { useFetchCategories } from '@/services/client/categoryService'
import { useFetchTags } from '@/services/client/tagService'
const { Title } = Typography
interface Props {
  book: BookDetails
}
function BookEditSection({ book }: Props) {
  const updateBookMutation = useUpdateBook()
  const { data: categories, isFetching: isFetchingCategory } = useFetchCategories({})
  const [categoryData, setCategoryData] = useState<Category[]>([])
  const navigate = useNavigate()
  const [thumbnailUrlState, setThumbnailUrl] = useState(book?.thumbnailUrl)
  const { data: tags, isFetching: isFetchingTag } = useFetchTags({})
  const [tagData, setTagData] = useState<ITag[]>([])

  const props: UploadProps = {
    name: 'file',
    action: axiosInstance.defaults.baseURL + 'attachment/v1/upload',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      console.log("infoL ", info)
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
            if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        const url = info.file.response.responseData;
 
        const imageRef = ref(storage, url);
        getDownloadURL(imageRef).then((url) => { setThumbnailUrl(url)})
      
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  useEffect(() => {
    if (categories?.content) {
      setCategoryData(categories.content)
    }
    if (tags?.content) {
      setTagData(tags.content)
    }
  }, [categories, tags])
  const editorRef: any = useRef(null)
  const [form] = Form.useForm()
  const onFinish = (values: any) => {
    const bookUpdateInfo: BookUpdateInfo = {
      ...values,
      thumbnailUrl: thumbnailUrlState,
      content: editorRef.current.getContent(),
      id: book.bookId
    }
    updateBookMutation.mutate(bookUpdateInfo)
    navigate(AppConst.WRITER_DASHBOARD_URL)
    console.log('Received values of form: ', { ...values, content: editorRef.current.getContent(), id: book.bookId })
  }
  const categoryOptions = categoryData.map((category) => ({ label: category.categoryName, value: category.categoryId }))
  const tagOptions = tagData.map((tag) => ({ label: tag.tagName, value: tag.tagId }))

  if (isFetchingCategory || isFetchingTag || updateBookMutation.isLoading || book == undefined) {
    return <Skeleton />
  }
  return (
    <Form
      form={form}
      onFinish={onFinish}
      initialValues={{
        isPremium: book?.premium,
        isNovel: book?.novel,
        title: book?.title,
        thumbnailUrl: book?.thumbnailUrl,
        categories: book?.categories.map((category) => category.categoryId),
        tags: book?.tags.map((tag) => tag.tagId),
        isActive: book?.active
      }}
    >
            <Divider orientation='left'>
        <Space style={{ display: 'flex', alignItems: 'center' }}>
          <ContainerOutlined style={{ fontSize: 32 }} />
          <Title level={3}>Is Active</Title>
        </Space>
      </Divider>
      <Form.Item name='isActive' valuePropName='checked'>
        <Switch defaultChecked={book?.active} disabled/>
      </Form.Item>
      <Divider orientation='left'>
        <Space style={{ display: 'flex', alignItems: 'center' }}>
          <ContainerOutlined style={{ fontSize: 32 }} />
          <Title level={3}>Premium</Title>
        </Space>
      </Divider>
      <Form.Item name='isPremium' valuePropName='checked'>
        <Switch defaultChecked={book?.premium} />
      </Form.Item>
      <Divider orientation='left'>
        <Space style={{ display: 'flex', alignItems: 'center' }}>
          <ContainerOutlined style={{ fontSize: 32 }} />
          <Title level={3}>Novel</Title>
        </Space>
      </Divider>
      <Form.Item name='isNovel' valuePropName='checked'>
        <Switch defaultChecked={book?.novel} />
      </Form.Item>
      <Divider orientation='left'>
        <Space style={{ display: 'flex', alignItems: 'center' }}>
          <ContainerOutlined style={{ fontSize: 32 }} />
          <Title level={3}>Title</Title>
        </Space>
      </Divider>
      <Form.Item name='title'>
        <Input placeholder='Title' />
      </Form.Item>
      <Divider orientation='left'>
        <Space style={{ display: 'flex', alignItems: 'center' }}>
          <ContainerOutlined style={{ fontSize: 32 }} />
          <Title level={3}>ThumbnailUrl</Title>
        </Space>
      </Divider>
      <Form.Item name='thumbnailUrl'>
      <Input placeholder='Thumbnail Url' value={thumbnailUrlState}/>
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Form.Item>
      <Divider orientation='left'>
        <Space style={{ display: 'flex', alignItems: 'center' }}>
          <UnorderedListOutlined style={{ fontSize: 32 }} />
          <Title level={3}>Category</Title>
        </Space>
      </Divider>
      <Row>
        <Form.Item name='categories'>
          <Checkbox.Group options={categoryOptions} />
        </Form.Item>
      </Row>
      <Divider orientation='left'>
        <Space style={{ display: 'flex', alignItems: 'center' }}>
          <UnorderedListOutlined style={{ fontSize: 32 }} />
          <Title level={3}>Tags</Title>
        </Space>
      </Divider>
      <Row>
        <Form.Item name='tags'>
          <Checkbox.Group options={tagOptions} />
        </Form.Item>
      </Row>
      <Divider orientation='left'>
        <Space style={{ display: 'flex', alignItems: 'center' }}>
          <ContainerOutlined style={{ fontSize: 32 }} />
          <Title level={3}>Content</Title>
        </Space>
      </Divider>
      <ContentSection content={book.content}></ContentSection>
      <Editor
        apiKey='pmfqllzhlpfn980wmee9dndck6vclx7hy331lmx0dcimpm6l'
        onInit={(_evt, editor) => (editorRef.current = editor)}
        initialValue={book?.content}
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
      <ChapterListSection bookId={book.bookId} isNovel={book.novel}></ChapterListSection>
      <Form.Item style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
        <Button type='primary' htmlType='submit' size='large'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default BookEditSection
