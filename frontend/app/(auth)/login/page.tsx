"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { User, Lock, ShieldCheck } from "lucide-react";
import FormInput from "@/components/ui/FormInput";
import CTAButton from "@/components/ui/CTAButton";
import ClaveUnicaButton from "@/components/ui/ClaveUnicaButton";
import TopBar from "@/components/ui/TopBar";
import {
  findInapiCuenta,
  isInapiRutNum,
  INAPI_LOGIN_EJEMPLOS,
} from "@/lib/datosReales";
import { writeClaveUnicaSession, writeInapiSession } from "@/lib/session";
import { useAppStore } from "@/lib/store";

function digitsOnly(rut: string): string {
  return rut.replace(/[^\d]/g, "");
}

function validateRUT(rut: string): boolean {
  const clean = rut.replace(/[\.\-\s]/g, "").toUpperCase();
  if (isInapiRutNum(clean) || isInapiRutNum(digitsOnly(clean))) return true;
  if (clean.length < 2) return false;

  const body = clean.slice(0, -1);
  const dv = clean.slice(-1);

  if (!/^\d+$/.test(body)) return false;

  let sum = 0;
  let multiplier = 2;
  for (let i = body.length - 1; i >= 0; i--) {
    sum += parseInt(body[i]) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }
  const remainder = 11 - (sum % 11);
  const expected =
    remainder === 11 ? "0" : remainder === 10 ? "K" : String(remainder);

  return expected === dv;
}

function formatRUT(value: string): string {
  const clean = value.replace(/[^0-9kK]/g, "");
  if (clean.length <= 1) return clean;
  const digits = clean.replace(/[kK]/g, "");
  if (/^\d{5,8}$/.test(digits) || isInapiRutNum(digits)) {
    return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  const body = clean.slice(0, -1);
  const dv = clean.slice(-1);
  const formatted = body.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${formatted}-${dv}`;
}

const loginSchema = z.object({
  rut: z.string().min(1, "Ingresa tu RUT").refine(validateRUT, {
    message: "RUT inválido. Para cuenta INAPI usa el número sin dígito verificador.",
  }),
  password: z
    .string({
      required_error:
        "Rut o contraseña ingresados incorrectos, vuelve a intentar.",
    })
    .min(1, "Rut o contraseña ingresados incorrectos, vuelve a intentar."),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const setClaveUnicaSession = useAppStore((s) => s.setClaveUnicaSession);
  const setInapiSession = useAppStore((s) => s.setInapiSession);
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

    const cleanRut = digitsOnly(data.rut);
    const cuenta = findInapiCuenta(cleanRut);
    const passwordOk = cuenta && data.password === cuenta.password;

    if (!cuenta || !passwordOk) {
      setError("password", {
        message:
          "Rut o contraseña ingresados incorrectos, vuelve a intentar.",
      });
      setIsLoading(false);
      return;
    }

    writeInapiSession(cuenta.rutNum);
    setInapiSession(cuenta.rutNum);

    setIsLoading(false);
    router.push("/inicio");
  };

  const handleClaveUnica = async () => {
    setIsCULoading(true);
    await new Promise((r) => setTimeout(r, 1200));

    writeClaveUnicaSession();
    setClaveUnicaSession();

    setIsCULoading(false);
    router.push("/inicio");
  };

  const handleRUTChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatRUT(e.target.value);
    setRutValue(formatted);
    setValue("rut", formatted, { shouldValidate: true });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <TopBar
        variant="home"
        showNotifications={false}
        showThemeToggle={true}
        showProfile={false}
      />

      <div className="flex-1 overflow-y-auto px-6 flex flex-col items-stretch screen-enter">
        <div className="mt-10 mb-6 flex justify-center">
          <div className="w-20 h-20 bg-primary-light rounded-lg flex items-center justify-center">
            <ShieldCheck
              size={40}
              className="text-primary-dark"
              strokeWidth={2.5}
            />
          </div>
        </div>

        <div className="text-center">
          <h1 className="text-h1 text-foreground">Acceso Institucional</h1>
          <p className="text-body-sm text-muted-secondary mt-1">
            Ingresa a tu cuenta MiINAPI
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="mt-8 space-y-4"
        >
          <FormInput
            id="rut"
            label="RUT"
            placeholder="7.046.527"
            icon={<User size={20} />}
            value={rutValue}
            onChange={handleRUTChange}
            error={errors.rut?.message}
            autoComplete="username"
            hint="Cuenta INAPI: RUT numérico sin dígito verificador"
          />

          <div className="space-y-4">
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
                className="text-body-sm text-link hover:underline focus-gob rounded-sm"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          </div>

          <div className="pt-2 space-y-3">
            <CTAButton
              type="submit"
              label="Ingresar"
              variant="primary"
              size="lg"
              fullWidth
              isLoading={isLoading}
            />

            <div className="flex items-center gap-3 py-2">
              <hr className="flex-1 border-border" />
              <span className="text-body-xs text-muted font-medium">o</span>
              <hr className="flex-1 border-border" />
            </div>

            <ClaveUnicaButton
              type="button"
              onClick={handleClaveUnica}
              fullWidth
              isLoading={isCULoading}
            />

            <p className="text-center text-body-xs text-muted mt-2">
              Cuenta INAPI: RUT numérico sin dígito verificador y los últimos 4
              dígitos como clave. ClaveÚnica abre los 3 perfiles de demostración
              (nuevo, con acciones y con un trámite).
            </p>
            <details className="mt-3 rounded-lg border border-border bg-surface px-3 py-2 text-left">
              <summary className="cursor-pointer text-body-xs font-bold text-primary">
                Cuentas de ejemplo ({INAPI_LOGIN_EJEMPLOS.length})
              </summary>
              <p className="mt-2 text-body-xs text-muted-secondary leading-snug">
                Primero aparecen los casos prioritarios: el usuario debe pagar,
                responder o adjuntar antecedentes en un plazo. El resto está en
                revisión de INAPI o ya concluyó.
              </p>
              <ul className="mt-2 space-y-2 max-h-72 overflow-y-auto">
                {INAPI_LOGIN_EJEMPLOS.map((cuenta) => (
                  <li
                    key={cuenta.rutNum}
                    className="text-body-xs text-muted-secondary leading-snug border-b border-border/60 pb-2 last:border-0"
                  >
                    <span className="font-mono font-bold text-foreground">
                      {cuenta.rutNum} / {cuenta.password}
                    </span>
                    {cuenta.userAction && (
                      <span
                        className={
                          cuenta.urgency === "danger"
                            ? "ml-1.5 inline-block rounded-sm bg-danger/15 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-danger"
                            : "ml-1.5 inline-block rounded-sm bg-warning/15 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-warning"
                        }
                      >
                        Acción del usuario
                      </span>
                    )}
                    <span className="block text-foreground">{cuenta.marca}</span>
                    <span className="block">{cuenta.statusName}</span>
                    {cuenta.accion && (
                      <span className="block font-medium text-foreground">
                        {cuenta.accion}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </details>
          </div>
        </form>

        <p className="text-center text-body-sm text-muted-secondary mt-4">
          ¿No tienes una cuenta?{" "}
          <button className="text-link underline font-medium focus-gob rounded-sm">
            Regístrate ahora
          </button>
        </p>

        <div className="mt-10 mb-6 text-center">
          <p className="text-label text-muted">
            INSTITUTO NACIONAL DE PROPIEDAD INDUSTRIAL © 2026
          </p>
        </div>
      </div>
    </div>
  );
}