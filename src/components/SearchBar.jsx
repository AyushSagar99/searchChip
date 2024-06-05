import React, { useState } from 'react';
import ClipLoader from "react-spinners/ClipLoader";

export default function SearchBar({ data }) {
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [chips, setChips] = useState([]);

  const search = (value) => {
    setIsLoading(true);
    const results = data.filter(item =>
      item.toLowerCase().startsWith(value.toLowerCase())
    );
    setFilteredData(results);
    setIsLoading(false);
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
  };

  const handleRemoveChip = (chipToRemove) => {
    setChips(chips.filter(chip => chip !== chipToRemove)); 
  };

  return (
    <div className="fixed grid justify-center items-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <label className="text-[rgba(122,122,123,255)] font-extralight text-xs">INPUT TAGS</label>
      <div className="relative flex items-center rounded-2xl bg-search-rgba">
        <div className="flex text-center ">
          {chips.map((chip, index) => (
            <div key={index} className="bg-white rounded-xl p-1 shadow-gray-700 text-sm ml-2 shadow-sm ">
              {chip}
              <span className="ml-2 cursor-pointer text-sm " onClick={() => handleRemoveChip(chip)}>X</span>
            </div>
          ))}
        </div>
        <input 
          type="search" 
          onChange={(e) => handleChange(e.target.value)} 
          value={searchValue}
          className="rounded-2xl bg-search-rgba p-2 ml-2 focus-within:outline-none w-full"
          placeholder={chips.length > 0 ? "" : "Search..."}
        />
        {isLoading && (
          <div className="absolute right-3 top-3">
            <ClipLoader size={20} color={"#123abc"} loading={isLoading} />
          </div>
        )}
      </div>
      <div className="transition shadow-xl shadow-black rounded-2xl  w-36 ">
        {filteredData.length > 0 ? (
          filteredData.map((value, key) => (
            <div 
              key={key} 
              className="p-2 hover:shadow-inner transition bg-white border-gray-300 cursor-pointer
               hover:bg-search-rgba hover:rounded-2xl"
              onClick={() => handleChipClick(value)} 
            >
              {value}
            </div>
          ))
        ) : (
          !isLoading && searchValue && (
            <div className="p-2 text-gray-500 shadow-none w-80">No matches found</div>
          )
        )}
      </div>
    </div>
  );
}
