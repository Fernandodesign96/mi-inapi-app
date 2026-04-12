# MiINAPI 🚀 — Instituto Nacional de Propiedad Industrial

¡Bienvenido al repositorio oficial de **MiINAPI**! Esta es la plataforma ciudadana digital del Instituto Nacional de Propiedad Industrial (Chile), diseñada para transformar la experiencia de gestión de marcas, patentes y diseños industriales mediante una interfaz moderna, intuitiva y centrada en el usuario.

## 📋 Descripción del Proyecto
MiINAPI nace como un **MVP (Minimum Viable Product)** con el objetivo de centralizar la gestión de trámites de propiedad industrial. El proyecto utiliza un enfoque de **Monorepo** para mantener el Frontend y el Backend en un único lugar, asegurando coherencia técnica y facilidad de despliegue.

## 🛠️ Stack Tecnológico

### Frontend (`/frontend`)
- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router + Turbopack)
- **Lenguaje**: TypeScript
- **Estilos**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Gestión de Estado**: [Zustand](https://github.com/pmndrs/zustand)
- **Componentes**: Biblioteca personalizada basada en el MiINAPI Design System (premium aesthetics).
- **Analítica**: Microsoft Clarity & Google Analytics 4 (GA4).

### Backend (`/backend`) — *Próximamente*
- **Framework**: [NestJS](https://nestjs.com/)
- **Base de Datos**: PostgreSQL (via Prisma ORM)
- **Cache/Colas**: Redis & BullMQ
- **Auth**: JWT & ClaveÚnica (OIDC)

## 🚀 Estado Actual: Fase 1 - Frontend MVP Completado
Hemos finalizado con éxito la primera etapa del desarrollo, logrando:
- **Design System**: Implementación de tokens semánticos, tipografía premium y componentes atómicos.
- **Navegación Contextual**: Interfaz adaptativa según el estado del usuario (Nuevo vs. Activo).
- **Seguridad Frontend**: Middleware de protección de rutas y validación robusta de RUT.
- **Mock Data**: Flujo funcional completo con datos simulados para validación con usuarios.

## 📦 Instalación y Desarrollo

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/mi-inapi-app.git
   cd mi-inapi-app/frontend
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo:**
   ```bash
   npm run dev
   ```

## 📈 Seguimiento y Mejora Continua
Para este MVP, hemos integrado herramientas de observabilidad para recolectar feedback cualitativo y cuantitativo antes de la fase de Backend:
- **Microsoft Clarity**: Grabación de sesiones y mapas de calor para detectar fricciones.
- **GA4**: Métricas de uso y embudos de conversión.

## 📄 Documentación Técnica
- [Roadmap de Desarrollo](docs/roadmap_dev.md)
- [Registro de Desarrollo (Devlog)](docs/development/DEVLOG.md)

---
© 2026 Instituto Nacional de Propiedad Industrial | Gobierno de Chile
