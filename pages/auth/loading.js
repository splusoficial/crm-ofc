import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Loading() {
  const router = useRouter();
  const { redirectTo } = router.query;

  useEffect(() => {
    if (redirectTo) {
      const timeout = setTimeout(() => {
        window.location.href = redirectTo;
      }, 3000); // 3-second delay

      return () => clearTimeout(timeout);
    }
  }, [redirectTo]);

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
