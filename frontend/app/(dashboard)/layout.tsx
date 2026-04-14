"use client";

import { useRouter, usePathname } from "next/navigation";
import BottomNav from "@/components/ui/BottomNav";
import ChatIAFab from "@/components/ui/ChatIAFab";
import { clsx } from "clsx";
import { useAppStore, UserState } from "@/lib/store";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { userState, setUserState } = useAppStore();

  const showChatIA = ["/inicio", "/solicitudes", "/notificaciones"].some(p => pathname.startsWith(p));
  const isChatView = pathname === "/chat";

  return (
    <div className="flex flex-col h-screen bg-[#F9FAFB] max-w-[390px] mx-auto relative shadow-2xl overflow-hidden border-x border-[#E5E7EB]">
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto no-scrollbar pb-20">
        {children}
      </main>

      {/* FAB - Adjusted position for mobile layout */}
      {showChatIA && !isChatView && (
        <div className="fixed bottom-24 right-[calc(50%-170px)] z-40">
          <ChatIAFab onClick={() => router.push("/chat")} />
        </div>
      )}

      {/* Bottom Navigation */}
      {!isChatView && (
        <BottomNav />
      )}

      {/* Logic State Toggle (Dev Only) */}
      <div className="fixed top-4 left-4 z-[100] scale-75 origin-top-left opacity-30 hover:opacity-100 transition-opacity">
        <div className="bg-white/90 backdrop-blur p-2 rounded-xl border border-[#E5E7EB] shadow-lg space-y-2 w-32">
          <p className="text-[10px] font-bold text-[#9CA3AF] uppercase text-center">Estado Mock</p>
          <div className="flex flex-col gap-1">
            {(['new', 'active-urgent', 'active-no-urgent'] as UserState[]).map((state) => (
              <button
                key={state}
                onClick={() => setUserState(state)}
                className={clsx(
                  "px-2 py-1.5 rounded-lg text-[10px] font-bold transition-all text-left truncate",
                  userState === state 
                    ? "bg-[#1A56DB] text-white" 
                    : "bg-[#F3F4F6] text-[#4B5563] hover:bg-[#E5E7EB]"
                )}
              >
                {state.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
