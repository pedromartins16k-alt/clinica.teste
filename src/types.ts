export interface Professional {
  id: string;
  name: string;
  cro: string;
  role: string;
  specialty: string;
  bio: string;
  experienceYears: number;
  avatar: string;
  availableDays: number[]; // 1 = Seg, 2 = Ter, etc.
  rating: number;
  availableTimeSlots: string[];
}

export interface DentalService {
  id: string;
  title: string;
  category: 'Estética' | 'Reabilitação' | 'Ortodontia' | 'Prevenção';
  durationMinutes: number;
  description: string;
  priceFormatted: string;
  tag: string;
}

export type AppointmentStatus = 'Confirmada' | 'Pendente' | 'Em Atendimento' | 'Concluída' | 'Cancelada';

export interface Appointment {
  id: string;
  code: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  patientDocument: string;
  serviceId: string;
  serviceTitle: string;
  professionalId: string;
  professionalName: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  notes?: string;
  status: AppointmentStatus;
  createdAt: string;
}

export interface TimeBlock {
  id: string;
  professionalId: string;
  date: string;
  reason: string;
}
