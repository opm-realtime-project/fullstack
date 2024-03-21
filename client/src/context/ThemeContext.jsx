import { createContext, useState } from "react";

export const ThemeContext = createContext({
  currentTheme: "light",

  theme: {
    light: {
      bgColor: "bg-gray-300",
      textColor: "text-black"
    },
    dark: {
      bgColor: "bg-black",
      textColor: "text-white"
    },
  },
});

export default function ThemeProvider({ children }) {
  let [currentTheme, setCurrentTheme] = useState("light");
  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        setCurrentTheme,
        theme: {
          light: {
            bgColor: "bg-gray-300",
            textColor: "text-black"
          },
          dark: {
            bgColor: "bg-black",
            textColor: "text-white"
          },
        },
      }}>
      {children}
    </ThemeContext.Provider>
  );
}
