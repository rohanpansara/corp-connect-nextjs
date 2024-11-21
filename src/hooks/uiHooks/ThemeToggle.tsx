"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { BiMoon, BiSun } from "react-icons/bi";

export default function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    const isDark =
      theme === "dark" ||
      (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setIsDarkMode(isDark);
  }, []);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", !isDarkMode);
  };

  return (
    <Button
      variant="plain"
      size="plain"
      onClick={toggleTheme}
      className="p-2 rounded"
    >
      {isDarkMode ? <BiSun /> : <BiMoon />}
    </Button>
  );
}
