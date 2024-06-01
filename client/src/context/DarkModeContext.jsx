/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext();

/* eslint-disable react/prop-types */
function DarkModeProvider({ children }) {
  const [mode, setMode] = useLocalStorageState("light-mode");

  useEffect(
    function () {
      if (mode === "light-mode") {
        document.documentElement.classList.remove("dark-mode");
      }
      if (mode === "dark-mode") {
        document.documentElement.classList.remove("light-mode");
      }
      document.documentElement.classList.add(mode);
    },
    [mode]
  );

  const handleToggle = function () {
    setMode((mode) => (mode === "light-mode" ? "dark-mode" : "light-mode"));
  };

  return (
    <DarkModeContext.Provider value={{ mode, handleToggle }}>
      {children}
    </DarkModeContext.Provider>
  );
}

const useDarkMode = function () {
  const context = useContext(DarkModeContext);
  if (context === undefined)
    throw new Error("Context used outside the provider");

  return context;
};

export { DarkModeProvider, useDarkMode };
