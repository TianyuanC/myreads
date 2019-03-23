import React from "react";
import Book from "./Book";
import PropTypes from "prop-types";

const BookList = ({ books, onUpdate }) => (
    <div className="bookshelf-books">
        <ol className="books-grid">
            {books.map((book, index) => (
                <li key={book.id + "-" + index}>
                    <Book book={book} onUpdate={onUpdate} />
                </li>
            ))}
        </ol>
    </div>
);

BookList.propTypes = {
    books: PropTypes.array.isRequired,
    onUpdate: PropTypes.func.isRequired
};

export default BookList;
