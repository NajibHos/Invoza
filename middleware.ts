import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
	const sessionCookie = getSessionCookie(request);

	if (!sessionCookie) {
		return NextResponse.redirect(new URL("/sign-in", request.url));
	}

	return NextResponse.next();
}

export const config = {
  // runtime: 'nodejs',
	matcher: [
    "/dashboard",
    "/projects/:path*",
    "/invoices/:path*",
    "/transactions/:path*",
  ]
};