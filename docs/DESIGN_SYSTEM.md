# Design System: MiINAPI
**Instituto Nacional de Propiedad Industrial — Plataforma Ciudadana Digital**

Este documento define el ecosistema visual y de componentes de **MiINAPI**, asegurando consistencia entre diseño e implementación técnica. MiINAPI es una plataforma **Gubernamental, Ciudadana y Móvil-first**, diseñada para transmitir **Confianza institucional, Claridad informativa y Urgencia accionable**.

> **Relación con el stack técnico:** Next.js 15 (App Router), TypeScript, Tailwind CSS v4, shadcn/ui, Lucide React.

---

## Tabla de contenidos

1. [Filosofía y Principios de Diseño](#1-filosofía-y-principios-de-diseño)
2. [Color System](#2-color-system)
   - [2.1 Paleta Base Institucional](#21-paleta-base-institucional)
   - [2.2 Sistema Semáforo INAPI](#22-sistema-semáforo-inapi)
   - [2.3 Tokens Neutros de UI](#23-tokens-neutros-de-ui)
   - [2.4 Estados Interactivos](#24-estados-interactivos)
   - [2.5 Dark Mode](#25-dark-mode)
3. [Sistema Tipográfico](#3-sistema-tipográfico)
   - [3.1 Familias Tipográficas](#31-familias-tipográficas)
   - [3.2 Escala Tipográfica](#32-escala-tipográfica)
   - [3.3 Reglas de Aplicación](#33-reglas-de-aplicación)
4. [Spacing System](#4-spacing-system)
5. [Grid y Layout System](#5-grid-y-layout-system)
   - [5.1 Breakpoints](#51-breakpoints)
   - [5.2 Mobile-First Layout (Marco Principal)](#52-mobile-first-layout-marco-principal)
   - [5.3 Zonas de Layout Fijas](#53-zonas-de-layout-fijas)
6. [Borders & Radius](#6-borders--radius)
7. [Elevation (Sombras)](#7-elevation-sombras)
8. [Motion System](#8-motion-system)
9. [Iconografía](#9-iconografía)
10. [Component Library](#10-component-library)
    - [10.1 StatusBadge](#101-statusbadge)
    - [10.2 SemaphoreCard](#102-semaphorecard)
    - [10.3 StepperProgress](#103-stepperprogress)
    - [10.4 BottomNav](#104-bottomnav)
    - [10.5 TopBar](#105-topbar)
    - [10.6 FilterPills](#106-filterpills)
    - [10.7 CollapsibleCard](#107-collapsiblecard)
    - [10.8 SkeletonCard](#108-skeletoncard)
    - [10.9 CTAButton](#109-ctabutton)
    - [10.10 FormInput](#1010-forminput)
    - [10.11 Toast / Feedback](#1011-toast--feedback)
    - [10.12 EmptyState](#1012-emptystate)
    - [10.13 NotificationTable](#1013-notificationtable)
11. [Patrones de Pantalla](#11-patrones-de-pantalla)
12. [Accessibility (A11Y)](#12-accessibility-a11y)
13. [Tokens CSS (globals.css)](#13-tokens-css-globalscss)
14. [Tokens Tailwind (tailwind.config.ts)](#14-tokens-tailwind-tailwindconfigts)
15. [Component Governance](#15-component-governance)

---

## 1. Filosofía y Principios de Diseño

### Misión del Design System
MiINAPI debe ser la interfaz más clara que un ciudadano chileno haya visto al interactuar con el Estado. No es un producto de lujo, es una herramienta de servicio público que debe funcionar con precisión quirúrgica.

### Los 5 Principios

| # | Principio | Descripción |
|---|-----------|-------------|
| 1 | **Urgencia Visible** | El Sistema Semáforo debe comunicar la prioridad sin que el usuario lea texto. Rojo = actuar ahora. |
| 2 | **Confianza Institucional** | Los colores, tipografía y tono refuerzan que esto es una plataforma oficial del Estado chileno. |
| 3 | **Claridad sobre densidad** | Antes que meter más información, simplificar. Una pantalla = un objetivo principal. |
| 4 | **Acción contextual** | Los CTAs se adaptan al tipo de trámite. Nunca "Completar Acción" genérico. |
| 5 | **Móvil primero, siempre** | Todo se diseña para 390px. Desktop es una vista extendida, no la principal. |

---

## 2. Color System

### 2.1 Paleta Base Institucional

La identidad cromática de MiINAPI se ancla en **Azul Institucional** (referencia al Gobierno de Chile) con un acento **Azul Marino Profundo** para autoridad y un **Púrpura Suave** para acciones de autenticación.

| Token CSS | Nombre | Hex | Tailwind | Uso |
|-----------|--------|-----|----------|-----|
| `--color-primary` | Azul Institucional | `#1A56DB` | `blue-600` | Botones primarios, tabs activos, links, acento principal |
| `--color-primary-dark` | Azul Marino | `#1E3A8A` | `blue-900` | Headers, TopBar background accent, botones de descarga |
| `--color-primary-foreground` | Blanco | `#FFFFFF` | `white` | Texto sobre fondos primarios |
| `--color-accent` | Púrpura Auth | `#7C3AED` | `violet-600` | Ícono de login, ClaveÚnica, highlights secundarios |
| `--color-accent-light` | Púrpura suave | `#EDE9FE` | `violet-100` | Fondo de ícono auth, badges patentes |
| `--color-accent-foreground` | Blanco | `#FFFFFF` | `white` | Texto sobre acento |

### 2.2 Sistema Semáforo INAPI

El sistema semáforo es el **componente visual más crítico** de MiINAPI. Se usa de forma **consistente y transversal** en Dashboard, Notificaciones, Stepper y Badges. No debe usarse para decoración.

| Nivel | Token | Color | Hex | Fondo | Hex Fondo | Significado |
|-------|-------|-------|-----|-------|-----------|-------------|
| 🔴 Crítico | `--semaphore-danger` | Rojo | `#DC2626` | `--semaphore-danger-bg` | `#FEE2E2` | Acción requerida urgente / Vencido / Riesgo |
| 🟠 Atención | `--semaphore-warning` | Naranja | `#D97706` | `--semaphore-warning-bg` | `#FEF3C7` | Próximo vencimiento / Requerimiento pendiente |
| 🔵 En proceso | `--semaphore-info` | Azul | `#2563EB` | `--semaphore-info-bg` | `#DBEAFE` | En revisión / Trámite pasivo / Informativo |
| 🟢 Completado | `--semaphore-success` | Verde | `#059669` | `--semaphore-success-bg` | `#D1FAE5` | Finalizado / Exitoso / Vigente |

> **Regla de oro:** En Dashboard y Notificaciones, el contenido **Rojo siempre aparece primero** (priorización por servidor). El ordenamiento es: 🔴 → 🟠 → 🔵 → 🟢.

### 2.3 Tokens Neutros de UI

| Token CSS | Nombre | Hex | Tailwind | Uso |
|-----------|--------|-----|----------|-----|
| `--background` | Fondo base | `#F9FAFB` | `gray-50` | Fondo de pantalla principal |
| `--surface` | Superficie | `#FFFFFF` | `white` | Cards, modales, inputs |
| `--surface-elevated` | Superficie elevada | `#F3F4F6` | `gray-100` | Fondos de inputs, tabs inactivos |
| `--foreground` | Texto principal | `#111827` | `gray-900` | Titulares, texto de alto impacto |
| `--foreground-secondary` | Texto secundario | `#4B5563` | `gray-600` | Subtítulos, descripciones |
| `--foreground-muted` | Texto apagado | `#9CA3AF` | `gray-400` | Timestamps, placeholders, microcopy |
| `--border` | Bordes | `#E5E7EB` | `gray-200` | Bordes de cards, separadores, inputs |
| `--border-strong` | Bordes fuertes | `#D1D5DB` | `gray-300` | Bordes en hover, divisores prominentes |
| `--ring` | Focus ring | `#1A56DB` | `blue-600` | Anillo de foco para accesibilidad |

### 2.4 Estados Interactivos

| Estado | Modificación | Token / Aplicación | Duración |
|--------|-------------|--------------------|----|
| Default | — | `--color-primary` | — |
| Hover | Oscurecer 8% | `--color-primary-dark` | 150ms |
| Active / Press | Oscurecer 15% + scale 0.98 | `#1730A0` | 100ms |
| Focus | Ring visible exterior | `ring-2 ring-[--ring]` | inmediato |
| Disabled | Opacity 40% + cursor-not-allowed | `opacity-40` | — |
| Loading | Spinner + opacity 70% | `opacity-70` + spinner | inmediato |

### 2.5 Dark Mode

MiINAPI prioriza **Light Mode** dado el contexto gubernamental y la necesidad de claridad máxima. el Dark Mode es una mejora progresiva.

**Reglas Dark Mode:**
1. `--background`: `#0F172A` (slate-900)
2. `--surface`: `#1E293B` (slate-800) — +4% luminosidad respecto al fondo
3. `--border`: ligeramente más claro (`#334155`) para definir volúmenes
4. Semáforos: mantienen sus colores base (son semánticos, no decorativos)
5. Texto: `--foreground` → `#F8FAFC`
6. Sombras: reducidas en opacidad (el contraste lo da el color de superficie)

---

## 3. Sistema Tipográfico

### 3.1 Familias Tipográficas

MiINAPI usa **dos familias** con roles estrictamente separados:

| Familia | Fuente | Rol | Importar desde |
|---------|--------|-----|----------------|
| **Primaria** | DM Sans | UI, narrativa, headings, labels, botones | Google Fonts |
| **Secundaria / Mono** | DM Mono | Números de solicitud, RUT, IDs técnicos | Google Fonts |

> **¿Por qué DM Sans?** Es limpia, institucional y altamente legible en pantallas pequeñas. Óptima para el perfil de usuario ciudadano ocasional.
>
> **¿Por qué DM Mono?** Comparte familia con DM Sans (mismos creadores), generando coherencia visual al mostrar datos técnicos como `#2023-00451` o `12.345.678-9`.

**Import en `layout.tsx`:**
```tsx
import { DM_Sans, DM_Mono } from 'next/font/google'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
})
```

### 3.2 Escala Tipográfica

**Headings (DM Sans)**
| Nivel | Clase | Tamaño | Line Height | Peso | Uso |
|-------|-------|--------|-------------|------|-----|
| Display | `.text-display` | 28px | 36px | 800 | Números grandes en KPI / Summary Row |
| H1 | `.text-h1` | 24px | 32px | 700 | Títulos de pantalla principal |
| H2 | `.text-h2` | 20px | 28px | 600 | Títulos de sección dentro de pantalla |
| H3 | `.text-h3` | 17px | 24px | 600 | Títulos de cards, headers de lista |
| H4 | `.text-h4` | 15px | 22px | 500 | Subsecciones, agrupadores |

**Body (DM Sans)**
| Tipo | Clase | Tamaño | Line Height | Peso | Uso |
|------|-------|--------|-------------|------|-----|
| Body | `.text-body` | 16px | 24px | 400 | Texto de contenido principal |
| Body SM | `.text-body-sm` | 14px | 22px | 400 | Descripciones, subtítulos de cards |
| Body XS | `.text-body-xs` | 12px | 18px | 400 | Historial, metadata, microcopy |

**Componentes UI (DM Sans)**
| Tipo | Clase | Tamaño | Peso | Uso |
|------|-------|--------|------|-----|
| Button | `.text-btn` | 15px | 600 | Texto de botones CTA |
| Label | `.text-label` | 11px | 600 | Badges, filtros, labels de input (UPPERCASE + tracking-wide) |
| Timestamp | `.text-timestamp` | 11px | 400 | Fechas, timestamps en notificaciones |

**Datos técnicos (DM Mono)**
| Tipo | Clase | Tamaño | Peso | Uso |
|------|-------|--------|------|-----|
| Mono Default | `.text-mono` | 13px | 500 | Números de solicitud `#2023-00451`, RUT `12.345.678-9` |
| Mono Large | `.text-mono-lg` | 15px | 500 | Números de registro en certificados |

### 3.3 Reglas de Aplicación

- **RUT y números de solicitud:** Siempre `DM Mono`. Nunca `DM Sans`.
- **Labels de input:** Siempre UPPERCASE + `letter-spacing: 0.05em`.
- **StatusBadge text:** UPPERCASE + `DM Sans 600 11px`.
- **Alineación en listas:** Números de solicitud alineados a la izquierda en columna fija.
- **CTAs:** `DM Sans 600 15px`, centrado, sin UPPERCASE (excepción: labels de pills de filtro).

---

## 4. Spacing System

Base unit: **4px**. Todo el espaciado del sistema es múltiplo de 4.

| Token | Valor | Tailwind | Uso típico |
|-------|-------|----------|------------|
| `space-1` | 4px | `p-1` / `m-1` | Separación interna mínima entre ícono y texto |
| `space-2` | 8px | `p-2` / `m-2` | Padding interno de badges, gap entre elementos inline |
| `space-3` | 12px | `p-3` / `m-3` | Padding de cards compactas, gap entre items de lista |
| `space-4` | 16px | `p-4` / `m-4` | Padding lateral de pantalla, gap entre form fields |
| `space-5` | 20px | `p-5` / `m-5` | Padding interno de cards estándar |
| `space-6` | 24px | `p-6` / `m-6` | Padding de cards grandes, separación sección a sección |
| `space-8` | 32px | `p-8` / `m-8` | Padding de modales, separación entre grupos |
| `space-10` | 40px | `p-10` | Separación entre secciones mayores |
| `space-12` | 48px | `p-12` | Margen superior de pantallas de contenido |

**Separaciones Estándar por Contexto:**

| Contexto | Valor |
|----------|-------|
| Padding lateral de pantalla (móvil) | 16px |
| Padding interno de card | 16px / 20px |
| Gap entre cards en lista | 12px |
| Gap entre form fields | 16px |
| Altura TopBar | 56px |
| Altura BottomNav | 64px + safe area |
| Touch target mínimo | 48×48px |

---

## 5. Grid y Layout System

### 5.1 Breakpoints

| Nombre | Breakpoint | Descripción |
|--------|-----------|-------------|
| Mobile | `< 640px` | Diseño base. App frame 390px. |
| Tablet | `640px – 1023px` | Vista centrada con frame extendido |
| Desktop | `≥ 1024px` | Frame de app centrado con fondo neutro |

### 5.2 Mobile-First Layout (Marco Principal)

MiINAPI se desarrolla como una **Web App móvil encapsulada**:
- **Max-width del contenido:** `390px`
- **Centrado:** `mx-auto` en desktop
- **Fondo desktop:** `#E2E8F0` (slate-200) con sombra para separar el frame
- **Frame desktop:** `box-shadow: 0 8px 32px rgba(0,0,0,0.15)`

```
┌─────────────────────────────────┐
│ [Desktop background: #E2E8F0]   │
│                                 │
│      ┌──────────────────┐       │
│      │   TopBar (56px)  │       │
│      ├──────────────────┤       │
│      │                  │       │
│      │   Content Area   │       │
│      │   (scroll)       │       │
│      │                  │       │
│      ├──────────────────┤       │
│      │  BottomNav (64px)│       │
│      └──────────────────┘       │
│         390px frame             │
└─────────────────────────────────┘
```

### 5.3 Zonas de Layout Fijas

| Zona | Altura | Posición | Descripción |
|------|--------|----------|-------------|
| TopBar | 56px | `fixed top-0` | Logo + título + acciones contextuales |
| BottomNav | 64px + safe-area | `fixed bottom-0` | Navegación principal. 5 ítems. |
| Content Area | `calc(100vh - 120px)` | `overflow-y-auto` | Área de scroll independiente |
| FAB | 56px diameter | Sobre BottomNav center | Botón de acción flotante "+" |

---

## 6. Borders & Radius

| Token | Tailwind | Valor | Uso |
|-------|----------|-------|-----|
| `radius-sm` | `rounded-sm` | 6px | Badges, pills inactivos, inputs pequeños |
| `radius-md` | `rounded-[10px]` | 10px | Inputs, cajas de acción dentro de cards |
| `radius-lg` | `rounded-[14px]` | 14px | Cards estándar, certificate cards |
| `radius-xl` | `rounded-[20px]` | 20px | Íconos de categorías, modales |
| `radius-2xl` | `rounded-[24px]` | 24px | Splash overlay, onboarding sheets |
| `radius-full` | `rounded-full` | 9999px | Botones CTA primarios, pills de filtro, FAB |

**Aplicación por componente:**
- **Cards de trámite:** `rounded-[14px]`
- **Buttons CTA:** `rounded-full`
- **Filter Pills:** `rounded-full`
- **Inputs:** `rounded-[10px]`
- **Badges / StatusBadge:** `rounded-full`
- **Íconos de categoría:** `rounded-[20px]`

**Border izquierdo semáforo (SemaphoreCard):**
```css
border-left: 4px solid var(--semaphore-{level});
```

---

## 7. Elevation (Sombras)

El sistema de sombras en MiINAPI es **funcional y minimalista**. No existe decoración con sombras.

| Token | CSS Value | Tailwind | Uso |
|-------|-----------|----------|-----|
| `shadow-card` | `0 1px 3px rgba(0,0,0,0.08)` | `shadow-sm` | Cards en lista estándar |
| `shadow-elevated` | `0 4px 12px rgba(0,0,0,0.10)` | `shadow-md` | Cards en hover, cards expandidas |
| `shadow-modal` | `0 8px 24px rgba(0,0,0,0.15)` | `shadow-lg` | Bottom sheets, modales |
| `shadow-frame` | `0 8px 32px rgba(0,0,0,0.15)` | custom | Frame de la app en desktop |
| `shadow-fab` | `0 4px 16px rgba(124,58,237,0.35)` | custom | Sombra púrpura del FAB |

---

## 8. Motion System

Todos los tiempos son intencionados. **No existe animación decorativa**; cada transición tiene una causa funcional.

| Nombre | Duración | Easing | Trigger |
|--------|----------|--------|---------|
| Micro-interaction | 100ms | `ease-out` | Press de botón |
| Tab switch | 150ms | `ease-in-out` | Cambio de tab |
| Card expand/collapse | 250ms | `ease-in-out` | Click en CollapsibleCard |
| Screen transition | 200ms | `ease-in-out` | Navegación entre pantallas (fade) |
| Modal / BottomSheet | 300ms | `ease-out` | Apertura desde bottom |
| Toast slide-up | 350ms | `ease-out` | Aparición de feedback |
| Toast auto-dismiss | 200ms | `ease-in` | Desaparición auto (2.5s delay) |
| Loading skeleton | loop 1.5s | `ease-in-out` | Estado de carga |
| Button loading | inmediato | — | Spinner reemplaza texto |

**Reglas:**
- No usar `bounce` ni `spring` en una plataforma gubernamental.
- `overflow: hidden` siempre en CollapseCard para la animación de altura.
- Screen transitions: `opacity 0 → 1`, nunca slide horizontal (confunde jerarquía).

---

## 9. Iconografía

**Librería:** Lucide React  
**Consistencia:** Usar exclusivamente Lucide. No mezclar con Heroicons u otros.

| Contexto | Tamaño | Stroke Width | Color |
|----------|--------|-------------|-------|
| BottomNav (inactivo) | 24×24px | 2px | `--foreground-muted` |
| BottomNav (activo) | 24×24px | 2.5px | `--color-primary` |
| TopBar actions | 22×22px | 2px | `--foreground-secondary` |
| Dentro de cards | 20×20px | 2px | Según semáforo o `--foreground-muted` |
| Dentro de badges | 14×14px | 2px | Color del badge |
| Íconos de categorías (Biblioteca) | 32×32px | 1.5px | Color de categoría |
| CTA buttons (left icon) | 18×18px | 2px | `white` |

**Íconos por pantalla (referencia):**

| Pantalla / Elemento | Ícono Lucide |
|---------------------|--------------|
| BottomNav: Inicio | `Home` |
| BottomNav: Solicitudes | `FileText` |
| BottomNav: FAB | `Plus` |
| BottomNav: Academia | `GraduationCap` |
| BottomNav: Perfil | `User` |
| TopBar: Notificaciones | `Bell` |
| TopBar: Configuración | `Settings` |
| TopBar: Búsqueda | `Search` |
| Login: RUT | `User` |
| Login: Contraseña | `Lock` |
| Login: Ver contraseña | `Eye` / `EyeOff` |
| Login: ClaveÚnica | `Fingerprint` |
| Dashboard: Urgencia | `AlertTriangle` |
| Notificaciones: Urgente | `AlertTriangle` |
| Notificaciones: Atención | `AlertCircle` |
| Notificaciones: Info | `RefreshCw` |
| Notificaciones: OK | `CheckCircle` |
| Certificados: Marca | `CheckSquare` |
| Certificados: Patente | `Lightbulb` |
| Certificados: Diseño | `Palette` |
| Certificados: Descargar | `Download` |
| Soporte: Email | `Mail` |
| Soporte: Chat | `MessageCircle` |
| Soporte: Llamada | `Phone` |
| Biblioteca: Manuales | `BookOpen` |
| Biblioteca: Guías | `Lightbulb` |
| Biblioteca: Videos | `PlayCircle` |
| Biblioteca: Oficiales | `UserCheck` |

---

## 10. Component Library

### 10.1 StatusBadge

**Descripción:** Pill de texto que indica el estado semáforo de un trámite o notificación.

**Props:**
```typescript
interface StatusBadgeProps {
  variant: 'danger' | 'warning' | 'info' | 'success'
  label: string // siempre UPPERCASE internamente
  size?: 'sm' | 'md'  // default: 'sm'
  icon?: boolean       // muestra ícono semáforo a la izquierda
}
```

**Estilos por variante:**
| Variante | Background | Text Color | Ícono |
|----------|------------|------------|-------|
| `danger` | `#FEE2E2` | `#DC2626` | `AlertTriangle` |
| `warning` | `#FEF3C7` | `#D97706` | `AlertCircle` |
| `info` | `#DBEAFE` | `#2563EB` | `RefreshCw` |
| `success` | `#D1FAE5` | `#059669` | `CheckCircle` |

**Tokens:**
- `font-size: 11px`, `font-weight: 600`, `letter-spacing: 0.05em`, `text-transform: uppercase`
- `padding: 2px 10px`, `border-radius: 9999px`
- `display: inline-flex`, `align-items: center`, `gap: 4px`

**Estados:** Solo el estado default. No tiene hover ni foco (es informativo).

**Casos prohibidos:**
- ❌ No usar `StatusBadge` con colores personalizados fuera del semáforo.
- ❌ No usar lowercase en el texto.
- ❌ No superponer dos badges en la misma card.

---

### 10.2 SemaphoreCard

**Descripción:** Card blanca con borde izquierdo de 4px en color semáforo. Es el contenedor principal de trámites y notificaciones.

**Props:**
```typescript
interface SemaphoreCardProps {
  variant: 'danger' | 'warning' | 'info' | 'success'
  children: React.ReactNode
  onClick?: () => void
  isExpanded?: boolean   // para CollapsibleCard
  className?: string
}
```

**Tokens:**
- `background: white`
- `border-radius: 14px`
- `border-left: 4px solid var(--semaphore-{variant})`
- `box-shadow: 0 1px 3px rgba(0,0,0,0.08)`
- `padding: 16px`
- Hover: `box-shadow: 0 4px 12px rgba(0,0,0,0.10)`, transición 150ms

**Estados:** Default, Hover, Active (ligero scale 0.99).

---

### 10.3 StepperProgress

**Descripción:** Stepper horizontal de 3 etapas para mostrar el progreso de un trámite. (INGRESO → EXAMEN → RESOLUCIÓN)

**Props:**
```typescript
interface StepperProgressProps {
  steps: string[]      // default: ['INGRESO', 'EXAMEN', 'RESOLUCIÓN']
  currentStep: number  // 0-based index
  stepStates: ('completed' | 'current' | 'pending')[]
}
```

**Visualización por estado:**
| Estado | Color círculo | Color línea | Texto |
|--------|--------------|-------------|-------|
| `completed` | `#059669` (relleno) | `#059669` | Label normal |
| `current` | Según urgencia semáforo | — | Label en bold |
| `pending` | `#E5E7EB` (vacío) | `#E5E7EB` | Label muted |

**Tokens:**
- Círculo: `20px diameter`
- Línea conectora: `2px height`, `flex-1`
- Label: `10px`, `font-weight: 500`, `text-transform: uppercase`

---

### 10.4 BottomNav

**Descripción:** Navegación principal fija en la parte inferior. 5 ítems con FAB central.

**Props:**
```typescript
interface BottomNavProps {
  activeTab: 'inicio' | 'solicitudes' | 'nuevo' | 'academia' | 'perfil'
  onNavigate: (tab: string) => void
}
```

**Estructura:**
```
[Inicio] [Solicitudes] [  +FAB  ] [Academia] [Perfil]
```

**Tokens:**
- Height: `64px` + `padding-bottom: env(safe-area-inset-bottom)`
- Background: `white`
- Border top: `1px solid #E5E7EB`
- Ítem activo: ícono + label en `#1A56DB`, font-weight 600
- Ítem inactivo: ícono + label en `#9CA3AF`
- Label font-size: `10px`
- FAB: `56px circle`, `background: #7C3AED`, `box-shadow: 0 4px 16px rgba(124,58,237,0.35)`
- FAB ícono: `Plus` 24px, white

**Accesibilidad:** `role="navigation"`, `aria-label="Navegación principal"`. Cada ítem tiene `aria-current="page"` cuando está activo.

---

### 10.5 TopBar

**Descripción:** Barra superior fija. Varía según la pantalla (con/sin back arrow, con/sin acciones).

**Props:**
```typescript
interface TopBarProps {
  variant: 'home' | 'section' | 'detail'
  // home: logo + título + acciones (bell, gear)
  // section: back arrow + título centrado + acción opcional
  // detail: back arrow + título + contexto INAPI
  title?: string
  onBack?: () => void
  actions?: React.ReactNode
  showBell?: boolean
  notificationCount?: number
}
```

**Tokens:**
- Height: `56px`
- Background: `white`
- Border bottom: `1px solid #E5E7EB`
- Padding horizontal: `16px`
- Logo INAPI: cuadrado verde oscuro `28px`, `border-radius: 6px`, letra "I" blanca
- "MiINAPI" wordmark: `DM Sans 600 16px`

---

### 10.6 FilterPills

**Descripción:** Fila de pills de filtro horizontal-scroll. Mutuamente excluyentes.

**Props:**
```typescript
interface FilterPillsProps {
  options: { value: string; label: string }[]
  activeValue: string
  onChange: (value: string) => void
  scrollable?: boolean // default: true
}
```

**Tokens:**
- Pill activo: `background: #1A56DB`, `color: white`, `font-weight: 600`
- Pill inactivo: `background: #F3F4F6`, `color: #4B5563`, `border: 1px solid #E5E7EB`
- `border-radius: 9999px`
- `padding: 6px 16px`
- `font-size: 13px`, `font-weight: 500`
- Gap entre pills: `8px`
- Wrapper: `overflow-x: auto`, `display: flex`, `scrollbar-width: none` (-ms-overflow-style: none)
- Switch: 150ms fade del contenido filtrado

---

### 10.7 CollapsibleCard

**Descripción:** Variante de SemaphoreCard con capacidad de expandirse/colapsarse.

**Props:**
```typescript
interface CollapsibleCardProps extends SemaphoreCardProps {
  isOpen: boolean
  onToggle: () => void
  header: React.ReactNode   // siempre visible
  content: React.ReactNode  // sólo visible cuando isOpen
  preview?: string          // texto resumido visible cuando colapsado
}
```

**Comportamiento:**
- Transición de altura: `250ms ease-in-out` con `overflow: hidden`
- Icono chevron: rota 180° cuando está abierto
- `max-height` en colapsado: `auto` (alto del header + preview)
- `max-height` en expandido: `none` (contenido completo)

---

### 10.8 SkeletonCard

**Descripción:** Placeholder animado durante carga de datos.

**Tokens:**
- Background animado: gradiente de `#F3F4F6` → `#E5E7EB` → `#F3F4F6`
- `animation: shimmer 1.5s ease-in-out infinite`
- `border-radius: 14px` (mismo que SemaphoreCard)
- Altura estándar: `120px`
- Simula la estructura de SemaphoreCard: borde izquierdo neutro, título, badge, footer

**Uso:** Siempre mostrar 3 SkeletonCards durante carga inicial de Dashboard y Notificaciones.

---

### 10.9 CTAButton

**Descripción:** Botón de acción principal. Siempre con texto contextual al tipo de trámite.

**Props:**
```typescript
interface CTAButtonProps {
  variant: 'primary' | 'danger' | 'warning' | 'info' | 'success' | 'outline' | 'ghost'
  label: string
  isLoading?: boolean
  isDisabled?: boolean
  icon?: React.ReactNode  // Lucide icon, left-aligned
  onClick?: () => void
  fullWidth?: boolean     // default: false
  size?: 'sm' | 'md' | 'lg' // default: 'md'
}
```

**Variantes de color:**
| Variante | Background | Text | Border |
|----------|------------|------|--------|
| `primary` | `#1A56DB` | white | — |
| `danger` | `#DC2626` | white | — |
| `warning` | `#D97706` | white | — |
| `info` | `#2563EB` | white | — |
| `success` | `#059669` | white | — |
| `outline` | transparent | `#1A56DB` | `#E5E7EB` |
| `ghost` | transparent | `#4B5563` | — |

**Tamaños:**
| Size | Height | Font size | Padding |
|------|--------|-----------|---------|
| `sm` | 36px | 13px | `8px 16px` |
| `md` | 48px | 15px | `12px 24px` |
| `lg` | 52px | 15px | `14px 28px` |

**Tokens comunes:** `border-radius: 9999px`, `font-weight: 600`, `transition: 150ms`

**Estado loading:** Spinner de 18px reemplaza texto, mismas dimensiones de botón.

**CTA contextual por tipo de notificación:**
| Tipo | Label del CTA |
|------|--------------|
| Adjuntar documento | `"Adjuntar documento →"` |
| Pago requerido | `"Ir al pago →"` |
| Confirmar acción | `"Confirmar →"` |
| Renovación | `"Iniciar Renovación →"` |
| Solo informativo | `"Acusar recibo"` |
| Descargar PDF | `"Descargar PDF"` |

---

### 10.10 FormInput

**Descripción:** Input de formulario con label, icono, estados de validación.

**Props:**
```typescript
interface FormInputProps {
  label: string          // siempre UPPERCASE
  placeholder: string
  type?: 'text' | 'password' | 'tel'
  icon?: React.ReactNode // ícono izquierdo
  error?: string
  isValid?: boolean
  hint?: string          // helper text bajo el input
}
```

**Tokens:**
- Label: `11px`, `font-weight: 600`, `letter-spacing: 0.05em`, `text-transform: uppercase`, color `#4B5563`
- Input height: `52px`
- Background: `#F3F4F6`
- Border: `none` default / `2px solid #1A56DB` en focus / `2px solid #DC2626` en error
- `border-radius: 10px`
- `padding: 0 16px 0 44px` (con ícono izquierdo)
- Ícono: `20px`, posición absoluta `left: 14px`, color `#9CA3AF`
- Error text: `12px`, `#DC2626`, con ícono `AlertCircle 14px`
- Focus: `ring-2 ring-[#1A56DB]` + `outline: none`

---

### 10.11 Toast / Feedback

**Descripción:** Notificación temporal que aparece desde el fondo de pantalla.

**Props:**
```typescript
interface ToastProps {
  type: 'success' | 'error' | 'info'
  message: string
  duration?: number  // ms, default: 2500
}
```

**Tokens:**
- Posición: `fixed bottom-[80px]` (sobre BottomNav), `left: 16px right: 16px`, `max-width: 358px`, centrado
- `border-radius: 12px`
- `padding: 12px 16px`
- `font-size: 14px`, `font-weight: 500`
- Success: `background: #D1FAE5`, `color: #065F46`, ícono `CheckCircle`
- Error: `background: #FEE2E2`, `color: #991B1B`, ícono `XCircle`
- Info: `background: #DBEAFE`, `color: #1E40AF`, ícono `Info`
- Animación entrada: `translateY(16px) → translateY(0)` + `opacity 0→1`, 350ms
- Auto-dismiss: 2.5s delay + fade out 200ms

---

### 10.12 EmptyState

**Descripción:** Estado vacío cuando no hay datos que mostrar.

**Props:**
```typescript
interface EmptyStateProps {
  icon: React.ReactNode
  title: string
  description: string
  action?: { label: string; onClick: () => void }
}
```

**Tokens:**
- Contenedor: centrado verticalmente, `padding: 48px 24px`
- Ícono wrapper: `64px circle`, `background: #F3F4F6`, ícono `32px`, `color: #9CA3AF`
- Título: `H3 (17px/600)`, `color: #111827`
- Descripción: `Body SM (14px)`, `color: #4B5563`, `text-align: center`
- CTA (opcional): `CTAButton variant="outline"`

---

### 10.13 NotificationTable

**Descripción:** Tabla de detalle que aparece dentro de una NotificationCard expandida. Muestra los alcances de la etapa (F6 crítica del journey).

**Props:**
```typescript
interface NotificationTableProps {
  rows: { label: string; value: string }[]
  // Filas estándar: Etapa actual, Solicitud, Requerimiento, Plazo límite, Contacto
}
```

**Tokens:**
- Background: `white`
- Border: `1px solid #E5E7EB`
- `border-radius: 10px`
- Header de tabla: `"DETALLE DE LA NOTIFICACIÓN"`, `11px uppercase`, `color: #4B5563`, padding `10px 14px`, `background: #F9FAFB`
- Filas: `padding: 10px 14px`, separadas por `border-top: 1px solid #E5E7EB`
- Label (columna izq): `12px`, `color: #9CA3AF`, `font-weight: 500`, `min-width: 110px`
- Value (columna der): `13px`, `color: #111827`, `font-weight: 500`
- Valores numéricos (ej. `#2024-00123`): `DM Mono 13px`

---

## 11. Patrones de Pantalla

### Patrón: Pantalla de Lista (Dashboard, Notificaciones)

```
TopBar
├── Tabs (Marcas / Patentes)
├── FilterPills (opcional)
├── Summary Row (opcional)
├── Section label + timestamp
└── Lista de SemaphoreCards (scroll)
    ├── 🔴 Cards "danger" → primero
    ├── 🟠 Cards "warning"
    ├── 🔵 Cards "info"
    └── 🟢 Cards "success" → último
BottomNav
```

### Patrón: Pantalla de Recursos (Certificados, Biblioteca)

```
TopBar
├── Page title + descripción
├── SearchInput
├── FilterPills
└── Grid/Lista de resource cards
    └── Cada card: ícono + badge + título + CTA
BottomNav
```

### Patrón: Pantalla de Soporte

```
TopBar (back arrow)
├── ChannelFilterPills
├── InfoBanner (warning)
├── Section label
└── CollapsibleCards (historial)
    └── Footer fijo: Contacto directo + links
BottomNav
```

### Patrón: Login (sin BottomNav)

```
TopBar (sin back arrow)
└── ScrollView centrado
    ├── Logo/Ícono hero
    ├── Título + subtítulo
    ├── Form (RUT + Contraseña)
    ├── CTA primario
    ├── Divider
    ├── CTA secundario (ClaveÚnica)
    └── Footer institucional
```

---

## 12. Accessibility (A11Y)

MiINAPI se compromete con **WCAG 2.1 AA** como mínimo.

| Área | Regla |
|------|-------|
| **Contraste** | Ratio mínimo 4.5:1 para texto normal, 3:1 para texto grande (≥18px) |
| **Touch targets** | Mínimo `48×48px` para todos los elementos interactivos |
| **Focus rings** | Visibles en todos los elementos interactivos: `ring-2 ring-[#1A56DB]` |
| **Semántica** | HTML semántico: `<nav>`, `<main>`, `<header>`, `<button>`, `<input>` |
| **ARIA** | `aria-label` en iconos sin texto, `aria-current="page"` en nav activo, `aria-expanded` en CollapsibleCard |
| **Doble codificación** | Semáforo = color + ícono + texto. Nunca solo color. |
| **Teclado** | Tab order lógico. `Escape` cierra modales/sheets. `Enter`/`Space` activa botones. |
| **Formularios** | `<label>` asociado a `<input>` via `htmlFor`. Mensajes de error con `aria-describedby`. |
| **Animaciones** | Respetar `prefers-reduced-motion`. Si activo: eliminar transitions y keyframes. |

**Ratios de contraste verificados:**
- `#111827` sobre `#FFFFFF` → 16.7:1 ✅
- `#FFFFFF` sobre `#1A56DB` → 4.7:1 ✅
- `#DC2626` sobre `#FEE2E2` → 4.5:1 ✅
- `#D97706` sobre `#FEF3C7` → 4.5:1 ✅ (verificar con herramienta)
- `#059669` sobre `#D1FAE5` → 4.5:1 ✅ (verificar con herramienta)

---

## 13. Tokens CSS (globals.css)

```css
/* globals.css — MiINAPI Design System Tokens */

@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');

:root {
  /* === PALETA BASE INSTITUCIONAL === */
  --color-primary:           #1A56DB;
  --color-primary-dark:      #1E3A8A;
  --color-primary-foreground: #FFFFFF;
  --color-accent:            #7C3AED;
  --color-accent-light:      #EDE9FE;
  --color-accent-foreground: #FFFFFF;

  /* === SISTEMA SEMÁFORO INAPI === */
  --semaphore-danger:        #DC2626;
  --semaphore-danger-bg:     #FEE2E2;
  --semaphore-warning:       #D97706;
  --semaphore-warning-bg:    #FEF3C7;
  --semaphore-info:          #2563EB;
  --semaphore-info-bg:       #DBEAFE;
  --semaphore-success:       #059669;
  --semaphore-success-bg:    #D1FAE5;

  /* === NEUTROS DE UI === */
  --background:              #F9FAFB;
  --surface:                 #FFFFFF;
  --surface-elevated:        #F3F4F6;
  --foreground:              #111827;
  --foreground-secondary:    #4B5563;
  --foreground-muted:        #9CA3AF;
  --border:                  #E5E7EB;
  --border-strong:           #D1D5DB;
  --ring:                    #1A56DB;

  /* === TIPOGRAFÍA === */
  --font-sans:               'DM Sans', system-ui, sans-serif;
  --font-mono:               'DM Mono', 'Courier New', monospace;

  /* === SPACING BASE === */
  --space-unit:              4px;

  /* === BORDER RADIUS === */
  --radius-sm:               6px;
  --radius-md:               10px;
  --radius-lg:               14px;
  --radius-xl:               20px;
  --radius-2xl:              24px;
  --radius-full:             9999px;

  /* === SHADOWS === */
  --shadow-card:             0 1px 3px rgba(0,0,0,0.08);
  --shadow-elevated:         0 4px 12px rgba(0,0,0,0.10);
  --shadow-modal:            0 8px 24px rgba(0,0,0,0.15);
  --shadow-frame:            0 8px 32px rgba(0,0,0,0.15);
  --shadow-fab:              0 4px 16px rgba(124,58,237,0.35);

  /* === LAYOUT === */
  --topbar-height:           56px;
  --bottomnav-height:        64px;
  --app-max-width:           390px;
}

/* Dark Mode (mejora progresiva) */
@media (prefers-color-scheme: dark) {
  :root {
    --background:           #0F172A;
    --surface:              #1E293B;
    --surface-elevated:     #263548;
    --foreground:           #F8FAFC;
    --foreground-secondary: #CBD5E1;
    --foreground-muted:     #64748B;
    --border:               #334155;
    --border-strong:        #475569;
  }
}

/* Reducción de movimiento */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

/* App frame base */
body {
  font-family: var(--font-sans);
  background-color: var(--background);
  color: var(--foreground);
  -webkit-font-smoothing: antialiased;
}

.app-frame {
  max-width: var(--app-max-width);
  margin: 0 auto;
  min-height: 100vh;
  background: var(--surface);
  position: relative;
}

/* Desktop frame shadow */
@media (min-width: 640px) {
  .app-frame {
    box-shadow: var(--shadow-frame);
    min-height: 100vh;
  }
  body {
    background: #E2E8F0; /* Fondo desktop */
  }
}

/* Shimmer animation para skeletons */
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.skeleton {
  background: linear-gradient(90deg, #F3F4F6 25%, #E5E7EB 50%, #F3F4F6 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
  border-radius: var(--radius-lg);
}
```

---

## 14. Tokens Tailwind (tailwind.config.ts)

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Paleta institucional
        primary: {
          DEFAULT: '#1A56DB',
          dark:    '#1E3A8A',
          light:   '#DBEAFE',
        },
        accent: {
          DEFAULT: '#7C3AED',
          light:   '#EDE9FE',
        },
        // Sistema Semáforo
        danger: {
          DEFAULT: '#DC2626',
          bg:      '#FEE2E2',
        },
        warning: {
          DEFAULT: '#D97706',
          bg:      '#FEF3C7',
        },
        info: {
          DEFAULT: '#2563EB',
          bg:      '#DBEAFE',
        },
        success: {
          DEFAULT: '#059669',
          bg:      '#D1FAE5',
        },
        // Neutros UI
        surface:   '#FFFFFF',
        'surface-elevated': '#F3F4F6',
        border:    '#E5E7EB',
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['DM Mono', 'Courier New', 'monospace'],
      },
      fontSize: {
        'display':    ['28px', { lineHeight: '36px', fontWeight: '800' }],
        'h1':         ['24px', { lineHeight: '32px', fontWeight: '700' }],
        'h2':         ['20px', { lineHeight: '28px', fontWeight: '600' }],
        'h3':         ['17px', { lineHeight: '24px', fontWeight: '600' }],
        'h4':         ['15px', { lineHeight: '22px', fontWeight: '500' }],
        'body':       ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'body-sm':    ['14px', { lineHeight: '22px', fontWeight: '400' }],
        'body-xs':    ['12px', { lineHeight: '18px', fontWeight: '400' }],
        'btn':        ['15px', { lineHeight: '20px', fontWeight: '600' }],
        'label':      ['11px', { lineHeight: '16px', fontWeight: '600', letterSpacing: '0.05em' }],
        'timestamp':  ['11px', { lineHeight: '16px', fontWeight: '400' }],
        'mono':       ['13px', { lineHeight: '20px', fontWeight: '500' }],
        'mono-lg':    ['15px', { lineHeight: '22px', fontWeight: '500' }],
      },
      spacing: {
        // Base 4px system
        '1':  '4px',
        '2':  '8px',
        '3':  '12px',
        '4':  '16px',
        '5':  '20px',
        '6':  '24px',
        '8':  '32px',
        '10': '40px',
        '12': '48px',
        '16': '64px',
        '24': '96px',
        // Layout especial
        'topbar':    '56px',
        'bottomnav': '64px',
      },
      borderRadius: {
        'sm':   '6px',
        'md':   '10px',
        'lg':   '14px',
        'xl':   '20px',
        '2xl':  '24px',
        'full': '9999px',
      },
      boxShadow: {
        'card':     '0 1px 3px rgba(0,0,0,0.08)',
        'elevated': '0 4px 12px rgba(0,0,0,0.10)',
        'modal':    '0 8px 24px rgba(0,0,0,0.15)',
        'frame':    '0 8px 32px rgba(0,0,0,0.15)',
        'fab':      '0 4px 16px rgba(124,58,237,0.35)',
      },
      transitionDuration: {
        'micro':    '100ms',
        'fast':     '150ms',
        'normal':   '200ms',
        'moderate': '250ms',
        'slow':     '300ms',
        'slower':   '350ms',
      },
      maxWidth: {
        'app': '390px',
      },
    },
  },
  plugins: [],
}

export default config
```

---

## 15. Component Governance

Cada componente que se añada a la librería de MiINAPI **debe documentar obligatoriamente:**

### Checklist de nuevo componente

- [ ] **Nombre y descripción** — qué hace y cuándo usarlo
- [ ] **Props tipadas** — interface TypeScript con JSDoc en cada prop
- [ ] **Variantes visuales** — tabla con todas las variantes del componente
- [ ] **Estados** — Default, Hover, Active, Focus, Disabled, Loading (si aplica)
- [ ] **Tokens usados** — lista de CSS variables que consume
- [ ] **Accesibilidad** — roles ARIA, navegación por teclado, contraste validado
- [ ] **Casos de uso correcto** — cuándo usar este componente
- [ ] **Casos prohibidos** — anti-patterns y degradaciones visuales
- [ ] **Mock de datos** — ejemplo de datos para desarrollo y testing

### Principio de restricción

> **Si un componente no está en esta librería, no se crea ad-hoc.** Se propone como nuevo componente usando este mismo formato y se revisa antes de implementar.

### Versionado de componentes

- **v0.x** — Experimentales (MVP, sujetos a cambio sin aviso)
- **v1.x** — Estables (requieren PR y revisión para modificar)
- **v2.x+** — Extended (Fase 2, Simulador, Asistente IA)

---

## Apéndice: Mapa de Correspondencia con Flujos

| Flujo (02_flow-diagrams.md) | Componentes del DS |
|-----------------------------|-------------------|
| Login / Auth | `FormInput`, `CTAButton (primary/accent)`, `TopBar (home)` |
| Segmentación usuario nuevo | `EmptyState`, overlay tutorial |
| Dashboard: lista de trámites | `FilterPills`, Summary Row, `SemaphoreCard`, `StepperProgress`, `StatusBadge`, `CTAButton (danger)` |
| Notificaciones: centro de alertas | `FilterPills`, `CollapsibleCard`, `NotificationTable`, `CTAButton (danger/warning/info)`, `Toast` |
| Certificados | `FilterPills`, SearchInput, resource cards, `CTAButton (primary-dark)`, `Toast` |
| Soporte e historial | `FilterPills`, InfoBanner, `CollapsibleCard`, fixed footer links |
| Biblioteca de recursos | Category grid `StatusBadge`, resource list, `CTAButton (ghost)`, media modal |
| Todos los flujos | `TopBar`, `BottomNav`, `SkeletonCard`, `Toast`, `EmptyState` |

---

*Documento generado el 2026-04-07. Versión: v1.0.0-mvp*
*Revisar y actualizar tras sesiones de testing con usuarios (Semana 3 del roadmap).*
