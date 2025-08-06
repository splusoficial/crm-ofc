'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { supabase } from './lib/supabase';
import { createPageUrl } from '@/utils';
import { ArrowLeft, LogOut } from 'lucide-react';
import KanbanIcon from './components/crm/icons/KanbanIcon';

// Componente SidebarToggleIcon (agora importado diretamente)
const SidebarToggleIcon = ({ className, ...props }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path
      d="M0 2.56641C0 1.60938 0.765625 0.816406 1.75 0.816406L12.25 0.816406C13.207 0.816406 14 1.60938 14 2.56641L14 11.3164C14 12.3008 13.207 13.0664 12.25 13.0664L1.75 13.0664C0.765625 13.0664 0 12.3008 0 11.3164L0 2.56641ZM6.125 11.7539L12.25 11.7539C12.4687 11.7539 12.6875 11.5625 12.6875 11.3164L12.6875 2.56641C12.6875 2.34766 12.4687 2.12891 12.25 2.12891L6.125 2.12891L6.125 11.7539ZM2.40625 3.87891L3.71875 3.87891C4.07422 3.87891 4.375 3.60547 4.375 3.22266C4.375 2.86719 4.07422 2.56641 3.71875 2.56641L2.40625 2.56641C2.02344 2.56641 1.75 2.86719 1.75 3.22266C1.75 3.60547 2.02344 3.87891 2.40625 3.87891ZM2.40625 5.19141C2.02344 5.19141 1.75 5.49219 1.75 5.84766C1.75 6.23047 2.02344 6.50391 2.40625 6.50391H3.71875C4.07422 6.50391 4.375 6.23047 4.375 5.84766C4.375 5.49219 4.07422 5.19141 3.71875 5.19141H2.40625ZM2.40625 9.12891H3.71875C4.07422 9.12891 4.375 8.85547 4.375 8.47266C4.375 8.11719 4.07422 7.81641 3.71875 7.81641H2.40625C2.02344 7.81641 1.75 8.11719 1.75 8.47266C1.75 8.85547 2.02344 9.12891 2.40625 9.12891Z"
      fill="#464646"
    />
  </svg>
);
// Fim do componente SidebarToggleIcon

const ToggleSidebarContext = React.createContext();

export function useToggleSidebar() {
  return React.useContext(ToggleSidebarContext);
}

export default function Layout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const userMenuRef = useRef(null);
  const router = useRouter();

  // URL do sistema principal vinda da env var
  const mainSystemUrl = process.env.NEXT_PUBLIC_MAIN_SYSTEM_URL || 'https://web.secretariaplus.com.br';

  useEffect(() => {
    console.log('=== Layout montado ===');
    loadUserFromStorage();

    const handleUserUpdate = () => {
      console.log('🔄 Layout recebeu evento userUpdated');
      loadUserFromStorage();
    };

    window.addEventListener('userUpdated', handleUserUpdate);

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        console.log('Layout detected SIGNED_IN');
        const user = session.user;
        const userData = {
          ...user,
          name: user.user_metadata.name,
          wh_id: user.user_metadata.wh_id,
          isAuthenticated: true,
        };
        localStorage.setItem('user', JSON.stringify(userData));
        window.dispatchEvent(new Event('userUpdated'));
      }
    });

    return () => {
      window.removeEventListener('userUpdated', handleUserUpdate);
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const handleMagicLogin = async () => {
      if (router.query.magic_login) {
        const email = router.query.magic_login;
        try {
          const response = await fetch('/api/direct-login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
          });

          if (response.ok) {
            const data = await response.json();
            console.log('Response from /api/direct-login:', data);
            window.location.href = data.action_link;
          } else {
            console.error('Magic login failed:', await response.text());
          }
        } catch (error) {
          console.error('Error during magic login:', error);
        }
      }
    };

    handleMagicLogin();
  }, [router.query.magic_login]);


  const loadUserFromStorage = () => {
    try {
      const storedUserString = localStorage.getItem('user') || '{}';
      console.log('🔍 Raw localStorage:', storedUserString); // ← Adiciona este log

      const storedUser = JSON.parse(storedUserString);
      console.log('🔍 Parsed user object:', storedUser);
      console.log('🔍 User email:', storedUser?.email);
      console.log('🔍 User isAuthenticated:', storedUser?.isAuthenticated);

      if (storedUser?.email) {
        console.log('✅ Layout encontrou usuário válido:', storedUser.email);

        if (!storedUser.isAuthenticated) {
          storedUser.isAuthenticated = true;
          localStorage.setItem('user', JSON.stringify(storedUser));
        }

        setLoggedUser(storedUser);
      } else {
        console.log('❌ Layout não encontrou email válido - objeto:', storedUser);
      }
    } catch (error) {
      console.error('💥 Erro ao carregar usuário do localStorage:', error);
    }
  };

  const handleLogout = () => {
    // localStorage.removeItem('user');
    // setLoggedUser(null);
    // Redireciona para o sistema principal usando a env var
    window.location.href = mainSystemUrl;
  };

  const navigationItems = [
    {
      title: 'Voltar ao Sistema',
      action: () => window.location.href = mainSystemUrl,
      icon: ArrowLeft
    },
    { title: 'CRM', url: createPageUrl('crm'), icon: KanbanIcon }
  ];

  const NavItem = ({ item }) => {
    const isActive = router.pathname === item.url || router.pathname === `/${item.url}` || router.pathname === '/crm';
    const content = (
      <>
        <item.icon className="flex-shrink-0 w-4 h-4" style={{ fill: isActive ? '#C2946D' : '#A0A0A0' }} />
        <span
          className={`text-span ${isCollapsed ? 'collapsed' : 'expanded'}`}
          style={{ marginLeft: '0.75rem' }}
        >
          {item.title}
        </span>
      </>
    );

    if (item.url) {
      return (
        <Link href={item.url} className={`nav-item ${isActive ? 'active' : ''}`}>
          {content}
        </Link>
      );
    }

    return (
      <div onClick={item.action} className="nav-item">
        {content}
      </div>
    );
  };

  const UserCard = ({ user, isCollapsed }) => {
    if (!user) return null;
    return (
      <div
        className={`
          p-2 rounded-xl transition-all duration-300 cursor-pointer
          ${isCollapsed ? 'hover:bg-gray-100' : ''}
          ${isUserMenuOpen ? 'bg-gray-100' : ''}
        `}
        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
      >
        <div className="flex items-center gap-3">
          <div className={`flex-1 overflow-hidden transition-all duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            <p className="text-sm font-semibold text-gray-900 whitespace-nowrap truncate">{user.name || 'Usuário'}</p>
            <p className="text-xs text-gray-500 whitespace-nowrap truncate">{user.email}</p>
          </div>
        </div>
      </div>
    );
  };

  if (router.pathname === createPageUrl('Welcome')) {
    return children;
  }

  // Função para abrir/fechar sidebar no mobile
  const handleMobileSidebar = () => setIsMobileSidebarOpen((v) => !v);

  return (
    <>
      <style jsx global>{`
        :root {
          --background: #fcfcfc;
          --card: #ffffff;
          --border: #e1e1e2;
          --primary: #C2946D;
          --primary-foreground: #ffffff;
          --muted-foreground: #A0A0A0;
          --error: #E53E3E;
        }
        .nav-item-container {
          padding-left: 0.75rem;
          padding-right: 0.75rem;
        }
        .nav-item {
          position: relative;
          display: flex;
          align-items: center;
          width: 100%;
          padding-left: 1.25rem;
          padding-right: 1.25rem;
          padding-top: 0.5rem;
          padding-bottom: 0.5rem;
          min-height: 2.5rem;
          font-size: 0.875rem;
          font-weight: 500;
          line-height: 1.25;
          border-radius: 0.75rem;
          transition: all 0.2s;
          cursor: pointer;
          color: #545454;
        }
        .nav-item:hover {
          background-color: rgb(243 244 246 / 1);
        }
        .nav-item.active {
          color: #545454;
          border: 1px solid #c2946d;
          min-height: 45px;
        }
        .nav-item .text-span {
          margin-left: 0.75rem !important;
          transition: all 0.2s;
          white-space: nowrap;
        }
        .nav-item .text-span.collapsed {
          opacity: 0;
          width: 0;
        }
        .nav-item .text-span.expanded {
          opacity: 1;
        }
        body {
          margin: 0;
          padding: 0;
          font-family: 'Inter', sans-serif;
        }
        ._next-dev-overlay,
        [data-nextjs-toast],
        #__next-build-watcher {
          display: none !important;
        }
      `}</style>
      <div className="flex text-gray-800 overflow-x-hidden" style={{ fontFamily: "'Inter', sans-serif", height: '100vh' }}>
        {/* Sidebar para desktop */}
        <aside
          className={`
            hidden md:flex flex-col bg-white transition-all duration-300 ease-in-out border-r border-[#E1E1E2]
            ${isCollapsed ? 'w-20' : 'w-64'}
          `}
          style={{ height: '100vh', overflowX: 'hidden' }}
        >
          <div className="flex items-center h-20 px-4 flex-shrink-0">
            <img
              src={
                isCollapsed
                  ? 'https://web.secretariaplus.com.br/media/logo-col.svg'
                  : 'https://web.secretariaplus.com.br/media/logo-blk.svg'
              }
              alt="Logo"
              className="h-10 transition-all duration-300"
            />
          </div>

          <nav className="flex-1 py-4 nav-item-container">
            {navigationItems.map((item) => (
              <NavItem key={item.title} item={item} />
            ))}
          </nav>

          {/* Sidebar desktop */}
          <div className="p-3 relative flex-shrink-0" ref={userMenuRef}>
            {loggedUser && !isCollapsed && (
              <UserCard user={loggedUser} isCollapsed={isCollapsed} />
            )}
            {isUserMenuOpen && loggedUser && !isCollapsed && (
              <div
                className="absolute left-0 w-full p-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50"
                style={{ bottom: '70px' }}
              >
                <button
                  onClick={handleLogout}
                  className="w-full text-left py-2 px-3 text-sm text-gray-700 hover:bg-gray-100 rounded-lg flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4 text-gray-500" />
                  Sair
                </button>
              </div>
            )}
          </div>
        </aside>

        {/* Sidebar para mobile */}
        {isMobileSidebarOpen && (
          <div
            className="fixed inset-0 z-50 bg-black bg-opacity-40 flex md:hidden"
            onClick={handleMobileSidebar}
          >
            <aside
              className="bg-white w-full h-full shadow-2xl flex flex-col relative"
              onClick={e => e.stopPropagation()}
            >
              {/* Botão X fixo no topo */}
              <button
                onClick={handleMobileSidebar}
                style={{ paddingLeft: '85%' }}
                className="absolute top-4 right-4 p-6 rounded-md hover:bg-gray-200 transition-colors"
                aria-label="Fechar menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>


              <div className="flex items-center h-20 px-4 flex-shrink-0">
                <img
                  src={
                    isCollapsed
                      ? 'https://web.secretariaplus.com.br/media/logo-col.svg'
                      : 'https://web.secretariaplus.com.br/media/logo-blk.svg'
                  }
                  alt="Logo"
                  className="h-10 transition-all duration-300"
                />
              </div>

              <nav className="flex-1 py-4 nav-item-container">
                {navigationItems.map((item) => (
                  <NavItem key={item.title} item={item} />
                ))}
              </nav>

              {/* Sidebar mobile */}
              <div className="p-3 relative flex-shrink-0" ref={userMenuRef}>
                {loggedUser && (
                  <UserCard user={loggedUser} isCollapsed={isCollapsed} />
                )}
                {isUserMenuOpen && loggedUser && (
                  <div
                    className="absolute left-0 w-full p-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50"
                    style={{ bottom: '70px' }}
                  >
                    <button
                      onClick={handleLogout}
                      className="w-full text-left py-2 px-3 text-sm text-gray-700 hover:bg-gray-100 rounded-lg flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4 text-gray-500" />
                      Sair
                    </button>
                  </div>
                )}
              </div>
            </aside>
          </div>
        )}

        <main className="flex-1 flex flex-col overflow-auto">
          <ToggleSidebarContext.Provider value={{
            isCollapsed,
            toggleSidebar: () => {
              if (window.innerWidth < 768) {
                handleMobileSidebar();
              } else {
                setIsCollapsed(!isCollapsed);
              }
            },
            isMobileSidebarOpen,
            handleMobileSidebar
          }}>
            {children}
          </ToggleSidebarContext.Provider>
        </main>
      </div>
    </>
  );
}