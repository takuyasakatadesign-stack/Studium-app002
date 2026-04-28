"use client";

import Link from "next/link";
import { MapPin, Search, Store, Utensils } from "lucide-react";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/components/shared/empty-state";
import type { FoodItem, Shop } from "@/types";

type GourmetBrowserProps = {
  foodItems: FoodItem[];
  shops: Shop[];
};

export function GourmetBrowser({ foodItems, shops }: GourmetBrowserProps) {
  const [query, setQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("すべて");

  const genres = useMemo(
    () => ["すべて", ...Array.from(new Set(foodItems.map((item) => item.genre)))],
    [foodItems],
  );

  const filteredFoods = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return foodItems.filter((item) => {
      const shop = shops.find((target) => target.id === item.shopId);
      const matchesGenre =
        selectedGenre === "すべて" || item.genre === selectedGenre;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        item.name.toLowerCase().includes(normalizedQuery) ||
        item.description.toLowerCase().includes(normalizedQuery) ||
        item.genre.toLowerCase().includes(normalizedQuery) ||
        shop?.name.toLowerCase().includes(normalizedQuery) ||
        shop?.location.toLowerCase().includes(normalizedQuery);

      return matchesGenre && matchesQuery;
    });
  }, [foodItems, query, selectedGenre, shops]);

  const recommendedFoods = foodItems.slice(0, 3);

  return (
    <div className="space-y-8">
      <Card className="rounded-lg border border-cyan-200/25 bg-[#06122a] text-white shadow-2xl shadow-blue-950/20">
        <CardContent className="space-y-5 p-5">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-cyan-100">
              <Search className="size-4" />
              SEARCH
            </div>
            <h2 className="text-3xl font-black uppercase tracking-normal">今食べたいものを探す</h2>
            <p className="text-sm text-slate-300">
              商品名、売店名、場所で検索できます。現地で片手でも使いやすいよう、検索とジャンルを上に固定しています。
            </p>
          </div>
          <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <Input
                className="h-12 border-white/20 bg-white pl-10 text-base text-slate-950 placeholder:text-slate-500"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="例: カレー、北ゲート、カフェ"
                value={query}
              />
            </div>
            <Button
              className="h-12 bg-blue-600 text-white shadow-[0_0_24px_rgba(10,124,255,0.28)] hover:bg-blue-500"
              onClick={() => {
                setQuery("");
                setSelectedGenre("すべて");
              }}
              type="button"
            >
              条件をクリア
            </Button>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {genres.map((genre) => (
              <Button
                className="shrink-0"
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                type="button"
                variant={selectedGenre === genre ? "secondary" : "outline"}
              >
                {genre}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <Card className="rounded-lg border border-cyan-200/20 bg-[#06122a] text-white shadow-xl">
          <CardHeader>
            <div className="flex items-center gap-2 text-sm font-semibold text-cyan-100">
              <MapPin className="size-4" />
              MAP
            </div>
            <CardTitle className="text-xl">グルメマップ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid min-h-[280px] grid-cols-2 gap-3 rounded-lg bg-[linear-gradient(135deg,#020617,#0f4fa8)] p-3 text-white">
              {shops.map((shop, index) => (
                <Link
                  className="flex min-h-28 flex-col justify-between rounded-md border border-white/15 bg-white/10 p-3 transition-colors hover:bg-white/20"
                  href={`/gourmet/shops/${shop.id}`}
                  key={shop.id}
                >
                  <Badge className="w-fit bg-cyan-300 text-blue-950 hover:bg-cyan-300">
                    {shop.mapArea}
                  </Badge>
                  <div>
                    <p className="text-sm font-semibold">{shop.name}</p>
                    <p className="text-xs text-slate-300">{shop.location}</p>
                  </div>
                  <span className="text-xs text-slate-400">
                    エリア {index + 1}
                  </span>
                </Link>
              ))}
            </div>
            <p className="text-sm text-slate-300">
              売店位置はエリア番号で確認できます。カードを押すと売店詳細へ移動します。
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-lg border border-cyan-200/20 bg-white/95 text-slate-950 shadow-xl">
          <CardHeader>
            <div className="flex items-center gap-2 text-sm font-semibold text-blue-700">
              <Utensils className="size-4" />
              RECOMMEND
            </div>
            <CardTitle className="text-xl">おすすめ商品</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recommendedFoods.map((item) => (
              <FoodListItem item={item} key={item.id} shops={shops} />
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Store className="size-5 text-cyan-200" />
            <h2 className="text-xl font-semibold">出店者一覧</h2>
          </div>
          <Badge className="bg-cyan-300 text-blue-950 hover:bg-cyan-300">{shops.length}店舗</Badge>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {shops.map((shop) => {
            const shopFoods = foodItems.filter((item) => item.shopId === shop.id);

            return (
              <Card key={shop.id} className="rounded-lg border border-cyan-200/20 bg-white/95 text-slate-950 shadow-xl">
                <CardContent className="space-y-4 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold">{shop.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {shop.description}
                      </p>
                    </div>
                    <Badge variant="outline">{shop.mapArea}</Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="size-4" />
                    {shop.location}
                  </div>
                  <p className="text-sm font-medium">
                    取扱商品 {shopFoods.length}点
                  </p>
                  <Button asChild className="w-full" variant="outline">
                    <Link href={`/gourmet/shops/${shop.id}`}>売店詳細</Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Utensils className="size-5 text-cyan-200" />
            <h2 className="text-xl font-semibold">商品一覧</h2>
          </div>
          <Badge className="bg-cyan-300 text-blue-950 hover:bg-cyan-300">{filteredFoods.length}件</Badge>
        </div>
        {filteredFoods.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredFoods.map((item) => (
              <FoodCard item={item} key={item.id} shops={shops} />
            ))}
          </div>
        ) : (
          <EmptyState
            description="検索語やジャンルを変えると、別の商品が見つかります。"
            icon={Search}
            title="条件に一致する商品はありません"
          />
        )}
      </section>
    </div>
  );
}

function FoodCard({ item, shops }: { item: FoodItem; shops: Shop[] }) {
  const shop = shops.find((target) => target.id === item.shopId);

  return (
    <Card className="rounded-lg border border-cyan-200/20 bg-white/95 text-slate-950 shadow-xl">
      <CardContent className="space-y-4 p-4">
        <FoodVisual genre={item.genre} name={item.name} />
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-semibold">{item.name}</h3>
            <p className="shrink-0 font-semibold">
              {item.price.toLocaleString()}円
            </p>
          </div>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {item.description}
          </p>
          <p className="text-xs font-medium text-muted-foreground">
            {shop?.name} / {shop?.location}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button asChild variant="outline">
            <Link href={`/gourmet/shops/${shop?.id}`}>売店</Link>
          </Button>
          <Button asChild>
            <Link href={`/gourmet/items/${item.id}`}>詳細</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function FoodListItem({ item, shops }: { item: FoodItem; shops: Shop[] }) {
  const shop = shops.find((target) => target.id === item.shopId);

  return (
    <Link
      className="grid grid-cols-[72px_1fr] gap-3 rounded-md border bg-white p-3 transition-colors hover:bg-slate-50"
      href={`/gourmet/items/${item.id}`}
    >
      <FoodVisual compact genre={item.genre} name={item.name} />
      <div className="min-w-0">
        <div className="flex items-start justify-between gap-3">
          <p className="font-semibold">{item.name}</p>
          <p className="shrink-0 text-sm font-semibold">
            {item.price.toLocaleString()}円
          </p>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{shop?.name}</p>
        <p className="mt-1 text-xs text-muted-foreground">{shop?.location}</p>
      </div>
    </Link>
  );
}

function FoodVisual({
  compact = false,
  genre,
  name,
}: {
  compact?: boolean;
  genre: string;
  name: string;
}) {
  return (
    <div
      className={`flex items-end rounded-md bg-[linear-gradient(135deg,#020617,#0f4fa8,#38bdf8)] p-3 text-white ${
        compact ? "aspect-square" : "aspect-[4/3]"
      }`}
    >
      <div className="min-w-0">
        <Badge className="bg-white text-slate-950 hover:bg-white">{genre}</Badge>
        {!compact ? (
          <p className="mt-2 line-clamp-2 font-semibold">{name}</p>
        ) : null}
      </div>
    </div>
  );
}
