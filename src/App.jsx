import React from "react"
import SearchBar from "./components/SearchBar";
import { data } from "./utils/data";

function App() {
  

  return (
    <>
      <div className="bg-back-rgba h-screen">
        <SearchBar data={data}/>
      </div>
    </>
  )
}

export default App
