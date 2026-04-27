import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Store, Utensils } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { foodItems, shops } from "@/lib/mock-data";

type ItemDetailPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return foodItems.map((item) => ({ id: item.id }));
}

export default async function ItemDetailPage({ params }: ItemDetailPageProps) {
  const { id } = await params;
  const product = foodItems.find((item) => item.id === id);

  if (!product) {
    notFound();
  }

  const shop = shops.find((item) => item.id === product.shopId);

  if (!shop) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <Button asChild variant="ghost">
        <Link href="/gourmet">
          <ArrowLeft className="size-4" />
          グルメトップへ戻る
        </Link>
      </Button>

      <section className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
        <Card className="overflow-hidden rounded-lg border-0 shadow-sm">
          <div className="flex aspect-[16/10] items-end bg-[linear-gradient(135deg,#0f766e,#f59e0b)] p-5 text-white md:aspect-[16/7]">
            <div>
              <Badge className="bg-white text-slate-950 hover:bg-white">
                {product.genre}
              </Badge>
              <h1 className="mt-3 text-3xl font-semibold tracking-normal md:text-5xl">
                {product.name}
              </h1>
            </div>
          </div>
          <CardContent className="space-y-5 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-3xl font-semibold">
                {product.price.toLocaleString()}円
              </p>
              <Badge variant="secondary">試合日販売</Badge>
            </div>
            <p className="leading-7 text-muted-foreground">
              {product.description}
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-lg border-0 shadow-sm">
          <CardContent className="space-y-5 p-5">
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold text-sky-700">
                <Store className="size-4" />
                SHOP
              </div>
              <h2 className="mt-2 text-2xl font-semibold">{shop.name}</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {shop.description}
              </p>
            </div>
            <div className="grid gap-3 text-sm">
              <div className="flex items-center gap-2 rounded-md border bg-white p-3">
                <MapPin className="size-4 text-sky-700" />
                {shop.location}
              </div>
              <div className="flex items-center gap-2 rounded-md border bg-white p-3">
                <Utensils className="size-4 text-sky-700" />
                グルメマップ {shop.mapArea}
              </div>
            </div>
            <Button asChild className="w-full">
              <Link href={`/gourmet/shops/${shop.id}`}>
                売店詳細ページへ
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
