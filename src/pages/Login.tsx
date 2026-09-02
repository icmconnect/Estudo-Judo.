import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';

export function Login() {
  const navigate = useNavigate();
  const { user, signInWithGoogle } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/app');
    }
  }, [user, navigate]);

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      navigate('/app');
    } catch (error) {
      console.error('Erro no login:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-4 font-sans selection:bg-amber-500 selection:text-zinc-950">
      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-zinc-200 dark:border-zinc-800 p-8 sm:p-12 text-center"
        aria-labelledby="login-title"
      >
        <div className="flex justify-center mb-8">
          <Logo size="lg" showSubtitle={false} />
        </div>
        
        <h1 id="login-title" className="text-2xl font-bold text-zinc-900 dark:text-white mb-2 font-['Bebas_Neue',sans-serif] tracking-wide text-3xl">
          Acesse o Dojo Digital
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8 text-sm">
          Acesse o material didático oficial do Judô Kodokan e treinamentos digitais.
        </p>

        <div className="space-y-4">
          <button 
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-800 dark:text-zinc-100 font-bold hover:bg-zinc-50 dark:hover:bg-zinc-700/50 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 cursor-pointer"
            aria-label="Acessar com Google"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continuar com Google
          </button>

          <button 
            type="button"
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 rounded-xl font-bold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 cursor-pointer"
            aria-label="Acessar com Apple"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.34-.85 3.73-.78 1.44.13 2.53.69 3.2 1.7-2.61 1.63-2.12 5.09.61 6.13-.67 1.81-1.74 3.75-2.62 5.12zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
            </svg>
            Continuar com Apple
          </button>
        </div>
        
        <p className="mt-8 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
          Dojo Digital • Plataforma Oficial de Ensino Kodokan
        </p>
      </motion.main>
    </div>
  );
}
