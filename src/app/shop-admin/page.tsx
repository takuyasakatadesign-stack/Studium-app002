import { notFound } from "next/navigation";

import { ShopAdminPanel } from "@/components/shop-admin/shop-admin-panel";
import { PageHeader } from "@/components/shared/page-header";
import { requireRole } from "@/lib/auth";
import { shops, users } from "@/lib/mock-data";

const mockLoggedInShopStaffId = "user-002";

export default async function ShopAdminPage() {
  const role = await requireRole(["admin", "shop_staff"]);
  const currentUser = users.find((user) => user.id === mockLoggedInShopStaffId);
  const shopId = currentUser?.shopId;
  const shop = shops.find((item) => item.id === shopId);

  if (!currentUser || !shopId || !shop) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <PageHeader
        badge="画面C"
        title="売店スタッフ管理画面"
        description="ログイン中の売店スタッフに紐づく自店舗情報だけを更新できます。"
      />

      <ShopAdminPanel
        currentUser={currentUser}
        initialShop={shop}
        role={role}
      />
    </div>
  );
}
