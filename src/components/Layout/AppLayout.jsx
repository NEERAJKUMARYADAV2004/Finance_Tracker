import React from 'react';
import { Outlet } from 'react-router-dom';
import { BottomNav } from './BottomNav';
import { FloatingMic } from '../UI/FloatingMic';
import { AppLock } from '../../features/privacy/AppLock';
import { useAuthStore } from '../../store/useAuthStore';

export function AppLayout() {
  const { isLocked, pinCode } = useAuthStore();

  // If there's a pin code and the app is locked, override the UI with AppLock
  if (pinCode && isLocked) {
    return <AppLock />;
  }

  return (
    <div className="min-h-screen bg-background text-gray-200">
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
