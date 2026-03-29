import React, { useEffect, useState } from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Navigate,
  useLocation
} from 'react-router-dom';
console.log('App initialized');
import { AppLayout } from './components/Layout/AppLayout';
import { DashboardPage } from './pages/DashboardPage';
import { AddExpensePage } from './pages/AddExpensePage';
import { TransactionsPage } from './pages/TransactionsPage';
import { ReceiptScannerPage } from './pages/ReceiptScannerPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { SignInPage } from './pages/SignInPage';
import { useAuthStore } from './store/useAuthStore';
import { VoiceAssistant } from './features/input/VoiceAssistant';
import { useExpenseStore } from './store/useExpenseStore';

// The wrapper that intercepts routes and auth checks
function RouteController({ children }) {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    // Basic Route persistence if authenticated
    if (isAuthenticated) {
      if (location.pathname !== '/signin') {
        localStorage.setItem('app_last_route', location.pathname + location.search);
      }
    }
  }, [location, isAuthenticated]);

  if (!isAuthenticated && location.pathname !== '/signin') {
    return <Navigate to="/signin" replace />;
  }

  if (isAuthenticated && location.pathname === '/signin') {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default function App() {
  const { addExpense } = useExpenseStore();
  
  // Hydrator for route persistence
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('app_last_route');
    setInitialRoute(saved || '/');
  }, []);

  if (!initialRoute) return null; // Avoid render flicker before routing initializes

  return (
    <>
      <Router>
        <RouteController>
          <Routes>
            <Route path="/signin" element={<SignInPage />} />
            
            <Route element={<AppLayout />}>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/scan" element={<ReceiptScannerPage />} />
              <Route path="/add" element={<AddExpensePage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/transactions" element={<TransactionsPage />} />
            </Route>
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </RouteController>
      </Router>

      <VoiceAssistant onConfirm={(expense) => addExpense(expense)} />
    </>
  );
}
