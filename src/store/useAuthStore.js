import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null, // { name, email, password }
      isAuthenticated: false,
      pinCode: null, // For app lock
      isLocked: false,

      // Actions
      register: (name, email, password) => set(() => ({ 
        user: { name, email, password }, 
        isAuthenticated: true 
      })),
      
      signIn: () => set({ isAuthenticated: true, isLocked: false }),
      
      signOut: () => set({ 
        isAuthenticated: false, 
        isLocked: false 
      }),
      
      deleteAccount: () => set({
        user: null,
        isAuthenticated: false,
        pinCode: null,
        isLocked: false
      }),

      setPinCode: (pin) => set({ pinCode: pin }),
      
      lockApp: () => set((state) => ({ 
        isLocked: state.pinCode ? true : false 
      })),
      
      unlockApp: () => set({ isLocked: false }),
    }),
    {
      name: 'auth-storage', // key in localStorage
    }
  )
);
