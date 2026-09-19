import React, { useState } from 'react';
import { 
  Sparkles, ArrowRight, ShieldCheck, Microscope, HeartHandshake, 
  Award, Clock, Star, ChevronDown, CheckCircle, Phone, MapPin
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
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  const categories = ['Todos', 'Estética', 'Ortodontia', 'Reabilitação', 'Prevenção'];

  const filteredServices = selectedCategory === 'Todos' 
    ? services 
    : services.filter(s => s.category === selectedCategory);

  return (
    <div className="bg-aura-bone text-aura-noir">
      
      {/* 1. HERO EDITORIAL (Assimetria, Respiro e Números Grandes) */}
      <section className="relative pt-12 pb-24 md:pt-20 md:pb-32 px-6 md:px-12 max-w-7xl mx-auto border-b border-aura-border">
        
        {/* Eyebrow Editorial */}
        <div className="inline-flex items-center gap-2 mb-6 text-xs uppercase tracking-[0.25em] text-aura-stone font-medium">
          <span className="w-2 h-2 rounded-full bg-aura-amber"></span>
          <span>Boutique Odontológica • São Paulo & Zurique</span>
        </div>

        {/* Título de Impacto Editorial */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.03] text-aura-noir font-normal">
              A harmonia entre <span className="italic font-normal">biologia dental</span> e precisão artística.
            </h1>
          </div>
          <div className="lg:col-span-4 lg:pl-6 pb-2">
            <p className="text-sm md:text-base text-neutral-600 leading-relaxed mb-6 font-normal">
              Redefinimos a experiência odontológica unindo escaneamento tridimensional, microscopia operatória e biomimética para criar sorrisos naturais, autênticos e longevos.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={onOpenBooking}
                className="bg-aura-noir text-white text-xs px-6 py-3.5 hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 uppercase tracking-wider font-medium group"
              >
                <span>Reservar Atendimento</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
              <a
                href="#procedimentos"
                className="text-xs px-5 py-3.5 border border-aura-border hover:border-aura-noir text-aura-noir transition-colors text-center uppercase tracking-wider font-medium"
              >
                Explorar Tratamentos
              </a>
            </div>
          </div>
        </div>

        {/* Linha de Métricas Clínicas / Hairline */}
        <div className="mt-16 pt-10 border-t border-aura-border grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <span className="font-serif text-3xl md:text-5xl text-aura-noir block font-normal">14+</span>
            <span className="text-xs text-aura-stone uppercase tracking-wider font-medium mt-1 block">
              Anos de Prática Clínica
            </span>
          </div>
          <div>
            <span className="font-serif text-3xl md:text-5xl text-aura-noir block font-normal">4.200</span>
            <span className="text-xs text-aura-stone uppercase tracking-wider font-medium mt-1 block">
              Sorrisos Reabilitados
            </span>
          </div>
          <div>
            <span className="font-serif text-3xl md:text-5xl text-aura-noir block font-normal">100%</span>
            <span className="text-xs text-aura-stone uppercase tracking-wider font-medium mt-1 block">
              Fluxo Digital Guiado
            </span>
          </div>
          <div>
            <span className="font-serif text-3xl md:text-5xl text-aura-noir block font-normal">0 min</span>
            <span className="text-xs text-aura-stone uppercase tracking-wider font-medium mt-1 block">
              Tempo Médio de Espera
            </span>
          </div>
        </div>

      </section>

      {/* 2. MANIFESTO & FILOSOFIA (Respiro Arquitetônico) */}
      <section id="filosofia" className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto border-b border-aura-border">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <span className="text-xs uppercase tracking-[0.25em] text-aura-stone font-semibold block mb-2">
              Nossa Filosofia
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-aura-noir leading-tight mb-6">
              Odontologia sem pressa. Diagnósticos sem incertezas.
            </h2>
            <div className="space-y-4 text-sm text-neutral-600 leading-relaxed">
              <p>
                Eliminamos o ruído, o desconforto e a impessoalidade dos consultórios tradicionais. Em nosso estúdio, cada consulta tem duração estendida para garantir escuta atenta, fotografia microscópica e simulação antes de qualquer intervenção.
              </p>
              <p>
                Acreditamos na odontologia biomimética: intervir o mínimo possível na estrutura do dente saudável para devolver estética atemporal e função biomecânica duradoura.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 bg-aura-surface border border-aura-border">
              <Microscope className="w-6 h-6 text-aura-noir mb-4" />
              <h3 className="font-medium text-base text-aura-noir mb-2">Tecnologia Suíça & 3D</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Escaneamento ótico de última geração iTero e tomografia Cone-Beam de radiação ultrabaixa no próprio estúdio.
              </p>
            </div>
            <div className="p-6 bg-aura-surface border border-aura-border">
              <HeartHandshake className="w-6 h-6 text-aura-noir mb-4" />
              <h3 className="font-medium text-base text-aura-noir mb-2">Conforto Neurosensorial</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Ambiente com isolamento acústico, aromaterapia botânica e analgesia computadorizada indolor.
              </p>
            </div>
            <div className="p-6 bg-aura-surface border border-aura-border">
              <ShieldCheck className="w-6 h-6 text-aura-noir mb-4" />
              <h3 className="font-medium text-base text-aura-noir mb-2">Garantia Clínica Aura</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Acompanhamento preventivo semestral e certificados de autenticidade dos materiais nobres empregados.
              </p>
            </div>
            <div className="p-6 bg-aura-surface border border-aura-border">
              <Award className="w-6 h-6 text-aura-noir mb-4" />
              <h3 className="font-medium text-base text-aura-noir mb-2">Comunicação Transparente</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Planejamento de custos claro, sem surpresas, com acesso irrestrito a exames e fotos clínicas pelo portal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROCEDIMENTOS & SERVIÇOS (Catálogo com Filtros Reais) */}
      <section id="procedimentos" className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto border-b border-aura-border">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-aura-stone font-semibold block mb-2">
              Menu de Tratamentos
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-aura-noir">
              Especialidades Clínicas
            </h2>
          </div>

          {/* Filtros em Tabs Sutis */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-3.5 py-1.5 transition-all uppercase tracking-wider ${
                  selectedCategory === cat 
                    ? 'bg-aura-noir text-white font-medium' 
                    : 'bg-aura-surface text-aura-stone hover:text-aura-noir hover:bg-neutral-200/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de Serviços */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map(service => (
            <div 
              key={service.id}
              className="p-8 bg-white border border-aura-border hover:border-aura-noir transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] uppercase tracking-widest text-aura-stone font-medium bg-aura-surface px-2.5 py-1">
                    {service.tag}
                  </span>
                  <span className="text-xs text-neutral-400 font-mono">
                    {service.durationMinutes} min
                  </span>
                </div>
                <h3 className="font-serif text-2xl text-aura-noir mb-3 font-medium group-hover:text-neutral-700 transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed mb-6 font-normal">
                  {service.description}
                </p>
              </div>

              <div className="pt-5 border-t border-aura-border flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-aura-stone block">Estimativa</span>
                  <span className="text-xs font-semibold text-aura-noir">{service.priceFormatted}</span>
                </div>
                <button
                  onClick={() => onOpenBookingWithService(service.id)}
                  className="text-xs font-medium uppercase tracking-wider text-aura-noir hover:text-aura-amber flex items-center gap-1.5 group-hover:translate-x-0.5 transition-all"
                >
                  <span>Agendar</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* 4. CORPO CLÍNICO EDITORIAL */}
      <section id="especialistas" className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto border-b border-aura-border">
        
        <div className="mb-14">
          <span className="text-xs uppercase tracking-[0.25em] text-aura-stone font-semibold block mb-2">
            Mestres & Pesquisadores
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-aura-noir">
            Nosso Corpo Clínico
          </h2>
          <p className="text-xs text-neutral-600 max-w-xl mt-2 leading-relaxed">
            Profissionais dedicados exclusivamente a cada subespecialidade, aliando titulação acadêmica e vasta experiência prática.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {professionals.map(prof => (
            <div 
              key={prof.id}
              className="p-6 md:p-8 bg-white border border-aura-border flex flex-col sm:flex-row gap-6 items-start"
            >
              <img 
                src={prof.avatar} 
                alt={prof.name}
                className="w-28 h-36 sm:w-32 sm:h-40 object-cover grayscale shrink-0 border border-aura-border"
              />
              <div className="flex-1 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] uppercase tracking-wider font-mono text-aura-stone">{prof.cro}</span>
                    <span className="text-xs font-medium text-aura-noir flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-aura-amber text-aura-amber" /> {prof.rating}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl text-aura-noir font-medium mb-1">
                    {prof.name}
                  </h3>
                  <span className="text-xs font-medium text-aura-amber block mb-3">
                    {prof.role}
                  </span>
                  <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                    {prof.bio}
                  </p>
                </div>
                
                <div className="pt-3 border-t border-aura-border flex items-center justify-between">
                  <span className="text-[11px] text-neutral-500">{prof.experienceYears} anos de especialização</span>
                  <button
                    onClick={() => onOpenBookingWithProfessional(prof.id)}
                    className="text-xs font-medium text-aura-noir hover:text-aura-amber flex items-center gap-1 uppercase tracking-wider"
                  >
                    <span>Ver Horários</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* 5. DEPOIMENTOS DE PACIENTES (Editorial Quotes) */}
      <section className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto border-b border-aura-border bg-aura-surface/40">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-aura-stone font-semibold block mb-2">
            Vozes Reais
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-aura-noir">
            Histórias de Transformação
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white border border-aura-border flex flex-col justify-between">
            <p className="font-serif text-base md:text-lg text-neutral-800 italic leading-relaxed mb-6">
              "Sempre tive trauma de consultório. Na Aura, o atendimento é acolhedor e calmo. As facetas ficaram inacreditavelmente naturais — ninguém percebe que não nasci com elas."
            </p>
            <div>
              <span className="font-medium text-xs text-aura-noir block">Camila Rezende</span>
              <span className="text-[11px] text-aura-stone">Curadora de Arte • Tratamento com Facetas</span>
            </div>
          </div>

          <div className="p-6 bg-white border border-aura-border flex flex-col justify-between">
            <p className="font-serif text-base md:text-lg text-neutral-800 italic leading-relaxed mb-6">
              "A pontualidade é britânica e o planejamento 3D me deu total segurança antes da cirurgia de implante. No mesmo dia já saí com meu dente definitivo."
            </p>
            <div>
              <span className="font-medium text-xs text-aura-noir block">Marcelo Fontenelle</span>
              <span className="text-[11px] text-aura-stone">Arquiteto Urbanista • Carga Imediata</span>
            </div>
          </div>

          <div className="p-6 bg-white border border-aura-border flex flex-col justify-between">
            <p className="font-serif text-base md:text-lg text-neutral-800 italic leading-relaxed mb-6">
              "A tecnologia do scanner iTero sem massinha de moldagem foi um alívio enorme. A Dra. Sofia acompanhou cada etapa do meu Invisalign com precisão cirúrgica."
            </p>
            <div>
              <span className="font-medium text-xs text-aura-noir block">Patrícia Lins</span>
              <span className="text-[11px] text-aura-stone">Executiva de Tecnologia • Alinhadores</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION EDITORIAL */}
      <section className="py-24 px-6 md:px-12 max-w-5xl mx-auto text-center">
        <span className="text-xs uppercase tracking-[0.25em] text-aura-stone font-semibold block mb-3">
          Atendimento Exclusivo
        </span>
        <h2 className="font-serif text-4xl md:text-6xl text-aura-noir mb-6 leading-tight">
          Pronto para experimentar um novo padrão em saúde oral?
        </h2>
        <p className="text-sm md:text-base text-neutral-600 max-w-xl mx-auto mb-8 leading-relaxed">
          Reserve seu diagnóstico com nossos mestres clínicos. Escolha a especialidade, data e horário ideais diretamente online.
        </p>
        <button
          onClick={onOpenBooking}
          className="bg-aura-noir text-white text-xs px-8 py-4 hover:bg-neutral-800 transition-all uppercase tracking-widest font-medium shadow-md"
        >
          Iniciar Agendamento Online
        </button>
      </section>

      {/* 7. FOOTER EDITORIAL COMPLETO */}
      <footer className="bg-aura-noir text-aura-bone py-16 px-6 md:px-12 border-t border-neutral-800 text-xs">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          
          <div>
            <span className="font-serif text-2xl text-white block mb-2 font-medium tracking-wide">AURA</span>
            <span className="text-[11px] text-neutral-400 block mb-4 uppercase tracking-widest">Studio Odontológico</span>
            <p className="text-neutral-400 leading-relaxed text-[11px]">
              Centro de excelência em estética restauradora, microcirurgia guiada e reabilitação orofacial.
            </p>
          </div>

          <div>
            <span className="text-white font-medium uppercase tracking-wider block mb-3">Localização & Contato</span>
            <p className="text-neutral-400 leading-relaxed text-[11px] mb-2">
              Av. Brigadeiro Faria Lima, 3477 — 18º Andar<br />
              Itaim Bibi, São Paulo - SP
            </p>
            <p className="text-neutral-400 text-[11px]">
              WhatsApp: (11) 98412-4091<br />
              contato@auradental.com.br
            </p>
          </div>

          <div>
            <span className="text-white font-medium uppercase tracking-wider block mb-3">Horários de Atendimento</span>
            <p className="text-neutral-400 leading-relaxed text-[11px]">
              Segunda a Sexta: 08h às 19h30<br />
              Sábado: 08h30 às 13h (Exclusivo para consultas de retorno)<br />
              Domingo: Fechado
            </p>
          </div>

          <div>
            <span className="text-white font-medium uppercase tracking-wider block mb-3">Conformidade & Ética</span>
            <p className="text-neutral-400 leading-relaxed text-[11px]">
              Resp. Técnica: Dra. Helena Van Der Valk (CRO-SP 104.928)<br />
              Alvará Sanitário PMSP 81.204/2026<br />
              Membro da Academia Brasileira de Odontologia Estética (SBOE).
            </p>
          </div>

        </div>

        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between text-neutral-500 text-[11px]">
          <span>© 2026 AURA Dental Studio. Todos os direitos reservados.</span>
          <span className="mt-2 sm:mt-0">Design Editorial & Creative Architecture</span>
        </div>
      </footer>

    </div>
  );
};
