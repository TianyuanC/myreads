import React, { useState, useEffect } from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { BookList, SearchBar, BookShelf } from "./components";
import { Route, Link } from "react-router-dom";

const BooksApp = () => {
    const [books, setBooks] = useState([]);
    const [booksIndex, setBooksIndex] = useState({});
    const [searchResult, setSearchResult] = useState([]);

    const _handleSearchTerm = sTerm => {
        if (!sTerm) {
            _resetSearchResult();
            return;
        }
        BooksAPI.search(sTerm, 10).then(books => {
            if (!books || !Array.isArray(books)) {
                _resetSearchResult();
                return;
            }

            setSearchResult(
                books.map(oBook => {
                    return {
                        id: oBook.id,
                        author: oBook.authors ? oBook.authors[0] : null,
                        title: oBook.title,
                        imageUrl: oBook.imageLinks
                            ? oBook.imageLinks.thumbnail
                            : null,
                        shelf: booksIndex[oBook.id]
                            ? booksIndex[oBook.id]
                            : "none"
                    };
                })
            );
        });
    };

    const _resetSearchResult = () => {
        setSearchResult([]);
    };

    const _handleShelfUpdate = (book, shelf) => {
        book.shelf = shelf;
        const updatedBooks = books.filter(b => b.id !== book.id).concat(book);
        const updatedSearchResult = searchResult.map(b => {
            if (b.id === book.id) {
                b.shelf = shelf;
            }
            return b;
        });
        let updatedIndex = booksIndex;
        updatedIndex[book.id] = shelf;

        BooksAPI.update(book, shelf).then(() => {
            setBooks(updatedBooks);
            setSearchResult(updatedSearchResult);
            setBooksIndex(updatedIndex);
        });
    };

    useEffect(() => {
        BooksAPI.getAll().then(books => {
            let booksIndex = {};
            const booksView = books.map(oBook => {
                booksIndex[oBook.id] = oBook.shelf;
                return {
                    id: oBook.id,
                    author: oBook.authors ? oBook.authors[0] : null,
                    title: oBook.title,
                    imageUrl: oBook.imageLinks
                        ? oBook.imageLinks.thumbnail
                        : null,
                    shelf: oBook.shelf
                };
            });
            setBooks(booksView);
            setBooksIndex(booksIndex);
        });
    }, []);

    const currentlyReadingBooks = books.filter(
        book => book.shelf === "currentlyReading"
    );
    const wantToReadBooks = books.filter(book => book.shelf === "wantToRead");
    const readBooks = books.filter(book => book.shelf === "read");

    return (
        <div className="app">
            <Route
                path="/search"
                render={() => (
                    <div className="search-books">
                        <SearchBar onSearch={_handleSearchTerm} />
                        <div className="search-books-results">
                            <BookList
                                books={searchResult}
                                onUpdate={_handleShelfUpdate}
                            />
                        </div>
                    </div>
                )}
            />

            <Route
                exact
                path="/"
                render={() => (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <div className="list-books-content">
                            <div>
                                <BookShelf
                                    title="Currently Reading"
                                    books={currentlyReadingBooks}
                                    onUpdate={_handleShelfUpdate}
                                />
                                <BookShelf
                                    title="Want to Read"
                                    books={wantToReadBooks}
                                    onUpdate={_handleShelfUpdate}
                                />
                                <BookShelf
                                    title="Read"
                                    books={readBooks}
                                    onUpdate={_handleShelfUpdate}
                                />
                            </div>
                        </div>
                        <div className="open-search">
                            <Link to="/search" onClick={_resetSearchResult}>
                                Add a book
                            </Link>
                        </div>
                    </div>
                )}
            />
        </div>
    );
};

export default BooksApp;
