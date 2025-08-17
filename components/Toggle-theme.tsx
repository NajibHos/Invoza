'use client';

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ToggleTheme() {

  const { theme, setTheme } = useTheme();

  return (
    <div className="h-auto w-auto">
      {
        theme === 'light' && <button
          onClick={() => setTheme('dark')}
          className="bg-transparent cursor-pointer flex
          justify-center items-center"
        >
          <Moon size={22} className="text-stone-900" />
        </button>
      }
      {
        theme === 'dark' && <button
          onClick={() => setTheme('light')}
          className="bg-transparent cursor-pointer flex
          justify-center items-center"
        >
          <Sun size={22} className="text-white" />
        </button>
      }
    </div>
  )
}