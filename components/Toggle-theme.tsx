'use client';

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function ToggleTheme() {

  const [muted, setMuted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMuted(true);
  }, [])

  if (muted) {
    return null; // prevent hydration mismatch
  }

  return (
    <div className="h-auto w-auto">
      {
        resolvedTheme === 'light' && <button
          onClick={() => setTheme('dark')}
          className="bg-transparent cursor-pointer flex
          justify-center items-center"
        >
          <Moon size={22} className="text-stone-900" />
        </button>
      }
      {
        resolvedTheme === 'dark' && <button
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