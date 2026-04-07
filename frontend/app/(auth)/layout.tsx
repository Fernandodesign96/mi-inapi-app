// Auth layout — sin BottomNav, sin TopBar de dashboard
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-dvh bg-[#F9FAFB]">
      {children}
    </main>
  );
}
