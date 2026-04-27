import type { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export function EmptyState({
  description,
  icon: Icon,
  title,
}: {
  description: string;
  icon: LucideIcon;
  title: string;
}) {
  return (
    <Card className="rounded-lg border-dashed shadow-sm">
      <CardContent className="flex flex-col items-center gap-3 p-6 text-center">
        <Icon className="size-6 text-muted-foreground" />
        <div>
          <p className="font-semibold">{title}</p>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
