import { Book } from '@/types/book/book.type'
import { ImgChapterList } from '@/types/chapter/chapter.type'
import { Image, List } from 'antd'

interface Props {
  chapterImgList: ImgChapterList;
  book: Book;
}
function ChapterImg({chapterImgList, book}: Props) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <List
        dataSource={chapterImgList.content}
        pagination={{position: 'both', align: 'center', total: book?.latestChapters ?  book.latestChapters[0].chapterNumber : 10}}
        renderItem={(item) => (
          <List.Item style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Image src={item.fileUrl}></Image>
          </List.Item>
        )}
      >
      </List>
    
    </div>
  )
}

export default ChapterImg
