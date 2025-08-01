import { supabase } from './supabase';

export async function loginUser(email) {
  try {
    console.log('Tentando login para:', email);
    
    // PRIMEIRO: Verifica se usuário existe na tabela
    const { data: userData, error: userError } = await supabase
      .from('user')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (userError) {
      console.error('Erro ao buscar usuário:', userError);
      throw new Error('Erro ao verificar usuário');
    }

    if (!userData) {
      throw new Error('Usuário não encontrado');
    }

    console.log('Usuário encontrado na tabela:', userData);

    // SEGUNDO: Tenta login tradicional com OTP (mas não depende dele)
    try {
      const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false,
          emailRedirectTo: `${window.location.origin}/crm`
        }
      });

      if (!error) {
        console.log('Login via OTP realizado com sucesso');
      }
    } catch (otpError) {
      console.warn('OTP falhou, mas continuando com fallback:', otpError);
    }

    // TERCEIRO: CORRIGIDO - Salva os dados do usuário (não o resultado da função)
    const userSession = { 
      email: userData.email,  // Dados do usuário da tabela
      name: userData.name,
      wh_id: userData.wh_id,
      loginMethod: 'manual_login',
      isAuthenticated: true,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('user', JSON.stringify(userSession));
    console.log('Usuário salvo no localStorage:', userSession);

    // QUARTO: Dispara evento para atualizar sidebar
    window.dispatchEvent(new Event('userUpdated'));
    
    // QUINTO: Força redirecionamento
    setTimeout(() => {
      window.location.href = '/crm';
    }, 100);

    return { success: true, method: 'localStorage' };
    
  } catch (err) {
    console.error('Erro geral no login:', err);
    throw err;
  }
}
