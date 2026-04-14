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
const MOCK_CREDENTIALS = {
  rut: '12.345.678-9',
  rutClean: '123456789',   // sin puntos ni guión
  password: 'miinapi2026',
}

function validateRUT(rut: string): boolean {
  // Limpiar: remover puntos, guiones y espacios
  const clean = rut.replace(/[\.\-\s]/g, '').toUpperCase()
  if (clean.length < 2) return false

  const body = clean.slice(0, -1)
  const dv = clean.slice(-1)

  // Verificar que el body sea numérico
  if (!/^\d+$/.test(body)) return false

  // Algoritmo módulo 11
  let sum = 0
  let multiplier = 2
  for (let i = body.length - 1; i >= 0; i--) {
    sum += parseInt(body[i]) * multiplier
    multiplier = multiplier === 7 ? 2 : multiplier + 1
  }
  const remainder = 11 - (sum % 11)
  const expected = remainder === 11 ? '0' : remainder === 10 ? 'K' : String(remainder)

  // Permitir la validación directa si es la cuenta demo
  if (clean === MOCK_CREDENTIALS.rutClean) return true

  return expected === dv
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
  password: z.string({ required_error: "Rut o contraseña ingresados incorrectos, vuelve a intentar." }).min(1, "Rut o contraseña ingresados incorrectos, vuelve a intentar."),
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
    setError,
    formState: { errors },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    
    const cleanRut = data.rut.replace(/[\.\-\s]/g, '').toUpperCase()
    const isDemo = (
      cleanRut === MOCK_CREDENTIALS.rutClean &&
      data.password === MOCK_CREDENTIALS.password
    )

    if (!isDemo) {
      setError("password", { message: "Rut o contraseña ingresados incorrectos, vuelve a intentar." });
      setIsLoading(false);
      return;
    }

    // Set mock auth cookie
    document.cookie = 'miinapi-auth=mock-session; path=/; max-age=3600';
    
    setIsLoading(false);
    router.push("/inicio");
  };

  const handleClaveUnica = async () => {
    setIsCULoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    
    // Set mock auth cookie
    document.cookie = "miinapi-auth=true; path=/; max-age=3600; samesite=lax";
    
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
            hint="Ingresa tu RUT con puntos y guión"
          />

          <div className="space-y-[16px]">
            <FormInput
              id="password"
              label="CONTRASEÑA"
              placeholder="Ingresa tu contraseña"
              type="password"
              icon={<Lock size={20} />}
              {...register("password")}
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

            <p className="text-center text-xs text-[#9CA3AF] mt-2">
              Demo: RUT <span className="font-mono">12.345.678-9</span> · Contraseña <span className="font-mono">miinapi2026</span>
            </p>
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
