import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import Authentication from "./lib/auth";

export async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;

  const res = await Authentication();

  const data = JSON.stringify(res.data);

  const newHeaders = new Headers(req.headers);

  newHeaders.set("data", data);

  if (pathname === "/" || pathname.startsWith("/profile") || pathname.startsWith('/movies')
  || pathname.startsWith('/bookshow')) {
    if (!res.success) {
      return NextResponse.redirect(new URL("/login", origin));
    }
    return NextResponse.next({
      request: {
        headers: newHeaders,
      },
    });
  } else if (pathname === "/admin") {
    if (res.success && res.data?.isAdmin) {
      return NextResponse.next({
        request: {
          headers: newHeaders,
        },
      });
    } else if (res.success) {
      return NextResponse.redirect(new URL("/", origin));
    } else {
      return NextResponse.redirect(new URL("/login", origin));
    }
  } else if (pathname === "/register" || pathname === "/login") {
    if (res.success) {
      return NextResponse.redirect(new URL("/", origin));
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/register",
    "/profile",
    "/admin",
    "/movies",
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
