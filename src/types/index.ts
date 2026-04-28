export type UserRole = "fan" | "shop_staff" | "club_staff" | "admin";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  shopId?: string;
};

export type Match = {
  id: string;
  homeTeam: string;
  opponent: string;
  date: string;
  kickoffTime: string;
  venue: string;
  round: string;
  matchName: string;
};

export type TimelineItem = {
  id: string;
  matchId: string;
  time: string;
  title: string;
  description: string;
  location: string;
  note?: string;
};

export type EventInfo = {
  id: string;
  matchId: string;
  category: "special" | "basic" | "booth" | "gathering";
  title: string;
  department: string;
  ownerName?: string;
  location: string;
  startTime: string;
  endTime?: string;
  gatheringTime?: string;
  gatheringLocation?: string;
  dismissalTime?: string;
  dismissalLocation?: string;
  receptionOwner?: string;
  planningOwner?: string;
  description: string;
  participationRule?: string;
  imageUrl?: string;
  showOnTop?: boolean;
};

export type Shop = {
  id: string;
  matchId: string;
  name: string;
  description: string;
  location: string;
  mapArea: string;
  snsLinks: {
    x?: string;
    instagram?: string;
    website?: string;
  };
  staffUserId: string;
};

export type FoodItem = {
  id: string;
  matchId: string;
  shopId: string;
  name: string;
  genre: string;
  price: number;
  description: string;
  imageUrl?: string;
  showOnTop?: boolean;
};

export type GoodsItem = {
  id: string;
  matchId: string;
  name: string;
  price: number;
  saleLocation: string;
  description: string;
  isNew: boolean;
  imageUrl?: string;
  showOnTop?: boolean;
};

export type NewsItem = {
  id: string;
  matchId: string;
  title: string;
  date: string;
  category: string;
  body: string;
};

export type FAQItem = {
  id: string;
  matchId: string;
  category: string;
  question: string;
  answer: string;
};

export type AccessInfo = {
  matchId: string;
  stadiumName: string;
  address: string;
  train: string;
  bus: string;
  parking: string;
  mapImageUrl?: string;
};

export type GateInfo = {
  id: string;
  name: string;
  openTime: string;
  lanes: string;
  targetAudience?: string;
};

export type VipRoomInfo = {
  id: string;
  roomName: string;
  userName: string;
  guestCount: number;
  service: string;
  note?: string;
};

export type StaffEquipmentInfo = {
  radios: number;
  volunteers: number;
  equipmentOrders: string[];
  flagsAndSigns: string;
};

export type StaffAssignmentInfo = {
  id: string;
  label: string;
  count: number;
};

export type EquipmentPlacementInfo = {
  id: string;
  name: string;
  quantity: string;
  location: string;
  note?: string;
};

export type TicketInfo = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  benefit: string;
  exchangeMethod: string;
};

export type DistributionInfo = {
  id: string;
  name: string;
  location: string;
  quantity: number;
  deliveryInfo: string;
  department: string;
};

export type IrregularOperationItem = {
  id: string;
  title: string;
  category: string;
  owner: string;
  status: string;
  location?: string;
  note: string;
};

export type SponsorInfo = {
  id: string;
  name: string;
  location: string;
  ownerDepartment: string;
  note: string;
};

export type MediaVisitInfo = {
  id: string;
  mediaName: string;
  mediaType: "中継" | "映像" | "フォト" | "ペン" | "その他";
  representative: string;
  peopleCount: number;
  waitingRoom: string;
  viewingLocation: string;
};

export type OperationMapAssets = {
  venueMapImageUrl?: string;
  parkingMapImageUrl?: string;
  seatingChartImageUrl?: string;
};

export type OperationDocument = {
  id: string;
  title: string;
  fileName: string;
  fileUrl: string;
};

export type InternalOperationInfo = {
  matchId: string;
  weather: {
    forecast: string;
    temperature: string;
    windSpeed: string;
  };
  attendance: {
    expectedVisitors: number;
    advanceTicketsSold: number;
    visitorSeatsSold: number;
    parkingStatus: string;
  };
  gates: GateInfo[];
  vipRooms: VipRoomInfo[];
  staffAssignments: StaffAssignmentInfo[];
  equipmentPlacements: EquipmentPlacementInfo[];
  staffEquipment: StaffEquipmentInfo;
  tickets: TicketInfo[];
  distributions: DistributionInfo[];
  sponsors: SponsorInfo[];
  sponsorNotes: string;
  mediaVisits: MediaVisitInfo[];
  mapAssets: OperationMapAssets;
  documents: OperationDocument[];
  irregularItems: IrregularOperationItem[];
};

export type MatchScopedData = {
  match: Match;
  nextMatch: Match;
  timelineItems: TimelineItem[];
  eventInfo: EventInfo[];
  shops: Shop[];
  foodItems: FoodItem[];
  goodsItems: GoodsItem[];
  accessInfo: AccessInfo;
  faqItems: FAQItem[];
  newsItems: NewsItem[];
  internalOperationInfo: InternalOperationInfo;
  users: User[];
};
