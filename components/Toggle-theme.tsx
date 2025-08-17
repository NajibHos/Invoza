'use client';

import { useTheme } from "@/lib/theme/theme-provider";
import { Moon, Sun } from "lucide-react";

export default function ToggleTheme() {

  const {theme, toggleTheme} = useTheme();

  return (
    <div className="h-auto w-auto">
      <button
        onClick={toggleTheme}
        className="bg-transparent cursor-pointer flex justify-center items-center"
      >
        {/* dark state */}
        {
          theme === 'dark' && <div className="h-auto w-auto">
            <Sun size={22} className="text-white" />
          </div>
        }
        {/* light state */}
        {
          theme === 'light' && <div className="h-auto w-auto">
            <Moon size={22} className="text-stone-900" />
          </div>
        }
        </button>
    </div>
  )
}