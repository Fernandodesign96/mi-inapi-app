"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { User, Lock, Fingerprint, ShieldCheck } from "lucide-react";
import FormInput from "@/components/ui/FormInput";
import CTAButton from "@/components/ui/CTAButton";
import TopBar from "@/components/ui/TopBar";

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
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async () => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsLoading(false);
    router.push("/inicio");
  };

  const handleClaveUnica = async () => {
    setIsCULoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setIsCULoading(false);
    router.push("/inicio");
  };

  const handleRUTChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatRUT(e.target.value);
    setRutValue(formatted);
    setValue("rut", formatted, { shouldValidate: true });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F9FAFB]">
      <TopBar variant="home" showNotifications={false} showProfile={false} />

      <div className="flex-1 overflow-y-auto px-[24px] flex flex-col items-stretch screen-enter">
        {/* HERO ICON BLOCK */}
        <div className="mt-[40px] mb-[24px] flex justify-center">
          <div className="w-[80px] h-[80px] bg-[#EDE9FE] rounded-[20px] flex items-center justify-center">
            <ShieldCheck size={40} className="text-[#7C3AED]" strokeWidth={2.5} />
          </div>
        </div>

        {/* HEADING BLOCK */}
        <div className="text-center">
          <h1 className="text-h1 text-[#111827]">Acceso Institucional</h1>
          <p className="text-body-sm text-[#4B5563] mt-[4px]">
            Ingresa a tu cuenta MiINAPI
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-[32px] space-y-[16px]">
          <FormInput
            id="rut"
            label="RUT"
            placeholder="12.345.678-9"
            icon={<User size={20} />}
            value={rutValue}
            onChange={handleRUTChange}
            error={errors.rut?.message}
            autoComplete="username"
          />

          <div className="space-y-[16px]">
            <FormInput
              id="password"
              label="CONTRASEÑA"
              placeholder="••••••••"
              type="password"
              icon={<Lock size={20} />}
              error={errors.password?.message}
              autoComplete="current-password"
            />
            
            <div className="flex justify-end pr-1">
              <button
                type="button"
                className="text-body-sm text-[#7C3AED] hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          </div>

          <div className="pt-[8px] space-y-[12px]">
            <CTAButton
              type="submit"
              label="Ingresar"
              variant="primary"
              size="lg"
              fullWidth
              isLoading={isLoading}
            />

            <div className="flex items-center gap-3 py-2">
              <hr className="flex-1 border-[#E5E7EB]" />
              <span className="text-[12px] text-[#9CA3AF] font-medium">o</span>
              <hr className="flex-1 border-[#E5E7EB]" />
            </div>

            <CTAButton
              type="button"
              onClick={handleClaveUnica}
              label="Ingresar con ClaveÚnica"
              variant="outline"
              size="lg"
              fullWidth
              isLoading={isCULoading}
              icon={<Fingerprint size={18} className="text-[#7C3AED]" />}
            />
          </div>
        </form>

        {/* REGISTER */}
        <p className="text-center text-body-sm text-[#4B5563] mt-[16px]">
          ¿No tienes una cuenta?{" "}
          <button className="text-[#1A56DB] underline font-medium">
            Regístrate ahora
          </button>
        </p>

        {/* FOOTER */}
        <div className="mt-[40px] mb-[24px] text-center">
          <p className="text-label text-[#9CA3AF]">
            INSTITUTO NACIONAL DE PROPIEDAD INDUSTRIAL © 2026
          </p>
        </div>
      </div>
    </div>
  );
}
