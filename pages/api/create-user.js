import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, email, wh_id } = req.body;

  try {
    // 1. Cria usuário no Auth do Supabase
    const { data: user, error: authError } = await supabase.auth.admin.createUser({
      email,
      email_confirm: true,
      user_metadata: { name, wh_id }
    });

    if (authError) {
      return res.status(400).json({ error: authError.message });
    }

    // 2. Insere na tabela user (que agora aceita UUID)
    const { error: dbError } = await supabase
      .from('user')
      .insert([{ id: user.user.id, name, email, wh_id }]);

    if (dbError) {
      return res.status(400).json({ error: dbError.message });
    }

    return res.status(200).json({ 
      message: 'Usuário criado no auth e na tabela user com sucesso!'
    });

  } catch (error) {
    console.error('Erro no cadastro:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}