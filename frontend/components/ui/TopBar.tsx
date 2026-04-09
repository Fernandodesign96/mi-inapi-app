import { Bell, User, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface TopBarProps {
  variant?: "home" | "section";
  title?: string;
  showNotifications?: boolean;
  showProfile?: boolean;
  hasUnreadNotifications?: boolean;
  onBack?: () => void;
  rightAction?: React.ReactNode;
}

export default function TopBar({
  variant = "home",
  title,
  showNotifications = true,
  showProfile = true,
  hasUnreadNotifications = true,
  onBack,
  rightAction,
}: TopBarProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <header className="h-[56px] bg-white border-b border-[#E5E7EB] flex items-center px-4 sticky top-0 z-40 w-full shrink-0">
      <div className="flex-1 flex items-center">
        {variant === "section" ? (
          <button
            onClick={handleBack}
            className="w-11 h-11 -ml-2 flex items-center justify-center text-[#111827] active:opacity-60 transition-opacity"
            aria-label="Volver"
          >
            <ChevronLeft size={24} strokeWidth={2.5} />
          </button>
        ) : (
          <div className="flex items-center">
            <div className="w-7 h-7 bg-[#1E3A8A] rounded-[6px] flex items-center justify-center text-white font-sans font-bold text-[14px]">
              I
            </div>
            <span className="ml-2 font-sans font-semibold text-[16px] text-[#111827] tracking-tight">
              MiINAPI
            </span>
          </div>
        )}
      </div>

      {variant === "section" && title && (
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center w-max">
          <h1 className="text-h3 text-[#111827]">{title}</h1>
        </div>
      )}

      <div className="flex-1 flex items-center justify-end gap-1">
        {rightAction ? (
          rightAction
        ) : (
          <>
            {showNotifications && (
              <Link
                href="/notificaciones"
                className="w-11 h-11 flex items-center justify-center text-[#4B5563] relative active:opacity-60 transition-opacity"
              >
                <Bell size={22} strokeWidth={2} />
                {hasUnreadNotifications && (
                  <div className="absolute top-[10px] right-[10px] w-2 h-2 bg-[#DC2626] rounded-full border border-white" />
                )}
              </Link>
            )}
            {showProfile && (
              <Link
                href="/perfil"
                className="w-11 h-11 flex items-center justify-center text-[#4B5563] active:opacity-60 transition-opacity"
              >
                <User size={22} strokeWidth={2} />
              </Link>
            )}
          </>
        )}
      </div>
    </header>
  );
}
