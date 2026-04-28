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
  MatchScopedData,
  NewsItem,
  Shop,
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
  setFoodItems: Dispatch<SetStateAction<FoodItem[]>>;
  setGates: Dispatch<SetStateAction<GateInfo[]>>;
  setGoodsItems: Dispatch<SetStateAction<GoodsItem[]>>;
  setNewsItems: Dispatch<SetStateAction<NewsItem[]>>;
  setShop: (shop: Shop) => void;
  setShops: Dispatch<SetStateAction<Shop[]>>;
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
      return JSON.parse(saved) as MatchScopedData;
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
      setNewsItems: (action) =>
        setData((current) => ({
          ...current,
          newsItems: resolve(action, current.newsItems),
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
