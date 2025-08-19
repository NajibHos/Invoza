'use client';

import { useEffect } from "react";
import { authClient } from "@/lib/auth/auth-client";
import { SignIn } from "@/actions/auth-action";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/Submit-button";
import { toast } from "sonner";

export default function SignInPage() {

  // check authentication status first
  const { data: session } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/dashboard');
    }
  }, [session])

  // form action
  async function formAction(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const res = await SignIn(email, password);

    if (res?.res && res?.res === 'Failed') {
      console.error(res.error);
      toast.error('Invalid credentials');
    } else {
      router.push('/dashboard');
      toast.success('Sign in successful');
    }
  }

  return (
    <div className="h-auto w-full py-12 flex justify-center items-center">
      <div className="h-auto w-[90%] flex flex-col justify-center items-center
        gap-16 lg:gap-12"
      >
        <div className="h-auto w-full flex flex-col justify-center items-center
          gap-5"
        >
          <div className="h-auto w-full text-center">
            <h2 className="text-2xl font-heading font-medium
              text-stone-900 dark:text-white"
            >
              Sign In
            </h2>
          </div>
          <div className="h-auto w-full text-center">
            <h2 className="text-base font-text font-medium
              text-stone-700 dark:text-stone-300"
            >
              Enter currect credentials to proceed further
            </h2>
          </div>
        </div>
        <div className="h-auto w-full md:w-[60%] lg:w-[50%] flex justify-center
          items-center"
        >
          <form
            action={formAction}
            className="h-auto w-full flex flex-col justify-center items-center
            gap-8"
          >
            <div className="h-auto w-full flex flex-col justify-center
              items-center gap-2"
            >
              <div className="h-auto w-full text-left">
                <h2 className="text-base font-text font-medium
                  text-stone-700 dark:text-stone-300"
                >
                  Email
                </h2>
              </div>
              <div className="h-auto w-full">
                <Input
                  name="email"
                  type="email"
                  required
                  placeholder="example@gmail.com"
                  className="py-5 font-text font-medium"
                />
              </div>
              <div className="h-auto w-full text-left">
                <h2 className="text-base font-text font-medium
                  text-stone-700 dark:text-stone-300"
                >
                  Email:
                  <span className="text-lg ml-1 text-active">
                    njbhossn@gmail.com
                  </span>
                </h2>
              </div>
            </div>
            <div className="h-auto w-full flex flex-col justify-center
              items-center gap-2"
            >
              <div className="h-auto w-full text-left">
                <h2 className="text-base font-text font-medium
                  text-stone-700 dark:text-stone-300"
                >
                  Password
                </h2>
              </div>
              <div className="h-auto w-full">
                <Input
                  name="password"
                  type="password"
                  required
                  placeholder="password"
                  className="py-5 font-text font-medium"
                />
              </div>
              <div className="h-auto w-full text-left">
                <h2 className="text-base font-text font-medium
                  text-stone-700 dark:text-stone-300"
                >
                  Password:
                  <span className="text-lg ml-1 text-active">
                    Pass1234
                  </span>
                </h2>
              </div>
            </div>
            <div className="h-auto w-full text-left">
              <h2 className="text-base font-text font-medium
                text-stone-700 dark:text-stone-300"
              >
                Don't have an account?
                <Link
                  href={'/sign-up'}
                  className="underline text-active ml-2"
                >
                  Sign up now
                </Link>
              </h2>
            </div>
            <SubmitButton />
          </form>
        </div>
      </div>
    </div>
  )
}