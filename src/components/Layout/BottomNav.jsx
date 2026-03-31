import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, Scan, Settings, User } from 'lucide-react';
import { cn } from '../../utils/cn';

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Home', icon: LayoutDashboard, path: '/' },
    { label: 'Scan', icon: Scan, path: '/scan' },
    { label: 'Add', icon: PlusCircle, path: '/add' },
    { label: 'Profile', icon: User, path: '/profile' },
    { label: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <nav className="fixed bottom-0 w-full bg-background/80 backdrop-blur-xl border-t border-white/5 pb-safe pt-2 px-4 z-50">
      <div className="max-w-md mx-auto flex justify-between items-center h-14">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                "flex flex-col items-center justify-center w-16 h-full gap-1 text-xs select-none",
                isActive ? "text-gold font-medium" : "text-secondary hover:text-primary"
              )}
            >
              <Icon className={cn("w-6 h-6", isActive ? "stroke-[2.5px]" : "stroke-[1.5px]")} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
