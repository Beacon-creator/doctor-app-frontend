import React, { createContext, useContext, useState, ReactNode } from "react";
import { lightTheme, darkTheme } from "./theme";

interface ThemeContextProps {
  theme: typeof lightTheme;
  toggleTheme: () => void;
  darkMode: boolean;
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: lightTheme,
  toggleTheme: () => {},
  darkMode: false,
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <ThemeContext.Provider
      value={{ theme: darkMode ? darkTheme : lightTheme, toggleTheme, darkMode }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
