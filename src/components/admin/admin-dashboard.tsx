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
import type {
  DistributionInfo,
  EquipmentPlacementInfo,
  EventInfo,
  FoodItem,
  GoodsItem,
  IrregularOperationItem,
  MediaVisitInfo,
  OperationDocument,
  Shop,
  StaffAssignmentInfo,
  TicketInfo,
  VipRoomInfo,
} from "@/types";

const tabs = [
  {
    value: "運営担当",
    label: "運営担当",
    description: "進行、入場口、スタッフ、備品",
    icon: ClipboardList,
  },
  {
    value: "イベント",
    label: "イベント",
    description: "イベント掲載、集合イベント",
    icon: Megaphone,
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
    description: "VIP、諸室、スポンサー連絡",
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
    description: "来場メディア管理",
    icon: Megaphone,
  },
] as const;

type AdminTab = (typeof tabs)[number]["value"];

export function AdminDashboard() {
  const {
    data,
    setDistributions,
    setEquipmentPlacements,
    setEventInfo,
    setFoodItems,
    setGates,
    setGoodsItems,
    setIrregularItems,
    setMediaVisits,
    setOperationDocuments,
    setOperationMapAssets,
    setShops,
    setSponsorNotes,
    setStaffAssignments,
    setTickets,
    setTimelineItems,
    setVipRooms,
  } = useStadiumData();
  const timelines = data.timelineItems;
  const events = data.eventInfo;
  const gates = data.internalOperationInfo.gates;
  const staffAssignments =
    data.internalOperationInfo.staffAssignments ?? defaultStaffAssignments();
  const equipmentPlacements =
    data.internalOperationInfo.equipmentPlacements ?? defaultEquipmentPlacements();
  const distributions = data.internalOperationInfo.distributions ?? [];
  const irregularItems = data.internalOperationInfo.irregularItems ?? [];
  const goods = data.goodsItems;
  const shopList = data.shops;
  const foods = data.foodItems;
  const vipRooms = data.internalOperationInfo.vipRooms;
  const tickets = data.internalOperationInfo.tickets;
  const mediaVisits = data.internalOperationInfo.mediaVisits ?? [];
  const sponsorNotes = data.internalOperationInfo.sponsorNotes ?? "";
  const mapAssets = data.internalOperationInfo.mapAssets ?? {};
  const operationDocuments = data.internalOperationInfo.documents ?? [];
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
            description="試合当日の進行、入場口、スタッフ配置、備品配置、配布物を管理します。"
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

            <div className="grid gap-4 lg:grid-cols-2">
              <AdminCard
                actionLabel="ゲート管理を保存"
                onSave={() => save("ゲート管理")}
                title="ゲート管理"
                description="開門時刻、レーン構成、入場対象者を入力します。"
                headerAction={
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      setGates((items) => [
                        ...items,
                        {
                          id: `gate-${Date.now()}`,
                          name: "",
                          openTime: "",
                          lanes: "",
                          targetAudience: "",
                        },
                      ])
                    }
                  >
                    <Plus className="size-4" />
                    ゲートを追加
                  </Button>
                }
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
                      <Field label="入場対象者">
                        <Textarea
                          placeholder="ホーム自由席、メインスタンド、車いす席など"
                          value={gate.targetAudience ?? ""}
                          onChange={(event) =>
                            updateArrayItem(setGates, index, {
                              targetAudience: event.target.value,
                            })
                          }
                        />
                      </Field>
                    </div>
                  ))}
                </div>
              </AdminCard>

              <AdminCard
                actionLabel="スタッフ配置を保存"
                onSave={() => save("スタッフ配置")}
                title="スタッフ配置"
                description="スタッフ種別と人数を管理します。"
                headerAction={
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      setStaffAssignments((items) => [
                        ...items,
                        { id: `staff-assignment-${Date.now()}`, label: "", count: 0 },
                      ])
                    }
                  >
                    <Plus className="size-4" />
                    項目を追加
                  </Button>
                }
              >
                <div className="grid gap-3">
                  {staffAssignments.map((assignment, index) => (
                    <div
                      className="grid gap-3 rounded-md border p-3 md:grid-cols-[1fr_140px]"
                      key={assignment.id}
                    >
                      <Field label="スタッフ種別">
                        <Input
                          placeholder="アルバイトスタッフ"
                          value={assignment.label}
                          onChange={(event) =>
                            updateArrayItem(setStaffAssignments, index, {
                              label: event.target.value,
                            })
                          }
                        />
                      </Field>
                      <Field label="人数">
                        <Input
                          type="number"
                          value={assignment.count}
                          onChange={(event) =>
                            updateArrayItem(setStaffAssignments, index, {
                              count: Number(event.target.value),
                            })
                          }
                        />
                      </Field>
                    </div>
                  ))}
                </div>
              </AdminCard>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <AdminCard
                actionLabel="備品配置を保存"
                onSave={() => save("備品配置")}
                title="備品配置"
                description="備品名、数量、設置場所、補足を管理します。"
                headerAction={
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      setEquipmentPlacements((items) => [
                        ...items,
                        createEquipmentPlacement(),
                      ])
                    }
                  >
                    <Plus className="size-4" />
                    備品を追加
                  </Button>
                }
              >
                <div className="grid gap-3">
                  {equipmentPlacements.map((equipment, index) => (
                    <div className="grid gap-3 rounded-md border p-3" key={equipment.id}>
                      <div className="grid gap-3 md:grid-cols-2">
                        <Field label="備品名">
                          <Input
                            value={equipment.name}
                            onChange={(event) =>
                              updateArrayItem(setEquipmentPlacements, index, {
                                name: event.target.value,
                              })
                            }
                          />
                        </Field>
                        <Field label="数量">
                          <Input
                            value={equipment.quantity}
                            onChange={(event) =>
                              updateArrayItem(setEquipmentPlacements, index, {
                                quantity: event.target.value,
                              })
                            }
                          />
                        </Field>
                      </div>
                      <Field label="設置場所">
                        <Input
                          value={equipment.location}
                          onChange={(event) =>
                            updateArrayItem(setEquipmentPlacements, index, {
                              location: event.target.value,
                            })
                          }
                        />
                      </Field>
                      <Field label="補足">
                        <Textarea
                          value={equipment.note ?? ""}
                          onChange={(event) =>
                            updateArrayItem(setEquipmentPlacements, index, {
                              note: event.target.value,
                            })
                          }
                        />
                      </Field>
                    </div>
                  ))}
                </div>
              </AdminCard>

              <AdminCard
                actionLabel="配布物を保存"
                onSave={() => save("配布物")}
                title="配布物"
                description="配布物名、数量、配布場所、納品情報を管理します。"
                headerAction={
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      setDistributions((items) => [...items, createDistributionItem()])
                    }
                  >
                    <Plus className="size-4" />
                    配布物を追加
                  </Button>
                }
              >
                <div className="grid gap-4">
                  {distributions.map((item, index) => (
                    <div className="grid gap-3 rounded-md border p-3" key={item.id}>
                      <div className="grid gap-3 md:grid-cols-2">
                        <Field label="配布物名">
                          <Input
                            value={item.name}
                            onChange={(event) =>
                              updateArrayItem(setDistributions, index, {
                                name: event.target.value,
                              })
                            }
                          />
                        </Field>
                        <Field label="数量">
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(event) =>
                              updateArrayItem(setDistributions, index, {
                                quantity: Number(event.target.value),
                              })
                            }
                          />
                        </Field>
                        <Field label="配布場所">
                          <Input
                            value={item.location}
                            onChange={(event) =>
                              updateArrayItem(setDistributions, index, {
                                location: event.target.value,
                              })
                            }
                          />
                        </Field>
                        <Field label="担当部署">
                          <Input
                            value={item.department}
                            onChange={(event) =>
                              updateArrayItem(setDistributions, index, {
                                department: event.target.value,
                              })
                            }
                          />
                        </Field>
                      </div>
                      <Field label="納品情報">
                        <Textarea
                          value={item.deliveryInfo}
                          onChange={(event) =>
                            updateArrayItem(setDistributions, index, {
                              deliveryInfo: event.target.value,
                            })
                          }
                        />
                      </Field>
                    </div>
                  ))}
                  {distributions.length === 0 ? (
                    <div className="rounded-md border bg-muted/30 p-4 text-sm text-muted-foreground">
                      配布物はまだ登録されていません。
                    </div>
                  ) : null}
                </div>
              </AdminCard>
            </div>

            <AdminCard
              actionLabel="イレギュラー対応を保存"
              onSave={() => save("イレギュラー対応")}
              title="イレギュラー対応項目"
              description="想定外の運用、追加タスク、緊急連絡などを自由に追加できます。"
              headerAction={
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    setIrregularItems((items) => [
                      ...items,
                      createIrregularItem(),
                    ])
                  }
                >
                  <Plus className="size-4" />
                  項目を追加
                </Button>
              }
            >
              <div className="grid gap-4 xl:grid-cols-2">
                {irregularItems.map((item, index) => (
                  <div className="grid gap-3 rounded-md border p-4" key={item.id}>
                    <div className="grid gap-3 md:grid-cols-2">
                      <Field label="件名">
                        <Input
                          value={item.title}
                          onChange={(event) =>
                            updateArrayItem(setIrregularItems, index, {
                              title: event.target.value,
                            })
                          }
                        />
                      </Field>
                      <Field label="カテゴリ">
                        <Input
                          placeholder="天候対応 / 導線変更 / 緊急連絡"
                          value={item.category}
                          onChange={(event) =>
                            updateArrayItem(setIrregularItems, index, {
                              category: event.target.value,
                            })
                          }
                        />
                      </Field>
                      <Field label="担当者">
                        <Input
                          value={item.owner}
                          onChange={(event) =>
                            updateArrayItem(setIrregularItems, index, {
                              owner: event.target.value,
                            })
                          }
                        />
                      </Field>
                      <Field label="状態">
                        <Input
                          placeholder="未対応 / 確認中 / 対応済み"
                          value={item.status}
                          onChange={(event) =>
                            updateArrayItem(setIrregularItems, index, {
                              status: event.target.value,
                            })
                          }
                        />
                      </Field>
                    </div>
                    <Field label="場所">
                      <Input
                        value={item.location ?? ""}
                        onChange={(event) =>
                          updateArrayItem(setIrregularItems, index, {
                            location: event.target.value,
                          })
                        }
                      />
                    </Field>
                    <Field label="内容・対応メモ">
                      <Textarea
                        value={item.note}
                        onChange={(event) =>
                          updateArrayItem(setIrregularItems, index, {
                            note: event.target.value,
                          })
                        }
                      />
                    </Field>
                  </div>
                ))}
                {irregularItems.length === 0 ? (
                  <div className="rounded-md border bg-muted/30 p-4 text-sm text-muted-foreground">
                    イレギュラー対応項目はまだ登録されていません。
                  </div>
                ) : null}
              </div>
            </AdminCard>

            <div className="grid gap-4 lg:grid-cols-2">
              <AdminCard
                actionLabel="マップ画像を保存"
                onSave={() => save("各種マップ")}
                title="各種マップ画像"
                description="会場マップ、駐車場マップ、座席図をアップロードできます。"
              >
                <div className="grid gap-4">
                  <ImageUploadField
                    imageUrl={mapAssets.venueMapImageUrl}
                    label="会場マップ"
                    onChange={(venueMapImageUrl) =>
                      setOperationMapAssets((current) => ({
                        ...current,
                        venueMapImageUrl,
                      }))
                    }
                  />
                  <ImageUploadField
                    imageUrl={mapAssets.parkingMapImageUrl}
                    label="駐車場マップ"
                    onChange={(parkingMapImageUrl) =>
                      setOperationMapAssets((current) => ({
                        ...current,
                        parkingMapImageUrl,
                      }))
                    }
                  />
                  <ImageUploadField
                    imageUrl={mapAssets.seatingChartImageUrl}
                    label="座席図"
                    onChange={(seatingChartImageUrl) =>
                      setOperationMapAssets((current) => ({
                        ...current,
                        seatingChartImageUrl,
                      }))
                    }
                  />
                </div>
              </AdminCard>

              <AdminCard
                actionLabel="資料PDFを保存"
                onSave={() => save("資料PDF")}
                title="各種資料PDF"
                description="資料名を記載してPDFを追加できます。"
                headerAction={
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      setOperationDocuments((items) => [
                        ...items,
                        {
                          id: `document-${Date.now()}`,
                          title: "",
                          fileName: "",
                          fileUrl: "",
                        },
                      ])
                    }
                  >
                    <Plus className="size-4" />
                    資料を追加
                  </Button>
                }
              >
                <div className="grid gap-4">
                  {operationDocuments.length === 0 ? (
                    <div className="rounded-md border bg-muted/30 p-4 text-sm text-muted-foreground">
                      資料はまだ登録されていません。
                    </div>
                  ) : null}
                  {operationDocuments.map((document, index) => (
                    <PdfUploadField
                      document={document}
                      key={document.id}
                      onChange={(patch) =>
                        setOperationDocuments((items) =>
                          items.map((item, itemIndex) =>
                            itemIndex === index ? { ...item, ...patch } : item,
                          ),
                        )
                      }
                    />
                  ))}
                </div>
              </AdminCard>
            </div>
          </TabShell>
        </TabsContent>

        <TabsContent value="イベント">
          <TabShell
            description="通常イベントと集合イベントを分けて管理します。画像、担当者、トップページ掲載可否もここで設定します。"
            icon={Megaphone}
            title="イベント"
          >
            <AdminCard
              actionLabel="イベント情報を保存"
              onSave={() => save("イベント情報")}
              title="イベント掲載情報"
              description="トップページに掲載するイベント、画像、担当者、参加条件を管理します。"
              headerAction={
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    setEventInfo((items) => [
                      ...items,
                      createEventItem(data.match.id, "basic"),
                    ])
                  }
                >
                  <Plus className="size-4" />
                  イベントを追加
                </Button>
              }
            >
              <div className="grid gap-4 xl:grid-cols-2">
                {events
                  .filter((eventItem) => eventItem.category !== "gathering")
                  .map((eventItem) => {
                    const index = events.findIndex((item) => item.id === eventItem.id);

                    return (
                      <EventEditor
                        eventItem={eventItem}
                        index={index}
                        key={eventItem.id}
                        setEventInfo={setEventInfo}
                      />
                    );
                  })}
              </div>
            </AdminCard>

            <AdminCard
              actionLabel="集合イベントを保存"
              onSave={() => save("集合イベント")}
              title="集合イベント"
              description="集合・解散、受付担当、企画担当を管理します。"
              headerAction={
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    setEventInfo((items) => [
                      ...items,
                      createEventItem(data.match.id, "gathering"),
                    ])
                  }
                >
                  <Plus className="size-4" />
                  集合イベントを追加
                </Button>
              }
            >
              <div className="grid gap-4 xl:grid-cols-2">
                {events
                  .filter((eventItem) => eventItem.category === "gathering")
                  .map((eventItem) => {
                    const index = events.findIndex((item) => item.id === eventItem.id);

                    return (
                      <GatheringEventEditor
                        eventItem={eventItem}
                        index={index}
                        key={eventItem.id}
                        setEventInfo={setEventInfo}
                      />
                    );
                  })}
              </div>
            </AdminCard>
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
            description="VIP、諸室、スポンサーに関する伝達事項を管理します。"
            icon={Building2}
            title="営業担当"
          >
            <AdminCard
              actionLabel="VIP・諸室情報を保存"
              onSave={() => save("営業担当")}
              title="VIP管理・諸室管理"
              description="利用者、人数、サービス内容を入力します。"
              headerAction={
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    setVipRooms((items) => [...items, createVipRoom()])
                  }
                >
                  <Plus className="size-4" />
                  諸室を追加
                </Button>
              }
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
              actionLabel="伝達事項を保存"
              onSave={() => save("スポンサー伝達事項")}
              title="スポンサーに関する伝達事項"
              description="スポンサー対応に関する連絡事項や当日注意点をメモします。"
            >
              <Field label="伝達メモ">
                <Textarea
                  value={sponsorNotes}
                  onChange={(event) => setSponsorNotes(event.target.value)}
                />
              </Field>
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
            description="来場予定のメディア情報を管理します。"
            icon={Megaphone}
            title="広報担当"
          >
            <AdminCard
              actionLabel="メディア情報を保存"
              onSave={() => save("メディア情報")}
              title="来場予定メディア"
              description="中継、映像、フォト、ペンなどの来場メディアを管理します。"
              headerAction={
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    setMediaVisits((items) => [...items, createMediaVisit()])
                  }
                >
                  <Plus className="size-4" />
                  メディアを追加
                </Button>
              }
            >
              <div className="grid gap-4 xl:grid-cols-2">
                {mediaVisits.map((media, index) => (
                  <div className="grid gap-4 rounded-md border p-4" key={media.id}>
                    <div className="grid gap-3 md:grid-cols-2">
                      <Field label="メディア名">
                        <Input
                          value={media.mediaName}
                          onChange={(event) =>
                            updateArrayItem(setMediaVisits, index, {
                              mediaName: event.target.value,
                            })
                          }
                        />
                      </Field>
                      <Field label="種類">
                        <select
                          className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm"
                          value={media.mediaType}
                          onChange={(event) =>
                            updateArrayItem(setMediaVisits, index, {
                              mediaType: event.target.value as MediaVisitInfo["mediaType"],
                            })
                          }
                        >
                          <option value="中継">中継</option>
                          <option value="映像">映像</option>
                          <option value="フォト">フォト</option>
                          <option value="ペン">ペン</option>
                          <option value="その他">その他</option>
                        </select>
                      </Field>
                      <Field label="氏名 or 代表者">
                        <Input
                          value={media.representative}
                          onChange={(event) =>
                            updateArrayItem(setMediaVisits, index, {
                              representative: event.target.value,
                            })
                          }
                        />
                      </Field>
                      <Field label="人数">
                        <Input
                          type="number"
                          value={media.peopleCount}
                          onChange={(event) =>
                            updateArrayItem(setMediaVisits, index, {
                              peopleCount: Number(event.target.value),
                            })
                          }
                        />
                      </Field>
                      <Field label="控室">
                        <Input
                          value={media.waitingRoom}
                          onChange={(event) =>
                            updateArrayItem(setMediaVisits, index, {
                              waitingRoom: event.target.value,
                            })
                          }
                        />
                      </Field>
                      <Field label="観戦場所">
                        <Input
                          value={media.viewingLocation}
                          onChange={(event) =>
                            updateArrayItem(setMediaVisits, index, {
                              viewingLocation: event.target.value,
                            })
                          }
                        />
                      </Field>
                    </div>
                  </div>
                ))}
              </div>
            </AdminCard>
          </TabShell>
        </TabsContent>
      </div>
    </Tabs>
  );
}

function EventEditor({
  eventItem,
  index,
  setEventInfo,
}: {
  eventItem: EventInfo;
  index: number;
  setEventInfo: Dispatch<SetStateAction<EventInfo[]>>;
}) {
  return (
    <div className="grid gap-4 rounded-md border p-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="イベント名">
          <Input
            placeholder="ホームタウン感謝ステージ"
            value={eventItem.title}
            onChange={(event) =>
              updateArrayItem(setEventInfo, index, { title: event.target.value })
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
          </select>
        </Field>
        <Field label="イベント担当者">
          <Input
            placeholder="事業担当 山田"
            value={eventItem.ownerName ?? ""}
            onChange={(event) =>
              updateArrayItem(setEventInfo, index, { ownerName: event.target.value })
            }
          />
        </Field>
        <Field label="担当部署">
          <Input
            value={eventItem.department}
            onChange={(event) =>
              updateArrayItem(setEventInfo, index, {
                department: event.target.value,
              })
            }
          />
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
              updateArrayItem(setEventInfo, index, { location: event.target.value })
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
        onChange={(imageUrl) => updateArrayItem(setEventInfo, index, { imageUrl })}
      />
      <PublishField
        checked={eventItem.showOnTop !== false}
        label="トップページに掲載する"
        onChange={(checked) =>
          updateArrayItem(setEventInfo, index, { showOnTop: checked })
        }
      />
    </div>
  );
}

function GatheringEventEditor({
  eventItem,
  index,
  setEventInfo,
}: {
  eventItem: EventInfo;
  index: number;
  setEventInfo: Dispatch<SetStateAction<EventInfo[]>>;
}) {
  return (
    <div className="grid gap-4 rounded-md border p-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="イベント名">
          <Input
            value={eventItem.title}
            onChange={(event) =>
              updateArrayItem(setEventInfo, index, { title: event.target.value })
            }
          />
        </Field>
        <Field label="イベント担当者">
          <Input
            value={eventItem.ownerName ?? ""}
            onChange={(event) =>
              updateArrayItem(setEventInfo, index, { ownerName: event.target.value })
            }
          />
        </Field>
        <Field label="集合時間">
          <Input
            value={eventItem.gatheringTime ?? eventItem.startTime}
            onChange={(event) =>
              updateArrayItem(setEventInfo, index, {
                gatheringTime: event.target.value,
                startTime: event.target.value,
              })
            }
          />
        </Field>
        <Field label="集合場所">
          <Input
            value={eventItem.gatheringLocation ?? eventItem.location}
            onChange={(event) =>
              updateArrayItem(setEventInfo, index, {
                gatheringLocation: event.target.value,
                location: event.target.value,
              })
            }
          />
        </Field>
        <Field label="解散時間">
          <Input
            value={eventItem.dismissalTime ?? eventItem.endTime ?? ""}
            onChange={(event) =>
              updateArrayItem(setEventInfo, index, {
                dismissalTime: event.target.value,
                endTime: event.target.value,
              })
            }
          />
        </Field>
        <Field label="解散場所">
          <Input
            value={eventItem.dismissalLocation ?? ""}
            onChange={(event) =>
              updateArrayItem(setEventInfo, index, {
                dismissalLocation: event.target.value,
              })
            }
          />
        </Field>
        <Field label="集合受付担当">
          <Input
            value={eventItem.receptionOwner ?? ""}
            onChange={(event) =>
              updateArrayItem(setEventInfo, index, {
                receptionOwner: event.target.value,
              })
            }
          />
        </Field>
        <Field label="企画担当">
          <Input
            value={eventItem.planningOwner ?? ""}
            onChange={(event) =>
              updateArrayItem(setEventInfo, index, {
                planningOwner: event.target.value,
              })
            }
          />
        </Field>
      </div>
      <Field label="説明文">
        <Textarea
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
        label="集合イベント画像"
        onChange={(imageUrl) => updateArrayItem(setEventInfo, index, { imageUrl })}
      />
      <PublishField
        checked={eventItem.showOnTop !== false}
        label="トップページに掲載する"
        onChange={(checked) =>
          updateArrayItem(setEventInfo, index, { showOnTop: checked })
        }
      />
    </div>
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

function PdfUploadField({
  document,
  onChange,
}: {
  document: OperationDocument;
  onChange: (patch: Partial<OperationDocument>) => void;
}) {
  return (
    <div className="grid gap-3 rounded-md border bg-muted/20 p-3">
      <Field label="資料名">
        <Input
          placeholder="運営マニュアル"
          value={document.title}
          onChange={(event) => onChange({ title: event.target.value })}
        />
      </Field>
      <div className="grid gap-2 md:grid-cols-[1fr_auto]">
        <Input
          placeholder="PDF URL またはアップロード後のData URL"
          value={document.fileName || document.fileUrl}
          onChange={(event) =>
            onChange({ fileName: event.target.value, fileUrl: event.target.value })
          }
        />
        <label className="inline-flex h-8 cursor-pointer items-center justify-center gap-1.5 rounded-lg border bg-background px-2.5 text-sm font-medium hover:bg-muted">
          <Upload className="size-4" />
          PDFを選択
          <input
            accept="application/pdf"
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
                  onChange({ fileName: file.name, fileUrl: reader.result });
                }
              };
              reader.readAsDataURL(file);
            }}
          />
        </label>
      </div>
      {document.fileUrl ? (
        <Button asChild className="w-fit" variant="outline">
          <a href={document.fileUrl} rel="noreferrer" target="_blank">
            資料を開く
          </a>
        </Button>
      ) : null}
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

function createEventItem(
  matchId: string,
  category: EventInfo["category"],
): EventInfo {
  return {
    id: `event-${Date.now()}`,
    matchId,
    category,
    title: "",
    department: "",
    ownerName: "",
    location: "",
    startTime: "",
    endTime: "",
    description: "",
    participationRule: "",
    showOnTop: true,
    ...(category === "gathering"
      ? {
          gatheringTime: "",
          gatheringLocation: "",
          dismissalTime: "",
          dismissalLocation: "",
          receptionOwner: "",
          planningOwner: "",
        }
      : {}),
  };
}

function createVipRoom(): VipRoomInfo {
  return {
    id: `vip-${Date.now()}`,
    roomName: "",
    userName: "",
    guestCount: 0,
    service: "",
    note: "",
  };
}

function createEquipmentPlacement(): EquipmentPlacementInfo {
  return {
    id: `equipment-placement-${Date.now()}`,
    name: "",
    quantity: "",
    location: "",
    note: "",
  };
}

function createDistributionItem(): DistributionInfo {
  return {
    id: `distribution-${Date.now()}`,
    name: "",
    location: "",
    quantity: 0,
    deliveryInfo: "",
    department: "運営担当",
  };
}

function createIrregularItem(): IrregularOperationItem {
  return {
    id: `irregular-${Date.now()}`,
    title: "",
    category: "",
    owner: "",
    status: "未対応",
    location: "",
    note: "",
  };
}

function createMediaVisit(): MediaVisitInfo {
  return {
    id: `media-${Date.now()}`,
    mediaName: "",
    mediaType: "ペン",
    representative: "",
    peopleCount: 1,
    waitingRoom: "",
    viewingLocation: "",
  };
}

function defaultStaffAssignments(): StaffAssignmentInfo[] {
  return [
    { id: "staff-assignment-default-001", label: "アルバイトスタッフ", count: 0 },
    { id: "staff-assignment-default-002", label: "ボランティア", count: 0 },
    { id: "staff-assignment-default-003", label: "クラブ社員", count: 0 },
    { id: "staff-assignment-default-004", label: "警備員", count: 0 },
  ];
}

function defaultEquipmentPlacements(): EquipmentPlacementInfo[] {
  return [
    {
      id: "equipment-placement-default-001",
      name: "",
      quantity: "",
      location: "",
      note: "",
    },
  ];
}
