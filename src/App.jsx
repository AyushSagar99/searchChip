import React from "react"
import SearchBar from "./components/SearchBar";
import { data } from "./utils/data";
import { Toaster } from "react-hot-toast";

function App() {
  

  return (
    <>
    <Toaster position="top-center"/>
      <div className="bg-back-rgba h-screen">
        <SearchBar data={data}/>
      </div>
    </>
  )
}

export default App
