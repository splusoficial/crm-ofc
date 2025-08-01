export default function TestEnv() {
  return (
    <div>
      <h1>Teste de Variáveis</h1>
      <p>URL: {process.env.NEXT_PUBLIC_SUPABASE_URL || 'NÃO CARREGOU'}</p>
      <p>ANON: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Carregou' : 'NÃO CARREGOU'}</p>
    </div>
  );
}