"use client";

export default function AccionTimeline({ pasos }: { pasos: string[] }) {
  return (
    <ol className="relative">
      {pasos.map((paso, index) => {
        const last = index === pasos.length - 1;
        return (
          <li key={paso} className="relative flex gap-3 pb-5 last:pb-0">
            {!last && (
              <span
                className="absolute left-[13px] top-8 bottom-0 w-[2px] bg-primary/35"
                aria-hidden
              />
            )}
            <span
              className="relative z-[1] mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-bold tabular-nums text-white"
              aria-hidden
            >
              {index + 1}
            </span>
            <div className="min-w-0 pt-0.5">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-primary-dark">
                Acción {index + 1}
              </p>
              <p className="mt-1 text-[15px] font-medium leading-snug text-slate-800">
                {paso}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
