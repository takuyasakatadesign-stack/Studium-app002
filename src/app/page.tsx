"use client";

import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  ChevronRight,
  Clock,
  HelpCircle,
  MapPin,
  Megaphone,
  Shirt,
  Sparkles,
  Ticket,
  Train,
  Trophy,
  Utensils,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useStadiumData } from "@/components/providers/stadium-data-provider";
import type { EventInfo } from "@/types";

export default function Home() {
  const { data } = useStadiumData();
  const {
    accessInfo,
    eventInfo,
    faqItems,
    foodItems,
    goodsItems,
    match: currentMatch,
    newsItems,
    nextMatch,
    shops,
    timelineItems,
  } = data;
  const featuredFoods = foodItems.slice(0, 3);
  const specialEvents = eventInfo.filter((event) => event.category === "special");
  const basicEvents = eventInfo.filter((event) => event.category !== "special");
  const newGoods = goodsItems.filter((item) => item.isNew);

  return (
    <div className="-mx-4 -my-8 bg-slate-950 text-white sm:-mx-6 lg:-mx-8">
      <section
        className="relative overflow-hidden px-4 pb-8 pt-8 sm:px-6 lg:px-8"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(8, 13, 34, 0.96), rgba(13, 42, 83, 0.84) 42%, rgba(184, 28, 28, 0.78)), url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1600&q=80')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl space-y-6 py-10 md:py-16">
            <Badge className="bg-white text-slate-950 hover:bg-white">
              {currentMatch.matchName}
            </Badge>
            <div className="space-y-4">
              <p className="text-sm font-semibold tracking-[0.18em] text-sky-200">
                {currentMatch.round}
              </p>
              <h1 className="text-4xl font-semibold tracking-normal md:text-6xl">
                {currentMatch.homeTeam}
                <span className="block text-2xl text-sky-100 md:text-4xl">
                  vs {currentMatch.opponent}
                </span>
              </h1>
            </div>
            <div className="grid gap-3 text-sm sm:grid-cols-3">
              <MatchInfo icon={CalendarDays} label="開催日" value={currentMatch.date} />
              <MatchInfo icon={Clock} label="キックオフ" value={currentMatch.kickoffTime} />
              <MatchInfo icon={MapPin} label="会場" value={currentMatch.venue} />
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild className="bg-white text-slate-950 hover:bg-sky-100">
                <Link href="#highlights">
                  本日の見どころ
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                className="border-white/50 bg-white/10 text-white hover:bg-white/20"
                variant="outline"
              >
                <Link href="/gourmet">
                  グルメを探す
                  <Utensils className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <main className="bg-slate-50 px-4 py-8 text-slate-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-10">
          <section id="highlights" className="grid gap-3 md:grid-cols-3">
            <HighlightCard
              icon={Sparkles}
              title="イベント"
              description="場外ステージとスポンサー体験ブースを開催。"
              href="#events"
            />
            <HighlightCard
              icon={Utensils}
              title="グルメ"
              description={`${shops.length}店舗の限定メニューをチェック。`}
              href="#gourmet"
            />
            <HighlightCard
              icon={Shirt}
              title="グッズ"
              description="試合日限定の新商品を販売します。"
              href="#goods"
            />
          </section>

          <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <Card className="rounded-lg border-0 shadow-sm">
              <CardHeader>
                <SectionTitle
                  icon={Clock}
                  title="当日タイムスケジュール"
                  label="MATCHDAY"
                />
              </CardHeader>
              <CardContent className="space-y-1">
                {timelineItems.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-[64px_1fr] gap-4 border-l-2 border-sky-700/25 py-3 pl-4 first:pt-0 last:pb-0"
                  >
                    <p className="font-semibold text-sky-800">{item.time}</p>
                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-sm text-slate-600">{item.description}</p>
                      <p className="mt-1 text-xs font-medium text-slate-500">
                        {item.location}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card id="events" className="rounded-lg border-0 shadow-sm">
              <CardHeader>
                <SectionTitle icon={Sparkles} title="イベント情報" label="EVENT" />
              </CardHeader>
              <CardContent className="space-y-4">
                <EventGroup title="特設イベント" events={specialEvents} />
                <EventGroup title="基本イベント" events={basicEvents} />
              </CardContent>
            </Card>
          </section>

          <section id="gourmet" className="space-y-4">
            <SectionTitle
              icon={Utensils}
              title="スタジアムグルメ"
              label="FOOD"
              actionHref="/gourmet"
              actionLabel="グルメページ"
            />
            <div className="grid gap-4 md:grid-cols-3">
              {featuredFoods.map((food) => {
                const shop = shops.find((item) => item.id === food.shopId);

                return (
                  <Card key={food.id} className="rounded-lg border-0 shadow-sm">
                    <CardContent className="space-y-4 p-4">
                      <div className="flex aspect-[4/3] items-end rounded-md bg-[linear-gradient(135deg,#0f766e,#f59e0b)] p-4 text-white">
                        <div>
                          <Badge className="bg-white text-slate-950 hover:bg-white">
                            {food.genre}
                          </Badge>
                          <p className="mt-2 text-lg font-semibold">{food.name}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-slate-600">{food.description}</p>
                        <p className="text-lg font-semibold">
                          {food.price.toLocaleString()}円
                        </p>
                        <p className="text-xs font-medium text-slate-500">
                          {shop?.name} / {shop?.location}
                        </p>
                      </div>
                      <Button asChild className="w-full" variant="outline">
                        <Link href={`/gourmet/items/${food.id}`}>商品詳細</Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Button asChild className="h-12">
                <Link href="/gourmet">
                  出店者一覧を見る
                  <ChevronRight className="size-4" />
                </Link>
              </Button>
              <Button asChild className="h-12" variant="secondary">
                <Link href="/gourmet">
                  商品を検索する
                  <ChevronRight className="size-4" />
                </Link>
              </Button>
            </div>
          </section>

          <section id="goods" className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <Card className="rounded-lg border-0 bg-slate-900 text-white shadow-sm">
              <CardHeader>
                <SectionTitle
                  icon={Shirt}
                  title="販売グッズ情報"
                  label="GOODS"
                  inverse
                />
              </CardHeader>
              <CardContent className="space-y-4">
                {newGoods.map((item) => (
                  <div key={item.id} className="rounded-md bg-white/10 p-4">
                    <Badge className="bg-red-500 text-white hover:bg-red-500">
                      NEW
                    </Badge>
                    <h3 className="mt-3 text-lg font-semibold">{item.name}</h3>
                    <p className="mt-1 text-sm text-slate-200">{item.description}</p>
                    <div className="mt-3 flex items-center justify-between gap-3 text-sm">
                      <span>{item.saleLocation}</span>
                      <span className="font-semibold">
                        {item.price.toLocaleString()}円
                      </span>
                    </div>
                  </div>
                ))}
                <div className="rounded-md border border-white/20 p-4">
                  <p className="font-semibold">グッズイベント</p>
                  <p className="mt-1 text-sm text-slate-200">
                    グッズ売店で3,000円以上購入した方に限定カードをプレゼント。
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-lg border-0 shadow-sm">
              <CardHeader>
                <SectionTitle icon={Train} title="アクセス・会場情報" label="ACCESS" />
              </CardHeader>
              <CardContent className="grid gap-3">
                <InfoRow label="住所" value={accessInfo.address} />
                <InfoRow label="電車" value={accessInfo.train} />
                <InfoRow label="バス" value={accessInfo.bus} />
                <InfoRow label="駐車場" value={accessInfo.parking} />
              </CardContent>
            </Card>
          </section>

          <section className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
            <Card className="rounded-lg border-0 shadow-sm">
              <CardHeader>
                <SectionTitle icon={HelpCircle} title="FAQ・観戦ルール" label="GUIDE" />
              </CardHeader>
              <CardContent className="space-y-3">
                {faqItems.map((item) => (
                  <div key={item.id} className="rounded-md border bg-white p-4">
                    <Badge variant="outline">{item.category}</Badge>
                    <p className="mt-3 font-semibold">{item.question}</p>
                    <p className="mt-1 text-sm text-slate-600">{item.answer}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="rounded-lg border-0 shadow-sm">
              <CardHeader>
                <SectionTitle icon={Megaphone} title="NEWS" label="NEWS" />
              </CardHeader>
              <CardContent className="space-y-4">
                {newsItems.map((item) => (
                  <article key={item.id} className="border-b pb-4 last:border-b-0">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{item.category}</Badge>
                      <span className="text-xs text-slate-500">{item.date}</span>
                    </div>
                    <h3 className="mt-2 font-semibold">{item.title}</h3>
                    <p className="mt-1 text-sm text-slate-600">{item.body}</p>
                  </article>
                ))}
              </CardContent>
            </Card>
          </section>

          <section className="pb-4">
            <Card className="rounded-lg border-0 bg-[linear-gradient(135deg,#0f172a,#1d4ed8,#be123c)] text-white shadow-sm">
              <CardContent className="grid gap-5 p-5 md:grid-cols-[1fr_auto] md:items-center">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-semibold text-sky-100">
                    <Trophy className="size-4" />
                    NEXT MATCH
                  </div>
                  <h2 className="text-2xl font-semibold">
                    {nextMatch.homeTeam} vs {nextMatch.opponent}
                  </h2>
                  <p className="text-sm text-sky-100">
                    {nextMatch.date} {nextMatch.kickoffTime} / {nextMatch.venue}
                  </p>
                </div>
                <Button asChild className="bg-white text-slate-950 hover:bg-sky-100">
                  <Link href="#">
                    <Ticket className="size-4" />
                    チケット情報
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  );
}

function MatchInfo({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof CalendarDays;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-white/20 bg-white/10 p-3 backdrop-blur">
      <div className="flex items-center gap-2 text-sky-100">
        <Icon className="size-4" />
        <span>{label}</span>
      </div>
      <p className="mt-1 font-semibold">{value}</p>
    </div>
  );
}

function SectionTitle({
  icon: Icon,
  title,
  label,
  actionHref,
  actionLabel,
  inverse = false,
}: {
  icon: typeof CalendarDays;
  title: string;
  label: string;
  actionHref?: string;
  actionLabel?: string;
  inverse?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div>
        <div
          className={`flex items-center gap-2 text-xs font-semibold ${
            inverse ? "text-sky-100" : "text-sky-700"
          }`}
        >
          <Icon className="size-4" />
          {label}
        </div>
        <h2 className="mt-1 text-xl font-semibold tracking-normal">{title}</h2>
      </div>
      {actionHref ? (
        <Button asChild size="sm" variant="outline">
          <Link href={actionHref}>{actionLabel}</Link>
        </Button>
      ) : null}
    </div>
  );
}

function HighlightCard({
  icon: Icon,
  title,
  description,
  href,
}: {
  icon: typeof CalendarDays;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link href={href}>
      <Card className="h-full rounded-lg border-0 shadow-sm transition-transform hover:-translate-y-0.5">
        <CardContent className="flex items-center gap-4 p-4">
          <div className="flex size-11 items-center justify-center rounded-md bg-sky-900 text-white">
            <Icon className="size-5" />
          </div>
          <div className="min-w-0">
            <h2 className="font-semibold">{title}</h2>
            <p className="text-sm text-slate-600">{description}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function EventGroup({
  title,
  events,
}: {
  title: string;
  events: EventInfo[];
}) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-slate-500">{title}</h3>
      {events.map((event) => (
        <div key={event.id} className="rounded-md border bg-white p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="font-semibold">{event.title}</p>
            <Badge variant="secondary">{event.startTime}</Badge>
          </div>
          <p className="mt-2 text-sm text-slate-600">{event.description}</p>
          <p className="mt-2 text-xs font-medium text-slate-500">
            {event.location}
          </p>
        </div>
      ))}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border bg-white p-4">
      <p className="text-xs font-semibold text-sky-700">{label}</p>
      <p className="mt-1 text-sm text-slate-700">{value}</p>
    </div>
  );
}
