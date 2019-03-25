import React from "react";
import { BookShelf } from "../components";
import { Link } from "react-router-dom";

const categories = ["Currently Reading", "Want to Read", "Read"];

export const HomeView = ({ books, handleShelfUpdate, resetSearchResult }) => (
    <div className="list-books">
        <div className="list-books-title">
            <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
            <div>
                {categories.map(category => (
                    <BookShelf
                        key={category}
                        title={category}
                        books={books.filter(
                            book => book.shelf === _toCamel(category)
                        )}
                        onUpdate={handleShelfUpdate}
                    />
                ))}
            </div>
        </div>
        <div className="open-search">
            <Link to="/search" onClick={resetSearchResult}>
                Add a book
            </Link>
        </div>
    </div>
);

const _toCamel = str =>
    str
        .replace(/\s(.)/g, $1 => $1.toUpperCase())
        .replace(/\s/g, "")
        .replace(/^(.)/, $1 => $1.toLowerCase());
