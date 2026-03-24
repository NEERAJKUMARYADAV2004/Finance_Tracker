import { 
  Home, Zap, ShoppingCart, Car, HeartPulse, CreditCard, Baby,
  Gamepad2, Utensils, Smile, Shirt, Palette, Plane, HelpCircle,
  ShoppingBag, Coffee
} from 'lucide-react';

export const categoryIcons = {
  'Housing': Home,
  'Utilities': Zap,
  'Food': ShoppingCart,
  'Transportation': Car,
  'Healthcare': HeartPulse,
  'Debt Payments': CreditCard,
  'Childcare': Baby,
  'Entertainment': Gamepad2,
  'Dining Out': Utensils,
  'Personal Care': Smile,
  'Clothing & Accessories': Shirt,
  'Hobbies & Activities': Palette,
  'Travel & Vacations': Plane,
  'Other': HelpCircle
};

export const getCategoryIcon = (category) => {
  const legacyMaps = {
    'Food & Dining': Coffee,
    'Shopping': ShoppingBag,
    'Bills & Utilities': Zap,
    'Groceries': ShoppingCart,
  };
  
  return categoryIcons[category] || legacyMaps[category] || HelpCircle;
};
