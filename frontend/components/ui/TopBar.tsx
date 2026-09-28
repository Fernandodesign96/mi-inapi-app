"use client";

import { Bell, User, ChevronLeft } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { basePath } from "@/next.config";
import Image from "next/image";
import { useState } from "react";


interface TopBarProps {
  variant?: "home" | "section" | "detail";
  title?: string;
  /** Título principal en variante `detail` (p. ej. nombre de la solicitud). */
  detailTitle?: string;
  /** Subtítulo en variante `detail` (p. ej. #trm-001). */
  detailSubtitle?: string;
  showNotifications?: boolean;
  showThemeToggle?: boolean;
  showProfile?: boolean;
  hasUnreadNotifications?: boolean;
  onBack?: () => void;
  rightAction?: React.ReactNode;
}

function TopBarActions({
  showNotifications,
  showThemeToggle,
  showProfile,
  hasUnreadNotifications,
}: {
  showNotifications: boolean;
  showThemeToggle: boolean;
  showProfile: boolean;
  hasUnreadNotifications: boolean;
}) {
  return (
    <>
      {showNotifications && (
        <Link
          href="/notificaciones"
          className="w-11 h-11 flex items-center justify-center text-muted-secondary relative active:opacity-60 transition-opacity focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm touch-target"
          aria-label="Notificaciones"
        >
          <Bell size={22} strokeWidth={2} />
          {hasUnreadNotifications && (
            <div className="absolute top-[10px] right-[10px] w-2 h-2 bg-danger rounded-full border border-surface" />
          )}
        </Link>
      )}
      {showThemeToggle && <ThemeToggle />}
      {showProfile && (
        <Link
          href="/perfil"
          className="w-11 h-11 flex items-center justify-center text-muted-secondary active:opacity-60 transition-opacity focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm touch-target"
          aria-label="Perfil"
        >
          <User size={22} strokeWidth={2} />
        </Link>
      )}
    </>
  );
}

const backButtonClass =
  "w-11 h-11 -ml-2 flex shrink-0 items-center justify-center text-foreground active:opacity-60 transition-opacity focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm touch-target";

export default function TopBar({
  variant = "home",
  title,
  detailTitle,
  detailSubtitle,
  showNotifications = true,
  showThemeToggle = true,
  showProfile = true,
  hasUnreadNotifications = true,
  onBack,
  rightAction,
}: TopBarProps) {
  const router = useRouter();
  const [imgError, setImgError] = useState(false);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  if (variant === "detail") {
    return (
      <header className="h-topbar bg-surface border-b border-border flex items-center gap-1 px-4 sticky top-0 z-40 w-full shrink-0">
        <button
          type="button"
          onClick={handleBack}
          className={backButtonClass}
          aria-label="Volver"
        >
          <ChevronLeft size={24} strokeWidth={2.5} />
        </button>
        <div className="flex-1 min-w-0 pr-1">
          {detailTitle && (
            <p className="text-h4 font-bold text-foreground truncate leading-tight">
              {detailTitle}
            </p>
          )}
          {detailSubtitle && (
            <p className="text-body-xs font-bold text-muted uppercase tracking-wider truncate">
              {detailSubtitle}
            </p>
          )}
        </div>
        <div className="flex shrink-0 items-center justify-end gap-1">
          {rightAction ?? (
            <TopBarActions
              showNotifications={showNotifications}
              showThemeToggle={showThemeToggle}
              showProfile={showProfile}
              hasUnreadNotifications={hasUnreadNotifications}
            />
          )}
        </div>
      </header>
    );
  }

  return (
    <header className="h-topbar bg-surface border-b border-border flex items-center px-4 sticky top-0 z-40 w-full shrink-0">
      <div className="flex-1 flex items-center">
        {variant === "section" ? (
          <button
            type="button"
            onClick={handleBack}
            className={backButtonClass}
            aria-label="Volver"
          >
            <ChevronLeft size={24} strokeWidth={2.5} />
          </button>
        ) : (
          <div className="flex items-center gap-2">
            {imgError ? (
              <div className="w-8 h-8 bg-primary-dark flex items-center justify-center rounded-sm">
                <span className="text-white font-bold text-sm font-sans">I</span>
              </div>
            ) : (
              <Image
                src={`${basePath}/images/inapi-logo.jpg`}
                alt="INAPI — Instituto Nacional de Propiedad Industrial, Gobierno de Chile"
                width={1904}
                height={1742}
                className="h-8 w-auto object-contain"
                onError={() => setImgError(true)}
                priority
              />
            )}
            <span className="font-semibold text-body text-foreground font-sans tracking-tight">
              MiINAPI
            </span>
          </div>
        )}
      </div>

      {variant === "section" && title && (
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center w-max pointer-events-none">
          <h1 className="text-h3 text-foreground">{title}</h1>
        </div>
      )}

      <div className="flex-1 flex items-center justify-end gap-1">
        {rightAction ?? (
          <TopBarActions
            showNotifications={showNotifications}
            showThemeToggle={showThemeToggle}
            showProfile={showProfile}
            hasUnreadNotifications={hasUnreadNotifications}
          />
        )}
      </div>
    </header>
  );
}
