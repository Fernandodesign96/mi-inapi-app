"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { User, Lock, Fingerprint, ShieldCheck } from "lucide-react";
import FormInput from "@/components/ui/FormInput";
import CTAButton from "@/components/ui/CTAButton";

/* === Validación RUT chileno === */
function validateRUT(rut: string): boolean {
  const clean = rut.replace(/[.\-]/g, "").trim();
  if (clean.length < 8 || clean.length > 9) return false;
  const body = clean.slice(0, -1);
  const dv = clean.slice(-1).toUpperCase();
  let sum = 0;
  let factor = 2;
  for (let i = body.length - 1; i >= 0; i--) {
    sum += parseInt(body[i]) * factor;
    factor = factor === 7 ? 2 : factor + 1;
  }
  const expected = 11 - (sum % 11);
  const expectedDv =
    expected === 11 ? "0" : expected === 10 ? "K" : String(expected);
  return dv === expectedDv;
}

/* === Formateo automático RUT === */
function formatRUT(value: string): string {
  const clean = value.replace(/[^0-9kK]/g, "");
  if (clean.length <= 1) return clean;
  const body = clean.slice(0, -1);
  const dv = clean.slice(-1);
  const formatted = body.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${formatted}-${dv}`;
}

const loginSchema = z.object({
  rut: z.string().min(1, "Ingresa tu RUT").refine(validateRUT, {
    message: "RUT inválido. Ej: 12.345.678-9",
  }),
  password: z.string().min(1, "Ingresa tu contraseña"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isCULoading, setIsCULoading] = useState(false);
  const [rutValue, setRutValue] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (_data: LoginForm) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setIsLoading(false);
    router.push("/inicio");
  };

  const handleClaveUnica = async () => {
    setIsCULoading(true);
    await new Promise((r) => setTimeout(r, 1300));
    setIsCULoading(false);
    router.push("/inicio");
  };

  const handleRUTChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatRUT(e.target.value);
    setRutValue(formatted);
    setValue("rut", formatted, { shouldValidate: false });
  };

  return (
    <div className="min-h-dvh bg-[#F9FAFB] flex flex-col">
      {/* TopBar Login */}
      <header className="flex items-center gap-2.5 px-5 h-[56px] bg-white border-b border-[#E5E7EB]">
        <div className="w-7 h-7 rounded-[6px] bg-[#1E3A8A] flex items-center justify-center">
          <span className="text-white font-bold text-sm">I</span>
        </div>
        <span className="text-[16px] font-semibold text-[#111827]">MiINAPI</span>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 py-8">
        {/* Hero icon */}
        <div className="flex justify-center mb-6">
          <div
            className="w-20 h-20 rounded-[20px] flex items-center justify-center"
            style={{ background: "#EDE9FE" }}
          >
            <ShieldCheck size={40} color="#7C3AED" strokeWidth={1.5} />
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-[24px] font-bold text-[#111827] mb-1">
            Acceso Institucional
          </h1>
          <p className="text-[14px] text-[#4B5563]">
            Ingresa a tu cuenta MiINAPI
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
          <FormInput
            id="rut"
            label="RUT"
            placeholder="12.345.678-9"
            type="tel"
            icon={<User size={18} />}
            error={errors.rut?.message}
            value={rutValue}
            onChange={handleRUTChange}
            autoComplete="username"
            hint="Ingresa tu RUT sin puntos ni guión o con formato 12.345.678-9"
          />

          <FormInput
            id="password"
            label="Contraseña"
            placeholder="••••••••"
            type="password"
            icon={<Lock size={18} />}
            error={errors.password?.message}
            autoComplete="current-password"
            {...register("password")}
          />

          {/* Forgot password */}
          <div className="flex justify-end">
            <button
              type="button"
              className="text-[13px] text-[#7C3AED] font-medium focus:outline-none focus:underline"
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          {/* Submit */}
          <CTAButton
            type="submit"
            variant="primary"
            label="Ingresar"
            isLoading={isLoading}
            fullWidth
            size="lg"
            className="mt-2 !bg-[#7C3AED] hover:!bg-[#6D28D9] active:!bg-[#5B21B6]"
          />
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-[#E5E7EB]" />
          <span className="text-[13px] text-[#9CA3AF]">o</span>
          <div className="flex-1 h-px bg-[#E5E7EB]" />
        </div>

        {/* ClaveÚnica */}
        <button
          type="button"
          onClick={handleClaveUnica}
          disabled={isCULoading}
          className="w-full h-[52px] rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center gap-2.5 text-[15px] font-semibold text-[#111827] transition-colors hover:bg-[#F3F4F6] active:bg-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#1A56DB] disabled:opacity-50"
        >
          {isCULoading ? (
            <span className="text-[14px] text-[#4B5563]">Conectando con ClaveÚnica...</span>
          ) : (
            <>
              <Fingerprint size={20} color="#4B5563" />
              ClaveÚnica
            </>
          )}
        </button>

        {/* Register link */}
        <p className="text-center text-[14px] text-[#4B5563] mt-5">
          ¿No tienes una cuenta?{" "}
          <button className="text-[#1A56DB] font-semibold focus:outline-none focus:underline">
            Regístrate ahora
          </button>
        </p>
      </div>

      {/* Footer */}
      <p className="text-center text-[10px] text-[#9CA3AF] py-4 px-5">
        INSTITUTO NACIONAL DE PROPIEDAD INDUSTRIAL © 2026
      </p>
    </div>
  );
}
