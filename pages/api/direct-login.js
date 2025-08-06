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
    const { data: user, error } = await supabaseAdmin
      .from('user')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (error) throw error;
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado.' });

    const { data, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
        type: 'magiclink',
        email: email,
        options: {
          redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
        },
    });

    if (linkError) throw linkError;

    return res.status(200).json({
      action_link: data.properties.action_link,
      site_url_used: process.env.NEXT_PUBLIC_SITE_URL
    });
  } catch (err) {
    console.error('[direct-login] erro:', err);
    return res.status(500).json({ error: err.message });
  }
}
