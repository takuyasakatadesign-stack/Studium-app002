import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Menu, Ticket } from "lucide-react";

import { Button } from "@/components/ui/button";

type LpHeaderNavItem = {
  href: string;
  label: string;
};

type LpHeaderProps = {
  navItems: LpHeaderNavItem[];
  teamName: string;
  ticketHref: string;
};

export function LpHeader({ navItems, teamName, ticketHref }: LpHeaderProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-cyan-200/10 bg-slate-950/70 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20 lg:px-8">
        <Link className="flex min-w-0 items-center gap-3" href="/">
          <span className="grid size-10 place-items-center border border-cyan-200/30 bg-blue-600 text-sm font-black text-white">
            BW
          </span>
          <span className="min-w-0">
            <span className="block truncate text-xs font-semibold text-cyan-100">
              BLUE WINGS
            </span>
            <span className="block truncate text-sm font-black text-white">
              {teamName}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <a
              className="text-sm font-black uppercase tracking-normal text-white/80 hover:text-cyan-200"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            asChild
            className="hidden bg-blue-600 text-white hover:bg-blue-500 sm:inline-flex"
          >
            <a href={ticketHref}>
              <Ticket className="size-4" />
              TICKET
            </a>
          </Button>
          <button
            aria-label="メニューを開く"
            className="grid size-11 place-items-center bg-blue-600 text-white lg:hidden"
            type="button"
          >
            <Menu className="size-5" />
          </button>
        </div>
      </div>
    </header>
  );
}

type LpHeroInfo = {
  label: string;
  value: string;
};

type LpHeroProps = {
  backgroundImage: string;
  children?: React.ReactNode;
  eyebrow: string;
  infoItems: LpHeroInfo[];
  primaryCtaHref: string;
  primaryCtaLabel: string;
  subtitle: string;
  title: string;
};

export function LpHero({
  backgroundImage,
  children,
  eyebrow,
  infoItems,
  primaryCtaHref,
  primaryCtaLabel,
  subtitle,
  title,
}: LpHeroProps) {
  return (
    <section
      className="relative min-h-screen overflow-hidden px-4 pb-10 pt-24 text-white sm:px-6 lg:px-8"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(0,4,13,0.86), rgba(0,4,13,0.34)), url('${backgroundImage}')`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="mx-auto grid min-h-[calc(100vh-6rem)] max-w-7xl items-end gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,440px)]">
        <div className="space-y-6">
          <p className="text-sm font-black uppercase tracking-normal text-cyan-100">
            {eyebrow}
          </p>
          <h1 className="max-w-4xl text-6xl font-black uppercase leading-none tracking-normal sm:text-7xl lg:text-[10rem]">
            {title}
          </h1>
          <p className="max-w-3xl text-2xl font-black leading-snug sm:text-3xl lg:text-4xl">
            {subtitle}
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            {infoItems.map((item) => (
              <div
                className="border border-cyan-200/20 bg-white/10 p-4"
                key={item.label}
              >
                <p className="text-xs font-semibold text-cyan-100">{item.label}</p>
                <p className="mt-1 font-black text-white">{item.value}</p>
              </div>
            ))}
          </div>
          <Button
            asChild
            className="h-14 bg-blue-600 px-6 text-white hover:bg-blue-500"
          >
            <a href={primaryCtaHref}>
              {primaryCtaLabel}
              <ArrowRight className="size-4" />
            </a>
          </Button>
        </div>
        {children ? <div>{children}</div> : null}
      </div>
    </section>
  );
}

type QuickNavItem = {
  description: string;
  href: string;
  icon: LucideIcon;
  label: string;
  title: string;
};

type QuickNavProps = {
  items: QuickNavItem[];
};

export function QuickNav({ items }: QuickNavProps) {
  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <a
          className="group relative min-h-44 overflow-hidden border border-cyan-200/20 bg-slate-950/80 p-5 text-white"
          href={item.href}
          key={item.href}
        >
          <div className="relative z-[1] flex h-full flex-col justify-end">
            <item.icon className="mb-6 size-6 text-cyan-200" />
            <p className="text-sm font-black uppercase text-cyan-100">
              {item.label}
            </p>
            <h2 className="mt-1 text-2xl font-black uppercase">{item.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              {item.description}
            </p>
          </div>
        </a>
      ))}
    </section>
  );
}

type LpSectionProps = {
  children: React.ReactNode;
  description?: string;
  id?: string;
  label: string;
  title: string;
};

export function LpSection({
  children,
  description,
  id,
  label,
  title,
}: LpSectionProps) {
  return (
    <section className="space-y-6 py-12 lg:py-16" id={id}>
      <div className="space-y-2">
        <p className="text-sm font-black uppercase tracking-normal text-cyan-100">
          {label}
        </p>
        <h2 className="text-4xl font-black uppercase leading-none text-white lg:text-6xl">
          {title}
        </h2>
        {description ? (
          <p className="max-w-2xl text-sm leading-7 text-slate-300">
            {description}
          </p>
        ) : null}
      </div>
      {children}
    </section>
  );
}
