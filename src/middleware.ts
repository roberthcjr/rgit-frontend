import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const protectedRoutes = ["/tools", "/users", "/lends"];
  const currentPath = req.nextUrl.pathname;
  const isProtected = protectedRoutes.includes(currentPath);
  const cookieStore = await cookies();
  const token = cookieStore.get("session");

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (currentPath === "/login" && token) {
    return NextResponse.redirect(new URL("/tools", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
