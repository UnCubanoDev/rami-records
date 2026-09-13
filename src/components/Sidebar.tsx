import React from 'react';
import {
  Home,
  Users,
  Music,
  Calendar,
  Ticket,
  Menu as MenuIcon,
  X,
  Radio,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Mic,
  UserCheck
} from 'lucide-react';
import { TabType, Release } from '../types';

interface SidebarProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  onOpenProfile: () => void;
  onOpenDemoModal: () => void;
  isPlaying: boolean;
  currentTrack: Release | null;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  onOpenProfile,
  onOpenDemoModal,
  isPlaying,
  currentTrack,
}) => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'inicio' as TabType, label: 'Inicio', icon: Home },
    { id: 'artistas' as TabType, label: 'Artistas', icon: Users, badge: '4' },
    { id: 'musica' as TabType, label: 'Música', icon: Music, badge: 'New' },
    { id: 'eventos' as TabType, label: 'Eventos', icon: Calendar, badge: 'Live' },
    { id: 'booking' as TabType, label: 'Booking', icon: Ticket },
  ];

  const handleNavClick = (id: TabType) => {
    onSelectTab(id);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* ================= DESKTOP / TABLET LATERAL SIDEBAR ================= */}
      <aside
        id="desktop-sidebar"
        className={`hidden md:flex flex-col fixed top-0 left-0 bottom-0 z-50 bg-[#141616] border-r border-white/5 transition-all duration-300 ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Brand Header */}
        <div className="h-20 px-5 flex items-center justify-between border-b border-white/5">
          <div
            onClick={() => handleNavClick('inicio')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#ff5070] to-[#ffb2b9] flex items-center justify-center text-[#67001e] font-bold shadow-lg shadow-[#ff5070]/20 group-hover:scale-105 transition-transform shrink-0">
              <Radio className="w-5 h-5" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-headline font-bold tracking-tight text-sm uppercase text-[#e2e2e2]">
                    RAMI RECORDS
                  </span>
                  <span className="px-1.5 py-0.2 bg-[#ff5070] text-[#67001e] text-[9px] font-bold rounded-full tracking-wider animate-pulse">
                    LIVE
                  </span>
                </div>
                <span className="text-[10px] text-[#9ca3af] tracking-wider uppercase">
                  La Habana • Urban Sound
                </span>
              </div>
            )}
          </div>

          <button
            id="toggle-sidebar-btn"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 text-[#9ca3af] hover:text-[#e2e2e2] flex items-center justify-center transition-colors"
            title={isCollapsed ? 'Expandir barra lateral' : 'Colapsar barra lateral'}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 py-6 px-3 flex flex-col gap-1.5 overflow-y-auto no-scrollbar">
          {!isCollapsed && (
            <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-[#9ca3af]/70">
              Menú Principal
            </div>
          )}

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`sidebar-nav-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`relative flex items-center gap-3.5 px-3.5 py-3 rounded-xl font-medium text-sm transition-all group ${
                  isActive
                    ? 'bg-[#ff5070]/15 text-[#ffb2b9] shadow-sm font-semibold'
                    : 'text-[#9ca3af] hover:text-[#e2e2e2] hover:bg-white/5'
                } ${isCollapsed ? 'justify-center px-0' : ''}`}
                title={isCollapsed ? item.label : undefined}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-[#ff5070] rounded-r-full" />
                )}
                <Icon
                  className={`w-5 h-5 shrink-0 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-[#ff5070]' : 'text-[#9ca3af]'
                  }`}
                />
                {!isCollapsed && (
                  <div className="flex items-center justify-between flex-1 min-w-0">
                    <span className="truncate">{item.label}</span>
                    {item.badge && (
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          isActive
                            ? 'bg-[#ff5070] text-[#67001e]'
                            : 'bg-white/10 text-[#9ca3af]'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}

          {/* Quick Demo Callout */}
          {!isCollapsed ? (
            <div className="mt-6 mx-1 p-3.5 rounded-2xl bg-gradient-to-b from-[#1e2020] to-[#1a1c1c] border border-white/5 flex flex-col gap-2.5">
              <div className="flex items-center gap-2 text-[#ffb2b9]">
                <Mic className="w-4 h-4 text-[#ff5070]" />
                <span className="text-xs font-semibold">¿Tienes talento?</span>
              </div>
              <p className="text-[11px] text-[#9ca3af] leading-relaxed">
                Envía tu demo a Rami Records y únete al sello.
              </p>
              <button
                id="sidebar-demo-btn"
                onClick={onOpenDemoModal}
                className="w-full py-2 px-3 rounded-lg bg-[#ff5070] text-[#67001e] text-xs font-semibold hover:opacity-90 active:scale-95 transition-all text-center flex items-center justify-center gap-1.5 shadow-md shadow-[#ff5070]/20"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Enviar Demo</span>
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenDemoModal}
              className="mt-4 mx-auto w-10 h-10 rounded-xl bg-[#ff5070]/20 text-[#ffb2b9] hover:bg-[#ff5070] hover:text-[#67001e] flex items-center justify-center transition-all"
              title="Enviar Demo"
            >
              <Mic className="w-4 h-4" />
            </button>
          )}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-white/5 bg-[#121414]/60">
          <button
            id="sidebar-profile-btn"
            onClick={onOpenProfile}
            className={`w-full flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-all text-left ${
              isCollapsed ? 'justify-center p-2' : ''
            }`}
          >
            <div className="w-9 h-9 rounded-full bg-[#ffb2b9] text-[#67001e] flex items-center justify-center font-bold text-sm shrink-0 shadow-md">
              <UserCheck className="w-4 h-4" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-xs font-semibold text-[#e2e2e2] truncate">
                  VIP Rami Pass
                </span>
                <span className="text-[11px] text-[#ffb2b9] truncate">
                  Miembro Activo
                </span>
              </div>
            )}
          </button>
        </div>
      </aside>

      {/* ================= MOBILE FIXED TOP HEADER ================= */}
      <header
        id="mobile-header"
        className="md:hidden fixed top-0 inset-x-0 z-40 bg-[#121414]/90 backdrop-blur-xl border-b border-white/5 h-16 px-4 flex items-center justify-between"
      >
        <div
          onClick={() => handleNavClick('inicio')}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#ff5070] to-[#ffb2b9] flex items-center justify-center text-[#67001e] font-bold">
            <Radio className="w-4 h-4" />
          </div>
          <span className="text-base font-headline font-bold tracking-tight text-[#ffb2b9] uppercase">
            RAMI RECORDS
          </span>
          <span className="px-1.5 py-0.5 rounded-full bg-[#ff5070] text-[#67001e] text-[10px] font-bold">
            LIVE
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="mobile-profile-btn"
            onClick={onOpenProfile}
            className="w-8 h-8 rounded-full bg-[#ffb2b9] text-[#67001e] flex items-center justify-center shadow-md active:scale-95 transition-all"
            aria-label="Perfil"
          >
            <UserCheck className="w-4 h-4" />
          </button>
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-8 h-8 rounded-lg bg-white/5 text-[#e2e2e2] flex items-center justify-center active:scale-95 transition-all"
            aria-label="Abrir menú"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* ================= MOBILE SLIDE-OVER DRAWER ================= */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="fixed top-0 right-0 bottom-0 w-4/5 max-w-xs bg-[#1a1c1c] p-5 flex flex-col justify-between shadow-2xl border-l border-white/10">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="font-headline font-bold text-sm text-[#ffb2b9] uppercase">
                    Rami Records
                  </span>
                  <span className="px-1.5 py-0.5 rounded-full bg-[#ff5070] text-[#67001e] text-[9px] font-bold">
                    CUBA
                  </span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#9ca3af]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="py-4 flex flex-col gap-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`flex items-center justify-between p-3 rounded-xl text-left text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-[#ff5070]/20 text-[#ffb2b9]'
                          : 'text-[#e2e2e2] hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4 text-[#ff5070]" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#ff5070] text-[#67001e] font-bold">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="mt-2 p-3 bg-white/5 rounded-xl flex flex-col gap-2">
                <span className="text-xs text-[#ffb2b9] font-semibold">¿Eres artista?</span>
                <p className="text-[11px] text-[#9ca3af]">
                  Buscamos la próxima estrella del reparto y trap cubano.
                </p>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenDemoModal();
                  }}
                  className="py-2 px-3 bg-[#ff5070] text-[#67001e] text-xs font-bold rounded-lg text-center"
                >
                  Enviar Demo
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 text-xs text-[#9ca3af] flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span>La Habana, Cuba</span>
                <span className="text-[#ffb2b9]">Est. 2024</span>
              </div>
              <p className="text-[10px] text-white/40">
                © 2024 Rami Records Entertainment. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ================= MOBILE BOTTOM NAVIGATION BAR ================= */}
      <nav
        id="mobile-bottom-nav"
        className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#121414]/95 backdrop-blur-xl border-t border-white/10 pb-safe"
      >
        <div className="flex justify-around items-center h-16 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`flex flex-col items-center justify-center gap-1 w-14 h-14 rounded-xl transition-all ${
                  isActive
                    ? 'text-[#ff5070]'
                    : 'text-[#9ca3af] hover:text-[#e2e2e2]'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : ''}`} />
                <span className={`text-[10px] ${isActive ? 'font-bold' : 'font-normal'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
