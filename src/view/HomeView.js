import React from "react";
import { BookShelf } from "../components";
import { Link } from "react-router-dom";

export const HomeView = ({ books, handleShelfUpdate, resetSearchResult }) => (
    <div className="list-books">
        <div className="list-books-title">
            <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
            <div>
                <BookShelf
                    title="Currently Reading"
                    books={books.filter(
                        book => book.shelf === "currentlyReading"
                    )}
                    onUpdate={handleShelfUpdate}
                />
                <BookShelf
                    title="Want to Read"
                    books={books.filter(book => book.shelf === "wantToRead")}
                    onUpdate={handleShelfUpdate}
                />
                <BookShelf
                    title="Read"
                    books={books.filter(book => book.shelf === "read")}
                    onUpdate={handleShelfUpdate}
                />
            </div>
        </div>
        <div className="open-search">
            <Link to="/search" onClick={resetSearchResult}>
                Add a book
            </Link>
        </div>
    </div>
);
