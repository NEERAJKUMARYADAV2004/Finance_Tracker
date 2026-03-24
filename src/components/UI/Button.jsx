import React from 'react';
import { cn } from '../../utils/cn';

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className, 
  icon: Icon,
  disabled,
  ...props 
}) {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-xl select-none outline-none focus:ring-2 focus:ring-gold/50 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gold text-black hover:bg-gold/90",
    secondary: "bg-surface text-gray-200 hover:bg-surface/80 border border-transparent",
    outline: "bg-transparent text-gold border border-gold hover:bg-gold/10",
    ghost: "bg-transparent text-gray-400 hover:text-gold hover:bg-surface/50",
    danger: "bg-red-900/50 text-red-200 hover:bg-red-900/70 border border-red-800"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
    icon: "p-2"
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled}
      {...props}
    >
      {Icon && <Icon className={cn("w-5 h-5", children ? "mr-2" : "")} />}
      {children}
    </button>
  );
}
