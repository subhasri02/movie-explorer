

import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); 
  };

  return (
    <div className="flex items-center w-full sm:w-80 bg-gray-900 text-white rounded-lg shadow-md overflow-hidden">
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={handleChange}
        className="flex-1 px-4 py-2 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
    </div>
  );
};

export default SearchBar;


