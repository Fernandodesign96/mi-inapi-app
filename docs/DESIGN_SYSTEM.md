# Design system: MiINAPI

**Instituto Nacional de Propiedad Industrial — Plataforma ciudadana digital**

| Metadatos | Detalle |
|-----------|---------|
| **Versión** | 2.0.0-gob |
| **Fuente visual institucional** | UI Kit v3.0.1 — Secretaría de Gobierno (Transformación Digital) |
| **Referencias** | [`docs/uikit_gob/references/`](uikit_gob/references/) · [Plan de migración](UI_MIGRATION_PLAN.md) · [PRD](PRD.md) · [Arquitectura](ARCHITECTURE.md) |
| **Stack** | Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Lucide React |
| **Estado código** | Tokens legacy (DM Sans, `#1A56DB`, frame 390 px) — migración documentada, implementación pendiente |

MiINAPI es una plataforma **gubernamental, ciudadana y mobile-first**, diseñada para transmitir **confianza institucional, claridad informativa y urgencia accionable**.

> **Enfoque de implementación:** tokens GOB en Tailwind + componentes React propios. **No** usar el Framework kit Bootstrap (`@gobdigital-cl/gob.cl`). Ver [UI_MIGRATION_PLAN.md](UI_MIGRATION_PLAN.md).

---

## Tabla de contenidos

1. [Filosofía y principios](#1-filosofía-y-principios)
2. [Color system](#2-color-system)
3. [Sistema tipográfico](#3-sistema-tipográfico)
4. [Spacing system](#4-spacing-system)
5. [Grid y layout system](#5-grid-y-layout-system)
6. [Borders, radius y elevación](#6-borders-radius-y-elevación)
7. [Motion system](#7-motion-system)
8. [Iconografía](#8-iconografía)
9. [Component library](#9-component-library)
10. [Patrones de pantalla](#10-patrones-de-pantalla)
11. [Accessibility (A11Y)](#11-accessibility-a11y)
12. [Tokens CSS (globals.css)](#12-tokens-css-globalscss)
13. [Tokens Tailwind (tailwind.config.ts)](#13-tokens-tailwind-tailwindconfigts)
14. [Component governance](#14-component-governance)
15. [Apéndices](#15-apéndices)

---

## 1. Filosofía y principios

### Misión del design system

MiINAPI debe ser la interfaz más clara que un ciudadano chileno haya visto al interactuar con el Estado. No es un producto de lujo: es una herramienta de servicio público que debe funcionar con precisión.

### Los 5 principios

| # | Principio | Descripción |
|---|-----------|-------------|
| 1 | **Urgencia visible** | El sistema semáforo comunica prioridad sin leer texto. Rojo = actuar ahora. |
| 2 | **Confianza institucional** | Tokens `GOB.COLOR.*`, Roboto Slab/Sans y grilla del UI Kit v3.0.1 refuerzan identidad oficial. |
| 3 | **Claridad sobre densidad** | Una pantalla = un objetivo principal. |
| 4 | **Acción contextual** | CTAs adaptados al trámite. Nunca genéricos. |
| 5 | **Mobile-first con grilla GOB** | Diseño base en 4 columnas; expansión a 8/12 en tablet y desktop. |

---

## 2. Color system

Valores hex de las láminas oficiales en [`docs/uikit_gob/references/`](uikit_gob/references/). Detalle extendido en [`docs/uikit_gob/references/DESIGN_SYSTEM.md`](uikit_gob/references/DESIGN_SYSTEM.md).

### 2.1 Paleta base institucional (`GOB.COLOR.PRIMARIO`)

| Variante | Hex |
|----------|-----|
| Lighten 1 | `#BFEEFF` |
| Lighten 2 | `#A1D2FF` |
| Lighten 3 | `#83B6FF` |
| Lighten 4 | `#649CFD` |
| **Base** | **`#4282E0`** |
| Darken 1 | `#0F69C4` |
| Darken 2 | `#0051A8` |
| Darken 3 | `#003B8D` |
| Darken 4 | `#002673` |
| Darken 5 | `#00135A` |

**Tokens de producto MiINAPI:**

| Token CSS | Hex | Uso |
|-----------|-----|-----|
| `--color-primary` | `#4282E0` | Botones primarios, tabs activos, links de acción |
| `--color-primary-dark` | `#0F69C4` | Hover, headers, CTAs de descarga |
| `--color-primary-foreground` | `#FFFFFF` | Texto sobre fondos primarios |

### 2.2 Accent (`GOB.COLOR.ACCENT`)

| Token CSS | Hex | Uso |
|-----------|-----|-----|
| `--color-accent` | `#FF4731` | FAB ChatIA, highlights secundarios de producto |
| `--color-accent-light` | `#FFECEF` | Fondos suaves de acento |
| `--color-accent-foreground` | `#FFFFFF` | Texto sobre acento |

> **Excepción:** el botón **ClaveÚnica** no usa accent GOB. Ver [§9.14 ClaveUnicaButton](#914-claveunicabutton).

### 2.3 Sistema semáforo INAPI (mapeado a GOB)

Patrón de producto conservado; colores alineados a estados semánticos del kit.

| Nivel | Token | Color | Fondo | Significado |
|-------|-------|-------|-------|-------------|
| Crítico | `--semaphore-danger` | `#FB3B3B` | `#FFEBEF` | Acción urgente / vencido |
| Atención | `--semaphore-warning` | `#FF5722` | `#FBE9E7` | Próximo vencimiento |
| En proceso | `--semaphore-info` | `#2196F3` | `#E3F2FD` | En revisión / informativo |
| Completado | `--semaphore-success` | `#4CAF50` | `#E8F5E9` | Finalizado / vigente |

**Regla de oro:** en Dashboard y Notificaciones, el contenido rojo aparece primero: 🔴 → 🟠 → 🔵 → 🟢.

### 2.4 Tokens neutros de UI

| Token CSS | Hex | Uso |
|-----------|-----|-----|
| `--background` | `#F9FAFB` | Fondo de pantalla |
| `--surface` | `#FFFFFF` | Cards, modales, inputs |
| `--surface-elevated` | `#F3F4F6` | Pills inactivos, fondo de inputs |
| `--foreground` | `#373737` | Texto principal (texto AA kit) |
| `--foreground-secondary` | `#555555` | Subtítulos, descripciones |
| `--foreground-muted` | `#9CA3AF` | Timestamps, placeholders |
| `--border` | `#E5E7EB` | Bordes estándar |
| `--border-strong` | `#D1D5DB` | Divisores prominentes |
| `--ring` | `#FFBE5C` | Anillo de foco (`GOB.COLOR.FOCUS`) |
| `--color-link` | `#1D70B8` | Enlaces |
| `--color-link-visited` | `#4C2C92` | Enlaces visitados |

### 2.5 Texto accesible (AA)

| Token | Hex | Uso |
|-------|-----|-----|
| Texto sobre fondos oscuros/saturados | `#FFFFFF` | Primario base, accent, semáforos base |
| Texto sobre fondos claros/pastel | `#373737` | Superficies, fondos lighten |

Referencia: `3.PNG`.

### 2.6 Estados interactivos (CTAs genéricos)

| Estado | Modificación | Duración |
|--------|-------------|----------|
| Default | `--color-primary` | — |
| Hover | `--color-primary-dark` | 150 ms |
| Active | Oscurecer + `scale(0.98)` | 100 ms |
| Focus | `ring-2 ring-[--ring]` | inmediato |
| Disabled | `opacity-40` + `cursor-not-allowed` | — |

### 2.7 Dark mode

Mejora progresiva. Priorizar tablas §2.1–2.5 como fuente de verdad; `5.PNG` solo como guía visual (hex de lámina con errores conocidos).

| Token | Light | Dark (orientativo) |
|-------|-------|-------------------|
| `--background` | `#F9FAFB` | `#0F172A` |
| `--surface` | `#FFFFFF` | `#1E293B` |
| `--foreground` | `#373737` | `#F8FAFC` |
| Semáforos | Colores base | **Sin cambio** (semánticos) |

---

## 3. Sistema tipográfico

### 3.1 Familias

| Familia | Rol | Carga |
|---------|-----|-------|
| **Roboto Slab** | Encabezados institucionales, títulos de pantalla | `next/font/google` |
| **Roboto Sans** | UI, cuerpo, botones, labels, links | `next/font/google` |
| **ui-monospace** / tabular-nums | RUT, números de solicitud | Sistema o Roboto Sans con `font-variant-numeric: tabular-nums` |

Reglas de accesibilidad del kit: párrafos ≥ 16 px; mínimo absoluto 12 px; line-height ≥ 1,5×.

### 3.2 Escala mobile-first (base MVP)

Referencia: `7.PNG` (Slab), `8.PNG` (Sans). En código normalizar **16 px = 1 rem**.

**Encabezados (Roboto Slab — mobile)**

| Estilo | Tamaño | Peso | Line-height |
|--------|--------|------|-------------|
| Heading-XL | 32 px | 400 | 1.5 |
| Heading-L | 24 px | 500 | 1.5 |
| Heading-M | 18 px | 500 | 1.5 |
| Heading-S | 16 px | 500 | 1.5 |

**UI y cuerpo (Roboto Sans — mobile)**

| Estilo | Tamaño | Peso | Uso MiINAPI |
|--------|--------|------|-------------|
| Body-M | 16 px | 400 | Cuerpo principal (`.text-body`) |
| Body-S | 14 px | 400 | Descripciones (`.text-body-sm`) |
| Body-XS | 12 px | 400 / 700 | Labels, badges (`.text-label`) |
| Body-button | 16 px | 500 | CTAs (`.text-btn`) |
| Body-Link | 16 px | 500 | Enlaces inline |

**Clases utilitarias** (mantener nombres existentes, actualizar valores):

| Clase | Mobile | Desktop (≥905 px) |
|-------|--------|-------------------|
| `.text-h1` | Slab 24 px / 500 | Slab 36 px / 500 |
| `.text-h2` | Slab 18 px / 500 | Slab 31 px / 500 |
| `.text-h3` | Sans 16 px / 500 | Sans 19 px / 500 |
| `.text-body` | Sans 16 px / 400 | Sans 16 px / 400 |
| `.text-label` | Sans 12 px / 700, uppercase, tracking-wide | igual |

### 3.3 Reglas de aplicación

- RUT y números de solicitud: tabular-nums; nunca display decorativo.
- Labels de input: UPPERCASE + `letter-spacing: 0.05em`.
- StatusBadge: UPPERCASE, 12 px, peso 700.
- CTAs genéricos: Sans 16 px / 500, sin UPPERCASE.

---

## 4. Spacing system

Escala única del kit (`11.PNG`): **4 · 8 · 12 · 16 · 24 · 36 · 48 · 64 px**.

| Token | Valor | Tailwind | Uso típico |
|-------|-------|----------|------------|
| `--space-1` | 4 px | `p-1` | Gap ícono-texto |
| `--space-2` | 8 px | `p-2` | Badges, inline |
| `--space-3` | 12 px | `p-3` | Gap entre cards en lista |
| `--space-4` | 16 px | `p-4` | Padding lateral mobile, form fields |
| `--space-6` | 24 px | `p-6` | Separación sección a sección |
| `--space-9` | 36 px | — | Separaciones intermedias |
| `--space-8` | 48 px | `p-12` | Empty states |
| `--space-10` | 64 px | `p-16` | Layout especial |

> **Eliminado respecto a v1:** paso intermedio de 20 px (no definido en kit GOB).

**Separaciones estándar:**

| Contexto | Valor |
|----------|-------|
| Margen lateral mobile (grilla) | 16 px |
| Padding interno de card | 16 px |
| Gap entre cards | 12 px |
| Altura TopBar | 56 px |
| Altura BottomNav | 64 px + safe area |
| Touch target mínimo | 44×44 px |

---

## 5. Grid y layout system

Referencia: `9.PNG`, `10.PNG`. Reemplaza el frame encapsulado de 390 px de v1.

### 5.1 Breakpoints

| Nombre | Rango | Margen | Cuerpo máx. | Columnas |
|--------|-------|--------|-------------|----------|
| Extra-small (phone) | 0–599 px | 16 px | fluido | **4** |
| Small (tablet) | 600–904 px | 32 px | fluido | **8** |
| Small (tablet wide) | 905–1239 px | auto | 840 px | **12** |
| Medium (laptop) | 1240–1439 px | 200 px | fluido | **12** |
| Large (desktop) | 1440 px+ | auto | 1040 px | **12** |

**Tailwind breakpoints:** `600px`, `905px`, `1240px`, `1440px`.

### 5.2 Contenedor GOB

```tsx
<div className="gob-container mx-auto px-4 sm:px-8 md:max-w-[840px] xl:max-w-[1040px]">
  <div className="gob-grid grid grid-cols-4 sm:grid-cols-8 md:grid-cols-12 gap-4">
    {children}
  </div>
</div>
```

### 5.3 Zonas de layout fijas

| Zona | Altura | Posición |
|------|--------|----------|
| TopBar | 56 px | `sticky top-0` |
| BottomNav | 64 px + safe-area | `fixed bottom-0`, ancho completo |
| Content | `flex-1 overflow-y-auto` | Entre TopBar y BottomNav |
| ChatIAFab | 52 px | Sobre BottomNav, esquina inferior derecha |

---

## 6. Borders, radius y elevación

Referencia: `6.PNG`.

### 6.1 Border radius (kit GOB)

| Token | Valor | Uso MiINAPI |
|-------|-------|-------------|
| `--radius-none` | 0 px | Variante ClaveÚnica opcional |
| `--radius-sm` | 4 px | Badges, ClaveÚnica default, inputs pequeños |
| `--radius-md` | 8 px | Inputs, botones CTAButton |
| `--radius-lg` | 16 px | Cards (SemaphoreCard) |
| `--radius-xl` | 24 px | Modales, ClaveÚnica pill |
| `--radius-full` | 9999 px | Filter pills, badges circulares |

### 6.2 Grosor de borde

1 px (estándar) · 2 px (focus/error inputs) · 3 px · 4 px (borde semáforo en cards)

### 6.3 Elevación

| Token | Uso |
|-------|-----|
| `--elevation-01` | Cards en lista |
| `--elevation-02` | Cards en hover |
| `--elevation-03` | Cards expandidas |
| `--elevation-04` | Bottom sheets |
| `--elevation-05` | Modales |

Calibrar valores CSS contra `6.PNG` al implementar Fase 1.

---

## 7. Motion system

Sin cambio funcional respecto a v1. Tiempos intencionados; no animación decorativa.

| Nombre | Duración | Trigger |
|--------|----------|---------|
| Micro-interaction | 100 ms | Press de botón |
| Tab switch | 150 ms | Cambio de tab |
| Card expand/collapse | 250 ms | CollapsibleCard |
| Screen transition | 200 ms | Navegación (fade) |
| Toast | 350 ms | Aparición feedback |

Respetar `prefers-reduced-motion`.

---

## 8. Iconografía

**Librería:** Lucide React (exclusiva, salvo ícono oficial ClaveÚnica).

| Contexto | Tamaño | Color |
|----------|--------|-------|
| BottomNav inactivo | 24 px | `--foreground-muted` |
| BottomNav activo | 24 px | `--color-primary` |
| Dentro de cards | 20 px | Según semáforo |
| CTA (left icon) | 18 px | `--color-primary-foreground` |

---

## 9. Component library

### 9.1 StatusBadge

Pill semáforo. Variantes con colores GOB:

| Variante | Background | Text |
|----------|------------|------|
| `danger` | `#FFEBEF` | `#FB3B3B` |
| `warning` | `#FBE9E7` | `#FF5722` |
| `info` | `#E3F2FD` | `#2196F3` |
| `success` | `#E8F5E9` | `#4CAF50` |

Tokens: 12 px / 700 / uppercase / `rounded-full` / padding `2px 10px`.

### 9.2 SemaphoreCard

- `background: var(--surface)`
- `border-radius: 16px` (`--radius-lg`)
- `border-left: 4px solid var(--semaphore-{variant})`
- `box-shadow: var(--elevation-01)`
- `padding: 16px`
- Hover: `--elevation-02`, 150 ms

### 9.3 StepperProgress

7 etapas de trámite de marca INAPI. Colores de círculo activo según urgencia semántica del semáforo. Completado: `#4CAF50`. Pendiente: `#E5E7EB`.

### 9.4 BottomNav

- Ancho completo del viewport
- Ítem activo: `--color-primary`, peso 600
- Ítem inactivo: `--foreground-muted`
- Label: 10 px (mínimo legible; preferir 12 px en revisión a11y)
- Contextual por `userState` (sin cambio de lógica)

### 9.5 TopBar

- Height 56 px, fondo `--surface`, borde inferior `--border`
- Wordmark "MiINAPI": Roboto Sans 16 px / 500
- Padding horizontal: 16 px (alineado a margen grilla mobile)

### 9.6 FilterPills

- Activo: `bg-primary text-white`
- Inactivo: `bg-surface-elevated text-foreground-secondary border border-border`
- `rounded-full`, padding `6px 16px`, gap 8 px

### 9.7 CollapsibleCard

Extiende SemaphoreCard. Transición altura 250 ms, chevron rota 180°.

### 9.8 SkeletonCard

`border-radius: 16px`. Shimmer sobre neutros `--surface-elevated`.

### 9.9 CTAButton

Botón de acción de producto MiINAPI. **No usar para ClaveÚnica.**

| Variante | Background | Text |
|----------|------------|------|
| `primary` | `#4282E0` | white |
| `primary-dark` | `#0F69C4` | white |
| `danger` | `#FB3B3B` | white |
| `warning` | `#FF5722` | white |
| `info` | `#2196F3` | white |
| `success` | `#4CAF50` | white |
| `outline` | transparent | `#4282E0` |
| `ghost` | transparent | `#373737` |

- `border-radius: 8px` (`--radius-md`) — ya no pill por defecto
- Altura md: 48 px; tipografía Body-button 16 px / 500
- Focus: `ring-2 ring-[--ring]`

### 9.10 FormInput

- Label: 12 px / 700 / uppercase / `#555555`
- Input: height 52 px, `border-radius: 8px`, fondo `--surface-elevated`
- Focus: `ring-2 ring-[--ring]`; error: borde `#FB3B3B`

### 9.11 Toast

Posición sobre BottomNav. Radius 8 px. Colores semánticos GOB en fondos lighten.

### 9.12 EmptyState

Padding 48 px 24 px. Ícono wrapper 64 px circle en `--surface-elevated`.

### 9.13 NotificationTable

Radius 8 px. Header uppercase 12 px. Valores numéricos con tabular-nums.

### 9.14 ClaveUnicaButton

**Componente dedicado.** Referencia: [`claveunica-button-states.PNG`](uikit_gob/references/claveunica-button-states.PNG).

**Anatomía:**
- Ícono oficial ClaveÚnica (SVG, no Lucide)
- Texto: **Clave** (regular) + **Única** (bold), sin espacio
- Foreground: `#FFFFFF` en estados activos

**Props:**

```typescript
interface ClaveUnicaButtonProps {
  onClick?: () => void
  isLoading?: boolean
  isDisabled?: boolean
  fullWidth?: boolean
  radius?: 'sm' | 'none' | 'pill'  // 4px | 0px | 24px — default: 'sm'
  className?: string
}
```

**Estados:**

| Estado | Visual | Token |
|--------|--------|-------|
| Default | Fondo azul medio | `--claveunica-bg` (~`#0F69C4`) |
| Hover | Azul oscuro | `--claveunica-bg-hover` |
| Active | Default + borde grueso ámbar | `--claveunica-border-active` `#FFBE5C` |
| Focus | Fondo azul marino | `--claveunica-bg-focus` (~`#002673`) |
| Disabled | Azul-gris desaturado | `--claveunica-bg-disabled` |

**Casos prohibidos:**
- No usar `CTAButton` con variant `outline` para ClaveÚnica
- No usar ícono Lucide `Fingerprint`
- No aplicar `--color-accent` GOB (`#FF4731`)

### 9.15 ChatIAFab

- Fondo: `--color-accent` (`#FF4731`)
- Sombra con tinte accent GOB
- Posición: fixed, relativo al viewport (no al frame 390 px)

---

## 10. Patrones de pantalla

### Login (sin BottomNav)

```
TopBar
└── Contenedor GOB (4 col mobile)
    ├── Hero / logo
    ├── FormInput (RUT + contraseña)
    ├── CTAButton primary ("Ingresar")
    ├── Divider
    ├── ClaveUnicaButton  ← componente dedicado
    └── Footer institucional
```

### Lista (Dashboard, Notificaciones)

TopBar → FilterPills → SemaphoreCards ordenadas por semáforo → BottomNav.

### Recursos (Certificados, Biblioteca)

TopBar → búsqueda → FilterPills → grid/lista en 4/8/12 columnas → BottomNav.

---

## 11. Accessibility (A11Y)

WCAG 2.1 AA mínimo.

| Área | Regla |
|------|-------|
| Contraste | Combinaciones §2.5 (`#FFFFFF` / `#373737`) |
| Touch targets | Botones ≥ 44 px; chips ≥ 29 px |
| Focus | `ring-2 ring-[#FFBE5C]`; ClaveÚnica: estado Focus del PNG |
| Semáforo | Color + ícono + texto (doble codificación) |
| Animaciones | `prefers-reduced-motion` |
| Formularios | `htmlFor`, `aria-describedby` en errores |

---

## 12. Tokens CSS (globals.css)

Bloque objetivo post-migración (Fase 1):

```css
:root {
  /* Institucional GOB */
  --color-primary:            #4282E0;
  --color-primary-dark:       #0F69C4;
  --color-primary-foreground: #FFFFFF;
  --color-accent:             #FF4731;
  --color-accent-light:       #FFECEF;

  /* Semáforo INAPI → GOB */
  --semaphore-danger:         #FB3B3B;
  --semaphore-danger-bg:      #FFEBEF;
  --semaphore-warning:        #FF5722;
  --semaphore-warning-bg:     #FBE9E7;
  --semaphore-info:           #2196F3;
  --semaphore-info-bg:        #E3F2FD;
  --semaphore-success:        #4CAF50;
  --semaphore-success-bg:    #E8F5E9;

  /* Neutros */
  --background:               #F9FAFB;
  --surface:                  #FFFFFF;
  --surface-elevated:         #F3F4F6;
  --foreground:               #373737;
  --foreground-secondary:     #555555;
  --foreground-muted:         #9CA3AF;
  --border:                   #E5E7EB;
  --ring:                     #FFBE5C;
  --color-link:               #1D70B8;

  /* ClaveÚnica (excepción) */
  --claveunica-bg:            #0F69C4;
  --claveunica-bg-hover:      #0051A8;
  --claveunica-bg-focus:      #002673;
  --claveunica-bg-disabled:   #A1D2FF;
  --claveunica-border-active: #FFBE5C;
  --claveunica-fg:            #FFFFFF;
  --claveunica-radius:        4px;

  /* Tipografía */
  --font-slab:                'Roboto Slab', serif;
  --font-sans:                'Roboto', system-ui, sans-serif;

  /* Radius GOB */
  --radius-sm:  4px;
  --radius-md:  8px;
  --radius-lg:  16px;
  --radius-xl:  24px;

  /* Layout */
  --topbar-height:    56px;
  --bottomnav-height: 64px;
}
```

---

## 13. Tokens Tailwind (tailwind.config.ts)

Extender con colores semánticos (`primary`, `accent`, `danger`, `warning`, `info`, `success`, `claveunica`), breakpoints GOB (`600/905/1240/1440`), spacing kit, `fontFamily.slab` / `fontFamily.sans`, `borderRadius` GOB, `boxShadow` elevation 01–05.

Ver [UI_MIGRATION_PLAN.md](UI_MIGRATION_PLAN.md) Fase 1 para implementación.

---

## 14. Component governance

Checklist obligatorio por componente nuevo: nombre, props tipadas, variantes, estados, tokens, a11y, casos prohibidos, mock de datos.

> Si un componente no está en esta librería, no se crea ad-hoc.

**Versionado:** v0.x experimental (MVP) · v1.x estable · v2.x+ extended.

---

## 15. Apéndices

### 15.1 Referencias visuales PNG

| Lámina | Archivo |
|--------|---------|
| Colores básicos | [`1.PNG`](uikit_gob/references/1.PNG) |
| Colores / estados | [`2.PNG`](uikit_gob/references/2.PNG) |
| Texto AA | [`3.PNG`](uikit_gob/references/3.PNG) |
| Data visualization | [`4.PNG`](uikit_gob/references/4.PNG) |
| Tema claro / oscuro | [`5.PNG`](uikit_gob/references/5.PNG) |
| Tokens / efectos | [`6.PNG`](uikit_gob/references/6.PNG) |
| Roboto Slab | [`7.PNG`](uikit_gob/references/7.PNG) |
| Roboto Sans | [`8.PNG`](uikit_gob/references/8.PNG) |
| Grilla (tabla) | [`9.PNG`](uikit_gob/references/9.PNG) |
| Grilla (diagramas) | [`10.PNG`](uikit_gob/references/10.PNG) |
| Espaciado | [`11.PNG`](uikit_gob/references/11.PNG) |
| **Botón ClaveÚnica** | [`claveunica-button-states.PNG`](uikit_gob/references/claveunica-button-states.PNG) |

### 15.2 Mapa flujos → componentes

| Flujo | Componentes |
|-------|---------------|
| Login / Auth | `FormInput`, `CTAButton`, `ClaveUnicaButton`, `TopBar` |
| Dashboard | `FilterPills`, `SemaphoreCard`, `StepperProgress`, `StatusBadge` |
| Notificaciones | `CollapsibleCard`, `NotificationTable`, `Toast` |
| Todos | `TopBar`, `BottomNav`, `SkeletonCard`, `EmptyState`, `ChatIAFab` |

### 15.3 Pendientes v2.1

- Escala hex completa `GOB.COLOR.GRIS`
- Valores CSS numéricos exactos Elevation-01…05
- Muestreo fino de hex ClaveÚnica desde PNG oficial

---

*Documento actualizado el 2026-06-10. Versión: v2.0.0-gob. Implementación en código: ver [UI_MIGRATION_PLAN.md](UI_MIGRATION_PLAN.md).*
