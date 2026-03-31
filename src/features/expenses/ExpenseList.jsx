import React, { useState } from 'react';
import { useExpenseStore } from '../../store/useExpenseStore';
import { Card } from '../../components/UI/Card';
import { Search, Filter, HelpCircle, Tag, Calendar, DollarSign, Trash2 } from 'lucide-react';
import { getCategoryIcon } from '../../utils/categoryIcons';
import { formatCurrency } from '../../utils/formatCurrency';

export function ExpenseList() {
  const { expenses, deleteExpense, baseCurrency } = useExpenseStore();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredExpenses = expenses.filter(exp => 
    (exp.merchant || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (exp.category || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-4">
      {/* Search & Filter Bar */}
      <div className="flex gap-2 mb-2">
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-secondary stroke-[1.5px]" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="app-input py-2.5 text-sm bg-transparent pl-10 pr-4"
          />
        </div>
        <button className="app-container w-11 flex items-center justify-center text-secondary hover:text-brand active:scale-95 transition-transform">
          <Filter className="w-5 h-5 stroke-[1.5px]" />
        </button>
      </div>

      {emptyState(filteredExpenses)}

      <div className="space-y-3">
        {filteredExpenses.map((exp) => {
          const Icon = getCategoryIcon(exp.category);
          return (
            <Card key={exp.id} className="p-4 group flex items-start gap-4 hover:border-gold/30 cursor-pointer border-border">
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 border border-gold/20 text-gold">
                <Icon className="w-6 h-6 stroke-[1.5px]" />
              </div>
              
              <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-semibold text-primary truncate pr-2">{exp.merchant || exp.category}</h3>
                <span className="font-bold text-primary">{formatCurrency(-Math.abs(exp.amount), baseCurrency)}</span>
              </div>
              
              <div className="flex items-center gap-3 text-xs text-secondary">
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(exp.date).toLocaleDateString()}</span>
                {exp.notes && <span className="truncate max-w-[120px]">&bull; {exp.notes}</span>}
              </div>
            </div>

            <button 
              onClick={(e) => { e.stopPropagation(); deleteExpense(exp.id); }}
              className="p-2 text-secondary/40 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-none"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </Card>
        )})}
      </div>
    </div>
  );
}

function emptyState(list) {
  if (list.length > 0) return null;
  return (
    <div className="py-12 text-center text-secondary flex flex-col items-center">
      <HelpCircle className="w-12 h-12 mb-3 text-secondary/40 stroke-[1.5px]" />
      <p>No transactions found.</p>
    </div>
  );
}
