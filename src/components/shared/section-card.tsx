import Link from "next/link";
import type { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

type SectionCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  href?: string;
};

export function SectionCard({
  icon: Icon,
  title,
  description,
  href,
}: SectionCardProps) {
  const body = (
    <Card className="h-full transition-colors hover:bg-muted/40">
      <CardContent className="space-y-3 p-5">
        <Icon className="size-5" />
        <div>
          <h2 className="font-semibold">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );

  if (!href) {
    return body;
  }

  return <Link href={href}>{body}</Link>;
}
