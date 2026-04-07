# Prompt optimizado para v0.dev — MiINAPI MVP v2
## Post-revisión 06/04/2026

---

## PROMPT COMPLETO (pegar en v0.dev)

---

Build a **fully interactive** mobile-first PWA prototype called **MiINAPI** for INAPI — Instituto Nacional de Propiedad Industrial, the Chilean government agency for trademark and patent registration. All text must be in **Spanish (Chile)**. No hardcoded screen switcher tabs at the top — navigation must happen exclusively through the app's own UI: BottomNav, back arrows, and clickable elements within each screen.

---

## DESIGN SYSTEM

### Colors
```
Primary blue:    #1A56DB   (institutional, buttons, active tabs, links)
Primary dark:    #1E3A8A   (headers, TopBar background accent)
Accent purple:   #7C3AED   (Login shield, secondary highlights)

SEMAPHORE SYSTEM (use consistently for ALL badges, card borders, steppers):
--danger:   #DC2626  bg: #FEE2E2   (urgent / risk / immediate action)
--warning:  #D97706  bg: #FEF3C7   (attention / pending requirement)
--info:     #1A56DB  bg: #DBEAFE   (in review / in progress)
--success:  #059669  bg: #D1FAE5   (completed / finalized / success)

Neutrals:
--bg-base:     #F9FAFB
--bg-surface:  #FFFFFF
--bg-elevated: #F3F4F6
--text-primary:   #111827
--text-secondary: #4B5563
--text-muted:     #9CA3AF
--border:         #E5E7EB
```

### Typography
- Font: **DM Sans** (import from Google Fonts) — clean, institutional, readable
- Display: 28px/800, Heading-1: 24px/700, Heading-2: 20px/600, Body: 16px/400, Body-sm: 14px/400, Label: 11px/600 uppercase tracking-wide, Mono: 13px/500 for solicitud numbers and RUT

### Layout
- Mobile frame: max-width 390px, centered, with realistic phone chrome (status bar 9:41, notch)
- TopBar: 56px height
- BottomNav: 64px + safe area (pb-[env(safe-area-inset-bottom)])
- All interactive elements: minimum 48×48px touch target
- Card border-radius: 14px, inputs: 10px, CTAs: 9999px (pill)
- Card shadow: `0 1px 3px rgba(0,0,0,0.08)`

### Components to build as reusable pieces
- `StatusBadge`: pill shape, 11px uppercase, semaphore color variants (danger/warning/info/success)
- `SemaphoreCard`: white card with 4px left border in semaphore color
- `StepperProgress`: 3-step horizontal stepper (INGRESO → EXAMEN → RESOLUCIÓN) using semaphore colors per state
- `BottomNav`: 5 items (Inicio/Solicitudes/+FAB/Academia/Perfil), active item in primary blue
- `CollapsibleCard`: card that expands/collapses on click with smooth transition
- `FilterPills`: horizontal scrollable pill group for filtering

---

## SCREENS AND INTERACTIONS

### SCREEN 1: LOGIN (default start screen)

**Layout:**
- Background: #F9FAFB
- TopBar: INAPI logo (dark green square "I") + "MiINAPI" wordmark, no back button
- Centered content, scrollable

**Content (top to bottom):**
1. Purple rounded square icon with shield+checkmark (background: #EDE9FE, icon: #7C3AED), size 80px, border-radius 20px
2. Title: "Acceso Institucional" (24px/700)
3. Subtitle: "Ingresa a tu cuenta MiINAPI" (14px, text-secondary)
4. Spacer 32px
5. Label "RUT" (11px uppercase tracking-wide, text-secondary)
6. Input: person icon (gray) + placeholder "12.345.678-9", rounded-[10px], bg-[#F3F4F6], border-0, focus:ring-2 ring-[#1A56DB]
7. Label "CONTRASEÑA"
8. Input: lock icon + 8 dots + eye toggle button (click toggles password visibility)
9. Right-aligned link: "¿Olvidaste tu contraseña?" (#7C3AED)
10. Primary CTA: "Ingresar" button (bg: #7C3AED, text-white, rounded-full, h-[52px], full-width)
    - **INTERACTIVE**: On click → shows loading state (spinner in button) for 800ms → navigates to Dashboard
    - If RUT field empty on click: show inline error "Ingresa tu RUT" below field
11. Divider with "o" text
12. Secondary button: fingerprint icon + "ClaveÚnica" (bg-white, border border-[#E5E7EB], rounded-full, h-[52px])
    - **INTERACTIVE**: On click → shows a modal "Conectando con ClaveÚnica..." with loading animation → after 1.2s → navigates to Dashboard
13. "¿No tienes una cuenta? **Regístrate ahora**" (link in #1A56DB)
14. Footer: "INSTITUTO NACIONAL DE PROPIEDAD INDUSTRIAL © 2025" (10px, text-muted, centered)

---

### SCREEN 2: DASHBOARD (Inicio)

**TopBar:** INAPI "I" logo + "MiINAPI" (left) + bell icon (🔔, clickable → goes to Notificaciones) + gear icon (right)

**Architecture of information (strict order):**

1. **TABS: "Marcas" | "Patentes"** — full-width, tab indicator is a 2px underline in #1A56DB, active tab text in #1A56DB bold, inactive text-secondary
   - Clicking each tab filters ALL content below to that type
   - Default active: Marcas

2. **SUMMARY ROW** (3 metric cards side by side, rounded-[14px]):
   - Card 1: "12" (28px/800, text-primary) / "EN PROCESO" (10px uppercase, text-secondary)
   - Card 2: "2 ⚠" (28px/800, #D97706) / "ACCIÓN REQUERIDA" (10px uppercase, #D97706) — has orange warning triangle
   - Card 3: "45" (28px/800, #059669) / "FINALIZADAS" (10px uppercase, #059669)
   - **INTERACTIVE**: clicking each metric card scrolls/filters the list below to that status group

3. **Section label:** "Solicitudes en Curso" (17px/600) — "Actualizado hace 5 min" (12px, text-muted, right)

4. **TRAMITE CARDS** — ordered by urgency: 🔴 first, then 🟠, then 🔵, then 🟢
   
   **Card A — ACCIÓN REQUERIDA 🔴 (Danger)**
   - Left border: 4px solid #DC2626
   - Header: "Eco-Tech Solutions" (17px/600) + StatusBadge "ACCIÓN REQUERIDA" (bg:#FEE2E2, text:#DC2626)
   - "Solicitud #2023-00451" (13px mono, text-muted)
   - StepperProgress: INGRESO (filled green) → EXAMEN (filled orange, current) → RESOLUCIÓN (empty gray)
   - Action box (bg:#FFF7ED, border:#FED7AA, rounded-[10px], p-3):
     - Warning icon (orange) + "Próximo paso requerido: adjunte documento de Poder notariado."
     - CTA button: **"Ir a la notificación →"** (bg:#DC2626, text-white, rounded-full, full-width, h-[44px])
     - **INTERACTIVE**: click → navigates to Notificaciones screen with this notification highlighted
   - Footer: clock icon + "Est: 4 meses restantes" (12px, text-muted) | "VER DETALLES ›" (12px, #1A56DB)

   **Card B — EN PROCESO 🔵 (Info)**
   - Left border: 4px solid #1A56DB
   - Header: "Aura Cosmetics" + StatusBadge "PUBLICADA" (bg:#DBEAFE, text:#1A56DB)
   - "Solicitud #2023-00589" (13px mono)
   - StepperProgress: INGRESO (green) → EXAMEN (green) → RESOLUCIÓN (blue, current)
   - Info text: "Esperando fin del periodo de oposición (30 días)." (14px, text-secondary)
   - Footer: clock + "Est: 8 meses restantes" | "VER DETALLES ›"

   **Card C — FINALIZADA 🟢 (collapsed, compact)**
   - Left border: 4px solid #059669
   - "NeoGraphix Design" + "#2024-00102" (mono) + StatusBadge "INGRESO EXITOSO" (bg:#D1FAE5, text:#059669)

5. **FAB button** (for BottomNav center): floating purple circle with "+" icon, positioned in center slot

**BottomNav:** Inicio (house, active) | Solicitudes (file) | + (purple circle FAB) | Academia (graduation cap) | Perfil (person)

---

### SCREEN 3: NOTIFICACIONES (Centro de Alertas)

**TopBar:** INAPI "I" logo (left) + "MiINAPI / CHILE" (gray) + person avatar icon (right)
**Page title:** "Centro de Notificaciones" (24px/700) + "Alertas inteligentes de tus trámites" (14px, text-secondary)

**Architecture of information:**

1. **TABS: "Marcas" | "Patentes"** — same style as Dashboard, default: Marcas

2. **FILTER ROW** (horizontal, below tabs):
   - Two filter pills side by side: "Por urgencia" (active by default, bg:#1E3A8A, text-white) | "Por fecha reciente" (inactive, bg:#F3F4F6, text-secondary)
   - **INTERACTIVE**: clicking each pill reorders the cards below accordingly

3. **NOTIFICATION CARDS** — ordered: 🔴 danger → 🟠 warning → 🔵 info → 🟢 success
   
   Each card is a **SemaphoreCard** (left border in semaphore color) that is **collapsible**:
   
   **Card 1 — 🔴 URGENTE**
   - Left border: #DC2626, icon bg: #FEE2E2, icon: ⚠ (#DC2626)
   - Label: "ACCIÓN REQUERIDA" (11px uppercase, #DC2626) + timestamp "Hace 10m" (right, 11px, text-muted)
   - Title: "Documento de Poder notariado pendiente" (16px/600)
   - Collapsed preview: "El trámite 2024-00123 requiere adjuntar un documento notariado..."
   - **INTERACTIVE**: click to expand → shows notification table:
     ```
     ┌─────────────────────────────────────────┐
     │ DETALLE DE LA NOTIFICACIÓN              │
     ├──────────────┬──────────────────────────┤
     │ Etapa actual │ Examen de Fondo          │
     │ Solicitud    │ #2024-00123              │
     │ Requerimiento│ Adjuntar Poder Notariado │
     │ Plazo límite │ 20 de abril, 2025        │
     │ Contacto     │ examenes@inapi.cl        │
     └──────────────┴──────────────────────────┘
     ```
   - CTA: "Adjuntar documento" button (#DC2626, rounded-full, full-width)

   **Card 2 — 🟠 ATENCIÓN**
   - Left border: #D97706, icon: ! (#D97706)
   - Label: "CADUCIDAD" (orange) + "Hace 2h"
   - Title: "Tu registro vence en 30 días"
   - Collapsed: "La patente 'Sistema Solar X' está próxima a expirar..."
   - Expand → table + CTA "Iniciar Renovación →" (#D97706 button)

   **Card 3 — 🔵 EN REVISIÓN**
   - Left border: #1A56DB, icon: ↻ (#1A56DB)
   - Label: "RENOVACIÓN" (blue) + "Hace 1d"
   - Title: "Aviso de Renovación Anticipada"
   - Expand → table + CTA "Ver estado" (#1A56DB button)

   **Card 4 — 🟢 FINALIZADA**
   - Left border: #059669, icon: ✓ (#059669)
   - Label: "CAMBIO DE ESTADO" (green) + "Hace 3h"
   - Title: "Tu marca pasó a Publicación"
   - Expand → table (informativo, sin CTA de acción)

**BottomNav:** Inicio | Solicitudes | + | Academia | Perfil (Alertas accessible from TopBar bell)

---

### SCREEN 4: CERTIFICADOS DIGITALES

**TopBar:** INAPI "I" + "GOBIERNO DE CHILE / Ministerio de Economía" + bell + avatar "JD" (circle, bg:#1E3A8A)
**Page title:** "Certificados Digitales" (24px/700) + "Descarga tus registros y títulos vigentes con firma electrónica." (14px, text-secondary)

**Architecture:**

1. **SEARCH ROW:**
   - Search input (magnifying glass icon, placeholder "Buscar marca o registro...", full-width, rounded-[10px], bg:#F3F4F6)

2. **FILTER PILLS ROW** (below search, horizontal scroll):
   - "Todos" (active: bg:#1A56DB text-white) | "Marcas" | "Patentes" | "Diseños"
   - Pills: rounded-full, px-4 py-1.5, border border-[#E5E7EB] when inactive
   - **INTERACTIVE**: click each pill to filter the certificate list
   - Pills scroll horizontally if they overflow — do NOT wrap to multiple lines

3. **CERTIFICATE CARDS** (filtered by active pill):

   **Card 1 — Marca Comercial** (visible by default and when "Todos" or "Marcas" active)
   - Rounded square icon (bg:#EEF2FF, checkmark icon #1A56DB)
   - Badge "MARCA COMERCIAL" (bg:#DBEAFE, text:#1A56DB, 11px uppercase)
   - Title: "SOLUCIONES TECH SPA" (17px/700, uppercase)
   - "Registro: 1.245.890" (13px mono, text-muted) + "EMISIÓN: 12 Oct 2023" (11px uppercase, text-muted)
   - CTA: "Descargar PDF" (bg:#1E3A8A, text-white, rounded-full, full-width, with signature icon)
   - **INTERACTIVE**: click → shows loading spinner on button for 600ms → toast "Descargando certificado..." (green)

   **Card 2 — Patente de Invención** (visible when "Todos" or "Patentes" active)
   - Icon: lightbulb (bg:#EDE9FE, icon #7C3AED)
   - Badge "PATENTE DE INVENCIÓN" (bg:#EDE9FE, text:#7C3AED)
   - "SISTEMA FILTRADO ECO-PURE" + "Registro: 2022-00567"
   - CTA: "Descargar PDF" (same style)

   **Card 3 — Diseño Industrial** (visible when "Todos" or "Diseños" active)
   - Icon: palette (bg:#D1FAE5, icon #059669)
   - Badge "DISEÑO INDUSTRIAL" (bg:#D1FAE5, text:#059669)
   - "BOTELLA ERGONÓMICA V3" + "Registro: 8.442" + "EMISIÓN: 20 Ago 2022"
   - CTA: "Descargar PDF"

**BottomNav active: Trámites tab**

---

### SCREEN 5: SOPORTE E HISTORIAL

**TopBar:** back arrow (←) + "Soporte e Historial" (center, 17px/600) + search icon (🔍)
**Sub-header:** Chilean flag emoji + "GOBIERNO DE CHILE" (small, text-secondary) | "MIINAPI" (right, #1A56DB, 14px/600)

**Architecture:**

1. **CHANNEL FILTER PILLS:** "Todos" (active) | "Email" | "Chat" | "Llamada"
   - Same pill style as Certificados filter
   - **INTERACTIVE**: filter the interactions list

2. **INFO BANNER** (bg:#FEF3C7, border-l-4 border-[#D97706], rounded-[10px]):
   - Headphones icon + "¿Necesitas ayuda inmediata?" + "Lun-Vie 09:00 - 18:00 hrs"

3. **SECTION LABEL:** "INTERACCIONES RECIENTES — OCTUBRE 2023" (11px uppercase, text-muted)

4. **COLLAPSIBLE INTERACTION CARDS:**
   
   **Card 1 (expanded by default):**
   - Mail icon (bg:#DBEAFE, icon #1A56DB) + "Consulta de Ma..." (16px/600) + badge "RESUELTO" (bg:#D1FAE5, text:#059669) + chevron-up
   - "24 Oct · Correo Electrónico" (12px, text-muted)
   - Expanded content:
     - "TU CONSULTA" label + italic text: "¿Cuál es el estado actual de mi solicitud de marca para 'MiINAPI-App'?"
     - "RESPUESTA INAPI" label + text: "Su solicitud se encuentra en fase de 'Publicación'. No requiere acciones adicionales."
     - "Atendido por: Rodrigo M." + ghost button "Reabrir Ticket" (right-aligned)
   - **INTERACTIVE**: click card header → collapse/expand with smooth height transition

   **Card 2 (collapsed):**
   - Phone icon (bg:#FEF3C7, icon #D97706) + "Soporte Registro Pat..." + badge "RESUELTO" + chevron-down
   - "20 Oct · Llamada (12 min)"

5. **FIXED BOTTOM LINKS** (always visible below cards, separated by a subtle divider):
   - Row 1: Two buttons side by side:
     - "Llámanos" (outlined, border #E5E7EB, icon phone, half-width)
     - "Nuevo Chat" (bg:#1A56DB text-white, icon message-circle, half-width)
   - Row 2: Two text links centered:
     - "Ir a OMPI →" (#1A56DB, 14px) | "Página INAPI →" (#1A56DB, 14px)
   - Footer text: "Mostrando historial de los últimos 6 meses · **Ver historial completo**"
   - **INTERACTIVE**: "Nuevo Chat" click → shows a bottom sheet modal with a simple chat input

---

### SCREEN 6: BIBLIOTECA DE RECURSOS (accessible via "Academia" tab)

**TopBar:** back arrow + "MIINAPI / Biblioteca" (center) + "INAPI" pill + "GOB" pill (small gray pills, right)
**Page title area:** search input (full-width, placeholder "Buscar manuales, guías, videos...", with filter sliders icon on right)

**Architecture:**

1. **CATEGORÍAS** (section label 11px uppercase tracking-wide)
   - 2×2 grid of category cards (equal size squares, rounded-[14px]):
     - Manuales: bg:#DBEAFE, book icon #1A56DB
     - Guías: bg:#D1FAE5, lightbulb icon #059669
     - Videos: bg:#EDE9FE, play-circle icon #7C3AED
     - Oficiales: bg:#FEF3C7, user-check icon #D97706
   - Icon size: 32px, label below in 12px/600
   - **INTERACTIVE**: click a category → filters the resource list below + highlights the active category with a ring

2. **RECURSOS RECIENTES** (section label) + "Ver todo" link (#1A56DB, right)

3. **RESOURCE LIST ITEMS** (each item: bg-white, rounded-[14px], shadow-sm, p-3):

   **Item 1:**
   - Red PDF icon square (bg:#FEE2E2, rounded-[8px]) + "PDF  12 MB" (badge) + "Manual de Registro de Marca..." (14px/500) + download icon button (right)

   **Item 2:**
   - Gray play icon square + "MP4  03:45" + "Tutorial: Solicitud de Patentes" + eye button (bg:#1E3A8A, text-white, rounded-full, 36px)
   - **INTERACTIVE**: click eye → shows a modal "Reproducir video" with a mock video player

   **Item 3:**
   - Orange upload icon square (bg:#FEF3C7) + "PPTX  4.8 MB" + "Presentación Institucional IN..." + download icon

   **Item 4:**
   - Green document icon (bg:#D1FAE5) + "PDF  2.1 MB" + "Guía Práctica para Emprend..." + download icon

   **INTERACTIVE for all downloads**: click download → button shows checkmark ✓ for 1.5s then returns to download icon. Toast: "Descarga iniciada" (bottom, green, auto-dismiss 2s)

**BottomNav active: Academia tab**

---

## NAVIGATION STATE MANAGEMENT

Use React useState to manage:
- `currentScreen`: 'login' | 'dashboard' | 'notificaciones' | 'certificados' | 'soporte' | 'biblioteca'
- `dashboardTab`: 'marcas' | 'patentes'
- `notificacionesTab`: 'marcas' | 'patentes'
- `notificacionesFilter`: 'urgencia' | 'fecha'
- `certificadoFilter`: 'todos' | 'marcas' | 'patentes' | 'diseños'
- `soporteFilter`: 'todos' | 'email' | 'chat' | 'llamada'
- `bibliotecaCategory`: null | 'manuales' | 'guias' | 'videos' | 'oficiales'
- `expandedCards`: Set of card IDs (for collapsible cards in Notificaciones and Soporte)

BottomNav navigation:
- Inicio → dashboard
- Solicitudes → dashboard (scrolled to cards list)
- Academia → biblioteca
- Perfil → (show profile stub screen or placeholder)

Bell icon in TopBar → notificaciones
Back arrows → previous screen

## TRANSITIONS
- Screen transitions: 200ms fade (opacity 0→1)
- Tab switches: 150ms, content fades
- Card expand/collapse: 250ms height transition with overflow hidden
- Button loading states: spinner replaces text, same button dimensions
- Toast notifications: slide up from bottom, auto-dismiss 2.5s
- Filter pill changes: instant content rerender

## TECHNICAL
- Single React component file
- Tailwind CSS only (no custom CSS except for CSS variables in :root)
- Lucide React icons
- DM Sans from Google Fonts via @import in JSX style tag
- Mock data hardcoded — no API calls
- Mobile frame: realistic iPhone mockup with notch and status bar showing "9:41"
- Max-width 390px for app content, centered on desktop with subtle drop shadow frame
