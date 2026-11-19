import { clsx } from "clsx";
import type { LucideIcon } from "lucide-react";

const tones = {
  info: {
    bar: "border-l-primary",
    iconWrap: "bg-primary-light text-primary-dark",
    title: "text-primary-dark",
  },
  danger: {
    bar: "border-l-accent",
    iconWrap: "bg-accent-light text-accent",
    title: "text-accent",
  },
};

export default function AvisoToast({
  icon: Icon,
  title,
  body,
  tone = "info",
}: {
  icon: LucideIcon;
  title: string;
  body: string;
  tone?: "info" | "danger";
}) {
  const t = tones[tone];
  return (
    <div
      className={clsx(
        "flex gap-3 rounded-md border border-black/5 bg-white border-l-[4px] px-3.5 py-3.5 shadow-sm",
        t.bar
      )}
    >
      <span
        className={clsx(
          "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md",
          t.iconWrap
        )}
      >
        <Icon size={18} strokeWidth={2.4} aria-hidden />
      </span>
      <div className="min-w-0">
        <p className={clsx("text-[14px] font-bold leading-tight", t.title)}>
          {title}
        </p>
        <p className="mt-1 text-[14px] font-medium leading-relaxed text-slate-800">
          {body}
        </p>
      </div>
    </div>
  );
}
