import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/", "/upcoming", "/popular", "/top-rated"];

const middleware = (req: NextRequest) => {
  const pathname = req.nextUrl.pathname;
  let isAuth = req.cookies.has("cinema-auth");
  if (
    !isAuth &&
    (protectedRoutes.includes(pathname) || pathname.match(/\/movie\/\d+/))
  ) {
    const loginUrl = new URL("/login", req.nextUrl.origin);
    return NextResponse.redirect(loginUrl.toString());
  }
  if (isAuth && pathname === "/login") {
    const homeUrl = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(homeUrl.toString());
  }
};

export default middleware;
