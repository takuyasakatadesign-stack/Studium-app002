import { NextResponse } from "next/server";

import {
  authCookieName,
  isManagementRole,
  roleHomePath,
} from "@/lib/auth-constants";

export async function POST(request: Request) {
  const body = (await request.json()) as { role?: string };

  if (!isManagementRole(body.role)) {
    return NextResponse.json({ message: "Invalid role" }, { status: 400 });
  }

  const response = NextResponse.json({ redirectTo: roleHomePath[body.role] });
  response.cookies.set(authCookieName, body.role, {
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
    sameSite: "lax",
  });

  return response;
}
