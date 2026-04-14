"use client";

import { Suspense } from "react";
import ChatEjecutivoClient from "./ChatEjecutivoClient";

export default function ChatEjecutivoPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center bg-white"><span className="text-[#9CA3AF] text-sm">Cargando...</span></div>}>
      <ChatEjecutivoClient />
    </Suspense>
  );
}
