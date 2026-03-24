import React from 'react';
import { useExpenseStore } from '../store/useExpenseStore';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Input } from '../components/UI/Input';
import { Database, Download, FileText, Target, Wallet } from 'lucide-react';

export function SettingsPage() {
  const { budget, savingsGoal, setBudget, setSavingsGoal, addMockData } = useExpenseStore();

  return (
    <div className="flex flex-col gap-6">
      <header className="mb-2">
        <h1 className="text-2xl font-bold text-gray-100">Settings</h1>
        <p className="text-gray-400 text-sm">Customize tracker behavior</p>
      </header>

      <section className="space-y-3">
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider ml-1">Targets</h3>
        <Card className="flex flex-col gap-4">
          <Input 
            label="Monthly Budget Limit"
            type="number" 
            value={budget} 
            onChange={(e) => setBudget(Number(e.target.value))} 
            icon={Wallet} 
          />
          <Input 
            label="Savings Goal" 
            type="number" 
            value={savingsGoal} 
            onChange={(e) => setSavingsGoal(Number(e.target.value))} 
            icon={Target} 
          />
        </Card>
      </section>

      <section className="space-y-3">
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider ml-1">Development</h3>
        <Card className="flex flex-col gap-2">
          <Button variant="secondary" className="justify-start text-gray-300" icon={Database} onClick={addMockData}>
            Inject Mock Transactions
          </Button>
          <Button variant="ghost" className="justify-start text-gray-400" icon={FileText}>
            View Raw State Data
          </Button>
        </Card>
      </section>
    </div>
  );
}
