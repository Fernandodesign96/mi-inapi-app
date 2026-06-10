"use client";

import { useRouter, usePathname } from "next/navigation";
import BottomNav from "@/components/ui/BottomNav";
import ChatIAFab from "@/components/ui/ChatIAFab";
import { cn } from "@/lib/utils";
import { useAppStore, UserState } from "@/lib/store";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { userState, setUserState } = useAppStore();

  const showChatIA = ["/inicio", "/solicitudes", "/notificaciones"].some((p) =>
    pathname.startsWith(p)
  );
  const isChatView = pathname === "/chat";

  return (
    <div className="flex flex-col min-h-dvh bg-background w-full relative">
      {/* Contenido scrollable */}
      <main
        className={cn(
          "flex-1 overflow-y-auto no-scrollbar w-full",
          !isChatView &&
            "pb-[calc(var(--bottomnav-height)+env(safe-area-inset-bottom))]"
        )}
      >
        {children}
      </main>

      {/* FAB: posición propia en ChatIAFab (sin wrapper extra) */}
      {showChatIA && !isChatView && (
        <ChatIAFab onClick={() => router.push("/chat")} />
      )}

      {/* BottomNav full-width viewport */}
      {!isChatView && <BottomNav />}

      {/* Logic State Toggle (Dev Only) */}
      <div className="fixed top-4 left-4 z-[100] scale-75 origin-top-left opacity-30 hover:opacity-100 transition-opacity">
        <div className="bg-surface/90 backdrop-blur p-2 rounded-lg border border-border shadow-elevated space-y-2 w-32">
          <p className="text-body-xs font-bold text-muted uppercase text-center">
            Estado Mock
          </p>
          <div className="flex flex-col gap-1">
            {(["new", "active-urgent", "active-no-urgent"] as UserState[]).map(
              (state) => (
                <button
                  key={state}
                  onClick={() => setUserState(state)}
                  className={cn(
                    "px-2 py-1.5 rounded-md text-body-xs font-bold transition-all text-left truncate",
                    userState === state
                      ? "bg-primary text-primary-foreground"
                      : "bg-surface-elevated text-muted-secondary hover:bg-border"
                  )}
                >
                  {state.toUpperCase()}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}