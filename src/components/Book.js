import React, { useState } from "react";
import Selector from "./Selector";
import PropTypes from "prop-types";
import Modal from 'react-bootstrap/Modal'

const Book = props => {
    const { title, author, imageUrl, id, description } = props.book;
    const [showPreview, setShowPreview] = useState(false);
    const openPreview = () => {
        setShowPreview(true)
    }
    const closePreview = () => {
        setShowPreview(false)
    }
    return (
        <>
            <div className="book">
                <div className="book-top">
                    <div
                        onClick={openPreview}
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
            <Modal show={showPreview} onHide={closePreview} scrollable>
                <iframe frameBorder="0"
                    scrolling="no"
                    style={{ border: 0 }}
                    src={`https://books.google.ca/books?id=${id}&lpg=PP1&pg=PP1&output=embed`}
                    width={500} height={600}>
                </iframe>
                {!!description &&
                    (<Modal.Body scrollable style={{ height: 200 }}>
                        <h2>Notes</h2>
                        {description}
                    </Modal.Body>)
                }
            </Modal>
        </>
    );
};

Book.propTypes = {
    book: PropTypes.object.isRequired,
    onUpdate: PropTypes.func.isRequired
};

export default Book;
