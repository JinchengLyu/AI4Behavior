import React from 'react';

const Filter = ({ label, options, onClick }) => {
    return (
        <div className="filter-row">
            <h3>{label}</h3>
            <div className="filter-buttons">
                {options.map(option => (
                    <button key={option} onClick={() => onClick(option)}>
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Filter;
