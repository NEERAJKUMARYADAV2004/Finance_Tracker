import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialCategories = [
  'Housing', 'Utilities', 'Food', 'Transportation', 'Healthcare',
  'Debt Payments', 'Childcare', 'Entertainment', 'Dining Out',
  'Personal Care', 'Clothing & Accessories', 'Hobbies & Activities',
  'Travel & Vacations', 'Other'
];

export const useExpenseStore = create(
  persist(
    (set, get) => ({
      expenses: [],
      categories: initialCategories,
      budget: 5000,
      savingsGoal: 10000,
      baseCurrency: 'USD',

      setBaseCurrency: (currencyCode) => set({ baseCurrency: currencyCode }),

      addExpense: (expense) => set((state) => ({
        expenses: [{ ...expense, id: crypto.randomUUID(), createdAt: Date.now() }, ...state.expenses]
      })),

      updateExpense: (id, updatedExpense) => set((state) => ({
        expenses: state.expenses.map(e => e.id === id ? { ...e, ...updatedExpense } : e)
      })),

      deleteExpense: (id) => set((state) => ({
        expenses: state.expenses.filter(e => e.id !== id)
      })),

      addCategory: (category) => set((state) => {
        if (!state.categories.includes(category)) {
           return { categories: [...state.categories, category] };
        }
        return state;
      }),

      setBudget: (budget) => set({ budget }),
      setSavingsGoal: (savingsGoal) => set({ savingsGoal }),

      // Derived state getters
      getTotalSpending: () => {
        return get().expenses.reduce((total, exp) => total + Number(exp.amount || 0), 0);
      },
      
      // Real offline-first mocking
      addMockData: () => set({
        expenses: [
          { id: crypto.randomUUID(), amount: 15.50, category: 'Dining Out', date: new Date().toISOString().split('T')[0], merchant: 'Coffee Shop', notes: 'Morning coffee' },
          { id: crypto.randomUUID(), amount: 120.00, category: 'Utilities', date: new Date().toISOString().split('T')[0], merchant: 'Electric Co', notes: 'Monthly bill' },
          { id: crypto.randomUUID(), amount: 89.99, category: 'Clothing & Accessories', date: new Date(Date.now() - 86400000).toISOString().split('T')[0], merchant: 'Online Store', notes: 'Shoes' },
        ]
      })
    }),
    {
      name: 'expense-storage', // saves to local storage
      merge: (persistedState, currentState) => {
        // Automatically inject new hardcoded categories into the saved offline storage 
        const mergedCategories = Array.from(
          new Set([...currentState.categories, ...(persistedState.categories || [])])
        );
        return {
          ...currentState,
          ...persistedState,
          categories: mergedCategories
        };
      }
    }
  )
);
