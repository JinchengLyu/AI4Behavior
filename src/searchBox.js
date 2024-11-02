import React, { useState } from 'react';
import './SearchBox.css';

const SearchBox = ({ onSearch, initSearchVal }) => {
    const [inputValue, setInputValue] = useState(initSearchVal);

    const handleSubmit = () => {
        console.debug(inputValue);
        onSearch(inputValue);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            setInputValue(event.target.value);
            onSearch(event.target.value);
        }
    };

    return (
        <div className="search-box">
            <input
                type="text"
                placeholder="Transcript"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyUp={handleKeyPress}
            />
            <button onClick={handleSubmit}>Search</button>
        </div>
    );
};

export default SearchBox;
