import '@/styles/globals.css'
import Layout from '../Layout'
import { useRouter } from 'next/router';
import { useState } from 'react';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [supabase] = useState(() => createBrowserSupabaseClient());

  // Debug temporário
  console.log('Supabase client criado:', !!supabase);

  // Não usa Layout na home
  if (router.pathname === '/') {
    return (
      <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
        <Component {...pageProps} />
      </SessionContextProvider>
    );
  }
  return (
    <Layout>
      <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
        <Component {...pageProps} />
      </SessionContextProvider>
    </Layout>
  );
}