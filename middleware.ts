import { getSessionCookie } from "better-auth/cookies";
import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);

  if (!sessionCookie) {
    const authUrl = new URL("/auth", request.url);
    authUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(authUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/c/:path*"],
};
