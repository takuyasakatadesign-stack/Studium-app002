import Link from "next/link";
import { Building2, ClipboardList, Store, Trophy, UserRound } from "lucide-react";

import { AuthControls } from "@/components/auth/auth-controls";
import { Button } from "@/components/ui/button";
import type { ManagementRole } from "@/lib/auth-constants";

const navItems = [
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
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link href="/" className="min-w-0">
            <p className="truncate text-sm text-muted-foreground">
              Stadium Operations
            </p>
            <p className="truncate font-semibold">スタジアム運営最適化</p>
          </Link>
          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <Button asChild key={item.href} size="sm" variant="ghost">
                <Link href={item.href}>
                  <item.icon className="size-4" />
                  {item.label}
                </Link>
              </Button>
            ))}
          </nav>
          <AuthControls initialRole={currentRole} />
        </div>
        <nav className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 pb-3 lg:hidden">
          {navItems.map((item) => (
            <Button asChild key={item.href} size="sm" variant="ghost">
              <Link href={item.href}>
                <item.icon className="size-4" />
                {item.label}
              </Link>
            </Button>
          ))}
        </nav>
      </header>
      <main className="mx-auto w-full max-w-6xl px-4 py-8">{children}</main>
    </div>
  );
}
