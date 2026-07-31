import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

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
    <div className="min-h-screen flex items-center justify-center bg-[#f0f4f8] bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] p-4">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl border border-slate-100 shadow-xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">MEDICO CENTER LTDA</h1>
          <p className="text-base text-slate-500 mt-2">Portal de Resultados</p>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
            placeholder="E-mail"
            required
          />
          <div className="relative mb-4">
            <input
              type={showCpf ? 'text' : 'password'}
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              className="w-full p-3 pr-12 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="CPF"
              required
            />
            <button
              type="button"
              onClick={() => setShowCpf(!showCpf)}
              className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
            >
              {showCpf ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <button type="submit" className="w-full p-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
