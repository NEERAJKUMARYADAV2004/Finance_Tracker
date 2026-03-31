import React from 'react';
import { useExpenseStore } from '../../store/useExpenseStore';
import { Card } from '../../components/UI/Card';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';

export function TotalOverview() {
  const { getTotalSpending, budget, baseCurrency } = useExpenseStore();
  const total = getTotalSpending();
  const percentUsed = budget > 0 ? (total / budget) * 100 : 0;
  
  // Static mock comparison
  const mockComparison = -2.4; 

  return (
    <Card className="flex flex-col gap-4 bg-card border-border">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-secondary text-sm font-medium mb-1">Total Spending (This Month)</p>
          <h2 className="text-4xl font-bold text-primary">{formatCurrency(total, baseCurrency)}</h2>
        </div>
        <div className={`flex items-center gap-1 text-sm ${mockComparison < 0 ? 'text-green-500' : 'text-red-500'}`}>
          {mockComparison < 0 ? <TrendingDown className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
          <span className="font-medium">{Math.abs(mockComparison)}%</span>
        </div>
      </div>
      
      <div className="w-full h-1.5 bg-surface rounded-full overflow-hidden border border-border">
        <div 
          className={`h-full ${percentUsed > 90 ? 'bg-red-500' : percentUsed > 75 ? 'bg-yellow-500' : 'bg-gold'}`}
          style={{ width: `${Math.min(percentUsed, 100)}%` }}
        />
      </div>
      <p className="text-xs text-secondary text-right">
        {percentUsed.toFixed(1)}% of {formatCurrency(budget, baseCurrency)} budget used
      </p>
    </Card>
  );
}
