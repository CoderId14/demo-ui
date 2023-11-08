import BookCarousel from '@/components/BookCarousel'
import { useFetchBookRecommendations, useFetchBooks } from '@/services/client/bookService'
import { Divider, Typography } from 'antd'
import PreLoad from '@/components/preLoad'
import ListCard from '@/components/ListCard'
import { BookDetails } from '@/types/book/book.type'
import { convertBooksToBookDetails } from '@/Utils/convert'
const { Title } = Typography
const Home = () => {
  const { data, isFetching } = useFetchBooks({ detail: true })
  const { data: bookRecommend, isFetching: isFetchingRecommend } = useFetchBookRecommendations();
  let bookData: BookDetails[] = []
  let letBookRecommend: BookDetails[] = []
  if (data?.content) {
    bookData = convertBooksToBookDetails(data.content)
  }
  if(bookRecommend?.content) {
    letBookRecommend = convertBooksToBookDetails(bookRecommend.content)
  }
  if (isFetching) {
    return <PreLoad size='large' />
  }

  return (
    <>
      <Divider />
      <Title level={2}>Recommend Book</Title>
      {isFetchingRecommend ? <PreLoad size='large' /> :
      <BookCarousel books={letBookRecommend}></BookCarousel>}
      <Divider />
      <Title level={2}>List Book</Title>
      <ListCard books={bookData}></ListCard>
    </>
  )
}

export default Home
