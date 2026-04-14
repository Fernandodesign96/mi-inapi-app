"use client";

import { forwardRef, useState } from "react";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { clsx } from "clsx";

interface FormInputProps {
  label: string;
  placeholder: string;
  type?: "text" | "password" | "tel" | "email";
  icon?: React.ReactNode;
  error?: string;
  isValid?: boolean;
  hint?: string;
  id: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  name?: string;
  autoComplete?: string;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      label,
      placeholder,
      type = "text",
      icon,
      error,
      isValid,
      hint,
      id,
      className,
      value,
      onChange,
      onBlur,
      name,
      autoComplete,
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
      <div className={clsx("flex flex-col", className)}>
        {/* Label */}
        <label
          htmlFor={id}
          className="text-label text-[#4B5563] mb-[6px] block"
        >
          {label}
        </label>

        {/* Input wrapper */}
        <div className="relative">
          {/* Left icon */}
          {icon && (
            <div className="absolute left-[14px] top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none">
              {icon}
            </div>
          )}

          <input
            ref={ref}
            id={id}
            name={name}
            type={inputType}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            autoComplete={autoComplete}
            aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
            aria-invalid={Boolean(error)}
            className={clsx(
              "w-full h-[52px] bg-[#F3F4F6] rounded-[10px] text-[15px] font-sans text-[#111827] placeholder:text-[#9CA3AF] transition-all duration-150 outline-none",
              icon ? "pl-[44px] pr-4" : "px-4",
              isPassword && "pr-[44px]",
              error
                ? "border-2 border-[#DC2626] focus:border-[#DC2626]"
                : isValid
                ? "border-2 border-[#059669]"
                : "border-[1.5px] border-[#E5E7EB] focus:border-[#1A56DB] focus:ring-[3px] focus:ring-[#1A56DB]/15"
            )}
          />

          {/* Password toggle */}
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              className="absolute right-[14px] top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#4B5563] transition-colors focus:outline-none"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}
        </div>

        {/* Error */}
        {error && (
          <div
            id={`${id}-error`}
            role="alert"
            className="flex items-center gap-1 text-[12px] text-[#DC2626] mt-1"
          >
            <AlertCircle size={14} />
            <span>{error}</span>
          </div>
        )}

        {/* Hint */}
        {hint && !error && (
          <p id={`${id}-hint`} className="text-[12px] text-[#9CA3AF] mt-1">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";
export default FormInput;
