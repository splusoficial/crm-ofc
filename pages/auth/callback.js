import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../lib/supabase';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN') {
        console.log('SIGNED_IN, session:', session);

        const user = session?.user;
        const { name, wh_id } = user?.user_metadata || {};

        // Se o usuário é novo e tem metadados, atualize o perfil
        if (user && name && wh_id) {
          try {
            const response = await fetch('/api/update-user', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.access_token}`,
              },
              body: JSON.stringify({ name, wh_id }),
            });

            if (!response.ok) {
              const errorData = await response.json();
              console.error('Failed to update user profile:', errorData);
            }
          } catch (error) {
            console.error('Error calling update-user API:', error);
          }
        }

        // Redireciona para a página principal do app
        router.push('/crm');
      }
    });

    // Cleanup a subscription quando o componente é desmontado
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