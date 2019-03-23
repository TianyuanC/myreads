import React from "react";
import Selector from "./Selector";
import PropTypes from "prop-types";

const Book = props => {
    const { title, author, imageUrl } = props.book;
    return (
        <div className="book">
            <div className="book-top">
                <div
                    className="book-cover"
                    style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url(${imageUrl})`
                    }}
                />
                <Selector book={props.book} onUpdate={props.onUpdate} />
            </div>
            <div className="book-title">{title}</div>
            <div className="book-authors">{author}</div>
        </div>
    );
};

Book.propTypes = {
    book: PropTypes.object.isRequired,
    onUpdate: PropTypes.func.isRequired
};

export default Book;
