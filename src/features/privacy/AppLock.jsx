import React, { useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { Lock } from 'lucide-react';

export function AppLock() {
  const { pinCode, unlockApp } = useAuthStore();
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  const handleKeyPress = (num) => {
    if (input.length < 4) {
      const newVal = input + num;
      setInput(newVal);
      setError(false);

      if (newVal.length === 4) {
        if (newVal === pinCode) {
          unlockApp();
        } else {
          setError(true);
          setInput('');
        }
      }
    }
  };

  const handleBackspace = () => {
    setInput(prev => prev.slice(0, -1));
    setError(false);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center px-6">
      <Lock className="w-12 h-12 text-gold mb-6 stroke-[1.5px]" />
      <h1 className="text-2xl font-bold text-gray-100 mb-2">App Locked</h1>
      <p className="text-gray-400 mb-8 text-center text-sm">
        Enter your 4-digit PIN to access your offline data
      </p>

      {/* PIN Dots */}
      <div className="flex gap-4 mb-12">
        {[0, 1, 2, 3].map((_, i) => (
          <div 
            key={i} 
            className={`w-4 h-4 rounded-full border ${
              i < input.length 
                ? 'bg-gold border-gold' 
                : error 
                  ? 'border-red-500' 
                  : 'border-surface'
            }`} 
          />
        ))}
      </div>

      {error && <p className="text-red-500 text-sm mb-4">Incorrect PIN. Try again.</p>}

      {/* Keypad */}
      <div className="grid grid-cols-3 gap-6 max-w-[280px] w-full">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            onClick={() => handleKeyPress(num.toString())}
            className="w-16 h-16 rounded-full bg-surface text-2xl font-medium flex items-center justify-center hover:bg-surface/80 active:bg-surface/50 mx-auto"
          >
            {num}
          </button>
        ))}
        <div /> {/* Empty slot */}
        <button
          onClick={() => handleKeyPress('0')}
          className="w-16 h-16 rounded-full bg-surface text-2xl font-medium flex items-center justify-center hover:bg-surface/80 active:bg-surface/50 mx-auto"
        >
          0
        </button>
        <button
          onClick={handleBackspace}
          className="w-16 h-16 rounded-full bg-transparent text-gray-400 flex items-center justify-center hover:text-gray-200 active:text-gold mx-auto"
        >
          DEL
        </button>
      </div>
      
      <div className="mt-12 text-xs text-gray-600 flex items-center justify-center gap-1">
        <Lock className="w-3 h-3" />
        <span>Data is stored locally</span>
      </div>
    </div>
  );
}
