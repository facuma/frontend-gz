// src/components/SearchBar.jsx
import React from 'react';

function SearchBar() {
  return (
    <div className="flex justify-center my-5">
      <input
        type="text"
        placeholder="Buscar..."
        className="border border-gray-300 rounded-l-full px-4 py-2 outline-none w-1/2"
      />
      <button className="bg-pink-500 text-white px-6 py-2 rounded-r-full">
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;
