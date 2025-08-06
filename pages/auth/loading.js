import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Loading() {
  const router = useRouter();
  const { email, new_user } = router.query;

  useEffect(() => {
    if (email && new_user) {
      const timeout = setTimeout(() => {
        router.push(`/crm?magic_login=${email}`);
      }, 3000); // 3-second delay

      return () => clearTimeout(timeout);
    }
  }, [email, new_user, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
        <p className="text-gray-600">Preparando sua conta...</p>
        <p className="text-sm text-gray-400 mt-2">Você será redirecionado em instantes.</p>
      </div>
    </div>
  );
}
