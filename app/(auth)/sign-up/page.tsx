'use client';

import { useEffect } from "react";
import { authClient } from "@/lib/auth/auth-client";
import { SignUp } from "@/actions/auth-action";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/Submit-button";
import { toast } from "sonner";

export default function SignUpPage() {

  // check authentication status first
  const { data: session} = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/dashboard');
    }
  }, [router, session])

  // form action
  async function formAction(formData: FormData) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const res = await SignUp(name, email, password);

    if (res && res.res === 'Failed') {
      console.error(res.error);
      toast.error('Error signing up user');
    } else {
      router.push('/dashboard');
      toast.success('User has been created');
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
              Sign Up
            </h2>
          </div>
          <div className="h-auto w-full text-center">
            <h2 className="text-base font-text font-medium
              text-stone-700 dark:text-stone-300"
            >
              Enter details below to proceed further
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
                  Name
                </h2>
              </div>
              <div className="h-auto w-full">
                <Input
                  name="name"
                  type="text"
                  required
                  placeholder="type here"
                  className="py-5 font-text font-medium"
                />
              </div>
            </div>
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
            </div>
            <div className="h-auto w-full text-left">
              <h2 className="text-base font-text font-medium
                text-stone-700 dark:text-stone-300"
              >
                Already have an account?
                <Link
                  href={'/sign-in'}
                  className="underline ml-1 text-active"
                >
                  Sign in instead
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