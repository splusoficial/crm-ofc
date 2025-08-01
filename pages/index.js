import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>CRM SPlus - Sua Clínica Inteligente</title>
      </Head>
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8f6f3] px-4">
        <div className="max-w-xl w-full text-center py-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[#C2946D]">Bem-vindo ao CRM SPlus</h1>
          <p className="text-lg text-gray-700 mb-8">
            O CRM inteligente para clínicas de estética que automatiza o funil de vendas, integra com WhatsApp e utiliza IA para qualificar seus leads.
          </p>
          <ul className="text-left text-gray-600 mb-8 space-y-2">
            <li>• Receba leads automaticamente do WhatsApp</li>
            <li>• Funil Kanban com etapas automáticas e manuais</li>
            <li>• Histórico completo de atividades e status</li>
            <li>• Métricas de conversão em tempo real</li>
            <li>• 100% seguro e integrado ao Supabase</li>
          </ul>
          <a
            href="/api/generate-link"
            className="inline-block bg-[#E6C39C] text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-[#c2946d] transition"
          >
            Comece Agora com Magic Link
          </a>
        </div>
        <footer className="text-xs text-gray-400 mt-8">
          &copy; {new Date().getFullYear()} CRM SPlus. Todos os direitos reservados.
        </footer>
      </div>
    </>
  );
}
