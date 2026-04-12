# MiINAPI — Roadmap de Desarrollo MVP
Actualizado: 12 de abril, 2026
Rol: Senior Product Designer + Senior FE/BE Developer

---

## Contexto

- **Stack FE:** Next.js 15 (App Router + Turbopack), TypeScript, Tailwind CSS v4, shadcn/ui
- **Stack BE:** NestJS 10, PostgreSQL 16, Redis 7, Prisma 5, Socket.io, BullMQ
- **Herramienta:** Antigravity (desarrollo local desde PC personal)
- **Restricción:** Sin acceso a consola/GitHub desde PC INAPI — todo el trabajo técnico se inicia el martes 7 desde PC personal
- **Pantallas MVP Fase 1:** Login, Dashboard, Notificaciones, Certificados, Soporte, Biblioteca
- **Fuera del MVP por ahora:** Simulador de Costos, Asistente IA Fonética

---

## Semana 1: Fundamentos (8–12 de abril)

### Miércoles 8 — Setup del proyecto y arquitectura base

**Mañana (2–3h) — Entorno**
- [x] Crear monorepo `mi-inapi-app/` con subcarpetas `/frontend` y `/backend` ✅
- [x] Inicializar Next.js 15 con App Router y Turbopack en `/frontend` ✅
- [x] GitHub Actions configurado — `deploy.yml` ✅
- [x] Instalar dependencias FE core: Next.js 15, TypeScript, Tailwind v4 ✅
- [x] ESLint configurado (`eslintrc.json`, `next-env.d.ts`) ✅
- [x] Inicializar shadcn/ui y configurar tema base MiINAPI ✅
- [x] Crear `globals.css` y `next.config.ts` con tokens del Design System ✅

**Entregable del día:** Monorepo configurado y carpeta `/frontend` operativa con CI/CD.

---

### Jueves 9 — Design System en código + estructura de carpetas FE

**Mañana — Tokens y componentes base**
- [x] Configurar `tailwind.config.ts` con todos los tokens del Design System ✅
- [x] Crear componentes UI en `components/ui/` ✅:
  - `BottomNav.tsx` (🔄 lógica contextual en progreso)
  - `ChatIAFab.tsx`
  - `CollapsibleCard.tsx`
  - `CTAButton.tsx`
  - `DraggableRow.tsx`
  - `EmptyState.tsx`
  - `FilterPills.tsx`
  - `FormInput.tsx`
  - `NotificationTable.tsx`
  - `SemaphoreCard.tsx`
  - `StatusBadge.tsx`
  - `StepperProgress.tsx`
  - `Toast.tsx`
  - `TopBar.tsx`

**Tarde — Estructura de rutas App Router**
- [x] Crear todas las rutas del dashboard ✅:
  - `(auth)/login/`
  - `(dashboard)/inicio/`
  - `(dashboard)/solicitudes/` + `[id]/`
  - `(dashboard)/notificaciones/`
  - `(dashboard)/certificados/`
  - `(dashboard)/soporte/`
  - `(dashboard)/biblioteca/`
  - `(dashboard)/perfil/`
  - `(dashboard)/chat/`
  - `(dashboard)/diario-oficial/`
- [x] `middleware.ts` para proteger rutas ✅
- [x] Mock data completo en `lib/mock/` (notificaciones, certificados, trámites, etc.) ✅

**Entregable del día:** Design System en código y rutas navegables con mock data.

---

### Viernes 10 — Pantallas Login y Dashboard (FE)

**Mañana — Login**
- [x] Implementar `(auth)/login/page.tsx` base ✅
- [x] Validación de formato RUT chileno ✅
- [x] Animación de entrada y layout de auth ✅

**Tarde — Dashboard y Solicitudes**
- [x] Implementar `(dashboard)/inicio/page.tsx` ✅
- [x] Implementar `(dashboard)/solicitudes/` y detalle `[id]/` con `SolicitudDetalleCliente` ✅
- [x] CTA contextual dinámico según tipo de trámite ✅

---

### Sábado 11 — Notificaciones y Certificados (FE)

**Mañana — Notificaciones**
- [x] Implementar `(dashboard)/notificaciones/page.tsx` ✅
- [x] Cards ordenadas por urgencia y tabla de alcances ✅

**Tarde — Certificados**
- [x] Implementar `(dashboard)/certificados/page.tsx` ✅
- [x] Buscador y filtros por tipo ✅

---

### Domingo 12 — Soporte, Biblioteca y Ajustes Finales FE

- [x] `(dashboard)/soporte/page.tsx` + historial ✅
- [x] `(dashboard)/biblioteca/page.tsx` ✅
- [x] `(dashboard)/chat/page.tsx` y `(dashboard)/diario-oficial/page.tsx` ✅
- [x] `BottomNav.tsx` — lógica contextual por tipo de usuario ✅
- [x] `SkeletonCard.tsx` — implementación en Dashboard y Notificaciones ✅
- [x] Testing manual completo de todos los flujos ✅

---

## SEMANA 2 — FE: Cierre y pulido (13–17 de abril)

Contexto: El backend NO empieza esta semana. El FE se cierra primero con todas las
interacciones funcionando en mock data. El backend se aborda la semana siguiente
con estudio previo (ver Semana 3 abajo). Esta secuencia es intencional y correcta.

### Lunes 13 — BottomNav contextual ✅
*Por qué esto primero:* El BottomNav es el sistema de navegación de toda la app.
Si no está correcto, todas las pantallas tienen un flujo roto. Se cierra antes de avanzar.

- [x] Implementar los 3 estados contextuales en `BottomNav.tsx` ✅
- [x] El estado lo lee desde `store.ts` ✅
- [x] Implementar lógica de detección del estado mediante función pura `getUserState` ✅
- [x] Asegurar visibilidad y posición correcta del `ChatIAFab.tsx` ✅

### Martes 14 — middleware.ts + Login completo ✅
*Por qué:* Sin el middleware, cualquiera puede acceder al dashboard sin autenticarse.
Es la barrera de seguridad básica del FE.

- [x] Crear `src/middleware.ts` para proteger rutas `/dashboard/*` ✅
- [x] Completar `validateRUT` en login con el algoritmo módulo 11 ✅
- [x] Implementar estados de carga en botón "Ingresar" ✅
- [x] Mock de redirect al dashboard tras login exitoso (cookie + navigate) ✅

### Miércoles 15 — Pantalla Inicio: los 3 estados completos
- [ ] Implementar lógica de renderizado condicional en `inicio/page.tsx` según `userState`.
- [ ] Estado A: Bienvenida + info card + accesos rápidos + CTA portal INAPI.
- [ ] Estado B: Card urgente expandida + summary row + accesos rápidos.
- [ ] Estado C: Summary row + card más reciente + accesos rápidos.
- [ ] Dev toggle (selector de estados para demo).

### Jueves 16 — Skeletons, EmptyStates y Polish
- [ ] Implementar `SkeletonCard` en Dashboard y Notificaciones.
- [ ] Implementar `EmptyState` en Solicitudes, Certificados y Chat IA.
- [ ] Simular delay de carga de 800ms en todas las pantallas con datos.
- [ ] Verificar Toasts en Certificados y posición de FAB en todas las pantallas.

### Viernes 17 — Testing manual + cierre FE
- [ ] Recorrer todos los flujos completos.
- [ ] Verificar persistencia del Design System.
- [ ] Commit + push limpio (sin errores de TS/ESLint).

**Criterio de "FE Done":**
✅ App navegable completa con mock data · ✅ Sin errores de TS/ESLint · ✅ Todos los estados vacíos y de carga funcionando · ✅ BottomNav contextual · ✅ ChatIA FAB visible y dentro del frame

---

## SEMANA 3 — ESTUDIO BACKEND (20–24 de abril)

Esta semana no tocas código de backend todavía. El objetivo es entender CADA herramienta del stack.

- **Lunes 20:** Node.js + NestJS: la base.
- **Martes 21:** PostgreSQL + Prisma: los datos.
- **Miércoles 22:** Redis + BullMQ: cache y colas.
- **Jueves 23:** JWT + Auth + ClaveÚnica.
- **Viernes 24:** Socket.io: notificaciones en tiempo real + Integración completa.

---

## SEMANA 4 — Implementación Backend (27 abril – 1 mayo)

### Lunes 27 — Setup Backend
- [ ] Crear carpeta `/backend`, inicializar NestJS e instalar dependencias.
- [ ] Configurar `docker-compose.yml` (PostgreSQL + Redis).
- [ ] Inicializar Prisma y escribir el `schema.prisma` inicial.

### Martes 28 — AuthModule
- [ ] Implementar `AuthModule` (JWT, estrategias).
- [ ] Implementar `UsersModule` básico y seeder de prueba.

### Miércoles 29 — TramitesModule
- [ ] Implementar CRUD de trámites con filtros y protección de rutas.
- [ ] Conectar FE con API real.

### Jueves 30 — NotificacionesModule + Socket.io
- [ ] Implementar `NotificacionesModule` y gateway de WebSockets.
- [ ] Conectar FE con notificaciones en tiempo real.

### Viernes 1 mayo — CertificadosModule + QA
- [ ] Implementar `CertificadosModule` y testing manual del flujo completo.

---

## SEMANA 5 — Integraciones y Testing (4–8 mayo)
- [ ] BullMQ alerta de caducidad.
- [ ] SoporteModule: historial real de tickets.
- [ ] QA E2E y Analytics (Clarity/GA4).

## SEMANAS 6–7 — Validación con Usuarios (11–22 mayo)
- [ ] Sesiones de testing facilitadas por Pía.
- [ ] Análisis de fricciones e iteración de fixes.

## SEMANAS 8+ — Integraciones externas
- [ ] Integración real sistema INAPI y ClaveÚnica producción.
- [ ] Security review y Accesibilidad audit (WCAG 2.1 AA).

---

## Criterios de "Done" por pantalla

| Pantalla | Criterio FE (mock) | Criterio BE (real) |
|----------|-------------------|-------------------|
| Login | Valida RUT, error inline, redirect mock | JWT real, ClaveÚnica OIDC |
| Inicio | 3 estados contextuales, BottomNav contextual | Estado calculado desde BD real |
| Solicitudes | Tabs, stepper, CTA contextual, EmptyState | GET /tramites con auth |
| Notificaciones | Orden semáforo, expandible, NotificationTable | GET /notificaciones + Socket.io |
| Certificados | Filtro, buscador, descarga mock, Toast | GET /certificados, PDF real |
| Soporte | Filtros canal, colapsable, links externos | GET /tickets desde BD |
| Biblioteca | Categorías, buscador, descarga mock | GET /recursos desde BD |
| Perfil | Datos usuario, nav a herramientas | Datos desde JWT payload |
| Chat IA | Historial, conversación, FAB | Integración modelo IA (Fase 2) |
| Diario Oficial | Mis publicaciones, lista reciente | API DO (por definir) |

---

## Deuda técnica registrada (no bloquea MVP)

- Pantalla de Registro de usuario (Fase 2)
- Pantalla Detalle de Trámite extendida (Fase 2)
- Simulador de Costos y Asistente IA Fonética (Fase 2)
- Push notifications nativas y Modo offline avanzado (Fase 2)
- Rediseño web INAPI institucional (Proyecto futuro)

