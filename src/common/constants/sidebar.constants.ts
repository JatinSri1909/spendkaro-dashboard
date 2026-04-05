import { LayoutDashboard, ArrowLeftRight, Lightbulb } from 'lucide-react';

export const sidebarNavItems = [
  { id: 'overview', path: '/', label: 'Overview', icon: LayoutDashboard },
  { id: 'transactions', path: '/transactions', label: 'Transactions', icon: ArrowLeftRight },
  { id: 'insights', path: '/insights', label: 'Insights', icon: Lightbulb },
];