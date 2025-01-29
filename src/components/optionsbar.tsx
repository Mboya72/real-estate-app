'use client';

import { useState } from "react";

const SearchBar = () => {
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");

  const handleSearch = () => {
    // You can add your search logic here
    console.log("Searching with: ", option1, option2, option3);
  };

  return (
    <div className="relative mt-40 w-full">
      {/* Blurry Background Bar */}
      <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-md"></div>

      {/* Content Container (inputs + button) */}
      <div className="relative z-10 flex flex-col sm:flex-row justify-evenly items-center w-full h-full p-8">
        {/* Input Fields */}
        <h1>Find A Home</h1>
        <input
          type="text"
          value={option1}
          onChange={(e) => setOption1(e.target.value)}
          placeholder="Option 1"
          className="p-3 rounded-lg border border-gray-300 w-full sm:w-48 mb-4 sm:mb-0"
        />
        <input
          type="text"
          value={option2}
          onChange={(e) => setOption2(e.target.value)}
          placeholder="Option 2"
          className="p-3 rounded-lg border border-gray-300 w-full sm:w-48 mb-4 sm:mb-0"
        />
        <input
          type="text"
          value={option3}
          onChange={(e) => setOption3(e.target.value)}
          placeholder="Option 3"
          className="p-3 rounded-lg border border-gray-300 w-full sm:w-48 mb-4 sm:mb-0"
        />

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="p-3 bg-[#6E4559] text-white rounded-lg hover:bg-[#5A3C4C] transition duration-300 w-full sm:w-auto"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
