

import styled from 'styled-components'
import { Card, Image, Row, Typography } from 'antd'
import { ClockCircleOutlined, StarFilled } from '@ant-design/icons'
import { LatestChapter } from '@/types/chapter/chapter.type'
import { formatDistance } from 'date-fns'
import { NavLink } from 'react-router-dom'
import { AppConst } from '@/app-const'

const { Text } = Typography

const CardWrapper = styled(Card)`
`
const TitleText = styled(Text)`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
`

const ChapterWrapper = styled(Row)`
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`

const ChapterTitle = styled(Text)`
  font-size: 16px;

  @media screen and (min-width: 768px) {
    font-size: 14px;
  }
`

const ChapterTime = styled(Text)`
  font-size: 10px;
  color: #8c8c8c;

  @media screen and (min-width: 768px) {
    font-size: 12px;
  }
`

const ClockIcon = styled(ClockCircleOutlined)`
  margin-right: 4px;
`

interface Props {
  id: number
  title: string
  thumbnailUrl: string
  latestChapters: LatestChapter[]
  isPremium: boolean
}

const BookCard = ({ id, title, thumbnailUrl, latestChapters, isPremium }: Props) => {
  return (
    <NavLink to={AppConst.BOOK_DETAIL_URL + id}>
      <CardWrapper
        key={id}
        cover={
            <Image
              alt={title}
              src={thumbnailUrl}
              preview={false}
              style={{ height: '300px', minHeight: '300px', objectFit: 'cover' }}
            />
        }
      >
          <TitleText strong>{title} {isPremium && <StarFilled style={{'color': 'yellow'}}></StarFilled>}</TitleText>
        {latestChapters.map((chapter) => (
          <ChapterWrapper key={chapter.id}>
            <>
              <ChapterTitle>
                <NavLink to={`/book/${id}/chapter/${chapter?.id}`}>Chapter {chapter.chapterNumber} 
                </NavLink>
              </ChapterTitle>
              <ChapterTime>
                <ClockIcon />
                {formatDistance(new Date(chapter.modifiedDate), new Date(), {
                  addSuffix: true
                })}
              </ChapterTime>
            </>
          </ChapterWrapper>
        ))}
      </CardWrapper>
    </NavLink>
  )
}

export default BookCard

