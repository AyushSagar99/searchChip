import React, { useState } from 'react';
import ClipLoader from "react-spinners/ClipLoader";

export default function SearchBar({ data }) {
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const search = (value) => {
    setIsLoading(true);
    setTimeout(() => {
      if (value) {
        const results = data.filter(item =>
          item.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredData(results);
      } else {
        setFilteredData([]);
      }
      setIsLoading(false);
    }, 500); // Simulate a search delay
  };

  const handleChange = (value) => {
    setSearchValue(value);
    search(value);
  };

  return (
    <div className="absolute grid justify-center items-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <label className="text-[rgba(122,122,123,255)] font-extralight text-xs">INPUT TAGS</label>
      <div className="relative">
        <input 
          type="search" 
          onChange={(e) => handleChange(e.target.value)} 
          value={searchValue}
          className="rounded-2xl bg-search-rgba p-2"
          placeholder="Search..."
        />
        {isLoading && (
          <div className="absolute right-3 top-3">
            <ClipLoader size={20} color={"#123abc"} loading={isLoading} />
          </div>
        )}
      </div>
      <div className="mt-4">
        {filteredData.length > 0 ? (
          filteredData.map((value, key) => (
            <div key={key} className="p-2 border-b border-gray-300">
              {value}
            </div>
          ))
        ) : (
          !isLoading && searchValue && (
            <div className="p-2 text-gray-500">No matches found</div>
          )
        )}
      </div>
    </div>
  );
}
