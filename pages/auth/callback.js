import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../lib/supabase';

export default function AuthCallback() {
  const router = useRouter();
  const { email, auto_login } = router.query;

  useEffect(() => {
    if (email && auto_login) {
      handleAutoLogin();
    }
  }, [email, auto_login]);

  const handleAutoLogin = async () => {
    try {
      console.log('[callback] Fazendo login automático para:', email);
      
      // Faz login com OTP (magic link)
      const { data, error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          shouldCreateUser: false,
          emailRedirectTo: `${window.location.origin}/crm`
        }
      });

      if (error) {
        console.error('[callback] Erro no login:', error);
        router.push('/login?error=auto_login_failed');
        return;
      }

      // Aguarda um pouco e redireciona
      setTimeout(() => {
        router.push('/crm');
      }, 2000);

    } catch (err) {
      console.error('[callback] Erro geral:', err);
      router.push('/login?error=callback_failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
        <p className="text-gray-600">Fazendo login automático...</p>
        <p className="text-sm text-gray-400 mt-2">Você será redirecionado em instantes</p>
      </div>
    </div>
  );
}