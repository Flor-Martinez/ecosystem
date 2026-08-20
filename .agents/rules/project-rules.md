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