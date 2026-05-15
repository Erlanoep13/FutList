import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Estado de visibilidade
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await api.post('/auth/login', { email, password });
      const { token } = response.data;

      localStorage.setItem('@FutList:token', token);
      navigate('/racha');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao conectar no servidor.');
    }
  };

  return (
    <div className="min-h-screen bg-futlist-dark text-futlist-text flex justify-center items-center p-4">
      <div className="w-full max-w-md bg-futlist-card rounded-2xl p-8 shadow-2xl border border-gray-800">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-futlist-green mb-2">FutList⚽</h1>
          <p className="text-futlist-muted">Feito na inteção de acabar com o racha</p>
        </header>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          {error && (
            <div className="bg-futlist-red/10 border border-futlist-red text-futlist-red p-3 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-futlist-muted mb-1">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-futlist-dark border border-gray-700 rounded-xl p-3 text-futlist-text focus:outline-none focus:border-futlist-green transition-colors"
              placeholder="racha@gmail.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-futlist-muted mb-1">Senha</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                // O pr-12 garante que o texto não fique por baixo do ícone
                className="w-full bg-futlist-dark border border-gray-700 rounded-xl p-3 pr-12 text-futlist-text focus:outline-none focus:border-futlist-green transition-colors"
                placeholder="********"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-futlist-muted hover:text-futlist-text p-1 transition-colors focus:outline-none"
                title={showPassword ? "Ocultar senha" : "Mostrar senha"}
              >
                {showPassword ? (
                  // Ícone de Olho Fechado (Ocultar)
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  // Ícone de Olho Aberto (Mostrar)
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-futlist-green hover:bg-emerald-500 text-futlist-dark font-bold py-4 rounded-xl transition-colors mt-4"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}