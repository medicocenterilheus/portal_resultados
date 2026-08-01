import { useState, useEffect } from 'react';
import LoginScreen from './components/LoginScreen';
import ResultsDashboard from './components/ResultsDashboard';

export default function App() {
  // Simple state to simulate auth
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('token')) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsAuthenticated(true);
    }, 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-lg font-semibold text-slate-700">Carregando seus resultados...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {isAuthenticated ? (
        <ResultsDashboard onLogout={() => setIsAuthenticated(false)} />
      ) : (
        <LoginScreen onLogin={handleLogin} />
      )}
    </div>
  );
}
