import { clsx } from "clsx";
import { SemaphoreVariant } from "./StatusBadge";

export type StepState = "completed" | "current" | "pending";

interface StepperProgressProps {
  steps?: string[];
  currentStep: number;
  stepStates: StepState[];
  currentVariant?: SemaphoreVariant;
}

const currentColors: Record<SemaphoreVariant, string> = {
  danger: "bg-[#DC2626] border-[#DC2626]",
  warning: "bg-[#D97706] border-[#D97706]",
  info: "bg-[#2563EB] border-[#2563EB]",
  success: "bg-[#059669] border-[#059669]",
};

const DEFAULT_STEPS = ["INGRESO", "EXAMEN", "RESOLUCIÓN"];

export default function StepperProgress({
  steps = DEFAULT_STEPS,
  currentStep,
  stepStates,
  currentVariant = "info",
}: StepperProgressProps) {
  return (
    <div className="flex items-center w-full gap-0 my-3">
      {steps.map((step, i) => {
        const state = stepStates[i];
        const isLast = i === steps.length - 1;

        return (
          <div key={step} className="flex items-center flex-1">
            {/* Dot + label */}
            <div className="flex flex-col items-center gap-1 shrink-0">
              <div
                className={clsx(
                  "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
                  state === "completed" &&
                    "bg-[#059669] border-[#059669]",
                  state === "current" && currentColors[currentVariant],
                  state === "pending" && "bg-white border-[#E5E7EB]"
                )}
              >
                {state === "completed" && (
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                  >
                    <path
                      d="M2 5l2.5 2.5L8 3"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
                {state === "current" && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
              <span
                className={clsx(
                  "text-[10px] font-medium uppercase tracking-wide text-center leading-tight",
                  state === "completed" && "text-[#059669]",
                  state === "current" && "text-[#111827] font-semibold",
                  state === "pending" && "text-[#9CA3AF]"
                )}
              >
                {step}
              </span>
            </div>

            {/* Connector line */}
            {!isLast && (
              <div
                className={clsx(
                  "flex-1 h-0.5 mx-1 mb-4",
                  stepStates[i] === "completed" && stepStates[i + 1] !== "pending"
                    ? "bg-[#059669]"
                    : "bg-[#E5E7EB]"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
