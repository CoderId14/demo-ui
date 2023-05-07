import { useFetchChapterImgs } from '@/services/client/chapterService'
import { Chapter } from '@/types/chapter/chapter.type'
import { Image, List, Skeleton } from 'antd'

interface Props {
  chapter: Chapter
}
function ChapterImg({ chapter }: Props) {
  const { data: dataChapterImgs, isFetching: isFetchingChapterImgs } = useFetchChapterImgs({
    chapterId: Number(chapter.id)
  })

  if (isFetchingChapterImgs) {
    return <Skeleton />
  }
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <List
          dataSource={dataChapterImgs?.imgChapterList?.content}
          renderItem={(item) => (
            <List.Item style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Image src={item.fileUrl} preview={false}></Image>
            </List.Item>
          )}
        ></List>
      </div>
    </>
  )
}

export default ChapterImg
