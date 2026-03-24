import { create } from 'zustand';

export const useUIStore = create((set) => ({
  activeTab: 'dashboard',
  setActiveTab: (tab) => set({ activeTab: tab }),

  // Smart Search / AI assistant global states
  isAssistantOpen: false,
  toggleAssistant: () => set((state) => ({ isAssistantOpen: !state.isAssistantOpen })),
  
  isVoiceListening: false,
  setVoiceListening: (listening) => set({ isVoiceListening: listening }),
  
  // Generic App UI state
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
