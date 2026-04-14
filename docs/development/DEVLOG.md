# Registro de Desarrollo: MiINAPI

Este documento describe el proceso de desarrollo del proyecto **MiINAPI**. Es un registro de las decisiones tomadas, los aprendizajes adquiridos, los problemas que surgieron y la forma en que se resolvieron, y el progreso realizado.

## 📑 Índice
- [[2026-04-06 - 2026-04-13] - Frontend | Sprint 1: Fundamentos, Design System y App Router](#2026-04-06---2026-04-13---frontend--sprint-1-fundamentos-design-system-y-app-router)
- [[2026-04-13] - Frontend | Sprint 1.5: Cierre, Seguridad y Navegación Contextual](#2026-04-13---frontend--sprint-15-cierre-seguridad-y-navegación-contextual)
- [[2026-04-14] - Frontend | Sprint 2: Stepper, Mock Data, Login y Polish Final](#2026-04-14---frontend--sprint-2-stepper-mock-data-login-y-polish-final)

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