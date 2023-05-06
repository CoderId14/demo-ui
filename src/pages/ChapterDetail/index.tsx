import { useFetchBooks } from '@/services/client/bookService'
import { useFetchChapterImgs, useFetchChapters } from '@/services/client/chapterService'
import { Book } from '@/types/book/book.type'
import { Chapter, ChapterSearchParams } from '@/types/chapter/chapter.type'
import { Pagination, Skeleton } from 'antd'
import { memo, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ChapterText from './ChapterText'
import ChapterImg from './ChapterImg'

function ChapterDetail() {
  const [book, setBook] = useState<Book | undefined>()
  const [chapter, setChapter] = useState<Chapter | undefined>()

  const { chapterId, bookId } = useParams()
  const [searchParams, setSearchParams] = useState<ChapterSearchParams>({
    book: Number(bookId)
  })
  const { data: chapters, isFetching: isFetchingChapters } = useFetchChapters(searchParams)
  console.log("re render")
  const handlePagination = (pageNumber: number) => {
    setSearchParams((prev) => ({ ...prev, chapterNumber: pageNumber }))
  }
  const { data: dataChapterImgs, isFetching: isFetchingChapterImgs } = useFetchChapterImgs({
    chapterId: Number(chapterId)
  })
  
  const { data: books, isFetching: isFetchingBook } = useFetchBooks({
    id: Number(bookId),
    detail: true
  })
  useEffect(() => {
    if (books?.content) {
      setBook(books.content[0])
    }
    if(chapters?.content){
    setChapter(chapters.content[0])
    }
  }, [books, chapters])

  if (isFetchingBook || isFetchingChapterImgs || isFetchingChapters) {
    return <Skeleton />
  }

  if (book?.bookId && chapter && dataChapterImgs?.imgChapterList == null) {
    return (
      <>
        <ChapterText book={book} chapter={chapter}></ChapterText>
        <Pagination
          total={book?.latestChapters ? book.latestChapters[0].chapterNumber : 10}
          defaultCurrent={chapter?.chapterNumber}
          current={chapter?.chapterNumber}
          onChange={handlePagination}
          pageSize={1}
        ></Pagination>
      </>
    )
  }

  if (dataChapterImgs?.imgChapterList && book?.bookId) {
    return <ChapterImg book={book} chapterImgList={dataChapterImgs.imgChapterList}></ChapterImg>
  }

  return <Skeleton />
}

export default memo(ChapterDetail)
