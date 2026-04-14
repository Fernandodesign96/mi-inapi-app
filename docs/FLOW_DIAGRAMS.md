# MiINAPI — Diagramas de Flujo por Pantalla
## MVP Fase 1 · Revisión post-reunión 06/04/2026
### Fernando (UX) · Bernarda (Informática) · Álvaro (Jefe Proyecto CORFO)

---

## 1. Flujo: Login / Autenticación
*Propósito: Acceso seguro y segmentación inicial del usuario.*

```mermaid
flowchart TD
    A([🚀 App Launch]) --> B[Splash / Logo MiINAPI]
    B --> C{¿Sesión activa?}
    
    C -->|Sí| D[Dashboard]
    C -->|No / Expirada| E[Pantalla Login]

    E --> F{Método de Auth}
    
    subgraph Credenciales_Internas [Login INAPI]
        F -->|RUT + Pass| G[Ingreso Credenciales]
        G --> H{Validar API}
        H -->|❌ Error| I[Error Inline / Reintentar]
        I --> G
        H -->|✅ Éxito| J[Generar JWT]
    end

    subgraph Auth_Externa [Estado]
        F -->|ClaveÚnica| L[Login OIDC Gob.cl]
        L --> M{Validar Token}
        M -->|❌ Fallo| E
        M -->|✅ Éxito| J
    end

    J --> D

    E -.-> P[¿Olvidaste pass?] --> Q[Recuperación via Email]
    E -.-> R[¿No tienes cuenta?] --> S[Registro / Pendiente Definir]

    style D fill:#16A34A,stroke:#16A34A,color:#fff
    style I fill:#DC2626,stroke:#DC2626,color:#fff
    style S fill:#D97706,stroke:#D97706,color:#fff
```

---

## 1.5. Flujo: Journey por Segmentación de Usuario
*Lógica de Onboarding diferenciada según el perfil del usuario.*

```mermaid
flowchart TD
    A([Sesión Iniciada]) --> B{¿Usuario tiene\nsolicitudes?}
    
    subgraph Journey_Nuevo [Perfil: Nuevo User]
        B -->|0 Solicitudes| C[Launch Dashboard Tutorial]
        C --> D[Overlay: Guía de Dashboard]
        D --> E[Orquestación: Recorrido por\nMarcas/Patentes/Diseños]
        E --> F[Dashboard Vacío + Guía 'Nueva Solicitud']
    end
    
    subgraph Journey_Experto [Perfil: Experimentado]
        B -->|1+ Solicitudes| H[Carga Proactiva de Alertas]
        H --> I[Dashboard: Filtro de Urgencia 🔴]
        I --> J[Highlight: Trámites con Plazos Venciendo]
    end

    F --> K([Usuario Activo])
    J --> K

    style C fill:#D97706,stroke:#D97706,color:#fff
    style H fill:#16A34A,stroke:#16A34A,color:#fff
    style J fill:#DC2626,stroke:#DC2626,color:#fff
```

---

## 2. Flujo: Dashboard Principal
*Centro neurálgico con jerarquía visual por urgencia y categoría.*

```mermaid
flowchart TD
    A([Entrada Dashboard]) --> B[Cargar Datos vía API]
    B --> C{¿Carga OK?}
    C -->|❌ No| D[Error de Conexión\+ Reintentar]
    
    C -->|✅ Sí| E[Home: Resumen Global]
    
    subgraph Categorias [Selección de Categoría]
        E --> F{Tabs Principales}
        F -->|MARCAS| G[Vista Marcas]
        F -->|PATENTES| H[Vista Patentes]
        F -->|DISEÑOS| I[Vista Diseños]
    end

    subgraph Jerarquia_Jerem [Orden de Visualización]
        G & H & I --> J[Sorting por Urgencia]
        J --> K[🔴 Acción Requerida]
        K --> L[🟠 Atención / Próximo Vencimiento]
        L --> M[🔵 En Revisión / Trámite Pasivo]
        M --> N[🟢 Finalizadas / Historial]
    end

    subgraph Acciones [Interacciones]
        K & L & M & N --> O{Click en Card}
        O -->|Detalle Rápido| P[Expandir Card: Stepper Etapas]
        O -->|Acción Directa| Q[Ir a Notificación / Pago]
        
        E --> R[FAB +: Nueva Solicitud]
        E --> S[🔔 Campaña Alertas]
    end

    style D fill:#DC2626,stroke:#DC2626,color:#fff
    style K fill:#DC2626,stroke:#DC2626,color:#fff
    style L fill:#D97706,stroke:#D97706,color:#fff
    style M fill:#2563EB,stroke:#2563EB,color:#fff
    style N fill:#16A34A,stroke:#16A34A,color:#fff
```

---

## 3. Flujo: Centro de Notificaciones
*Gestión de eventos críticos y administrativos.*

```mermaid
flowchart TD
    A([Entra a Notificaciones]) --> B[Sync API de Eventos]
    B --> C[Filtro por Categoría: Marcas / Patentes / Diseños]
    
    subgraph Listado [Visualización Estructurada]
        C --> D[Cards Agrupadas por Gravedad]
        D --> E{Interacción}
        E -->|Filtro Urgencia| F[Reordenar: Semáforo 🔴 a 🟢]
        E -->|Click Card| G[Desplegar Alcances de Etapa]
    end

    subgraph Resolucion [Ciclo de Respuesta]
        G --> H{¿Acción Req?}
        H -->|Sí 🔴/🟠| I[CTA Contextual:Adjuntar/Confirmar/Pagar]
        H -->|No 🔵/🟢| J[Sólo Informativo / Acuse]
        
        I --> K{Resultado}
        K -->|✅ Éxito| L[Update Badge a 🔵Toast Confirmación]
        K -->|❌ Error| M[Toast Error + Retry]
    end

    style I fill:#DC2626,stroke:#DC2626,color:#fff
    style L fill:#16A34A,stroke:#16A34A,color:#fff
    style M fill:#DC2626,stroke:#DC2626,color:#fff
    style D fill:#DC2626,stroke:#DC2626,color:#fff
```

---

## 4. Flujo: Certificados Digitales
*Acceso a documentos de propiedad industrial legalmente válidos.*

```mermaid
flowchart TD
    A([Entra a Certificados]) --> B[Fetch Documentos]
    B --> C{¿Hay Datos?}
    C -->|No| D[Estado Vacío + Link Gestión]
    
    C -->|Sí| E[Listado Maestro]
    
    subgraph Filtros_Consistentes [Organización]
        E --> F{Filtrar por:}
        F -->|Marcas| G[Resultados Marcas]
        F -->|Patentes| H[Resultados Patentes]
        F -->|Otros| I[Diseños/Modelos]
        
        G & H & I --> J[Buscador: RUT/Nombre/N° Reg]
    end

    subgraph Descarga [Acción Final]
        J --> K[Click Descargar PDF]
        K --> L{Validar Permiso}
        L -->|✅| M[Visor In-App / Guardar]
        L -->|❌| N[Error de Permiso/API]
    end

    style D fill:#94A3B8,stroke:#94A3B8,color:#fff
    style M fill:#16A34A,stroke:#16A34A,color:#fff
    style N fill:#DC2626,stroke:#DC2626,color:#fff
```

---

## 5. Flujo: Soporte e Historial
*Canales de comunicación y registro de interacciones pasadas.*

```mermaid
flowchart TD
    A([Entra a Soporte]) --> B[Load Historial]
    
    subgraph Omnicanalidad [Canales Registrados]
        B --> C{Filtrar Canal}
        C -->|Email| D[Tickets Soporte]
        C -->|Chat| E[Transcripciones]
        C -->|Llamadas| F[Bitácora Telefónica]
    end

    subgraph Seguimiento [Detalle]
        D & E & F --> G[Cronología Colapsable]
        G --> H{Click Card}
        H -->|Expandir| I[Detalle: Consulta vs Respuesta]
        I --> J{¿Resuelto?}
        J -->|No| K[CTA: Reabrir Ticket]
        J -->|Sí| L[Cerrar Detalle]
    end

    subgraph Enlaces_Directos [Acción de Contacto]
        K & B --> M[Footer: Enlaces de Ayuda]
        M --> N[Call Center / Nuevo Chat / Web INAPI]
    end

    style K fill:#D97706,stroke:#D97706,color:#fff
    style N fill:#2563EB,stroke:#2563EB,color:#fff
```

---

## 6. Flujo: Biblioteca de Recursos (Academia)
*Material educativo sobre propiedad industrial.*

```mermaid
flowchart TD
    A([Entra a Biblioteca]) --> B[Cargar Catálogo]
    
    subgraph Categorizacion_INAPI [Agrupado por Tipo]
        B --> C{Categorías}
        C -->|Manuales| D[Documentación Técnica]
        C -->|Guías| E[Paso a Paso Usuarios]
        C -->|Videos| F[Cápsulas Aprendizaje]
        C -->|Legal| G[Ley 19.039 / Otros]
    end

    subgraph Busqueda [Refinamiento]
        D & E & F & G --> H[Input Búsqueda]
        H --> I[Resultados Filtrados]
    end

    subgraph Consumo [Acción]
        I --> J{Tipo Archivo}
        J -->|PDF| K[Vista Previa / Descarga]
        J -->|Multimedia| L[Reproductor Media]
    end

    style K fill:#16A34A,stroke:#16A34A,color:#fff
    style L fill:#2563EB,stroke:#2563EB,color:#fff
```

---

## Navegación Global (Arquitectura BottomNav)

```mermaid
flowchart LR
    A[🏠 Dashboard] --- B[📄 Mis Trámites]
    B --- C[➕ Nuevo]
    C --- D[🎓 Academia]
    D --- E[👤 Perfil]

    subgraph Rutas_Criticas [Accesos Rápidos]
        A -->|Bell| F[Notificaciones]
        E -->|Doc| G[Certificados]
        E -->|Help| H[Soporte]
        E -->|Exit| I[Logout]
    end

    style F fill:#DC2626,color:#fff
    style G fill:#16A34A,color:#fff
    style I fill:#94A3B8,color:#fff
```

---

## Notas técnicas para el equipo de desarrollo (UX/FE/BE)

- **Sistemas de Diseño:** Todos los diagramas utilizan el **Sistema Semáforo INAPI**:
    - **Rojo (#DC2626):** Crítico/Urgente/Vencido.
    - **Naranja (#D97706):** Atención/Próximo/Acción Intermedia.
    - **Azul (#2563EB):** Información/Estado Pasivo/En proceso.
    - **Verde (#16A34A):** Éxito/Completado/Vigente.
- **Categorización Transversal:** La división Marcas / Patentes / Diseños es el eje de la data; el FE debe persistir el último Tab seleccionado por el usuario.
- **Performance:** Las llamadas a API de cada flujo deben implementar estrategias de **Caching** y **Optimistic UI** para mejorar la percepción de velocidad.
- **Jerarquía Visual:** El Dashboard y Notificaciones SIEMPRE deben renderizar el contenido **Rojo** en la parte superior (Priorización por Servidor).
