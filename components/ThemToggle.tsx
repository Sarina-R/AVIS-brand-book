"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    if (!pathname.startsWith("/typography")) {
      const userTheme = localStorage.getItem("user-theme") || "light";
      setTheme(userTheme);
    }
  }, [pathname, setTheme]);

  const toggleTheme = () => {
    if (pathname.startsWith("/typography")) return;

    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("user-theme", newTheme);
  };

  if (!mounted) return null;

  return (
    <button
      className="p-2 rounded-md border dark:border-gray-700 border-gray-300 transition"
      onClick={toggleTheme}
      disabled={pathname.startsWith("/typography")}
    >
      {theme === "light" ? (
        <Moon className="w-5 h-5 text-gray-800" />
      ) : (
        <Sun className="w-5 h-5 text-yellow-500" />
      )}
    </button>
  );
}
