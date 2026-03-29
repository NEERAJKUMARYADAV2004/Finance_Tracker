import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useExpenseStore } from '../../store/useExpenseStore';
import { Card } from '../../components/UI/Card';
import { getCategoryIcon } from '../../utils/categoryIcons';

export function RecentTransactions() {
  const { expenses } = useExpenseStore();

  const recent = useMemo(() => {
    return expenses.slice(0, 5); // Just top 5
  }, [expenses]);

  if (recent.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center py-10 text-center bg-card">
        <p className="text-gray-400">No transactions yet.</p>
        <p className="text-sm text-gray-600">Add an expense or scan a receipt.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-end mb-2">
        <h3 className="text-lg font-semibold text-gray-100">Recent Activity</h3>
        <Link to="/transactions" className="text-gold text-sm hover:underline outline-none">See All</Link>
      </div>
      
      {recent.map((exp) => {
        const Icon = getCategoryIcon(exp.category);
        
        return (
          <Card key={exp.id} className="flex items-center justify-between p-3 bg-card hover:bg-surface/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-gray-400 border border-gray-800">
                <Icon className="w-5 h-5 stroke-[1.5px]" />
              </div>
              <div>
                <p className="text-gray-200 font-medium text-sm">{exp.merchant || exp.category}</p>
                <p className="text-xs text-gray-500">{new Date(exp.date).toLocaleDateString()}</p>
              </div>
            </div>
            <p className="text-gray-100 font-semibold">-${Number(exp.amount).toFixed(2)}</p>
          </Card>
        );
      })}
    </div>
  );
}
