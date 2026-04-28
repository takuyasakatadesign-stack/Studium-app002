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
    <div className="-mx-4 -my-5 space-y-8 bg-[linear-gradient(180deg,#020817,#06122A_48%,#00040D)] px-4 py-5 text-white sm:-mx-6 sm:-my-8 sm:px-6 sm:py-8 lg:-mx-8 lg:px-8">
      <Button asChild className="text-white hover:bg-white/10" variant="ghost">
        <Link href="/gourmet">
          <ArrowLeft className="size-4" />
          グルメトップへ戻る
        </Link>
      </Button>

      <section className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
        <Card className="overflow-hidden rounded-lg border border-cyan-200/20 bg-[#06122a] text-white shadow-2xl">
          <div className="flex aspect-[16/10] items-end bg-[linear-gradient(135deg,#020817,#003EAA,#0A7CFF)] p-5 text-white md:aspect-[16/7]">
            <div>
              <Badge className="bg-cyan-300 text-blue-950 hover:bg-cyan-300">
                {product.genre}
              </Badge>
              <h1 className="mt-3 text-3xl font-black tracking-normal md:text-5xl">
                {product.name}
              </h1>
            </div>
          </div>
          <CardContent className="space-y-5 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-3xl font-semibold text-cyan-100">
                {product.price.toLocaleString()}円
              </p>
              <Badge className="bg-white/15 text-white hover:bg-white/15">
                試合日販売
              </Badge>
            </div>
            <p className="leading-7 text-slate-300">
              {product.description}
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-lg border border-cyan-200/20 bg-white/10 text-white shadow-xl">
          <CardContent className="space-y-5 p-5">
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold text-cyan-100">
                <Store className="size-4" />
                SHOP
              </div>
              <h2 className="mt-2 text-2xl font-semibold">{shop.name}</h2>
              <p className="mt-2 text-sm text-slate-300">
                {shop.description}
              </p>
            </div>
            <div className="grid gap-3 text-sm">
              <div className="flex items-center gap-2 rounded-md border border-cyan-200/20 bg-white/10 p-3">
                <MapPin className="size-4 text-cyan-100" />
                {shop.location}
              </div>
              <div className="flex items-center gap-2 rounded-md border border-cyan-200/20 bg-white/10 p-3">
                <Utensils className="size-4 text-cyan-100" />
                グルメマップ {shop.mapArea}
              </div>
            </div>
            <Button asChild className="w-full bg-blue-600 text-white hover:bg-blue-500">
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
