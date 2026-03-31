import React, { useEffect, useState } from 'react';
import { Mic, X, Check, MoreHorizontal } from 'lucide-react';
import { useUIStore } from '../../store/useUIStore';
import { useExpenseStore } from '../../store/useExpenseStore';
import { formatCurrency } from '../../utils/formatCurrency';
import { Card } from '../../components/UI/Card';
import { Button } from '../../components/UI/Button';

export function VoiceAssistant({ onConfirm }) {
  const { isVoiceListening, setVoiceListening } = useUIStore();
  const [transcript, setTranscript] = useState('');
  const [parsedCard, setParsedCard] = useState(null);

  // Mock Voice Engine effect
  useEffect(() => {
    if (isVoiceListening) {
      setTranscript('Listening for commands...');
      setParsedCard(null);
      
      const timer = setTimeout(() => {
        setTranscript('I spent thirty-five dollars on gas today');
        const parsed = {
          amount: 35.00,
          merchant: 'Gas Station',
          category: 'Transportation',
          date: new Date().toISOString().split('T')[0]
        };
        setTimeout(() => {
          setParsedCard(parsed);
          setVoiceListening(false);
        }, 800);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isVoiceListening, setVoiceListening]);

  if (!isVoiceListening && !parsedCard && !transcript) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm flex items-end justify-center pb-24 px-4">
      <Card className="w-full max-w-sm bg-surface border-gold/50 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] p-5">
        
        <div className="flex justify-between items-center mb-4 border-b border-border pb-2">
          <div className="flex items-center gap-2 text-gold">
            <Mic className="w-5 h-5 stroke-[2px]" />
            <span className="font-medium text-sm">Offline Voice Engine</span>
          </div>
          <button 
            onClick={() => {
              setVoiceListening(false);
              setTranscript('');
              setParsedCard(null);
            }} 
            className="text-secondary hover:text-primary"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Transcript Area */}
        <div className="min-h-[60px] flex items-center justify-center text-center">
          {(!parsedCard && isVoiceListening) && (
            <p className="text-secondary italic">"{transcript}"</p>
          )}
          {parsedCard && (
            <p className="text-primary text-lg">"{transcript}"</p>
          )}
        </div>

        {/* Parsed Result Card */}
        {parsedCard && (
          <div className="mt-4 bg-background rounded-xl p-4 border border-border">
            <p className="text-xs text-secondary/60 uppercase tracking-wider mb-2">Parsed Intent</p>
            <div className="flex justify-between items-center text-primary">
              <span className="font-semibold">{parsedCard.category}</span>
              <span className="font-bold text-lg">{formatCurrency(parsedCard.amount, useExpenseStore.getState().baseCurrency)}</span>
            </div>
            
            <div className="flex gap-2 mt-4">
              <Button 
                variant="primary" 
                size="sm" 
                className="flex-1" 
                icon={Check}
                onClick={() => {
                  onConfirm(parsedCard);
                  setTranscript('');
                  setParsedCard(null);
                }}
              >
                Save
              </Button>
              <Button variant="secondary" size="sm" icon={MoreHorizontal}>
                Edit
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
