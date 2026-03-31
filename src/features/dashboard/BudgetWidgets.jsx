import React from 'react';
import { useExpenseStore } from '../../store/useExpenseStore';
import { Card } from '../../components/UI/Card';
import { Target } from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';

export function BudgetWidgets() {
  const { savingsGoal, baseCurrency } = useExpenseStore();
  const currentSavings = 3450; // Mocked saved amount
  
  const percentSaved = savingsGoal > 0 ? (currentSavings / savingsGoal) * 100 : 0;

  return (
    <div className="grid grid-cols-2 gap-4">
      <Card className="flex flex-col gap-2 p-4 border-border">
        <div className="flex items-center gap-2 text-gold mb-1">
          <Target className="w-4 h-4" />
          <h4 className="text-xs font-semibold uppercase tracking-wider">Savings</h4>
        </div>
        <p className="text-xl font-bold text-primary">{formatCurrency(currentSavings, baseCurrency)}</p>
        <div className="w-full h-1 bg-surface rounded-full mt-1">
          <div 
            className="h-full bg-gold rounded-full" 
            style={{ width: `${Math.min(percentSaved, 100)}%` }} 
          />
        </div>
        <p className="text-[10px] text-secondary text-right">Goal: {formatCurrency(savingsGoal, baseCurrency)}</p>
      </Card>

      <Card className="flex flex-col gap-2 p-4 border-border">
        <div className="flex items-center gap-2 text-red-500 mb-1">
          <Target className="w-4 h-4" />
          <h4 className="text-xs font-semibold uppercase tracking-wider">Fixed</h4>
        </div>
        <p className="text-xl font-bold text-primary">{formatCurrency(1200, baseCurrency)}</p>
        <div className="w-full h-1 bg-surface rounded-full mt-1">
          <div className="h-full bg-red-500 rounded-full" style={{ width: '80%' }} />
        </div>
        <p className="text-[10px] text-secondary text-right">Rent, Utilities</p>
      </Card>
    </div>
  );
}
