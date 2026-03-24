import React from 'react';
import { Mic } from 'lucide-react';
import { useUIStore } from '../../store/useUIStore';
import { cn } from '../../utils/cn';

export function FloatingMic() {
  const { isVoiceListening, setVoiceListening } = useUIStore();

  const toggleListening = () => {
    setVoiceListening(!isVoiceListening);
  };

  return (
    <button
      onClick={toggleListening}
      className={cn(
        "fixed bottom-20 right-4 w-14 h-14 rounded-full flex items-center justify-center shadow-lg border outline-none",
        isVoiceListening 
          ? "bg-red-900/40 border-red-500 text-red-500 shadow-red-900/50" 
          : "bg-surface border-gold text-gold hover:bg-surface/80 shadow-black/50"
      )}
      aria-label="Voice Input"
    >
      <Mic className={cn("w-6 h-6", isVoiceListening ? "stroke-[2.5px]" : "stroke-[1.5px]")} />
    </button>
  );
}
