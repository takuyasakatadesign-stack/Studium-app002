import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { PageHeader } from "@/components/shared/page-header";
import { requireRole } from "@/lib/auth";

export default async function AdminPage() {
  await requireRole(["admin", "club_staff"]);

  return (
    <div className="space-y-8">
      <PageHeader
        badge="画面B"
        title="クラブ管理画面"
        description="各担当領域の情報を入力・編集し、公開画面Aと社内画面Dへ反映する前提の管理画面です。"
      />

      <AdminDashboard />
    </div>
  );
}
