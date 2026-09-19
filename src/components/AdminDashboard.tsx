import React, { useState, useMemo } from 'react';
import { 
  Calendar as CalendarIcon, Users, Clock, Filter, Search, CheckCircle2, 
  XCircle, AlertCircle, Ban, Plus, ChevronRight, Phone, Mail, FileText, Check, X
} from 'lucide-react';
import { Appointment, Professional, DentalService, AppointmentStatus } from '../types';
import { ClinicStore } from '../store';

interface AdminDashboardProps {
  appointments: Appointment[];
  professionals: Professional[];
  services: DentalService[];
  onStatusChange: (id: string, status: AppointmentStatus) => void;
  onRefreshData: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  appointments,
  professionals,
  services,
  onStatusChange,
  onRefreshData
}) => {
  const [activeTab, setActiveTab] = useState<'agenda' | 'pacientes' | 'bloqueios' | 'servicos'>('agenda');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProfessionalFilter, setSelectedProfessionalFilter] = useState('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('all');
  
  // Bloqueio de data
  const [blockProfId, setBlockProfId] = useState(professionals[0]?.id || '');
  const [blockDate, setBlockDate] = useState('');
  const [blockedMap, setBlockedMap] = useState<{ [profId: string]: string[] }>(ClinicStore.getBlockedDates());

  // Métricas calculadas em tempo real
  const todayStr = new Date().toISOString().split('T')[0];

  const todayAppointments = useMemo(() => {
    return appointments.filter(a => a.date === todayStr);
  }, [appointments, todayStr]);

  const confirmedCount = useMemo(() => {
    return appointments.filter(a => a.status === 'Confirmada').length;
  }, [appointments]);

  const inProgressCount = useMemo(() => {
    return appointments.filter(a => a.status === 'Em Atendimento').length;
  }, [appointments]);

  // Lista filtrada para a tabela da agenda
  const filteredAppointments = useMemo(() => {
    return appointments.filter(app => {
      const matchSearch = 
        app.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.patientPhone.includes(searchQuery);

      const matchProf = selectedProfessionalFilter === 'all' || app.professionalId === selectedProfessionalFilter;
      const matchStatus = selectedStatusFilter === 'all' || app.status === selectedStatusFilter;

      return matchSearch && matchProf && matchStatus;
    });
  }, [appointments, searchQuery, selectedProfessionalFilter, selectedStatusFilter]);

  // Pacientes únicos agregados
  const uniquePatients = useMemo(() => {
    const map = new Map<string, { name: string; phone: string; email: string; doc: string; totalVisits: number; lastVisit: string }>();
    appointments.forEach(app => {
      const key = app.patientPhone || app.patientName;
      const existing = map.get(key);
      if (existing) {
        existing.totalVisits += 1;
        if (app.date > existing.lastVisit) existing.lastVisit = app.date;
      } else {
        map.set(key, {
          name: app.patientName,
          phone: app.patientPhone,
          email: app.patientEmail,
          doc: app.patientDocument,
          totalVisits: 1,
          lastVisit: app.date
        });
      }
    });
    return Array.from(map.values()).filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.phone.includes(searchQuery)
    );
  }, [appointments, searchQuery]);

  const handleToggleBlock = (profId: string, date: string) => {
    ClinicStore.toggleDateBlock(profId, date);
    setBlockedMap({ ...ClinicStore.getBlockedDates() });
    onRefreshData();
  };

  const handleAddCustomBlock = () => {
    if (!blockProfId || !blockDate) {
      alert('Selecione o profissional e a data para bloquear.');
      return;
    }
    ClinicStore.toggleDateBlock(blockProfId, blockDate);
    setBlockedMap({ ...ClinicStore.getBlockedDates() });
    setBlockDate('');
    onRefreshData();
  };

  return (
    <div className="min-h-screen bg-aura-surface text-aura-noir pb-20">
      
      {/* Subheader Administrativo */}
      <div className="bg-white border-b border-aura-border px-6 md:px-12 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-aura-stone font-semibold block">
              Painel de Operações Clínicas
            </span>
            <h1 className="font-serif text-3xl text-aura-noir font-medium">
              Gestão da Recepção & Consultórios
            </h1>
          </div>

          {/* Abas Superiores */}
          <div className="flex flex-wrap gap-2 border border-aura-border p-1 bg-aura-bone">
            <button
              onClick={() => setActiveTab('agenda')}
              className={`text-xs px-4 py-2 font-medium transition-all ${
                activeTab === 'agenda' ? 'bg-aura-noir text-white' : 'text-aura-stone hover:text-aura-noir'
              }`}
            >
              Agenda Clínica
            </button>
            <button
              onClick={() => setActiveTab('pacientes')}
              className={`text-xs px-4 py-2 font-medium transition-all ${
                activeTab === 'pacientes' ? 'bg-aura-noir text-white' : 'text-aura-stone hover:text-aura-noir'
              }`}
            >
              Prontuários ({uniquePatients.length})
            </button>
            <button
              onClick={() => setActiveTab('bloqueios')}
              className={`text-xs px-4 py-2 font-medium transition-all ${
                activeTab === 'bloqueios' ? 'bg-aura-noir text-white' : 'text-aura-stone hover:text-aura-noir'
              }`}
            >
              Trava de Horários
            </button>
            <button
              onClick={() => setActiveTab('servicos')}
              className={`text-xs px-4 py-2 font-medium transition-all ${
                activeTab === 'servicos' ? 'bg-aura-noir text-white' : 'text-aura-stone hover:text-aura-noir'
              }`}
            >
              Procedimentos
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8">
        
        {/* KPI CARDS (Resumo Executivo da Clínica) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-5 bg-white border border-aura-border">
            <span className="text-[11px] uppercase tracking-wider text-aura-stone font-semibold block mb-1">
              Consultas Hoje ({todayStr})
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-3xl text-aura-noir font-medium">
                {todayAppointments.length}
              </span>
              <span className="text-xs text-neutral-500">atendimentos</span>
            </div>
          </div>

          <div className="p-5 bg-white border border-aura-border">
            <span className="text-[11px] uppercase tracking-wider text-aura-stone font-semibold block mb-1">
              Confirmadas no Sistema
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-3xl text-aura-sage font-medium">
                {confirmedCount}
              </span>
              <span className="text-xs text-neutral-500">pacientes</span>
            </div>
          </div>

          <div className="p-5 bg-white border border-aura-border">
            <span className="text-[11px] uppercase tracking-wider text-aura-stone font-semibold block mb-1">
              Em Atendimento Agora
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-3xl text-aura-amber font-medium">
                {inProgressCount}
              </span>
              <span className="text-xs text-neutral-500">em cadeira</span>
            </div>
          </div>

          <div className="p-5 bg-white border border-aura-border">
            <span className="text-[11px] uppercase tracking-wider text-aura-stone font-semibold block mb-1">
              Profissionais Ativos
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-3xl text-aura-noir font-medium">
                {professionals.length}
              </span>
              <span className="text-xs text-neutral-500">em escala</span>
            </div>
          </div>
        </div>

        {/* 1. ABA: AGENDA CLÍNICA */}
        {activeTab === 'agenda' && (
          <div className="bg-white border border-aura-border">
            
            {/* Barra de Filtros e Busca */}
            <div className="p-5 border-b border-aura-border flex flex-col sm:flex-row gap-4 justify-between items-center bg-aura-bone">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-aura-stone absolute left-3 top-3" />
                <input 
                  type="text"
                  placeholder="Buscar paciente, protocolo ou fone..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs border border-aura-border focus:border-aura-noir focus:outline-none bg-white"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <select
                  value={selectedProfessionalFilter}
                  onChange={e => setSelectedProfessionalFilter(e.target.value)}
                  className="text-xs py-2 px-3 border border-aura-border bg-white text-aura-noir focus:outline-none"
                >
                  <option value="all">Todos os Especialistas</option>
                  {professionals.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>

                <select
                  value={selectedStatusFilter}
                  onChange={e => setSelectedStatusFilter(e.target.value)}
                  className="text-xs py-2 px-3 border border-aura-border bg-white text-aura-noir focus:outline-none"
                >
                  <option value="all">Todos os Status</option>
                  <option value="Confirmada">Confirmada</option>
                  <option value="Pendente">Pendente</option>
                  <option value="Em Atendimento">Em Atendimento</option>
                  <option value="Concluída">Concluída</option>
                  <option value="Cancelada">Cancelada</option>
                </select>
              </div>
            </div>

            {/* Tabela de Consultas */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-aura-border bg-aura-surface text-aura-stone uppercase tracking-wider font-semibold">
                    <th className="p-4">Horário & Data</th>
                    <th className="p-4">Protocolo</th>
                    <th className="p-4">Paciente</th>
                    <th className="p-4">Procedimento</th>
                    <th className="p-4">Especialista</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Ações Rápidas</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-aura-border">
                  {filteredAppointments.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-12 text-center text-aura-stone">
                        Nenhum agendamento encontrado para os filtros selecionados.
                      </td>
                    </tr>
                  ) : (
                    filteredAppointments.map(app => {
                      const isToday = app.date === todayStr;
                      return (
                        <tr key={app.id} className={`hover:bg-aura-surface/40 transition-colors ${isToday ? 'bg-amber-50/20' : ''}`}>
                          <td className="p-4 whitespace-nowrap">
                            <div className="font-semibold text-aura-noir flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-aura-stone" />
                              <span>{app.time}h</span>
                            </div>
                            <span className="text-[11px] text-neutral-500">{app.date}</span>
                          </td>

                          <td className="p-4 whitespace-nowrap font-mono text-neutral-600">
                            {app.code}
                          </td>

                          <td className="p-4">
                            <div className="font-medium text-aura-noir">{app.patientName}</div>
                            <div className="text-[11px] text-neutral-500">{app.patientPhone}</div>
                            {app.notes && (
                              <div className="text-[11px] text-aura-amber italic mt-0.5 line-clamp-1">
                                Obs: {app.notes}
                              </div>
                            )}
                          </td>

                          <td className="p-4">
                            <span className="text-aura-noir font-medium">{app.serviceTitle}</span>
                          </td>

                          <td className="p-4 whitespace-nowrap text-neutral-600">
                            {app.professionalName}
                          </td>

                          <td className="p-4 whitespace-nowrap">
                            <span className={`px-2.5 py-1 text-[10px] uppercase tracking-wider font-semibold border ${
                              app.status === 'Confirmada' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                              app.status === 'Em Atendimento' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                              app.status === 'Pendente' ? 'bg-blue-50 text-blue-800 border-blue-200' :
                              app.status === 'Concluída' ? 'bg-neutral-100 text-neutral-700 border-neutral-300' :
                              'bg-red-50 text-red-800 border-red-200'
                            }`}>
                              {app.status}
                            </span>
                          </td>

                          <td className="p-4 text-right whitespace-nowrap">
                            <div className="inline-flex items-center gap-1">
                              {app.status !== 'Em Atendimento' && app.status !== 'Concluída' && (
                                <button
                                  onClick={() => onStatusChange(app.id, 'Em Atendimento')}
                                  title="Iniciar atendimento em cadeira"
                                  className="p-1.5 border border-aura-border hover:border-aura-amber text-aura-stone hover:text-aura-amber transition-colors"
                                >
                                  <Clock className="w-3.5 h-3.5" />
                                </button>
                              )}
                              {app.status !== 'Concluída' && (
                                <button
                                  onClick={() => onStatusChange(app.id, 'Concluída')}
                                  title="Concluir procedimento"
                                  className="p-1.5 border border-aura-border hover:border-emerald-600 text-aura-stone hover:text-emerald-600 transition-colors"
                                >
                                  <Check className="w-3.5 h-3.5" />
                                </button>
                              )}
                              {app.status !== 'Cancelada' && (
                                <button
                                  onClick={() => {
                                    if (confirm(`Deseja cancelar o agendamento de ${app.patientName}?`)) {
                                      onStatusChange(app.id, 'Cancelada');
                                    }
                                  }}
                                  title="Cancelar consulta"
                                  className="p-1.5 border border-aura-border hover:border-red-500 text-aura-stone hover:text-red-500 transition-colors"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* 2. ABA: PRONTUÁRIOS E PACIENTES */}
        {activeTab === 'pacientes' && (
          <div className="bg-white border border-aura-border p-6">
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-aura-border pb-4">
              <div>
                <h3 className="font-serif text-2xl text-aura-noir">Fichas de Pacientes Cadastrados</h3>
                <p className="text-xs text-neutral-500">Histórico de consultas e prontuário digital rápido.</p>
              </div>
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-aura-stone absolute left-3 top-3" />
                <input 
                  type="text"
                  placeholder="Pesquisar por nome ou fone..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-aura-border focus:border-aura-noir focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {uniquePatients.map((patient, idx) => (
                <div key={idx} className="p-5 border border-aura-border bg-aura-bone flex flex-col justify-between">
                  <div>
                    <span className="font-semibold text-sm text-aura-noir block mb-1">{patient.name}</span>
                    <div className="space-y-1 text-xs text-neutral-600 mb-4">
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-aura-stone" />
                        <span>{patient.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-aura-stone" />
                        <span>{patient.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="w-3.5 h-3.5 text-aura-stone" />
                        <span>Doc: {patient.doc}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-aura-border flex items-center justify-between text-xs text-neutral-500">
                    <span>{patient.totalVisits} consulta(s)</span>
                    <span>Última: {patient.lastVisit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. ABA: BLOQUEIOS DE AGENDA */}
        {activeTab === 'bloqueios' && (
          <div className="bg-white border border-aura-border p-6 md:p-8">
            <div className="mb-8 max-w-xl">
              <span className="text-xs uppercase tracking-wider text-aura-stone font-semibold block mb-1">
                Controle de Disponibilidade
              </span>
              <h3 className="font-serif text-2xl text-aura-noir mb-2">Trancamento e Ausência de Profissionais</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Utilize para bloquear dias de cirurgia externa, participações em congressos internacionais ou recessos clínicos.
              </p>
            </div>

            {/* Formulário de Novo Bloqueio */}
            <div className="bg-aura-surface border border-aura-border p-5 mb-8 flex flex-col sm:flex-row gap-4 items-end">
              <div className="w-full sm:w-1/3">
                <label className="text-xs font-medium text-aura-noir block mb-1">Especialista</label>
                <select
                  value={blockProfId}
                  onChange={e => setBlockProfId(e.target.value)}
                  className="w-full text-xs p-2.5 border border-aura-border bg-white focus:outline-none"
                >
                  {professionals.map(p => (
                    <option key={p.id} value={p.id}>{p.name} ({p.cro})</option>
                  ))}
                </select>
              </div>

              <div className="w-full sm:w-1/3">
                <label className="text-xs font-medium text-aura-noir block mb-1">Data a Bloquear</label>
                <input 
                  type="date"
                  value={blockDate}
                  onChange={e => setBlockDate(e.target.value)}
                  className="w-full text-xs p-2.5 border border-aura-border bg-white focus:outline-none"
                />
              </div>

              <button
                onClick={handleAddCustomBlock}
                className="w-full sm:w-auto bg-aura-noir text-white text-xs px-5 py-2.5 hover:bg-neutral-800 transition-colors uppercase tracking-wider font-medium flex items-center justify-center gap-1.5"
              >
                <Ban className="w-3.5 h-3.5" />
                <span>Bloquear Data</span>
              </button>
            </div>

            {/* Listagem dos Bloqueios Existentes */}
            <div>
              <h4 className="font-medium text-sm text-aura-noir mb-4">Bloqueios Cadastrados</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {professionals.map(prof => {
                  const dates = blockedMap[prof.id] || [];
                  return (
                    <div key={prof.id} className="p-4 border border-aura-border bg-aura-bone">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-medium text-sm text-aura-noir">{prof.name}</span>
                        <span className="text-xs text-aura-stone font-mono">{dates.length} data(s) travada(s)</span>
                      </div>
                      {dates.length === 0 ? (
                        <p className="text-xs text-neutral-400 italic">Nenhum bloqueio registrado para este profissional.</p>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {dates.map(d => (
                            <span 
                              key={d}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-aura-border text-xs text-neutral-700"
                            >
                              <span>{d}</span>
                              <button 
                                onClick={() => handleToggleBlock(prof.id, d)}
                                className="text-neutral-400 hover:text-red-600 transition-colors"
                                title="Desbloquear data"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* 4. ABA: SERVIÇOS & PROCEDIMENTOS */}
        {activeTab === 'servicos' && (
          <div className="bg-white border border-aura-border p-6 md:p-8">
            <div className="mb-6 flex justify-between items-center">
              <div>
                <h3 className="font-serif text-2xl text-aura-noir">Catálogo de Procedimentos</h3>
                <p className="text-xs text-neutral-500">Tabela de honorários e tempo de duração estimado.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map(s => (
                <div key={s.id} className="p-5 border border-aura-border bg-aura-bone flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase font-semibold px-2 py-0.5 bg-white border border-aura-border text-aura-stone">
                        {s.category}
                      </span>
                      <span className="text-xs font-mono text-neutral-500">{s.durationMinutes} minutos</span>
                    </div>
                    <h4 className="font-serif text-xl text-aura-noir mb-2">{s.title}</h4>
                    <p className="text-xs text-neutral-600 leading-relaxed mb-4">{s.description}</p>
                  </div>
                  <div className="pt-3 border-t border-aura-border flex items-center justify-between">
                    <span className="text-xs text-aura-stone">Honorário:</span>
                    <span className="text-sm font-semibold text-aura-noir">{s.priceFormatted}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
