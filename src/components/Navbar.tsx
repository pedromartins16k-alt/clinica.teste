import React from 'react';
import { Sparkles, Calendar, Clock, ArrowRight } from 'lucide-react';

interface NavbarProps {
  currentView: 'patient' | 'admin';
  onNavigate: (view: 'patient' | 'admin') => void;
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, onOpenBooking }) => {
  return (
    <header className="sticky top-0 z-50 bg-[#FBFBFA]/90 backdrop-blur-md border-b border-[#E8E6E0] transition-all">
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        
        {/* Brand Editorial */}
        <div 
          onClick={() => onNavigate('patient')}
          className="cursor-pointer group flex items-baseline gap-3"
        >
          <span className="font-serif text-2xl md:text-3xl tracking-tight text-aura-noir font-semibold group-hover:text-aura-stone transition-colors">
            AURA
          </span>
          <span className="text-[11px] uppercase tracking-[0.25em] text-aura-stone font-medium hidden sm:inline-block">
            Studio Odontológico
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-[13px] font-medium tracking-wide uppercase">
          <button 
            onClick={() => onNavigate('patient')}
            className={`transition-colors hover:text-aura-noir ${currentView === 'patient' ? 'text-aura-noir border-b border-aura-noir pb-0.5' : 'text-aura-stone'}`}
          >
            A Clínica
          </button>
          <a 
            href="#procedimentos" 
            onClick={(e) => {
              if (currentView !== 'patient') {
                e.preventDefault();
                onNavigate('patient');
                setTimeout(() => {
                  document.getElementById('procedimentos')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }
            }}
            className="text-aura-stone hover:text-aura-noir transition-colors"
          >
            Procedimentos
          </a>
          <a 
            href="#especialistas" 
            onClick={(e) => {
              if (currentView !== 'patient') {
                e.preventDefault();
                onNavigate('patient');
                setTimeout(() => {
                  document.getElementById('especialistas')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }
            }}
            className="text-aura-stone hover:text-aura-noir transition-colors"
          >
            Corpo Clínico
          </a>
          <a 
            href="#filosofia" 
            onClick={(e) => {
              if (currentView !== 'patient') {
                e.preventDefault();
                onNavigate('patient');
                setTimeout(() => {
                  document.getElementById('filosofia')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }
            }}
            className="text-aura-stone hover:text-aura-noir transition-colors"
          >
            Filosofia
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Alternar para Painel Admin */}
          <button
            onClick={() => onNavigate(currentView === 'admin' ? 'patient' : 'admin')}
            className={`text-xs px-3.5 py-2 border border-aura-border transition-all flex items-center gap-2 ${
              currentView === 'admin' 
                ? 'bg-aura-charcoal text-white border-aura-charcoal' 
                : 'text-aura-noir bg-white hover:bg-aura-surface'
            }`}
            title="Acessar painel interno da clínica"
          >
            <Clock className="w-3.5 h-3.5 text-aura-stone" />
            <span className="hidden sm:inline font-medium">
              {currentView === 'admin' ? 'Ver Site Público' : 'Portal da Clínica'}
            </span>
            <span className="sm:hidden font-medium">
              {currentView === 'admin' ? 'Site' : 'Gestão'}
            </span>
          </button>

          {/* Botão de Agendamento Rápido */}
          <button
            onClick={onOpenBooking}
            className="bg-aura-noir text-white text-xs px-5 py-2.5 hover:bg-neutral-800 transition-all flex items-center gap-2 tracking-wide font-medium group shadow-sm"
          >
            <span>Agendar Consulta</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

      </div>
    </header>
  );
};
