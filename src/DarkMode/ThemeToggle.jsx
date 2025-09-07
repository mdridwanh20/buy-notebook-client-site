import React, { useContext } from "react";

import { IoMdSunny } from "react-icons/io";
import { IoMdMoon } from "react-icons/io";
import { ThemeContext } from "../AuthProver/ThemeProvider";




export default function ThemeToggle() {
  const { theme, toggle } = useContext(ThemeContext);

  const isDark = theme === "dark";

  return (
    <div>
     <button
      onClick={toggle}
      aria-label={isDark ? "switch to light mode" : "switch to dark mode"}
      className="p-2 flex items-center justify-center rounded-full  border-gray-300 dark:border-gray-600 transition-colors bg-gray-200 dark:hover:bg-gray-700"
    >
      {isDark ? (
        <IoMdSunny className=" text-lg text-yellow-400" />
      ) : (
        <IoMdMoon className=" text-lg text-gray-800" />
      )}
    </button>
   

    </div>
  );
}
