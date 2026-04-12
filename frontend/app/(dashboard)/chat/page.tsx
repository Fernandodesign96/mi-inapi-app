"use client";

import { useState } from "react";
import { ArrowLeft, Plus, Send, MessageSquare, Share2, MoreVertical, Sparkles } from "lucide-react";
import TopBar from "@/components/ui/TopBar";
import SemaphoreCard from "@/components/ui/SemaphoreCard";
import CTAButton from "@/components/ui/CTAButton";
import DraggableRow from "@/components/ui/DraggableRow";
import { clsx } from "clsx";

type ViewMode = "history" | "chat";

interface ChatSession {
  id: string;
  preview: string;
  time: string;
  messages: Message[];
}

interface Message {
  role: "assistant" | "user";
  text: string;
  time: string;
}

const mockSessions: ChatSession[] = [
  {
    id: "c1",
    preview: "¿Qué es el examen de fondo? El examen de fondo es la etapa donde...",
    time: "HACE 2 HORAS",
    messages: [
      { role: "user", text: "¿Qué es el examen de fondo?", time: "10:30" },
      { role: "assistant", text: "El examen de fondo es la etapa donde INAPI analiza si tu marca cumple con todos los requisitos legales para ser registrada, como por ejemplo que no sea idéntica a otra ya registrada.", time: "10:31" },
    ]
  },
  {
    id: "c2",
    preview: "¿Cómo renuevo mi marca? Para renovar tu marca debes realizar...",
    time: "AYER",
    messages: [
      { role: "user", text: "¿Cómo renuevo mi marca?", time: "09:15" },
      { role: "assistant", text: "Para renovar tu marca debes realizar el trámite dentro de los 6 meses anteriores o posteriores al vencimiento. El proceso se realiza íntegramente en el portal de INAPI.", time: "09:16" },
    ]
  }
];

export default function ChatIAPage() {
  const [view, setView] = useState<ViewMode>("history");
  const [activeChat, setActiveChat] = useState<ChatSession | null>(null);
  const [inputText, setInputText] = useState("");

  const handleOpenChat = (session: ChatSession) => {
    setActiveChat(session);
    setView("chat");
  };

  const handleNewChat = (initialQuestion?: string) => {
    const pillsResponses: Record<string, string> = {
      "¿Qué es el examen de fondo?": "El examen de fondo es la etapa técnica donde INAPI verifica si tu marca incurre en causales de irregistrabilidad (como falta de distintividad o similitud con marcas previas). Es la fase más crítica del proceso.",
      "¿Qué es una renovación de marcas?": "Las marcas en Chile duran 10 años. Puedes renovarlas 6 meses antes o hasta 6 meses después de su vencimiento (pagando una sobretasa). El trámite mantiene tu derecho exclusivo por otra década.",
      "¿Cuáles son los plazos legales?": "Existen plazos clave: 30 días hábiles para responder observaciones de forma, 30 días corridos para oposiciones tras la publicación, y unos 4-6 meses para el examen de fondo completo.",
      "¿Cómo funcionan las oposiciones?": "Tras la publicación en el Diario Oficial, cualquier tercero tiene 30 días para oponerse a tu registro. Si esto ocurre, se inicia un juicio de oposición donde ambas partes presentan pruebas."
    };

    const messages: Message[] = [
      { role: "assistant", text: "Hola, soy tu asistente MiINAPI. ¿En qué puedo ayudarte hoy?", time: "14:00" }
    ];

    if (initialQuestion) {
      messages.push({ role: "user", text: initialQuestion, time: "14:00" });
      const specificReply = pillsResponses[initialQuestion] || `Entiendo tu duda sobre: "${initialQuestion}". Este proceso se rige por la Ley de Propiedad Industrial y requiere atención a plazos específicos.`;
      messages.push({ role: "assistant", text: specificReply, time: "14:01" });
    }

    setActiveChat({
      id: "new",
      preview: initialQuestion || "",
      time: "AHORA",
      messages
    });
    setView("chat");
  };

  if (view === "chat") {
    return (
      <div className="flex flex-col h-screen bg-white">
        <header className="h-[56px] border-b border-[#E5E7EB] flex items-center justify-between px-4 sticky top-0 bg-white z-40">
          <div className="flex items-center gap-3">
            <button onClick={() => setView("history")} className="p-2 -ml-2 text-[#111827]">
              <ArrowLeft size={24} />
            </button>
            <div className="flex flex-col">
              <span className="text-[15px] font-bold text-[#111827]">Chat IA</span>
              <span className="text-[10px] font-bold text-[#059669] flex items-center gap-1 uppercase">
                <div className="w-1.5 h-1.5 rounded-full bg-[#059669]" /> En línea
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button className="p-2 text-[#6B7280]"><Share2 size={20} /></button>
            <button className="p-2 text-[#6B7280]"><MoreVertical size={20} /></button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#F9FAFB]">
          <div className="flex justify-center">
            <span className="text-[11px] font-bold text-[#9CA3AF] bg-white px-3 py-1 rounded-full shadow-sm border border-[#E5E7EB]">
              CONVERSACIÓN INICIADA {activeChat?.time}
            </span>
          </div>

          {activeChat?.messages.map((msg, idx) => (
            <div key={idx} className={clsx("flex flex-col gap-1.5", msg.role === 'user' ? 'items-end' : 'items-start')}>
              <div className={clsx(
                "max-w-[85%] p-4 text-[14px] leading-relaxed shadow-sm",
                msg.role === 'user' 
                  ? "bg-[#1A56DB] text-white rounded-[18px] rounded-tr-[4px]" 
                  : "bg-white text-[#111827] border border-[#E5E7EB] rounded-[18px] rounded-tl-[4px]"
              )}>
                {msg.text}
              </div>
              <span className="text-[10px] font-bold text-[#9CA3AF] uppercase px-1">{msg.time}</span>
            </div>
          ))}
        </div>

        <div className="p-4 safe-bottom border-t border-[#E5E7EB] bg-white">
          <div className="relative shadow-lg rounded-full">
            <input 
              type="text" 
              placeholder="Pregunta sobre plazos, leyes o estados..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full bg-[#F3F4F6] h-[52px] rounded-full pl-6 pr-14 text-[14px] font-sans outline-none focus:ring-2 ring-[#1A56DB] border border-transparent transition-all"
            />
            <button className="absolute right-1 top-1 w-[44px] h-[44px] bg-[#1A56DB] text-white rounded-full flex items-center justify-center active:scale-90 transition-transform shadow-md">
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F9FAFB]">
      <TopBar variant="section" title="Asistente IA" />

      <div className="flex-1 overflow-y-auto pb-24 screen-enter">
        <div className="px-6 pt-6 space-y-8">
          {/* Hero Block */}
          <div className="bg-[#111827] rounded-[20px] p-6 text-white relative overflow-hidden shadow-card">
            <div className="relative z-10 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white">
                <Sparkles size={28} />
              </div>
              <div className="space-y-1">
                <h2 className="text-[20px] font-bold">Resuelve tus dudas</h2>
                <p className="text-[#9CA3AF] text-body-sm">Pregunta sobre plazos, documentos o estados de tu trámite en tiempo real.</p>
              </div>
              <CTAButton 
                label="Nueva Consulta"
                variant="primary"
                fullWidth
                size="md"
                onClick={() => handleNewChat()}
                icon={<Plus size={18} />}
              />
            </div>
            {/* Background Decoration */}
            <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-[#1A56DB] blur-[60px] opacity-30 rounded-full" />
          </div>

          {/* Suggestions */}
          <div className="space-y-4">
            <p className="text-label text-[#9CA3AF]">CONSULTAS SUGERIDAS</p>
            <DraggableRow className="flex gap-2 pb-2">
              {[
                { label: "Examen de fondo", q: "¿Qué es el examen de fondo?" },
                { label: "Renovación marcas", q: "¿Qué es una renovación de marcas?" },
                { label: "Plazos legales", q: "¿Cuáles son los plazos legales?" },
                { label: "Oposiciones", q: "¿Cómo funcionan las oposiciones?" }
              ].map(item => (
                <button 
                  key={item.label}
                  onClick={() => handleNewChat(item.q)}
                  className="px-4 py-2 bg-white border border-[#E5E7EB] rounded-full text-[13px] text-[#111827] font-semibold whitespace-nowrap active:bg-[#F9FAFB] shadow-sm select-none"
                >
                  {item.label}
                </button>
              ))}
            </DraggableRow>
          </div>

          {/* Recent Chats */}
          <div className="space-y-4">
            <p className="text-label text-[#9CA3AF]">CHATS RECIENTES</p>
            <div className="space-y-3">
              {mockSessions.map(session => (
                <SemaphoreCard 
                  key={session.id} 
                  urgency="neutral"
                  onClick={() => handleOpenChat(session)}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#F3F4F6] rounded-xl flex items-center justify-center text-[#9CA3AF] shrink-0">
                      <MessageSquare size={20} />
                    </div>
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-extrabold text-[#9CA3AF] uppercase tracking-wider">{session.time}</span>
                        <MoreVertical size={16} className="text-[#D1D5DB]" />
                      </div>
                      <p className="text-[14px] text-[#111827] font-semibold line-clamp-2 leading-relaxed">
                        {session.preview}
                      </p>
                    </div>
                  </div>
                </SemaphoreCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
