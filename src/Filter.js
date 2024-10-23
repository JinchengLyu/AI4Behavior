import React from 'react';

const Filter = ({ label, options, onChange }) => {
    return (
        <div className="filter-row">
            {label}:
            <select onChange={(e) => onChange(e.target.value)}>
                <option value="">Select {label}</option>
                {options.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    );
};

export default Filter;
