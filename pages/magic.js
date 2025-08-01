// pages/magic.js
import jwt from 'jsonwebtoken';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function getServerSideProps(context) {
  const { token } = context.query;

  console.log('🔑 JWT SECRET:', process.env.NEXT_PUBLIC_JWT_SECRET);
  console.log('📦 TOKEN RECEBIDO:', token);

  if (!token) {
    return { props: {}, redirect: { destination: '/', permanent: false } };
  }

  try {
    const payload = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
    const { email, name, wh_id } = payload;

    const { data: user, error } = await supabase
      .from('user')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (error) throw error;

    if (!user) {
      const { error: insertError } = await supabase
        .from('user')
        .insert({ email, name, wh_id });

      if (insertError) throw insertError;
    }

    await supabase.auth.signInWithOtp({
      email,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/crm`
      }
    });

    return { props: {}, redirect: { destination: '/check-email', permanent: false } };
  } catch (err) {
    console.error('❌ Erro no magic link:', err);
    return { props: {}, redirect: { destination: '/?erro=token', permanent: false } };
  }
}

export default function MagicPage() {
  return <p>Verificando e redirecionando...</p>;
}

a