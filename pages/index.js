import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>CRM WhatsApp - O Primeiro Sistema Inteligente para Clínicas</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <style jsx global>{`
        body { font-family: 'Inter', sans-serif; }
        .gradient-bg {
            background: linear-gradient(135deg, #C2946D 0%, #E8C7A0 100%);
        }
        .card-shadow {
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .animate-float {
            animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
            animation: float 6s ease-in-out infinite;
            animation-delay: -3s;
        }
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
        }
        .pulse-dot {
            animation: pulse-dot 2s infinite;
        }
        @keyframes pulse-dot {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(1.1); }
        }
      `}</style>

      <div className="bg-[#fcfcfc] text-gray-900">
        {/* Header */}
        <header className="bg-white border-b border-[#e1e1e2] sticky top-0 z-50">
          <div className="container mx-auto px-6 py-4">
            <nav className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.52 3.449C18.949 1.883 16.846 1 14.615 1c-2.23 0-4.333.883-5.905 2.449l-8.061 8.061c-3.243 3.243-3.243 8.567 0 11.81 1.571 1.566 3.674 2.449 5.905 2.449s4.333-.883 5.905-2.449l8.061-8.061c3.243-3.243 3.243-8.567 0-11.81zM12 18c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z"/>
                  </svg>
                </div>
                <span className="text-xl font-bold text-[#C2946D]">CRM WhatsApp</span>
              </div>
              <div className="hidden md:flex items-center space-x-8">
                <a href="#features" className="text-[#A0A0A0] hover:text-[#C2946D] transition-colors">Recursos</a>
                <a href="#benefits" className="text-[#A0A0A0] hover:text-[#C2946D] transition-colors">Benefícios</a>
                <a href="#pricing" className="text-[#A0A0A0] hover:text-[#C2946D] transition-colors">Preços</a>
                <button className="bg-[#C2946D] text-white px-6 py-2 rounded-xl font-medium hover:opacity-90 transition-opacity">
                  Começar Agora
                </button>
              </div>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 bg-gradient-to-br from-[#fcfcfc] to-gray-50">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="lg:w-1/2 mb-10 lg:mb-0">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  Automatize sua clínica com 
                  <span className="text-[#C2946D]"> IA integrada</span> 
                  ao WhatsApp
                </h1>
                <p className="text-xl text-[#A0A0A0] mb-8 leading-relaxed">
                  O primeiro sistema de CRM que move seus leads automaticamente no kanban usando inteligência artificial, com follow-up integrado para reativar pacientes parados.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-[#C2946D] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity">
                    Teste Grátis por 30 Dias
                  </button>
                  <button className="border border-[#e1e1e2] text-[#A0A0A0] px-8 py-4 rounded-xl font-semibold text-lg hover:border-[#C2946D] hover:text-[#C2946D] transition-colors">
                    Ver Demonstração
                  </button>
                </div>
                <div className="flex items-center mt-8 text-sm text-[#A0A0A0]">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  Sem taxa de setup • Cancele quando quiser
                </div>
              </div>
              <div className="lg:w-1/2 relative">
                <div className="relative z-10">
                  <div className="bg-white rounded-xl p-6 card-shadow animate-float">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.488"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold">Paciente Agendado</p>
                        <p className="text-sm text-[#A0A0A0]">IA moveu para "Confirmado"</p>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm">"Olá! Confirmo minha consulta para amanhã às 14h. Muito obrigada!"</p>
                    </div>
                  </div>
                </div>
                <div className="absolute top-10 right-0 bg-[#C2946D] text-white rounded-full p-3 animate-float-delayed">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V19C3 20.1 3.9 21 5 21H11V19H5V3H13V9H21Z"/>
                  </svg>
                </div>
                <div className="absolute bottom-0 left-0 w-32 h-32 gradient-bg rounded-full opacity-20 animate-pulse"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Recursos que fazem a diferença</h2>
              <p className="text-xl text-[#A0A0A0] max-w-2xl mx-auto">
                Tecnologia de ponta para automatizar e otimizar o atendimento da sua clínica
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-[#fcfcfc] p-8 rounded-xl card-shadow hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 gradient-bg rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">IA Automática no Kanban</h3>
                <p className="text-[#A0A0A0]">
                  Nossa inteligência artificial analisa as conversas do WhatsApp e move automaticamente os leads pelas colunas do kanban conforme o progresso.
                </p>
              </div>

              <div className="bg-[#fcfcfc] p-8 rounded-xl card-shadow hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 gradient-bg rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Follow-up Inteligente</h3>
                <p className="text-[#A0A0A0]">
                  Sistema de follow-up integrado que reativa automaticamente leads parados, aumentando sua taxa de conversão de pacientes.
                </p>
              </div>

              <div className="bg-[#fcfcfc] p-8 rounded-xl card-shadow hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 gradient-bg rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.488"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Integração Total WhatsApp</h3>
                <p className="text-[#A0A0A0]">
                  Primeira plataforma que integra completamente WhatsApp Business API com CRM, centralizando todo atendimento em um só lugar.
                </p>
              </div>

              <div className="bg-[#fcfcfc] p-8 rounded-xl card-shadow hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 gradient-bg rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Dashboard Completo</h3>
                <p className="text-[#A0A0A0]">
                  Visualize métricas em tempo real, acompanhe conversões e analise o desempenho da sua equipe com relatórios detalhados.
                </p>
              </div>

              <div className="bg-[#fcfcfc] p-8 rounded-xl card-shadow hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 gradient-bg rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Segurança LGPD</h3>
                <p className="text-[#A0A0A0]">
                  Plataforma 100% segura e em conformidade com LGPD, garantindo a proteção total dos dados dos seus pacientes.
                </p>
              </div>

              <div className="bg-[#fcfcfc] p-8 rounded-xl card-shadow hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 gradient-bg rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 6L12 10.5 8.5 8 12 5.5 15.5 8zM12 17.5L8.5 15 12 12.5 15.5 15 12 17.5z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Para Todo Brasil</h3>
                <p className="text-[#A0A0A0]">
                  Desenvolvido especialmente para clínicas brasileiras, com suporte técnico nacional e implementação personalizada.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-20 bg-[#fcfcfc]">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2">
                <h2 className="text-4xl font-bold mb-6">
                  Transforme leads parados em 
                  <span className="text-[#C2946D]"> pacientes ativos</span>
                </h2>
                <p className="text-xl text-[#A0A0A0] mb-8">
                  Nossa IA não apenas automatiza, ela aprende com cada interação e otimiza continuamente seus resultados.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 gradient-bg rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Aumento de 300% na conversão</h3>
                      <p className="text-[#A0A0A0]">Follow-up automático reativa leads que estavam parados há semanas</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 gradient-bg rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">70% menos tempo administrativo</h3>
                      <p className="text-[#A0A0A0]">IA move os leads automaticamente, sua equipe foca no atendimento</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 gradient-bg rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Zero leads perdidos</h3>
                      <p className="text-[#A0A0A0]">Cada conversa é automaticamente catalogada e acompanhada</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="lg:w-1/2">
                <div className="bg-white rounded-xl p-8 card-shadow">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                      <div>
                        <p className="font-medium">Maria Silva</p>
                        <p className="text-sm text-[#A0A0A0]">Lead parado há 15 dias</p>
                      </div>
                      <div className="pulse-dot w-3 h-3 bg-yellow-400 rounded-full"></div>
                    </div>
                    
                    <div className="flex items-center justify-center py-2">
                      <svg className="w-6 h-6 text-[#C2946D] animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    
                    <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                      <p className="font-medium text-blue-800 mb-2">🤖 IA Ativou Follow-up</p>
                      <p className="text-sm text-blue-700">"Olá Maria! Vi que você tinha interesse em nossa consulta. Que tal agendarmos para esta semana?"</p>
                    </div>
                    
                    <div className="flex items-center justify-center py-2">
                      <svg className="w-6 h-6 text-[#C2946D] animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>  
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
                      <div>
                        <p className="font-medium text-green-800">Maria Silva</p>
                        <p className="text-sm text-green-700">Agendada para terça-feira</p>
                      </div>
                      <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Clínicas que já transformaram resultados</h2>
              <p className="text-xl text-[#A0A0A0]">Veja como nossos clientes aumentaram suas conversões</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-[#fcfcfc] p-8 rounded-xl card-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[#C2946D] rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">DR</span>
                  </div>
                  <div>
                    <p className="font-semibold">Dr. Ricardo Santos</p>
                    <p className="text-sm text-[#A0A0A0]">Clínica Odontológica Santos</p>
                  </div>
                </div>
                <p className="text-[#A0A0A0] mb-4">
                  "Em 3 meses conseguimos recuperar mais de 200 leads que estavam parados. O ROI foi impressionante!"
                </p>
                <div className="flex text-yellow-400">
                  {[1,2,3,4,5].map((i) => (
                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
              </div>
              
              <div className="bg-[#fcfcfc] p-8 rounded-xl card-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[#C2946D] rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">ANA</span>
                  </div>
                  <div>
                    <p className="font-semibold">Ana Rodrigues</p>
                    <p className="text-sm text-[#A0A0A0]">Clínica de Estética Ana</p>
                  </div>
                </div>
                <p className="text-[#A0A0A0] mb-4">
                  "Nossa equipe economiza 4 horas por dia só com a automação do kanban. Agora focamos 100% no atendimento!"
                </p>
                <div className="flex text-yellow-400">
                  {[1,2,3,4,5].map((i) => (
                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
              </div>
              
              <div className="bg-[#fcfcfc] p-8 rounded-xl card-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[#C2946D] rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">CM</span>
                  </div>
                  <div>
                    <p className="font-semibold">Carlos Mendes</p>
                    <p className="text-sm text-[#A0A0A0]">Clínica Médica Mendes</p>
                  </div>
                </div>
                <p className="text-[#A0A0A0] mb-4">
                  "Desde que implementamos, nossa taxa de agendamento subiu 250%. A IA entende melhor que um humano!"
                </p>
                <div className="flex text-yellow-400">
                  {[1,2,3,4,5].map((i) => (
                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 bg-[#fcfcfc]">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Planos que se adaptam à sua clínica</h2>
              <p className="text-xl text-[#A0A0A0]">Escolha o plano ideal para o tamanho da sua operação</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Plano Starter */}
              <div className="bg-white p-8 rounded-xl card-shadow relative">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">Starter</h3>
                  <p className="text-[#A0A0A0] mb-4">Para clínicas pequenas</p>
                  <div className="text-4xl font-bold text-[#C2946D] mb-2">R$ 297</div>
                  <p className="text-[#A0A0A0]">/mês</p>
                </div>
                
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span>IA personalizada + machine learning</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span>Automação completa multi-canal</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span>Usuários ilimitados</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span>API & integrações customizadas</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span>Gerente de sucesso dedicado</span>
                  </li>
                </ul>
                
                <button className="w-full border border-[#e1e1e2] text-[#A0A0A0] py-3 rounded-xl font-semibold hover:border-[#C2946D] hover:text-[#C2946D] transition-colors">
                  Falar com Vendas
                </button>
              </div>
              
              {/* Plano Professional - Destaque */}
              <div className="bg-white p-8 rounded-xl card-shadow relative border-2 border-[#C2946D]">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#C2946D] text-white px-6 py-2 rounded-full text-sm font-semibold">
                  Mais Popular
                </div>
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">Professional</h3>
                  <p className="text-[#A0A0A0] mb-4">Para clínicas em crescimento</p>
                  <div className="text-4xl font-bold text-[#C2946D] mb-2">R$ 597</div>
                  <p className="text-[#A0A0A0]">/mês</p>
                </div>
                
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span>Até 5.000 contatos</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span>IA avançada + análise preditiva</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span>Follow-up multi-canal</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span>10 usuários inclusos</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span>Relatórios avançados</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span>Suporte prioritário</span>
                  </li>
                </ul>
                
                <button className="w-full bg-[#C2946D] text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity">
                  Começar Teste Grátis
                </button>
              </div>
              
              {/* Plano Enterprise */}
              <div className="bg-white p-8 rounded-xl card-shadow relative">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                  <p className="text-[#A0A0A0] mb-4">Para grandes clínicas</p>
                  <div className="text-4xl font-bold text-[#C2946D] mb-2">R$ 997</div>
                  <p className="text-[#A0A0A0]">/mês</p>
                </div>
                
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span>Contatos ilimitados</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span>IA preditiva + insights acionáveis</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span>Follow-up automatizado por IA</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span>25 usuários inclusos</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span>Relatórios personalizados</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span>Suporte dedicado 24/7</span>
                  </li>
                </ul>
                
                <button className="w-full border border-[#e1e1e2] text-[#A0A0A0] py-3 rounded-xl font-semibold hover:border-[#C2946D] hover:text-[#C2946D] transition-colors">
                  Falar com Vendas
                </button>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <p className="text-[#A0A0A0] mb-4">Todos os planos incluem 30 dias grátis • Sem taxa de setup • Cancele quando quiser</p>
              <div className="flex justify-center items-center space-x-8 text-sm text-[#A0A0A0]">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  SSL 256-bit
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  LGPD Compliance
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  Backup automático
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 gradient-bg text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-6">
              Pronto para revolucionar sua clínica?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Junte-se a centenas de clínicas que já aumentaram suas conversões em mais de 300% com nossa IA integrada ao WhatsApp.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button className="bg-white text-[#C2946D] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors">
                Começar Teste Grátis Agora
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-[#C2946D] transition-colors">
                Agendar Demonstração
              </button>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-2xl mx-auto text-center">
              <div>
                <div className="text-3xl font-bold mb-2">30 dias</div>
                <p className="opacity-80">Teste grátis</p>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">24/7</div>
                <p className="opacity-80">Suporte técnico</p>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">5 min</div>
                <p className="opacity-80">Para configurar</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-16">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.52 3.449C18.949 1.883 16.846 1 14.615 1c-2.23 0-4.333.883-5.905 2.449l-8.061 8.061c-3.243 3.243-3.243 8.567 0 11.81 1.571 1.566 3.674 2.449 5.905 2.449s4.333-.883 5.905-2.449l8.061-8.061c3.243-3.243 3.243-8.567 0-11.81zM12 18c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z"/>
                    </svg>
                  </div>
                  <span className="text-xl font-bold">CRM WhatsApp</span>
                </div>
                <p className="text-gray-400 mb-4">
                  O primeiro CRM com IA integrada ao WhatsApp para automatizar sua clínica e aumentar conversões.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Produto</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Recursos</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Integrações</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Segurança</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Empresa</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Sobre nós</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Carreiras</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Imprensa</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Suporte</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Central de Ajuda</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Documentação</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                © 2025 CRM WhatsApp. Todos os direitos reservados.
              </p>
              <div className="flex space-x-6 text-sm text-gray-400">
                <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
                <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
                <a href="#" className="hover:text-white transition-colors">LGPD</a>
              </div>
            </div>
          </div>
        </footer>
      </div>

      <script dangerouslySetInnerHTML={{ __html: `
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
          anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
              target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
            }
          });
        });

        // Add scroll effect to header
        window.addEventListener('scroll', function() {
          const header = document.querySelector('header');
          if (window.scrollY > 100) {
            header.classList.add('shadow-lg');
          } else {
            header.classList.remove('shadow-lg');
          }
        });

        // Add intersection observer for animations
        const observerOptions = {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
            }
          });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.card-shadow').forEach(el => {
          el.style.opacity = '0';
          el.style.transform = 'translateY(20px)';
          el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
          observer.observe(el);
        });
      `}} />
    </>
  );
}
