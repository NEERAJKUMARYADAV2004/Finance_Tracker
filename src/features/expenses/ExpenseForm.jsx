import React, { useState } from 'react';
import { useExpenseStore } from '../../store/useExpenseStore';
import { Card } from '../../components/UI/Card';
import { Button } from '../../components/UI/Button';
import { Input } from '../../components/UI/Input';
import { DollarSign, Tag, Calendar, AlignLeft, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function ExpenseForm({ initialData = null, onSuccess }) {
  const { addExpense, updateExpense, categories, addCategory } = useExpenseStore();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    amount: initialData?.amount || '',
    category: initialData?.category || categories[0],
    date: initialData?.date || new Date().toISOString().split('T')[0],
    merchant: initialData?.merchant || '',
    notes: initialData?.notes || ''
  });

  const [customCategory, setCustomCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    let finalCategory = formData.category;

    if (finalCategory === 'Other' && customCategory.trim()) {
      finalCategory = customCategory.trim();
      addCategory(finalCategory); // Adds to global list so it's reusable
    }

    const payload = { ...formData, category: finalCategory };

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
    <Card className="max-w-md mx-auto p-5">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        <Input 
          label="Amount"
          type="number"
          step="0.01"
          placeholder="0.00"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          icon={DollarSign}
          required
        />

        <div className="flex flex-col gap-1.5 w-full">
          <label className="text-sm font-medium text-gray-400">Category</label>
          <div className="relative flex items-center">
            <Tag className="w-5 h-5 absolute left-3 text-gray-500 pointer-events-none stroke-[1.5px]" />
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full bg-surface border border-gray-800 rounded-xl pl-11 pr-4 py-3 text-gray-100 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold appearance-none"
              required
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
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
