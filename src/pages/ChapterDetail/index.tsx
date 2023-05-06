import { useFetchBooks } from '@/services/client/bookService'
import { useFetchChapters } from '@/services/client/chapterService'
import { Book } from '@/types/book/book.type'
import { Chapter, ChapterSearchParams } from '@/types/chapter/chapter.type'
import { Pagination, Skeleton } from 'antd'
import { memo, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ChapterText from './ChapterText'
import ChapterImg from './ChapterImg'
import NavBarChapterDetail from '@/components/NavBarChapterDetail'

function ChapterDetail() {
  const [book, setBook] = useState<Book | undefined>()
  const [chapter, setChapter] = useState<Chapter | undefined>()

  const { chapterId, bookId } = useParams()
  const [searchParams, setSearchParams] = useState<ChapterSearchParams>({
    book: Number(bookId),
    id: Number(chapterId)
  })
  const { data: chapters, isFetching: isFetchingChapters } = useFetchChapters(searchParams)
  console.log('re render chapter Detail')
  const handlePagination = (pageNumber: number) => {
    setSearchParams((prev) => ({ ...prev, chapterNumber: pageNumber, id: undefined }))
  }

  const { data: books, isFetching: isFetchingBook } = useFetchBooks({
    id: Number(bookId),
    detail: true
  })
  useEffect(() => {
    if (books?.content) {
      setBook(books.content[0])
    }
    if (chapters?.content) {
      setChapter(chapters.content[0])
    }
  }, [books, chapters])

  if (isFetchingBook || isFetchingChapters) {
    return <Skeleton />
  }

  if (book?.bookId && chapter && book.novel) {
    return (
      <>
        <ChapterText book={book} chapter={chapter}></ChapterText>
        <Pagination
          total={book?.latestChapters ? book.latestChapters[0].chapterNumber : 10}
          defaultCurrent={chapter?.chapterNumber}
          current={chapter?.chapterNumber}
          onChange={handlePagination}
          pageSize={1}
          style={{ justifyContent: 'center', display: 'flex' }}
        ></Pagination>
      </>
    )
  }

  if (chapter && book?.bookId && !book.novel) {
    return (
      <>
        <NavBarChapterDetail book={book}></NavBarChapterDetail>
        <Pagination
          total={book?.latestChapters ? book.latestChapters[0].chapterNumber : 10}
          defaultCurrent={chapter?.chapterNumber}
          current={chapter?.chapterNumber}
          onChange={handlePagination}
          pageSize={1}
          style={{ justifyContent: 'center', display: 'flex' }}
        ></Pagination>
        <ChapterImg chapter={chapter}></ChapterImg>
        <Pagination
          total={book?.latestChapters ? book.latestChapters[0].chapterNumber : 10}
          defaultCurrent={chapter?.chapterNumber}
          current={chapter?.chapterNumber}
          onChange={handlePagination}
          pageSize={1}
          style={{ justifyContent: 'center', display: 'flex' }}
        ></Pagination>
      </>
    )
  }

  return <Skeleton />
}

export default memo(ChapterDetail)
