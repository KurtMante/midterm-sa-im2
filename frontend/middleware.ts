import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { auth } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  let decoded: any = null;
  const session = await auth();

  const privateRoutes = [
    "/homepage",
    "/onboard",
    "/change_password",
    "/profile_management",
  ];
  const publicRoutes = ["/", "/register"];

  if (token) {
    try {
      // Verify & decode JWT
      decoded = jwt.verify(token, "secret-key");

      console.log(`inside middleware`, decoded);

      if (
        decoded.user.onboarding === 1 &&
        request.nextUrl.pathname !== "/onboard"
      ) {
        return NextResponse.redirect(new URL("/onboard", request.url));
      } else if (
        (decoded.user.onboarding === 0 &&
          request.nextUrl.pathname === "/onboard") ||
        publicRoutes.includes(request.nextUrl.pathname)
      ) {
        return NextResponse.redirect(new URL("/homepage", request.url));
      }
      return NextResponse.next();
    } catch (error: any) {
      console.error("JWT verification failed:", error.message);
    }
  }

  if (session?.user && publicRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/homepage", request.url));
  } else if (
    !session?.user &&
    privateRoutes.includes(request.nextUrl.pathname)
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  runtime: "nodejs",
  matcher: [
    "/",
    "/homepage",
    "/register",
    "/onboard",
    "/profile_management",
    "/change_password",
  ],
};
