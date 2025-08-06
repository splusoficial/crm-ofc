import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function AuthLoading() {
  const router = useRouter();
  const { email, new_user } = router.query;
  const [countdown, setCountdown] = useState(3);
  const [status, setStatus] = useState('Preparando sua conta...');

  useEffect(() => {
    if (email && new_user) {
      handleNewUserLogin();
    }
  }, [email, new_user]);

  const handleNewUserLogin = async () => {
    try {
      // Countdown visual para o usuário
      const countdownInterval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Aguarda 3 segundos e vai direto para o CRM
      setTimeout(() => {
        setStatus('Finalizando configuração...');

        // Salva dados do usuário no localStorage (nossa forma de "login")
        const userData = {
          email,
          loginMethod: 'magic_link',
          timestamp: new Date().toISOString(),
          isAuthenticated: true
        };
        localStorage.setItem('user', JSON.stringify(userData));

        setStatus('Redirecionando para o CRM...');

        // Redireciona para CRM com magic_login
        setTimeout(() => {
          router.push(`/crm?magic_login=${encodeURIComponent(email)}`);
        }, 500);

      }, 3000);

    } catch (err) {
      console.error('Erro no processo:', err);
      // Fallback: vai direto para CRM mesmo com erro
      const userData = {
        email,
        loginMethod: 'magic_fallback',
        isAuthenticated: true
      };
      localStorage.setItem('user', JSON.stringify(userData));
      router.push(`/crm?magic_login=${encodeURIComponent(email)}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center max-w-md mx-auto p-8">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-6"></div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Bem-vindo ao CRM!
        </h1>

        <p className="text-gray-600 mb-4">{status}</p>

        {countdown > 0 && (
          <div className="text-sm text-gray-500">
            Entrando em {countdown} segundos...
          </div>
        )}

        <div className="mt-6 text-xs text-gray-400">
          Sua conta foi criada com sucesso!
        </div>
      </div>
    </div>
  );
}