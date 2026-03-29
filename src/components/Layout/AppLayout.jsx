import React from 'react';
import { Outlet } from 'react-router-dom';
import { BottomNav } from './BottomNav';
import { FloatingMic } from '../UI/FloatingMic';
import { AppLock } from '../../features/privacy/AppLock';
import { useAuthStore } from '../../store/useAuthStore';
import { Sparkles } from 'lucide-react';

export function AppLayout() {
  const { isLocked, pinCode } = useAuthStore();

  // If there's a pin code and the app is locked, override the UI with AppLock
  if (pinCode && isLocked) {
    return <AppLock />;
  }

  return (
    <div className="min-h-screen bg-background text-gray-200">
      {/* App Header with Logo */}
      <header className="sticky top-0 z-40 max-w-md mx-auto px-4 pt-4 pb-2 bg-background/95 backdrop-blur-md border-b border-surface">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-gold" />
          <h1 className="text-xl font-bold text-gray-100">AI Finance Tracker</h1>
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
