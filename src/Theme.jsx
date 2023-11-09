import React, { createContext, useContext, useEffect, useState } from "react";

const DarkModeContext = createContext();

export const useDarkMode = () => {
  return useContext(DarkModeContext);
};

export const Usecontext = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((e) => !e);
  };

  return (
    <div>
      <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
        {children}
      </DarkModeContext.Provider>
    </div>
  );
};
