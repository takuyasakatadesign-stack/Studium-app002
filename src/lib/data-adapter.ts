import type { MatchScopedData } from "@/types";

export async function fetchMatchData(): Promise<MatchScopedData> {
  const { initialMatchData } = await import("@/lib/mock-data");

  return initialMatchData;
}
