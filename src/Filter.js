import React, { useState } from "react";
import "./Filter.css";

const Filter = ({ label, options, onChange, currOption }) => {
  return (
    <div className="filter-row">
      {label}:
      <select
        onChange={(e) => {
          const value = e.target.value == "" ? null : e.target.value;
          onChange(value);
        }}
        value={currOption}
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
