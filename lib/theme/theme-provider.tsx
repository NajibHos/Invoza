'use client';

import { useEffect, useState, createContext, useContext } from "react";

interface Children {
  children: React.ReactNode;
}

interface ContextType {
  theme: string;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ContextType | null>(null);

export default function ThemeProvider({ children }: Children) {
  // get current theme or set light theme by default
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  // apply current theme
  useEffect(() => {
    const root = document.documentElement;

    if (theme === 'dark') {
      root.classList.add("dark");
      document.body.style.backgroundColor = '#08080a';
    } else {
      root.classList.remove("dark");
      document.body.style.backgroundColor = '#f7f7f7';
    }

    localStorage.setItem('theme', theme);

  }, [theme])

  // toggle theme
  function toggleTheme () {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      { children }
    </ThemeContext.Provider>
  )
}

// custom hook to consume theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}
