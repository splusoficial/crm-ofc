import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { user } = req.body;
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Verify the token
    const { data: { user: authUser }, error: userError } = await supabaseAdmin.auth.getUser(token);

    if (userError || !authUser || authUser.id !== user.id) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }

    const { id, email, user_metadata: { name, wh_id } } = user;

    // Check if user exists in our public 'user' table
    const { data: existingUser, error: lookupError } = await supabaseAdmin
      .from('user')
      .select('id')
      .eq('id', id)
      .maybeSingle();

    if (lookupError) throw lookupError;

    if (existingUser) {
      // User exists, update their info
      const { error: updateError } = await supabaseAdmin
        .from('user')
        .update({ name, wh_id })
        .eq('id', id);

      if (updateError) throw updateError;
      console.log(`User ${email} updated.`);
    } else {
      // User does not exist, create them
      const { error: insertError } = await supabaseAdmin
        .from('user')
        .insert({ id, email, name, wh_id });

      if (insertError) throw insertError;
      console.log(`User ${email} created.`);
    }

    res.status(200).json({ message: 'User synchronized successfully' });

  } catch (error) {
    console.error('Error in sync-user:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
