import React, { useState } from "react";
import { Route } from "react-router-dom";
import "./App.css";
import { HomeView, SearchView } from "./view";
import { useBooksApi } from "./effects";

export default () => {
    const [books, setBooks] = useState([]);
    const [booksIndex, setBooksIndex] = useState({});
    const [searchResult, setSearchResult] = useState([]);
    const {
        handleShelfUpdate,
        handleSearchTerm,
        resetSearchResult
    } = useBooksApi({
        books,
        booksIndex,
        searchResult,
        setBooks,
        setBooksIndex,
        setSearchResult
    });

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
