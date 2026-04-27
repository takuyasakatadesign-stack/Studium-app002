import type { UserRole } from "@/types";

export const authCookieName = "stadium_role";

export const managementRoles = ["admin", "club_staff", "shop_staff"] as const;

export type ManagementRole = Extract<UserRole, (typeof managementRoles)[number]>;

export const roleLabels: Record<ManagementRole, string> = {
  admin: "管理者",
  club_staff: "クラブ社員",
  shop_staff: "売店スタッフ",
};

export const roleHomePath: Record<ManagementRole, string> = {
  admin: "/admin",
  club_staff: "/admin",
  shop_staff: "/shop-admin",
};

export const protectedRouteRoles = {
  "/admin": ["admin", "club_staff"],
  "/shop-admin": ["admin", "shop_staff"],
  "/internal": ["admin", "club_staff"],
} satisfies Record<string, ManagementRole[]>;

export function isManagementRole(value: string | undefined): value is ManagementRole {
  return managementRoles.includes(value as ManagementRole);
}
