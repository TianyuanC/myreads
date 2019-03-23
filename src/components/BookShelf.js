import React from "react";
import BookList from "./BookList";
import PropTypes from "prop-types";

const BookShelf = ({ books, title, onUpdate }) => (
    <div>
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <BookList books={books} onUpdate={onUpdate} />
        </div>
    </div>
);

BookShelf.propTypes = {
    books: PropTypes.array.isRequired,
    onUpdate: PropTypes.func.isRequired
};

export default BookShelf;
