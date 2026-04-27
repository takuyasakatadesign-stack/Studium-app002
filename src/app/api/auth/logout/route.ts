import { NextResponse } from "next/server";

import { authCookieName } from "@/lib/auth-constants";

export async function POST() {
  const response = NextResponse.json({ redirectTo: "/login" });
  response.cookies.set(authCookieName, "", {
    maxAge: 0,
    path: "/",
    sameSite: "lax",
  });

  return response;
}
