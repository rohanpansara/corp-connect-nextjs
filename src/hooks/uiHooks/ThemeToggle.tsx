"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { PiMoonLight, PiSunLight } from "react-icons/pi";

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
      size="nothing"
      onClick={toggleTheme}
      className="flex justify-center items-center rounded"
    >
      {isDarkMode ? <PiSunLight /> : <PiMoonLight />}
    </Button>
  );
}
