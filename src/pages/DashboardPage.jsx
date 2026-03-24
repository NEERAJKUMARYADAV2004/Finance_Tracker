import React from 'react';
import { TotalOverview } from '../features/dashboard/TotalOverview';
import { BudgetWidgets } from '../features/dashboard/BudgetWidgets';
import { AIInsights } from '../features/dashboard/AIInsights';
import { RecentTransactions } from '../features/dashboard/RecentTransactions';
import { useAuthStore } from '../store/useAuthStore';

export function DashboardPage() {
  const { user } = useAuthStore();

  return (
    <div className="flex flex-col gap-6">
      <header className="flex justify-between items-center mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-100">Hello, {user?.name || 'User'}</h1>
          <p className="text-gray-400 text-sm">Here's your offline summary</p>
        </div>
      </header>

      <TotalOverview />
      <BudgetWidgets />
      <AIInsights />
      <RecentTransactions />
    </div>
  );
}
