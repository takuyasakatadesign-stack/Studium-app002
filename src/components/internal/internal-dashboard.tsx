"use client";

import {
  CalendarDays,
  CloudSun,
  DoorOpen,
  FileText,
  Image as ImageIcon,
  MapPin,
  Megaphone,
  PackageCheck,
  Shirt,
  Ticket,
  Trophy,
  Users,
  Utensils,
} from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStadiumData } from "@/components/providers/stadium-data-provider";
import type { EventInfo } from "@/types";

export function InternalDashboard() {
  const { data } = useStadiumData();
  const {
    accessInfo,
    eventInfo,
    foodItems,
    goodsItems,
    internalOperationInfo,
    match: currentMatch,
    shops,
    timelineItems,
  } = data;
  const regularEvents = eventInfo.filter((event) => event.category !== "gathering");
  const gatheringEvents = eventInfo.filter(
    (event) => event.category === "gathering",
  );
  const mapAssets = internalOperationInfo.mapAssets ?? {};
  const documents = internalOperationInfo.documents ?? [];
  const staffAssignments = internalOperationInfo.staffAssignments ?? [];
  const equipmentPlacements = internalOperationInfo.equipmentPlacements ?? [];
  const gates = internalOperationInfo.gates ?? [];
  const distributions = internalOperationInfo.distributions ?? [];
  const vipRooms = internalOperationInfo.vipRooms ?? [];
  const tickets = internalOperationInfo.tickets ?? [];
  const mediaVisits = internalOperationInfo.mediaVisits ?? [];
  const sponsorNotes = internalOperationInfo.sponsorNotes ?? "";
  const irregularItems = internalOperationInfo.irregularItems ?? [];

  return (
    <div className="space-y-8">
      <PageHeader
        badge="画面D"
        title="社内用閲覧画面"
        description="クラブ社員が試合当日の運営情報を一覧で確認する閲覧専用ダッシュボードです。"
      />

      <section className="grid gap-4 lg:grid-cols-4">
        <SummaryCard
          icon={Trophy}
          label="対戦カード"
          value={`${currentMatch.homeTeam} vs ${currentMatch.opponent}`}
        />
        <SummaryCard
          icon={CalendarDays}
          label="開催日時"
          value={`${currentMatch.date} ${currentMatch.kickoffTime}`}
        />
        <SummaryCard
          icon={Users}
          label="来場予想"
          value={`${internalOperationInfo.attendance.expectedVisitors.toLocaleString()}人`}
        />
        <SummaryCard
          icon={CloudSun}
          label="天候"
          value={`${internalOperationInfo.weather.forecast} / ${internalOperationInfo.weather.temperature}`}
        />
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <InfoCard icon={Trophy} title="試合基本情報">
          <InfoGrid
            rows={[
              ["試合名称", currentMatch.matchName],
              ["節数", currentMatch.round],
              ["会場", currentMatch.venue],
              ["キックオフ", currentMatch.kickoffTime],
            ]}
          />
        </InfoCard>
        <InfoCard icon={CloudSun} title="気象・コンディション">
          <InfoGrid
            rows={[
              ["天気予報", internalOperationInfo.weather.forecast],
              ["気温", internalOperationInfo.weather.temperature],
              ["風速", internalOperationInfo.weather.windSpeed],
            ]}
          />
        </InfoCard>
        <InfoCard icon={Ticket} title="集客・チケット状況">
          <InfoGrid
            rows={[
              [
                "来場予想人数",
                `${internalOperationInfo.attendance.expectedVisitors.toLocaleString()}人`,
              ],
              [
                "前売券販売数",
                `${internalOperationInfo.attendance.advanceTicketsSold.toLocaleString()}枚`,
              ],
              [
                "ビジター席販売数",
                `${internalOperationInfo.attendance.visitorSeatsSold.toLocaleString()}枚`,
              ],
              ["駐車場完売状況", internalOperationInfo.attendance.parkingStatus],
            ]}
          />
        </InfoCard>
      </section>

      <DashboardSection
        icon={CalendarDays}
        title="運営タイムスケジュール"
        description="管理画面の運営担当で入力した進行情報です。"
      >
        <DataTable
          columns={["時刻", "イベント・業務名", "業務内容", "場所", "備考"]}
          rows={timelineItems.map((item) => [
            item.time,
            item.title,
            item.description,
            item.location,
            item.note ?? "-",
          ])}
        />
      </DashboardSection>

      <section className="grid gap-4 lg:grid-cols-2">
        <DashboardSection icon={DoorOpen} title="入場口・ゲート管理">
          <DataTable
            columns={["ゲート名", "開門時刻", "レーン構成", "入場対象者"]}
            rows={gates.map((gate) => [
              gate.name,
              gate.openTime,
              gate.lanes,
              gate.targetAudience ?? "-",
            ])}
          />
        </DashboardSection>
        <DashboardSection icon={Users} title="スタッフ配置">
          <DataTable
            columns={["種別", "人数"]}
            rows={staffAssignments.map((item) => [
              item.label,
              `${item.count.toLocaleString()}名`,
            ])}
          />
        </DashboardSection>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <DashboardSection icon={PackageCheck} title="備品配置">
          <DataTable
            columns={["備品名", "数量", "設置場所", "補足"]}
            rows={equipmentPlacements.map((item) => [
              item.name,
              item.quantity,
              item.location,
              item.note ?? "-",
            ])}
          />
        </DashboardSection>
        <DashboardSection icon={Megaphone} title="配布物管理">
          <DataTable
            columns={["配布物名", "配布場所", "数量", "納品情報", "担当部署"]}
            rows={distributions.map((item) => [
              item.name,
              item.location,
              `${item.quantity.toLocaleString()}部`,
              item.deliveryInfo,
              item.department,
            ])}
          />
        </DashboardSection>
      </section>

      <DashboardSection
        icon={Megaphone}
        title="イレギュラー対応項目"
        description="管理画面で自由追加された想定外対応・追加タスクです。"
      >
        {irregularItems.length > 0 ? (
          <DataTable
            columns={["件名", "カテゴリ", "担当者", "状態", "場所", "内容・メモ"]}
            rows={irregularItems.map((item) => [
              item.title,
              item.category,
              item.owner,
              item.status,
              item.location ?? "-",
              item.note,
            ])}
          />
        ) : (
          <EmptyBox text="登録済みのイレギュラー対応項目はありません。" />
        )}
      </DashboardSection>

      <DashboardSection
        icon={ImageIcon}
        title="各種マップ"
        description="運営担当がアップロードした会場マップ、駐車場マップ、座席図です。"
      >
        <div className="grid gap-4 lg:grid-cols-3">
          <ImagePanel title="会場マップ" imageUrl={mapAssets.venueMapImageUrl ?? accessInfo.mapImageUrl} />
          <ImagePanel title="駐車場マップ" imageUrl={mapAssets.parkingMapImageUrl} />
          <ImagePanel title="座席図" imageUrl={mapAssets.seatingChartImageUrl} />
        </div>
      </DashboardSection>

      <DashboardSection icon={FileText} title="各種資料PDF">
        {documents.length > 0 ? (
          <div className="grid gap-3 md:grid-cols-2">
            {documents.map((document) => (
              <a
                className="rounded-md border bg-white p-4 transition-colors hover:bg-slate-50"
                href={document.fileUrl}
                key={document.id}
                rel="noreferrer"
                target="_blank"
              >
                <p className="font-semibold">{document.title || document.fileName}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {document.fileName || "PDF資料"}
                </p>
              </a>
            ))}
          </div>
        ) : (
          <EmptyBox text="登録済みのPDF資料はありません。" />
        )}
      </DashboardSection>

      <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <DashboardSection icon={MapPin} title="イベント・ブース詳細">
          <EventGrid events={regularEvents} />
        </DashboardSection>
        <DashboardSection icon={Users} title="集合イベント">
          <DataTable
            columns={[
              "イベント名",
              "集合",
              "解散",
              "受付担当",
              "企画担当",
            ]}
            rows={gatheringEvents.map((event) => [
              event.title,
              `${event.gatheringTime ?? event.startTime} / ${event.gatheringLocation ?? event.location}`,
              `${event.dismissalTime ?? event.endTime ?? "-"} / ${event.dismissalLocation ?? "-"}`,
              event.receptionOwner ?? "-",
              event.planningOwner ?? event.ownerName ?? "-",
            ])}
          />
        </DashboardSection>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <DashboardSection icon={Users} title="VIP・諸室管理">
          <DataTable
            columns={["諸室名", "利用者", "人数", "サービス", "備考"]}
            rows={vipRooms.map((room) => [
              room.roomName,
              room.userName,
              `${room.guestCount}名`,
              room.service,
              room.note ?? "-",
            ])}
          />
        </DashboardSection>
        <DashboardSection icon={FileText} title="スポンサー伝達事項">
          <Metric label="伝達メモ" value={sponsorNotes} />
        </DashboardSection>
      </section>

      <DashboardSection icon={Ticket} title="チケット情報">
        <DataTable
          columns={["特殊チケット名", "金額", "枚数", "特典", "引き換え方法"]}
          rows={tickets.map((ticketInfo) => [
            ticketInfo.name,
            `${ticketInfo.price.toLocaleString()}円`,
            `${ticketInfo.quantity.toLocaleString()}枚`,
            ticketInfo.benefit,
            ticketInfo.exchangeMethod,
          ])}
        />
      </DashboardSection>

      <section className="grid gap-4 lg:grid-cols-2">
        <DashboardSection icon={Utensils} title="グルメ情報">
          <ItemGrid
            rows={foodItems.map((item) => {
              const shop = shops.find((target) => target.id === item.shopId);

              return {
                id: item.id,
                imageUrl: item.imageUrl,
                title: item.name,
                badge: item.genre,
                lines: [
                  `${item.price.toLocaleString()}円`,
                  `${shop?.name ?? "-"} / ${shop?.location ?? "-"}`,
                  item.showOnTop === false ? "トップ非掲載" : "トップ掲載",
                ],
              };
            })}
          />
        </DashboardSection>
        <DashboardSection icon={Shirt} title="グッズ情報">
          <ItemGrid
            rows={goodsItems.map((item) => ({
              id: item.id,
              imageUrl: item.imageUrl,
              title: item.name,
              badge: item.isNew ? "新商品" : "通常商品",
              lines: [
                `${item.price.toLocaleString()}円`,
                item.saleLocation,
                item.showOnTop === false ? "トップ非掲載" : "トップ掲載",
              ],
            }))}
          />
        </DashboardSection>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <DashboardSection icon={Megaphone} title="メディア来場情報">
          <DataTable
            columns={["メディア名", "種類", "代表者・人数", "控室", "観戦場所"]}
            rows={mediaVisits.map((item) => [
              item.mediaName,
              item.mediaType,
              `${item.representative} / ${item.peopleCount}名`,
              item.waitingRoom,
              item.viewingLocation,
            ])}
          />
        </DashboardSection>
      </section>
    </div>
  );
}

function EventGrid({ events }: { events: EventInfo[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {events.map((event) => (
        <div className="overflow-hidden rounded-md border bg-white" key={event.id}>
          {event.imageUrl ? (
            <img
              alt={event.title}
              className="aspect-[16/9] w-full object-cover"
              src={event.imageUrl}
            />
          ) : null}
          <div className="space-y-2 p-4">
            <Badge variant="secondary">{event.category}</Badge>
            <h3 className="font-semibold">{event.title}</h3>
            <p className="text-sm text-muted-foreground">{event.description}</p>
            <InfoGrid
              rows={[
                ["担当者", event.ownerName ?? "-"],
                ["担当部署", event.department],
                ["実施場所", event.location],
                [
                  "実施時間",
                  `${event.startTime}${event.endTime ? ` - ${event.endTime}` : ""}`,
                ],
                ["参加条件", event.participationRule ?? "-"],
              ]}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function ItemGrid({
  rows,
}: {
  rows: {
    id: string;
    imageUrl?: string;
    title: string;
    badge: string;
    lines: string[];
  }[];
}) {
  return (
    <div className="grid gap-3">
      {rows.map((row) => (
        <div className="grid gap-3 rounded-md border bg-white p-3 md:grid-cols-[120px_1fr]" key={row.id}>
          {row.imageUrl ? (
            <img
              alt={row.title}
              className="aspect-[4/3] w-full rounded-md object-cover"
              src={row.imageUrl}
            />
          ) : (
            <div className="flex aspect-[4/3] items-center justify-center rounded-md bg-muted text-xs text-muted-foreground">
              画像なし
            </div>
          )}
          <div>
            <Badge variant="secondary">{row.badge}</Badge>
            <h3 className="mt-2 font-semibold">{row.title}</h3>
            <div className="mt-2 space-y-1 text-sm text-muted-foreground">
              {row.lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ImagePanel({
  imageUrl,
  title,
}: {
  imageUrl?: string;
  title: string;
}) {
  return (
    <div className="overflow-hidden rounded-md border bg-white">
      {imageUrl ? (
        <img alt={title} className="aspect-[16/10] w-full object-cover" src={imageUrl} />
      ) : (
        <div className="flex aspect-[16/10] items-center justify-center bg-muted text-sm text-muted-foreground">
          未登録
        </div>
      )}
      <p className="p-3 text-sm font-semibold">{title}</p>
    </div>
  );
}

function EmptyBox({ text }: { text: string }) {
  return (
    <div className="rounded-md border bg-muted/30 p-4 text-sm text-muted-foreground">
      {text}
    </div>
  );
}

function SummaryCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Trophy;
  label: string;
  value: string;
}) {
  return (
    <Card className="rounded-lg shadow-sm">
      <CardContent className="space-y-3 p-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Icon className="size-4" />
          {label}
        </div>
        <p className="text-lg font-semibold leading-snug">{value}</p>
      </CardContent>
    </Card>
  );
}

function InfoCard({
  children,
  icon: Icon,
  title,
}: {
  children: React.ReactNode;
  icon: typeof Trophy;
  title: string;
}) {
  return (
    <Card className="rounded-lg shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Icon className="size-4 text-sky-700" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

function DashboardSection({
  children,
  description,
  icon: Icon,
  title,
}: {
  children: React.ReactNode;
  description?: string;
  icon: typeof Trophy;
  title: string;
}) {
  return (
    <Card className="rounded-lg shadow-sm">
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Icon className="size-5 text-sky-700" />
              {title}
            </CardTitle>
            {description ? (
              <p className="mt-2 text-sm text-muted-foreground">{description}</p>
            ) : null}
          </div>
          <Badge variant="secondary">閲覧専用</Badge>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

function DataTable({ columns, rows }: { columns: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-md border">
      <table className="w-full min-w-[720px] text-sm">
        <thead className="bg-muted text-left text-muted-foreground">
          <tr>
            {columns.map((column) => (
              <th className="whitespace-nowrap px-3 py-2 font-medium" key={column}>
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr className="border-t" key={`${row.join("-")}-${rowIndex}`}>
              {row.map((cell, cellIndex) => (
                <td className="px-3 py-3 align-top" key={`${cell}-${cellIndex}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function InfoGrid({ rows }: { rows: [string, string][] }) {
  return (
    <div className="grid gap-3">
      {rows.map(([label, value]) => (
        <div className="grid grid-cols-[120px_1fr] gap-3 text-sm" key={label}>
          <span className="text-muted-foreground">{label}</span>
          <span className="font-medium">{value}</span>
        </div>
      ))}
    </div>
  );
}

function Metric({
  className,
  label,
  value,
}: {
  className?: string;
  label: string;
  value: string;
}) {
  return (
    <div className={`rounded-md border p-3 ${className ?? ""}`}>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 whitespace-pre-wrap font-semibold">{value || "-"}</p>
    </div>
  );
}
