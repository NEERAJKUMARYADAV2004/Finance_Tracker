import React, { useState } from 'react';
import { Scan, Image as ImageIcon, Check } from 'lucide-react';
import { Card } from '../../components/UI/Card';
import { Button } from '../../components/UI/Button';

export function ReceiptScanner({ onExtracted }) {
  const [state, setState] = useState('idle'); // idle | scanning | done

  const handleSimulateScan = () => {
    setState('scanning');
    
    // Simulate instantaneous optical extraction mock without animations
    setTimeout(() => {
      setState('done');
      onExtracted({
        amount: 45.99,
        merchant: 'Whole Foods Market',
        date: new Date().toISOString().split('T')[0],
        category: 'Food & Dining',
        notes: 'Receipt scan mock'
      });
    }, 500);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Viewfinder Mockup */}
      <Card className="aspect-[3/4] w-full bg-black border-2 border-surface flex flex-col items-center justify-center relative overflow-hidden">
        {state === 'idle' && (
          <>
            <div className="absolute inset-8 border-2 border-dashed border-gray-600 rounded-xl" />
            <Scan className="w-12 h-12 text-gray-500 mb-4 stroke-[1px]" />
            <p className="text-gray-400 text-sm">Align receipt within frame</p>
          </>
        )}
        
        {state === 'scanning' && (
          <div className="text-gold flex flex-col items-center gap-2">
            <Scan className="w-12 h-12 stroke-[2px]" />
            <p className="font-medium animate-none">Extracting local data...</p>
          </div>
        )}

        {state === 'done' && (
          <div className="text-green-500 flex flex-col items-center gap-2">
            <Check className="w-12 h-12 stroke-[2px]" />
            <p className="font-medium">Data extraction complete</p>
          </div>
        )}
      </Card>

      <div className="flex gap-4">
        <Button 
          variant="secondary" 
          icon={ImageIcon} 
          className="flex-1"
          disabled={state === 'scanning'}
        >
          Upload
        </Button>
        <Button 
          variant="primary" 
          icon={Scan} 
          className="flex-1"
          onClick={handleSimulateScan}
          disabled={state !== 'idle'}
        >
          Capture
        </Button>
      </div>
    </div>
  );
}
