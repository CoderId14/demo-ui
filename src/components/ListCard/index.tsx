import { List, Typography } from 'antd'
import { BookDetails } from '@/types/book/book.type'
import BookCard from '../BookCard'

interface Props {
  books: BookDetails[]
}

const ListCard = ({ books }: Props) => {
  return (
    <List
      pagination={{ position: 'bottom', align: 'center', pageSize: 16 }}
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 3,
        lg: 5,
        xl: 5,
        xxl: 5
      }}
      dataSource={books}
      renderItem={(item: BookDetails) => (
        <List.Item>
          <BookCard
            id={item.bookId}
            latestChapters={item.latestChapters}
            title={item.title}
            thumbnailUrl={item.thumbnailUrl}
          ></BookCard>
        </List.Item>
      )}
    ></List>
  )
}

export default ListCard
