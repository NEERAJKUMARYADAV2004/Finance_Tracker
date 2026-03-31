import React, { useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useUIStore } from '../../store/useUIStore';

export function ThemeToggle() {
  const { theme, toggleTheme } = useUIStore();

  // Ensure theme is applied to document on mount
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-surface hover:bg-surface/80 transition-colors border border-border"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-gold" />
      ) : (
        <Moon className="w-5 h-5 text-gold" />
      )}
    </button>
  );
}
