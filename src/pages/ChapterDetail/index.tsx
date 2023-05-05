import { useFetchBooks } from '@/services/client/bookService'
import { useFetchChapterDetail, useFetchChapterImgs } from '@/services/client/chapterService'
import { Book } from '@/types/book/book.type'
import { Chapter } from '@/types/chapter/chapter.type'
import { Skeleton } from 'antd'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ChapterText from './ChapterText'
import ChapterImg from './ChapterImg'

function ChapterDetail() {
  const [book, setBook] = useState<Book | undefined>();  
  const { chapterId, bookId } = useParams()

  const { data, isFetching } = useFetchChapterDetail({
    chapterId: Number(chapterId)
  })
  const { data: dataChapterImgs, isFetching: isFetchingChapterImgs } = useFetchChapterImgs({
    chapterId: Number(chapterId)
  })
  let chapter: Chapter = {
    id: 0,
    bookId: 0,
    title: '',
    chapterNumber: 0,
    modifiedDate: ''
  }
  const { data: books, isFetching: isFetchingBook } = useFetchBooks({
    id: Number(bookId),
    detail: true
  })
  useEffect(()=>{
    if(books?.content){
      setBook(books.content[0])
    }
  }, [books])
  if (data) {
    chapter = data
  }
  if (isFetchingBook || isFetching || isFetchingChapterImgs) {
    return <Skeleton />
  }

  if(book?.bookId && dataChapterImgs?.imgChapterList == null){
    return <ChapterText book={book} chapter={chapter}></ChapterText>
  }

  if(dataChapterImgs?.imgChapterList && book?.bookId){
    return <ChapterImg book={book} chapterImgList={dataChapterImgs.imgChapterList}></ChapterImg>
  }


}

export default ChapterDetail
