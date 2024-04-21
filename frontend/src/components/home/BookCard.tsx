import React from 'react';

// components
import BookSingleCard from "./BookSingleCard";

type Book = {
    _id: string;
    title: string;
    author: string;
    publishYear: number;
};

type Props = {
    books: Book[];
}

const BookCard: React.FC<Props> = ({ books }) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {books.map((book) => (
            <BookSingleCard key={ book._id } book={ book } />
        ))}
    </div>
  )
}

export default BookCard