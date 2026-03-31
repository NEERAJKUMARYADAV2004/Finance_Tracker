import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useExpenseStore } from '../../store/useExpenseStore';
import { Card } from '../../components/UI/Card';
import { getCategoryIcon } from '../../utils/categoryIcons';
import { formatCurrency } from '../../utils/formatCurrency';

export function RecentTransactions() {
  const { expenses, baseCurrency } = useExpenseStore();

  const recent = useMemo(() => {
    return expenses.slice(0, 5); // Just top 5
  }, [expenses]);

  if (recent.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center py-10 text-center bg-card">
        <p className="text-secondary">No transactions yet.</p>
        <p className="text-sm text-secondary/60">Add an expense or scan a receipt.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-end mb-2">
        <h3 className="text-lg font-semibold text-primary">Recent Activity</h3>
        <Link to="/transactions" className="text-gold text-sm hover:underline outline-none">See All</Link>
      </div>
      
      {recent.map((exp) => {
        const Icon = getCategoryIcon(exp.category);
        
        return (
          <Card key={exp.id} className="flex items-center justify-between p-3 bg-card hover:bg-surface/50 border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-secondary border border-border">
                <Icon className="w-5 h-5 stroke-[1.5px]" />
              </div>
              <div>
                <p className="text-primary font-medium text-sm">{exp.merchant || exp.category}</p>
                <p className="text-xs text-secondary">{new Date(exp.date).toLocaleDateString()}</p>
              </div>
            </div>
            <p className="text-primary font-semibold">{formatCurrency(-Math.abs(exp.amount), baseCurrency)}</p>
          </Card>
        );
      })}
    </div>
  );
}
