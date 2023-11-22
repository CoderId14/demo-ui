
import { List } from 'antd';
import { BookDetails } from '@/types/book/book.type';
import BookCard from '../BookCard';
import { PaginationConfig } from 'antd/es/pagination';

interface Props {
  books: BookDetails[];
  pageSize?: number
  isPageable?: boolean
}

const ListCard: React.FC<Props> = ({ books, pageSize, isPageable = true}) => {

  const paginationConfig: PaginationConfig | false = isPageable ? {
    position: 'bottom',
    align: 'center',
    pageSize: pageSize ? pageSize : 16,
  } : false;

  return (
    <List
      pagination={paginationConfig}
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 3,
        lg: 5,
        xl: 5,
        xxl: 5,
      }}
      dataSource={books}
      renderItem={(item: BookDetails) => (
        <List.Item>
          <BookCard
            id={item.bookId}
            latestChapters={item.latestChapters}
            title={item.title}
            thumbnailUrl={item.thumbnailUrl}
            isPremium={item.premium}
          />
        </List.Item>
      )}
    />
  );
};

export default ListCard;
