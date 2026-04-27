"use client";

import { Trophy, Utensils } from "lucide-react";

import { GourmetBrowser } from "@/components/gourmet/gourmet-browser";
import { useStadiumData } from "@/components/providers/stadium-data-provider";
import { Badge } from "@/components/ui/badge";

export default function GourmetPage() {
  const { data } = useStadiumData();
  const { foodItems, match: currentMatch, shops } = data;

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-lg bg-[linear-gradient(135deg,#0f172a,#0f766e,#f59e0b)] p-5 text-white shadow-sm md:p-8">
        <div className="max-w-3xl space-y-4">
          <Badge className="bg-white text-slate-950 hover:bg-white">
            {currentMatch.matchName}
          </Badge>
          <div className="flex items-center gap-2 text-sm font-semibold text-amber-100">
            <Trophy className="size-4" />
            {currentMatch.homeTeam} vs {currentMatch.opponent}
          </div>
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-amber-100">
              <Utensils className="size-4" />
              STADIUM GOURMET
            </div>
            <h1 className="mt-2 text-3xl font-semibold tracking-normal md:text-5xl">
              スタジアムで食べたい一品を、すぐ見つける。
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
