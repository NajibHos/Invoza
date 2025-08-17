import { GetSession } from "@/actions/auth-action";
import ToggleTheme from "./Toggle-theme";
import Link from "next/link";
import SignOutButton from "./Sign-out-button";
import { Home, LogIn } from "lucide-react";

export default async function Header() {

  // get current session
  const session = await GetSession();

  return (
    <div className="h-auto w-full py-5 flex justify-center items-center">
      <div className="h-auto w-[90%] flex justify-between items-center">
        <div className="h-auto w-auto">
          <Link href={'/'}>
          <h2 className="text-3xl font-heading font-semibold
            cursor-pointer  text-stone-900 dark:text-white"
          >
            Invoza
          </h2>
          </Link>
        </div>
        <div className="h-auto w-auto flex justify-center items-center
          gap-8"
        >
          {/* Theme toggle component */}
          <ToggleTheme />
          {/* Dashboard navigation */}
          {
            // visable only when user is siggned in
            session && (
              <>
              <div className="h-auto w-auto hidden lg:block">
                <Link href={'/dashboard'}>
                <button
                  className="p-0 w-auto text-base font-heading font-medium
                  cursor-pointer transition-colors bg-transparent
                  text-stone-900 hover:text-active dark:text-white
                  dark:hover:text-active"
                >
                  Dashboard
                </button>
                </Link>
              </div>
              <div className="h-auto w-auto block lg:hidden">
                <Link href={'/dashboard'}>
                <button className="p-0 w-auto bg-transparent cursor-pointer
                  flex justify-center items-center"
                >
                  <Home
                    size={22}
                    className="transition-colors text-stone-900 hover:text-active
                    dark:text-white dark:hover:text-active"
                  />
                </button>
                </Link>
              </div>
              </>
            )
          }
          {/* Sign in navigation */}
          {
            // visable only when user is not signed in
            !session && (
              <>
              <div className="h-auto w-auto hidden lg:block">
                <Link href={'/sign-in'}>
                <button
                  className="p-0 w-auto text-base font-heading font-medium
                  cursor-pointer transition-colors bg-transparent
                  text-stone-900 hover:text-active dark:text-white
                  dark:hover:text-active"
                >
                  Sign in
                </button>
                </Link>
              </div>
              <div className="h-auto w-auto block lg:hidden">
                <Link href={'/sign-in'}>
                <button className="p-0 w-auto bg-transparent cursor-pointer
                  flex justify-center items-center"
                >
                  <LogIn
                    size={22}
                    className="text-stone-900 hover:text-active
                    dark:text-white dark:hover:text-active
                    transition-colors"
                  />
                </button>
                </Link>
              </div>
              </>
            )
          }
          {/* Sign out component */}
          {
            session && <SignOutButton />
          }
        </div>
      </div>
    </div>
  )
}