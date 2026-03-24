import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ROUTE_STORAGE_KEY = 'app_last_route';

export function useRoutePersistence() {
  const location = useLocation();
  const navigate = useNavigate();

  // Save the current route to localStorage whenever it changes
  useEffect(() => {
    // Prevent saving certain transient routes if needed, e.g. login pages
    // However, the instructions say "Restore the last visited page", "Do NOT redirect to dashboard if a previous route exists"
    localStorage.setItem(ROUTE_STORAGE_KEY, location.pathname + location.search);
  }, [location]);
}

// Helper to get initial route before React Router completely boots
export function getInitialRoute() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(ROUTE_STORAGE_KEY) || '/';
  }
  return '/';
}
