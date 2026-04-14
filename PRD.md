# Documento de Requerimientos de Producto (PRD): MiINAPI

Este documento define los requisitos de producto del MVP de MiINAPI, basado directamente en el *Documento de Fundamentos* oficial y el Roadmap del proyecto.

| Metadatos | Detalle |
| --- | --- |
| **Proyecto** | MiINAPI – Process Status Companion |
| **Versión** | 1.0 (MVP) - Abril 2026 |
| **Estado** | 🟢 En desarrollo activo |
| **Propietarios** | Fernando Arriagada (Diseño UX/UI) y Equipo MiINAPI |

---

## Tabla de contenidos
1. [Visión Estratégica y Filosofía](#1-visión-estratégica-y-filosofía)
2. [Objetivos y Métricas de Éxito (KPIs)](#2-objetivos-y-métricas-de-éxito-kpis)
3. [Perfiles de Usuario y Modelos Mentales](#3-perfiles-de-usuario-y-modelos-mentales)
4. [Historias de Usuario y Funcionalidades Principales](#4-historias-de-usuario-y-funcionalidades-principales)
5. [Arquitectura de Información y Navegación](#5-arquitectura-de-información-y-navegación)
6. [Lineamientos de UX/UI (Design System)](#6-lineamientos-de-uxui-design-system)
7. [Alcance del MVP y Post-MVP](#7-alcance-del-mvp-y-post-mvp)

---

## 1. Visión Estratégica y Filosofía

MiINAPI **no es un portal de trámites ni un sistema ITSM de tickets**, es un **Process Status Companion (PSC)**. Su propósito es acompañar al ciudadano a través de un proceso legal y administrativo de largo plazo. El usuario no resuelve el trámite por sí mismo: el sistema lo guía mientras el INAPI hace su parte.
- **Claridad sobre completitud:** El sistema prioriza mostrar qué debe hacer ahora mismo el usuario, antes de llenar su pantalla con historiales completos de resoluciones. 
- **La Notificación como Núcleo:** Toda actualización relevante empuja una notificación push al usuario, y el contenido técnico debe traducirse a un estándar accionable, cotidiano e idéntico a los envíos del TI institucional.
- **Persistencia Física:** Las etapas sensibles con demoras con sistemas contables (ej. pago de TGR) son anticipadas con mensajes claros tranquilizadores, previniendo incertidumbre o errores.

## 2. Objetivos y Métricas de Éxito (KPIs)

La justificación y éxito de este MVP radica en reducir la brecha entre el ciudadano y la institución. 

### Objetivos Estratégicos y de Negocio
| Objetivo | Métrica | Herramienta | Meta (6 meses) |
| --- | --- | --- | --- |
| **Aumentar NPS** | NPS (usuarios ocasionales). | Encuesta in-app | Pasar de **-2 a ≥ +20** |
| **Reducir carga en Soporte** | Volumen de llamadas y emails por trámite activo. | Zoho / INAPI | **↓ 30%** |
| **Mejorar apertura notificaciones** | % de push notifications abiertas en < 1h. | Firebase / GA4 | **≥ 60%** |
| **Acelerar resolución obs.** | Días promedio entre aviso y respuesta del usuario. | DB Interna | **↓ 40%** |
| **Aumentar tasas de conversión** | % de solicitudes que avanzan sin abandono. | Clarity / GA4 | **↑ 15%** |
| **Reducir abandono inicial** | % de escapes en primera sesión sin acción. | GA4 | **↓ 25%** |

### KPIs de UX / Diseño
* **Completitud Autónoma:** Tasas de flujos exitosos sin usar chat de soporte.
* **Dead Clicks y Rage Clicks:** Reducir a `< 3%` en llamadas a acción (CTAs).
* **Scroll Depth Notificaciones:** Verificación de la jerarquía semáforo.
* **Tiempos de Resolución de Flujo (Time-To-Action):** Menor a 45 segundos post-login.

## 3. Perfiles de Usuario y Modelos Mentales

### Perfil A — Usuario Nuevo sin Agente (Prioridad MVP)
* *El foco neurálgico del MVP*. Un emprendedor independiente o pyme tramitando su propia marca.
* **Fricción:** Al no ser Abogado, el lenguaje técnico lo paraliza. Interpreta todo "silencio del sistema" como error y acude a soporte sin actuar por sí solo. 
* **Solución:** Lenguaje de acción ("Adjunta el Poder" vs "Inserte Mandato"). Modelos análogos de apps de mensajería, Banco o Correo.

### Perfil B — Agente PI / Usuario Frecuente
* *Requiere Densidad Informativa*. Maneja múltiples cuentas. 
* Espera velocidad, vistas de portafolio y filtros certeros en la lista de solicitudes. Su riesgo no es abandono, es el "error por sobrecarga".

## 4. Historias de Usuario y Funcionalidades Principales

El núcleo interactivo se divide entre información urgente y exploración permanente. 

### Módulo Core y Navegación Dinámica
* **F01 - Ingreso Consistente:** Autenticación por RUT y ClaveÚnica simulada. 
* **F02 - Dashboard Contextual:** Renderiza uno de tres estados según la vida del usuario:
  1. *Onboarding (Nuevo)*: Breve indicación de uso y CTA de salida haca el web de INAPI.
  2. *Acción Urgente*: Tarjeta principal gigante roja exigiendo atención más "Resumen de estados".
  3. *Informativo (Sin Acción)*: Lista de último movimiento y "Resumen de estados".
* **F03 - Sistema Semáforo (La Columna Vertebral):** 
  - 🔴 **Rojo:** Acción requerida y bloqueante.
  - 🟠 **Naranja:** Atención y caducidad inminente (no bloqueante hoy).
  - 🔵 **Azul:** En proceso / Revisión activa por examinador.
  - 🟢 **Verde:** Finalizado o Éxito listos para descarga de certificados.

### Módulo Transversal y Soporte
* **F04 - Tablas de Alcances:** Toda tarjeta en la app expone una tabla precisa del estado del expediente traduciendo el jerga legal (etapa, plazos, requerimiento y contacto específico INAPI).
* **F05 - Diario Oficial Contextual:** Buscador dentro del ecosistema propio, reduciendo fugas hacia las validaciones externas.

## 5. Arquitectura de Información y Navegación

El `BottomNav` descarta el típico Floating Action Button (+), ya que MiINAPI gestiona etapas post-ingreso, sin crear trámites (eso ocurre en el web del INAPI). Consta de 5 accesos principales:

1. **Inicio** - Pantalla dinámica en tiempo real.
2. **Mis Solicitudes** - Historial detallado.
3. **Notificaciones** - Centro vital. Semáforo ordenado por temporalidad.
4. **Certificados** - Descarga de PDF y anotaciones post-aprobación.
5. **Perfil** - Sub-navegación agrupando herramientas en lugar de sólo cuenta (acceso principal a *Chat IA*, *Soporte*, *Diario Oficial*, y Biblioteca).

*(Adicional)* **FAB de Asistente IA (💬):** Flota sobre vistas cruciales. Ayuda 24/7 sobre conceptos y pasos, impidiendo su desorientación u horario ciego. 

## 6. Lineamientos de UX/UI (Design System)

* **Mobile-First con Sobrecarga Cero:** Un rediseño donde cualquier scroll innecesario significa reubicar datos bajo jerarquía expandible. 
* **Consistencia Progresiva:** Sacrificamos animaciones superfluas o "Distinción Estética" en pos de patrones robustos, universales, accesibles que un adulto de 65 años opere sin problemas. 
* **Microcopies y Resiliencia:** Toda falla de render o recarga, al igual que toda confirmación enviada, contará con Toast contextuales.

## 7. Alcance del MVP y Post-MVP

### Incluido en MVP (Fase 1)
- Lógica de Vistas (3 estados Inicio/Onboarding).
- Integración visual de "Mis Solicitudes", Sistema Semáforo "Notificaciones", "Certificados" y Perfil.
- Toda la base en Next.js (App Router), Tailwind CSS y Estado global asíncrono mapeando la API con *Mock Data* de alta fidelidad.
- Diario Oficial UI Básica.

### Post-MVP (Etapa 2 / Deuda Planificada)
- **Chat Inteligente IA (Operativo):** LLM validado para absorber consultas del proceso, pero excluido actualmente por complejidad paralela.
- **Simulador de Costos:** Motor estricto ligado a valor de UTM.
- **Asistente Fonético:** IA conectada a motores periciales de comparación marcaria.
- Generación y llenado total Backend en NestJS con bases de datos en Prisma/Postgres, validando los diccionarios y triggers finales con funcionarios Examinadores INAPI.
