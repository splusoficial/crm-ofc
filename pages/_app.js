import '@/styles/globals.css'
import Layout from '../Layout'
import { useRouter } from 'next/router';

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // Não usa Layout na home
  if (router.pathname === '/') {
    return <Component {...pageProps} />;
  }
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}