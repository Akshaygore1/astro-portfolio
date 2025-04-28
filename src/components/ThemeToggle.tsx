import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-1 rounded-md text-xl transition-colors"
      aria-label="Toggle theme"
    >
      {isDarkMode ? <Sun /> : <Moon />}
    </button>
  );
}
