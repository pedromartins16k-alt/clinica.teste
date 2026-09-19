import React, { useState } from 'react';
import { 
  ArrowRight, ShieldCheck, Microscope, HeartHandshake, 
  Award, Star, ArrowUpRight, ChevronLeft, ChevronRight, Sparkles
} from 'lucide-react';
import { DentalService, Professional } from '../types';
import { INITIAL_PROFESSIONALS } from '../data';

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

  const safeProfessionals = (professionals && professionals.length > 0) ? professionals : INITIAL_PROFESSIONALS;
  const currentSpecialist = safeProfessionals[activeSpecialistIndex] || safeProfessionals[0] || INITIAL_PROFESSIONALS[0];

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

  return (
    <div className="bg-aura-bone text-aura-charcoal selection:bg-aura-terracotta/20 selection:text-aura-forest">
      
      {/* =========================================================================
          1. HERO SECTION — Off-White Quente com Acentos Sálvia e Terracota
          ========================================================================= */}
      <section className="relative pt-8 pb-20 md:pt-16 md:pb-28 px-6 md:px-12 max-w-7xl mx-auto border-b border-aura-border overflow-hidden">
        
        {/* Halos de Luz Sutil (Conceito AURA) */}
        <div className="aura-halo w-96 h-96 bg-aura-amber/15 -top-20 -left-20" />
        <div className="aura-halo w-80 h-80 bg-aura-sage/10 top-40 right-10" />

        {/* Eyebrow & Metrópoles */}
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-aura-border text-[11px] uppercase tracking-[0.25em]">
          <div className="flex items-center gap-2 mb-2 sm:mb-0 text-aura-forest font-semibold">
            <span className="w-2 h-2 rounded-full bg-aura-terracotta animate-pulse"></span>
            <span>Ateliê Odontológico & Reabilitação Oral</span>
          </div>
          <div className="flex gap-4 font-mono text-[10px] text-aura-stone">
            <span>São Paulo</span>
            <span className="text-aura-amber">•</span>
            <span>Zurique</span>
            <span className="text-aura-amber">•</span>
            <span>Lisboa</span>
          </div>
        </div>

        {/* Composição Editorial: Tipografia com Ritmo de Cor + Moldura Fotográfica com Halo */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          
          <div className="lg:col-span-8 space-y-6">
            <h1 className="fluid-hero-title font-serif text-aura-forest font-normal">
              A elegância viva de um <span className="italic font-normal text-aura-terracotta">sorriso singular.</span>
            </h1>

            <p className="text-sm sm:text-base text-neutral-700 max-w-xl font-normal leading-relaxed">
              Combinamos o rigor da microscopia óptica suíça com a sensibilidade da cerâmica biomimética. Uma nova assinatura estética construída em harmonia com sua anatomia facial.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={onOpenBooking}
                className="bg-aura-forest text-white text-[11px] uppercase tracking-[0.2em] px-7 py-4 hover:bg-aura-terracotta transition-colors duration-300 flex items-center gap-3 font-medium group shadow-md"
              >
                <span>Agendar Consulta Inicial</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 text-aura-amber" />
              </button>

              <a
                href="#especialistas"
                className="border border-aura-forest/30 hover:border-aura-forest text-aura-forest text-[11px] uppercase tracking-[0.2em] px-6 py-4 transition-colors font-medium text-center bg-white/50"
              >
                Conhecer Mestres
              </a>
            </div>
          </div>

          {/* Fotografia Arquitetônica com Moldura e Badge Terracota */}
          <div className="lg:col-span-4 relative mt-6 lg:mt-0">
            <div className="relative aspect-[4/5] overflow-hidden border-2 border-aura-surface bg-white shadow-xl group">
              <img 
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=900&q=80" 
                alt="Ambiente acolhedor AURA Studio"
                className="w-full h-full object-cover editorial-img"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-aura-forestDark/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-4 right-4 bg-aura-terracotta text-white text-[9px] uppercase tracking-[0.2em] px-2.5 py-1 font-semibold shadow-sm">
                Boutique Care
              </div>
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="text-[10px] uppercase tracking-[0.25em] block text-aura-amber font-mono mb-0.5">Atmosfera Acolhedora</span>
                <span className="font-serif text-xl text-white block">Precisão & Calor Humano</span>
              </div>
            </div>
          </div>

        </div>

        {/* Linha de Autoridade Cromática */}
        <div className="mt-16 pt-8 border-t border-aura-border grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <div className="p-4 bg-white/60 border border-aura-border/60">
            <span className="font-mono text-xs text-aura-terracotta font-semibold block mb-1">01 / HISTÓRICO</span>
            <span className="font-serif text-3xl sm:text-4xl text-aura-forest font-medium block">14+ Anos</span>
            <span className="text-[11px] text-aura-stone uppercase tracking-wider block mt-0.5">Prática Clínica Dedicada</span>
          </div>

          <div className="p-4 bg-white/60 border border-aura-border/60">
            <span className="font-mono text-xs text-aura-terracotta font-semibold block mb-1">02 / CASUÍSTICA</span>
            <span className="font-serif text-3xl sm:text-4xl text-aura-forest font-medium block">+4.200</span>
            <span className="text-[11px] text-aura-stone uppercase tracking-wider block mt-0.5">Reabilitações Realizadas</span>
          </div>

          <div className="p-4 bg-white/60 border border-aura-border/60">
            <span className="font-mono text-xs text-aura-terracotta font-semibold block mb-1">03 / TECNOLOGIA</span>
            <span className="font-serif text-3xl sm:text-4xl text-aura-forest font-medium block">100% 3D</span>
            <span className="text-[11px] text-aura-stone uppercase tracking-wider block mt-0.5">Fluxo Totalmente Digital</span>
          </div>

          <div className="p-4 bg-white/60 border border-aura-border/60">
            <span className="font-mono text-xs text-aura-terracotta font-semibold block mb-1">04 / COMPROMISSO</span>
            <span className="font-serif text-3xl sm:text-4xl text-aura-forest font-medium block">0 min</span>
            <span className="text-[11px] text-aura-stone uppercase tracking-wider block mt-0.5">Pontualidade Absoluta</span>
          </div>
        </div>

      </section>

      {/* =========================================================================
          2. SEÇÃO ESPECIALISTAS — GRANDE BLOCO DE COR: VERDE FLORESTA PROFUNDO (#1B2E24)
          Contraste dramático com o Hero, tipografia clara e detalhes terracota
          ========================================================================= */}
      <section id="especialistas" className="py-24 md:py-32 px-6 md:px-12 bg-aura-forest text-[#F7F4EE] border-b border-aura-forestDark">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-14 border-b border-white/15 gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-aura-amber font-semibold block mb-2 font-mono">
                [ CORPO CLÍNICO & TITULAÇÃO ]
              </span>
              <h2 className="fluid-section-title font-serif text-white">
                Mestres de Referência Internacional
              </h2>
            </div>
            <p className="text-xs text-neutral-300 max-w-md leading-relaxed">
              Formação em centros de excelência de Zurique e São Paulo. Cada profissional atua exclusivamente em sua subespecialidade.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Foto Dominante com Borda Dourada Suave e Saturação Expressiva */}
            <div className="lg:col-span-5 relative">
              {/* Número Gigante Editorial em Baixo Contraste */}
              <span className="absolute -top-10 -left-6 font-serif text-[7rem] md:text-[9rem] leading-none text-white/5 font-bold select-none pointer-events-none">
                0{activeSpecialistIndex + 1}
              </span>

              <div className="relative aspect-[3/4] overflow-hidden border border-white/20 shadow-2xl bg-aura-forestDark group">
                <img 
                  src={currentSpecialist.avatar} 
                  alt={currentSpecialist.name}
                  className="w-full h-full object-cover editorial-img"
                />
                <div className="absolute top-4 left-4 bg-aura-forestDark/90 backdrop-blur-sm px-3.5 py-1 text-[10px] font-mono uppercase tracking-wider border border-white/20 text-white">
                  {currentSpecialist.cro}
                </div>
                <div className="absolute bottom-4 right-4 bg-aura-terracotta text-white text-[10px] font-mono px-2.5 py-1 uppercase tracking-wider font-semibold">
                  {currentSpecialist.experienceYears} Anos Prática
                </div>
              </div>
            </div>

            {/* Informações do Especialista com Tipografia Clara e Destaques Terracota */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
              
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-mono text-xs text-aura-terracotta font-semibold">
                    0{activeSpecialistIndex + 1} / 0{safeProfessionals.length}
                  </span>
                  <span className="text-white/30">•</span>
                  <span className="text-xs text-neutral-300 font-mono flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-aura-amber text-aura-amber" /> {currentSpecialist.rating}
                  </span>
                </div>

                <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-normal mb-2">
                  {currentSpecialist.name}
                </h3>

                <span className="text-xs uppercase tracking-[0.2em] text-aura-amber font-medium block mb-6">
                  {currentSpecialist.role}
                </span>

                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-lg mb-8 font-normal">
                  {currentSpecialist.bio}
                </p>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => onOpenBookingWithProfessional(currentSpecialist.id)}
                    className="bg-aura-terracotta hover:bg-aura-terracottaDark transition-colors text-white text-[11px] uppercase tracking-[0.2em] px-7 py-3.5 flex items-center gap-2.5 font-medium shadow-md"
                  >
                    <span>Reservar com {currentSpecialist.name.split(' ')[1]}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Botões Seletores no Bloco Escuro */}
              <div className="border-t border-white/15 pt-6 space-y-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-3">
                  Alternar Especialista:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {safeProfessionals.map((prof, idx) => {
                    const isSelected = idx === activeSpecialistIndex;
                    return (
                      <button
                        key={prof.id}
                        onClick={() => setActiveSpecialistIndex(idx)}
                        className={`text-left p-3.5 border transition-all text-xs flex items-center justify-between ${
                          isSelected 
                            ? 'border-aura-terracotta bg-white/10 text-white font-semibold' 
                            : 'border-white/15 bg-white/5 hover:border-white/40 text-neutral-300'
                        }`}
                      >
                        <div>
                          <span className="font-mono text-[10px] text-aura-amber mr-2">0{idx + 1}</span>
                          <span>{prof.name}</span>
                        </div>
                        <span className="text-[10px] text-neutral-400 font-mono">{prof.specialty.split('&')[0]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          3. TRATAMENTOS & PROCEDIMENTOS — Fundo Claro com Hover Sálvia & Terracota
          ========================================================================= */}
      <section id="procedimentos" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto border-b border-aura-border">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-12 border-b border-aura-border gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-aura-terracotta font-semibold block mb-2 font-mono">
              [ CATÁLOGO DE INTERVENÇÕES ]
            </span>
            <h2 className="fluid-section-title font-serif text-aura-forest">
              Tratamentos Minimamente Invasivos
            </h2>
          </div>
          <p className="text-xs text-neutral-600 max-w-md leading-relaxed">
            Planejamento biomimético digital: preservação máxima da estrutura biológica com previsibilidade estética.
          </p>
        </div>

        {/* Linhas Editoriais Interativas com Destaque Cromático no Hover */}
        <div className="divide-y divide-aura-border border-y border-aura-border">
          {services.map((service, index) => {
            const isHovered = hoveredServiceId === service.id;
            return (
              <div
                key={service.id}
                onMouseEnter={() => setHoveredServiceId(service.id)}
                onMouseLeave={() => setHoveredServiceId(null)}
                className={`py-8 md:py-10 px-4 md:px-6 transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-6 group cursor-pointer ${
                  isHovered ? 'bg-aura-sageLight/50 pl-8' : 'hover:bg-aura-surface/50'
                }`}
                onClick={() => onOpenBookingWithService(service.id)}
              >
                {/* Índice e Categoria */}
                <div className="flex items-baseline gap-4 lg:w-1/4">
                  <span className={`font-mono text-base font-semibold transition-colors ${
                    isHovered ? 'text-aura-terracotta' : 'text-aura-forest'
                  }`}>
                    0{index + 1}
                  </span>
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-aura-stone block mb-1 font-semibold">
                      {service.category}
                    </span>
                    <span className="text-xs font-mono text-aura-sage">
                      {service.durationMinutes} min • {service.tag}
                    </span>
                  </div>
                </div>

                {/* Título & Descrição */}
                <div className="lg:w-1/2 pr-4">
                  <h3 className={`font-serif text-2xl md:text-3xl mb-2 transition-colors ${
                    isHovered ? 'text-aura-forest font-semibold' : 'text-aura-charcoal font-normal'
                  }`}>
                    {service.title}
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed line-clamp-2 font-normal">
                    {service.description}
                  </p>
                </div>

                {/* Honorários e CTA */}
                <div className="lg:w-1/4 flex items-center justify-between lg:justify-end gap-6 pt-2 lg:pt-0">
                  <div className="text-left lg:text-right">
                    <span className="text-[10px] uppercase tracking-wider text-aura-stone block">Honorário Estimado</span>
                    <span className="text-sm font-semibold text-aura-forest font-mono">{service.priceFormatted}</span>
                  </div>

                  <div className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all ${
                    isHovered 
                      ? 'border-aura-terracotta bg-aura-terracotta text-white shadow-md' 
                      : 'border-aura-border bg-white text-aura-forest'
                  }`}>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </section>

      {/* =========================================================================
          4. MANIFESTO & FILOSOFIA — Fundo Quente Texturizado com Cards Sálvia
          ========================================================================= */}
      <section id="filosofia" className="py-24 md:py-32 px-6 md:px-12 bg-aura-surface border-b border-aura-border">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[10px] uppercase tracking-[0.3em] text-aura-terracotta font-semibold block font-mono">
              [ NOSSA FILOSOFIA ]
            </span>
            <h2 className="fluid-section-title font-serif text-aura-forest leading-tight">
              Odontologia sem pressa. Diagnósticos com clareza absoluta.
            </h2>
            <div className="space-y-4 text-sm text-neutral-700 leading-relaxed font-normal">
              <p>
                Eliminamos a impessoalidade e a pressa mecânica. Na AURA, cada consulta é planejada com janelas estendidas para fotografia microscópica, escuta clínica atenta e simulação tridimensional antes de qualquer intervenção.
              </p>
              <p>
                Acreditamos na biomimética: intervir o mínimo possível na estrutura do dente saudável para devolver estética perene e oclusão funcional.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-8 bg-white border border-aura-border shadow-sm hover:border-aura-sage transition-colors">
              <Microscope className="w-6 h-6 text-aura-forest mb-4" />
              <h3 className="font-serif text-xl text-aura-forest mb-2">Microscopia Óptica & 3D</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Escaneamento intraoral sem moldagens físicas desconfortáveis e magnificação operatória para preservação de esmalte natural.
              </p>
            </div>

            <div className="p-8 bg-white border border-aura-border shadow-sm hover:border-aura-sage transition-colors">
              <HeartHandshake className="w-6 h-6 text-aura-terracotta mb-4" />
              <h3 className="font-serif text-xl text-aura-forest mb-2">Conforto Neurosensorial</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Isolamento acústico arquitetônico, cromoterapia suave e analgesia computadorizada para uma experiência sem ansiedade.
              </p>
            </div>

            <div className="p-8 bg-white border border-aura-border shadow-sm hover:border-aura-sage transition-colors">
              <ShieldCheck className="w-6 h-6 text-aura-sage mb-4" />
              <h3 className="font-serif text-xl text-aura-forest mb-2">Cerâmica Biomimética</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Lentes e facetas em porcelana feldspática ultrafina de manufatura artesanal, com translucidez e reflexo idênticos ao dente natural.
              </p>
            </div>

            <div className="p-8 bg-white border border-aura-border shadow-sm hover:border-aura-sage transition-colors">
              <Award className="w-6 h-6 text-aura-amber mb-4" />
              <h3 className="font-serif text-xl text-aura-forest mb-2">Pontualidade Britânica</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Agenda desenhada com rigor milimétrico. Sala de espera vazia por respeito integral à sua rotina.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          5. DEPOIMENTOS — FAIXA COLORIDA: TERRACOTA SUAVE (#FBF0EB) COM TIPOGRAFIA VIBRANTE
          ========================================================================= */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-aura-terracottaLight border-b border-aura-border">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          
          <span className="text-[10px] uppercase tracking-[0.3em] text-aura-terracotta font-semibold block font-mono">
            [ HISTÓRIAS & VOZES REAIS ]
          </span>

          <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-aura-forest italic leading-relaxed font-normal">
            "{testimonials[testimonialIndex].quote}"
          </p>

          <div className="pt-6 border-t border-aura-terracotta/20 max-w-sm mx-auto flex items-center justify-between">
            <div className="text-left">
              <span className="font-semibold text-sm text-aura-forest block">
                {testimonials[testimonialIndex].author}
              </span>
              <span className="text-[11px] text-aura-terracotta font-medium block">
                {testimonials[testimonialIndex].role} • {testimonials[testimonialIndex].treatment}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setTestimonialIndex(prev => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                className="w-9 h-9 rounded-full border border-aura-terracotta/40 bg-white flex items-center justify-center hover:bg-aura-terracotta hover:text-white transition-colors"
                aria-label="Depoimento anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setTestimonialIndex(prev => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                className="w-9 h-9 rounded-full border border-aura-terracotta/40 bg-white flex items-center justify-center hover:bg-aura-terracotta hover:text-white transition-colors"
                aria-label="Próximo depoimento"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          6. CALL TO ACTION FINAL — COLOR BLOCK: VERDE FLORESTA COM DETALHES DOURADOS
          ========================================================================= */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-aura-forest text-white text-center relative overflow-hidden">
        
        {/* Halos Decorativos */}
        <div className="aura-halo w-96 h-96 bg-aura-amber/10 top-0 left-1/2 -translate-x-1/2" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <span className="text-[10px] uppercase tracking-[0.3em] text-aura-amber font-semibold block font-mono">
            CONSULTAS COM HORA MARCADA
          </span>

          <h2 className="fluid-hero-title font-serif text-white font-normal leading-none">
            O primeiro passo para o seu <span className="italic font-normal text-aura-amber">novo sorriso.</span>
          </h2>

          <p className="text-sm md:text-base text-neutral-300 max-w-xl mx-auto leading-relaxed font-normal">
            Agende seu check-up digital com escaneamento iTero 3D e converse diretamente com nossos mestres.
          </p>

          <div className="pt-4">
            <button
              onClick={onOpenBooking}
              className="bg-aura-terracotta hover:bg-aura-terracottaDark text-white text-xs uppercase tracking-[0.25em] px-10 py-5 transition-colors font-medium shadow-xl group inline-flex items-center gap-3"
            >
              <span>Iniciar Agendamento Online</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>

      </section>

      {/* =========================================================================
          7. FOOTER EDITORIAL COMPLETO
          ========================================================================= */}
      <footer className="bg-aura-noir text-[#F7F4EE] pt-20 pb-12 px-6 md:px-12 border-t border-neutral-900 text-xs">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-neutral-800">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-aura-terracotta"></span>
                <span className="font-serif text-3xl text-white font-medium tracking-wide">AURA</span>
              </div>
              <span className="text-[10px] text-aura-amber block mb-4 uppercase tracking-[0.25em]">Dental Studio</span>
              <p className="text-neutral-400 leading-relaxed text-[11px] max-w-xs">
                Centro de excelência em biomimética dental, cerâmicas restauradoras e microcirurgia guiada.
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

          {/* Logotipo Monumental Tipográfico AURA com Leve Brilho Terracota no Hover */}
          <div className="pt-16 pb-8 border-b border-neutral-900 select-none overflow-hidden text-center sm:text-left">
            <span className="font-serif text-[clamp(4.5rem,14vw,11.5rem)] leading-none tracking-tight text-neutral-800/60 block font-normal hover:text-aura-sage/30 transition-colors">
              AURA
            </span>
          </div>

          <div className="pt-8 pb-4 flex flex-col sm:flex-row items-baseline justify-between text-neutral-500 text-[11px]">
            <span>© 2026 AURA Dental Studio. Todos os direitos reservados.</span>
            <span className="mt-2 sm:mt-0 font-mono text-[10px] tracking-[0.2em] uppercase text-neutral-500">
              Contemporary Editorial Experience
            </span>
          </div>

        </div>
      </footer>

    </div>
  );
};
