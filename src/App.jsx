import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import { data } from "./utils/data";
import {motion} from "framer-motion";
import { Toaster } from "react-hot-toast";

function App() {
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 3000); 

    return () => clearTimeout(timer); 
  }, []);

  return (
    <>
      <Toaster position="top-center" />
      <div className="bg-back-rgba h-screen flex justify-center items-center">
        {showMessage ? (
          <motion.div className="text-center text-lg mb-4"
          initial={{opacity:0,y:2000}}
          animate={{opacity:1,y:0}}
          transition={{delay:0.2}}
          >Hi, I am your auto complete suggestions</motion.div>
        ) : (
          <SearchBar data={data} />
        )}
      </div>
    </>
  );
}

export default App;
