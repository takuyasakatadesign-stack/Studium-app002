"use client";

import { CheckCircle2 } from "lucide-react";
import { useEffect } from "react";

type SaveToastProps = {
  message: string | null;
  onClose: () => void;
};

export function SaveToast({ message, onClose }: SaveToastProps) {
  useEffect(() => {
    if (!message) {
      return;
    }

    const timer = window.setTimeout(onClose, 3200);

    return () => window.clearTimeout(timer);
  }, [message, onClose]);

  if (!message) {
    return null;
  }

  return (
    <div
      aria-live="polite"
      className="fixed bottom-5 left-4 right-4 z-50 mx-auto flex max-w-md items-start gap-3 rounded-lg border border-emerald-200 bg-white p-4 text-sm text-slate-900 shadow-xl sm:bottom-6 sm:left-auto sm:right-6 sm:mx-0"
      role="status"
    >
      <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-600" />
      <div>
        <p className="font-semibold">保存しました</p>
        <p className="mt-0.5 text-slate-600">{message}</p>
      </div>
    </div>
  );
}
