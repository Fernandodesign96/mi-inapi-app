# Registro de Desarrollo: MiINAPI

Este documento describe el proceso de desarrollo del proyecto **MiINAPI**. Es un registro de las decisiones tomadas, los aprendizajes adquiridos, los problemas que surgieron y la forma en que se resolvieron, y el progreso realizado.

## 📑 Índice
- [[2026-04-06 - 2026-04-13] - Frontend | Sprint 1: Fundamentos, Design System y App Router](#2026-04-12---frontend--sprint-1-fundamentos-design-system-y-app-router)
- [[2026-04-13] - Frontend | Sprint 1.5: Cierre, Seguridad y Navegación Contextual](#2026-04-12---frontend--sprint-1-cierre-seguridad-y-navegación-contextual)

---

## [2026-04-06 - 2026-04-13] - Frontend | Sprint 1: Fundamentos, Design System y App Router

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

