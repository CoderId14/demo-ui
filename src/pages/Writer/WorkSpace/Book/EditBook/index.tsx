import { BookDetails } from '@/types/book/book.type'
import { Alert, Skeleton } from 'antd'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import BookInfoSection from './BookInfoSection'
import BookEditSection from './BookEditSection'
import { useFetchBooks } from '@/services/client/bookService'
import { convertBooksToBookDetails } from '@/Utils/convert'

function BookEdit() {
  console.log('BookInfoSection rerendered')
  const { bookId } = useParams()
  const { data, error, isFetching } = useFetchBooks({
    detail: true,
    id: Number(bookId)
  })

  const [book, setBook] = useState<BookDetails | undefined>()
  useEffect(() => {
    if (data) {
      const bookData = convertBooksToBookDetails(data.content)
      setBook(bookData[0])
    }
  }, [data])

  if (isFetching || book == undefined) {
    return <Skeleton />
  }
  if (error) {
    return <Alert message='Error' description='Some error occurred while fetching chapters' type='error' showIcon />
  }

  return (
    <>
      <BookInfoSection book={book}></BookInfoSection>
      <BookEditSection book={book}></BookEditSection>
    </>
  )
}

export default BookEdit
