"use client";

import {
  BadgeJapaneseYen,
  Building2,
  CheckCircle2,
  ClipboardList,
  Image as ImageIcon,
  Megaphone,
  Plus,
  Save,
  Store,
  Ticket,
  Upload,
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
import type { EventInfo, FoodItem, GoodsItem, Shop, TicketInfo } from "@/types";

const tabs = [
  {
    value: "運営担当",
    label: "運営担当",
    description: "進行、イベント、入場口、備品",
    icon: ClipboardList,
  },
  {
    value: "グッズ担当",
    label: "グッズ担当",
    description: "商品、画像、掲載管理",
    icon: BadgeJapaneseYen,
  },
  {
    value: "グルメ担当",
    label: "グルメ担当",
    description: "売店、商品、スタッフ",
    icon: Store,
  },
  {
    value: "営業担当",
    label: "営業担当",
    description: "VIP、諸室、スポンサー",
    icon: Building2,
  },
  {
    value: "事業担当",
    label: "事業担当",
    description: "チケット、ファンクラブ",
    icon: Ticket,
  },
  {
    value: "広報担当",
    label: "広報担当",
    description: "NEWS、配布物、SNS",
    icon: Megaphone,
  },
] as const;

type AdminTab = (typeof tabs)[number]["value"];

export function AdminDashboard() {
  const {
    data,
    setEventInfo,
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
  const events = data.eventInfo;
  const gates = data.internalOperationInfo.gates;
  const staffEquipment = data.internalOperationInfo.staffEquipment;
  const goods = data.goodsItems;
  const shopList = data.shops;
  const foods = data.foodItems;
  const vipRooms = data.internalOperationInfo.vipRooms;
  const tickets = data.internalOperationInfo.tickets;
  const news = data.newsItems;
  const users = data.users;
  const [activeTab, setActiveTab] = useState<AdminTab>("運営担当");
  const [savedArea, setSavedArea] = useState<string | null>(null);

  const shopStaffUsers = users.filter((user) => user.role === "shop_staff");

  const save = (area: string) => {
    setSavedArea(area);
  };

  return (
    <Tabs
      orientation="vertical"
      value={activeTab}
      onValueChange={(value) => setActiveTab(value as AdminTab)}
      className="grid gap-6 lg:grid-cols-[260px_1fr] lg:items-start"
    >
      <aside className="rounded-lg border bg-white p-3 shadow-sm">
        <div className="px-2 pb-3">
          <p className="text-xs font-semibold text-muted-foreground">管理メニュー</p>
          <h2 className="mt-1 text-lg font-semibold">試合日情報編集</h2>
        </div>
        <TabsList className="flex h-auto w-full flex-col items-stretch gap-1 bg-transparent p-0">
          {tabs.map((tab) => (
            <TabsTrigger
              className="h-auto w-full justify-start rounded-md px-3 py-3 text-left data-active:border-slate-900 data-active:bg-slate-950 data-active:text-white"
              key={tab.value}
              value={tab.value}
            >
              <tab.icon className="size-4" />
              <span className="min-w-0">
                <span className="block font-semibold">{tab.label}</span>
                <span className="block truncate text-xs opacity-70">
                  {tab.description}
                </span>
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
      </aside>

      <div className="space-y-6">
        <StatusBar activeTab={activeTab} savedArea={savedArea} />

        <TabsContent value="運営担当">
          <TabShell
            description="試合当日の進行、イベント掲載、入場口、スタッフ・備品を管理します。"
            icon={ClipboardList}
            title="運営担当"
          >
            <AdminCard
              actionLabel="進行情報を保存"
              onSave={() => save("運営担当")}
              title="タイムスケジュール"
              description="時刻、業務名、場所、説明を現場確認用に入力します。"
              headerAction={
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    setTimelineItems((items) => [
                      ...items,
                      {
                        id: `timeline-${Date.now()}`,
                        matchId: data.match.id,
                        time: "",
                        title: "",
                        description: "",
                        location: "",
                      },
                    ])
                  }
                >
                  <Plus className="size-4" />
                  行を追加
                </Button>
              }
            >
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px] text-sm">
                  <thead className="bg-muted/60 text-left text-muted-foreground">
                    <tr>
                      <th className="px-3 py-2">時刻</th>
                      <th className="px-3 py-2">イベント・業務名</th>
                      <th className="px-3 py-2">場所</th>
                      <th className="px-3 py-2">業務内容</th>
                    </tr>
                  </thead>
                  <tbody>
                    {timelines.map((item, index) => (
                      <tr className="border-t" key={item.id}>
                        <td className="px-3 py-3">
                          <Input
                            placeholder="15:00"
                            value={item.time}
                            onChange={(event) =>
                              updateArrayItem(setTimelineItems, index, {
                                time: event.target.value,
                              })
                            }
                          />
                        </td>
                        <td className="px-3 py-3">
                          <Input
                            placeholder="場外イベント開始"
                            value={item.title}
                            onChange={(event) =>
                              updateArrayItem(setTimelineItems, index, {
                                title: event.target.value,
                              })
                            }
                          />
                        </td>
                        <td className="px-3 py-3">
                          <Input
                            placeholder="南広場"
                            value={item.location}
                            onChange={(event) =>
                              updateArrayItem(setTimelineItems, index, {
                                location: event.target.value,
                              })
                            }
                          />
                        </td>
                        <td className="px-3 py-3">
                          <Input
                            placeholder="来場者向けに公開する説明"
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

            <AdminCard
              actionLabel="イベント情報を保存"
              onSave={() => save("イベント情報")}
              title="イベント掲載情報"
              description="トップページに掲載するイベント、画像、参加条件を管理します。"
              headerAction={
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    setEventInfo((items) => [
                      ...items,
                      {
                        id: `event-${Date.now()}`,
                        matchId: data.match.id,
                        category: "basic",
                        title: "",
                        department: "運営担当",
                        location: "",
                        startTime: "",
                        description: "",
                        participationRule: "",
                        showOnTop: true,
                      },
                    ])
                  }
                >
                  <Plus className="size-4" />
                  イベントを追加
                </Button>
              }
            >
              <div className="grid gap-4 xl:grid-cols-2">
                {events.map((eventItem, index) => (
                  <div className="grid gap-4 rounded-md border p-4" key={eventItem.id}>
                    <div className="grid gap-4 md:grid-cols-2">
                      <Field label="イベント名">
                        <Input
                          placeholder="ホームタウン感謝ステージ"
                          value={eventItem.title}
                          onChange={(event) =>
                            updateArrayItem(setEventInfo, index, {
                              title: event.target.value,
                            })
                          }
                        />
                      </Field>
                      <Field label="区分">
                        <select
                          className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm"
                          value={eventItem.category}
                          onChange={(event) =>
                            updateArrayItem(setEventInfo, index, {
                              category: event.target.value as EventInfo["category"],
                            })
                          }
                        >
                          <option value="special">特設イベント</option>
                          <option value="basic">基本イベント</option>
                          <option value="booth">ブース</option>
                          <option value="gathering">集合イベント</option>
                        </select>
                      </Field>
                      <Field label="開始時刻">
                        <Input
                          placeholder="15:30"
                          value={eventItem.startTime}
                          onChange={(event) =>
                            updateArrayItem(setEventInfo, index, {
                              startTime: event.target.value,
                            })
                          }
                        />
                      </Field>
                      <Field label="実施場所">
                        <Input
                          placeholder="南広場ステージ"
                          value={eventItem.location}
                          onChange={(event) =>
                            updateArrayItem(setEventInfo, index, {
                              location: event.target.value,
                            })
                          }
                        />
                      </Field>
                    </div>
                    <Field label="説明文">
                      <Textarea
                        placeholder="公開ページに掲載する説明"
                        value={eventItem.description}
                        onChange={(event) =>
                          updateArrayItem(setEventInfo, index, {
                            description: event.target.value,
                          })
                        }
                      />
                    </Field>
                    <ImageUploadField
                      imageUrl={eventItem.imageUrl}
                      label="イベント画像"
                      onChange={(imageUrl) =>
                        updateArrayItem(setEventInfo, index, { imageUrl })
                      }
                    />
                    <PublishField
                      checked={eventItem.showOnTop !== false}
                      label="トップページに掲載する"
                      onChange={(checked) =>
                        updateArrayItem(setEventInfo, index, { showOnTop: checked })
                      }
                    />
                  </div>
                ))}
              </div>
            </AdminCard>

            <div className="grid gap-4 lg:grid-cols-2">
              <AdminCard
                actionLabel="ゲート管理を保存"
                onSave={() => save("ゲート管理")}
                title="ゲート管理"
                description="開門時刻とレーン構成を入力します。"
              >
                <div className="space-y-4">
                  {gates.map((gate, index) => (
                    <div className="grid gap-3 rounded-md border p-4" key={gate.id}>
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
                description="当日の備品数量と発注内容を管理します。"
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="無線機 台数">
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
                  <Field className="md:col-span-2" label="備品発注リスト">
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
            description="販売グッズ、新商品、掲載画像、トップページ掲載可否を管理します。"
            icon={BadgeJapaneseYen}
            title="グッズ担当"
          >
            <AdminCard
              actionLabel="グッズ情報を保存"
              onSave={() => save("グッズ担当")}
              title="販売グッズ"
              description="掲載数の制限はありません。必要に応じて商品を追加してください。"
              headerAction={
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    setGoodsItems((items) => [
                      ...items,
                      createGoodsItem(data.match.id),
                    ])
                  }
                >
                  <Plus className="size-4" />
                  グッズを追加
                </Button>
              }
            >
              <div className="grid gap-4 xl:grid-cols-2">
                {goods.map((item, index) => (
                  <div className="grid gap-4 rounded-md border p-4" key={item.id}>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <Badge variant={item.isNew ? "default" : "secondary"}>
                        {item.isNew ? "新商品" : "通常商品"}
                      </Badge>
                      <PublishField
                        checked={item.showOnTop !== false}
                        label="トップページに掲載"
                        onChange={(checked) =>
                          updateArrayItem(setGoodsItems, index, {
                            showOnTop: checked,
                          })
                        }
                      />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
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
                      <Field label="販売価格 円">
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
                      <Field label="販売場所" className="md:col-span-2">
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
                    <Field label="商品説明">
                      <Textarea
                        value={item.description}
                        onChange={(event) =>
                          updateArrayItem(setGoodsItems, index, {
                            description: event.target.value,
                          })
                        }
                      />
                    </Field>
                    <ImageUploadField
                      imageUrl={item.imageUrl}
                      label="グッズ画像"
                      onChange={(imageUrl) =>
                        updateArrayItem(setGoodsItems, index, { imageUrl })
                      }
                    />
                    <PublishField
                      checked={item.isNew}
                      label="新商品として表示する"
                      onChange={(checked) =>
                        updateArrayItem(setGoodsItems, index, { isNew: checked })
                      }
                    />
                  </div>
                ))}
              </div>
            </AdminCard>
          </TabShell>
        </TabsContent>

        <TabsContent value="グルメ担当">
          <TabShell
            description="売店情報、商品情報、売店スタッフ情報を分けて管理します。"
            icon={Store}
            title="グルメ担当"
          >
            <AdminCard
              actionLabel="売店情報を保存"
              onSave={() => save("売店情報")}
              title="売店情報"
              description="売店名、出店場所、紹介文を管理します。"
              headerAction={
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    setShops((items) => [...items, createShop(data.match.id)])
                  }
                >
                  <Plus className="size-4" />
                  売店を追加
                </Button>
              }
            >
              <div className="grid gap-4 xl:grid-cols-3">
                {shopList.map((shop, index) => (
                  <div className="grid gap-3 rounded-md border p-4" key={shop.id}>
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
                    <Field label="マップ番号">
                      <Input
                        value={shop.mapArea}
                        onChange={(event) =>
                          updateArrayItem(setShops, index, {
                            mapArea: event.target.value,
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
              description="商品画像、価格、ジャンル、トップページ掲載可否を管理します。"
              headerAction={
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    setFoodItems((items) => [
                      ...items,
                      createFoodItem(data.match.id, shopList[0]?.id ?? ""),
                    ])
                  }
                >
                  <Plus className="size-4" />
                  商品を追加
                </Button>
              }
            >
              <div className="grid gap-4 xl:grid-cols-2">
                {foods.map((food, index) => (
                  <div className="grid gap-4 rounded-md border p-4" key={food.id}>
                    <div className="grid gap-4 md:grid-cols-2">
                      <Field label="商品名">
                        <Input
                          value={food.name}
                          onChange={(event) =>
                            updateArrayItem(setFoodItems, index, {
                              name: event.target.value,
                            })
                          }
                        />
                      </Field>
                      <Field label="販売売店">
                        <select
                          className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm"
                          value={food.shopId}
                          onChange={(event) =>
                            updateArrayItem(setFoodItems, index, {
                              shopId: event.target.value,
                            })
                          }
                        >
                          {shopList.map((shop) => (
                            <option key={shop.id} value={shop.id}>
                              {shop.name}
                            </option>
                          ))}
                        </select>
                      </Field>
                      <Field label="ジャンル">
                        <Input
                          value={food.genre}
                          onChange={(event) =>
                            updateArrayItem(setFoodItems, index, {
                              genre: event.target.value,
                            })
                          }
                        />
                      </Field>
                      <Field label="販売価格 円">
                        <Input
                          type="number"
                          value={food.price}
                          onChange={(event) =>
                            updateArrayItem(setFoodItems, index, {
                              price: Number(event.target.value),
                            })
                          }
                        />
                      </Field>
                    </div>
                    <Field label="商品説明">
                      <Textarea
                        value={food.description}
                        onChange={(event) =>
                          updateArrayItem(setFoodItems, index, {
                            description: event.target.value,
                          })
                        }
                      />
                    </Field>
                    <ImageUploadField
                      imageUrl={food.imageUrl}
                      label="商品画像"
                      onChange={(imageUrl) =>
                        updateArrayItem(setFoodItems, index, { imageUrl })
                      }
                    />
                    <PublishField
                      checked={food.showOnTop !== false}
                      label="トップページに掲載する"
                      onChange={(checked) =>
                        updateArrayItem(setFoodItems, index, { showOnTop: checked })
                      }
                    />
                  </div>
                ))}
              </div>
            </AdminCard>

            <AdminCard
              actionLabel="売店スタッフ情報を保存"
              onSave={() => save("売店スタッフ情報")}
              title="売店スタッフ情報"
              description="プロトタイプではユーザー追加は未接続です。担当売店の確認用として表示しています。"
            >
              <div className="grid gap-3 md:grid-cols-2">
                {shopStaffUsers.map((user) => (
                  <div className="rounded-md border p-4" key={user.id}>
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
              description="利用者、人数、サービス内容を入力します。"
            >
              <div className="grid gap-4 lg:grid-cols-2">
                {vipRooms.map((room, index) => (
                  <div className="grid gap-3 rounded-md border p-4" key={room.id}>
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
              description="現在は仮入力欄です。DB接続時に保存対象へ拡張します。"
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
              description="特殊チケット、数量、特典、引き換え方法を管理します。"
              headerAction={
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    setTickets((items) => [...items, createTicketItem()])
                  }
                >
                  <Plus className="size-4" />
                  チケットを追加
                </Button>
              }
            >
              <div className="grid gap-4 lg:grid-cols-2">
                {tickets.map((ticketInfo, index) => (
                  <div className="grid gap-3 rounded-md border p-4" key={ticketInfo.id}>
                    <Field label="特殊チケット名">
                      <Input
                        value={ticketInfo.name}
                        onChange={(event) =>
                          updateArrayItem(setTickets, index, {
                            name: event.target.value,
                          })
                        }
                      />
                    </Field>
                    <div className="grid gap-3 md:grid-cols-2">
                      <Field label="金額 円">
                        <Input
                          type="number"
                          value={ticketInfo.price}
                          onChange={(event) =>
                            updateArrayItem(setTickets, index, {
                              price: Number(event.target.value),
                            })
                          }
                        />
                      </Field>
                      <Field label="販売枚数">
                        <Input
                          type="number"
                          value={ticketInfo.quantity}
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
                        value={ticketInfo.benefit}
                        onChange={(event) =>
                          updateArrayItem(setTickets, index, {
                            benefit: event.target.value,
                          })
                        }
                      />
                    </Field>
                    <Field label="引き換え方法">
                      <Textarea
                        value={ticketInfo.exchangeMethod}
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
              description="現在は仮入力欄です。DB接続時に保存対象へ拡張します。"
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
              description="公開画面に掲載するお知らせを管理します。"
              headerAction={
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    setNewsItems((items) => [
                      ...items,
                      {
                        id: `news-${Date.now()}`,
                        matchId: data.match.id,
                        title: "",
                        date: "",
                        category: "",
                        body: "",
                      },
                    ])
                  }
                >
                  <Plus className="size-4" />
                  NEWSを追加
                </Button>
              }
            >
              <div className="grid gap-4 lg:grid-cols-3">
                {news.map((item, index) => (
                  <div className="grid gap-3 rounded-md border p-4" key={item.id}>
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
                description="現在は仮入力欄です。DB接続時に保存対象へ拡張します。"
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
                description="現在は仮入力欄です。DB接続時に保存対象へ拡張します。"
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
      </div>
    </Tabs>
  );
}

function StatusBar({
  activeTab,
  savedArea,
}: {
  activeTab: string;
  savedArea: string | null;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border bg-white p-4 text-sm shadow-sm">
      <div className="flex items-center gap-2">
        <Users className="size-4 text-muted-foreground" />
        <span>
          現在の編集領域: <span className="font-semibold">{activeTab}</span>
        </span>
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
      <div className="rounded-lg border bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <Icon className="size-4" />
          {title}
        </div>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          {description}
        </p>
      </div>
      {children}
    </div>
  );
}

function AdminCard({
  actionLabel,
  children,
  description,
  headerAction,
  onSave,
  title,
}: {
  actionLabel: string;
  children: React.ReactNode;
  description?: string;
  headerAction?: React.ReactNode;
  onSave: () => void;
  title: string;
}) {
  return (
    <Card className="rounded-lg shadow-sm">
      <CardHeader className="flex flex-col items-stretch justify-between gap-4 border-b sm:flex-row sm:items-start">
        <div>
          <CardTitle>{title}</CardTitle>
          {description ? (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          {headerAction}
          <Button className="w-full sm:w-auto" onClick={onSave} type="button">
            <Save className="size-4" />
            {actionLabel}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-5">{children}</CardContent>
    </Card>
  );
}

function Field({
  children,
  className,
  hint,
  label,
}: {
  children: React.ReactNode;
  className?: string;
  hint?: string;
  label: string;
}) {
  return (
    <div className={`space-y-2 ${className ?? ""}`}>
      <Label>{label}</Label>
      {children}
      {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

function PublishField({
  checked,
  label,
  onChange,
}: {
  checked: boolean;
  label: string;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-2 rounded-md border bg-muted/30 px-3 py-2 text-sm">
      <input
        checked={checked}
        className="size-4"
        type="checkbox"
        onChange={(event) => onChange(event.target.checked)}
      />
      <span>{label}</span>
      {checked ? <CheckCircle2 className="ml-auto size-4 text-emerald-600" /> : null}
    </label>
  );
}

function ImageUploadField({
  imageUrl,
  label,
  onChange,
}: {
  imageUrl?: string;
  label: string;
  onChange: (imageUrl: string) => void;
}) {
  return (
    <div className="grid gap-3 rounded-md border bg-muted/20 p-3">
      <div className="flex items-center gap-2 text-sm font-medium">
        <ImageIcon className="size-4 text-muted-foreground" />
        {label}
      </div>
      {imageUrl ? (
        <img
          alt={label}
          className="aspect-[16/9] w-full rounded-md border object-cover"
          src={imageUrl}
        />
      ) : (
        <div className="flex aspect-[16/9] items-center justify-center rounded-md border bg-white text-sm text-muted-foreground">
          画像未設定
        </div>
      )}
      <div className="grid gap-2 md:grid-cols-[1fr_auto]">
        <Input
          placeholder="画像URLを入力"
          value={imageUrl ?? ""}
          onChange={(event) => onChange(event.target.value)}
        />
        <label className="inline-flex h-8 cursor-pointer items-center justify-center gap-1.5 rounded-lg border bg-background px-2.5 text-sm font-medium hover:bg-muted">
          <Upload className="size-4" />
          画像を選択
          <input
            accept="image/*"
            className="sr-only"
            type="file"
            onChange={(event) => {
              const file = event.target.files?.[0];

              if (!file) {
                return;
              }

              const reader = new FileReader();
              reader.onload = () => {
                if (typeof reader.result === "string") {
                  onChange(reader.result);
                }
              };
              reader.readAsDataURL(file);
            }}
          />
        </label>
      </div>
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

function createGoodsItem(matchId: string): GoodsItem {
  return {
    id: `goods-${Date.now()}`,
    matchId,
    name: "",
    price: 0,
    saleLocation: "",
    description: "",
    isNew: true,
    showOnTop: true,
  };
}

function createShop(matchId: string): Shop {
  const id = `shop-${Date.now()}`;

  return {
    id,
    matchId,
    name: "",
    description: "",
    location: "",
    mapArea: "",
    snsLinks: {},
    staffUserId: "",
  };
}

function createFoodItem(matchId: string, shopId: string): FoodItem {
  return {
    id: `item-${Date.now()}`,
    matchId,
    shopId,
    name: "",
    genre: "",
    price: 0,
    description: "",
    showOnTop: true,
  };
}

function createTicketItem(): TicketInfo {
  return {
    id: `ticket-${Date.now()}`,
    name: "",
    price: 0,
    quantity: 0,
    benefit: "",
    exchangeMethod: "",
  };
}
