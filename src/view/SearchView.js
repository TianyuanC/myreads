import React from "react";
import { BookList, SearchBar } from "../components";

export const SearchView = ({
    handleSearchTerm,
    searchResult,
    handleShelfUpdate
}) => (
    <div className="search-books">
        <SearchBar onSearch={handleSearchTerm} />
        <div className="search-books-results">
            <BookList books={searchResult} onUpdate={handleShelfUpdate} />
        </div>
    </div>
);
