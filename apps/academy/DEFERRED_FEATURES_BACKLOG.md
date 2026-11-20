# Backlog de Secciones y Funcionalidades Pausadas para el Lanzamiento

Este documento registra los módulos, páginas y funcionalidades retiradas de la navegación pública el **20 de Noviembre de 2026** para garantizar un lanzamiento simple, robusto y enfocado en la **Experiencia Búsqueda Laboral ($20.000 ARS)**.

---

## 1. Secciones Pausadas

### A. Detalle Extendido de la Experiencia (`/experiencia`)
* **Estado**: Eliminada definitivamente del proyecto y redirigida a la Home (`/#planes-suscripcion`).
* **Motivo**: Toda la propuesta de valor, temario de los 10 módulos, herramientas y pasarela de pago están unificadas directamente en la **Home (`/`)**.
* **Redirección**: Configurada en `next.config.ts` (308 permanente a `/#planes-suscripcion`).

### B. Catálogo Multi-Cursos & Talleres (`/cursos`)
* **Estado**: Pausada de la barra de navegación y accesos directos.
* **Ubicación del código**: `apps/academy/src/app/cursos/page.tsx`
* **Motivo**: En el lanzamiento actual la Academia ofrece la **Experiencia Búsqueda Laboral** como producto estrella integral de 10 módulos. No hay talleres o cursos secundarios activos aún.
* **Cómo reactivarla a futuro**: Cuando Flor grabe talleres específicos o cursos cortos independientes (ej. *Curso Rápido de Negociación Salarial* o *Taller Intensivo de LinkedIn*), restaurar la ruta `/cursos` y listarlos allí.

### C. Centro de Recursos Gratuitos Individuales (`/recursos`)
* **Estado**: Pausada del menú superior y footer.
* **Ubicación del código**: `apps/academy/src/app/recursos/page.tsx` y subrutas de plantillas ATS.
* **Motivo**: En lugar de derivar a recursos aislados o descargas sueltas, se prioriza que el alumno ingrese al **Campus Virtual (`/campus`)** donde tiene acceso a las clases, el Tracker de Postulaciones y la Agenda.
* **Cómo reactivarla a futuro**: Si se diseñan lead magnets o descargables con formulario de captura de email, volver a enlazar `/recursos` en la navegación.

---

## 2. Herramientas que se Mantienen Activas en Producción

* **Home (`/`)**: Presentación completa, temario con 7 módulos troncales + 3 extras, herramientas reales (Tracker y Agenda), promo de \$20.000 y video con fotograma real de Flor.
* **Campus Virtual (`/campus`)**: Aula virtual interactiva con reproducción de video HD 1080p, navegación entre clases, comentarios y simulador.
* **Tracker de Postulaciones (`/campus?view=tracker`)**: Tablero tipo Kanban/lista para seguimiento de procesos de selección.
* **Agenda de Entrevistas (`/campus?view=agenda`)**: Calendario y recordatorios de fechas clave.
* **Test Vocacional (`/test-vocacional`)**: Cuestionario interactivo con diagnóstico de fortalezas.
* **Sobre Nosotros (`/sobre-nosotros`)**: Misión, los 4 pilares (incluyendo Aprendizaje y Mejora Continua) y vinculación al Ecosistema Flor Martínez.
* **Contacto (`/contacto`)**: Formulario de soporte y canales directos.

---

## 3. Seguridad & Modos de Visualización

* **Modo Dev (Saltear Clases)** y **VIP Pagado / Free Demo Toggle**:
  * Están blindados exclusivamente para los correos autorizados en `SUPERADMIN_EMAILS` (`santisose01@gmail.com` y `licenciadaflormartinez@gmail.com`).
  * Los alumnos y usuarios normales **NO** ven ni pueden activar estos controles.
