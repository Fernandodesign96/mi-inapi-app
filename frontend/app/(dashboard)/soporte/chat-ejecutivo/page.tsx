"use client";

import { Suspense } from "react";
import ChatEjecutivoClient from "./ChatEjecutivoClient";

export default function ChatEjecutivoPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center bg-surface">
          <span className="text-muted text-body-sm">Cargando...</span>
        </div>
      }
    >
      <ChatEjecutivoClient />
    </Suspense>
  );
}
