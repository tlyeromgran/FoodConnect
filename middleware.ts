import { NextRequest, NextResponse } from "next/server";

import { SESSION_COOKIE } from "@/lib/session";

// Routes reachable without signing in.
const publicRoutes = ["/sign-in", "/sign-up", "/api/webhook/clerk"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  if (!req.cookies.get(SESSION_COOKIE)) {
    // API calls get a 401 instead of a redirect to an HTML page.
    if (pathname.startsWith("/api")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
