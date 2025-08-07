// pages/api/magic-login.js
import { createClient } from '@supabase/supabase-js';
import jwt from 'jsonwebtoken';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({ error: 'Token ausente' });
    }

    // Descriptografa o token JWT
    let userData;
    try {
      userData = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
    } catch (jwtError) {
      return res.status(401).json({ error: 'Token inválido ou expirado' });
    }

    const { email, name, wh_id } = userData;

    console.log('[magic-login] Processando:', { email, name, wh_id });

    // OBTER O DOMÍNIO ATUAL DINAMICAMENTE
    const protocol = req.headers['x-forwarded-proto'] || (req.connection.encrypted ? 'https' : 'http');
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const baseUrl = `${protocol}://${host}`;

    console.log('[magic-login] URL base detectada:', baseUrl);

    // 1. Verifica se usuário já existe na tabela
    const { data: existingUser, error: lookupError } = await supabaseAdmin
      .from('user')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (lookupError) throw lookupError;

    let userToSave;

    // 2. Se não existe, cria usuário APENAS na tabela (não no Auth)
    if (!existingUser) {
      console.log('[magic-login] Criando novo usuário na tabela...');

      // Gera um ID único para o usuário
      const userId = crypto.randomUUID();

      // Insere na tabela user
      const { data: newUser, error: insertError } = await supabaseAdmin
        .from('user')
        .insert({
          id: userId,
          email,
          name,
          wh_id
        })
        .select()
        .single();

      if (insertError) {
        console.error('[magic-login] Erro ao inserir na tabela:', insertError);
        throw insertError;
      }

      userToSave = newUser;
      console.log('[magic-login] Usuário criado com sucesso!');

    } else {
      console.log('[magic-login] Usuário já existe na tabela');
      userToSave = existingUser;
    }

    // 3. SOLUÇÃO SIMPLES: Redireciona com os dados no query string
    // O frontend vai pegar esses dados e salvar no localStorage
    const userDataEncoded = encodeURIComponent(JSON.stringify({
      id: userToSave.id,
      email: userToSave.email,
      name: userToSave.name || name, // Usa o nome do token se não tiver na tabela
      wh_id: userToSave.wh_id || wh_id,
      isAuthenticated: true,
      loginMethod: 'magic_link'
    }));

    // Redireciona direto para o CRM com os dados
    return res.redirect(`${baseUrl}/crm?auth_data=${userDataEncoded}`);

  } catch (err) {
    console.error('[magic-login] Erro geral:', err);

    // Em caso de erro, redireciona para o CRM mesmo assim
    // mas sem dados de autenticação
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const baseUrl = `${protocol}://${host}`;

    return res.redirect(`${baseUrl}/crm?error=auth_failed`);
  }
}
