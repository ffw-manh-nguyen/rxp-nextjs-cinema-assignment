import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/", "/upcoming", "/popular", "/top-rated"];

const middleware = (req: NextRequest) => {
  const { pathname, origin } = req.nextUrl;
  const searchParams = req.nextUrl.searchParams;
  const isAuth = req.cookies.has("cinema-auth");

  if (pathname === "/search") {
    const query =
      searchParams.get("query") !== "" ? searchParams.get("query") : "";
    const page = searchParams.get("page") ? searchParams.get("page") : 1;
    const url = new URL(pathname, origin);
    if (!searchParams.get("page")) {
      url.searchParams.set("query", `${query}`);
      url.searchParams.set("page", `${page}`);
      return NextResponse.redirect(url);
    }
  }
  if (
    !isAuth &&
    (protectedRoutes.includes(pathname) || pathname.match(/\/movie\/\d+/))
  ) {
    const loginUrl = new URL("/login", origin);
    return NextResponse.redirect(loginUrl.toString());
  }
  if (isAuth && pathname === "/login") {
    const homeUrl = new URL("/", origin);
    return NextResponse.redirect(homeUrl.toString());
  }
};

export default middleware;
