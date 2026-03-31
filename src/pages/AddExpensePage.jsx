import React from 'react';
import { ExpenseForm } from '../features/expenses/ExpenseForm';
import { SmartInput } from '../features/input/SmartInput';
import { useNavigate } from 'react-router-dom';
import { useExpenseStore } from '../store/useExpenseStore';
import { VoiceAssistant } from '../features/input/VoiceAssistant';

export function AddExpensePage() {
  const navigate = useNavigate();
  const { addExpense } = useExpenseStore();

  const handleSmartParsed = (expenseData) => {
    addExpense(expenseData);
    navigate('/'); // Back to dashboard instantly
  };

  return (
    <>
      <VoiceAssistant onConfirm={handleSmartParsed} />
      <div className="flex flex-col gap-6">
        <header className="mb-2">
          <h1 className="text-2xl font-bold text-primary">Add Transaction</h1>
          <p className="text-secondary text-sm">Log an expense manually or use AI parsing</p>
        </header>

        <SmartInput onParsed={handleSmartParsed} />
        
        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-surface"></div>
          <span className="flex-shrink-0 mx-4 text-gray-600 text-sm">OR MANUALLY</span>
          <div className="flex-grow border-t border-surface"></div>
        </div>

        <ExpenseForm />
      </div>
    </>
  );
}
