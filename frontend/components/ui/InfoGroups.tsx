import { clsx } from "clsx";

export type InfoRowData = { label: string; value: string; mono?: boolean };

const headerTone: Record<string, string> = {
  Expediente: "bg-info text-white",
  Situación: "bg-primary-dark text-white",
  "Plazos y contacto": "bg-foreground text-background",
};

export function InfoGroups({
  groups,
}: {
  groups: { title: string; rows: InfoRowData[] }[];
}) {
  return (
    <div className="space-y-3">
      {groups.map((group) =>
        group.rows.length === 0 ? null : (
          <div
            key={group.title}
            className="overflow-hidden rounded-md border border-border bg-background"
          >
            <p
              className={clsx(
                "px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.12em]",
                headerTone[group.title] ?? "bg-foreground text-background"
              )}
            >
              {group.title}
            </p>
            <div>
              {group.rows.map((row) => (
                <div
                  key={row.label}
                  className="flex items-start justify-between gap-4 px-3.5 py-2.5 bg-background border-t border-border"
                >
                  <span className="text-[12px] font-semibold text-foreground/70 shrink-0 pt-0.5">
                    {row.label}
                  </span>
                  <span
                    className={clsx(
                      "text-[14px] font-semibold text-foreground text-right max-w-[62%] leading-snug",
                      row.mono && "font-mono tabular-nums"
                    )}
                  >
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
}
