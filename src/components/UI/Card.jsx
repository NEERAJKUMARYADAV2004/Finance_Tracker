import React from 'react';
import { cn } from '../../utils/cn';

export function Card({ children, className, onClick, ...props }) {
  return (
    <div 
      className={cn(
        "bg-card rounded-2xl border border-surface shadow-md p-4",
        onClick && "cursor-pointer hover:border-gold/50",
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
}
