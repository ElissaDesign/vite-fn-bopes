/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";

export const useDarkSide = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    const storedPrefs = window.localStorage.getItem("color-theme");
    if (typeof storedPrefs === "string") {
      return storedPrefs;
    }

    const userMedia = window.matchMedia("(prefers-color-scheme: dark)");
    if (userMedia.matches) {
      return "dark";
    }
  }
};

export const themeContext = () => {
  const defaultTheme = useDarkSide();
  const [theme, setTheme] = useState(defaultTheme);
  const colorTheme = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme);

    // save theme to local storage
    localStorage.setItem("color-theme", theme);
  }, [theme, colorTheme]);

  return [colorTheme, setTheme];
};
