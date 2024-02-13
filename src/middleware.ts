import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const publicPath = path === "/login" || path === "/register";
  const token = request.cookies.get("token")?.value || "";

  if (publicPath && token)
    return NextResponse.redirect(new URL("/", request.url));

  if (!publicPath && !token)
    return NextResponse.redirect(new URL("/login", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/login", "/register"],
};
