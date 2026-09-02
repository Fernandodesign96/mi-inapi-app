# Plan de migración UI — MiINAPI × UI Kit GOB v3.0.1

**Estado:** Documentación completada (Fase 0). Implementación en código pendiente.  
**Última actualización:** 2026-06-10  
**Design system de referencia:** [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) v2.0.0-gob · **Arquitectura:** [ARCHITECTURE.md](ARCHITECTURE.md) · **Roadmap:** [ROADMAP.md](ROADMAP.md)

---

## Decisión de arquitectura

MiINAPI adopta la identidad visual del **UI Kit Gobierno de Chile v3.0.1** mediante **tokens en Tailwind CSS v4** y componentes React propios.

**No se utilizará** el [Framework kit Gobierno](https://framework.digital.gob.cl/) (`@gobdigital-cl/gob.cl`): está basado en Bootstrap 4 + jQuery, incompatible con Next.js 15 + React 19 + Tailwind, y el propio sitio oficial advierte que será actualizado.

---

## Referencias visuales

Todas las capturas viven en [`docs/uikit_gob/references/`](uikit_gob/references/):

| Archivo | Contenido |
|---------|-----------|
| `1.PNG` | Colores básicos (primario, accent, gris, blanco/negro) |
| `2.PNG` | Colores semánticos (éxito, info, advertencia, error, focus, link) |
| `3.PNG` | Texto accesible AA (`#FFFFFF` / `#373737`) |
| `4.PNG` | Data visualization (opcional MVP) |
| `5.PNG` | Tema claro/oscuro (referencia visual cautelosa) |
| `6.PNG` | Efectos: elevación 01–05, bordes 1–4 px, radius 0/4/8/16/24 |
| `7.PNG` | Roboto Slab — encabezados institucionales |
| `8.PNG` | Roboto Sans — UI, cuerpo, botones, links |
| `9.PNG` | Grilla — tabla breakpoints |
| `10.PNG` | Grilla — diagramas 4/8/12 columnas |
| `11.PNG` | Espaciado: 4·8·12·16·24·36·48·64 px |
| `claveunica-button-states.PNG` | Botón ClaveÚnica: 5 estados × 3 radios |

Detalle de tokens volcado en [`docs/uikit_gob/references/DESIGN_SYSTEM.md`](uikit_gob/references/DESIGN_SYSTEM.md) (referencia cruzada del kit).

---

## Decisiones confirmadas

| Tema | Decisión |
|------|----------|
| Layout | Grilla responsiva GOB (600 / 905 / 1240 / 1440 px). **Eliminar** frame fijo 390 px. |
| Tipografía | Roboto Slab (encabezados) + Roboto Sans (UI). Eliminar DM Sans / DM Mono. |
| Accent producto | `GOB.COLOR.ACCENT` `#FF4731` — FAB, highlights. |
| Botón ClaveÚnica | Componente dedicado `ClaveUnicaButton` con paleta oficial (excepción documentada). |
| Semáforo INAPI | Patrón de producto conservado; colores migrados a escala semántica GOB. |
| Focus | `GOB.COLOR.FOCUS` `#FFBE5C` (+ `#373737` si hace falta doble indicación). |

---

## Fases de implementación

### Fase 0 — Documentación ✅

- [x] Reescribir [`docs/DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md)
- [x] Crear este plan ([`docs/UI_MIGRATION_PLAN.md`](UI_MIGRATION_PLAN.md))
- [x] Actualizar referencias en `docs/uikit_gob/`, `FLOW_DIAGRAMS.md`, `USER_JOURNEY.md`
- [x] Entrada en [`docs/development/DEVLOG.md`](development/DEVLOG.md)

### Fase 1 — Fundación de tokens (pendiente)

| Archivo | Cambios |
|---------|---------|
| [`frontend/app/globals.css`](../frontend/app/globals.css) | Tokens GOB en `:root` y `@theme`; utilidades tipográficas; `.gob-container` / `.gob-grid`; dark mode; tokens `--claveunica-*` |
| [`frontend/tailwind.config.ts`](../frontend/tailwind.config.ts) | Colores GOB, breakpoints, spacing, radius, elevation, Roboto |
| [`frontend/app/layout.tsx`](../frontend/app/layout.tsx) | `Roboto_Slab` + `Roboto` via `next/font/google`; quitar DM Sans/Mono |
| [`frontend/lib/utils.ts`](../frontend/lib/utils.ts) *(crear)* | Helper `cn()` con `clsx` + `tailwind-merge` |

### Fase 2 — Componentes base (pendiente)

Orden sugerido:

1. `ClaveUnicaButton.tsx` *(nuevo)*
2. `StatusBadge.tsx`
3. `CTAButton.tsx`
4. `FormInput.tsx`
5. `SemaphoreCard.tsx` → `CollapsibleCard.tsx` → `SkeletonCard.tsx`
6. `StepperProgress.tsx`, `FilterPills.tsx`, `Toast.tsx`, `EmptyState.tsx`, `NotificationTable.tsx`
7. `TopBar.tsx`, `BottomNav.tsx`, `ChatIAFab.tsx`

Criterio: eliminar `bg-[#...]` / `text-[#...]`; usar clases semánticas.

### Fase 3 — Layouts (pendiente)

- Quitar `max-w-[390px]` de [`frontend/app/(dashboard)/layout.tsx`](../frontend/app/(dashboard)/layout.tsx)
- Shell full-width con grilla GOB
- Reposicionar `ChatIAFab` relativo al viewport

### Fase 4 — Páginas (pendiente)

Orden: login → inicio → solicitudes → notificaciones → certificados → biblioteca → soporte → perfil / chat / diario.

Login: integrar `ClaveUnicaButton` (reemplaza `CTAButton outline` + ícono Lucide `Fingerprint`).

### Fase 5 — Dark mode y accesibilidad (pendiente)

- `prefers-color-scheme: dark`
- Contraste AA según `3.PNG`
- `prefers-reduced-motion`
- Touch targets ≥ 44 px (botones), ≥ 29 px (chips)

### Fase 6 — Verificación (pendiente)

```bash
# Desde frontend/
rg 'bg-\[#|text-\[#|border-\[#' .
# Resultado esperado tras migración: 0 coincidencias
```

Checklist visual en breakpoints: 375 / 768 / 905 / 1280 / 1440 px.

---

## Mapa de colores (legacy → GOB)

| Token MiINAPI (v1) | Token GOB (v2) |
|--------------------|----------------|
| `#1A56DB` primary | `#4282E0` `GOB.COLOR.PRIMARIO` base |
| `#1E3A8A` primary-dark | `#0F69C4` darken |
| `#7C3AED` accent | `#FF4731` `GOB.COLOR.ACCENT` base |
| `#111827` foreground | `#373737` texto AA |
| `#DC2626` danger | `#FB3B3B` `GOB.COLOR.ERROR` base |
| `#D97706` warning | `#FF5722` `GOB.COLOR.ADVERTENCIA` base |
| `#2563EB` info | `#2196F3` `GOB.COLOR.INFO` base |
| `#059669` success | `#4CAF50` `GOB.COLOR.EXITO` base |
| Focus `#1A56DB` | `#FFBE5C` `GOB.COLOR.FOCUS` |

---

## Botón ClaveÚnica — resumen

Componente **independiente** de `CTAButton`. Referencia: `claveunica-button-states.PNG`.

| Estado | Comportamiento |
|--------|----------------|
| Default | Fondo azul medio, texto blanco |
| Hover | Azul más oscuro |
| Active | Borde grueso `#FFBE5C` |
| Focus | Fondo azul marino oscuro |
| Disabled | Azul-gris desaturado |

Radio default MVP: **4 px**. Tipografía del label: **Clave** (regular) + **Única** (bold).

---

## Modo Ask — flujo de trabajo

Cada sesión de implementación seguirá:

1. Fase + archivo objetivo
2. Bloque de código actual (líneas)
3. Reemplazo con tokens GOB
4. Referencia a sección del design system

---

*Plan v2 — 2026-06-10. Complementa [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) v2.0.0-gob.*
