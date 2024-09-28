import { NextResponse } from "next/server";

export async function middleware(request) {
  const authToken = request.cookies.get("AuthToken");

  if (authToken) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/admin", request.url));
}

export const config = {
  matcher: ["/"],
};
