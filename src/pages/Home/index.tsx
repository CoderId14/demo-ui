import BookCarousel from '@/components/BookCarousel'
import { useFetchBooks } from '@/services/client/bookService'
import { Divider, Typography } from 'antd'
import PreLoad from '@/components/preLoad'
import ListCard from '@/components/ListCard'
import { BookDetails } from '@/types/book/book.type'
import { convertBooksToBookDetails } from '@/Utils/convert'
const { Title } = Typography
const Home = () => {
  const { data, isFetching } = useFetchBooks({ detail: true })

  let bookData: BookDetails[] = []
  if (data?.content) {
    bookData = convertBooksToBookDetails(data.content)
  }
  if (isFetching) {
    return <PreLoad size='large' />
  }
  return (
    <>
      <BookCarousel books={bookData}></BookCarousel>
      <Divider />
      <Title level={2}>List Book</Title>
      <ListCard books={bookData}></ListCard>
    </>
  )
}

export default Home
