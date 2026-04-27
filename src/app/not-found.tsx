import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="flex min-h-[420px] items-center justify-center">
      <Card className="w-full max-w-lg rounded-lg shadow-sm">
        <CardContent className="space-y-4 p-6 text-center">
          <p className="text-sm font-semibold text-sky-700">NOT FOUND</p>
          <h1 className="text-2xl font-semibold">ページが見つかりません</h1>
          <p className="text-sm text-muted-foreground">
            対象の売店・商品・ページが存在しないか、URLが変更されています。
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
            <Button asChild>
              <Link href="/">公開画面へ戻る</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/gourmet">グルメを見る</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
