import { useState, lazy, Suspense } from 'react';
import { AppProvider, useAppContext } from '@/common/hooks';
import { Sidebar, Topbar } from '@/common/components';

const DashboardPage = lazy(() => import('@/dashboard/dashboard-page'));
const TransactionsPage = lazy(() => import('@/transactions/transactions-page'));
const InsightsPage = lazy(() => import('@/insights/insights-page'));

const PAGE_TITLES: Record<string, string> = {
  dashboard: 'Overview',
  transactions: 'Transactions',
  insights: 'Insights',
};

function PageLoader() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-accent" />
        <p className="text-xs text-text-muted">Loading...</p>
      </div>
    </div>
  );
}

function AppShell() {
  const [page, setPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { state } = useAppContext();

  return (
    <div className="relative flex h-screen overflow-hidden bg-background font-sans text-text antialiased">
      {/* Animated Background Blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-blob absolute -top-40 -left-20 h-96 w-96 rounded-full bg-accent/30 blur-3xl filter" />
        <div className="animate-blob animation-delay-2000 absolute top-40 -right-20 h-80 w-80 rounded-full bg-blue-500/30 blur-3xl filter" />
        <div className="animate-blob animation-delay-4000 absolute -bottom-40 left-20 h-[30rem] w-[30rem] rounded-full bg-indigo-500/30 blur-3xl filter" />
      </div>
      
      <div className="relative z-10 flex w-full flex-1">
        <div className="hidden md:flex md:shrink-0">
        <Sidebar activePage={page} onNavigate={setPage} role={state.role} />
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
          <div className="relative z-50 shrink-0">
            <Sidebar activePage={page} onNavigate={(p) => { setPage(p); setSidebarOpen(false); }} role={state.role} />
          </div>
        </div>
      )}

      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar title={PAGE_TITLES[page]} onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto">
          <Suspense fallback={<PageLoader />}>
            {page === 'dashboard' && (
              <DashboardPage onNavigateToTransactions={() => setPage('transactions')} />
            )}
            {page === 'transactions' && <TransactionsPage />}
            {page === 'insights' && <InsightsPage />}
          </Suspense>
        </main>
      </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}
