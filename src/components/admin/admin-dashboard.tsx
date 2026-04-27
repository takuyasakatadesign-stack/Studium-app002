"use client";

import {
  BadgeJapaneseYen,
  Building2,
  ClipboardList,
  Megaphone,
  Save,
  Store,
  Ticket,
  Users,
} from "lucide-react";
import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useStadiumData } from "@/components/providers/stadium-data-provider";

const tabs = [
  "運営担当",
  "グッズ担当",
  "グルメ担当",
  "営業担当",
  "事業担当",
  "広報担当",
] as const;

export function AdminDashboard() {
  const {
    data,
    setFoodItems,
    setGates,
    setGoodsItems,
    setNewsItems,
    setShops,
    setStaffEquipment,
    setTickets,
    setTimelineItems,
    setVipRooms,
  } = useStadiumData();
  const timelines = data.timelineItems;
  const gates = data.internalOperationInfo.gates;
  const staffEquipment = data.internalOperationInfo.staffEquipment;
  const goods = data.goodsItems;
  const shopList = data.shops;
  const foods = data.foodItems;
  const vipRooms = data.internalOperationInfo.vipRooms;
  const tickets = data.internalOperationInfo.tickets;
  const news = data.newsItems;
  const users = data.users;
  const [savedArea, setSavedArea] = useState<string | null>(null);

  const shopStaffUsers = users.filter((user) => user.role === "shop_staff");

  const save = (area: string) => {
    setSavedArea(area);
  };

  return (
    <Tabs defaultValue="運営担当" className="space-y-6">
      <div className="rounded-lg border bg-card p-2">
        <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1 bg-transparent">
          {tabs.map((tab) => (
            <TabsTrigger
              className="min-w-24 flex-1 px-3 py-2 sm:min-w-28 sm:flex-none"
              key={tab}
              value={tab}
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      <StatusBar savedArea={savedArea} />

      <TabsContent value="運営担当">
        <TabShell
          description="試合当日の進行、入場口、スタッフ・備品を管理します。"
          icon={ClipboardList}
          title="運営担当"
        >
          <AdminCard
            actionLabel="運営情報を保存"
            onSave={() => save("運営担当")}
            title="タイムスケジュール"
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-sm">
                <thead className="text-left text-muted-foreground">
                  <tr className="border-b">
                    <th className="py-2 pr-3">時刻</th>
                    <th className="py-2 pr-3">イベント・業務名</th>
                    <th className="py-2 pr-3">場所</th>
                    <th className="py-2">業務内容</th>
                  </tr>
                </thead>
                <tbody>
                  {timelines.map((item, index) => (
                    <tr className="border-b last:border-b-0" key={item.id}>
                      <td className="py-3 pr-3">
                        <Input
                          value={item.time}
                          onChange={(event) =>
                            updateArrayItem(setTimelineItems, index, {
                              time: event.target.value,
                            })
                          }
                        />
                      </td>
                      <td className="py-3 pr-3">
                        <Input
                          value={item.title}
                          onChange={(event) =>
                            updateArrayItem(setTimelineItems, index, {
                              title: event.target.value,
                            })
                          }
                        />
                      </td>
                      <td className="py-3 pr-3">
                        <Input
                          value={item.location}
                          onChange={(event) =>
                            updateArrayItem(setTimelineItems, index, {
                              location: event.target.value,
                            })
                          }
                        />
                      </td>
                      <td className="py-3">
                        <Input
                          value={item.description}
                          onChange={(event) =>
                            updateArrayItem(setTimelineItems, index, {
                              description: event.target.value,
                            })
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AdminCard>

          <div className="grid gap-4 lg:grid-cols-2">
            <AdminCard
              actionLabel="ゲート管理を保存"
              onSave={() => save("ゲート管理")}
              title="ゲート管理"
            >
              <div className="space-y-4">
                {gates.map((gate, index) => (
                  <div className="grid gap-3 rounded-md border p-3" key={gate.id}>
                    <Field label="ゲート名">
                      <Input
                        value={gate.name}
                        onChange={(event) =>
                          updateArrayItem(setGates, index, {
                            name: event.target.value,
                          })
                        }
                      />
                    </Field>
                    <div className="grid gap-3 md:grid-cols-2">
                      <Field label="開門時刻">
                        <Input
                          value={gate.openTime}
                          onChange={(event) =>
                            updateArrayItem(setGates, index, {
                              openTime: event.target.value,
                            })
                          }
                        />
                      </Field>
                      <Field label="レーン構成">
                        <Input
                          value={gate.lanes}
                          onChange={(event) =>
                            updateArrayItem(setGates, index, {
                              lanes: event.target.value,
                            })
                          }
                        />
                      </Field>
                    </div>
                  </div>
                ))}
              </div>
            </AdminCard>

            <AdminCard
              actionLabel="スタッフ配置を保存"
              onSave={() => save("スタッフ配置")}
              title="スタッフ配置・備品"
            >
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="無線機">
                  <Input
                    type="number"
                    value={staffEquipment.radios}
                    onChange={(event) =>
                      setStaffEquipment((current) => ({
                        ...current,
                        radios: Number(event.target.value),
                      }))
                    }
                  />
                </Field>
                <Field label="ボランティア人数">
                  <Input
                    type="number"
                    value={staffEquipment.volunteers}
                    onChange={(event) =>
                      setStaffEquipment((current) => ({
                        ...current,
                        volunteers: Number(event.target.value),
                      }))
                    }
                  />
                </Field>
                <Field className="md:col-span-2" label="備品発注">
                  <Textarea
                    value={staffEquipment.equipmentOrders.join("\n")}
                    onChange={(event) =>
                      setStaffEquipment((current) => ({
                        ...current,
                        equipmentOrders: event.target.value.split("\n"),
                      }))
                    }
                  />
                </Field>
                <Field className="md:col-span-2" label="のぼり旗・看板">
                  <Textarea
                    value={staffEquipment.flagsAndSigns}
                    onChange={(event) =>
                      setStaffEquipment((current) => ({
                        ...current,
                        flagsAndSigns: event.target.value,
                      }))
                    }
                  />
                </Field>
              </div>
            </AdminCard>
          </div>
        </TabShell>
      </TabsContent>

      <TabsContent value="グッズ担当">
        <TabShell
          description="公開画面に出す販売グッズ、新商品、グッズイベントを管理します。"
          icon={BadgeJapaneseYen}
          title="グッズ担当"
        >
          <AdminCard
            actionLabel="グッズ情報を保存"
            onSave={() => save("グッズ担当")}
            title="販売グッズ・新商品情報"
          >
            <div className="grid gap-4 lg:grid-cols-2">
              {goods.map((item, index) => (
                <div className="grid gap-3 rounded-md border p-3" key={item.id}>
                  <Field label="商品名">
                    <Input
                      value={item.name}
                      onChange={(event) =>
                        updateArrayItem(setGoodsItems, index, {
                          name: event.target.value,
                        })
                      }
                    />
                  </Field>
                  <div className="grid gap-3 md:grid-cols-2">
                    <Field label="金額">
                      <Input
                        type="number"
                        value={item.price}
                        onChange={(event) =>
                          updateArrayItem(setGoodsItems, index, {
                            price: Number(event.target.value),
                          })
                        }
                      />
                    </Field>
                    <Field label="販売場所">
                      <Input
                        value={item.saleLocation}
                        onChange={(event) =>
                          updateArrayItem(setGoodsItems, index, {
                            saleLocation: event.target.value,
                          })
                        }
                      />
                    </Field>
                  </div>
                  <Field label="説明">
                    <Textarea
                      value={item.description}
                      onChange={(event) =>
                        updateArrayItem(setGoodsItems, index, {
                          description: event.target.value,
                        })
                      }
                    />
                  </Field>
                  <Badge variant={item.isNew ? "default" : "secondary"}>
                    {item.isNew ? "新商品" : "通常商品"}
                  </Badge>
                </div>
              ))}
            </div>
          </AdminCard>

          <AdminCard
            actionLabel="グッズイベントを保存"
            onSave={() => save("グッズイベント")}
            title="グッズイベント"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="イベント名">
                <Input defaultValue="限定カードプレゼントキャンペーン" />
              </Field>
              <Field label="実施場所">
                <Input defaultValue="グッズ売店 全店" />
              </Field>
              <Field className="md:col-span-2" label="内容">
                <Textarea defaultValue="3,000円以上購入した方に限定カードをプレゼント。" />
              </Field>
            </div>
          </AdminCard>
        </TabShell>
      </TabsContent>

      <TabsContent value="グルメ担当">
        <TabShell
          description="ファン向けグルメページと売店スタッフ管理の元データを管理します。"
          icon={Store}
          title="グルメ担当"
        >
          <AdminCard
            actionLabel="売店情報を保存"
            onSave={() => save("売店情報")}
            title="売店情報"
          >
            <div className="grid gap-4 lg:grid-cols-3">
              {shopList.map((shop, index) => (
                <div className="grid gap-3 rounded-md border p-3" key={shop.id}>
                  <Field label="売店名">
                    <Input
                      value={shop.name}
                      onChange={(event) =>
                        updateArrayItem(setShops, index, {
                          name: event.target.value,
                        })
                      }
                    />
                  </Field>
                  <Field label="出店場所">
                    <Input
                      value={shop.location}
                      onChange={(event) =>
                        updateArrayItem(setShops, index, {
                          location: event.target.value,
                        })
                      }
                    />
                  </Field>
                  <Field label="紹介文">
                    <Textarea
                      value={shop.description}
                      onChange={(event) =>
                        updateArrayItem(setShops, index, {
                          description: event.target.value,
                        })
                      }
                    />
                  </Field>
                </div>
              ))}
            </div>
          </AdminCard>

          <AdminCard
            actionLabel="商品情報を保存"
            onSave={() => save("商品情報")}
            title="商品情報"
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-sm">
                <thead className="text-left text-muted-foreground">
                  <tr className="border-b">
                    <th className="py-2 pr-3">商品名</th>
                    <th className="py-2 pr-3">ジャンル</th>
                    <th className="py-2 pr-3">金額</th>
                    <th className="py-2">説明</th>
                  </tr>
                </thead>
                <tbody>
                  {foods.map((food, index) => (
                    <tr className="border-b last:border-b-0" key={food.id}>
                      <td className="py-3 pr-3">
                        <Input
                          value={food.name}
                          onChange={(event) =>
                            updateArrayItem(setFoodItems, index, {
                              name: event.target.value,
                            })
                          }
                        />
                      </td>
                      <td className="py-3 pr-3">
                        <Input
                          value={food.genre}
                          onChange={(event) =>
                            updateArrayItem(setFoodItems, index, {
                              genre: event.target.value,
                            })
                          }
                        />
                      </td>
                      <td className="py-3 pr-3">
                        <Input
                          type="number"
                          value={food.price}
                          onChange={(event) =>
                            updateArrayItem(setFoodItems, index, {
                              price: Number(event.target.value),
                            })
                          }
                        />
                      </td>
                      <td className="py-3">
                        <Input
                          value={food.description}
                          onChange={(event) =>
                            updateArrayItem(setFoodItems, index, {
                              description: event.target.value,
                            })
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AdminCard>

          <AdminCard
            actionLabel="売店スタッフ情報を保存"
            onSave={() => save("売店スタッフ情報")}
            title="売店スタッフ情報"
          >
            <div className="grid gap-3 md:grid-cols-2">
              {shopStaffUsers.map((user) => (
                <div className="rounded-md border p-3" key={user.id}>
                  <p className="font-semibold">{user.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{user.email}</p>
                  <Badge className="mt-3" variant="secondary">
                    担当売店: {shopList.find((shop) => shop.id === user.shopId)?.name}
                  </Badge>
                </div>
              ))}
            </div>
          </AdminCard>
        </TabShell>
      </TabsContent>

      <TabsContent value="営業担当">
        <TabShell
          description="VIP、諸室、スポンサー関連の当日運用情報を管理します。"
          icon={Building2}
          title="営業担当"
        >
          <AdminCard
            actionLabel="VIP・諸室情報を保存"
            onSave={() => save("営業担当")}
            title="VIP管理・諸室管理"
          >
            <div className="grid gap-4 lg:grid-cols-2">
              {vipRooms.map((room, index) => (
                <div className="grid gap-3 rounded-md border p-3" key={room.id}>
                  <Field label="諸室名">
                    <Input
                      value={room.roomName}
                      onChange={(event) =>
                        updateArrayItem(setVipRooms, index, {
                          roomName: event.target.value,
                        })
                      }
                    />
                  </Field>
                  <Field label="利用者">
                    <Input
                      value={room.userName}
                      onChange={(event) =>
                        updateArrayItem(setVipRooms, index, {
                          userName: event.target.value,
                        })
                      }
                    />
                  </Field>
                  <Field label="利用人数">
                    <Input
                      type="number"
                      value={room.guestCount}
                      onChange={(event) =>
                        updateArrayItem(setVipRooms, index, {
                          guestCount: Number(event.target.value),
                        })
                      }
                    />
                  </Field>
                  <Field label="サービス内容">
                    <Input
                      value={room.service}
                      onChange={(event) =>
                        updateArrayItem(setVipRooms, index, {
                          service: event.target.value,
                        })
                      }
                    />
                  </Field>
                </div>
              ))}
            </div>
          </AdminCard>

          <AdminCard
            actionLabel="スポンサー情報を保存"
            onSave={() => save("スポンサー情報")}
            title="スポンサー情報"
          >
            <div className="grid gap-4 md:grid-cols-3">
              <Field label="スポンサー名">
                <Input defaultValue="スポンサー A社" />
              </Field>
              <Field label="掲出場所">
                <Input defaultValue="メインスタンド前ブース" />
              </Field>
              <Field label="担当部署">
                <Input defaultValue="営業担当" />
              </Field>
            </div>
          </AdminCard>
        </TabShell>
      </TabsContent>

      <TabsContent value="事業担当">
        <TabShell
          description="チケット、ファンクラブ、集合イベントの案内情報を管理します。"
          icon={Ticket}
          title="事業担当"
        >
          <AdminCard
            actionLabel="チケット情報を保存"
            onSave={() => save("チケット情報")}
            title="チケット情報"
          >
            <div className="grid gap-4 lg:grid-cols-2">
              {tickets.map((ticket, index) => (
                <div className="grid gap-3 rounded-md border p-3" key={ticket.id}>
                  <Field label="特殊チケット名">
                    <Input
                      value={ticket.name}
                      onChange={(event) =>
                        updateArrayItem(setTickets, index, {
                          name: event.target.value,
                        })
                      }
                    />
                  </Field>
                  <div className="grid gap-3 md:grid-cols-2">
                    <Field label="金額">
                      <Input
                        type="number"
                        value={ticket.price}
                        onChange={(event) =>
                          updateArrayItem(setTickets, index, {
                            price: Number(event.target.value),
                          })
                        }
                      />
                    </Field>
                    <Field label="枚数">
                      <Input
                        type="number"
                        value={ticket.quantity}
                        onChange={(event) =>
                          updateArrayItem(setTickets, index, {
                            quantity: Number(event.target.value),
                          })
                        }
                      />
                    </Field>
                  </div>
                  <Field label="特典">
                    <Input
                      value={ticket.benefit}
                      onChange={(event) =>
                        updateArrayItem(setTickets, index, {
                          benefit: event.target.value,
                        })
                      }
                    />
                  </Field>
                  <Field label="引き換え方法">
                    <Textarea
                      value={ticket.exchangeMethod}
                      onChange={(event) =>
                        updateArrayItem(setTickets, index, {
                          exchangeMethod: event.target.value,
                        })
                      }
                    />
                  </Field>
                </div>
              ))}
            </div>
          </AdminCard>

          <AdminCard
            actionLabel="ファンクラブ情報を保存"
            onSave={() => save("ファンクラブ情報")}
            title="ファンクラブ情報"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="受付場所">
                <Input defaultValue="南広場 ファンクラブブース" />
              </Field>
              <Field label="受付時間">
                <Input defaultValue="15:00 - 試合終了30分後" />
              </Field>
              <Field className="md:col-span-2" label="案内内容">
                <Textarea defaultValue="来場ポイント付与、会員限定抽選会、入会受付を実施します。" />
              </Field>
            </div>
          </AdminCard>
        </TabShell>
      </TabsContent>

      <TabsContent value="広報担当">
        <TabShell
          description="NEWS、配布物、SNS告知など、公開前後の情報発信を管理します。"
          icon={Megaphone}
          title="広報担当"
        >
          <AdminCard
            actionLabel="NEWSを保存"
            onSave={() => save("NEWS")}
            title="NEWS"
          >
            <div className="grid gap-4 lg:grid-cols-3">
              {news.map((item, index) => (
                <div className="grid gap-3 rounded-md border p-3" key={item.id}>
                  <Field label="タイトル">
                    <Input
                      value={item.title}
                      onChange={(event) =>
                        updateArrayItem(setNewsItems, index, {
                          title: event.target.value,
                        })
                      }
                    />
                  </Field>
                  <div className="grid gap-3 md:grid-cols-2">
                    <Field label="日付">
                      <Input
                        value={item.date}
                        onChange={(event) =>
                          updateArrayItem(setNewsItems, index, {
                            date: event.target.value,
                          })
                        }
                      />
                    </Field>
                    <Field label="カテゴリ">
                      <Input
                        value={item.category}
                        onChange={(event) =>
                          updateArrayItem(setNewsItems, index, {
                            category: event.target.value,
                          })
                        }
                      />
                    </Field>
                  </div>
                  <Field label="本文">
                    <Textarea
                      value={item.body}
                      onChange={(event) =>
                        updateArrayItem(setNewsItems, index, {
                          body: event.target.value,
                        })
                      }
                    />
                  </Field>
                </div>
              ))}
            </div>
          </AdminCard>

          <div className="grid gap-4 lg:grid-cols-2">
            <AdminCard
              actionLabel="配布物を保存"
              onSave={() => save("配布物")}
              title="配布物"
            >
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="配布物名">
                  <Input defaultValue="マッチデープログラム" />
                </Field>
                <Field label="数量">
                  <Input defaultValue="12,000部" />
                </Field>
                <Field label="配布場所">
                  <Input defaultValue="各入場ゲート" />
                </Field>
                <Field label="納品情報">
                  <Input defaultValue="試合前日 15:00 納品" />
                </Field>
              </div>
            </AdminCard>

            <AdminCard
              actionLabel="SNS情報を保存"
              onSave={() => save("SNS情報")}
              title="SNS情報"
            >
              <div className="grid gap-4">
                <Field label="投稿予定">
                  <Input defaultValue="キックオフ3時間前 / スタメン発表 / 試合終了後" />
                </Field>
                <Field label="ハッシュタグ">
                  <Input defaultValue="#ブルーシティFC #ホームタウン感謝デー" />
                </Field>
                <Field label="投稿文">
                  <Textarea defaultValue="本日はホームタウン感謝デー。イベント、グルメ、グッズ情報をチェックしてスタジアムを楽しもう。" />
                </Field>
              </div>
            </AdminCard>
          </div>
        </TabShell>
      </TabsContent>
    </Tabs>
  );
}

function StatusBar({ savedArea }: { savedArea: string | null }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border bg-muted/40 p-3 text-sm">
      <div className="flex items-center gap-2">
        <Users className="size-4 text-muted-foreground" />
        <span>ロール制御予定: クラブ社員は担当タブ、管理者は全タブ編集</span>
      </div>
      <Badge variant={savedArea ? "default" : "secondary"}>
        {savedArea ? `${savedArea}をローカル保存済み` : "未保存"}
      </Badge>
    </div>
  );
}

function TabShell({
  children,
  description,
  icon: Icon,
  title,
}: {
  children: React.ReactNode;
  description: string;
  icon: typeof ClipboardList;
  title: string;
}) {
  return (
    <div className="space-y-5">
      <div className="rounded-lg bg-slate-950 p-5 text-white">
        <div className="flex items-center gap-2 text-sm font-semibold text-sky-200">
          <Icon className="size-4" />
          {title}
        </div>
        <p className="mt-2 max-w-3xl text-sm text-slate-300">{description}</p>
      </div>
      {children}
    </div>
  );
}

function AdminCard({
  actionLabel,
  children,
  onSave,
  title,
}: {
  actionLabel: string;
  children: React.ReactNode;
  onSave: () => void;
  title: string;
}) {
  return (
    <Card className="rounded-lg shadow-sm">
      <CardHeader className="flex flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-center">
        <CardTitle>{title}</CardTitle>
        <Button className="w-full sm:w-auto" onClick={onSave} type="button">
          <Save className="size-4" />
          {actionLabel}
        </Button>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
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

function updateArrayItem<T>(
  setter: Dispatch<SetStateAction<T[]>>,
  index: number,
  patch: Partial<T>,
) {
  setter((items) =>
    items.map((item, itemIndex) =>
      itemIndex === index ? { ...item, ...patch } : item,
    ),
  );
}
