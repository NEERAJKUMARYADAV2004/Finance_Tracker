import React from 'react';
import { useExpenseStore } from '../../store/useExpenseStore';
import { Card } from '../../components/UI/Card';
import { Target } from 'lucide-react';

export function BudgetWidgets() {
  const { savingsGoal } = useExpenseStore();
  const currentSavings = 3450; // Mocked saved amount
  
  const percentSaved = savingsGoal > 0 ? (currentSavings / savingsGoal) * 100 : 0;

  return (
    <div className="grid grid-cols-2 gap-4">
      <Card className="flex flex-col gap-2 p-4 border-gold/10">
        <div className="flex items-center gap-2 text-gold mb-1">
          <Target className="w-4 h-4" />
          <h4 className="text-xs font-semibold uppercase tracking-wider">Savings</h4>
        </div>
        <p className="text-xl font-bold text-gray-100">${currentSavings}</p>
        <div className="w-full h-1 bg-surface rounded-full mt-1">
          <div 
            className="h-full bg-gold rounded-full" 
            style={{ width: `${Math.min(percentSaved, 100)}%` }} 
          />
        </div>
        <p className="text-[10px] text-gray-500 text-right">Goal: ${savingsGoal}</p>
      </Card>

      <Card className="flex flex-col gap-2 p-4 border-gold/10">
        <div className="flex items-center gap-2 text-red-400 mb-1">
          <Target className="w-4 h-4" />
          <h4 className="text-xs font-semibold uppercase tracking-wider">Fixed</h4>
        </div>
        <p className="text-xl font-bold text-gray-100">$1,200</p>
        <div className="w-full h-1 bg-surface rounded-full mt-1">
          <div className="h-full bg-red-400 rounded-full" style={{ width: '80%' }} />
        </div>
        <p className="text-[10px] text-gray-500 text-right">Rent, Utilities</p>
      </Card>
    </div>
  );
}
