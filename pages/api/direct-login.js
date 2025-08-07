// pages/api/direct-login.js

import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email ausente.' });
  }

  try {
    // 1. Verifica se o usuário existe
    const { data: user, error } = await supabaseAdmin
      .from('user')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (error) throw error;
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado.' });

    // 2. Gera sessão diretamente para o usuário
    const { data: sessionData, error: sessionError } = await supabaseAdmin.auth.admin.createSession({
      user_id: user.id
    });

    if (sessionError) throw sessionError;

    // 3. Retorna o token de sessão e os dados do usuário
    return res.status(200).json({ session: sessionData.session, user });
  } catch (err) {
    console.error('[direct-login] erro:', err);
    return res.status(500).json({ error: err.message });
  }
}
