import React from 'react';
import { cn } from '../../utils/cn';

export function Card({ children, className, onClick, ...props }) {
  return (
    <div 
      className={cn(
        "app-container p-4",
        onClick && "cursor-pointer hover:border-brand/50",
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
}
