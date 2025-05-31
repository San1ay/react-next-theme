"use client";

import React from "react";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { setToLS, getFromLS } from "./utils";
import type { ThemeContextType } from "./types";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children, colorScheme = false }: { children: ReactNode; colorScheme: boolean }) => {
  const [theme, setThemeState] = useState<string | null>(null);
  const [color, setColorState] = useState<string | null>(null);

  // Initialize theme on mount
  useEffect(() => {
    const savedTheme = getFromLS("theme");
    if (savedTheme) {
      setThemeState(savedTheme);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setThemeState(prefersDark ? "dark" : "light");
    }

    if (colorScheme) {
      const savedColor = getFromLS("color");
      if (savedColor) {
        setColorState(savedColor);
      } else {
        setColorState("red");
      }
    }
  }, []);

  // Side effects when theme changes
  useEffect(() => {
    if (theme === null) return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    setToLS("theme", theme);
  }, [theme]);

  // Side effects when color changes
  useEffect(() => {
    if (!colorScheme || color === null) return;
    document.documentElement.setAttribute("data-color", color);
    setToLS("color", color);
  }, [color, colorScheme]);

  // Expose setters that just update state, side effects handled by effects
  const setTheme = (newTheme: string) => setThemeState(newTheme);
  const setColor = colorScheme ? (newColor: string) => setColorState(newColor) : undefined;

  if (theme === null || (colorScheme && color === null)) {
    return null;
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        ...(colorScheme ? { color, setColor } : {}),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};
