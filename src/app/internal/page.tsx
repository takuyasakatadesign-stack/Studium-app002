import {
  CalendarDays,
  CloudSun,
  DoorOpen,
  FileText,
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
import { requireRole } from "@/lib/auth";
import {
  currentMatch,
  eventInfo,
  foodItems,
  goodsItems,
  internalOperationInfo,
  newsItems,
  shops,
  timelineItems,
} from "@/lib/mock-data";

export default async function InternalPage() {
  await requireRole(["admin", "club_staff"]);

  const boothEvents = eventInfo.filter((event) => event.category !== "gathering");
  const gatheringEvents = eventInfo.filter(
    (event) => event.category === "gathering",
  );

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

      <section className="grid gap-4 lg:grid-cols-[1fr_1fr_1fr]">
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
        description="時刻、業務名、場所を現場確認用に一覧化しています。"
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
            columns={["ゲート名", "開門時刻", "レーン構成"]}
            rows={internalOperationInfo.gates.map((gate) => [
              gate.name,
              gate.openTime,
              gate.lanes,
            ])}
          />
        </DashboardSection>

        <DashboardSection icon={Users} title="VIP・諸室管理">
          <DataTable
            columns={["諸室名", "利用者", "人数", "サービス", "備考"]}
            rows={internalOperationInfo.vipRooms.map((room) => [
              room.roomName,
              room.userName,
              `${room.guestCount}名`,
              room.service,
              room.note ?? "-",
            ])}
          />
        </DashboardSection>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <DashboardSection icon={MapPin} title="イベント・ブース詳細">
          <DataTable
            columns={[
              "区分",
              "名称",
              "担当部署",
              "実施場所",
              "実施時間",
              "参加条件",
            ]}
            rows={boothEvents.map((event) => [
              event.category,
              event.title,
              event.department,
              event.location,
              `${event.startTime}${event.endTime ? ` - ${event.endTime}` : ""}`,
              event.participationRule ?? "-",
            ])}
          />
        </DashboardSection>

        <DashboardSection icon={Users} title="集合イベント">
          <DataTable
            columns={["イベント名", "担当者", "購入者特典", "集合・解散"]}
            rows={gatheringEvents.map((event) => [
              event.title,
              event.department,
              event.participationRule ?? "-",
              `${event.startTime}${event.endTime ? ` - ${event.endTime}` : ""}`,
            ])}
          />
        </DashboardSection>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <DashboardSection icon={PackageCheck} title="スタッフ・備品管理">
          <div className="grid gap-3 md:grid-cols-2">
            <Metric label="無線機" value={`${internalOperationInfo.staffEquipment.radios}台`} />
            <Metric
              label="ボランティア人数"
              value={`${internalOperationInfo.staffEquipment.volunteers}名`}
            />
            <Metric
              className="md:col-span-2"
              label="備品発注"
              value={internalOperationInfo.staffEquipment.equipmentOrders.join(" / ")}
            />
            <Metric
              className="md:col-span-2"
              label="のぼり旗・看板"
              value={internalOperationInfo.staffEquipment.flagsAndSigns}
            />
          </div>
        </DashboardSection>

        <DashboardSection icon={Megaphone} title="広報・配布物管理">
          <DataTable
            columns={["配布物名", "配布場所", "数量", "納品情報", "担当部署"]}
            rows={internalOperationInfo.distributions.map((item) => [
              item.name,
              item.location,
              `${item.quantity.toLocaleString()}部`,
              item.deliveryInfo,
              item.department,
            ])}
          />
        </DashboardSection>
      </section>

      <DashboardSection icon={Ticket} title="チケット情報">
        <DataTable
          columns={["特殊チケット名", "金額", "枚数", "特典", "引き換え方法"]}
          rows={internalOperationInfo.tickets.map((ticketInfo) => [
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
          <DataTable
            columns={["売店名", "出店場所", "商品名", "金額", "SNSリンク"]}
            rows={foodItems.map((item) => {
              const shop = shops.find((target) => target.id === item.shopId);
              const sns =
                shop?.snsLinks.instagram ?? shop?.snsLinks.x ?? shop?.snsLinks.website ?? "-";

              return [
                shop?.name ?? "-",
                shop?.location ?? "-",
                item.name,
                `${item.price.toLocaleString()}円`,
                sns,
              ];
            })}
          />
        </DashboardSection>

        <DashboardSection icon={Shirt} title="グッズ情報">
          <DataTable
            columns={["新商品名", "金額", "販売場所", "状態"]}
            rows={goodsItems.map((item) => [
              item.name,
              `${item.price.toLocaleString()}円`,
              item.saleLocation,
              item.isNew ? "新商品" : "通常商品",
            ])}
          />
        </DashboardSection>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <DashboardSection icon={Megaphone} title="NEWS・SNS確認">
          <DataTable
            columns={["カテゴリ", "日付", "タイトル", "本文"]}
            rows={newsItems.map((item) => [
              item.category,
              item.date,
              item.title,
              item.body,
            ])}
          />
        </DashboardSection>

        <DashboardSection icon={FileText} title="スポンサー情報">
          <DataTable
            columns={["スポンサー", "掲出・実施場所", "担当部署", "備考"]}
            rows={internalOperationInfo.sponsors.map((item) => [
              item.name,
              item.location,
              item.ownerDepartment,
              item.note,
            ])}
          />
        </DashboardSection>
      </section>
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
      <p className="mt-1 font-semibold">{value}</p>
    </div>
  );
}
