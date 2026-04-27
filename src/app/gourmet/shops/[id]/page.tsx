import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ExternalLink,
  MapPin,
  Store,
  Utensils,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { foodItems, shops } from "@/lib/mock-data";

type ShopDetailPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return shops.map((shop) => ({ id: shop.id }));
}

export default async function ShopDetailPage({ params }: ShopDetailPageProps) {
  const { id } = await params;
  const shop = shops.find((item) => item.id === id);

  if (!shop) {
    notFound();
  }

  const shopProducts = foodItems.filter((item) => item.shopId === shop.id);
  const snsLinks = [
    { label: "Instagram", href: shop.snsLinks.instagram, icon: ExternalLink },
    { label: "X", href: shop.snsLinks.x, icon: ExternalLink },
    { label: "Website", href: shop.snsLinks.website, icon: ExternalLink },
  ].filter((item): item is typeof item & { href: string } => Boolean(item.href));

  return (
    <div className="space-y-8">
      <Button asChild variant="ghost">
        <Link href="/gourmet">
          <ArrowLeft className="size-4" />
          グルメトップへ戻る
        </Link>
      </Button>

      <section className="overflow-hidden rounded-lg bg-[linear-gradient(135deg,#0f172a,#0f766e,#f59e0b)] p-5 text-white shadow-sm md:p-8">
        <div className="max-w-3xl space-y-4">
          <Badge className="bg-white text-slate-950 hover:bg-white">
            {shop.mapArea}
          </Badge>
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-amber-100">
              <Store className="size-4" />
              SHOP DETAIL
            </div>
            <h1 className="mt-2 text-3xl font-semibold tracking-normal md:text-5xl">
              {shop.name}
            </h1>
          </div>
          <p className="text-sm leading-6 text-slate-100 md:text-base">
            {shop.description}
          </p>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="rounded-lg border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="size-5 text-sky-700" />
              出店場所
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-md border bg-slate-950 p-4 text-white">
              <Badge className="bg-amber-400 text-slate-950 hover:bg-amber-400">
                {shop.mapArea}
              </Badge>
              <p className="mt-4 text-lg font-semibold">{shop.location}</p>
              <p className="mt-1 text-sm text-slate-300">
                グルメマップ上のエリア番号を目印にお越しください。
              </p>
            </div>
            {snsLinks.length > 0 ? (
              <div className="grid gap-2">
                {snsLinks.map((item) => (
                  <Button asChild key={item.label} variant="outline">
                    <Link href={item.href}>
                      <item.icon className="size-4" />
                      {item.label}
                    </Link>
                  </Button>
                ))}
              </div>
            ) : null}
          </CardContent>
        </Card>

        <Card className="rounded-lg border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Utensils className="size-5 text-sky-700" />
              取扱商品一覧
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            {shopProducts.map((product) => (
              <Link
                className="rounded-md border bg-white p-4 transition-colors hover:bg-slate-50"
                href={`/gourmet/items/${product.id}`}
                key={product.id}
              >
                <Badge variant="secondary">{product.genre}</Badge>
                <div className="mt-3 flex items-start justify-between gap-3">
                  <h2 className="font-semibold">{product.name}</h2>
                  <p className="shrink-0 font-semibold">
                    {product.price.toLocaleString()}円
                  </p>
                </div>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                  {product.description}
                </p>
              </Link>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
