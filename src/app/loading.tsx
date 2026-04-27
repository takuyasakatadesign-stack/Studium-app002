import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-[360px] items-center justify-center">
      <div className="flex items-center gap-2 rounded-lg border bg-card px-4 py-3 text-sm text-muted-foreground shadow-sm">
        <Loader2 className="size-4 animate-spin" />
        読み込み中です
      </div>
    </div>
  );
}
