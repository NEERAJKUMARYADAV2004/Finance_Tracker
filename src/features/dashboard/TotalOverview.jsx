import React from 'react';
import { useExpenseStore } from '../../store/useExpenseStore';
import { Card } from '../../components/UI/Card';
import { TrendingDown, TrendingUp } from 'lucide-react';

export function TotalOverview() {
  const { getTotalSpending, budget } = useExpenseStore();
  const total = getTotalSpending();
  const percentUsed = budget > 0 ? (total / budget) * 100 : 0;
  
  // Static mock comparison
  const mockComparison = -2.4; 

  return (
    <Card className="flex flex-col gap-4 bg-card border-gold/20">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-400 text-sm font-medium mb-1">Total Spending (This Month)</p>
          <h2 className="text-4xl font-bold text-gray-100">${total.toFixed(2)}</h2>
        </div>
        <div className={`flex items-center gap-1 text-sm ${mockComparison < 0 ? 'text-green-400' : 'text-red-400'}`}>
          {mockComparison < 0 ? <TrendingDown className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
          <span className="font-medium">{Math.abs(mockComparison)}%</span>
        </div>
      </div>
      
      <div className="w-full h-1.5 bg-background rounded-full overflow-hidden border border-surface">
        <div 
          className={`h-full ${percentUsed > 90 ? 'bg-red-500' : percentUsed > 75 ? 'bg-yellow-500' : 'bg-gold'}`}
          style={{ width: `${Math.min(percentUsed, 100)}%` }}
        />
      </div>
      <p className="text-xs text-gray-500 text-right">
        {percentUsed.toFixed(1)}% of ${budget} budget used
      </p>
    </Card>
  );
}
