import React from "react";
import PropTypes from "prop-types";

const ShelfChanger = ({ book, onUpdate }) => {
    if (!book.shelf) {
        book.shelf = "none";
    }
    return (
        <div className="book-shelf-changer">
            <select
                value={book.shelf}
                onChange={e => onUpdate(book, e.target.value)}
            >
                <option value="move" disabled>
                    Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
            </select>
        </div>
    );
};

ShelfChanger.propTypes = {
    onUpdate: PropTypes.func.isRequired,
    book: PropTypes.object.isRequired
};

export default ShelfChanger;
