import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../lib/supabase';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        console.log('SIGNED_IN, session:', session);

        // Salva os dados do usuário no localStorage
        localStorage.setItem('user', JSON.stringify(session.user));

        // Redireciona para a página de CRM após o login
        router.push('/crm');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
        <p className="text-gray-600">Autenticando...</p>
        <p className="text-sm text-gray-400 mt-2">Você será redirecionado em instantes.</p>
      </div>
    </div>
  );
}