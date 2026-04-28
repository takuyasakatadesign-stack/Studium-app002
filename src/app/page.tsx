"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  ChevronRight,
  Clock,
  HelpCircle,
  MapPin,
  Newspaper,
  Play,
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
import { LpHeader, QuickNav } from "@/components/lp/lp-layout";
import { useStadiumData } from "@/components/providers/stadium-data-provider";
import type { EventInfo } from "@/types";

const eventTagOptions = [
  "グッズ",
  "グルメ",
  "キッズ",
  "ファンサービス",
  "スポンサー",
];

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
  const mapAssets = data.internalOperationInfo.mapAssets ?? {};
  const tickets = data.internalOperationInfo.tickets ?? [];
  const topEvents = eventInfo.filter((event) => event.showOnTop !== false);
  const featuredFoods = foodItems.filter((item) => item.showOnTop !== false);
  const specialEvents = topEvents.filter((event) => event.category === "special");
  const newGoods = goodsItems.filter(
    (item) => item.isNew && item.showOnTop !== false,
  );
  const eventTags = useMemo(
    () =>
      eventTagOptions.filter((tag) =>
        topEvents.some((event) => getEventFilterTags(event).includes(tag)),
      ),
    [topEvents],
  );
  const [selectedEventTag, setSelectedEventTag] = useState("すべて");
  const filteredEvents =
    selectedEventTag === "すべて"
      ? topEvents
      : topEvents.filter((event) =>
          getEventFilterTags(event).includes(selectedEventTag),
        );
  const faqCategories = useMemo(
    () => ["すべて", ...Array.from(new Set(faqItems.map((item) => item.category)))],
    [faqItems],
  );
  const [selectedFaqCategory, setSelectedFaqCategory] = useState("すべて");
  const [selectedEvent, setSelectedEvent] = useState<EventInfo | null>(null);
  const [expandedImage, setExpandedImage] = useState<{
    imageUrl?: string;
    title: string;
  } | null>(null);
  const filteredFaqItems =
    selectedFaqCategory === "すべて"
      ? faqItems
      : faqItems.filter((item) => item.category === selectedFaqCategory);

  return (
    <div className="-mx-4 -my-5 bg-slate-950 text-white sm:-mx-6 sm:-my-8 lg:-mx-8">
      <LpHeader
        navItems={[
          { href: "#schedule", label: "GAME" },
          { href: "#ticket", label: "TICKET" },
          { href: "#events", label: "EVENT" },
          { href: "#gourmet", label: "GOURMET" },
          { href: "#goods", label: "GOODS" },
          { href: "#access", label: "ACCESS" },
        ]}
        teamName={currentMatch.homeTeam}
        ticketHref={tickets[0]?.purchaseUrl ?? "#ticket"}
      />
      <section
        className="relative min-h-[760px] overflow-hidden px-4 pb-8 pt-24 sm:min-h-[860px] sm:px-6 lg:min-h-screen lg:px-8"
        style={{
          backgroundImage:
            "radial-gradient(circle at 72% 28%, rgba(10,124,255,0.42), transparent 30%), radial-gradient(circle at 42% 72%, rgba(0,87,231,0.22), transparent 28%), linear-gradient(180deg, #06122A 0%, #020817 72%, #00040D 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.48] mix-blend-screen"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1800&q=80')",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,4,13,0.9)_0%,rgba(0,4,13,0.58)_42%,rgba(0,4,13,0.18)_100%),linear-gradient(180deg,rgba(0,4,13,0.1)_0%,rgba(0,4,13,0.86)_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(118deg,transparent_0%,transparent_43%,rgba(98,183,255,0.16)_44%,transparent_47%,transparent_100%)]" />
        <div className="pointer-events-none absolute left-0 top-0 h-1 w-full bg-[linear-gradient(90deg,transparent,#62B7FF,#0A7CFF,transparent)]" />
        <div className="pointer-events-none absolute right-[7vw] top-[18vh] hidden size-[420px] rounded-full bg-[#0A7CFF]/28 blur-3xl lg:block" />
        <div className="pointer-events-none absolute bottom-[6vh] right-[12vw] hidden h-40 w-[46vw] -skew-x-12 bg-[#28D8FF]/14 blur-2xl lg:block" />
        <div className="pointer-events-none absolute bottom-0 right-0 z-[1] hidden h-[82vh] w-[min(58vw,820px)] lg:block">
          <div className="absolute inset-x-10 bottom-0 h-48 bg-[#0A7CFF]/24 blur-3xl" />
          <img
            alt="BLUE WINGS player visual"
            className="relative h-full w-full object-cover object-center opacity-95 saturate-150 contrast-125 drop-shadow-[0_0_32px_rgba(10,124,255,0.42)] [clip-path:polygon(17%_0,100%_0,100%_100%,0_100%)]"
            fetchPriority="high"
            src="https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=1200&q=90"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,4,13,0.2)_0%,rgba(10,124,255,0.12)_58%,rgba(40,216,255,0.2)_100%)] [clip-path:polygon(17%_0,100%_0,100%_100%,0_100%)]" />
        </div>
        <div className="pointer-events-none absolute right-6 bottom-10 z-[3] hidden items-center gap-3 text-[10px] font-black uppercase tracking-normal text-cyan-100/72 lg:flex [writing-mode:vertical-rl]">
          <span>SCROLL</span>
          <span className="h-16 w-px bg-cyan-200/50" />
        </div>

        <div className="relative z-[2] mx-auto grid min-h-[calc(100svh-6rem)] max-w-7xl items-end gap-8 lg:grid-cols-[minmax(0,0.56fr)_minmax(380px,0.44fr)]">
          <div className="pb-8 pt-8 lg:pb-14">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="border border-cyan-200/40 bg-[#0A7CFF]/24 px-3 py-1 text-cyan-50 hover:bg-[#0A7CFF]/24">
                {currentMatch.matchName}
              </Badge>
              <Badge className="bg-[#FFCC00] px-3 py-1 text-[#020817] hover:bg-[#FFCC00]">
                {currentMatch.round}
              </Badge>
              <Badge className="border border-white/30 bg-white/10 px-3 py-1 text-white hover:bg-white/10">
                MATCHDAY SPECIAL
              </Badge>
            </div>

            <p className="mt-8 text-sm font-black uppercase leading-6 tracking-normal text-cyan-100 sm:text-base">
              Next Home Game
            </p>
            <h1 className="mt-3 font-black uppercase leading-[0.88] tracking-normal text-white drop-shadow-[0_0_24px_rgba(10,124,255,0.42)] text-[clamp(3.5rem,17vw,5.75rem)] lg:text-[clamp(5rem,11vw,10.5rem)]">
              NEXT
              <span className="block text-white">HOME GAME</span>
            </h1>
            <p className="mt-5 max-w-[820px] text-[clamp(1.5rem,5.2vw,2.25rem)] font-black leading-[1.25] text-white md:whitespace-nowrap">
              この青を、力に変える。
            </p>
            <p className="mt-4 max-w-2xl text-sm font-medium leading-7 text-[#D9E6FF] sm:text-base md:text-lg">
              共に闘い、共に勝利を掴み取ろう。青く染まるスタジアムで、試合前から熱狂の一日が始まります。
            </p>

            <div className="mt-7 grid max-w-3xl overflow-hidden rounded-lg border border-cyan-200/30 bg-[#00236B]/70 shadow-[0_24px_70px_rgba(0,35,107,0.34)] backdrop-blur md:grid-cols-[0.95fr_1.15fr]">
              <div className="border-b border-cyan-200/20 bg-[linear-gradient(135deg,rgba(10,124,255,0.38),rgba(3,18,48,0.78))] p-5 md:border-b-0 md:border-r">
                <p className="text-xs font-black uppercase tracking-normal text-cyan-100">
                  Match Date
                </p>
                <p className="mt-3 font-black leading-[0.85] text-white text-[clamp(4rem,13vw,7.5rem)] lg:text-[clamp(5rem,7vw,8.5rem)]">
                  {formatHeroDate(currentMatch.date)}
                </p>
                <p className="mt-3 text-sm font-black uppercase text-[#A7D8FF]">
                  {currentMatch.kickoffTime} Kick Off
                </p>
              </div>
              <div className="grid gap-4 p-5">
                <div>
                  <p className="text-xs font-black uppercase text-[#7E94BE]">Opponent</p>
                  <div className="mt-2 flex items-center gap-3">
                    <p className="text-lg font-black text-white sm:text-xl">
                      {currentMatch.homeTeam}
                    </p>
                    <span className="rounded-full border border-cyan-200/40 bg-white/10 px-3 py-1 text-xs font-black text-cyan-100">
                      VS.
                    </span>
                    <p className="text-lg font-black text-white sm:text-xl">
                      {currentMatch.opponent}
                    </p>
                  </div>
                </div>
                <div className="grid gap-3 text-sm text-[#D9E6FF] sm:grid-cols-2">
                  <div className="flex items-start gap-2">
                    <MapPin className="mt-0.5 size-4 text-cyan-200" />
                    <span>{currentMatch.venue}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CalendarDays className="mt-0.5 size-4 text-cyan-200" />
                    <span>{currentMatch.matchName}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-7 grid gap-3 sm:flex sm:flex-row">
              <Button asChild className="min-h-14 w-full justify-between border border-white/20 bg-[linear-gradient(135deg,#0A7CFF_0%,#003EAA_62%,#00236B_100%)] px-7 text-base font-black text-white shadow-[0_18px_48px_rgba(0,87,231,0.32)] transition hover:-translate-y-0.5 hover:brightness-110 sm:min-h-16 sm:w-[320px] [clip-path:polygon(0_0,calc(100%-22px)_0,100%_50%,calc(100%-22px)_100%,0_100%)]">
                <a
                  href={tickets[0]?.purchaseUrl ?? "#ticket"}
                  rel={tickets[0]?.purchaseUrl ? "noreferrer" : undefined}
                  target={tickets[0]?.purchaseUrl ? "_blank" : undefined}
                >
                  チケットを購入する
                  <ArrowRight className="size-5" />
                </a>
              </Button>
              <Button
                asChild
                className="min-h-12 border border-cyan-200/50 bg-[#031230]/40 px-6 font-bold text-white hover:border-cyan-200 hover:bg-[#0A7CFF]/20"
                variant="outline"
              >
                <Link href="#events">
                  イベントを見る
                  <Sparkles className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                className="min-h-12 border border-cyan-200/50 bg-[#031230]/40 px-6 font-bold text-white hover:border-cyan-200 hover:bg-[#0A7CFF]/20"
                variant="outline"
              >
                <Link href="/gourmet">
                  グルメを探す
                  <Utensils className="size-4" />
                </Link>
              </Button>
            </div>
          </div>

          <aside className="relative z-[3] mb-8 rounded-lg border border-cyan-200/24 bg-[#031230]/76 p-5 shadow-[0_24px_70px_rgba(0,35,107,0.36)] backdrop-blur lg:mb-14">
            <p className="text-xs font-black uppercase text-cyan-100">Match Card</p>
            <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
              <div className="rounded-md border border-white/10 bg-white/[0.08] p-4 text-center">
                <p className="text-xs text-[#B8C7E6]">HOME</p>
                <p className="mt-2 text-lg font-black text-white">{currentMatch.homeTeam}</p>
              </div>
              <p className="text-2xl font-black text-[#62B7FF]">VS</p>
              <div className="rounded-md border border-white/10 bg-white/[0.08] p-4 text-center">
                <p className="text-xs text-[#B8C7E6]">AWAY</p>
                <p className="mt-2 text-lg font-black text-white">{currentMatch.opponent}</p>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-3 overflow-hidden rounded-md border border-cyan-200/24 bg-[#00236B]/64">
              <CountdownItem label="DAYS" value="18" />
              <CountdownItem label="HOURS" value="06" />
              <CountdownItem label="MIN" value="30" />
            </div>
          </aside>
        </div>
      </section>

      <main className="bg-[radial-gradient(circle_at_70%_20%,rgba(10,124,255,0.32),transparent_34%),radial-gradient(circle_at_20%_10%,rgba(0,87,231,0.24),transparent_28%),linear-gradient(180deg,#06122A_0%,#020817_48%,#00040D_100%)] px-4 py-6 text-white sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-8 sm:space-y-10">
          <nav className="sticky top-[73px] z-10 -mx-4 overflow-x-auto border-y border-cyan-200/20 bg-blue-950/90 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6 lg:top-[65px] lg:-mx-8 lg:px-8">
            <div className="mx-auto flex max-w-6xl gap-2">
              {[
                ["#schedule", "スケジュール"],
                ["#events", "イベント"],
                ["#gourmet", "グルメ"],
                ["#goods", "グッズ"],
                ["#access", "アクセス"],
                ["#ticket", "チケット"],
                ["#faq", "FAQ"],
              ].map(([href, label]) => (
                <a
                  className="shrink-0 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-white/20"
                  href={href}
                  key={href}
                >
                  {label}
                </a>
              ))}
            </div>
          </nav>

          <section className="-mt-10 grid gap-3 rounded-lg border border-cyan-200/30 bg-[#031230]/90 p-3 shadow-2xl shadow-blue-950/30 md:grid-cols-3">
            <EventDayStat label="開門前の楽しみ" value={`${topEvents.length}件`} />
            <EventDayStat label="出店グルメ" value={`${shops.length}店舗`} />
            <EventDayStat label="新作グッズ" value={`${newGoods.length}点`} />
          </section>

          <section className="relative grid gap-5 overflow-hidden rounded-lg border border-cyan-200/20 bg-[#031230]/80 p-5 shadow-xl shadow-blue-950/20 backdrop-blur lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(10,124,255,0.18),transparent_52%)]" />
            <div className="space-y-3">
              <SectionTitle icon={MapPin} title="会場マップ" label="STADIUM MAP" />
              <p className="text-sm leading-6 text-cyan-50">
                入場ゲート、イベントエリア、グルメ売店の位置を事前に確認できます。
              </p>
            </div>
            <div className="relative overflow-hidden rounded-lg border border-cyan-200/30 bg-blue-950 shadow-2xl">
              {accessInfo.mapImageUrl ? (
                <img
                  alt={`${accessInfo.stadiumName} 会場マップ`}
                  className="aspect-[16/9] w-full object-cover"
                  src={accessInfo.mapImageUrl}
                />
              ) : (
                <div className="flex aspect-[16/9] items-center justify-center bg-slate-100 text-sm font-medium text-slate-500">
                  会場マップ画像
                </div>
              )}
              <div className="border-t border-white/10 p-3">
                <Button
                  className="w-full border-white/40 bg-white/10 text-white hover:bg-white/20"
                  onClick={() =>
                    setExpandedImage({
                      imageUrl: accessInfo.mapImageUrl,
                      title: "会場マップ",
                    })
                  }
                  type="button"
                  variant="outline"
                >
                  マップを大きく表示
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </div>
          </section>

          <QuickNav
            items={[
              {
                description: "座席図と価格を確認して購入方法へ。",
                href: "#ticket",
                icon: Ticket,
                label: "TICKET",
                title: "チケット購入",
              },
              {
                description: "ステージ、体験ブース、集合イベントをまとめて確認。",
                href: "#events",
                icon: Sparkles,
                label: "EVENT",
                title: "イベント情報",
              },
              {
                description: `${shops.length}店舗の限定メニューと場所をチェック。`,
                href: "#gourmet",
                icon: Utensils,
                label: "GOURMET",
                title: "スタジアムグルメ",
              },
              {
                description: "新商品と購入特典を試合前に確認。",
                href: "#goods",
                icon: Shirt,
                label: "GOODS",
                title: "グッズ情報",
              },
            ]}
          />

          <section className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
            <Card className="overflow-hidden rounded-lg border border-cyan-200/20 bg-[#06122a] text-white shadow-xl">
              <CardHeader>
                <SectionTitle icon={Newspaper} title="NEWS" label="ニュース" inverse />
              </CardHeader>
              <CardContent className="space-y-1">
                {newsItems.slice(0, 4).map((item, index) => (
                  <div
                    className="grid gap-2 border-t border-cyan-200/20 py-3 text-sm transition-colors hover:bg-blue-500/10 sm:grid-cols-[96px_96px_1fr_auto]"
                    key={item.id}
                  >
                    <span className="font-semibold text-cyan-100">{item.date}</span>
                    <span className="text-slate-300">{item.category}</span>
                    <span>{item.title}</span>
                    {index === 0 ? (
                      <Badge className="w-fit bg-amber-300 text-blue-950 hover:bg-amber-300">
                        NEW
                      </Badge>
                    ) : null}
                  </div>
                ))}
              </CardContent>
            </Card>

            <div
              className="relative flex min-h-[280px] items-center justify-center overflow-hidden rounded-lg border border-cyan-200/20 bg-[#06122a] p-5 shadow-xl"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, rgba(2,8,23,0.82), rgba(0,87,231,0.42)), url('https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1200&q=80')",
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            >
              <div className="text-center">
                <button className="mx-auto flex size-20 items-center justify-center rounded-full border border-white/40 bg-white/20 text-white shadow-[0_0_34px_rgba(98,183,255,0.42)] backdrop-blur transition-transform hover:scale-105" type="button">
                  <Play className="size-7 fill-white" />
                </button>
                <p className="mt-4 text-sm font-semibold text-cyan-100">
                  PLAY FULL VERSION
                </p>
                <p className="mt-2 text-2xl font-black uppercase tracking-normal">
                  BLUE WINGS MATCHDAY
                </p>
              </div>
            </div>
          </section>

          <section
            id="schedule"
            className="rounded-lg border border-cyan-200/20 bg-[#06122a] p-5 text-white shadow-xl"
          >
            <SectionTitle
              icon={Clock}
              title="当日タイムスケジュール"
              label="MATCHDAY"
            />
            <div className="mt-6 space-y-0">
              {timelineItems.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[72px_1fr] gap-4 border-l-2 border-cyan-200/30 pb-6 pl-4 last:pb-0 sm:grid-cols-[96px_1fr]"
                >
                  <div className="relative">
                    <span className="absolute -left-[23px] top-1 size-3 rounded-full border-2 border-[#06122a] bg-cyan-300" />
                    <p className="text-lg font-semibold text-cyan-100">{item.time}</p>
                  </div>
                  <div className="rounded-md border border-cyan-200/20 bg-white/10 p-4">
                    <p className="font-semibold">{item.title}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-300">
                      {item.description}
                    </p>
                    <p className="mt-3 text-xs font-medium text-cyan-100">
                      {item.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section
            id="events"
            className="space-y-5 rounded-lg border border-cyan-200/25 bg-[linear-gradient(135deg,#02143f,#0f4fa8_58%,#0ea5e9)] p-5 shadow-2xl shadow-blue-950/30"
          >
            <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="space-y-2">
                <SectionTitle icon={Sparkles} title="イベント情報" label="EVENT" inverse />
                <p className="text-sm leading-6 text-cyan-50">
                  気になるタグで絞り込んで、試合前の過ごし方を選べます。
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {["すべて", ...eventTags].map((tag) => {
                  const active = selectedEventTag === tag;

                  return (
                    <button
                      className={`rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors ${
                        active
                          ? "border-white bg-white text-blue-950"
                          : "border-white/30 bg-white/10 text-white hover:bg-white/20"
                      }`}
                      key={tag}
                      onClick={() => setSelectedEventTag(tag)}
                      type="button"
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>
            <EventCollection events={filteredEvents} onSelect={setSelectedEvent} />
          </section>

          <section id="gourmet" className="space-y-5 rounded-lg border border-cyan-200/25 bg-[linear-gradient(135deg,#02143f,#0f4fa8_52%,#38bdf8)] p-5 text-white shadow-2xl shadow-blue-950/20">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <SectionTitle
                icon={Utensils}
                title="スタジアムグルメ"
                label="FOOD"
                actionHref="/gourmet"
                actionLabel="グルメページ"
                inverse
              />
              <Badge className="bg-white/15 text-white hover:bg-white/15">
                {featuredFoods.length}品
              </Badge>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {featuredFoods.map((food) => {
                const shop = shops.find((item) => item.id === food.shopId);

                return (
                  <Card key={food.id} className="overflow-hidden rounded-lg border border-cyan-200/20 bg-[#06122a] text-white shadow-xl">
                    <CardContent className="space-y-4 p-4">
                      <div
                        className="flex aspect-[4/3] items-end overflow-hidden rounded-md bg-[linear-gradient(135deg,#0f766e,#f59e0b)] p-4 text-white"
                        style={
                          food.imageUrl
                            ? {
                                backgroundImage: `linear-gradient(180deg, rgba(15,23,42,0.1), rgba(15,23,42,0.78)), url('${food.imageUrl}')`,
                                backgroundPosition: "center",
                                backgroundSize: "cover",
                              }
                            : undefined
                        }
                      >
                        <div>
                          <Badge className="bg-cyan-300 text-blue-950 hover:bg-cyan-300">
                            {food.genre}
                          </Badge>
                          <p className="mt-2 text-lg font-semibold">{food.name}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-slate-300">{food.description}</p>
                        <p className="text-lg font-semibold">
                          {food.price.toLocaleString()}円
                        </p>
                        <p className="text-xs font-medium text-cyan-100">
                          {shop?.name} / {shop?.location}
                        </p>
                      </div>
                      <Button asChild className="w-full border-cyan-200/40 bg-white/10 text-white hover:bg-white/20" variant="outline">
                        <Link href={`/gourmet/items/${food.id}`}>商品詳細</Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Button asChild className="h-12 bg-blue-950 text-white hover:bg-blue-900">
                <Link href="/gourmet">
                  出店者一覧を見る
                  <ChevronRight className="size-4" />
                </Link>
              </Button>
              <Button asChild className="h-12 bg-cyan-100 text-blue-950 hover:bg-white" variant="secondary">
                <Link href="/gourmet">
                  商品を検索する
                  <ChevronRight className="size-4" />
                </Link>
              </Button>
            </div>
          </section>

          <section
            id="goods"
            className="space-y-5 rounded-lg border border-cyan-200/20 bg-[linear-gradient(160deg,#020617,#0f4fa8)] p-5 text-white shadow-xl"
          >
            <div className="flex flex-wrap items-end justify-between gap-3">
              <SectionTitle
                icon={Shirt}
                title="販売グッズ情報"
                label="GOODS"
                inverse
              />
              <Badge className="bg-white/15 text-white hover:bg-white/15">
                {newGoods.length}点
              </Badge>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {newGoods.map((item) => (
                <Card
                  key={item.id}
                  className="overflow-hidden rounded-lg border border-white/15 bg-white/10 text-white shadow-lg"
                >
                  {item.imageUrl ? (
                    <img
                      alt={item.name}
                      className="aspect-[16/9] w-full object-cover"
                      src={item.imageUrl}
                    />
                  ) : null}
                  <CardContent className="p-4">
                    <Badge className="bg-cyan-300 text-blue-950 hover:bg-cyan-300">
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
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="rounded-md border border-white/20 bg-white/10 p-4">
              <p className="font-semibold">グッズイベント</p>
              <p className="mt-1 text-sm text-slate-200">
                グッズ売店で3,000円以上購入した方に限定カードをプレゼント。
              </p>
            </div>
          </section>

          <section
            id="access"
            className="rounded-lg border border-cyan-200/20 bg-[#06122a] p-5 text-white shadow-xl"
          >
            <SectionTitle icon={Train} title="アクセス・会場情報" label="ACCESS" />
            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              <ImageFeature
                imageUrl={mapAssets.stadiumPhotoUrl}
                title={accessInfo.stadiumName}
                fallback="スタジアム写真"
                onOpen={() =>
                  setExpandedImage({
                    imageUrl: mapAssets.stadiumPhotoUrl,
                    title: accessInfo.stadiumName,
                  })
                }
              />
              <ImageFeature
                imageUrl={mapAssets.parkingMapImageUrl}
                title="駐車場マップ"
                fallback="駐車場マップ"
                onOpen={() =>
                  setExpandedImage({
                    imageUrl: mapAssets.parkingMapImageUrl,
                    title: "駐車場マップ",
                  })
                }
              />
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              <InfoRow label="住所" value={accessInfo.address} />
              <InfoRow label="電車" value={accessInfo.train} />
              <InfoRow label="バス" value={accessInfo.bus} />
              <InfoRow label="駐車場" value={accessInfo.parking} />
            </div>
          </section>

          <section
            id="ticket"
            className="space-y-5 rounded-lg border border-cyan-200/20 bg-[#06122a] p-5 text-white shadow-xl"
          >
            <SectionTitle icon={Ticket} title="チケット" label="TICKET" />
            <div className="grid gap-5 lg:grid-cols-[1fr_1.1fr]">
              <ImageFeature
                imageUrl={mapAssets.seatingChartImageUrl}
                title="座席図"
                fallback="座席図"
                onOpen={() =>
                  setExpandedImage({
                    imageUrl: mapAssets.seatingChartImageUrl,
                    title: "座席図",
                  })
                }
              />
              <div className="space-y-4">
                <div className="grid gap-2 sm:grid-cols-3">
                  <Button
                    className="bg-blue-950 text-white hover:bg-blue-900"
                    onClick={() =>
                      setExpandedImage({
                        imageUrl: mapAssets.seatingChartImageUrl,
                        title: "座席図",
                      })
                    }
                    type="button"
                  >
                    座席図を見る
                  </Button>
                  <Button asChild className="bg-cyan-100 text-blue-950 hover:bg-cyan-50">
                    <a href="#ticket-prices">価格を確認</a>
                  </Button>
                  <Button
                    asChild={Boolean(tickets[0]?.purchaseUrl)}
                    className="bg-amber-300 text-blue-950 hover:bg-amber-200"
                    disabled={!tickets[0]?.purchaseUrl}
                  >
                    {tickets[0]?.purchaseUrl ? (
                      <a
                        href={tickets[0].purchaseUrl}
                        rel="noreferrer"
                        target="_blank"
                      >
                        購入方法を見る
                      </a>
                    ) : (
                      "購入方法を見る"
                    )}
                  </Button>
                </div>
                <div className="space-y-3" id="ticket-prices">
                {tickets.map((ticketInfo) => (
                  <div
                    className="rounded-md border border-cyan-200/20 bg-white/10 p-4"
                    key={ticketInfo.id}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold">{ticketInfo.name}</p>
                        <p className="mt-1 text-sm text-slate-300">
                          {ticketInfo.benefit}
                        </p>
                      </div>
                      <p className="text-lg font-semibold text-cyan-100">
                        {ticketInfo.price.toLocaleString()}円
                      </p>
                    </div>
                    <p className="mt-3 text-sm text-slate-300">
                      {ticketInfo.exchangeMethod}
                    </p>
                    {ticketInfo.purchaseUrl ? (
                      <Button
                        asChild
                        className="mt-4 bg-blue-950 text-white hover:bg-blue-900"
                      >
                        <a
                          href={ticketInfo.purchaseUrl}
                          rel="noreferrer"
                          target="_blank"
                        >
                          チケット購入方法
                          <ArrowRight className="size-4" />
                        </a>
                      </Button>
                    ) : null}
                  </div>
                ))}
                </div>
              </div>
            </div>
          </section>

          <section id="faq">
            <Card className="rounded-lg border border-cyan-200/20 bg-[#06122a] text-white shadow-xl">
              <CardHeader>
                <SectionTitle icon={HelpCircle} title="FAQ・観戦ルール" label="GUIDE" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {faqCategories.map((category) => {
                    const active = selectedFaqCategory === category;

                    return (
                      <button
                        className={`shrink-0 rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors ${
                          active
                            ? "border-cyan-200 bg-cyan-200 text-blue-950"
                            : "border-cyan-200/30 bg-white/10 text-white hover:bg-white/20"
                        }`}
                        key={category}
                        onClick={() => setSelectedFaqCategory(category)}
                        type="button"
                      >
                        {category}
                      </button>
                    );
                  })}
                </div>
                {filteredFaqItems.map((item) => (
                  <details
                    className="group rounded-md border border-cyan-200/20 bg-white/10 p-4"
                    key={item.id}
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                      <span>
                        <Badge variant="outline">{item.category}</Badge>
                        <span className="mt-3 block font-semibold">
                          {item.question}
                        </span>
                      </span>
                      <ChevronRight className="size-4 shrink-0 text-cyan-100 transition-transform group-open:rotate-90" />
                    </summary>
                    <p className="mt-3 text-sm leading-6 text-slate-300">
                      {item.answer}
                    </p>
                  </details>
                ))}
              </CardContent>
            </Card>
          </section>

          <section className="pb-4">
            <Card className="rounded-lg border border-cyan-200/25 bg-[linear-gradient(135deg,#020817,#003EAA,#0A7CFF)] text-white shadow-2xl">
              <CardContent className="grid gap-5 p-5 md:grid-cols-[1fr_auto] md:items-center">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-semibold text-sky-100">
                    <Trophy className="size-4" />
                    青く染めろ、スタジアムを。
                  </div>
                  <h2 className="text-2xl font-semibold">
                    その声援が、選手の力になる。
                  </h2>
                  <p className="text-sm text-sky-100">
                    NEXT MATCH: {nextMatch.homeTeam} vs {nextMatch.opponent} / {nextMatch.date} {nextMatch.kickoffTime}
                  </p>
                </div>
                <Button asChild className="bg-white text-blue-950 hover:bg-sky-100">
                  <Link href="#ticket">
                    <Ticket className="size-4" />
                    チケット情報
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
      <EventDetailModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      <ImageModal image={expandedImage} onClose={() => setExpandedImage(null)} />
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-cyan-200/20 bg-slate-950/90 p-3 backdrop-blur md:hidden">
        <Button asChild className="h-12 w-full bg-blue-600 text-white shadow-[0_0_28px_rgba(10,124,255,0.42)] hover:bg-blue-500">
          <a
            href={tickets[0]?.purchaseUrl ?? "#ticket"}
            rel={tickets[0]?.purchaseUrl ? "noreferrer" : undefined}
            target={tickets[0]?.purchaseUrl ? "_blank" : undefined}
          >
            チケットを購入する
            <ArrowRight className="size-4" />
          </a>
        </Button>
      </div>
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
      <div className="flex items-center gap-2 text-cyan-100">
        <Icon className="size-4" />
        <span>{label}</span>
      </div>
      <p className="mt-1 font-semibold">{value}</p>
    </div>
  );
}

function HeroPick({
  detail,
  href,
  icon: Icon,
  label,
  title,
}: {
  detail: string;
  href: string;
  icon: typeof CalendarDays;
  label: string;
  title: string;
}) {
  return (
    <Link
      className="group grid grid-cols-[44px_1fr_auto] items-center gap-3 rounded-md border border-cyan-200/20 bg-white/10 p-3 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-colors [clip-path:polygon(0_0,96%_0,100%_100%,0_100%)] hover:bg-white/20"
      href={href}
    >
      <div className="flex size-11 items-center justify-center rounded-md bg-cyan-300 text-blue-950">
        <Icon className="size-5" />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold text-amber-100">{label}</p>
        <p className="truncate font-semibold">{title}</p>
        <p className="text-xs text-slate-300">{detail}</p>
      </div>
      <ArrowRight className="size-4 text-amber-100 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

function CountdownItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-r border-cyan-200/20 p-4 text-center last:border-r-0">
      <p className="text-3xl font-black leading-none text-white">{value}</p>
      <p className="mt-1 text-[10px] font-black uppercase tracking-normal text-[#A7D8FF]">
        {label}
      </p>
    </div>
  );
}

function formatHeroDate(date: string) {
  return date.replace(/^(\d{4})[./-]/, "").replace(/[/-]/g, ".");
}

function EventDayStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-cyan-200/20 bg-[linear-gradient(135deg,rgba(10,124,255,0.22),rgba(3,18,48,0.78))] p-4 [clip-path:polygon(0_0,94%_0,100%_100%,0_100%)]">
      <p className="text-xs font-semibold text-cyan-100">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-white">{value}</p>
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
            inverse ? "text-cyan-100" : "text-blue-700"
          }`}
        >
          <Icon className="size-4" />
          {label}
        </div>
        <h2 className="mt-1 text-3xl font-black uppercase leading-none tracking-normal md:text-5xl">
          {title}
        </h2>
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
      <Card className="h-full overflow-hidden rounded-lg border border-cyan-200/25 bg-[#06122a] text-white shadow-xl transition-transform [clip-path:polygon(0_0,94%_0,100%_100%,0_100%)] hover:-translate-y-0.5">
        <CardContent className="relative flex min-h-32 items-center gap-4 p-4">
          <div className="absolute inset-y-0 right-0 w-20 bg-[linear-gradient(135deg,transparent,rgba(98,183,255,0.24))]" />
          <div className="z-[1] flex size-11 items-center justify-center rounded-md bg-blue-600 text-white shadow-[0_0_24px_rgba(10,124,255,0.28)]">
            <Icon className="size-5" />
          </div>
          <div className="z-[1] min-w-0">
            <h2 className="font-black uppercase tracking-normal">{title}</h2>
            <p className="mt-1 text-sm text-slate-300">{description}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function EventCollection({
  events,
  onSelect,
}: {
  events: EventInfo[];
  onSelect: (event: EventInfo) => void;
}) {
  if (events.length === 0) {
    return (
      <div className="rounded-md border border-white/20 bg-white/10 p-5 text-sm text-cyan-50">
        選択中のタグに該当するイベントはありません。
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-end">
        <Badge className="bg-white/15 text-white hover:bg-white/15">
          表示中 {events.length}件
        </Badge>
      </div>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event, index) => (
          <div
            key={event.id}
            className={`overflow-hidden rounded-md border border-white/15 bg-white text-slate-950 shadow-lg ${
              index === 0 ? "md:col-span-2 lg:col-span-2" : ""
            }`}
          >
            {event.imageUrl ? (
              <img
                alt={event.title}
                className={
                  index === 0
                    ? "aspect-[21/9] w-full object-cover"
                    : "aspect-[16/9] w-full object-cover"
                }
                src={event.imageUrl}
              />
            ) : null}
            <div className="p-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="bg-blue-950 text-white hover:bg-blue-950">
                  {getEventTypeLabel(event)}
                </Badge>
                {getEventFilterTags(event).map((tag) => (
                  <Badge
                    className="bg-cyan-100 text-blue-950 hover:bg-cyan-100"
                    key={tag}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="mt-3 flex items-start justify-between gap-3">
                <p className="font-semibold">{event.title}</p>
                <span className="shrink-0 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-800">
                  {event.startTime}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-600">{event.description}</p>
              <p className="mt-2 text-xs font-medium text-blue-700">
                {event.location}
              </p>
              <Button
                className="mt-4 w-full border-blue-200 text-blue-950"
                onClick={() => onSelect(event)}
                type="button"
                variant="outline"
              >
                詳細を見る
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function getEventFilterTags(event: EventInfo) {
  return event.tags?.filter((tag) => eventTagOptions.includes(tag)) ?? [];
}

function getEventTypeLabel(event: EventInfo) {
  const labels: Record<NonNullable<EventInfo["eventType"]>, string> = {
    basic: "基本",
    special: "特設",
    limited: "期間限定",
  };

  return labels[event.eventType ?? getDefaultEventType(event.category)];
}

function getDefaultEventType(category: EventInfo["category"]): NonNullable<EventInfo["eventType"]> {
  if (category === "special") {
    return "special";
  }

  if (category === "booth" || category === "gathering") {
    return "limited";
  }

  return "basic";
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border bg-white p-4">
      <p className="text-xs font-semibold text-sky-700">{label}</p>
      <p className="mt-1 text-sm text-slate-700">{value}</p>
    </div>
  );
}

function ImageFeature({
  fallback,
  imageUrl,
  onOpen,
  title,
}: {
  fallback: string;
  imageUrl?: string;
  onOpen?: () => void;
  title: string;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-blue-100 bg-white shadow-sm">
      {imageUrl ? (
        <img
          alt={title}
          className="aspect-[16/9] w-full object-cover"
          src={imageUrl}
        />
      ) : (
        <div className="flex aspect-[16/9] items-center justify-center bg-blue-50 text-sm font-medium text-blue-700">
          {fallback}
        </div>
      )}
      <div className="p-3">
        <div className="flex items-center justify-between gap-3">
          <p className="font-semibold">{title}</p>
          {onOpen ? (
            <Button
              className="shrink-0"
              onClick={onOpen}
              size="sm"
              type="button"
              variant="outline"
            >
              大きく表示
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function EventDetailModal({
  event,
  onClose,
}: {
  event: EventInfo | null;
  onClose: () => void;
}) {
  if (!event) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white text-slate-950 shadow-2xl">
        {event.imageUrl ? (
          <img
            alt={event.title}
            className="aspect-[16/9] w-full object-cover"
            src={event.imageUrl}
          />
        ) : null}
        <div className="space-y-4 p-5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-blue-950 text-white hover:bg-blue-950">
              {getEventTypeLabel(event)}
            </Badge>
            {getEventFilterTags(event).map((tag) => (
              <Badge className="bg-cyan-100 text-blue-950 hover:bg-cyan-100" key={tag}>
                {tag}
              </Badge>
            ))}
          </div>
          <div>
            <h3 className="text-2xl font-semibold">{event.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {event.description}
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <InfoRow label="開始時間" value={event.startTime} />
            <InfoRow label="終了時間" value={event.endTime ?? "-"} />
            <InfoRow label="場所" value={event.location} />
            <InfoRow label="参加条件" value={event.participationRule ?? "指定なし"} />
            <InfoRow label="担当部署" value={event.department} />
            <InfoRow label="担当者" value={event.ownerName ?? "-"} />
          </div>
          <Button className="w-full bg-blue-950 text-white hover:bg-blue-900" onClick={onClose} type="button">
            閉じる
          </Button>
        </div>
      </div>
    </div>
  );
}

function ImageModal({
  image,
  onClose,
}: {
  image: { imageUrl?: string; title: string } | null;
  onClose: () => void;
}) {
  if (!image) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4">
      <div className="w-full max-w-5xl rounded-lg bg-white p-4 text-slate-950 shadow-2xl">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h3 className="text-lg font-semibold">{image.title}</h3>
          <Button onClick={onClose} type="button" variant="outline">
            閉じる
          </Button>
        </div>
        {image.imageUrl ? (
          <img
            alt={image.title}
            className="max-h-[72vh] w-full rounded-md object-contain"
            src={image.imageUrl}
          />
        ) : (
          <div className="flex aspect-[16/9] items-center justify-center rounded-md bg-blue-50 text-sm font-medium text-blue-700">
            画像が登録されていません
          </div>
        )}
      </div>
    </div>
  );
}
