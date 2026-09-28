# Registro de Desarrollo: MiINAPI

Este documento describe el proceso de desarrollo del proyecto **MiINAPI**. Es un registro de las decisiones tomadas, los aprendizajes adquiridos, los problemas que surgieron y la forma en que se resolvieron, y el progreso realizado.

Planificación y contexto de producto: [Roadmap](../ROADMAP.md) · [PRD](../PRD.md) · [Arquitectura](../ARCHITECTURE.md) · [Base de datos](../DATABASE.md).

Las entradas se listan de **más reciente a más antigua**.

## 📑 Índice

Orden: más reciente → más antiguo.

1. [2026-09-28 — Frontend | Fase 1 MVP: alcance UI, seguimiento y pulido de producto](#2026-09-28---frontend--fase-1-mvp-alcance-ui-seguimiento-y-pulido-de-producto)
2. [2026-06-10 — Frontend | Sprint 3: Implementación UI Kit GOB v3.0.1 — cierre de migración](#2026-06-10---frontend--sprint-3-implementación-ui-kit-gob-v301--cierre-de-migración)
3. [2026-06-10 — Frontend | Sprint 3: Migración UI Kit GOB v3.0.1 — documentación](#2026-06-10---frontend--sprint-3-migración-ui-kit-gob-v301--documentación)
4. [2026-04-14 — Frontend | Sprint 2: Stepper, Mock Data, Login y Polish Final](#2026-04-14---frontend--sprint-2-stepper-mock-data-login-y-polish-final)
5. [2026-04-13 — Frontend | Sprint 1.5: Cierre, Seguridad y Navegación Contextual](#2026-04-13---frontend--sprint-15-cierre-seguridad-y-navegación-contextual)
6. [2026-04-13 — Frontend | Sprint 1: Fundamentos, Design System y App Router (desde 2026-04-06)](#2026-04-13---frontend--sprint-1-fundamentos-design-system-y-app-router-desde-2026-04-06)

---

## [2026-09-28] - Frontend | Fase 1 MVP: alcance UI, seguimiento y pulido de producto

### Contexto y objetivos:

Se creó la rama **`fase1-mvp-actualizacion`** desde `origin/main` para implementar en UI el alcance de **Fase 1** del documento técnico del proyecto (seguimiento, notificaciones, contacto y recursos), **sin borrar** funcionalidades reservadas para Fase 2 (chat IA, diario oficial, pagos en perfil, etc.). El objetivo fue entregar una experiencia coherente con el semáforo INAPI, copy alineado a trámites reales y mocks consistentes entre pantallas, manteniendo el stack GOB ya migrado en Sprint 3.

### Implementación técnica:

**Feature flags y Fase 2 oculta**
- `frontend/lib/featureFlags.ts`: `PHASE_2_UI_ENABLED`, `phase2HiddenClass()`, etiqueta unificada `LABEL_VER_DETALLE_SOLICITUD`, helper `ctaVariantForSemaphore()` para CTAs alineados al color del trámite.
- Ocultación vía CSS `hidden` en: FAB Chat IA (`layout.tsx`), secciones de perfil, historial/FAQ de soporte (código conservado).

**Solicitudes y detalle**
- `AccionRequeridaDetalle.tsx`: sección visible para todos los estados (acción vs. informativo info/success); tabla de detalle en `<details>` colapsable; botón **Descargar PDF del registro de la marca** solo si `estado === FINALIZADA` y semáforo verde (`lib/solicitudActions.ts`). La descarga es simulada (toast).
- `mockData.ts`: textos ampliados (`accionRequeridaDetalle`, `notificacion`); `getSolicitudById()`; perfil `active-no-urgent` alineado con trm-004.
- `SolicitudDetalleClient.tsx`: documentos según estado; sin CTAs duplicados de acción fuera de la sección acordada.

**Notificaciones e inicio**
- `notificaciones/page.tsx`: urgencia tomada del trámite vinculado; CTA único al detalle con variante de semáforo.
- `inicio/page.tsx` (usuario **new**): bloque «Para qué sirve esta app», teasers (YouTube INAPI, biblioteca, herramientas con enlaces oficiales), «Primer paso» al [portal de solicitud de marca](https://tramites.inapi.cl/Trademark/TrademarkApplication/IndexTrademark); accesos Biblioteca/Contacto; ítems con acentos de color distintos.

**Contacto y biblioteca**
- `lib/inapiContact.ts` + `InapiContactCard.tsx`: canales estructurados, iconos con fondos diferenciados, sin card semáforo naranja envolvente.
- `biblioteca/page.tsx`: tarjetas por tipo de recurso (PDF guía/manual, video, web, herramientas) con chips e iconos propios; atajos por categoría; sin `SemaphoreCard` azul uniforme en todos los ítems.

**Navegación inferior**
- `BottomNav.tsx`: estados activo/hover/focus, indicador superior, `z-[100]`.
- Corrección de tokens Tailwind v4 en `globals.css`: `--color-surface`, `--color-surface-elevated`, `--color-muted-secondary`, `@config` hacia `tailwind.config.ts`, clase `.bottom-nav-shell` con `background-color: var(--surface)` para evitar transparencia al hacer scroll.

**Otros**
- Contacto renombrado en navegación («Contacto»); textos de cabeceras en solicitudes/notificaciones.
- `next.config.ts` / `TopBar`: logo con `basePath` para GitHub Pages (heredado de commits previos en la línea de trabajo).

### 💡 Repaso técnico: `bg-surface` y barra inferior aparentemente transparente

En Tailwind v4 el bloque `@theme` definía `--color-bg-surface` pero no `--color-surface`, por lo que la utilidad `bg-surface` **no generaba color de fondo** y el contenido scrollable se veía bajo el `BottomNav`. La solución fue registrar `--color-surface` / `--color-surface-elevated`, cargar `tailwind.config.ts` con `@config` y reforzar la barra con `.bottom-nav-shell { background-color: var(--surface); }`.

### Próximos pasos:

- Commit y PR de `fase1-mvp-actualizacion` hacia `main` (revisión con stakeholders INAPI).
- README raíz y handoff desarrollador backend cuando se abra integración API.
- Fase 2: reactivar `PHASE_2_UI_ENABLED` y conectar servicios reales.
- QA visual: contraste AA en modo día/noche, safe areas iOS y despliegue GitHub Pages.

---

## [2026-06-10] - Frontend | Sprint 3: Implementación UI Kit GOB v3.0.1 — cierre de migración

### Contexto y objetivos:

Tras documentar la migración al UI Kit Gobierno de Chile v3.0.1 (Fase 0), el objetivo de esta jornada fue **implementar en código** la totalidad del plan en `docs/UI_MIGRATION_PLAN.md`: tokens, componentes, layouts, páginas, accesibilidad y cierre visual con identidad institucional INAPI. El MVP debía abandonar el frame móvil de 390 px, los hex legacy y las fuentes DM Sans/Outfit a favor de Roboto, tokens semánticos GOB y componentes React propios (sin Bootstrap).

### Implementación técnica:

**Fase 1 — Tokens e infraestructura**
- `frontend/app/globals.css`: variables CSS GOB (`--color-primary`, semáforos, neutros, ClaveÚnica, elevación, radius, grilla).
- `frontend/tailwind.config.ts`: breakpoints 600/905/1240/1440 px, paleta semántica, tipografía y sombras.
- `frontend/app/layout.tsx`: fuentes Roboto Sans + Roboto Slab vía `next/font`, clases `bg-background` / `text-foreground`, contenedor `gob-container`.
- `frontend/lib/utils.ts`: utilidad `cn()` con `clsx` + `tailwind-merge`.
- `frontend/package.json`: script `typecheck` (`tsc --noEmit`).

**Fase 2 — Componentes UI**
- Creación de `ClaveUnicaButton.tsx` con tokens `--claveunica-*` y cinco estados interactivos documentados.
- Migración de componentes en `frontend/components/ui/` a tokens GOB: `CTAButton`, `StatusBadge`, `SemaphoreCard`, `FormInput`, `FilterPills`, `TopBar`, `BottomNav`, `Toast`, `ChatIAFab`, etc.
- Eliminación de hex arbitrarios en favor de clases semánticas (`bg-primary`, `text-muted`, `border-border`).

**Fase 3 — Layouts y shell**
- Eliminación del frame fijo 390 px en `frontend/app/(dashboard)/layout.tsx`.
- Shell full-width con `min-h-dvh`, grilla GOB y utilidad `pb-safe-bottomnav` para respetar `BottomNav`.
- `ChatIAFab` reposicionado sin wrapper duplicado; layout auth alineado a `bg-background`.

**Fase 4 — Páginas**
- Migración de las 13 rutas en `frontend/app/`: login, inicio, solicitudes, detalle, notificaciones, certificados, biblioteca, soporte, chat, chat ejecutivo, perfil, diario oficial.
- Login integra `ClaveUnicaButton` (reemplaza `CTAButton` outline + ícono Fingerprint).
- Patrones unificados: headers sticky, padding inferior seguro, tokens en cards y tablas.

**Fase 5 — Accesibilidad y dark mode**
- Tokens dark mode ampliados en `globals.css` (`html.dark`): fondos semánticos, links, elevaciones.
- `prefers-reduced-motion`: desactivación de skeleton, animaciones de entrada y transiciones de cards.
- Focus visible unificado con anillo `#FFBE5C` (`focus-gob`, `focus-visible:ring-focus`).
- Touch targets ≥ 44 px en botones; ≥ 29 px en chips y badges.

**Toggle modo día/noche (mejora posterior)**
- `frontend/lib/themeStore.ts`: store Zustand con persistencia en `localStorage` (`miinapi-theme`), default `dark`.
- `frontend/components/ui/ThemeToggle.tsx`: botón Sol/Luna en `TopBar` (campana → toggle → perfil).
- `globals.css`: reemplazo de `@media (prefers-color-scheme)` por clase `html.dark` controlada manualmente.
- `layout.tsx`: script `beforeInteractive` para aplicar tema antes del paint y evitar flash; `suppressHydrationWarning` en `<html>`.
- Login expone toggle de tema sin campana ni perfil (`showThemeToggle={true}`).

**Corrección de contraste en botones sólidos (modo día)**
- Causa: `tailwind-merge` eliminaba `text-white` / `text-primary-foreground` al fusionar con clases tipográficas custom (`text-btn`, `text-body-sm`, etc.), dejando heredar `--foreground` (#373737) sobre fondos saturados.
- Solución: `extendTailwindMerge` en `lib/utils.ts` registrando las clases tipográficas del design system como grupo `font-size`, no como color.
- Afectaba `CTAButton` (Ingresar, Ir a la notificación), `ClaveUnicaButton` y cualquier componente que usara `cn()` con el mismo patrón.

**Logo institucional INAPI**
- Incorporación de `docs/uikit_gob/references/inapi_logo.jpg` como asset oficial en `frontend/public/images/inapi-logo.jpg`.
- Actualización de `TopBar.tsx`: `next/image` con alt descriptivo, dimensiones intrínsecas y escala `h-8 w-auto object-contain`.
- Eliminación del placeholder `inapi-logo.png` y del archivo legacy `docs/logo_inapi.png`.
- Inventario actualizado en `docs/uikit_gob/references/README.md`.

### 💡 Repaso técnico: Colisión `text-*` tipografía vs color en tailwind-merge

Las utilidades tipográficas del design system (`text-btn`, `text-body`, `text-h1`, …) comparten prefijo `text-` con las utilidades de color de Tailwind (`text-white`, `text-primary-foreground`). Sin configuración, `twMerge` asume que son mutuamente excluyentes y conserva la última en el orden de fusión — típicamente `text-btn`, que en `globals.css` solo define tamaño y peso, no color. En modo oscuro el bug era invisible porque `--foreground` ya es claro; en modo día el texto quedaba ilegible sobre botones primarios, semáforos y ClaveÚnica. La extensión de `classGroups.font-size` en `extendTailwindMerge` separa ambos namespaces sin renombrar las clases del design system.

### Próximos pasos:

- Fase 6 — QA visual: grep de hex arbitrarios en `frontend/` (objetivo cero), checklist breakpoints 600/905/1240/1440 px y verificación de los cinco estados ClaveÚnica.
- Validar despliegue en GitHub Pages con `basePath` `/mi-inapi-app` y logo institucional.
- Commit final, PR y merge de la rama `docs/ui-kit-gob-v3-migration` hacia `main`.

---

## [2026-06-10] - Frontend | Sprint 3: Migración UI Kit GOB v3.0.1 — documentación

### Contexto y objetivos:

Tras incorporar la carpeta `docs/uikit_gob/` con capturas del UI Kit Gobierno de Chile v3.0.1 y la lámina `claveunica-button-states.PNG`, era necesario alinear la documentación de MiINAPI antes de tocar código. El MVP frontend aún usa tokens legacy (DM Sans, `#1A56DB`, frame 390 px, ~90 hex hardcodeados), pero la dirección acordada es **tokens GOB en Tailwind + componentes React propios**, descartando el Framework kit Bootstrap (`@gobdigital-cl/gob.cl`) por incompatibilidad con Next.js 15 y MVPs SPA.

Este sprint documenta la migración completa (Fase 0 del plan); la implementación en `frontend/` queda para sprints posteriores.

### Implementación técnica:

- **`docs/DESIGN_SYSTEM.md` v2.0.0-gob:** reescritura con paleta `GOB.COLOR.*`, tipografía Roboto Slab/Sans, espaciado kit (4–64 px), grilla responsiva (600/905/1240/1440 px, 4/8/12 columnas), elevación y radius GOB, semáforo INAPI remapeado a estados semánticos, componente dedicado `ClaveUnicaButton` (§9.14) y tokens `--claveunica-*`.
- **`docs/UI_MIGRATION_PLAN.md`:** plan en 6 fases (documentación → tokens CSS → componentes → layouts → páginas → QA), decisiones de arquitectura y mapa legacy→GOB.
- **`docs/uikit_gob/references/`:** `README.md` actualizado con inventario PNG incluyendo ClaveÚnica; `DESIGN_SYSTEM.md` de referencia enlazado al DS MiINAPI v2.
- **`docs/FLOW_DIAGRAMS.md`:** colores Mermaid alineados a GOB (`#FB3B3B`, `#FF5722`, `#2196F3`, `#4CAF50`).
- **`docs/USER_JOURNEY.md`:** nota de equipo con enlace al nuevo design system y reglas de semáforo/ClaveÚnica.
- **`docs/prompts/`:** aviso de obsolescencia parcial (v1) en `correccion.md`, `v0_prompt_v2.md` y `Antigravity_Prompt_MiINAPI_v2.md`.

### 💡 Repaso técnico: UI Kit v3.0.1 vs Framework kit Gobierno

El sitio [framework.digital.gob.cl](https://framework.digital.gob.cl/) distribuye `@gobdigital-cl/gob.cl` sobre Bootstrap 4 + jQuery (breakpoints 576/768/992/1200 px). El UI Kit v3.0.1 en Figma/PDF usa otra grilla (600/905/1240/1440 px) y tokens `GOB.COLOR.*`. Para MiINAPI (Next.js + Tailwind v4), la estrategia correcta es **extraer tokens y patrones**, no instalar el paquete npm legacy. El botón ClaveÚnica es un caso especial: identidad propia documentada en `claveunica-button-states.PNG`, independiente del accent GOB `#FF4731`.

### Próximos pasos:

- Fase 1: propagar tokens a `frontend/app/globals.css`, `tailwind.config.ts` y `layout.tsx` (Roboto).
- Fase 2: crear `ClaveUnicaButton.tsx` y migrar componentes `ui/` a clases semánticas.
- Fase 3: eliminar frame 390 px; adoptar contenedor GOB en layouts.
- Fase 4: migrar páginas, empezando por `login/page.tsx`.
- Completar hex pendientes: escala `GOB.COLOR.GRIS` y valores CSS de Elevation-01…05.

---

## [2026-04-14] - Frontend | Sprint 2: Stepper, Mock Data, Login y Polish Final

### Contexto y objetivos
Cerrar todos los flujos críticos del MVP antes del testing manual final. Esta sesión se enfocó en cuatro ejes: (1) Refactorización del `StepperProgress` para reflejar el embudo real de trámites de marca, (2) Separación de la capa de datos mock por perfil de usuario, (3) Resolución definitiva de los bugs de autenticación — con énfasis especial en el **campo de contraseña del login institucional** —, y (4) Polish visual y de navegación en todas las pantallas.

### Implementación técnica

- **StepperProgress — 7 etapas reales:** Reescritura completa del componente para modelar el embudo oficial de registro de marca INAPI: `Presentación → Observación → Publicación → Oposición → Resolución de Fondo → Aceptación → Registro`. Se eliminaron las 3 etapas genéricas anteriores.
- **Semáforo visual en el Step activo:** Se añadió lógica de color condicional basada en el campo `diasRestantes` del trámite:
  - 🔴 **Rojo** (`danger`): ≤ 7 días restantes — urgencia máxima.
  - 🟠 **Naranjo** (`warning`): ≥ 8 días — acción requerida con plazo normal.
  - 🔵 **Azul** (`info`): en revisión por INAPI, sin acción del ciudadano.
  - 🟢 **Verde** (`success`): trámite finalizado satisfactoriamente.
- **Microcopys de pago por etapa:** Se incorporaron etiquetas contextuales de acción financiera: `"Pago en UTM"` (Presentación), `"Pago de Publicación"` (Publicación), `"Registro final"` (Registro).
- **Mock data segmentado por `userState`:** Refactorización de `lib/mockData.ts` para separar los arreglos de trámites y notificaciones según el estado del usuario:
  - `active-urgent`: 5 notificaciones (2 acciones requeridas, 2 cambios de estado, 1 finalizada) con las marcas reales: EcoTech, FarmaTech, Aura Cosmetics, NeoGraphix, Terra Verde.
  - `active-no-urgent`: 1 notificación y 1 trámite, únicamente "NeoGraphix Design".
- **Validación de password en Login institucional:** Se corrigió el formulario de acceso: el campo `password` ahora tiene estado propio (`useState`), validación inline (`"Ingresa tu contraseña"`) y el botón "Ingresar" permanece deshabilitado hasta que RUT válido + password estén presentes simultáneamente.
- **BottomNav — lógica de pestañas corregida:** En estados `active-no-urgent` y `new`, "Certificados" queda oculto y "Soporte" toma su posición. El componente es 100% autogestionado (sin props del layout).
- **Overflow del Stepper en pantallas < 350px:** Se aplicó `overflow-x-auto` al contenedor y `text-xs` a las etiquetas para resolver el desbordamiento sin afectar layouts mayores.

### 💡 Repaso técnico: Seguridad del campo password en un MVP con mock data

En un formulario de login real, el campo contraseña debe cumplir varios requisitos de seguridad que en el estado actual del MVP **no están implementados** intencionalmente:

1. **Hashing:** La contraseña nunca debe viajar en texto plano. En el backend real (NestJS + `AuthModule`), se usará `bcrypt` con salt rounds para hashear antes de almacenar y comparar.
2. **Política de complejidad:** El formulario de producción debe exigir mínimo 8 caracteres, incluyendo mayúsculas, números y un carácter especial.
3. **Rate-limiting:** Se necesita un mecanismo de bloqueo después de N intentos fallidos (implementado via `@nestjs/throttler` en el AuthModule).
4. **Decisión de diseño:** Para el MVP de frontend con mock data, se optó por validación mínima (campo no vacío) para permitir testing ágil. Esta deuda está registrada y será abordada en la Semana 4 cuando se implemente el `AuthModule` real.

### 🐛 Bugs detectados y mitigados — 14 de abril

1. **Login institucional — campo password sin conectar:**
   - *Síntoma:* El formulario permitía hacer clic en "Ingresar" con la contraseña completamente vacía, sin ningún mensaje de error inline.
   - *Causa raíz:* El `<input type="password">` no estaba vinculado al estado React ni participaba en la validación del formulario. El botón "Ingresar" solo verificaba el RUT.
   - *Solución:* Se añadió `const [password, setPassword] = useState('')` y se conectó el `onChange`. La función de submit ahora valida `password.length > 0` antes de proceder. Se añadió mensaje de error inline `"Ingresa tu contraseña"` con el mismo estilo que el error de RUT. El botón queda deshabilitado hasta que ambos campos sean válidos.

2. **BottomNav — desincronización con DashboardLayout:**
   - *Síntoma:* Las pestañas mostraban el estado incorrecto según el perfil del usuario al navegar entre pantallas.
   - *Causa raíz:* El `DashboardLayout` pasaba el tab activo por props, sobreescribiendo el estado contextual leído desde el store.
   - *Solución:* Eliminación de la lógica de props en el layout. El `BottomNav` ahora es completamente autónomo: `userState` desde el store + `pathname` desde `usePathname()`.

3. **InicioPage — pantalla en blanco tras agregar hooks:**
   - *Síntoma:* `/inicio` quedaba completamente en blanco después de incorporar `useState` y `useEffect`.
   - *Causa raíz:* Durante la edición, los imports de Lucide Icons fueron eliminados accidentalmente, rompiendo el árbol JSX completo.
   - *Solución:* Re-escritura integral del archivo garantizando coexistencia de: `{ useState, useEffect }` de React, íconos de Lucide, componentes UI propios y la capa de mock data.

4. **StepperProgress — overflow en pantallas < 350px:**
   - *Síntoma:* El stepper de 7 nodos desbordaba su contenedor en dispositivos ultra-compactos, rompiendo el layout de la card de solicitud.
   - *Causa raíz:* Flexbox con 7 ítems de ancho fijo sin contenedor scrollable superaba el ancho disponible.
   - *Solución:* `overflow-x-auto` en el wrapper del stepper + `text-xs` en las etiquetas. El scroll horizontal es imperceptible en pantallas normales pero resuelve el edge case.

5. **`notificaciones/page.tsx` — datos no segmentados por perfil:**
   - *Síntoma:* Ambos perfiles (`active-urgent` y `active-no-urgent`) mostraban las mismas 5 notificaciones.
   - *Causa raíz:* La página usaba un único arreglo de mock data sin condición de `userState`.
   - *Solución:* Se añadió lógica condicional: `active-urgent` consume `mockNotificacionesUrgent` (5 ítems), `active-no-urgent` consume `mockNotificacionesNoUrgent` (1 ítem).

6. **`solicitudes/page.tsx` — misma corrección de segmentación:**
   - *Síntoma:* `active-no-urgent` mostraba todos los trámites en lugar de solo NeoGraphix Design.
   - *Causa raíz:* Mismo origen que el de notificaciones — datos no diferenciados.
   - *Solución:* Filtrado condicional: `active-no-urgent` muestra únicamente el trámite correspondiente a "NeoGraphix Design".

### Próximos pasos
- [ ] Semana del 13 al 17 de abril: Generar primer Focus Group con Equipo de Atención al Client para recolectar Feedback antes de testeo con usuarios reales.
- [ ] Martes 14, miércoles 15 y jueves 16 y viernes 17de abril: Continuar Estudio de BE.
- [ ] Viernes 17: Programar reunión con Isidora junto con el equipo UX para presentar el mvp Mi INAPI App.

---

## [2026-04-13] - Frontend | Sprint 1.5: Cierre, Seguridad y Navegación Contextual

### Contexto y objetivos
Consolidar la experiencia de usuario y la seguridad básica del frontend antes de pasar a la fase de estudio de backend. El enfoque principal fue implementar un sistema de navegación adaptativo según el perfil del usuario y establecer un middleware de protección de rutas para simular una sesión real.

### Implementación técnica
- **Navegación Contextual (BottomNav):** Refactorización del componente `BottomNav` para consumir el estado del usuario (`new`, `active-urgent`, `active-no-urgent`) desde el store central. Las pestañas cambian dinámicamente: usuarios nuevos ven herramientas de ayuda (Biblioteca/Soporte), mientras que activos ven gestión operativa (Solicitudes/Certificados).
- **Middleware de Protección:** Creación de `middleware.ts` para interceptar peticiones a las rutas del dashboard. Se implementó una lógica de redirección basada en la presencia de la cookie `miinapi-auth`, garantizando que solo "usuarios autenticados" accedan a la aplicación.
- **Refinamiento de Acceso (RUT):** Actualización del algoritmo de validación del RUT chileno al estándar Módulo 11 y formateo automático on-the-fly, mejorando la UX del formulario de acceso institucional.
- **Lógica de Cierre de Sesión:** Implementación de la funcionalidad de logout en la pantalla de Perfil, asegurando la eliminación física de la cookie de sesión para prevenir re-ingresos no autorizados.
- **Estados de Carga y Skeletons:** Integración del componente `SkeletonCard` en las pantallas de Inicio y Notificaciones. Se implementó una lógica de simulación de carga de 800ms para mejorar la percepción de velocidad y estabilidad del sistema (UX).
- **Pulido Final FE:** Verificación de alineación de componentes, corrección de sombras y transiciones en todas las pantallas del MVP.

### 💡 Repaso técnico: Middleware y Cookies en Next.js 15
El uso del `middleware.ts` a nivel de raíz permite centralizar la lógica de seguridad sin contaminar los componentes de página. En Next.js 15, la interacción con `NextRequest` y `NextResponse` es fundamental para manejar redirecciones del lado del servidor de forma eficiente antes de que el cliente renderice cualquier contenido sensible.

### Errores y Soluciones
1. **Falla en el Acceso con ClaveÚnica:** 
   - *Problema:* El botón de ClaveÚnica redirigía correctamente, pero el middleware rebotaba la petición al login inmediatamente por falta de credenciales.
   - *Solución:* Se identificó que faltaba establecer la cookie `miinapi-auth` en el manejador de ClaveÚnica, similar a como se hace en el login manual.
2. **Logout Incompleto (Redirección Incorrecta):**
   - *Problema:* El botón de "Cerrar Sesión" en Perfil redirigía a `/inicio` en lugar de `/login`, y no limpiaba la cookie de sesión.
   - *Solución:* Se actualizó el manejador para forzar la expiración de la cookie a través del navegador antes de realizar el `router.push('/login')`.
3. **Conflictos de Navegación en DashboardLayout:**
   - *Problema:* El layout intentaba gestionar el estado activo del BottomNav mediante props, causando desincronización con el nuevo sistema contextual.
   - *Solución:* Se removió la lógica redundante del layout, permitiendo que el BottomNav sea un componente autogestionado que lee directamente del router y del store central.
4. **Desincronización de Tipados en InicioPage:**
   - *Problema:* Al intentar importar `useState` y `useEffect` se eliminaron accidentalmente los imports de Lucide Icons, rompiendo el renderizado.
   - *Solución:* Re-escritura completa del archivo asegurando la coexistencia de hooks de React y la biblioteca de iconos.

### Próximos pasos
- Realizar el testing manual completo de todos los flujos confirmando el "FE Done".
- Iniciar la semana de estudio técnico del stack de Backend (Semana 3).

---

## [2026-04-13] - Frontend | Sprint 1: Fundamentos, Design System y App Router (desde 2026-04-06)

### Contexto y objetivos
Establecer la base tecnológica para el MVP de MiINAPI, priorizando una experiencia de usuario fluida y visualmente premium (Senior Product Designer level). El objetivo de este sprint fue consolidar la infraestructura monorepo, el sistema de diseño basado en Tailwind CSS v4 y la navegación completa mediante el App Router de Next.js 15 con datos simulados (mock data).

### Implementación técnica
- **Stack Core:** Configuración de Next.js 15 con Turbopack para un desarrollo ultra-rápido. Uso de TypeScript estricto para garantizar la estabilidad del contrato de datos.
- **Design System con Tailwind v4:** Implementación de tokens semánticos (primary, secondary, semaphore colors) integrados directamente en `globals.css` y `tailwind.config.ts`. Se priorizó el uso de tipografía moderna (Outfit/Inter) y una escala de espaciado coherente.
- **Arquitectura de Componentes UI:** Creación de una biblioteca de +15 componentes reutilizables en `components/ui/`, incluyendo piezas complejas como `StepperProgress`, `SemaphoreCard` y el `ChatIAFab`.
- **Ruteo y Estructura:** Implementación de 10+ rutas funcionales bajo grupos de rutas `(auth)` y `(dashboard)`. Se preparó la estructura para el Dashboard, Solicitudes, Notificaciones, Certificados, y secciones auxiliares como Biblioteca y Soporte.
- **Capa de Datos (Mocking):** Desarrollo de una robusta capa de `mock data` en `lib/mock/`, permitiendo que el equipo de diseño y producto interactúe con el MVP antes de la integración del backend real.
- **CI/CD:** Configuración inicial de GitHub Actions (`deploy.yml`) para automatizar el despliegue y validación del build.

### 💡 Repaso técnico: Estabilización de Next.js 15 y Turbopack
La adopción de Next.js 15 permite aprovechar el nuevo modelo de caché y el motor Turbopack. Durante el desarrollo, se observó una mejora significativa en los tiempos de recarga (HMR), lo que facilita la iteración visual rápida requerida por el rol de Senior Product Designer. Sin embargo, esto requiere un manejo cuidadoso de las dependencias que aún dependen de APIs de Webpack.

### Errores y Soluciones
1. **Error de Entorno en WSL/Ubuntu:** 
   - *Problema:* Durante el setup inicial, errores de ejecución de comandos por configuraciones de permisos y dependencias de sistema.
   - *Solución:* Re-inicialización del entorno y uso de `npx` con flags de limpieza para asegurar que las dependencias se instalaran correctamente en el volumen de WSL.
2. **Runtime Error en Chat IA ("Objects are not valid as a React child"):**
   - *Problema:* Al iniciar una nueva consulta, se pasaba un objeto de evento sintético de React directamente al motor de renderizado en lugar de los datos del mensaje.
   - *Solución:* Refactorización de la función `handleNewChat` para extraer explícitamente el contenido del prompt y gestionar el estado como un array de nodos válidos.
3. **Fallas en el Build de Producción (Static Export):**
   - *Problema:* Las rutas dinámicas `[id]` causaban errores al intentar generar un sitio estático sin `generateStaticParams`.
   - *Solución:* Optimización de la configuración de exportación y ajustes en ESLint para ignorar reglas de desuso en archivos de configuración de Next.js 15, permitiendo un despliegue exitoso a GitHub Pages.

### Próximos pasos
- Finalizar la lógica contextual del `BottomNav.tsx`.
- Implementar el `middleware.ts` para seguridad de rutas.
