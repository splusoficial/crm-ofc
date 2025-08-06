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
    const { name, wh_id } = req.body;
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Get the user from the access token
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(token);

    if (userError || !user) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }

    // Update the user's profile in the 'user' table
    const { data, error: updateError } = await supabaseAdmin
      .from('user')
      .update({ name, wh_id })
      .eq('id', user.id)
      .select();

    if (updateError) {
      console.error('Error updating user profile:', updateError);
      return res.status(500).json({ error: 'Failed to update user profile' });
    }

    res.status(200).json({ message: 'User profile updated successfully', data });

  } catch (error) {
    console.error('General error in update-user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
