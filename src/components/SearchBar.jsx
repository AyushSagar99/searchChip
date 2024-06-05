import React, { useState, useRef } from 'react';
import ClipLoader from "react-spinners/ClipLoader";

export default function SearchBar({ data }) {
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [chips, setChips] = useState([]);
  const inputRef = useRef(null);

  const search = (value) => {
    setIsLoading(true);
    setTimeout(() => {
      const results = data.filter(item =>
        item.toLowerCase().startsWith(value.toLowerCase())
      );
      setFilteredData(results);
      setIsLoading(false);
    }, 500);
  };

  const handleChange = (value) => {
    setSearchValue(value);
    if (value === "") {
      setFilteredData([]); 
    } else {
      search(value);
    }
  };

  const handleChipClick = (value) => {
    if (!chips.includes(value)) {
      setChips([...chips, value]);
    }
    setSearchValue("");
    inputRef.current.focus();
  };

  const handleRemoveChip = (chipToRemove) => {
    setChips(chips.filter(chip => chip !== chipToRemove));
    inputRef.current.focus();
  };

  return (
    <div className="fixed grid justify-center items-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[40vw]">
      <label className="text-[rgba(122,122,123,255)] font-extralight text-xs mb-2">INPUT TAGS</label>
      <div className="relative flex items-center rounded-2xl bg-search-rgba p-2 w-full">
        <div className="flex flex-wrap items-center flex-grow">
          {chips.map((chip, index) => (
            <div key={index} className="bg-white rounded-lg px-3 py-1 flex leading-none shadow-gray-700 text-sm mr-2 mb-1 shadow-sm">
              {chip}
              <span className="ml-2 cursor-pointer text-sm text-center" onClick={() => handleRemoveChip(chip)}>X</span>
            </div>
          ))}
          <input 
            type="search" 
            onChange={(e) => handleChange(e.target.value)} 
            value={searchValue}
            ref={inputRef}
            autoFocus
            className="bg-search-rgba p-2 ml-2 flex-grow focus:outline-none"
            placeholder={chips.length > 0 ? "" : "Search..."}
            style={{ minWidth: '100px' }}
          />
        </div>
        {isLoading && (
          <div className="absolute right-3 top-3">
            <ClipLoader size={20} color={"#123abc"} loading={isLoading} />
          </div>
        )}
      </div>
      <div className="transition shadow-xl shadow-black rounded-2xl mt-2 w-full bg-white">
        {filteredData.length > 0 ? (
          filteredData.map((value, key) => (
            <div 
              key={key} 
              className="p-2 hover:shadow-inner transition bg-white border-gray-300 cursor-pointer
               hover:bg-search-rgba hover:rounded-2xl rounded-xl"
              onClick={() => handleChipClick(value)} 
            >
              {value}
            </div>
          ))
        ) : (
          !isLoading && searchValue && (
            <div className="p-2 text-gray-500 shadow-none">No matches found</div>
          )
        )}
      </div>
    </div>
  );
}
