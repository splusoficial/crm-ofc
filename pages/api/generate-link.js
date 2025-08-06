import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  const { email, name, wh_id } = req.query;

  if (!email || !name || !wh_id) {
    return res.status(400).json({ error: 'Email, name, and wh_id are required' });
  }

  try {
    // Check if user exists in Supabase Auth
    const { data: { users }, error: listError } = await supabaseAdmin.auth.admin.listUsers({ email });
    if (listError) throw listError;

    let user = users.length > 0 ? users[0] : null;
    let isNewUser = false;

    if (!user) {
      isNewUser = true;
      // User doesn't exist, create them
      const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
        email,
        email_confirm: true, // Auto-confirm email
        user_metadata: { name, wh_id },
      });

      if (createError) throw createError;

      // Also create them in the public 'user' table
      const { error: insertError } = await supabaseAdmin
        .from('user')
        .insert({ id: newUser.user.id, email, name, wh_id });

      if (insertError) throw insertError;
      user = newUser.user;
    }

    // Generate a magic link for the user
    const { data, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
      type: 'magiclink',
      email: email,
      options: {
        redirectTo: `${req.headers.origin}/auth/callback`,
      },
    });

    if (linkError) throw linkError;

    // For new users, redirect to a loading page first
    if (isNewUser) {
        // The loading page will then redirect to the magic link
        return res.redirect(`/auth/loading?redirectTo=${encodeURIComponent(data.properties.action_link)}`);
    }

    // For existing users, redirect directly to the magic link
    res.redirect(data.properties.action_link);

  } catch (error) {
    console.error('Error in generate-link:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
