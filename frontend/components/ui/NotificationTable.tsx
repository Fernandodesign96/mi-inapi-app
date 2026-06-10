import { clsx } from "clsx";

export interface NotificationRow {
  label: string;
  value: string;
  isMono?: boolean;
}

interface NotificationTableProps {
  rows: NotificationRow[];
  className?: string;
}

export default function NotificationTable({ rows, className }: NotificationTableProps) {
  return (
    <div
      className={clsx(
        "border border-border rounded-md overflow-hidden bg-surface",
        className
      )}
      role="table"
    >
      {/* Header */}
      <div className="px-[14px] py-[10px] bg-background border-b border-border">
        <p className="text-label text-muted-secondary">
          DETALLE DE LA NOTIFICACIÓN
        </p>
      </div>

      {/* Rows */}
      {rows.map((row, i) => (
        <div
          key={i}
          role="row"
          className={clsx(
            "flex items-baseline gap-3 px-[14px] py-[10px]",
            i > 0 && "border-t border-border"
          )}
        >
          <span
            role="cell"
            className="text-body-xs font-sans font-medium text-muted shrink-0 w-[110px]"
          >
            {row.label}
          </span>
          <span
            role="cell"
            className={clsx(
              "text-body-sm font-sans text-foreground font-medium leading-relaxed",
              (row.isMono || row.value.includes('#') || /\d{2,}/.test(row.value)) && "text-mono"
            )}
          >
            {row.value}
          </span>
        </div>
      ))}
    </div>
  );
}
