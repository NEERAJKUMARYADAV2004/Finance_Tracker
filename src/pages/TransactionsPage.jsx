import React from 'react';
import { ExpenseList } from '../features/expenses/ExpenseList';

export function TransactionsPage() {
  return (
    <div className="flex flex-col gap-6 h-full pb-10">
      <header className="mb-2">
        <h1 className="text-2xl font-bold text-primary">All Transactions</h1>
        <p className="text-secondary text-sm">Review off-grid local history</p>
      </header>

      <ExpenseList />
    </div>
  );
}
