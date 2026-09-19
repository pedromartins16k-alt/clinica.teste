import { Professional, DentalService, Appointment } from './types';

export const INITIAL_PROFESSIONALS: Professional[] = [
  {
    id: 'prof-1',
    name: 'Dra. Helena Van Der Valk',
    cro: 'CRO-SP 104.928',
    role: 'Diretora Clínica & Especialista em Facetas de Porcelana',
    specialty: 'Dentística & Estética Restauradora',
    bio: 'Pós-graduada pela Universidade de Zurique. Mais de 14 anos dedicados ao planejamento digital do sorriso (DSD) e cerâmicas minimamente invasivas.',
    experienceYears: 14,
    avatar: 'https://images.unsplash.com/photo-1594824813576-96b6b3fd4bb3?auto=format&fit=crop&w=600&q=80',
    availableDays: [1, 2, 3, 4, 5],
    rating: 4.98,
    availableTimeSlots: ['09:00', '10:30', '14:00', '15:30', '17:00']
  },
  {
    id: 'prof-2',
    name: 'Dr. Leonardo Castelo',
    cro: 'CRO-SP 98.412',
    role: 'Mestre em Cirurgia & Implantodontia Guiada',
    specialty: 'Implantodontia & Enxertos',
    bio: 'Especialista em cirurgia piezoelétrica e carga imediata assistida por tomografia 3D, garantindo intervenções rápidas e recuperação previsível.',
    experienceYears: 16,
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
    availableDays: [1, 3, 5],
    rating: 4.96,
    availableTimeSlots: ['08:30', '10:00', '11:30', '14:30', '16:00']
  },
  {
    id: 'prof-3',
    name: 'Dra. Sofia Alencar',
    cro: 'CRO-SP 112.503',
    role: 'Ortodontista Diamond Invisalign Provider',
    specialty: 'Ortodontia Digital & Alinhadores Invisíveis',
    bio: 'Pioneira em biomecânica acelerada por escaneamento intraoral iTero, aliando simetria facial, oclusão funcional e discrição absoluta.',
    experienceYears: 11,
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80',
    availableDays: [2, 4, 5, 6],
    rating: 5.0,
    availableTimeSlots: ['09:30', '11:00', '13:30', '15:00', '16:30']
  },
  {
    id: 'prof-4',
    name: 'Dr. Gabriel Mansur',
    cro: 'CRO-SP 118.774',
    role: 'Especialista em Oclusão & Dores Orofaciais',
    specialty: 'Reabilitação Neuroclusal & DTM',
    bio: 'Foco na harmonia neuromuscular, tratamento de bruxismo com biofeedback e placas miorrelaxantes de alta densidade.',
    experienceYears: 9,
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80',
    availableDays: [1, 2, 4],
    rating: 4.94,
    availableTimeSlots: ['10:00', '11:30', '14:00', '16:30']
  }
];

export const INITIAL_SERVICES: DentalService[] = [
  {
    id: 'serv-1',
    title: 'Check-up Digital & Escaneamento iTero 3D',
    category: 'Prevenção',
    durationMinutes: 45,
    description: 'Diagnóstico computadorizado de altíssima definição, mapeamento de oclusão e fotografia clínica sem moldagens tradicionais.',
    priceFormatted: 'R$ 380',
    tag: 'Entrada & Diagnóstico'
  },
  {
    id: 'serv-2',
    title: 'Facetas & Lentes de Contato em Porcelana',
    category: 'Estética',
    durationMinutes: 90,
    description: 'Design de sorriso sob medida com cerâmica feldspática ultrafina. Preservação máxima da estrutura dental natural.',
    priceFormatted: 'A partir de R$ 2.400 / dente',
    tag: 'Procedimento Exclusivo'
  },
  {
    id: 'serv-3',
    title: 'Ortodontia com Alinhadores Invisíveis',
    category: 'Ortodontia',
    durationMinutes: 60,
    description: 'Tratamento ortodôntico imperceptível com planejamento 3D ClinCheck e acompanhamento por inteligência biométrica.',
    priceFormatted: 'Avaliação personalizada',
    tag: 'Diamond Provider'
  },
  {
    id: 'serv-4',
    title: 'Clareamento Dental Fotoativado a Laser',
    category: 'Estética',
    durationMinutes: 60,
    description: 'Protocolo de alta performance com barreira gengival de precisão e mínima sensibilidade pós-operatória.',
    priceFormatted: 'R$ 950',
    tag: 'Resultado Imediato'
  },
  {
    id: 'serv-5',
    title: 'Implante Dentário Neodent com Carga Imediata',
    category: 'Reabilitação',
    durationMinutes: 75,
    description: 'Cirurgia guiada por computador com fixação protética no mesmo dia, assegurando conforto estético e mastigatório imediato.',
    priceFormatted: 'Sob consulta clínica',
    tag: 'Precisão Cirúrgica'
  },
  {
    id: 'serv-6',
    title: 'Profilaxia Suíça Guided Biofilm Therapy (GBT)',
    category: 'Prevenção',
    durationMinutes: 50,
    description: 'Remoção ultra-suave de biofilme e manchas com tecnologia AirFlow e água pré-aquecida, indolor e biocompatível.',
    priceFormatted: 'R$ 490',
    tag: 'Protocolo Suíço'
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'app-001',
    code: 'AUR-9182',
    patientName: 'Mariana Duarte Siqueira',
    patientEmail: 'mariana.duarte@email.com',
    patientPhone: '(11) 98412-4091',
    patientDocument: '298.411.028-44',
    serviceId: 'serv-2',
    serviceTitle: 'Facetas & Lentes de Contato em Porcelana',
    professionalId: 'prof-1',
    professionalName: 'Dra. Helena Van Der Valk',
    date: new Date().toISOString().split('T')[0], // Hoje
    time: '10:30',
    notes: 'Segunda sessão de prova estética das cerâmicas superiores.',
    status: 'Confirmada',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: 'app-002',
    code: 'AUR-7721',
    patientName: 'Guilherme Bittencourt',
    patientEmail: 'gbittencourt@outlook.com',
    patientPhone: '(11) 97133-8820',
    patientDocument: '341.902.188-12',
    serviceId: 'serv-3',
    serviceTitle: 'Ortodontia com Alinhadores Invisíveis',
    professionalId: 'prof-3',
    professionalName: 'Dra. Sofia Alencar',
    date: new Date().toISOString().split('T')[0], // Hoje
    time: '14:00',
    notes: 'Entrega dos alinhadores do lote 04 e revisão iTero.',
    status: 'Em Atendimento',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString()
  },
  {
    id: 'app-003',
    code: 'AUR-5410',
    patientName: 'Beatriz Vasconcelos',
    patientEmail: 'b.vasconcelos@gmail.com',
    patientPhone: '(11) 99120-4322',
    patientDocument: '412.783.109-00',
    serviceId: 'serv-1',
    serviceTitle: 'Check-up Digital & Escaneamento iTero 3D',
    professionalId: 'prof-1',
    professionalName: 'Dra. Helena Van Der Valk',
    date: new Date().toISOString().split('T')[0], // Hoje
    time: '15:30',
    notes: 'Primeira consulta de diagnóstico e queixa de diastema.',
    status: 'Pendente',
    createdAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: 'app-004',
    code: 'AUR-4099',
    patientName: 'Roberto Mendes Brandão',
    patientEmail: 'roberto.brandao@mendesadv.com.br',
    patientPhone: '(11) 98841-5501',
    patientDocument: '189.201.765-88',
    serviceId: 'serv-5',
    serviceTitle: 'Implante Dentário Neodent com Carga Imediata',
    professionalId: 'prof-2',
    professionalName: 'Dr. Leonardo Castelo',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Amanhã
    time: '10:00',
    notes: 'Tomografia volumétrica anexada pela radiologia.',
    status: 'Confirmada',
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString()
  }
];
