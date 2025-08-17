'use client';

import { SignOut } from "@/actions/auth-action";
import { LogOut } from "lucide-react";

export default function SignOutButton() {

  return (
    <div className="h-auto w-auto">
      <div className="h-auto w-auto block lg:hidden">
        <button
          type="button"
          onClick={SignOut}
          className="flex justify-center items-center
          bg-transparent cursor-pointer text-stone-900
          hover:text-active dark:text-white
          dark:hover:text-active transition-colors"
        >
          <LogOut size={22} />
        </button>
      </div>
      <div className="h-auto w-auto hidden lg:block">
        <button
          type="button"
          onClick={SignOut}
          className="p-0 w-auto text-base font-heading font-medium
          cursor-pointer transition-colors
          bg-transparent text-stone-900 hover:text-active
          dark:text-white dark:hover:text-active"
        >
          Sign Out
        </button>
      </div>
    </div>
  )
}