// ComboBox.js
import React, { useState } from 'react';

const ComboBox = ({ options, placeholder, onSelect }) => {
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    if (onSelect) {
      onSelect(event.target.value);
    }
  };

  return (
    <select value={selectedValue} onChange={handleChange}>
      <option value="" disabled>{placeholder}</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default ComboBox;
