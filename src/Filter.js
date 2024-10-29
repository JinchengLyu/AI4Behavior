import React, { useState } from 'react';
import './Filter.css';

const Filter = ({ label, options, onChange }) => {
    const [currFilter,setFilter] = useState(null);
    return (
        <div className="filter-row">
            {label}:
            <select
                value={currFilter}
                onChange={(e) => {
                    console.log(`Filter changed: ${label} = ${e.target.value}`);  // Debug print
                    setFilter(e.target.value);
                    onChange(e.target.value);
                }}
            >
                <option value={null}>Select {label}</option>
                {options.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    );
};

export default Filter;
