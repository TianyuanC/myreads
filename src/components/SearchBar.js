import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const SearchBar = ({ onSearch }) => (
    <div className="search-books-bar">
        <Link to="/" className="close-search">
            Close
        </Link>
        <div className="search-books-input-wrapper">
            <input
                type="text"
                placeholder="Search by title or author"
                onChange={e => {
                    onSearch(e.target.value);
                }}
            />
        </div>
    </div>
);

SearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired
};

export default SearchBar;
