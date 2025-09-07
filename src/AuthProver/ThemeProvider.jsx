import React, { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext({
  theme: "light",
  toggle: () => {},
});



function getInitialTheme() {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("theme");

    if (stored === "light" || stored === "dark") return stored;

    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return "dark";
    }
  }

  return "light";
}





export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;

    root.classList.toggle("dark", theme === "dark");

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  

  

  
  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children} {/* ✅ children render করা হচ্ছে */}
    </ThemeContext.Provider>
  );
}
