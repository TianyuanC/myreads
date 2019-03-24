import React, { useState, useEffect } from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { Route } from "react-router-dom";
import { HomeView } from "./view/HomeView";
import { SearchView } from "./view/SearchView";
export default () => {
    const [books, setBooks] = useState([]);
    const [booksIndex, setBooksIndex] = useState({});
    const [searchResult, setSearchResult] = useState([]);

    const handleSearchTerm = sTerm => {
        if (!sTerm) {
            resetSearchResult();
            return;
        }
        BooksAPI.search(sTerm, 10).then(books => {
            if (!books || !Array.isArray(books)) {
                resetSearchResult();
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

    const resetSearchResult = () => {
        setSearchResult([]);
    };

    const handleShelfUpdate = (book, shelf) => {
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

    const homeViewProps = {
        books,
        resetSearchResult,
        handleShelfUpdate
    };
    const searchViewProps = {
        searchResult,
        handleSearchTerm,
        handleShelfUpdate
    };
    return (
        <div className="app">
            <Route
                path="/search"
                render={() => <SearchView {...searchViewProps} />}
            />

            <Route
                exact
                path="/"
                render={() => <HomeView {...homeViewProps} />}
            />
        </div>
    );
};
