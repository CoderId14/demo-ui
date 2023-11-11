import React from 'react';
import Carousel from 'antd/lib/carousel';
import { Book } from '../../types/book/book.type';
import { Card, Image } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { NavLink } from 'react-router-dom';
import { AppConst } from '@/app-const';

interface BookCarouselProps {
  books: Book[];
}

const BookCarousel: React.FC<BookCarouselProps> = ({ books }) => {
  const settings = {
    dots: true,
    autoplay: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Carousel {...settings}>
      {books.map((book) => (
        <NavLink to={`${AppConst.BOOK_DETAIL_URL}${book?.bookId}`} key={book.bookId}>
          <Card
            hoverable
            cover={
              <Image
                src={book.thumbnailUrl}
                alt={book.title}
                preview={false}
                height={400}
                style={{ objectFit: 'cover' }}
              />
            }
          >
            <Meta title={book.title} description={book.author} />
          </Card>
        </NavLink>
      ))}
    </Carousel>
  );
};

export default BookCarousel;
