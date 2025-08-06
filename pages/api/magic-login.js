import { createClient } from '@supabase/supabase-js';

// Note: This should be a regular client, not an admin client,
// as we are not performing admin operations anymore.
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  const { email, name, wh_id } = req.query;

  if (!email || !name || !wh_id) {
    return res.status(400).json({ error: 'Email, name, and wh_id are required' });
  }

  const protocol = req.headers['x-forwarded-proto'] || (req.connection.encrypted ? 'https' : 'http');
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const baseUrl = `${protocol}://${host}`;

  const { data, error } = await supabase.auth.signInWithOtp({
    email: email,
    options: {
      // This will be the page where the user is redirected to after clicking the magic link.
      emailRedirectTo: `${baseUrl}/auth/callback`,
      // We can pass additional data here, which will be available in the user's metadata.
      data: {
        name,
        wh_id,
      },
    },
  });

  if (error) {
    console.error('Error sending magic link:', error);
    return res.status(500).json({ error: 'Could not send magic link.' });
  }

  return res.status(200).json({ message: 'Magic link sent successfully. Please check your email.' });
}
