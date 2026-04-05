# SpendKaro — Finance Dashboard

A clean, interactive personal finance dashboard built with React, TypeScript, and Tailwind CSS.

---

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🛠 Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI framework |
| TypeScript | Type safety |
| Tailwind CSS v4 (@tailwindcss/vite) | Styling |
| Recharts | Data visualizations |
| Lucide React | Icon library |
| Vite | Build tool |
| date-fns | Date utilities |

---

## 📁 Project Architecture

Feature-based structure for scalability:

```
src/
├── common/                    # Shared across all features
│   ├── components/            # Card, Badge, Sidebar, Topbar
│   ├── hooks/                 # useAppContext (global state)
│   ├── types/                 # Shared TypeScript interfaces
│   └── libs/                  # finance.ts utilities, mockData.ts
│
├── dashboard/                 # Overview page
│   ├── components/            # SummaryCards, Charts, RecentTransactions
│   ├── hooks/                 # useDashboard (derived data)
│   └── DashboardPage.tsx
│
├── transactions/              # Transactions page
│   ├── components/            # TransactionFilters, TransactionTable, TransactionModal
│   ├── hooks/                 # useTransactions (filter/sort logic)
│   └── TransactionsPage.tsx
│
└── insights/                  # Insights & analytics page
    ├── components/            # InsightCard, Charts
    ├── hooks/                 # useInsights (derived analytics)
    └── InsightsPage.tsx
```

Every folder has an `index.ts` barrel file for clean imports.

---

## ✨ Features

### Dashboard Overview
- **3 summary cards**: Total Balance, Income, Expenses with % change vs last month
- **Cash flow area chart**: Income vs Expenses trend over 6 months
- **Spending donut chart**: Top 6 categories by spend
- **Net balance bar chart**: Monthly net position
- **Recent transactions**: Last 6 transactions with "View all" link

### Transactions
- **59 mock transactions** across Jan–Jun 2025
- **Search**: Full-text across merchant, category, description
- **Filter by type**: All / Income / Expense
- **Filter by category**: All 12 categories
- **Date range filter**: From / To date picker
- **Sort**: By date, amount, category, merchant (asc/desc)
- **Export**: CSV and JSON download
- **Admin CRUD**: Add, Edit, Delete transactions (Admin role only)

### Role-Based UI
- **Viewer**: Read-only — no add/edit/delete buttons
- **Admin**: Full CRUD — add transactions, inline edit/delete
- Switch roles via dropdown in the top bar

### Insights
- Top spending category, Savings rate, Best/worst month
- Month-over-month expense change, Biggest single expense
- Expense ratio, Average monthly spend
- Monthly income vs expense comparison chart
- Category horizontal bar chart
- Dynamic observations & recommendations

### Bonus Features
- 🌙 **Dark / Light mode** toggle (persisted)
- 💾 **Local storage** persistence (transactions, role, theme)
- 🚀 **Code splitting** via `React.lazy` for all 3 pages
- 📤 **Export** to CSV and JSON
- 📱 **Responsive** — mobile sidebar overlay, fluid grids
- ✨ **Animations** — page transitions, modal entrance

---

## 🎨 Design

- **Font**: DM Sans (body) — clean, modern, readable
- **Accent**: Warm gold `#C9A96E` — professional, financial feel
- **Dark theme**: Near-black backgrounds `#0D0F12` with layered surfaces
- **No purple gradients** — intentional warm-neutral palette

---

## 📐 Code Guidelines

### Naming Conventions
- **Components**: PascalCase (`SummaryCardItem.tsx`)
- **Hooks**: camelCase with `use` prefix (`useDashboard.ts`)
- **Types/Interfaces**: PascalCase (`Transaction`, `FilterState`)
- **Files**: kebab-case for non-component files (`mockData.ts`)

### TypeScript Rules
- `strict: true` — no `any` allowed
- `interfaces` for object shapes, `types` for unions/aliases
- All component props explicitly typed

### State Management
- Global state: `useReducer` + React Context (`AppContext`)
- Local UI state: `useState` (modal open, sidebar, etc.)
- Derived/computed state: `useMemo` in feature hooks

### Import Style
```ts
// ✅ Use barrel imports
import { Card, Badge } from '@/common/components';
import { useAppContext } from '@/common/hooks';

// ❌ Avoid deep imports
import { Card } from '@/common/components/Card';
```

### Component Pattern
- Each page is a lazy-loaded default export
- Feature logic lives in feature hooks, not page components
- Shared UI atoms live in `common/components`
