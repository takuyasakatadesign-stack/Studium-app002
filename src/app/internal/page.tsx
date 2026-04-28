import { InternalDashboard } from "@/components/internal/internal-dashboard";
import { requireRole } from "@/lib/auth";

export default async function InternalPage() {
  await requireRole(["admin", "club_staff"]);

  return <InternalDashboard />;
}
