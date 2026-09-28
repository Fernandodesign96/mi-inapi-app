# MiINAPI — Instituto Nacional de Propiedad Industrial

Plataforma ciudadana digital del **Instituto Nacional de Propiedad Industrial (Chile)** para seguir marcas, patentes y diseños industriales con una interfaz alineada al **UI Kit Gobierno de Chile v3.0.1**.

## Descripción del proyecto

MiINAPI es un **MVP frontend** que centraliza el seguimiento de trámites de propiedad industrial. El repositorio usa un enfoque de **monorepo** (`frontend/` activo; `backend/` planificado) para mantener coherencia técnica y facilitar el despliegue.

## Stack tecnológico

### Frontend (`/frontend`)

| Área | Tecnología |
|------|------------|
| Framework | [Next.js 15](https://nextjs.org/) (App Router, Turbopack en dev) |
| Lenguaje | TypeScript |
| Estilos | [Tailwind CSS v4](https://tailwindcss.com/) + tokens GOB en `globals.css` |
| Estado | [Zustand](https://github.com/pmndrs/zustand) (`userState`, tema) |
| UI | Componentes propios en `components/ui/` (sin Bootstrap GOB npm) |
| Formularios | react-hook-form + zod |
| Iconos | lucide-react |
| Analítica | Microsoft Clarity y GA4 (según despliegue) |

### Backend (`/backend`) — *planificado*

NestJS, PostgreSQL (Prisma), Redis/BullMQ, JWT y ClaveÚnica (OIDC).

## Estado actual (rama `fase1-mvp-actualizacion`)

Trabajo en curso sobre **Fase 1 del alcance funcional** (documento técnico del proyecto): experiencia de seguimiento y notificaciones en UI, sin eliminar código de Fase 2.

### Implementado en frontend

- **UI Kit GOB v3.0.1**: tokens, Roboto, grilla responsiva, semáforo INAPI, `ClaveUnicaButton`, modo día/noche manual.
- **Feature flags** (`lib/featureFlags.ts`): Fase 2 oculta en UI (`PHASE_2_UI_ENABLED = false`); Chat IA, chat ejecutivo, historial de soporte avanzado, etc. conservados en código.
- **Módulos Fase 1**:
  - **Inicio**: perfiles `new`, `active-urgent`, `active-no-urgent` (toggle dev en layout).
  - **Solicitudes** y **detalle**: sección «Acción requerida» / informativa por semáforo; detalle desplegable; única acción ejecutable: descargar PDF de registro en solicitudes **finalizadas** (`lib/solicitudActions.ts`).
  - **Notificaciones**: CTA al detalle con variante de color según urgencia del trámite.
  - **Contacto** (`/soporte`): canales INAPI (`InapiContactCard`, `lib/inapiContact.ts`).
  - **Biblioteca**: recursos por tipo (PDF, video, web, herramientas) con jerarquía visual diferenciada.
- **Navegación inferior**: `BottomNav` contextual por estado de usuario; fondo opaco y estados activo/hover/focus.
- **Mocks**: `mockData.ts` alineado entre listados, notificaciones y detalle (`getSolicitudById`).

### Pendiente / Fase 2 (código presente, UI oculta)

Chat inteligente, diario oficial, métodos de pago en perfil, flujos ejecutivos de soporte ampliados, integración API real.

## Instalación y desarrollo

```bash
git clone <url-del-repo>
cd mi-inapi-app/frontend
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000). Para GitHub Pages, `basePath` está en `next.config.ts` (`/mi-inapi-app`).

### Scripts útiles

| Comando | Uso |
|---------|-----|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |

### Toggle de estado mock (solo desarrollo)

En el dashboard, esquina superior izquierda: **new** / **active-urgent** / **active-no-urgent**.

## Documentación técnica

**Producto y alcance**

- [PRD](docs/PRD.md)
- [Roadmap](docs/ROADMAP.md)
- [User journey](docs/USER_JOURNEY.md)
- Documento de alcance Fase 1 (PDF en repo): `docs/Doc tecnico - corrc feña.docx.pdf`

**Arquitectura y datos**

- [Arquitectura](docs/ARCHITECTURE.md)
- [Base de datos](docs/DATABASE.md)
- [Diagramas de flujo](docs/FLOW_DIAGRAMS.md)

**Diseño e implementación**

- [Design system](docs/DESIGN_SYSTEM.md)
- [Plan migración UI Kit GOB](docs/UI_MIGRATION_PLAN.md)
- [Referencias UI Kit](docs/uikit_gob/references/README.md)
- [DEVLOG](docs/development/DEVLOG.md)

## Seguimiento y mejora continua

- **Microsoft Clarity**: sesiones y mapas de calor.
- **GA4**: uso y embudos (según configuración de despliegue).

---

© 2026 Instituto Nacional de Propiedad Industrial | Gobierno de Chile
