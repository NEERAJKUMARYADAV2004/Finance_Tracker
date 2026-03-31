import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useExpenseStore } from '../store/useExpenseStore';
import { ReceiptScanner } from '../features/input/ReceiptScanner';

export function ReceiptScannerPage() {
  const navigate = useNavigate();
  const { addExpense } = useExpenseStore();

  const handleExtracted = (data) => {
    addExpense(data);
    navigate('/');
  };

  return (
    <div className="flex flex-col gap-6">
      <header className="mb-2">
        <h1 className="text-2xl font-bold text-primary">Scan Receipt</h1>
        <p className="text-secondary text-sm">Offline optical character recognition simulation</p>
      </header>

      <ReceiptScanner onExtracted={handleExtracted} />
    </div>
  );
}
