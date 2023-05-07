import { convertBooksToBookDetails } from '@/Utils/convert'
import ListCard from '@/components/ListCard'
import { useFetchBookMarks } from '@/services/client/bookService'
import { BookDetails } from '@/types/book/book.type'
import { Skeleton } from 'antd'

function BookMarkList() {
  const { data, isFetching } = useFetchBookMarks({ page: 0, size: 30 })
  let bookData: BookDetails[] = []
  if (data?.content) {
    bookData = convertBooksToBookDetails(data.content)
  }
  if (isFetching) {
    ;<Skeleton />
  }
  return <ListCard books={bookData}></ListCard>
}

export default BookMarkList
