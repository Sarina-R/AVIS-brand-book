"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme: string;
}

export function ThemeProvider({ children, defaultTheme }: ThemeProviderProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/typography")) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("route-theme", "dark");
    } else {
      const savedTheme = localStorage.getItem("user-theme") || defaultTheme;
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
      localStorage.setItem("route-theme", savedTheme);
    }
  }, [pathname, defaultTheme]);

  return (
    <NextThemesProvider
      attribute="class"
      disableTransitionOnChange
      defaultTheme={defaultTheme}
      enableSystem
    >
      {children}
    </NextThemesProvider>
  );
}
