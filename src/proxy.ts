import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Route protection proxy.
 * Uses the session cookie to determine auth state.
 * Heavy auth validation happens in the API routes/server components via auth().
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = ["/login", "/register"];
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Allow API auth routes and static assets
  if (pathname.startsWith("/api/auth") || pathname.startsWith("/api/register")) {
    return NextResponse.next();
  }

  // Check for session token (next-auth JWT cookie)
  const sessionToken =
    request.cookies.get("authjs.session-token") ??
    request.cookies.get("__Secure-authjs.session-token");

  const isAuthenticated = !!sessionToken;

  // Redirect authenticated users away from auth pages
  if (isPublicRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Redirect unauthenticated users to login
  if (!isPublicRoute && !isAuthenticated && !pathname.startsWith("/api")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Protect API routes (except auth and register)
  if (pathname.startsWith("/api") && !isAuthenticated) {
    return Response.json(
      { error: { code: "UNAUTHORIZED", message: "Authentication required" } },
      { status: 401 }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
