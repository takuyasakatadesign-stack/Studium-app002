"use client";

import { ExternalLink, LockKeyhole, MapPin, Save, Store, Utensils } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SaveToast } from "@/components/shared/save-toast";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useStadiumData } from "@/components/providers/stadium-data-provider";
import { roleLabels, type ManagementRole } from "@/lib/auth-constants";
import type { FoodItem, Shop, User } from "@/types";

type ShopAdminPanelProps = {
  currentUser: User;
  initialShop: Shop;
  role: ManagementRole;
};

export function ShopAdminPanel({
  currentUser,
  initialShop,
  role,
}: ShopAdminPanelProps) {
  const { data, setFoodItems, setShop } = useStadiumData();
  const shop = data.shops.find((item) => item.id === initialShop.id) ?? initialShop;
  const products = data.foodItems.filter((item) => item.shopId === shop.id);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const snsValue = useMemo(
    () =>
      shop.snsLinks.instagram ??
      shop.snsLinks.x ??
      shop.snsLinks.website ??
      "",
    [shop.snsLinks.instagram, shop.snsLinks.website, shop.snsLinks.x],
  );

  const save = (label: string) => {
    setSavedMessage(`${label}をローカル保存しました`);
    setToastMessage(`${label}の変更内容をローカル保存しました`);
  };

  const closeToast = useCallback(() => {
    setToastMessage(null);
  }, []);

  return (
    <div className="space-y-6">
      <SaveToast message={toastMessage} onClose={closeToast} />
      <Card className="rounded-lg border-0 bg-slate-950 text-white shadow-sm">
        <CardContent className="grid gap-4 p-5 md:grid-cols-[1fr_auto] md:items-center">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-sky-200">
              <LockKeyhole className="size-4" />
              自店舗のみ編集
            </div>
            <div>
              <h2 className="text-2xl font-semibold">{shop.name}</h2>
              <p className="mt-1 text-sm text-slate-300">
                {roleLabels[role]} / {currentUser.name} / shopId: {shop.id}
              </p>
            </div>
          </div>
          <Badge className="w-fit bg-amber-400 text-slate-950 hover:bg-amber-400">
            他店舗は非表示
          </Badge>
        </CardContent>
      </Card>

      {savedMessage ? (
        <div className="rounded-lg border bg-emerald-50 p-3 text-sm font-medium text-emerald-800">
          {savedMessage}
        </div>
      ) : null}

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Store className="size-5 text-sky-700" />
              売店情報
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="売店名">
                <Input
                  value={shop.name}
                  onChange={(event) =>
                    setShop({
                      ...shop,
                      name: event.target.value,
                    })
                  }
                />
              </Field>
              <Field label="出店場所">
                <Input
                  value={shop.location}
                  onChange={(event) =>
                    setShop({
                      ...shop,
                      location: event.target.value,
                    })
                  }
                />
              </Field>
              <Field className="md:col-span-2" label="紹介文">
                <Textarea
                  value={shop.description}
                  onChange={(event) =>
                    setShop({
                      ...shop,
                      description: event.target.value,
                    })
                  }
                />
              </Field>
              <Field className="md:col-span-2" label="SNSリンク">
                <Input
                  value={snsValue}
                  onChange={(event) =>
                    setShop({
                      ...shop,
                      snsLinks: {
                        ...shop.snsLinks,
                        instagram: event.target.value,
                      },
                    })
                  }
                />
              </Field>
            </div>
            <Button className="w-full md:w-auto" onClick={() => save("売店情報")}>
              <Save className="size-4" />
              売店情報を保存
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="size-5 text-sky-700" />
              公開ページでの見え方
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-md border bg-slate-950 p-4 text-white">
              <Badge className="bg-amber-400 text-slate-950 hover:bg-amber-400">
                {shop.mapArea}
              </Badge>
              <h3 className="mt-4 text-xl font-semibold">{shop.name}</h3>
              <p className="mt-2 text-sm text-slate-300">{shop.description}</p>
              <div className="mt-4 flex items-center gap-2 text-sm">
                <MapPin className="size-4" />
                {shop.location}
              </div>
            </div>
            {snsValue ? (
              <Button asChild variant="outline">
                <a href={snsValue}>
                  <ExternalLink className="size-4" />
                  SNSリンクを確認
                </a>
              </Button>
            ) : null}
          </CardContent>
        </Card>
      </section>

      <Card className="rounded-lg shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Utensils className="size-5 text-sky-700" />
            商品一覧
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-4 lg:grid-cols-2">
            {products.map((product, index) => (
              <div className="rounded-lg border p-4" key={product.id}>
                <div className="flex items-center justify-between gap-3">
                  <Badge variant="secondary">商品 {index + 1}</Badge>
                  <Badge variant="outline">{product.genre}</Badge>
                </div>
                <div className="mt-4 grid gap-4 md:grid-cols-[1fr_140px]">
                  <Field label="商品名">
                    <Input
                      value={product.name}
                      onChange={(event) =>
                        updateProduct(setFoodItems, products, index, {
                          name: event.target.value,
                        })
                      }
                    />
                  </Field>
                  <Field label="金額">
                    <Input
                      type="number"
                      value={product.price}
                      onChange={(event) =>
                        updateProduct(setFoodItems, products, index, {
                          price: Number(event.target.value),
                        })
                      }
                    />
                  </Field>
                  <Field label="ジャンル">
                    <Input
                      value={product.genre}
                      onChange={(event) =>
                        updateProduct(setFoodItems, products, index, {
                          genre: event.target.value,
                        })
                      }
                    />
                  </Field>
                  <Field label="公開状態">
                    <Input value="公開中" readOnly />
                  </Field>
                  <Field className="md:col-span-2" label="商品説明">
                    <Textarea
                      value={product.description}
                      onChange={(event) =>
                        updateProduct(setFoodItems, products, index, {
                          description: event.target.value,
                        })
                      }
                    />
                  </Field>
                </div>
                <Separator className="my-4" />
                <div className="rounded-md bg-muted p-3 text-sm">
                  <p className="font-semibold">{product.name}</p>
                  <p className="mt-1 text-muted-foreground">
                    {product.price.toLocaleString()}円 / {product.genre}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <Button className="w-full md:w-auto" onClick={() => save("商品情報")}>
            <Save className="size-4" />
            商品情報を保存
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function Field({
  children,
  className,
  label,
}: {
  children: React.ReactNode;
  className?: string;
  label: string;
}) {
  return (
    <div className={`space-y-2 ${className ?? ""}`}>
      <Label>{label}</Label>
      {children}
    </div>
  );
}

function updateProduct(
  setter: Dispatch<SetStateAction<FoodItem[]>>,
  scopedProducts: FoodItem[],
  index: number,
  patch: Partial<FoodItem>,
) {
  const targetProductId = scopedProducts[index]?.id;

  setter((items) =>
    items.map((item) => (item.id === targetProductId ? { ...item, ...patch } : item)),
  );
}
