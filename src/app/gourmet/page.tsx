"use client";

import { Trophy, Utensils } from "lucide-react";

import { GourmetBrowser } from "@/components/gourmet/gourmet-browser";
import { LpHeader } from "@/components/lp/lp-layout";
import { useStadiumData } from "@/components/providers/stadium-data-provider";
import { Badge } from "@/components/ui/badge";

export default function GourmetPage() {
  const { data } = useStadiumData();
  const { foodItems, match: currentMatch, shops } = data;

  return (
    <div className="-mx-4 -my-5 space-y-8 bg-[linear-gradient(180deg,#020817,#06122A_44%,#020617)] px-4 py-5 text-white sm:-mx-6 sm:-my-8 sm:px-6 sm:py-8 lg:-mx-8 lg:px-8">
      <LpHeader
        navItems={[
          { href: "/", label: "GAME" },
          { href: "/#ticket", label: "TICKET" },
          { href: "/#events", label: "EVENT" },
          { href: "/gourmet", label: "GOURMET" },
          { href: "/#goods", label: "GOODS" },
          { href: "/#access", label: "ACCESS" },
        ]}
        teamName={currentMatch.homeTeam}
        ticketHref="/#ticket"
      />
      <section className="relative min-h-[52svh] overflow-hidden rounded-lg border border-cyan-200/25 bg-[linear-gradient(100deg,rgba(2,8,23,.96),rgba(0,62,170,.78)),url('https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center p-5 text-white shadow-2xl shadow-blue-950/30 md:p-8">
        <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#0A7CFF,#62B7FF,#ffffff,#0A7CFF)]" />
        <div className="max-w-3xl space-y-4">
          <Badge className="bg-cyan-300 text-blue-950 hover:bg-cyan-300">
            {currentMatch.matchName}
          </Badge>
          <div className="flex items-center gap-2 text-sm font-semibold text-cyan-100">
            <Trophy className="size-4" />
            {currentMatch.homeTeam} vs {currentMatch.opponent}
          </div>
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-cyan-100">
              <Utensils className="size-4" />
              STADIUM GOURMET
            </div>
            <h1 className="mt-2 text-3xl font-semibold tracking-normal md:text-5xl">
              青い熱狂に合う一品を、すぐ見つける。
            </h1>
          </div>
          <p className="text-sm leading-6 text-slate-100 md:text-base">
            マップ、売店、商品検索をまとめて確認できます。入場前にも、席に着いてからでも、近くのグルメを探しやすいページです。
          </p>
        </div>
      </section>

      <GourmetBrowser foodItems={foodItems} shops={shops} />
    </div>
  );
}
