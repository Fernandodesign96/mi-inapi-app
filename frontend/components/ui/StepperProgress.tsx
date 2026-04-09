import { clsx } from "clsx";
import { Check, Dot } from "lucide-react";

export type StepState = "completed" | "current" | "pending";

interface StepperProgressProps {
  steps?: string[];
  stepStates: StepState[];
  urgency?: "danger" | "warning" | "info" | "success";
}

const DEFAULT_STEPS = ["INGRESO", "EXAMEN", "RESOLUCIÓN"];

const urgencyColors = {
  danger: "#DC2626",
  warning: "#D97706",
  info: "#2563EB",
  success: "#059669",
};

export default function StepperProgress({
  steps = DEFAULT_STEPS,
  stepStates,
  urgency = "info",
}: StepperProgressProps) {
  const currentColor = urgencyColors[urgency];

  return (
    <div className="flex items-center w-full gap-0 mt-3 mb-2">
      {steps.map((step, i) => {
        const state = stepStates[i];
        const isLast = i === steps.length - 1;

        return (
          <div key={`${step}-${i}`} className={clsx("flex flex-col flex-1", !isLast && "mr-0")}>
            <div className="flex items-center">
              {/* Circle */}
              <div
                className={clsx(
                  "w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors",
                  state === "completed" && "bg-[#059669]",
                  state === "current" && "bg-current",
                  state === "pending" && "bg-[#E5E7EB] border-2 border-[#D1D5DB]"
                )}
                style={state === "current" ? { backgroundColor: currentColor } : {}}
              >
                {state === "completed" && <Check size={12} strokeWidth={3} className="text-white" />}
                {state === "current" && <Dot size={18} strokeWidth={4} className="text-white" />}
              </div>

              {/* Connector Line */}
              {!isLast && (
                <div
                  className={clsx(
                    "flex-1 h-[2px] transition-colors",
                    state === "completed" && stepStates[i + 1] !== "pending"
                      ? "bg-[#059669]"
                      : "bg-[#E5E7EB]"
                  )}
                />
              )}
            </div>

            {/* Label */}
            <span
              className={clsx(
                "mt-1 text-[10px] uppercase font-sans tracking-tight",
                state === "completed" && "text-[#059669] font-medium",
                state === "current" && "font-bold",
                state === "pending" && "text-[#9CA3AF] font-normal"
              )}
              style={state === "current" ? { color: currentColor } : {}}
            >
              {step}
            </span>
          </div>
        );
      })}
    </div>
  );
}
