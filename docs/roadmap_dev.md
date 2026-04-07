# MiINAPI — Roadmap de Desarrollo MVP
## Desde el miércoles 8 de abril, 2026
### Rol: Senior Product Designer + Senior FE/BE Developer

---

## Contexto

- **Stack FE:** Next.js 15 (App Router + Turbopack), TypeScript, Tailwind CSS v4, shadcn/ui
- **Stack BE:** NestJS 10, PostgreSQL 16, Redis 7, Prisma 5, Socket.io, BullMQ
- **Herramienta:** Antigravity (desarrollo local desde PC personal)
- **Restricción:** Sin acceso a consola/GitHub desde PC INAPI — todo el trabajo técnico se inicia el martes 7 desde PC personal
- **Pantallas MVP Fase 1:** Login, Dashboard, Notificaciones, Certificados, Soporte, Biblioteca
- **Fuera del MVP por ahora:** Simulador de Costos, Asistente IA Fonética

---

## Semana 1: Fundamentos (8–11 de abril)

### Miércoles 8 — Setup del proyecto y arquitectura base

**Mañana (2–3h) — Entorno**
- [ ] Crear monorepo `mi-inapi-app/` con subcarpetas `/frontend` y `/backend`
- [ ] Inicializar Next.js 15 con App Router y Turbopack en `/frontend`
  ```bash
  npx create-next-app@latest frontend --typescript --tailwind --app --turbopack
  ```
- [ ] Instalar dependencias FE core:
  ```bash
  npm install shadcn-ui zustand @tanstack/react-query react-hook-form zod
  npm install lucide-react clsx tailwind-merge
  npm install -D @types/node
  ```
- [ ] Inicializar shadcn/ui y configurar tema base MiINAPI
- [ ] Crear `globals.css` con todos los CSS custom properties del Design System

**Tarde (2–3h) — Backend base**
- [ ] Inicializar NestJS en `/backend`:
  ```bash
  npx @nestjs/cli new backend
  ```
- [ ] Instalar dependencias BE:
  ```bash
  npm install @nestjs/jwt @nestjs/passport passport passport-jwt
  npm install @prisma/client prisma
  npm install @nestjs/config @nestjs/websockets socket.io
  npm install bullmq ioredis
  ```
- [ ] Configurar `docker-compose.yml` con PostgreSQL 16 + Redis 7
- [ ] Levantar Docker Compose y verificar conexión
- [ ] Crear schema Prisma inicial (User, Tramite, Notificacion, Certificado)

**Entregable del día:** Monorepo corriendo en local. FE en `localhost:3000`, BE en `localhost:3001`, DB en `localhost:5432`.

---

### Jueves 9 — Design System en código + estructura de carpetas FE

**Mañana — Tokens y componentes base**
- [ ] Configurar `tailwind.config.ts` con todos los tokens del Design System:
  - Colores: primary, secondary, semaphore (danger, warning, info, success)
  - Tipografía: escala completa (display → label)
  - Spacing: escala base 4px
  - Border radius: sm/md/lg/xl/2xl/full
  - Shadows: elevation-0 a elevation-4
- [ ] Crear componentes base en `components/ui/`:
  - `StatusBadge.tsx` — badge semáforo (4 variantes)
  - `SemaphoreCard.tsx` — card con borde izquierdo de color semáforo
  - `StepperProgress.tsx` — stepper de etapas (INGRESO → EXAMEN → RESOLUCIÓN)
  - `BottomNav.tsx` — navegación inferior fija con safe area
  - `TopBar.tsx` — barra superior con logo + acciones
  - `SkeletonCard.tsx` — skeleton de carga para cards

**Tarde — Estructura de rutas App Router**
- [ ] Crear estructura de carpetas:
  ```
  src/app/
  ├── (auth)/
  │   ├── login/page.tsx
  │   └── layout.tsx
  └── (dashboard)/
      ├── layout.tsx          ← Shell con BottomNav
      ├── inicio/page.tsx
      ├── solicitudes/page.tsx
      ├── notificaciones/page.tsx
      ├── certificados/page.tsx
      ├── soporte/page.tsx
      ├── biblioteca/page.tsx
      └── perfil/page.tsx
  ```
- [ ] Crear `middleware.ts` para proteger rutas del dashboard
- [ ] Crear mock data completo en `lib/mock/` para todas las pantallas

**Entregable del día:** Design System en código funcionando. Rutas navegables con mock data.

---

### Viernes 10 — Pantallas Login y Dashboard (FE)

**Mañana — Login**
- [ ] Implementar `(auth)/login/page.tsx` completo:
  - Form RUT + Contraseña con React Hook Form + Zod
  - Validación de formato RUT chileno (fn `validateRUT`)
  - Botón ClaveÚnica (placeholder hasta integración real)
  - Estados: loading, error inline, success redirect
  - Animación de entrada (motion/opacity)
- [ ] Conectar con NextAuth.js v5 (credentials provider con mock BE)

**Tarde — Dashboard**
- [ ] Implementar `(dashboard)/inicio/page.tsx`:
  - Tabs Marca/Patente con estado activo (subrayado color primary)
  - Summary row: En Proceso / Acción Requerida / Finalizadas
  - Lista de TramiteCards ordenadas por urgencia semáforo
  - CTA contextual dinámico según tipo de notificación
  - Stepper interno con colores semáforo por etapa

**Entregable del día:** Flujo Login → Dashboard navegable con datos mockeados.

---

### Viernes 10 — Pantallas Notificaciones y Certificados (FE)

**Mañana — Notificaciones**
- [ ] Implementar `(dashboard)/notificaciones/page.tsx`:
  - Tabs Marca/Patente
  - Cards ordenadas por urgencia (🔴→🟠→🔵→🟢)
  - Filtro dropdown: Por urgencia / Por fecha (más reciente)
  - Cards expandibles con tabla de alcances de etapa
  - CTA contextual por tipo (adjuntar, confirmar, informativo)

**Tarde — Certificados**
- [ ] Implementar `(dashboard)/certificados/page.tsx`:
  - Buscador con input + filtro por tipo (botones pill bajo el buscador)
  - Grid de CertificateCards (Marca / Patente / Diseño)
  - Acción Descargar PDF (mock: download de archivo sample)
  - Estado vacío + estado de carga con skeleton

**Entregable del día:** 4 pantallas navegables con interactividad real.

---

### Sábado 11 (opcional, desde casa) — Soporte y Biblioteca

- [ ] `(dashboard)/soporte/page.tsx`:
  - Filtros de canal (Todos/Email/Chat/Llamada) como pills
  - Cards colapsables con historial de interacciones
  - Links fijos al fondo: OMPI, INAPI web, Nuevo Chat, Llámanos
- [ ] `(dashboard)/biblioteca/page.tsx`:
  - Grid de categorías 2×2 (Manuales/Guías/Videos/Oficiales)
  - Buscador
  - Lista de recursos con acciones Descargar/Ver
- [ ] Testing manual de todos los flujos
- [ ] Fix de bugs visuales

---

## Semana 2: Backend Real + Integraciones (13–17 de abril)

### Lunes 13 — Módulos BE: Auth y Usuarios

- [ ] Implementar `AuthModule` en NestJS:
  - Estrategia JWT (access token 15min + refresh token 7 días)
  - Estrategia ClaveÚnica (OIDC, pendiente credenciales sandbox)
  - Guards y decoradores de usuario actual
- [ ] Implementar `UsersModule`:
  - CRUD básico de usuario
  - Perfil segmentado (Persona Natural / Empresa)
  - Migración Prisma: tabla `users`

### Martes 14 — Módulo Trámites

- [ ] Implementar `TramitesModule`:
  - Endpoint `GET /tramites` paginado con filtro tipo + estado
  - Endpoint `GET /tramites/:id` con detalle completo
  - Modelo de estados con enum: EN_PROCESO, ACCION_REQUERIDA, PUBLICADA, FINALIZADA
  - Seeder con datos de prueba realistas (marcas y patentes)
- [ ] Conectar FE Dashboard con API real (reemplazar mock data)

### Miércoles 15 — Módulo Notificaciones + WebSocket

- [ ] Implementar `NotificacionesModule`:
  - Tabla `notificaciones` en Prisma con tipo + urgencia + contenido
  - Socket.io Gateway para push en tiempo real
  - Endpoint REST fallback `GET /notificaciones`
- [ ] Conectar FE Notificaciones con API real
- [ ] Implementar BullMQ job para alertas de caducidad (simulado)

### Jueves 16 — Módulo Certificados + Soporte

- [ ] `CertificadosModule`: endpoints + datos mock
- [ ] `SoporteModule`: historial de tickets (datos mock)
- [ ] Conectar ambas pantallas con BE real

### Viernes 17 — QA, ajustes y sesión de testing

- [ ] Testing E2E básico con Playwright (flujo Login → Dashboard → Notificaciones)
- [ ] Fix de issues encontrados
- [ ] Preparar build de staging
- [ ] Sesión de review con Álvaro y Bernarda

---

## Semana 3: Validación con Usuarios (20–24 de abril)

### Lunes 20 — Preparación sesión de testing

- [ ] Definir 5 usuarios para testing (perfil Usuario Ocasional)
- [ ] Preparar guion de entrevista con Pía (psicóloga UX)
- [ ] Crear tasks para los usuarios (con Nicole y Camila para métricas)
- [ ] Habilitar Microsoft Clarity + GA4 en ambiente de staging

### Martes 21–Miércoles 22 — Sesiones de testing

- [ ] 2–3 sesiones por día (5 usuarios total)
- [ ] Pía facilita, Fernando observa y toma notas UX, Nicole/Camila registran métricas

### Jueves 23 — Análisis de resultados

- [ ] Consolidar fricciones encontradas
- [ ] Priorizar fixes por impacto
- [ ] Actualizar diagramas de flujo si hay cambios de arquitectura de información

### Viernes 24 — Iteración 1 post-testing

- [ ] Implementar fixes de alta prioridad
- [ ] Segunda ronda de testing rápido (2–3 usuarios)
- [ ] Informe de resultados para Álvaro

---

## Semana 4+: Integraciones externas y producción (27 abril+)

- [ ] Integración real con sistema de trámites INAPI (reunión TI INAPI requerida)
- [ ] Integración ClaveÚnica sandbox → producción
- [ ] Integración TGR/SII para validación de pagos (Fase 2)
- [ ] Setup CI/CD (GitHub Actions o GitLab CI)
- [ ] Deploy en ambiente de staging INAPI
- [ ] Security review (datos personales, RUT, certificados)
- [ ] Accesibilidad audit (WCAG 2.1 AA)

---

## Criterios de "Done" por pantalla

| Pantalla | Criterio |
|----------|----------|
| Login | Form valida RUT, muestra errores inline, redirige al Dashboard |
| Dashboard | Tabs funcionales, cards ordenadas por urgencia, CTA contextual |
| Notificaciones | Orden semáforo, filtro operativo, tabla de alcances visible |
| Certificados | Filtro por tipo + buscador funcional, descarga mock |
| Soporte | Filtro canales, cards colapsables, links externos funcionando |
| Biblioteca | Filtro categorías + buscador, acciones descarga/ver |

---

## Deuda técnica a registrar (no bloquea MVP)

- Pantalla de Registro de nuevo usuario (flujo completo)
- Pantalla Detalle de Trámite (vista extendida)
- Simulador de Costos (Etapa 2)
- Asistente IA Fonética (Etapa 2)
- Push notifications nativas (iOS/Android) vía PWA
- Modo offline básico con Service Worker
- i18n (español chileno formal en todo el copy)
