import { useState } from 'react';

export default function SearchBar({ onSearch, placeholder = 'Search countries...' }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder={placeholder}
        className="search-input"
      />
      {searchTerm && (
        <button
          onClick={() => {
            setSearchTerm('');
            onSearch('');
          }}
          className="search-clear"
        >
          ✕
        </button>
      )}
    </div>
  );
}
