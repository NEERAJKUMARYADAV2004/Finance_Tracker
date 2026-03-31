import { 
  Home, Zap, ShoppingCart, Car, HeartPulse, CreditCard, Baby,
  Gamepad2, Utensils, Smile, Shirt, Palette, Plane, HelpCircle,
  ShoppingBag, Coffee, Tag
} from 'lucide-react';

export const categoryToIcon = {
  'Housing': Home,
  'Utilities': Zap,
  'Food': ShoppingCart,
  'Food & Beverages': Coffee,
  'Transportation': Car,
  'Healthcare': HeartPulse,
  'Debt Payments': CreditCard,
  'Childcare': Baby,
  'Entertainment': Gamepad2,
  'Dining Out': Utensils,
  'Personal Care': Smile,
  'Shopping': ShoppingBag,
  'Clothing & Accessories': Shirt,
  'Hobbies & Activities': Palette,
  'Travel & Vacations': Plane,
  'Other': Tag
};

export const getCategoryIcon = (category) => {
  const legacyMaps = {
    'Food & Dining': Coffee,
    'Shopping': ShoppingBag,
    'Bills & Utilities': Zap,
    'Groceries': ShoppingCart,
  };
  
  return categoryToIcon[category] || legacyMaps[category] || Tag;
};
