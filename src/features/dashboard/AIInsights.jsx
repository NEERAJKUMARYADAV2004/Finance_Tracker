import React from 'react';
import { Card } from '../../components/UI/Card';
import { Sparkles } from 'lucide-react';

export function AIInsights() {
  // Static mock insight text showcasing local AI capabilities
  return (
    <Card className="bg-card border-gold/30 p-4 flex items-start gap-4">
      <div className="pt-1">
        <Sparkles className="w-5 h-5 text-gold" />
      </div>
      <div>
        <h4 className="text-sm font-semibold text-gold mb-1">AI Assistant Insight</h4>
        <p className="text-sm text-secondary leading-relaxed">
          Based on your recent history, your "Food & Dining" spending is trending 12% higher this week. Consider packing lunch for the next two days to stay under budget.
        </p>
      </div>
    </Card>
  );
}
