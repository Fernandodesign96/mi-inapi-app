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
        "border border-[#E5E7EB] rounded-[10px] overflow-hidden bg-white",
        className
      )}
      role="table"
      aria-label="Detalle de la notificación"
    >
      {/* Header */}
      <div className="px-3.5 py-2.5 bg-[#F9FAFB] border-b border-[#E5E7EB]">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-[#4B5563]">
          Detalle de la Notificación
        </p>
      </div>

      {/* Rows */}
      {rows.map((row, i) => (
        <div
          key={i}
          role="row"
          className={clsx(
            "flex items-baseline gap-3 px-3.5 py-2.5",
            i > 0 && "border-t border-[#E5E7EB]"
          )}
        >
          <span
            role="cell"
            className="text-[12px] text-[#9CA3AF] font-medium shrink-0 w-[110px]"
          >
            {row.label}
          </span>
          <span
            role="cell"
            className={clsx(
              "text-[13px] text-[#111827] font-medium",
              row.isMono && "font-mono"
            )}
          >
            {row.value}
          </span>
        </div>
      ))}
    </div>
  );
}
