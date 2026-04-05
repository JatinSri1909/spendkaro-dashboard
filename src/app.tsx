import { useState, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AppProvider, useAppContext } from '@/common/hooks';
import { Sidebar, Topbar } from '@/common/components';

const OverviewPage = lazy(() => import('@/overview/overview-page'));
const TransactionsPage = lazy(() => import('@/transactions/transactions-page'));
const InsightsPage = lazy(() => import('@/insights/insights-page'));

const PAGE_TITLES: Record<string, string> = {
  '/': 'Overview',
  '/transactions': 'Transactions',
  '/insights': 'Insights',
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { state } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="relative flex h-screen overflow-hidden bg-background font-sans text-text antialiased">
      {/* Animated Background Blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-blob absolute -top-40 -left-20 h-96 w-96 rounded-full bg-accent/30 blur-3xl filter" />
        <div className="animate-blob animation-delay-2000 absolute top-40 -right-20 h-80 w-80 rounded-full bg-accent/20 blur-3xl filter" />
        <div className="animate-blob animation-delay-4000 absolute -bottom-40 left-20 h-120 w-120 rounded-full bg-accent/15 blur-3xl filter" />
      </div>
      
      <div className="relative z-10 flex w-full flex-1">
        <div className="hidden md:flex md:shrink-0">
        <Sidebar role={state.role} />
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
          <div className="relative z-50 shrink-0" onClick={() => setSidebarOpen(false)}>
            <Sidebar role={state.role} />
          </div>
        </div>
      )}

      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar title={PAGE_TITLES[location.pathname] || 'Overview'} onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<OverviewPage onNavigateToTransactions={() => navigate('/transactions')} />} />
              <Route path="/transactions" element={<TransactionsPage />} />
              <Route path="/insights" element={<InsightsPage />} />
            </Routes>
          </Suspense>
        </main>
      </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppShell />
      </AppProvider>
    </BrowserRouter>
  );
}
