import type {
  AccessInfo,
  EventInfo,
  FAQItem,
  FoodItem,
  GoodsItem,
  InternalOperationInfo,
  MatchScopedData,
  Match,
  NewsItem,
  Shop,
  TimelineItem,
  User,
} from "@/types";

export const currentMatch: Match = {
  id: "match-001",
  homeTeam: "ブルーシティFC",
  opponent: "レッドユナイテッド",
  date: "2026.05.12",
  kickoffTime: "19:00",
  venue: "ブルーシティスタジアム",
  round: "第15節",
  matchName: "ホームタウン感謝デー",
};

export const nextMatch: Match = {
  id: "match-002",
  homeTeam: "ブルーシティFC",
  opponent: "グリーン大阪",
  date: "2026.05.26",
  kickoffTime: "14:00",
  venue: "ブルーシティスタジアム",
  round: "第17節",
  matchName: "ファミリーデー",
};

export const timelineItems: TimelineItem[] = [
  {
    id: "timeline-001",
    matchId: currentMatch.id,
    time: "15:00",
    title: "場外イベント開始",
    description: "ホームタウンブースとキッズイベントを開始します。",
    location: "南広場",
  },
  {
    id: "timeline-002",
    matchId: currentMatch.id,
    time: "16:00",
    title: "グルメ売店オープン",
    description: "全グルメ売店の販売を開始します。",
    location: "コンコース全域",
  },
  {
    id: "timeline-003",
    matchId: currentMatch.id,
    time: "17:00",
    title: "先行入場",
    description: "シーズンチケット保有者の先行入場を開始します。",
    location: "メインゲート",
  },
  {
    id: "timeline-004",
    matchId: currentMatch.id,
    time: "19:00",
    title: "キックオフ",
    description: "明治安田リーグ第15節キックオフ。",
    location: "ピッチ",
  },
];

export const eventInfo: EventInfo[] = [
  {
    id: "event-001",
    matchId: currentMatch.id,
    category: "special",
    title: "ホームタウン感謝ステージ",
    department: "事業担当",
    location: "南広場ステージ",
    startTime: "15:30",
    endTime: "16:30",
    description: "地域団体によるパフォーマンスを実施します。",
    participationRule: "観覧自由",
  },
  {
    id: "event-002",
    matchId: currentMatch.id,
    category: "booth",
    title: "スポンサー体験ブース",
    department: "営業担当",
    location: "メインスタンド前",
    startTime: "15:00",
    endTime: "18:30",
    description: "来場者向け抽選会と体験コンテンツを提供します。",
    participationRule: "当日の観戦チケットが必要",
  },
  {
    id: "event-003",
    matchId: currentMatch.id,
    category: "basic",
    title: "選手ウォーミングアップ見学",
    department: "運営担当",
    location: "ピッチサイド",
    startTime: "18:10",
    endTime: "18:35",
    description: "指定エリアからウォーミングアップを見学できます。",
  },
  {
    id: "event-004",
    matchId: currentMatch.id,
    category: "gathering",
    title: "エスコートキッズ集合",
    department: "事業担当",
    location: "関係者受付前",
    startTime: "17:40",
    endTime: "19:10",
    description: "参加者受付、説明、ピッチ入場、解散までを実施します。",
    participationRule: "事前購入者特典",
  },
];

export const users: User[] = [
  {
    id: "user-001",
    name: "一般ファン",
    email: "fan@example.com",
    role: "fan",
  },
  {
    id: "user-002",
    name: "売店スタッフ A",
    email: "shop@example.com",
    role: "shop_staff",
    shopId: "shop-001",
  },
  {
    id: "user-003",
    name: "クラブ社員 運営担当",
    email: "staff@example.com",
    role: "club_staff",
    department: "運営担当",
  },
  {
    id: "user-004",
    name: "管理者",
    email: "admin@example.com",
    role: "admin",
  },
];

export const shops: Shop[] = [
  {
    id: "shop-001",
    matchId: currentMatch.id,
    name: "スタジアムキッチン青",
    description: "地元食材を使った定番スタジアムフードを提供します。",
    location: "メインスタンド 2F",
    mapArea: "A-12",
    staffUserId: "user-002",
    snsLinks: {
      instagram: "https://example.com/stadium-kitchen",
      x: "https://example.com/stadium-kitchen-x",
    },
  },
  {
    id: "shop-002",
    matchId: currentMatch.id,
    name: "ピッチサイドカレー",
    description: "スパイス香るカレーと限定トッピングが人気です。",
    location: "バックスタンド 1F",
    mapArea: "B-04",
    staffUserId: "user-004",
    snsLinks: {
      instagram: "https://example.com/pitch-curry",
    },
  },
  {
    id: "shop-003",
    matchId: currentMatch.id,
    name: "サポーターズカフェ",
    description: "観戦前後に立ち寄りやすいドリンクと軽食の売店です。",
    location: "北ゲート前",
    mapArea: "N-02",
    staffUserId: "user-004",
    snsLinks: {
      instagram: "https://example.com/supporters-cafe",
      website: "https://example.com/cafe",
    },
  },
];

export const foodItems: FoodItem[] = [
  {
    id: "item-001",
    matchId: currentMatch.id,
    shopId: "shop-001",
    name: "ブルー勝つサンド",
    genre: "軽食",
    price: 850,
    description: "厚切りカツと特製ソースの試合日限定サンドです。",
  },
  {
    id: "item-002",
    matchId: currentMatch.id,
    shopId: "shop-001",
    name: "ホームタウンポテト",
    genre: "スナック",
    price: 550,
    description: "地元産じゃがいもを使った食べ歩きメニューです。",
  },
  {
    id: "item-003",
    matchId: currentMatch.id,
    shopId: "shop-002",
    name: "必勝スパイスカレー",
    genre: "ご飯もの",
    price: 1000,
    description: "辛さ控えめで家族でも楽しめる看板カレーです。",
  },
  {
    id: "item-004",
    matchId: currentMatch.id,
    shopId: "shop-003",
    name: "青空レモネード",
    genre: "ドリンク",
    price: 500,
    description: "さっぱり飲める自家製レモネードです。",
  },
];

export const goodsItems: GoodsItem[] = [
  {
    id: "goods-001",
    matchId: currentMatch.id,
    name: "2026限定ユニフォームキーホルダー",
    price: 1200,
    saleLocation: "グッズ売店 メインスタンド",
    description: "試合日限定デザインのキーホルダーです。",
    isNew: true,
  },
  {
    id: "goods-002",
    matchId: currentMatch.id,
    name: "ブルーシティFC タオルマフラー",
    price: 2200,
    saleLocation: "グッズ売店 全店",
    description: "応援定番アイテムです。",
    isNew: false,
  },
];

export const accessInfo: AccessInfo = {
  matchId: currentMatch.id,
  stadiumName: "ブルーシティスタジアム",
  address: "東京都青空市スタジアム通り1-1",
  train: "青空線 スタジアム前駅から徒歩8分",
  bus: "青空駅東口から臨時シャトルバスを運行",
  parking: "事前予約制。試合当日の一般販売はありません。",
};

export const faqItems: FAQItem[] = [
  {
    id: "faq-001",
    matchId: currentMatch.id,
    category: "入場",
    question: "再入場はできますか？",
    answer: "再入場ゲートでチケットを確認後、再入場できます。",
  },
  {
    id: "faq-002",
    matchId: currentMatch.id,
    category: "観戦ルール",
    question: "飲食物の持ち込みはできますか？",
    answer: "ビン・缶類を除き、指定ルール内で持ち込み可能です。",
  },
  {
    id: "faq-003",
    matchId: currentMatch.id,
    category: "設備",
    question: "忘れ物はどこに問い合わせますか？",
    answer: "総合案内所または試合後のクラブ窓口へお問い合わせください。",
  },
];

export const newsItems: NewsItem[] = [
  {
    id: "news-001",
    matchId: currentMatch.id,
    title: "ホームタウン感謝デーを開催します",
    date: "2026.05.01",
    category: "イベント",
    body: "南広場で地域団体によるステージイベントを実施します。",
  },
  {
    id: "news-002",
    matchId: currentMatch.id,
    title: "新グッズ販売のお知らせ",
    date: "2026.05.02",
    category: "グッズ",
    body: "試合日限定デザインの新商品を販売します。",
  },
  {
    id: "news-003",
    matchId: currentMatch.id,
    title: "当日の入場待機列について",
    date: "2026.05.03",
    category: "運営",
    body: "入場待機列の形成時間と場所をご確認ください。",
  },
];

export const internalOperationInfo: InternalOperationInfo = {
  matchId: currentMatch.id,
  weather: {
    forecast: "晴れ時々くもり",
    temperature: "22度",
    windSpeed: "3m/s",
  },
  attendance: {
    expectedVisitors: 18500,
    advanceTicketsSold: 16420,
    visitorSeatsSold: 980,
    parkingStatus: "完売",
  },
  gates: [
    {
      id: "gate-001",
      name: "メインゲート",
      openTime: "17:00",
      lanes: "一般4 / 優先1 / 車いす1",
    },
    {
      id: "gate-002",
      name: "バックゲート",
      openTime: "17:00",
      lanes: "一般3 / ビジター1",
    },
  ],
  vipRooms: [
    {
      id: "vip-001",
      roomName: "VIPラウンジ A",
      userName: "スポンサー A社",
      guestCount: 24,
      service: "軽食、ドリンク、記念品",
      note: "18:00までに受付準備完了",
    },
  ],
  staffEquipment: {
    radios: 42,
    volunteers: 68,
    equipmentOrders: ["カラーコーン 40個", "案内看板 12枚", "養生テープ 20巻"],
    flagsAndSigns: "のぼり旗24本、場外誘導看板8枚",
  },
  tickets: [
    {
      id: "ticket-001",
      name: "ホームタウン感謝チケット",
      price: 2500,
      quantity: 500,
      benefit: "限定ステッカー",
      exchangeMethod: "南広場チケットブースで引き換え",
    },
  ],
  distributions: [
    {
      id: "distribution-001",
      name: "マッチデープログラム",
      location: "各入場ゲート",
      quantity: 12000,
      deliveryInfo: "試合前日 15:00 納品",
      department: "広報担当",
    },
    {
      id: "distribution-002",
      name: "スポンサー抽選券",
      location: "南広場スポンサー体験ブース",
      quantity: 3000,
      deliveryInfo: "当日 13:00 ブース納品",
      department: "営業担当",
    },
  ],
  sponsors: [
    {
      id: "sponsor-001",
      name: "スポンサー A社",
      location: "メインスタンド前ブース",
      ownerDepartment: "営業担当",
      note: "抽選会景品は14:00搬入予定",
    },
  ],
};

export const adminTabs = [
  "運営担当",
  "グッズ担当",
  "グルメ担当",
  "営業担当",
  "事業担当",
  "広報担当",
] as const;

export const initialMatchData: MatchScopedData = {
  match: currentMatch,
  nextMatch,
  timelineItems,
  eventInfo,
  shops,
  foodItems,
  goodsItems,
  accessInfo,
  faqItems,
  newsItems,
  internalOperationInfo,
  users,
};
