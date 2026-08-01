import React, { useState } from 'react';
import { Eye, EyeOff, Activity } from 'lucide-react';

export default function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [showCpf, setShowCpf] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // Hardcoded credentials for prototype
    const TEST_EMAIL = 'johnatan.ios@hotmail.com';
    const TEST_CPF = '06406311507';

    if (email === TEST_EMAIL && cpf === TEST_CPF) {
        onLogin();
    } else {
      setError('Falha no login. Verifique suas credenciais.');
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-4 relative"
      style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop")' }}
    >
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]"></div>
      
      <div className="w-full max-w-md p-6 sm:p-8 bg-white/95 backdrop-blur-xl rounded-3xl border border-white/50 shadow-2xl relative z-10">
        <div className="mb-6 sm:mb-8 text-center flex flex-col items-center">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 mb-4">
            <Activity className="text-white" size={28} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">MÉDICO CENTER</h1>
          <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1 sm:mt-2 uppercase tracking-widest">Portal de Resultados</p>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl mb-6 text-center border border-red-100 font-medium">
            {error}
          </div>
        )}
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-900"
              placeholder="E-mail"
              required
            />
          </div>
          <div className="relative">
            <input
              type={showCpf ? 'text' : 'password'}
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              className="w-full p-3.5 pr-12 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-900"
              placeholder="CPF"
              required
            />
            <button
              type="button"
              onClick={() => setShowCpf(!showCpf)}
              className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-600 transition-colors"
            >
              {showCpf ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <button 
            type="submit" 
            className="w-full p-3.5 mt-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 active:bg-blue-800 transition-all font-semibold shadow-lg shadow-blue-600/30"
          >
            Acessar Exames
          </button>
        </form>
        
        <div className="mt-8 text-center text-xs text-slate-500">
          <p>Dúvidas? Entre em contato com a nossa recepção.</p>
        </div>
      </div>
    </div>
  );
}
