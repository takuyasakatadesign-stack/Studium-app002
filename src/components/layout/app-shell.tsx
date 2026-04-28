import Link from "next/link";
import { Building2, ClipboardList, Store, Trophy, UserRound } from "lucide-react";

import { AuthControls } from "@/components/auth/auth-controls";
import { Button } from "@/components/ui/button";
import type { ManagementRole } from "@/lib/auth-constants";

const publicNavItems = [
  { href: "/gourmet", label: "グルメ", icon: Store },
];

const managementNavItems = [
  { href: "/", label: "公開画面", icon: Trophy },
  { href: "/gourmet", label: "グルメ", icon: Store },
  { href: "/admin", label: "クラブ管理", icon: ClipboardList },
  { href: "/shop-admin", label: "売店管理", icon: Building2 },
  { href: "/internal", label: "社内閲覧", icon: UserRound },
];

export function AppShell({
  children,
  currentRole,
}: {
  children: React.ReactNode;
  currentRole: ManagementRole | null;
}) {
  const navItems = currentRole ? managementNavItems : publicNavItems;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link href="/" className="min-w-0">
            <p className="truncate text-sm text-muted-foreground">
              ブルーシティFC
            </p>
            <p className="truncate font-semibold">ホームゲーム情報</p>
          </Link>
          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              currentRole ? (
                <Button asChild key={item.href} size="sm" variant="ghost">
                  <Link href={item.href}>
                    <item.icon className="size-4" />
                    {item.label}
                  </Link>
                </Button>
              ) : (
                <PublicNavLink item={item} key={item.href} />
              )
            ))}
          </nav>
          {currentRole ? <AuthControls initialRole={currentRole} /> : null}
        </div>
        <nav className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 pb-3 lg:hidden">
          {navItems.map((item) => (
            currentRole ? (
              <Button asChild key={item.href} size="sm" variant="ghost">
                <Link href={item.href}>
                  <item.icon className="size-4" />
                  {item.label}
                </Link>
              </Button>
            ) : (
              <PublicNavLink item={item} key={item.href} />
            )
          ))}
        </nav>
      </header>
      <main className="mx-auto w-full max-w-6xl px-4 py-8">{children}</main>
    </div>
  );
}

function PublicNavLink({
  item,
}: {
  item: (typeof publicNavItems)[number];
}) {
  return (
    <Link
      className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full bg-slate-950 px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-slate-800"
      href={item.href}
    >
      <span className="flex size-6 items-center justify-center rounded-full bg-amber-300 text-slate-950">
        <item.icon className="size-3.5" />
      </span>
      {item.label}
    </Link>
  );
}
