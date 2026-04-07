# MiINAPI — User Journey Map
## Usuario Ocasional (Persona Natural) · MVP Fase 1
### Fecha: 6 de abril 2025 · Revisión post-reunión Fernando / Bernarda / Álvaro

---

## Contexto del Usuario

**Perfil:** Persona natural chilena que ingresó una solicitud de marca en el sitio web de INAPI.  
**Motivación:** Saber en qué etapa está su solicitud y qué debe hacer a continuación.  
**Dispositivo:** Smartphone (iOS/Android).  
**Frecuencia de uso:** Esporádica — accede cuando recibe una notificación por correo o cuando recuerda su trámite.

---

## Journey Principal: "Revisar mi solicitud y completar una acción requerida"

```mermaid
journey
    title Usuario Ocasional: Revisar solicitud y completar acción requerida
    section Trigger externo
      Recibe email de INAPI notificando acción requerida: 3: Usuario
      Abre el enlace o descarga la app MiINAPI: 4: Usuario
    section Login
      Ingresa con RUT y contraseña: 4: Usuario
      Sistema valida credenciales via API: 3: Sistema
      Redirige al Dashboard: 5: Sistema
    section Dashboard
      Ve resumen: En Proceso / Acción Requerida / Finalizadas: 4: Usuario
      Identifica visualmente la solicitud urgente (rojo): 5: Usuario
      Hace clic en la card de acción requerida: 5: Usuario
    section Detalle de Solicitud
      Lee el próximo paso requerido: 4: Usuario
      Hace clic en Ir a la Notificación: 4: Usuario
    section Notificaciones
      Ve la notificación urgente destacada: 5: Usuario
      Lee la tabla con los alcances de la etapa: 3: Usuario
      Entiende qué debe adjuntar o hacer: 3: Usuario
    section Resolución
      Completa la acción requerida: 4: Usuario
      Recibe confirmación de recepción: 5: Sistema
      Vuelve al Dashboard: 5: Usuario
```

---

## Mapa de Fricciones por Pantalla

```mermaid
flowchart TD
    A[📱 Usuario recibe email INAPI] --> B[Abre MiINAPI]

    B --> C{¿Tiene cuenta?}
    C -->|No| D[🔴 FRICCIÓN F1\nFlujo de registro\nno definido aún]
    C -->|Sí| E[Pantalla Login]

    E --> F{Método de auth}
    F -->|RUT + contraseña| G[Valida credenciales]
    F -->|ClaveÚnica| H[🟡 FRICCIÓN F2\nDepende integración\nAPI Gobierno CL]

    G --> I[Dashboard]
    H --> I

    I --> J{¿Entiende el resumen?}
    J -->|Sí| K[Identifica solicitud urgente]
    J -->|No| L[🟡 FRICCIÓN F3\nJerarquía visual\ninsuficiente en v0 actual]

    K --> M[Abre card urgente]
    M --> N{¿CTA claro?}
    N -->|Sí| O[Ir a la Notificación]
    N -->|No| P[🔴 FRICCIÓN F4\nCTA ambiguo:\n'Completar Acción'\nvs contexto real]

    O --> Q[Pantalla Notificaciones]
    Q --> R{¿Orden claro?}
    R -->|Sí| S[Lee notificación urgente]
    R -->|No| T[🟡 FRICCIÓN F5\nOrden sin jerarquía\nurgencia en v0 actual]

    S --> U{¿Tabla de alcances\ncomprensible?}
    U -->|Sí| V[✅ Completa acción]
    U -->|No| W[🔴 FRICCIÓN F6\nTabla notificación\naún no implementada]

    V --> X[Confirmación de recepción]
    X --> Y[🟢 Objetivo cumplido]

    style D fill:#FEE2E2,stroke:#DC2626
    style H fill:#FEF3C7,stroke:#D97706
    style L fill:#FEF3C7,stroke:#D97706
    style P fill:#FEE2E2,stroke:#DC2626
    style T fill:#FEF3C7,stroke:#D97706
    style W fill:#FEE2E2,stroke:#DC2626
    style Y fill:#D1FAE5,stroke:#059669
```

---

## Inventario de Fricciones Identificadas

| ID | Pantalla | Tipo | Descripción | Impacto | Prioridad |
|----|----------|------|-------------|---------|-----------|
| F1 | Registro | 🔴 Crítica | Flujo de registro no wireframeado. El usuario no puede auto-registrarse desde la app si no tiene cuenta previa. | Alto | P0 |
| F2 | Login | 🟡 Media | Integración ClaveÚnica depende de credenciales sandbox del Gobierno. Proceso burocrático externo. | Medio | P1 |
| F3 | Dashboard | 🟡 Media | Jerarquía visual insuficiente: el usuario no distingue rápidamente qué solicitud requiere acción. | Alto | P1 |
| F4 | Dashboard | 🔴 Crítica | CTA "Completar Acción" no es contextual. Debería adaptarse al tipo de notificación (ej. "Adjuntar documento", "Realizar pago"). | Alto | P0 |
| F5 | Notificaciones | 🟡 Media | Las cartas no siguen orden de urgencia en la versión actual de v0. El usuario no sabe qué atender primero. | Alto | P1 |
| F6 | Notificaciones | 🔴 Crítica | La tabla de alcances de etapa no está implementada. Es el elemento central que comunica qué debe hacer el usuario. | Crítico | P0 |
| F7 | Biblioteca | 🟢 Baja | Usuario novato puede no distinguir la diferencia entre "Manuales" y "Guías". Etiquetas ambiguas. | Bajo | P2 |
| F8 | Certificados | 🟢 Baja | Sin filtro por tipo (Marca/Patente/Diseño), la lista puede crecer sin control en usuarios frecuentes. | Medio | P2 |

---

## Journey Secundario: "Consultar estado sin acción pendiente"

```mermaid
journey
    title Usuario Ocasional: Consultar estado pasivo de mi trámite
    section Entrada
      Recuerda que ingresó una solicitud hace semanas: 2: Usuario
      Abre MiINAPI directamente: 3: Usuario
    section Login
      Ingresa con RUT y contraseña: 4: Usuario
    section Dashboard
      Ve sus solicitudes en curso: 4: Usuario
      Identifica que no hay acción urgente: 5: Usuario
      Revisa el stepper de etapas: 4: Usuario
    section Información
      Accede a Ver Detalles: 4: Usuario
      Lee el estado actual y estimación de tiempo: 3: Usuario
      Consulta la Biblioteca para entender la etapa: 3: Usuario
    section Salida
      Sale de la app satisfecho con la información: 4: Usuario
```

---

## Notas para el equipo

- **Consistencia con emails de TI:** Hasta que el equipo de TI no defina el contenido exacto de las notificaciones por correo, el copy en la app debe ser genérico pero coherente. Trabajar con plantillas de notificación que se puedan parametrizar.
- **Sistema semáforo:** Rojo (urgente/riesgo) → Naranja (atención/requerimiento) → Azul (en revisión) → Verde (finalizado). Este código debe ser consistente en Dashboard, Notificaciones y Stepper de etapas.
- **Pantallas fuera del MVP:** Simulador y Asistente IA quedan para Etapa 2. No wireframear ni desarrollar hasta validar el MVP core.
