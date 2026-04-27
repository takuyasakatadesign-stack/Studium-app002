import { Suspense } from "react";

import { LoginPanel } from "@/components/auth/login-panel";
import { PageHeader } from "@/components/shared/page-header";

export default function LoginPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        badge="簡易ログイン"
        title="ロール選択"
        description="本番認証の代わりに、cookieへロールを保存するプロトタイプ用ログインです。"
      />

      <Suspense>
        <LoginPanel />
      </Suspense>
    </div>
  );
}
