import React from "react";
import { Route } from "react-router-dom";
import { HomeView, SearchView } from "./view";
import { useBooksApi } from "./effects";
import "./App.css";

export default () => {
    const {
        books,
        searchResult,
        handleShelfUpdate,
        handleSearchTerm,
        resetSearchResult
    } = useBooksApi();

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
