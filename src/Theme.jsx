import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const DarkModeContext = createContext();

export const useDarkMode = () => {
  return useContext(DarkModeContext);
};

export const Usecontext = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((e) => !e);
  };

  // const themeChange = () => {
  //   if (isDarkMode === false) {
  //     toast("Theme is Light");
  //   } else {
  //     toast("Theme is Dark");
  //   }
  // };
  // useEffect(() => {
  //   themeChange();
  // });

  return (
    <div>
      <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
        {children}
      </DarkModeContext.Provider>
    </div>
  );
};
