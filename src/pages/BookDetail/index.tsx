// import styles from "./home.module.scss";
import { Breadcrumb, Divider } from 'antd'
import { useParams } from 'react-router-dom'
import ChapterListSection from '@/components/ChapterListSection'
import BookInfoSection from '@/components/BookInfoSection'
import RatingSection from './RatingSection'
import ButtonModalBookRating from './ButtonModalBookRating'
// let cx = classNames.bind(styles);
const BookDetail = () => {
  const { id } = useParams()
  return (
    <>
      <Breadcrumb></Breadcrumb>

      <BookInfoSection bookId={Number(id)}></BookInfoSection>
      <ChapterListSection bookId={Number(id)}></ChapterListSection>
      <Divider></Divider>
      <ButtonModalBookRating bookId={Number(id)}></ButtonModalBookRating>
      <RatingSection bookId={Number(id)}></RatingSection>
    </>
  )
}

export default BookDetail
