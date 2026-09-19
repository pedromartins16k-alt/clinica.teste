import React, { useState } from 'react';
import { 
  ArrowRight, ShieldCheck, Microscope, HeartHandshake, 
  Award, Star, ArrowUpRight, ChevronLeft, ChevronRight
} from 'lucide-react';
import { DentalService, Professional } from '../types';

interface PatientLandingProps {
  services: DentalService[];
  professionals: Professional[];
  onOpenBookingWithService: (serviceId: string) => void;
  onOpenBookingWithProfessional: (profId: string) => void;
  onOpenBooking: () => void;
}

export const PatientLanding: React.FC<PatientLandingProps> = ({
  services,
  professionals,
  onOpenBookingWithService,
  onOpenBookingWithProfessional,
  onOpenBooking
}) => {
  const [activeSpecialistIndex, setActiveSpecialistIndex] = useState(0);
  const [hoveredServiceId, setHoveredServiceId] = useState<string | null>(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const testimonials = [
    {
      quote: "Sempre tive receio de consultórios odontológicos. Na AURA, a atmosfera arquitetônica, o silêncio e o respeito ao meu tempo transformaram o tratamento. As lentes cerâmicas ficaram indetectáveis — um trabalho de pura escultura biológica.",
      author: "Camila Rezende",
      role: "Curadora de Arte Contemporânea",
      treatment: "Lentes de Contato em Porcelana"
    },
    {
      quote: "A precisão da cirurgia guiada por tomografia 3D foi impressionante. Saí com o dente definitivo no mesmo dia, sem edema e sem dor. O Dr. Leonardo redefine a odontologia de reabilitação.",
      author: "Marcelo Fontenelle",
      role: "Arquiteto Urbanista",
      treatment: "Implantodontia com Carga Imediata"
    },
    {
      quote: "A ausência total de moldagens físicas com o scanner ótico iTero e o planejamento tridimensional no computador trouxeram um conforto que eu nunca tinha experimentado. A Dra. Sofia é uma autoridade impecável.",
      author: "Patrícia Lins",
      role: "Diretora de Inovação",
      treatment: "Ortodontia com Alinhadores Invisíveis"
    }
  ];

  const currentSpecialist = professionals[activeSpecialistIndex] || professionals[0];

  return (
    <div className="bg-aura-bone text-aura-noir selection:bg-aura-amber/25 selection:text-aura-noir">
      
      {/* 1. HERO SECTION — Composição Editorial de Campanha de Luxo */}
      <section className="relative pt-8 pb-20 md:pt-16 md:pb-28 px-6 md:px-12 max-w-7xl mx-auto border-b border-aura-border">
        
        {/* Eyebrow & Localidades */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-aura-border text-[11px] uppercase tracking-[0.25em] text-aura-stone">
          <div className="flex items-center gap-2 mb-2 sm:mb-0">
            <span className="w-1.5 h-1.5 rounded-full bg-aura-amber"></span>
            <span>Clínica de Odontologia Restauradora & Estética</span>
          </div>
          <div className="flex gap-4 font-mono text-[10px]">
            <span>São Paulo</span>
            <span>•</span>
            <span>Zurique</span>
            <span>•</span>
            <span>Lisboa</span>
          </div>
        </div>

        {/* Composição Editorial: Título Imersivo + Grid Fotográfico Assimétrico */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          
          <div className="lg:col-span-8 space-y-6">
            <h1 className="fluid-hero-title font-serif text-aura-noir font-normal">
              A elegância silenciosa de um <span className="italic font-normal">sorriso sob medida.</span>
            </h1>

            <p className="text-sm sm:text-base text-neutral-600 max-w-xl font-normal leading-relaxed">
              Aliamos diagnóstico tomográfico tridimensional, microscopia cirúrgica suíça e cerâmica biomimética para criar resultados imperceptíveis e perenes.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={onOpenBooking}
                className="bg-aura-noir text-white text-[11px] uppercase tracking-[0.2em] px-7 py-4 hover:bg-neutral-800 transition-all flex items-center gap-3 font-medium group shadow-sm"
              >
                <span>Agendar Consulta Inicial</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <a
                href="#procedimentos"
                className="border border-aura-border hover:border-aura-noir text-aura-noir text-[11px] uppercase tracking-[0.2em] px-6 py-4 transition-colors font-medium text-center"
              >
                Ver Tratamentos
              </a>
            </div>
          </div>

          {/* Fotografia Arquitetônica no Hero */}
          <div className="lg:col-span-4 relative mt-6 lg:mt-0">
            <div className="relative aspect-[4/5] overflow-hidden border border-aura-border bg-aura-surface group">
              <img 
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=900&q=80" 
                alt="Ambiente clínico AURA Studio"
                className="w-full h-full object-cover editorial-img"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-aura-noir/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[9px] uppercase tracking-[0.25em] block text-neutral-300">Arquitetura de Atendimento</span>
                <span className="font-serif text-lg text-white">Conforto Neurosensorial Exclusivo</span>
              </div>
            </div>
          </div>

        </div>

        {/* Autoridade & Números Discretos (Hairline Grid) */}
        <div className="mt-16 pt-8 border-t border-aura-border grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <div>
            <span className="font-mono text-xs text-aura-amber block mb-1">01 / HISTÓRICO</span>
            <span className="font-serif text-3xl sm:text-4xl text-aura-noir font-normal block">14+ Anos</span>
            <span className="text-[11px] text-aura-stone uppercase tracking-wider block mt-0.5">Prática Clínica Dedicada</span>
          </div>

          <div>
            <span className="font-mono text-xs text-aura-amber block mb-1">02 / CASUÍSTICA</span>
            <span className="font-serif text-3xl sm:text-4xl text-aura-noir font-normal block">+4.200</span>
            <span className="text-[11px] text-aura-stone uppercase tracking-wider block mt-0.5">Reabilitações Realizadas</span>
          </div>

          <div>
            <span className="font-mono text-xs text-aura-amber block mb-1">03 / TECNOLOGIA</span>
            <span className="font-serif text-3xl sm:text-4xl text-aura-noir font-normal block">100% 3D</span>
            <span className="text-[11px] text-aura-stone uppercase tracking-wider block mt-0.5">Fluxo Totalmente Digital</span>
          </div>

          <div>
            <span className="font-mono text-xs text-aura-amber block mb-1">04 / COMPROMISSO</span>
            <span className="font-serif text-3xl sm:text-4xl text-aura-noir font-normal block">0 min</span>
            <span className="text-[11px] text-aura-stone uppercase tracking-wider block mt-0.5">Pontualidade Absoluta</span>
          </div>
        </div>

      </section>

      {/* 2. CORPO CLÍNICO — Layout Editorial com Número Grande & Especialista em Destaque */}
      <section id="especialistas" className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto border-b border-aura-border">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-12 border-b border-aura-border gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-aura-amber font-semibold block mb-2 font-mono">
              [ 01 // ESPECIALISTAS ]
            </span>
            <h2 className="fluid-section-title font-serif text-aura-noir">
              Corpo Clínico & Titulação
            </h2>
          </div>
          <p className="text-xs text-neutral-600 max-w-md leading-relaxed">
            Cada área é liderada por mestres com pós-graduação internacional e foco exclusivo em sua respectiva subespecialidade.
          </p>
        </div>

        {/* Composição Editorial: Navegação Horizontal de Mestres */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Foto Principal Dominante com Aspect Ratio Refinado */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[3/4] overflow-hidden border border-aura-border bg-aura-surface group">
              <img 
                src={currentSpecialist.avatar} 
                alt={currentSpecialist.name}
                className="w-full h-full object-cover editorial-img"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-mono uppercase tracking-wider border border-aura-border text-aura-noir">
                {currentSpecialist.cro}
              </div>
            </div>
          </div>

          {/* Dados Detalhados & Seletor dos Especialistas */}
          <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-8">
            
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-xs text-aura-amber">
                  0{activeSpecialistIndex + 1} / 0{professionals.length}
                </span>
                <span className="text-neutral-300">•</span>
                <span className="text-xs text-aura-stone font-mono flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-aura-amber text-aura-amber" /> {currentSpecialist.rating}
                </span>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl text-aura-noir font-normal mb-2">
                {currentSpecialist.name}
              </h3>

              <span className="text-xs uppercase tracking-[0.18em] text-aura-amber font-medium block mb-4">
                {currentSpecialist.role}
              </span>

              <p className="text-sm text-neutral-600 leading-relaxed max-w-lg mb-6 font-normal">
                {currentSpecialist.bio}
              </p>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => onOpenBookingWithProfessional(currentSpecialist.id)}
                  className="bg-aura-noir text-white text-[11px] uppercase tracking-[0.2em] px-6 py-3 hover:bg-neutral-800 transition-all flex items-center gap-2 font-medium"
                >
                  <span>Reservar com {currentSpecialist.name.split(' ')[1]}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Linhas Seletoras de Cada Especialista */}
            <div className="border-t border-aura-border pt-6 space-y-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-aura-stone font-semibold block mb-3">
                Selecione o Especialista:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {professionals.map((prof, idx) => {
                  const isSelected = idx === activeSpecialistIndex;
                  return (
                    <button
                      key={prof.id}
                      onClick={() => setActiveSpecialistIndex(idx)}
                      className={`text-left p-3 border transition-all text-xs flex items-center justify-between ${
                        isSelected 
                          ? 'border-aura-noir bg-white font-semibold' 
                          : 'border-aura-border bg-aura-surface/40 hover:border-neutral-400 text-neutral-600'
                      }`}
                    >
                      <div>
                        <span className="font-mono text-[10px] text-aura-stone mr-2">0{idx + 1}</span>
                        <span>{prof.name}</span>
                      </div>
                      <span className="text-[10px] text-aura-stone font-mono">{prof.experienceYears}a</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </section>

      {/* 3. SERVIÇOS & PROCEDIMENTOS — Layout em Lista Editorial Interativa */}
      <section id="procedimentos" className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto border-b border-aura-border">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-12 border-b border-aura-border gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-aura-amber font-semibold block mb-2 font-mono">
              [ 02 // TRATAMENTOS ]
            </span>
            <h2 className="fluid-section-title font-serif text-aura-noir">
              Menu de Intervenções
            </h2>
          </div>
          <p className="text-xs text-neutral-600 max-w-md leading-relaxed">
            Procedimentos minimamente invasivos planejados digitalmente antes de qualquer intervenção física.
          </p>
        </div>

        {/* Linhas Editoriais com Interação Sofisticada */}
        <div className="divide-y divide-aura-border border-y border-aura-border">
          {services.map((service, index) => {
            const isHovered = hoveredServiceId === service.id;
            return (
              <div
                key={service.id}
                onMouseEnter={() => setHoveredServiceId(service.id)}
                onMouseLeave={() => setHoveredServiceId(null)}
                className={`py-8 md:py-10 px-4 md:px-6 transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-6 group cursor-pointer ${
                  isHovered ? 'bg-white shadow-[0_8px_30px_rgba(0,0,0,0.03)]' : 'hover:bg-aura-surface/50'
                }`}
                onClick={() => onOpenBookingWithService(service.id)}
              >
                {/* Índice e Categoria */}
                <div className="flex items-baseline gap-4 lg:w-1/4">
                  <span className="font-mono text-sm text-aura-amber">0{index + 1}</span>
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-aura-stone block mb-1 font-medium">
                      {service.category}
                    </span>
                    <span className="text-xs font-mono text-neutral-400">
                      {service.durationMinutes} min • {service.tag}
                    </span>
                  </div>
                </div>

                {/* Título & Descrição */}
                <div className="lg:w-1/2 pr-4">
                  <h3 className="font-serif text-2xl md:text-3xl text-aura-noir mb-2 group-hover:translate-x-1 transition-transform duration-300">
                    {service.title}
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed line-clamp-2 font-normal">
                    {service.description}
                  </p>
                </div>

                {/* Honorários e CTA */}
                <div className="lg:w-1/4 flex items-center justify-between lg:justify-end gap-6 pt-2 lg:pt-0">
                  <div className="text-left lg:text-right">
                    <span className="text-[10px] uppercase tracking-wider text-aura-stone block">Honorário</span>
                    <span className="text-xs font-semibold text-aura-noir font-mono">{service.priceFormatted}</span>
                  </div>

                  <div className="w-10 h-10 rounded-full border border-aura-border flex items-center justify-center group-hover:border-aura-noir group-hover:bg-aura-noir group-hover:text-white transition-all">
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </section>

      {/* 4. FILOSOFIA & MANIFESTO ARQUITETÔNICO */}
      <section id="filosofia" className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto border-b border-aura-border">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[10px] uppercase tracking-[0.3em] text-aura-amber font-semibold block font-mono">
              [ 03 // MANIFESTO ]
            </span>
            <h2 className="fluid-section-title font-serif text-aura-noir leading-tight">
              Odontologia sem pressa. Diagnósticos sem incertezas.
            </h2>
            <div className="space-y-4 text-sm text-neutral-600 leading-relaxed font-normal">
              <p>
                Eliminamos o ruído, a pressa e a impessoalidade dos consultórios tradicionais. Em nosso estúdio, cada consulta tem duração estendida para garantir escuta atenta, fotografia microscópica e simulação antes de qualquer intervenção.
              </p>
              <p>
                Acreditamos na odontologia biomimética: intervir o mínimo possível na estrutura do dente saudável para devolver estética atemporal e função biomecânica duradoura.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-8 bg-white border border-aura-border">
              <Microscope className="w-5 h-5 text-aura-noir mb-4" />
              <h3 className="font-serif text-xl text-aura-noir mb-2">Microscopia & Tomografia 3D</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Escaneamento intraoral sem moldagens físicas desconfortáveis e magnificação óptica para preservação máxima de esmalte.
              </p>
            </div>

            <div className="p-8 bg-white border border-aura-border">
              <HeartHandshake className="w-5 h-5 text-aura-noir mb-4" />
              <h3 className="font-serif text-xl text-aura-noir mb-2">Conforto Neurosensorial</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Isolamento acústico arquitetônico, controle cromático suave e analgesia computadorizada para um atendimento relaxante.
              </p>
            </div>

            <div className="p-8 bg-white border border-aura-border">
              <ShieldCheck className="w-5 h-5 text-aura-noir mb-4" />
              <h3 className="font-serif text-xl text-aura-noir mb-2">Materiais Nobres</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Cerâmicas de vidro e zircônias translúcidas provenientes de centros de excelência da Suíça e Alemanha com rastreabilidade.
              </p>
            </div>

            <div className="p-8 bg-white border border-aura-border">
              <Award className="w-5 h-5 text-aura-noir mb-4" />
              <h3 className="font-serif text-xl text-aura-noir mb-2">Pontualidade Britânica</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Agenda programada com janelas de segurança entre atendimentos. Zero filas e sala de espera vazia por planejamento.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 5. DEPOIMENTOS EDITORIAIS — Citação em Grande Escala com Navegação */}
      <section className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto border-b border-aura-border bg-aura-surface/30">
        
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <span className="text-[10px] uppercase tracking-[0.3em] text-aura-amber font-semibold block font-mono">
            [ 04 // TESTEMUNHOS REAIS ]
          </span>

          <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-aura-noir italic leading-relaxed">
            "{testimonials[testimonialIndex].quote}"
          </p>

          <div className="pt-4 border-t border-aura-border max-w-sm mx-auto flex items-center justify-between">
            <div className="text-left">
              <span className="font-medium text-xs text-aura-noir block">
                {testimonials[testimonialIndex].author}
              </span>
              <span className="text-[11px] text-aura-stone block">
                {testimonials[testimonialIndex].role} • {testimonials[testimonialIndex].treatment}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setTestimonialIndex(prev => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                className="w-8 h-8 rounded-full border border-aura-border bg-white flex items-center justify-center hover:border-aura-noir transition-colors"
                aria-label="Depoimento anterior"
              >
                <ChevronLeft className="w-4 h-4 text-aura-noir" />
              </button>
              <button
                onClick={() => setTestimonialIndex(prev => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                className="w-8 h-8 rounded-full border border-aura-border bg-white flex items-center justify-center hover:border-aura-noir transition-colors"
                aria-label="Próximo depoimento"
              >
                <ChevronRight className="w-4 h-4 text-aura-noir" />
              </button>
            </div>
          </div>
        </div>

      </section>

      {/* 6. CALL TO ACTION EDITORIAL FINAL */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-5xl mx-auto text-center">
        <span className="text-[10px] uppercase tracking-[0.3em] text-aura-stone font-semibold block mb-4 font-mono">
          ATENDIMENTO COM HORA MARCADA
        </span>

        <h2 className="fluid-hero-title font-serif text-aura-noir mb-6 leading-none">
          O primeiro passo para a sua <span className="italic font-normal">reabilitação.</span>
        </h2>

        <p className="text-sm md:text-base text-neutral-600 max-w-xl mx-auto mb-10 leading-relaxed font-normal">
          Agende seu diagnóstico com o corpo clínico da AURA. Escolha a subespecialidade e reserve o horário diretamente no sistema.
        </p>

        <button
          onClick={onOpenBooking}
          className="bg-aura-noir text-white text-xs uppercase tracking-[0.25em] px-10 py-5 hover:bg-neutral-800 transition-all font-medium shadow-sm group inline-flex items-center gap-3"
        >
          <span>Iniciar Agendamento Online</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </section>

      {/* 7. FOOTER EDITORIAL COM ASSINATURA VISUAL 'AURA' */}
      <footer className="bg-[#0C0D0E] text-[#F9F8F6] pt-20 pb-12 px-6 md:px-12 border-t border-neutral-900 text-xs">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-neutral-800">
            <div>
              <span className="font-serif text-3xl text-white block mb-2 font-medium tracking-wide">AURA</span>
              <span className="text-[10px] text-neutral-400 block mb-4 uppercase tracking-[0.25em]">Dental Studio</span>
              <p className="text-neutral-400 leading-relaxed text-[11px] max-w-xs">
                Centro de excelência em biomimética dental, estética restauradora e microcirurgia piezoelétrica guiada.
              </p>
            </div>

            <div>
              <span className="text-white font-medium uppercase tracking-wider block mb-3 text-[11px]">Unidade São Paulo</span>
              <p className="text-neutral-400 leading-relaxed text-[11px] mb-2">
                Av. Brigadeiro Faria Lima, 3477 — 18º Andar<br />
                Itaim Bibi, São Paulo - SP
              </p>
              <p className="text-neutral-400 text-[11px]">
                WhatsApp: (11) 98412-4091<br />
                atendimento@auradental.com.br
              </p>
            </div>

            <div>
              <span className="text-white font-medium uppercase tracking-wider block mb-3 text-[11px]">Horários de Atendimento</span>
              <p className="text-neutral-400 leading-relaxed text-[11px]">
                Segunda a Sexta: 08h às 19h30<br />
                Sábado: 08h30 às 13h (Retornos & Diagnósticos)<br />
                Domingo e Feriados: Fechado
              </p>
            </div>

            <div>
              <span className="text-white font-medium uppercase tracking-wider block mb-3 text-[11px]">Direção & Registro</span>
              <p className="text-neutral-400 leading-relaxed text-[11px]">
                Resp. Técnica: Dra. Helena Van Der Valk<br />
                CRO-SP 104.928 | EPAO-SP 42.109<br />
                Alvará Sanitário PMSP 81.204/2026<br />
                Membro SBOE & Academia Europeia de Odontologia Estética.
              </p>
            </div>
          </div>

          {/* Logotipo Gigante Tipográfico como Encerramento Editorial */}
          <div className="pt-12 pb-8 flex flex-col sm:flex-row items-baseline justify-between text-neutral-600 text-[11px]">
            <span>© 2026 AURA Dental Studio. Todos os direitos reservados.</span>
            <span className="mt-2 sm:mt-0 font-mono text-[10px] tracking-widest uppercase">
              Contemporary Editorial Experience
            </span>
          </div>

        </div>
      </footer>

    </div>
  );
};
