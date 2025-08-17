'use server';

import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function SignUp(name: string, email: string, password: string) {
  try {
    // sign up function
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      }
    })
  } catch (error) {
    return {error, res: 'Failed'}
  }
}

export async function SignIn(email: string, password: string) {
  try {
    // sign in function
    await auth.api.signInEmail({
      body: {
        email,
        password,
        rememberMe: true,
      },
      headers: await headers(),
    })
  } catch (error) {
    return {error, res: 'Failed'}
  }
}

export async function SignOut() {
  await auth.api.signOut({
    headers: await headers(),
  })

  redirect('/sign-in');
}

// getting current session on RSC
export async function GetSession() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  return session;
}