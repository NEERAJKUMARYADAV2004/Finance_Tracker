import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export const Input = forwardRef(({ 
  label, 
  icon: Icon, 
  error, 
  className, 
  containerClassName,
  ...props 
}, ref) => {
  return (
    <div className={cn("flex flex-col gap-1.5 w-full", containerClassName)}>
      {label && <label className="text-sm font-medium text-gray-400">{label}</label>}
      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3 text-gray-500 pointer-events-none">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full bg-surface border border-gray-800 rounded-xl px-4 py-3 text-gray-100 placeholder:text-gray-600 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold",
            Icon && "pl-11",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500",
            className
          )}
          {...props}
        />
      </div>
      {error && <span className="text-xs text-red-400">{error}</span>}
    </div>
  );
});

Input.displayName = 'Input';
