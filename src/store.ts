import { Appointment, DentalService, Professional } from './types';
import { INITIAL_APPOINTMENTS, INITIAL_SERVICES, INITIAL_PROFESSIONALS } from './data';

const STORAGE_KEYS = {
  APPOINTMENTS: 'aura_appointments_v1',
  SERVICES: 'aura_services_v1',
  PROFESSIONALS: 'aura_professionals_v1',
  BLOCKED_DATES: 'aura_blocked_dates_v1'
};

export class ClinicStore {
  static getAppointments(): Appointment[] {
    const data = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(INITIAL_APPOINTMENTS));
      return INITIAL_APPOINTMENTS;
    }
    try {
      return JSON.parse(data);
    } catch {
      return INITIAL_APPOINTMENTS;
    }
  }

  static saveAppointments(appointments: Appointment[]): void {
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appointments));
  }

  static addAppointment(newApp: Omit<Appointment, 'id' | 'code' | 'createdAt' | 'status'>): Appointment {
    const appointments = this.getAppointments();
    const code = `AUR-${Math.floor(1000 + Math.random() * 9000)}`;
    const fullAppointment: Appointment = {
      ...newApp,
      id: `app-${Date.now()}`,
      code,
      status: 'Confirmada',
      createdAt: new Date().toISOString()
    };
    const updated = [fullAppointment, ...appointments];
    this.saveAppointments(updated);
    return fullAppointment;
  }

  static updateAppointmentStatus(id: string, status: Appointment['status']): void {
    const appointments = this.getAppointments();
    const updated = appointments.map(app => (app.id === id ? { ...app, status } : app));
    this.saveAppointments(updated);
  }

  static getProfessionals(): Professional[] {
    const data = localStorage.getItem(STORAGE_KEYS.PROFESSIONALS);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.PROFESSIONALS, JSON.stringify(INITIAL_PROFESSIONALS));
      return INITIAL_PROFESSIONALS;
    }
    try {
      return JSON.parse(data);
    } catch {
      return INITIAL_PROFESSIONALS;
    }
  }

  static getServices(): DentalService[] {
    const data = localStorage.getItem(STORAGE_KEYS.SERVICES);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(INITIAL_SERVICES));
      return INITIAL_SERVICES;
    }
    try {
      return JSON.parse(data);
    } catch {
      return INITIAL_SERVICES;
    }
  }

  static getBlockedDates(): { [profId: string]: string[] } {
    const data = localStorage.getItem(STORAGE_KEYS.BLOCKED_DATES);
    if (!data) {
      const initial = {
        'prof-2': ['2026-09-25'] // Simulação de cirurgia externa
      };
      localStorage.setItem(STORAGE_KEYS.BLOCKED_DATES, JSON.stringify(initial));
      return initial;
    }
    try {
      return JSON.parse(data);
    } catch {
      return {};
    }
  }

  static toggleDateBlock(profId: string, dateStr: string): boolean {
    const current = this.getBlockedDates();
    const profList = current[profId] || [];
    let isBlocked = false;
    if (profList.includes(dateStr)) {
      current[profId] = profList.filter(d => d !== dateStr);
      isBlocked = false;
    } else {
      current[profId] = [...profList, dateStr];
      isBlocked = true;
    }
    localStorage.setItem(STORAGE_KEYS.BLOCKED_DATES, JSON.stringify(current));
    return isBlocked;
  }
}
