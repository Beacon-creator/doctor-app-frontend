import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem("darkMode");
      if (stored !== null) {
        setDarkMode(stored === "true");
      }
      setHydrated(true);
    })();
  }, []);

  const toggleTheme = async () => {
    const next = !darkMode;
    setDarkMode(next);
    await AsyncStorage.setItem("darkMode", String(next));
  };

  if (!hydrated) return null; // prevents theme flash on load

  return (
    <ThemeContext.Provider
      value={{
        theme: darkMode ? darkTheme : lightTheme,
        toggleTheme,
        darkMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
