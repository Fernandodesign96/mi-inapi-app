import { clsx } from "clsx";
import { Check, Dot } from "lucide-react";

export type StepState = "completed" | "current" | "pending";

interface StepperProgressProps {
  steps?: string[];
  stepStates: StepState[];
  urgency?: "danger" | "warning" | "info" | "success";
}

const DEFAULT_STEPS = [
  "Presentación",
  "Observación",
  "Publicación",
  "Oposición",
  "Resolución",
  "Aceptación",
  "Registro"
];

const urgencyColors = {
  danger: "#DC2626",
  warning: "#D97706",
  info: "#2563EB",
  success: "#059669",
};

export const getStepStates = (estado: string): StepState[] => {
  switch (estado) {
    case 'INGRESO':           
      return ['current', 'pending', 'pending', 'pending', 'pending', 'pending', 'pending'];
    case 'CORRECCION_FORMA':  
    case 'ACCION_REQUERIDA':  
      return ['completed', 'current', 'pending', 'pending', 'pending', 'pending', 'pending'];
    case 'PUBLICACION':       
      return ['completed', 'completed', 'current', 'pending', 'pending', 'pending', 'pending'];
    case 'OPOSICION':         
      return ['completed', 'completed', 'completed', 'current', 'pending', 'pending', 'pending'];
    case 'EXAMEN_FONDO':      
    case 'EN_REVISION':       
      return ['completed', 'completed', 'completed', 'completed', 'current', 'pending', 'pending'];
    case 'ACEPTACION':        
      return ['completed', 'completed', 'completed', 'completed', 'completed', 'current', 'pending'];
    case 'FINALIZADA':        
    case 'REGISTRO':          
      return ['completed', 'completed', 'completed', 'completed', 'completed', 'completed', 'completed'];
    default:                  
      return ['current', 'pending', 'pending', 'pending', 'pending', 'pending', 'pending'];
  }
}

export default function StepperProgress({
  steps = DEFAULT_STEPS,
  stepStates,
  urgency = "info",
}: StepperProgressProps) {
  const currentColor = urgencyColors[urgency];

  return (
    <div className="w-full mt-3 mb-2 overflow-x-auto pb-2 scrollbar-hide">
      <div className="flex items-start min-w-[340px]">
        {steps.map((step, i) => {
          const state = stepStates[i];
          const isLast = i === steps.length - 1;

          // Microcopy logic for specific steps in "current" or "danger/warning"
          let microcopy = "";
          if (state === "current") {
            if (step === "Presentación") microcopy = "(Pago en UTM)";
            if (step === "Publicación") microcopy = "(En Diario Oficial)";
            if (step === "Registro") microcopy = "(Etapa Final)";
          }

          return (
            <div key={`${step}-${i}`} className={clsx("flex flex-col flex-1 items-start min-w-[50px]", !isLast && "mr-0")}>
              
              {/* Top Label (Odds: 1, 3, 5, 7 which means i % 2 !== 0 because 0-indexed) */}
              <div className="h-[24px] flex flex-col justify-end pb-1 w-full relative">
                {i % 2 !== 0 && (
                  <div className="absolute bottom-1 flex flex-col items-start pr-1 w-[60px] -ml-2 -mb-0.5">
                    <span
                      className={clsx(
                        "text-[9px] uppercase font-sans tracking-tight leading-none",
                        state === "completed" && "text-[#059669] font-medium",
                        state === "current" && "font-bold",
                        state === "pending" && "text-[#9CA3AF] font-normal"
                      )}
                      style={state === "current" ? { color: currentColor } : {}}
                    >
                      {step}
                    </span>
                    {microcopy && (
                      <span 
                        className="mt-[2px] text-[8px] font-semibold leading-[1]"
                        style={{ color: currentColor, opacity: 0.8 }}
                      >
                        {microcopy}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Circle & Line */}
              <div className="flex items-center w-full z-10">
                {/* Circle */}
                <div
                  className={clsx(
                    "w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-colors z-10",
                    state === "completed" && "bg-[#059669]",
                    state === "current" && "bg-current",
                    state === "pending" && "bg-[#E5E7EB] border-2 border-[#D1D5DB]"
                  )}
                  style={state === "current" ? { backgroundColor: currentColor } : {}}
                >
                  {state === "completed" && <Check size={10} strokeWidth={3} className="text-white" />}
                  {state === "current" && <Dot size={18} strokeWidth={4} className="text-white" />}
                </div>

                {/* Connector Line */}
                {!isLast && (
                  <div
                    className={clsx(
                      "flex-1 h-[2px] transition-colors -ml-1 -mr-1",
                      state === "completed" && stepStates[i + 1] !== "pending"
                        ? "bg-[#059669]"
                        : "bg-[#E5E7EB]"
                    )}
                  />
                )}
              </div>

              {/* Bottom Label (Evens: 0, 2, 4, 6) */}
              <div className="h-[24px] pt-[6px] w-full relative">
                {i % 2 === 0 && (
                  <div className="absolute top-[6px] flex flex-col items-start pr-1 w-[60px] -ml-2">
                    <span
                      className={clsx(
                        "text-[9px] uppercase font-sans tracking-tight leading-none",
                        state === "completed" && "text-[#059669] font-medium",
                        state === "current" && "font-bold",
                        state === "pending" && "text-[#9CA3AF] font-normal"
                      )}
                      style={state === "current" ? { color: currentColor } : {}}
                    >
                      {step}
                    </span>
                    {microcopy && (
                      <span 
                        className="mt-[2px] text-[8px] font-semibold leading-[1]"
                        style={{ color: currentColor, opacity: 0.8 }}
                      >
                        {microcopy}
                      </span>
                    )}
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
