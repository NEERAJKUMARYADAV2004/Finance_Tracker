import React, { useState, useEffect } from 'react';
import { useExpenseStore } from '../../store/useExpenseStore';
import { Card } from '../../components/UI/Card';
import { Button } from '../../components/UI/Button';
import { Input } from '../../components/UI/Input';
import { Tag, Calendar, AlignLeft, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CURRENCIES, getCurrencyByCode } from '../../utils/currencies';

export function ExpenseForm({ initialData = null, onSuccess }) {
  const { addExpense, updateExpense, categories, addCategory, baseCurrency } = useExpenseStore();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    amount: initialData?.originalAmount || initialData?.amount || '',
    category: initialData?.category || categories[0],
    date: initialData?.date || new Date().toISOString().split('T')[0],
    merchant: initialData?.merchant || '',
    notes: initialData?.notes || ''
  });

  const [customCategory, setCustomCategory] = useState('');
  const [transactionCurrency, setTransactionCurrency] = useState(initialData?.originalCurrency || baseCurrency);
  const [exchangeRate, setExchangeRate] = useState(initialData?.exchangeRate || 1);

  // Auto-reset exchange rate if they switch back to base
  useEffect(() => {
    if (transactionCurrency === baseCurrency) {
      setExchangeRate(1);
    }
  }, [transactionCurrency, baseCurrency]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let finalCategory = formData.category;

    if (finalCategory === 'Other' && customCategory.trim()) {
      finalCategory = customCategory.trim();
      addCategory(finalCategory); // Adds to global list so it's reusable
    }

    let finalAmount = Number(formData.amount);
    if (transactionCurrency !== baseCurrency) {
      finalAmount = finalAmount * Number(exchangeRate);
    }

    const payload = { 
      ...formData, 
      category: finalCategory,
      amount: finalAmount,
      originalAmount: Number(formData.amount),
      originalCurrency: transactionCurrency,
      exchangeRate: Number(exchangeRate)
    };

    if (initialData?.id) {
      updateExpense(initialData.id, payload);
    } else {
      addExpense(payload);
    }
    if (onSuccess) {
      onSuccess();
    } else {
      navigate('/');
    }
  };

  return (
    <Card className="max-w-full w-full px-4 mx-auto border-border">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        <div className="flex flex-col gap-1.5 w-full">
          <label className="text-sm font-medium text-secondary">Amount & Currency</label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-medium">
                {getCurrencyByCode(transactionCurrency)?.symbol}
              </span>
              <input 
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="app-input pl-10"
                required
              />
            </div>
            <select
              value={transactionCurrency}
              onChange={(e) => setTransactionCurrency(e.target.value)}
              className="app-input w-28 appearance-none text-center px-0"
            >
              {CURRENCIES.map(c => (
                <option key={c.code} value={c.code} className="dark:bg-[#121212] dark:text-white bg-white text-black">
                  {c.code}
                </option>
              ))}
            </select>
          </div>
        </div>

        {transactionCurrency !== baseCurrency && (
          <Input 
            label={`Exchange Rate (1 ${transactionCurrency} = ? ${baseCurrency})`}
            type="number"
            step="0.0001"
            placeholder="e.g. 1.09"
            value={exchangeRate}
            onChange={(e) => setExchangeRate(e.target.value)}
            required
          />
        )}

        <div className="flex flex-col gap-1.5 w-full">
          <label className="text-sm font-medium text-secondary">Category</label>
          <div className="relative flex items-center text-primary">
            <Tag className="w-5 h-5 absolute left-3 text-secondary pointer-events-none stroke-[1.5px]" />
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="app-input pl-11 appearance-none"
              required
            >
              {categories.map(cat => (
                <option key={cat} value={cat} className="dropdown-item dark:bg-zinc-900 dark:text-white">{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {formData.category === 'Other' && (
          <Input 
            label="Write Custom Category"
            placeholder="e.g., Pet Supplies"
            value={customCategory}
            onChange={(e) => setCustomCategory(e.target.value)}
            icon={Tag}
            required
          />
        )}

        <Input 
          label="Date"
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          icon={Calendar}
          required
        />

        <Input 
          label="Merchant"
          placeholder="e.g., Starbucks"
          value={formData.merchant}
          onChange={(e) => setFormData({ ...formData, merchant: e.target.value })}
          icon={Building2}
        />

        <Input 
          label="Notes (Optional)"
          placeholder="Any extra details..."
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          icon={AlignLeft}
        />

        <div className="mt-4 flex gap-3">
          <Button type="button" variant="secondary" className="flex-1" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" className="flex-1">
            {initialData ? 'Update' : 'Save'} Expense
          </Button>
        </div>

      </form>
    </Card>
  );
}
