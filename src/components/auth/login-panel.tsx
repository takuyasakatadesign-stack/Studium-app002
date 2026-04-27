"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { LogIn, ShieldCheck, Store, Users } from "lucide-react";

import { roleLabels, type ManagementRole } from "@/lib/auth-constants";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const loginRoles: {
  role: ManagementRole;
  description: string;
  icon: typeof ShieldCheck;
}[] = [
  {
    role: "admin",
    description: "/admin /shop-admin /internal すべてにアクセスできます。",
    icon: ShieldCheck,
  },
  {
    role: "club_staff",
    description: "/admin と /internal にアクセスできます。",
    icon: Users,
  },
  {
    role: "shop_staff",
    description: "/shop-admin の自店舗更新画面にアクセスできます。",
    icon: Store,
  },
];

export function LoginPanel() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reason = searchParams.get("reason");

  const login = async (role: ManagementRole) => {
    const response = await fetch("/api/auth/login", {
      body: JSON.stringify({ role }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });
    const data = (await response.json()) as { redirectTo?: string };

    router.push(data.redirectTo ?? "/login");
    router.refresh();
  };

  return (
    <div className="space-y-6">
      {reason === "forbidden" ? (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          このロールではアクセスできない画面です。別のロールでログインしてください。
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-3">
        {loginRoles.map((item) => (
          <Card className="rounded-lg shadow-sm" key={item.role}>
            <CardHeader>
              <div className="flex items-center justify-between gap-3">
                <item.icon className="size-5 text-sky-700" />
                <Badge variant="secondary">簡易認証</Badge>
              </div>
              <CardTitle>{roleLabels[item.role]}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="min-h-12 text-sm text-muted-foreground">
                {item.description}
              </p>
              <Button className="w-full" onClick={() => login(item.role)}>
                <LogIn className="size-4" />
                このロールでログイン
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
