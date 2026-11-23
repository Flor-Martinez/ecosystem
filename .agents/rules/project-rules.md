# Flor Martinez — Project Rules

## General

This repository is a pnpm + Turborepo monorepo containing multiple web applications belonging to the Flor Martinez brand.

The current product ecosystem is:

1. Flor Martinez — personal/professional portfolio and brand hub.
2. Agencia Flor Martinez — marketing, strategy, content, technology and web development services.
3. Academia Flor Martinez — professional education, employability and courses.
4. Tienda Flor Martinez — corporate products and personalized business merchandise.

The main Flor Martinez portfolio is the first application being developed.

After the main Flor Martinez website is established, the Academy is the first branch to be implemented.

## Architecture

Keep the applications separated:

- apps/flor-martinez
- apps/agency
- apps/academy
- apps/store

Shared generic components and configurations may live inside packages/.

Do not couple application-specific business logic between applications.

## Technology

Use:

- Next.js App Router
- React
- TypeScript
- pnpm
- Turborepo
- CSS Modules
- globals.css
- lucide-react
- framer-motion when animation is actually useful

Do NOT introduce Tailwind CSS unless explicitly requested.

Do NOT introduce unnecessary UI frameworks or component libraries.

## Code Quality

Use strict TypeScript.

Prefer small, reusable and composable components.

Avoid duplicated logic.

Do not create abstractions before they are actually needed.

Do not generate unnecessary files.

Keep business logic separate from presentation when appropriate.

Use semantic HTML.

Prioritize accessibility.

Use responsive design from the beginning.

## Design

The websites must feel like parts of one professional brand ecosystem.

They must not look like generic AI-generated websites.

Avoid excessive:

- gradients
- glassmorphism
- floating cards
- glowing effects
- rounded containers everywhere
- decorative blobs
- excessive animations

Use visual hierarchy, whitespace, typography, grids and intentional composition.

Animations should be subtle and purposeful.

## Brand hierarchy

Flor Martinez:
- institutional blue

Agency:
- blue + violet

Academy:
- violet + blue

Store:
- orange + yellow

The exact colors will be defined by the design system.

## Important

Do not make major architectural decisions silently.

If a change could affect multiple applications, first explain the impact and choose the safest scalable solution.

Before implementing a large feature:

1. Inspect the existing project.
2. Understand the current architecture.
3. Reuse existing infrastructure when appropriate.
4. Implement the smallest correct solution.
5. Run the relevant checks.
6. Fix errors before moving on.

Do not rewrite working parts of the repository without a reason.

Do not replace the existing monorepo architecture unnecessarily.

## EBL Motion Graphics & Video Offs (Mandatory Rules)

Para cualquier generación o renderizado de diapositivas y videos en off de la Academia Flor Martínez (EBL):

1. **Pilar Decorativo de Fondo "FM EBL" (Marca de Agua Móvil):**
   - **REGLA FUNDAMENTAL:** El pilar de texto decorativo `"FM" / "EBL"` de la derecha **SIEMPRE SE MUEVE**.
   - No es estático. Se desplaza verticalmente hacia arriba de forma continua a una velocidad de `1.05 px/frame` (`31.5 px/segundo` a 30 fps) durante todo el video.
   - Posición horizontal: `x = 1380`, tipografía `PlusJakartaSans-ExtraBold.ttf` a `310 px`.
   - Color: Lila ultra suave `(245, 242, 251, 255)` (`#F5F2FB`).
   - Ciclo de repetición: cada `300 px` alterna entre "FM" y "EBL" (ciclo de `600 px`).
   - Se renderiza en la capa más profunda, por detrás de las tarjetas, esquemas, flechas y textos.

2. **Franja Lateral Izquierda:**
   - Barra vertical de `14 px` de ancho en el borde izquierdo (`x = 0` a `x = 14`, de `y = 0` a `y = 1080`).
   - Color obligatorio: Violeta institucional `#7C3AED` (`rgba(124, 58, 237, 255)`).

3. **Encabezado Institucional:**
   - Margen izquierdo: `x = 145`, distancia superior: `58 px`.
   - Izquierda: `MÓDULO XX` en `#6D28D9` (`PlusJakartaSans-ExtraBold`, 24 px).
   - Derecha: `CLASE X · TÍTULO DE LA CLASE` en `#7C3AED` (`PlusJakartaSans-ExtraBold`, 24 px).
   - Línea conectora entre ambos textos: grosor 2 px, color `#DDD6FE` (`C_VIOLET_BORDER`).

4. **Pie de Página Institucional:**
   - Logo de la Academia: `flor_martinez_academia_transparente_color.png` redimensionado a ancho 420 px en `x = 145`, alineado al fondo.
   - Derecha: `EXPERIENCIA BÚSQUEDA LABORAL` en `#64748B` (`PlusJakartaSans-Bold`, 23 px).
   - Línea divisoria superior: grosor 2 px, color `#E2E8F0` (`C_BORDER`).

5. **Márgenes de Tiempo para Edición en CapCut:**
   - **Inicio:** `2.00 s` de margen de silencio inicial con los elementos en reposo o neutro.
   - **Final:** `3.00 s` de margen de silencio final manteniendo el cuadro final estático y consolidado (hold) para corte limpio.
   - **Desbloqueos:** Transición suave de gris/reposo a color de `0.45 s` a `0.60 s` (smoothstep / coseno) sincronizada exactamente con la mención de cada concepto en el audio.
