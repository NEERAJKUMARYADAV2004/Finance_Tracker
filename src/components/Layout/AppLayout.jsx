import React from 'react';
import { Outlet } from 'react-router-dom';
import { BottomNav } from './BottomNav';
import { FloatingMic } from '../UI/FloatingMic';
import { AppLock } from '../../features/privacy/AppLock';
import { useAuthStore } from '../../store/useAuthStore';
import { ThemeToggle } from '../UI/ThemeToggle';
import { Sparkles } from 'lucide-react';

export function AppLayout() {
  const { isLocked, pinCode } = useAuthStore();

  // If there's a pin code and the app is locked, override the UI with AppLock
  if (pinCode && isLocked) {
    return <AppLock />;
  }

  return (
    <div className="min-h-screen bg-background text-primary">
      {/* App Header with Logo and Theme Toggle */}
      <header className="sticky top-0 z-40 max-w-md mx-auto px-4 pt-4 pb-2 bg-background/80 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-gold" />
            <h1 className="text-xl font-bold text-primary">AI Finance Tracker</h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-md mx-auto min-h-screen pb-20 relative px-4 pt-6">
        <Outlet />
      </main>

      {/* Global Elements */}
      <FloatingMic />
      <BottomNav />
    </div>
  );
}
