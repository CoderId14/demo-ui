

import ListCard from '@/components/ListCard';
import { useFetchBooks } from '@/services/client/bookService';
import { Book, BookDetails } from '@/types/book/book.type';
import { Row } from 'antd';
import { convertBooksToBookDetails } from '../../../Utils/convert';
import PreLoad from '@/components/preLoad';
import { useState } from 'react';

interface SimilarSectionProps {
    bookId: number;
}

function SimilarSection({ bookId }: SimilarSectionProps) {
    const { data: currentBook } = useFetchBooks({ detail: true, id: bookId });
    const categoryIds = currentBook?.content[0].categories?.map((category) => category.categoryId);
    const [random] = useState<number>(Math.floor(Math.random()*(categoryIds?.length? categoryIds?.length -1 : 0)));
    console.log("random: ",random )
    const { data, isFetching } = useFetchBooks(
        { categories: categoryIds? String(categoryIds[random]) : undefined, detail: true });
    let similarBooks: BookDetails[] = []
    console.log("similar: ", data);
    if(data && data.content){
        similarBooks = convertBooksToBookDetails(data?.content.filter((book: Book) => book.bookId !== bookId));
    }
    if (isFetching) {
        return <PreLoad size="large" />;
    }
    return (
        <div>
            <Row justify={"start"}>
                <h2>Similar Books</h2>
            </Row>
            <ListCard books={similarBooks} pageSize={4} isPageable={false}/>
        </div>
    );
}

export default SimilarSection;
