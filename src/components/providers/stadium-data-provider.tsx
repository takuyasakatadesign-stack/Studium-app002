"use client";

import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import type {
  FoodItem,
  GateInfo,
  GoodsItem,
  EventInfo,
  EquipmentPlacementInfo,
  MatchScopedData,
  MediaVisitInfo,
  NewsItem,
  OperationDocument,
  OperationMapAssets,
  Shop,
  StaffAssignmentInfo,
  StaffEquipmentInfo,
  TicketInfo,
  TimelineItem,
  VipRoomInfo,
} from "@/types";

const storageKey = "stadium-match-data-v1";

type StadiumDataContextValue = {
  data: MatchScopedData;
  isHydrated: boolean;
  resetData: () => void;
  setEventInfo: Dispatch<SetStateAction<EventInfo[]>>;
  setEquipmentPlacements: Dispatch<SetStateAction<EquipmentPlacementInfo[]>>;
  setFoodItems: Dispatch<SetStateAction<FoodItem[]>>;
  setGates: Dispatch<SetStateAction<GateInfo[]>>;
  setGoodsItems: Dispatch<SetStateAction<GoodsItem[]>>;
  setMediaVisits: Dispatch<SetStateAction<MediaVisitInfo[]>>;
  setNewsItems: Dispatch<SetStateAction<NewsItem[]>>;
  setOperationDocuments: Dispatch<SetStateAction<OperationDocument[]>>;
  setOperationMapAssets: Dispatch<SetStateAction<OperationMapAssets>>;
  setShop: (shop: Shop) => void;
  setShops: Dispatch<SetStateAction<Shop[]>>;
  setSponsorNotes: Dispatch<SetStateAction<string>>;
  setStaffAssignments: Dispatch<SetStateAction<StaffAssignmentInfo[]>>;
  setStaffEquipment: Dispatch<SetStateAction<StaffEquipmentInfo>>;
  setTickets: Dispatch<SetStateAction<TicketInfo[]>>;
  setTimelineItems: Dispatch<SetStateAction<TimelineItem[]>>;
  setVipRooms: Dispatch<SetStateAction<VipRoomInfo[]>>;
};

const StadiumDataContext = createContext<StadiumDataContextValue | null>(null);

export function StadiumDataProvider({
  children,
  initialData,
}: {
  children: React.ReactNode;
  initialData: MatchScopedData;
}) {
  const [data, setData] = useState<MatchScopedData>(() => {
    if (typeof window === "undefined") {
      return initialData;
    }

    const saved = window.localStorage.getItem(storageKey);

    if (!saved) {
      return initialData;
    }

    try {
      return mergeMatchData(initialData, JSON.parse(saved) as Partial<MatchScopedData>);
    } catch {
      window.localStorage.removeItem(storageKey);
      return initialData;
    }
  });
  const [isHydrated] = useState(true);

  useEffect(() => {
    if (isHydrated) {
      window.localStorage.setItem(storageKey, JSON.stringify(data));
    }
  }, [data, isHydrated]);

  const resolve = <T,>(action: SetStateAction<T>, current: T) =>
    typeof action === "function" ? (action as (value: T) => T)(current) : action;

  const value = useMemo<StadiumDataContextValue>(
    () => ({
      data,
      isHydrated,
      resetData: () => {
        setData(initialData);
        window.localStorage.removeItem(storageKey);
      },
      setEventInfo: (action) =>
        setData((current) => ({
          ...current,
          eventInfo: resolve(action, current.eventInfo),
        })),
      setEquipmentPlacements: (action) =>
        setData((current) => ({
          ...current,
          internalOperationInfo: {
            ...current.internalOperationInfo,
            equipmentPlacements: resolve(
              action,
              current.internalOperationInfo.equipmentPlacements ?? [],
            ),
          },
        })),
      setFoodItems: (action) =>
        setData((current) => ({
          ...current,
          foodItems: resolve(action, current.foodItems),
        })),
      setGates: (action) =>
        setData((current) => ({
          ...current,
          internalOperationInfo: {
            ...current.internalOperationInfo,
            gates: resolve(action, current.internalOperationInfo.gates),
          },
        })),
      setGoodsItems: (action) =>
        setData((current) => ({
          ...current,
          goodsItems: resolve(action, current.goodsItems),
        })),
      setMediaVisits: (action) =>
        setData((current) => ({
          ...current,
          internalOperationInfo: {
            ...current.internalOperationInfo,
            mediaVisits: resolve(
              action,
              current.internalOperationInfo.mediaVisits ?? [],
            ),
          },
        })),
      setNewsItems: (action) =>
        setData((current) => ({
          ...current,
          newsItems: resolve(action, current.newsItems),
        })),
      setOperationDocuments: (action) =>
        setData((current) => ({
          ...current,
          internalOperationInfo: {
            ...current.internalOperationInfo,
            documents: resolve(action, current.internalOperationInfo.documents ?? []),
          },
        })),
      setOperationMapAssets: (action) =>
        setData((current) => ({
          ...current,
          internalOperationInfo: {
            ...current.internalOperationInfo,
            mapAssets: resolve(
              action,
              current.internalOperationInfo.mapAssets ?? {},
            ),
          },
        })),
      setShop: (shop) =>
        setData((current) => ({
          ...current,
          shops: current.shops.map((item) => (item.id === shop.id ? shop : item)),
        })),
      setShops: (action) =>
        setData((current) => ({
          ...current,
          shops: resolve(action, current.shops),
        })),
      setSponsorNotes: (action) =>
        setData((current) => ({
          ...current,
          internalOperationInfo: {
            ...current.internalOperationInfo,
            sponsorNotes: resolve(
              action,
              current.internalOperationInfo.sponsorNotes ?? "",
            ),
          },
        })),
      setStaffAssignments: (action) =>
        setData((current) => ({
          ...current,
          internalOperationInfo: {
            ...current.internalOperationInfo,
            staffAssignments: resolve(
              action,
              current.internalOperationInfo.staffAssignments ?? [],
            ),
          },
        })),
      setStaffEquipment: (action) =>
        setData((current) => ({
          ...current,
          internalOperationInfo: {
            ...current.internalOperationInfo,
            staffEquipment: resolve(
              action,
              current.internalOperationInfo.staffEquipment,
            ),
          },
        })),
      setTickets: (action) =>
        setData((current) => ({
          ...current,
          internalOperationInfo: {
            ...current.internalOperationInfo,
            tickets: resolve(action, current.internalOperationInfo.tickets),
          },
        })),
      setTimelineItems: (action) =>
        setData((current) => ({
          ...current,
          timelineItems: resolve(action, current.timelineItems),
        })),
      setVipRooms: (action) =>
        setData((current) => ({
          ...current,
          internalOperationInfo: {
            ...current.internalOperationInfo,
            vipRooms: resolve(action, current.internalOperationInfo.vipRooms),
          },
        })),
    }),
    [data, initialData, isHydrated],
  );

  return (
    <StadiumDataContext.Provider value={value}>
      {children}
    </StadiumDataContext.Provider>
  );
}

export function useStadiumData() {
  const context = useContext(StadiumDataContext);

  if (!context) {
    throw new Error("useStadiumData must be used within StadiumDataProvider");
  }

  return context;
}

function mergeMatchData(
  initialData: MatchScopedData,
  savedData: Partial<MatchScopedData>,
): MatchScopedData {
  return {
    ...initialData,
    ...savedData,
    match: savedData.match ?? initialData.match,
    nextMatch: savedData.nextMatch ?? initialData.nextMatch,
    timelineItems: savedData.timelineItems ?? initialData.timelineItems,
    eventInfo: savedData.eventInfo ?? initialData.eventInfo,
    shops: savedData.shops ?? initialData.shops,
    foodItems: savedData.foodItems ?? initialData.foodItems,
    goodsItems: savedData.goodsItems ?? initialData.goodsItems,
    accessInfo: {
      ...initialData.accessInfo,
      ...savedData.accessInfo,
    },
    faqItems: savedData.faqItems ?? initialData.faqItems,
    newsItems: savedData.newsItems ?? initialData.newsItems,
    users: savedData.users ?? initialData.users,
    internalOperationInfo: {
      ...initialData.internalOperationInfo,
      ...savedData.internalOperationInfo,
      weather:
        savedData.internalOperationInfo?.weather ??
        initialData.internalOperationInfo.weather,
      attendance:
        savedData.internalOperationInfo?.attendance ??
        initialData.internalOperationInfo.attendance,
      gates:
        savedData.internalOperationInfo?.gates ??
        initialData.internalOperationInfo.gates,
      vipRooms:
        savedData.internalOperationInfo?.vipRooms ??
        initialData.internalOperationInfo.vipRooms,
      staffAssignments:
        savedData.internalOperationInfo?.staffAssignments ??
        initialData.internalOperationInfo.staffAssignments,
      equipmentPlacements:
        savedData.internalOperationInfo?.equipmentPlacements ??
        initialData.internalOperationInfo.equipmentPlacements,
      staffEquipment:
        savedData.internalOperationInfo?.staffEquipment ??
        initialData.internalOperationInfo.staffEquipment,
      tickets:
        savedData.internalOperationInfo?.tickets ??
        initialData.internalOperationInfo.tickets,
      distributions:
        savedData.internalOperationInfo?.distributions ??
        initialData.internalOperationInfo.distributions,
      sponsors:
        savedData.internalOperationInfo?.sponsors ??
        initialData.internalOperationInfo.sponsors,
      sponsorNotes:
        savedData.internalOperationInfo?.sponsorNotes ??
        initialData.internalOperationInfo.sponsorNotes,
      mediaVisits:
        savedData.internalOperationInfo?.mediaVisits ??
        initialData.internalOperationInfo.mediaVisits,
      mapAssets: {
        ...initialData.internalOperationInfo.mapAssets,
        ...savedData.internalOperationInfo?.mapAssets,
      },
      documents:
        savedData.internalOperationInfo?.documents ??
        initialData.internalOperationInfo.documents,
    },
  };
}
