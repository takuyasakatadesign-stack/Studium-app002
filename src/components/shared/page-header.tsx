import { Badge } from "@/components/ui/badge";

type PageHeaderProps = {
  badge: string;
  title: string;
  description: string;
};

export function PageHeader({ badge, title, description }: PageHeaderProps) {
  return (
    <section className="space-y-3">
      <Badge variant="secondary">{badge}</Badge>
      <div className="max-w-3xl space-y-2">
        <h1 className="text-3xl font-semibold tracking-normal md:text-4xl">
          {title}
        </h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </section>
  );
}
