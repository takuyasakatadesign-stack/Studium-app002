"use client";

import Link from "next/link";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

import { roleLabels, type ManagementRole } from "@/lib/auth-constants";
import { Button } from "@/components/ui/button";

export function AuthControls({
  initialRole,
}: {
  initialRole: ManagementRole | null;
}) {
  const router = useRouter();
  const role = initialRole;

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };

  if (!role) {
    return (
      <Button asChild size="sm" variant="outline">
        <Link href="/login">ログイン</Link>
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="hidden text-sm text-muted-foreground sm:inline">
        {roleLabels[role]}
      </span>
      <Button onClick={logout} size="sm" type="button" variant="outline">
        <LogOut className="size-4" />
        ログアウト
      </Button>
    </div>
  );
}
