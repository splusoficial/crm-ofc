import { createClient } from '@supabase/supabase-js';
import jwt from 'jsonwebtoken';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export default async function handler(req, res) {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({ error: 'Token ausente' });
    }

    let userData;
    try {
      userData = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
    } catch (jwtError) {
      return res.status(401).json({ error: 'Token inválido ou expirado' });
    }

    const { email, name, wh_id } = userData;

    const protocol = req.headers['x-forwarded-proto'] || (req.connection.encrypted ? 'https' : 'http');
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const baseUrl = `${protocol}://${host}`;

    const { data: existingUser, error: lookupError } = await supabaseAdmin
      .from('user')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (lookupError) throw lookupError;

    let isNewUser = false;

    if (!existingUser) {
      isNewUser = true;

      const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
        email,
        email_confirm: true,
        user_metadata: { name, wh_id }
      });

      if (authError) throw authError;

      const { error: insertError } = await supabaseAdmin
        .from('user')
        .insert({
          id: authUser.user.id,
          email,
          name,
          wh_id
        });

      if (insertError) throw insertError;

      await sleep(3000);
    }

    if (isNewUser) {
      return res.redirect(`${baseUrl}/auth/loading?email=${encodeURIComponent(email)}&new_user=true`);
    } else {
      return res.redirect(`${baseUrl}/crm?magic_login=${encodeURIComponent(email)}`);
    }

  } catch (err) {
    console.error('[magic-login] Erro geral:', err);
    return res.status(500).json({
      error: 'Erro interno do servidor',
      details: err.message
    });
  }
}
