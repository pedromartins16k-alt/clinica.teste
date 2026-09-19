import React, { useState, useMemo } from 'react';
import { 
  X, Check, ChevronRight, ChevronLeft, 
  Clock, Sparkles, CheckCircle2
} from 'lucide-react';
import { Professional, DentalService, Appointment } from '../types';
import { ClinicStore } from '../store';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  services: DentalService[];
  professionals: Professional[];
  onAppointmentCreated: (appointment: Appointment) => void;
  initialServiceId?: string;
  initialProfessionalId?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  services,
  professionals,
  onAppointmentCreated,
  initialServiceId,
  initialProfessionalId
}) => {
  const [step, setStep] = useState<number>(1);
  const [selectedServiceId, setSelectedServiceId] = useState<string>(initialServiceId || services[0]?.id || '');
  const [selectedProfessionalId, setSelectedProfessionalId] = useState<string>(initialProfessionalId || professionals[0]?.id || '');
  
  // Próximas datas disponíveis (dias úteis seguintes)
  const availableDates = useMemo(() => {
    const list: { dateStr: string; label: string; dayOfWeek: string; isBlocked: boolean }[] = [];
    const blockedDates = ClinicStore.getBlockedDates()[selectedProfessionalId] || [];
    const now = new Date();
    
    for (let i = 1; list.length < 7; i++) {
      const d = new Date(now);
      d.setDate(now.getDate() + i);
      const day = d.getDay();
      // Não atende aos domingos (0)
      if (day === 0) continue;

      const dateStr = d.toISOString().split('T')[0];
      const dayName = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'][day];
      const monthName = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'][d.getMonth()];
      const isBlocked = blockedDates.includes(dateStr);

      list.push({
        dateStr,
        label: `${d.getDate()} de ${monthName}`,
        dayOfWeek: dayName,
        isBlocked
      });
    }
    return list;
  }, [selectedProfessionalId]);

  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  // Form de dados do paciente
  const [patientName, setPatientName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientDocument, setPatientDocument] = useState('');
  const [patientNotes, setPatientNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedAppointment, setConfirmedAppointment] = useState<Appointment | null>(null);

  // Inicializar data padrão
  React.useEffect(() => {
    if (availableDates.length > 0 && !selectedDate) {
      const firstValid = availableDates.find(d => !d.isBlocked) || availableDates[0];
      setSelectedDate(firstValid.dateStr);
    }
  }, [availableDates, selectedDate]);

  const selectedProfessional = professionals.find(p => p.id === selectedProfessionalId) || professionals[0];
  const selectedService = services.find(s => s.id === selectedServiceId) || services[0];

  if (!isOpen) return null;

  const handleNextStep = () => {
    if (step === 1 && !selectedServiceId) return;
    if (step === 2 && !selectedProfessionalId) return;
    if (step === 3 && (!selectedDate || !selectedTime)) return;
    setStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setStep(prev => Math.max(1, prev - 1));
  };

  const handleConfirm = () => {
    if (!patientName || !patientPhone) {
      alert('Por favor, informe seu nome completo e telefone de contato.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const created = ClinicStore.addAppointment({
        patientName,
        patientEmail: patientEmail || 'contato@paciente.com.br',
        patientPhone,
        patientDocument: patientDocument || 'Não informado',
        serviceId: selectedService.id,
        serviceTitle: selectedService.title,
        professionalId: selectedProfessional.id,
        professionalName: selectedProfessional.name,
        date: selectedDate,
        time: selectedTime,
        notes: patientNotes
      });

      setConfirmedAppointment(created);
      onAppointmentCreated(created);
      setIsSubmitting(false);
    }, 600);
  };

  const resetAndClose = () => {
    setStep(1);
    setConfirmedAppointment(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-aura-forestDark/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white border border-aura-border shadow-2xl overflow-hidden transition-all flex flex-col">
        
        {/* Header do Modal com Destaque em Verde Floresta */}
        <div className="px-6 py-5 border-b border-aura-border flex items-center justify-between bg-aura-bone">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-aura-terracotta font-semibold block">
              Atendimento com Hora Marcada
            </span>
            <h3 className="font-serif text-2xl text-aura-forest font-medium">
              Aura Dental Studio
            </h3>
          </div>
          <button 
            onClick={resetAndClose}
            className="p-2 text-aura-stone hover:text-aura-forest hover:bg-neutral-200/50 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Barra de Progresso com Cores do Design System */}
        {!confirmedAppointment && (
          <div className="grid grid-cols-4 border-b border-aura-border text-center text-xs font-medium">
            <div className={`py-2.5 border-r border-aura-border transition-colors ${step >= 1 ? 'bg-aura-forest text-white font-semibold' : 'bg-aura-surface text-neutral-400'}`}>
              1. Tratamento
            </div>
            <div className={`py-2.5 border-r border-aura-border transition-colors ${step >= 2 ? 'bg-aura-forest text-white font-semibold' : 'bg-aura-surface text-neutral-400'}`}>
              2. Especialista
            </div>
            <div className={`py-2.5 border-r border-aura-border transition-colors ${step >= 3 ? 'bg-aura-forest text-white font-semibold' : 'bg-aura-surface text-neutral-400'}`}>
              3. Data & Hora
            </div>
            <div className={`py-2.5 transition-colors ${step >= 4 ? 'bg-aura-forest text-white font-semibold' : 'bg-aura-surface text-neutral-400'}`}>
              4. Seus Dados
            </div>
          </div>
        )}

        {/* Conteúdo dos Passos */}
        <div className="p-6 md:p-8 flex-1">
          
          {/* SUCESSO / CONFIRMAÇÃO */}
          {confirmedAppointment ? (
            <div className="py-6 text-center animate-fadeIn">
              <div className="w-14 h-14 bg-aura-sageLight text-aura-forest rounded-full flex items-center justify-center mx-auto mb-5 border border-aura-forest/20">
                <CheckCircle2 className="w-8 h-8 text-aura-sage" />
              </div>
              <span className="text-xs uppercase tracking-[0.25em] text-aura-terracotta font-semibold block mb-1 font-mono">
                [ AGENDAMENTO CONFIRMADO ]
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-aura-forest mb-3 font-normal">
                Esperamos por você.
              </h2>
              <p className="text-sm text-neutral-600 max-w-md mx-auto mb-6 leading-relaxed">
                Seu horário foi reservado exclusivamente no sistema clínico da Dra. Helena e equipe.
              </p>

              {/* Cartão de Voucher Editorial com Acento Dourado */}
              <div className="bg-aura-bone border-2 border-aura-border p-6 text-left max-w-md mx-auto mb-6 shadow-md">
                <div className="flex justify-between items-center border-b border-aura-border pb-3 mb-4">
                  <span className="text-xs uppercase tracking-wider text-aura-stone font-medium">Protocolo Clínico</span>
                  <span className="font-mono text-sm font-semibold text-aura-forest bg-white px-2.5 py-0.5 border border-aura-terracotta/40 text-aura-terracotta">
                    {confirmedAppointment.code}
                  </span>
                </div>
                <div className="space-y-2.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Paciente:</span>
                    <span className="font-medium text-aura-forest">{confirmedAppointment.patientName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Tratamento:</span>
                    <span className="font-medium text-aura-forest text-right">{confirmedAppointment.serviceTitle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Especialista:</span>
                    <span className="font-medium text-aura-forest">{confirmedAppointment.professionalName}</span>
                  </div>
                  <div className="flex justify-between border-t border-aura-border pt-3">
                    <span className="text-neutral-500">Data e Horário:</span>
                    <span className="font-semibold text-aura-forest">
                      {confirmedAppointment.date} às {confirmedAppointment.time}h
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={resetAndClose}
                  className="bg-aura-forest hover:bg-aura-terracotta transition-colors text-white px-7 py-3 text-xs font-medium uppercase tracking-[0.2em] shadow-md"
                >
                  Concluir & Fechar
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* PASSO 1: PROCEDIMENTO */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="mb-4">
                    <h4 className="font-serif text-xl text-aura-forest font-medium">Selecione o procedimento</h4>
                    <p className="text-xs text-aura-stone">Todos os atendimentos contam com escaneamento fotográfico e acolhimento personalizado.</p>
                  </div>
                  <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
                    {services.map(service => {
                      const isSelected = selectedServiceId === service.id;
                      return (
                        <div
                          key={service.id}
                          onClick={() => setSelectedServiceId(service.id)}
                          className={`p-4 border cursor-pointer transition-all flex items-start justify-between gap-4 ${
                            isSelected 
                              ? 'border-aura-terracotta bg-aura-terracottaLight/40' 
                              : 'border-aura-border hover:border-aura-forest bg-white'
                          }`}
                        >
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 bg-aura-surface text-aura-forest font-semibold">
                                {service.category}
                              </span>
                              <span className="text-xs text-neutral-400 font-mono">• {service.durationMinutes} min</span>
                            </div>
                            <h5 className="font-medium text-sm text-aura-forest">{service.title}</h5>
                            <p className="text-xs text-neutral-600 mt-1 line-clamp-2">{service.description}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="text-xs font-semibold text-aura-forest block font-mono">{service.priceFormatted}</span>
                            {isSelected && (
                              <div className="mt-2 inline-flex items-center justify-center w-5 h-5 rounded-full bg-aura-terracotta text-white">
                                <Check className="w-3 h-3" />
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* PASSO 2: ESPECIALISTA */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="mb-4">
                    <h4 className="font-serif text-xl text-aura-forest font-medium">Escolha o especialista</h4>
                    <p className="text-xs text-aura-stone">Corpo clínico qualificado nas mais prestigiadas academias odontológicas internacionais.</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {professionals.map(prof => {
                      const isSelected = selectedProfessionalId === prof.id;
                      return (
                        <div
                          key={prof.id}
                          onClick={() => setSelectedProfessionalId(prof.id)}
                          className={`p-4 border cursor-pointer transition-all flex flex-col justify-between ${
                            isSelected 
                              ? 'border-aura-terracotta bg-aura-terracottaLight/40' 
                              : 'border-aura-border hover:border-aura-forest bg-white'
                          }`}
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <img 
                              src={prof.avatar} 
                              alt={prof.name}
                              className="w-12 h-12 rounded-full object-cover border border-aura-border"
                            />
                            <div>
                              <h5 className="font-medium text-sm text-aura-forest">{prof.name}</h5>
                              <span className="text-[11px] text-aura-stone block font-mono">{prof.cro}</span>
                            </div>
                          </div>
                          <div>
                            <span className="text-xs font-semibold text-aura-terracotta block mb-1">{prof.specialty}</span>
                            <p className="text-[11px] text-neutral-600 line-clamp-2 leading-relaxed">{prof.bio}</p>
                          </div>
                          <div className="mt-3 pt-2 border-t border-aura-border flex items-center justify-between text-xs text-neutral-500">
                            <span>{prof.experienceYears} anos prática</span>
                            {isSelected ? (
                              <span className="text-aura-terracotta font-semibold flex items-center gap-1">
                                <Check className="w-3.5 h-3.5" /> Selecionado
                              </span>
                            ) : (
                              <span className="text-neutral-400">Selecionar</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* PASSO 3: DATA E HORA */}
              {step === 3 && (
                <div className="space-y-5">
                  <div>
                    <h4 className="font-serif text-xl text-aura-forest font-medium">Data e Horário</h4>
                    <p className="text-xs text-aura-stone">Atendimento exclusivo com hora marcada, sem atrasos ou salas de espera cheias.</p>
                  </div>

                  {/* Seletor Horizontal de Dias */}
                  <div>
                    <label className="text-xs uppercase tracking-wider text-aura-stone font-medium block mb-2 font-mono">
                      Dias Disponíveis
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                      {availableDates.map(item => {
                        const isSelected = selectedDate === item.dateStr;
                        return (
                          <button
                            key={item.dateStr}
                            disabled={item.isBlocked}
                            onClick={() => {
                              setSelectedDate(item.dateStr);
                              setSelectedTime('');
                            }}
                            className={`p-3 text-center border transition-all ${
                              item.isBlocked 
                                ? 'bg-neutral-100 text-neutral-400 border-neutral-200 cursor-not-allowed' 
                                : isSelected 
                                  ? 'bg-aura-forest text-white border-aura-forest' 
                                  : 'bg-white hover:border-aura-forest text-aura-forest border-aura-border'
                            }`}
                          >
                            <span className="text-[10px] uppercase tracking-wider block font-semibold">
                              {item.dayOfWeek}
                            </span>
                            <span className="text-sm font-medium mt-0.5 block">
                              {item.label.split(' ')[0]}
                            </span>
                            <span className="text-[10px] opacity-80 block">
                              {item.label.split(' ')[2]}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Seletor de Horários */}
                  <div>
                    <label className="text-xs uppercase tracking-wider text-aura-stone font-medium block mb-2 font-mono">
                      Horários de Atendimento ({selectedProfessional.name.split(' ')[0]} {selectedProfessional.name.split(' ')[1]})
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {selectedProfessional.availableTimeSlots.map(time => {
                        const isSelected = selectedTime === time;
                        return (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`py-2.5 px-3 text-xs border flex items-center justify-center gap-2 transition-all ${
                              isSelected
                                ? 'bg-aura-forest text-white border-aura-forest font-medium'
                                : 'bg-white text-aura-forest border-aura-border hover:border-aura-forest'
                            }`}
                          >
                            <Clock className="w-3.5 h-3.5 text-aura-terracotta" />
                            <span>{time}h</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="bg-aura-bone border border-aura-border p-3 text-xs text-neutral-600 flex items-center gap-3">
                    <Sparkles className="w-4 h-4 text-aura-amber shrink-0" />
                    <span>Tempo de tolerância zero: os atendimentos iniciam com exatidão no horário reservado.</span>
                  </div>
                </div>
              )}

              {/* PASSO 4: DADOS DO PACIENTE */}
              {step === 4 && (
                <div className="space-y-4">
                  <div className="mb-2">
                    <h4 className="font-serif text-xl text-aura-forest font-medium">Identificação do Paciente</h4>
                    <p className="text-xs text-aura-stone">Informações essenciais para elaboração do prontuário digital e contato confirmatório.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="text-xs font-medium text-aura-forest block mb-1">Nome Completo *</label>
                      <input 
                        type="text"
                        value={patientName}
                        onChange={e => setPatientName(e.target.value)}
                        placeholder="Ex: Carolina Mattos"
                        className="w-full text-xs px-3.5 py-2.5 border border-aura-border focus:border-aura-forest focus:outline-none bg-aura-surface/30"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-aura-forest block mb-1">WhatsApp / Telefone *</label>
                      <input 
                        type="tel"
                        value={patientPhone}
                        onChange={e => setPatientPhone(e.target.value)}
                        placeholder="(11) 98765-4321"
                        className="w-full text-xs px-3.5 py-2.5 border border-aura-border focus:border-aura-forest focus:outline-none bg-aura-surface/30"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-aura-forest block mb-1">E-mail para Confirmação</label>
                      <input 
                        type="email"
                        value={patientEmail}
                        onChange={e => setPatientEmail(e.target.value)}
                        placeholder="carolina@email.com"
                        className="w-full text-xs px-3.5 py-2.5 border border-aura-border focus:border-aura-forest focus:outline-none bg-aura-surface/30"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-aura-forest block mb-1">CPF (opcional para recibo)</label>
                      <input 
                        type="text"
                        value={patientDocument}
                        onChange={e => setPatientDocument(e.target.value)}
                        placeholder="000.000.000-00"
                        className="w-full text-xs px-3.5 py-2.5 border border-aura-border focus:border-aura-forest focus:outline-none bg-aura-surface/30"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-aura-forest block mb-1">Observações Clínicas ou Queixa Principal</label>
                    <textarea 
                      rows={2}
                      value={patientNotes}
                      onChange={e => setPatientNotes(e.target.value)}
                      placeholder="Ex: Sensibilidade em dentes molares, interesse em clareamento antes de casamento, etc."
                      className="w-full text-xs p-3 border border-aura-border focus:border-aura-forest focus:outline-none bg-aura-surface/30"
                    />
                  </div>

                  {/* Resumo da Pré-reserva */}
                  <div className="bg-aura-bone border border-aura-border p-3.5 text-xs text-neutral-600 space-y-1">
                    <div className="font-semibold text-aura-forest flex justify-between">
                      <span>{selectedService.title}</span>
                      <span className="text-aura-terracotta">{selectedService.priceFormatted}</span>
                    </div>
                    <div className="text-[11px] text-neutral-500 font-mono">
                      Com {selectedProfessional.name} • {selectedDate} às {selectedTime}h
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

        </div>

        {/* Rodapé de Ações do Modal */}
        {!confirmedAppointment && (
          <div className="px-6 py-4 bg-aura-bone border-t border-aura-border flex items-center justify-between">
            {step > 1 ? (
              <button
                onClick={handlePrevStep}
                className="text-xs text-aura-stone hover:text-aura-forest font-medium flex items-center gap-1.5 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Voltar</span>
              </button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <button
                onClick={handleNextStep}
                disabled={(step === 3 && (!selectedDate || !selectedTime))}
                className="bg-aura-forest hover:bg-aura-terracotta transition-colors text-white text-xs px-6 py-2.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 font-medium"
              >
                <span>Prosseguir</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleConfirm}
                disabled={isSubmitting || !patientName || !patientPhone}
                className="bg-aura-terracotta hover:bg-aura-terracottaDark transition-colors text-white text-xs px-7 py-2.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium shadow-md"
              >
                {isSubmitting ? (
                  <span>Confirmando no Prontuário...</span>
                ) : (
                  <>
                    <span>Confirmar Agendamento</span>
                    <Check className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
