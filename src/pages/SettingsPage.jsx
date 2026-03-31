import React from 'react';
import { useExpenseStore } from '../store/useExpenseStore';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Input } from '../components/UI/Input';
import { Database, Download, FileText, Target, Wallet } from 'lucide-react';

import { CURRENCIES } from '../utils/currencies';

export function SettingsPage() {
  const { budget, savingsGoal, setBudget, setSavingsGoal, addMockData, baseCurrency, setBaseCurrency } = useExpenseStore();

  return (
    <div className="flex flex-col gap-6">
      <header className="mb-2">
        <h1 className="text-2xl font-bold text-primary">Settings</h1>
        <p className="text-secondary text-sm">Customize tracker behavior</p>
      </header>

      <section className="space-y-3">
        <h3 className="text-sm font-medium text-secondary/60 uppercase tracking-wider ml-1">Localization</h3>
        <Card className="flex flex-col gap-2 relative">
          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-sm font-medium text-secondary">Base Currency</label>
            <select
              value={baseCurrency}
              onChange={(e) => setBaseCurrency(e.target.value)}
              className="app-input appearance-none"
            >
              {CURRENCIES.map(c => (
                <option key={c.code} value={c.code} className="dark:bg-[#121212] dark:text-white">
                  {c.code} - {c.name} ({c.symbol})
                </option>
              ))}
            </select>
          </div>
        </Card>
      </section>

      <section className="space-y-3">
        <h3 className="text-sm font-medium text-secondary/60 uppercase tracking-wider ml-1">Targets</h3>
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
        <h3 className="text-sm font-medium text-secondary/60 uppercase tracking-wider ml-1">Development</h3>
        <Card className="flex flex-col gap-2">
          <Button variant="secondary" className="justify-start" icon={Database} onClick={addMockData}>
            Inject Mock Transactions
          </Button>
          <Button variant="ghost" className="justify-start" icon={FileText}>
            View Raw State Data
          </Button>
        </Card>
      </section>
    </div>
  );
}
