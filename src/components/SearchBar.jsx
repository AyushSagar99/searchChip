import React, { useState, useRef } from 'react';
import toast from 'react-hot-toast';
import { MdAdd } from 'react-icons/md';
import {motion} from "framer-motion"
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
        item.toLowerCase().includes(value.toLowerCase()) && !chips.includes(item)
      );
      setFilteredData(results.slice(0, 5));
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
      toast.success(`Chip added: ${value}`);
    }
    setSearchValue("");
    setFilteredData([]); 
    inputRef.current.focus();
  };

  const handleRemoveChip = (chipToRemove) => {
    setChips(chips.filter(chip => chip !== chipToRemove));
    toast.error(`Chip removed: ${chipToRemove}`);
    inputRef.current.focus();
    if (searchValue) {
      search(searchValue);
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col justify-between items-center">
      <div className="flex flex-col justify-center items-center w-full max-w-lg p-4 mt-auto mb-auto">
        <motion.label className="text-[rgba(122,122,123,255)] font-extralight text-xs mb-2 mr-[25rem]"
        initial={{opacity:0,y:500}}
        animate={{opacity:1,y:0}}
        transition={{delay:0.175}}
        >INPUT TAGS</motion.label>
        <div className="relative flex items-center rounded-2xl bg-search-rgba p-2 w-full">
          <div className="flex flex-wrap items-center flex-grow">
            {chips.map((chip, index) => (
              <div key={index} className="bg-white rounded-lg px-3 py-1 flex leading-none
               shadow-gray-700 text-sm mr-2 mb-1 shadow-sm">
                {chip}
                <span className="ml-2 cursor-pointer text-md font-medium text-center
                 text-stone-500 rotate-45" onClick={() => handleRemoveChip(chip)}> <MdAdd /> </span>
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
          {filteredData.length > 0 && searchValue !== "" ? (
            filteredData.map((value, key) => {
              const startIndex = value.toLowerCase().indexOf(searchValue.toLowerCase());
              const endIndex = startIndex + searchValue.length;
              const matchedText = value.slice(startIndex, endIndex);
              const beforeText = value.slice(0, startIndex);
              const afterText = value.slice(endIndex);

              return (
                <div 
                  key={key} 
                  className="p-2 hover:shadow-inner transition bg-white border-gray-300 cursor-pointer
                   hover:bg-search-rgba hover:rounded-2xl rounded-xl"
                  onClick={() => handleChipClick(value)} 
                >
                  {beforeText}<span className="text-blue-500">{matchedText}</span>{afterText}
                </div>
              );
            })
          ) : (
            !isLoading && searchValue && (
              <div className="p-2 text-gray-500 shadow-none">No matches found</div>
            )
          )}
        </div>
      </div>
      <div className="text-center mb-4 p-4 w-full max-w-lg">
        <p className="text-gray-500"><span className="text-black">Chips</span> can be utilized to showcase <span className="text-black">autocomplete suggestions</span> as users input information</p>
      </div>
    </div>
  );
}
