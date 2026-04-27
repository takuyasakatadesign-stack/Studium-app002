import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  authCookieName,
  isManagementRole,
  type ManagementRole,
} from "@/lib/auth-constants";

export async function getCurrentRole(): Promise<ManagementRole | null> {
  const role = (await cookies()).get(authCookieName)?.value;

  return isManagementRole(role) ? role : null;
}

export async function requireRole(
  allowedRoles: ManagementRole[],
): Promise<ManagementRole> {
  const role = await getCurrentRole();

  if (!role) {
    redirect("/login");
  }

  if (!allowedRoles.includes(role)) {
    redirect("/login?reason=forbidden");
  }

  return role;
}
