"use client";

import { useRef } from "react";
import { clsx } from "clsx";
import { Check, Dot } from "lucide-react";
import {
  ETAPAS_MI_INAPI,
  STEPPER_LABELS,
  getStepStatesByIndex,
  type StepState,
} from "@/lib/etapasMiInapi";

export type { StepState };

interface StepperProgressProps {
  steps?: string[];
  stepStates: StepState[];
  urgency?: "danger" | "warning" | "info" | "success" | "neutral";
}

const DEFAULT_STEPS = STEPPER_LABELS;

const urgencyColors = {
  danger: "#FB3B3B",
  warning: "#FF5722",
  info: "#2196F3",
  success: "#4CAF50",
  neutral: "#6B7280",
};

const LEGACY_ESTADO_TO_INDEX: Record<string, { index: number; allCompleted?: boolean }> = {
  INGRESO: { index: 0 },
  CORRECCION_FORMA: { index: 1 },
  ACCION_REQUERIDA: { index: 1 },
  PUBLICACION: { index: 2 },
  OPOSICION: { index: 3 },
  EXAMEN_FONDO: { index: 4 },
  EN_REVISION: { index: 4 },
  ACEPTACION: { index: 5 },
  FINALIZADA: { index: 6, allCompleted: true },
  REGISTRO: { index: 6, allCompleted: true },
};

export const getStepStates = (estado: string): StepState[] => {
  const mapped = LEGACY_ESTADO_TO_INDEX[estado];
  if (!mapped) return getStepStatesByIndex(0);
  return getStepStatesByIndex(mapped.index, { allCompleted: mapped.allCompleted });
};

export default function StepperProgress({
  steps = DEFAULT_STEPS,
  stepStates,
  urgency = "info",
}: StepperProgressProps) {
  const currentColor = urgencyColors[urgency];
  const scrollerRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, startScroll: 0 });

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el) return;
    drag.current = {
      active: true,
      startX: e.clientX,
      startScroll: el.scrollLeft,
    };
    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el || !drag.current.active) return;
    el.scrollLeft = drag.current.startScroll - (e.clientX - drag.current.startX);
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    drag.current.active = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }
  };

  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el) return;
    if (Math.abs(e.deltaY) >= Math.abs(e.deltaX)) {
      el.scrollLeft += e.deltaY;
    } else {
      el.scrollLeft += e.deltaX;
    }
  };

  return (
    <div className="relative mt-3 mb-1">
      <div
        ref={scrollerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onWheel={onWheel}
        className="flex overflow-x-auto hide-scrollbar touch-pan-x overscroll-x-contain py-1 cursor-grab active:cursor-grabbing select-none"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, #000 0, #000 calc(100% - 2rem), transparent 100%)",
          maskImage:
            "linear-gradient(to right, #000 0, #000 calc(100% - 2rem), transparent 100%)",
        }}
        aria-label="Etapas del trámite. Arrastra o desliza hacia los lados para ver todas."
      >
        <div className="flex min-w-[920px] w-full pr-10">
          {steps.map((step, i) => {
            const state = stepStates[i];
            const isLast = i === steps.length - 1;
            const etapa = ETAPAS_MI_INAPI[i];
            const microcopy = etapa?.microcopy ?? "";

            return (
              <div
                key={`${step}-${i}`}
                className="flex flex-col flex-1 items-stretch min-w-[124px]"
              >
                <div className="flex items-center w-full">
                  <div
                    className={clsx(
                      "w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-colors z-10",
                      state === "completed" && "bg-success",
                      state === "current" && "bg-current",
                      state === "pending" && "bg-surface-elevated border-2 border-border-strong"
                    )}
                    style={state === "current" ? { backgroundColor: currentColor } : {}}
                    aria-current={state === "current" ? "step" : undefined}
                  >
                    {state === "completed" && (
                      <Check size={10} strokeWidth={3} className="text-white" />
                    )}
                    {state === "current" && (
                      <Dot size={18} strokeWidth={4} className="text-white" />
                    )}
                  </div>
                  {!isLast && (
                    <div
                      className={clsx(
                        "flex-1 h-[2px] -ml-1 -mr-1",
                        state === "completed" && stepStates[i + 1] !== "pending"
                          ? "bg-success"
                          : "bg-border"
                      )}
                    />
                  )}
                </div>

                <div className="pt-2 pr-3 min-h-[3.25rem]">
                  <span
                    className={clsx(
                      "block text-[12px] leading-snug tracking-normal normal-case",
                      state === "completed" && "text-success font-medium",
                      state === "current" && "font-semibold",
                      state === "pending" && "text-muted font-normal"
                    )}
                    style={state === "current" ? { color: currentColor } : {}}
                  >
                    {step}
                  </span>
                  {microcopy ? (
                    <span
                      className={clsx(
                        "mt-0.5 block text-[11px] leading-snug normal-case",
                        state === "pending" ? "text-muted" : "font-medium"
                      )}
                      style={
                        state === "current"
                          ? { color: currentColor, opacity: 0.85 }
                          : state === "completed"
                            ? { color: "#4CAF50", opacity: 0.9 }
                            : undefined
                      }
                    >
                      {microcopy}
                    </span>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
