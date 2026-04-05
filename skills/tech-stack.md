# Tech Stack

## Frontend Framework
- **React 18** — Concurrent features, Suspense for code splitting
- **TypeScript** — Strict mode, no `any`, full type safety

## Build Tooling
- **Vite 6** — Fast HMR, ESM-native builds
- **@tailwindcss/vite** — Tailwind CSS v4 via Vite plugin (no PostCSS needed)

## Styling
- **Tailwind CSS v4** — Utility-first, CSS variable–based theming
- **CSS Custom Properties** — Design tokens for colors (`--token-*`)
- **Google Fonts** — DM Sans (body), Syne (display)

## Data & State
- **React Context + useReducer** — Global state (transactions, role, theme, filters)
- **localStorage** — Persistence across sessions

## Charts
- **Recharts** — Area chart, Bar chart, Pie/Donut chart
- Custom tooltips and responsive containers

## Icons
- **Lucide React** — Consistent, tree-shakable icon set

## Utilities
- **date-fns** — Date formatting and manipulation

## Code Quality
- **TypeScript strict** — `noUnusedLocals`, `noUnusedParameters`
- **Barrel exports** — `index.ts` in every feature folder
- **Feature-based architecture** — `src/[feature]/components|hooks|types|libs`
