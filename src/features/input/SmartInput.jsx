import React, { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Card } from '../../components/UI/Card';
import { Input } from '../../components/UI/Input';

export function SmartInput({ onParsed }) {
  const [text, setText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    setIsProcessing(true);
    
    // Simulate AI parsing local delay
    setTimeout(() => {
      setIsProcessing(false);
      // Mock logic: Extracting number as amount, basic keyword for category
      const words = text.split(' ');
      const amountWord = words.find(w => w.includes('$') || !isNaN(w));
      const amount = amountWord ? parseFloat(amountWord.replace('$', '')) : 0;
      
      const lower = text.toLowerCase();
      let category = 'Other';
      if (lower.includes('coffee') || lower.includes('lunch') || lower.includes('dinner')) category = 'Food & Dining';
      if (lower.includes('uber') || lower.includes('gas') || lower.includes('train')) category = 'Transportation';

      onParsed({
        amount: amount || 0,
        category,
        merchant: words.find(w => w[0] === w[0].toUpperCase() && !w.includes('$')) || '',
        notes: text,
        date: new Date().toISOString().split('T')[0]
      });
      setText('');
    }, 600); // 600ms fake delay, but no visual animation, just instant state swap
  };

  return (
    <Card className="p-1 mb-4 border-gold/40 shadow-[0_0_15px_rgba(212,175,55,0.05)]">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <Sparkles className="w-5 h-5 ml-3 text-gold" />
        <input
          type="text"
          placeholder='e.g., "$12 for coffee at Starbucks"'
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isProcessing}
          className="flex-1 bg-transparent border-none text-gray-100 placeholder:text-gray-600 focus:outline-none py-3"
        />
        <button 
          type="submit" 
          disabled={!text.trim() || isProcessing}
          className="w-10 h-10 mr-1 rounded-xl bg-gold text-black flex items-center justify-center hover:bg-gold/90 disabled:opacity-50"
        >
          <ArrowRight className="w-5 h-5 stroke-[2px]" />
        </button>
      </form>
    </Card>
  );
}
