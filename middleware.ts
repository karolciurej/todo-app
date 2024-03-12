import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const currentUser = request.cookies.get("next-auth.session-token");

  const publicPaths = ["/", "/login", "/register", "/dashboard"];

  if (!currentUser && pathname != "/login" && pathname != "/register")
    return NextResponse.redirect(new URL("/login", request.url));

  if (pathname == "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL("/dashboard", request.url));
}
export const config = {
  matcher: ["/", "/login", "/register", "/dashboard/:path*"],
};
