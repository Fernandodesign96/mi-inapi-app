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
    >
      {/* Header */}
      <div className="px-[14px] py-[10px] bg-[#F9FAFB] border-b border-[#E5E7EB]">
        <p className="text-label text-[#4B5563]">
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
            i > 0 && "border-t border-[#E5E7EB]"
          )}
        >
          <span
            role="cell"
            className="text-[12px] font-sans font-medium text-[#9CA3AF] shrink-0 w-[110px]"
          >
            {row.label}
          </span>
          <span
            role="cell"
            className={clsx(
              "text-[13px] font-sans text-[#111827] font-medium leading-relaxed",
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
