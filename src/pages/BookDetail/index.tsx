// import styles from "./home.module.scss";
import { Breadcrumb } from 'antd'
import { useParams } from 'react-router-dom'
import ChapterListSection from '@/components/ChapterListSection'
import BookInfoSection from '@/components/BookInfoSection'
// let cx = classNames.bind(styles);
const BookDetail = () => {
  const { id } = useParams()
  return (
    <>
      <Breadcrumb></Breadcrumb>

      <BookInfoSection bookId={Number(id)}></BookInfoSection>
      <ChapterListSection bookId={Number(id)}></ChapterListSection>
    </>
  )
}

export default BookDetail
