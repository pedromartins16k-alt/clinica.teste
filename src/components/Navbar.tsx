import React, { useState, useEffect } from 'react';
import { Clock, ArrowRight, Menu, X } from 'lucide-react';

interface NavbarProps {
  currentView: 'patient' | 'admin';
  onNavigate: (view: 'patient' | 'admin') => void;
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, onOpenBooking }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    if (currentView !== 'patient') {
      onNavigate('patient');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header 
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-[#F9F8F6]/95 backdrop-blur-md border-b border-[#E5E1D8] py-3.5 shadow-[0_4px_24px_rgba(0,0,0,0.02)]' 
            : 'bg-[#F9F8F6]/80 backdrop-blur-sm border-b border-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Brand Editorial */}
          <div 
            onClick={() => {
              onNavigate('patient');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="cursor-pointer group flex items-baseline gap-3 select-none"
          >
            <span className="font-serif text-2xl md:text-3xl tracking-tight text-aura-noir font-semibold group-hover:opacity-75 transition-opacity">
              AURA
            </span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-aura-stone font-medium hidden sm:inline-block">
              Dental Studio
            </span>
          </div>

          {/* Navigation Links Desktop */}
          <nav className="hidden md:flex items-center gap-10 text-[12px] font-medium tracking-[0.18em] uppercase text-neutral-600">
            <button 
              onClick={() => {
                onNavigate('patient');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`transition-colors hover:text-aura-noir relative py-1 ${
                currentView === 'patient' 
                  ? 'text-aura-noir after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-aura-noir' 
                  : 'text-aura-stone'
              }`}
            >
              Estúdio
            </button>
            <button 
              onClick={() => handleLinkClick('especialistas')}
              className="hover:text-aura-noir transition-colors py-1"
            >
              Corpo Clínico
            </button>
            <button 
              onClick={() => handleLinkClick('procedimentos')}
              className="hover:text-aura-noir transition-colors py-1"
            >
              Tratamentos
            </button>
            <button 
              onClick={() => handleLinkClick('filosofia')}
              className="hover:text-aura-noir transition-colors py-1"
            >
              Filosofia
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Alternar para Painel Admin */}
            <button
              onClick={() => onNavigate(currentView === 'admin' ? 'patient' : 'admin')}
              className={`text-xs px-3.5 py-2 border transition-all flex items-center gap-2 ${
                currentView === 'admin' 
                  ? 'bg-aura-noir text-white border-aura-noir' 
                  : 'text-aura-noir border-aura-border bg-white/70 hover:bg-aura-surface'
              }`}
              title="Acessar painel interno da clínica"
            >
              <Clock className="w-3.5 h-3.5 text-aura-stone" />
              <span className="hidden sm:inline font-medium tracking-wider text-[11px] uppercase">
                {currentView === 'admin' ? 'Ver Site' : 'Gestão'}
              </span>
            </button>

            {/* Botão de Agendamento Rápido com Efeito Editorial */}
            <button
              onClick={onOpenBooking}
              className="relative overflow-hidden bg-aura-noir text-white text-[11px] uppercase tracking-[0.2em] px-5 py-2.5 hover:bg-neutral-800 transition-all flex items-center gap-2.5 font-medium group"
            >
              <span>Agendar</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            {/* Hambúrguer Mobile Minimalista */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-aura-noir hover:bg-aura-surface transition-colors"
              aria-label="Abrir menu de navegação"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Menu Mobile Overlay Minimalista */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#F9F8F6] pt-24 px-8 md:hidden flex flex-col justify-between pb-12 animate-fadeIn border-t border-aura-border">
          <div className="flex flex-col gap-6 text-left">
            <span className="text-[10px] uppercase tracking-[0.25em] text-aura-stone font-semibold">Navegação</span>
            <button 
              onClick={() => {
                onNavigate('patient');
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="font-serif text-3xl text-aura-noir text-left hover:opacity-70 transition-opacity"
            >
              O Estúdio
            </button>
            <button 
              onClick={() => handleLinkClick('especialistas')}
              className="font-serif text-3xl text-aura-noir text-left hover:opacity-70 transition-opacity"
            >
              Corpo Clínico
            </button>
            <button 
              onClick={() => handleLinkClick('procedimentos')}
              className="font-serif text-3xl text-aura-noir text-left hover:opacity-70 transition-opacity"
            >
              Menu de Tratamentos
            </button>
            <button 
              onClick={() => handleLinkClick('filosofia')}
              className="font-serif text-3xl text-aura-noir text-left hover:opacity-70 transition-opacity"
            >
              Filosofia & Tecnologia
            </button>
          </div>

          <div className="pt-8 border-t border-aura-border space-y-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full bg-aura-noir text-white py-3.5 text-xs font-medium uppercase tracking-[0.2em] flex items-center justify-center gap-2"
            >
              <span>Reservar Consulta Online</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate(currentView === 'admin' ? 'patient' : 'admin');
              }}
              className="w-full border border-aura-border py-3 text-xs font-medium uppercase tracking-wider text-aura-noir"
            >
              {currentView === 'admin' ? 'Retornar ao Site' : 'Acessar Portal da Clínica'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
