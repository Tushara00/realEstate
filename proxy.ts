import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
const session = req.cookies.get("session")?.value;
const {pathname} = req.nextUrl;

const isAuthPage =pathname ==="/login" || pathname ==="/signup"
  const isProtectedRoute = pathname.startsWith("/admin") || pathname.startsWith("/dashboard");

  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isAuthPage && session) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
  return NextResponse.next();
  
}

export const config = {
  matcher: ["/admin/:path*"],
};