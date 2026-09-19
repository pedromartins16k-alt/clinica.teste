import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { PatientLanding } from './components/PatientLanding';
import { AdminDashboard } from './components/AdminDashboard';
import { BookingModal } from './components/BookingModal';
import { ClinicStore } from './store';
import { Appointment, AppointmentStatus, DentalService, Professional } from './types';

export function App() {
  const [currentView, setCurrentView] = useState<'patient' | 'admin'>('patient');
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | undefined>(undefined);
  const [preselectedProfId, setPreselectedProfId] = useState<string | undefined>(undefined);

  // Estados dos dados
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [services, setServices] = useState<DentalService[]>([]);

  // Carregar dados da Store
  const loadStoreData = () => {
    setAppointments(ClinicStore.getAppointments());
    setProfessionals(ClinicStore.getProfessionals());
    setServices(ClinicStore.getServices());
  };

  useEffect(() => {
    loadStoreData();
  }, []);

  const handleOpenBooking = () => {
    setPreselectedServiceId(undefined);
    setPreselectedProfId(undefined);
    setIsBookingOpen(true);
  };

  const handleOpenBookingWithService = (serviceId: string) => {
    setPreselectedServiceId(serviceId);
    setPreselectedProfId(undefined);
    setIsBookingOpen(true);
  };

  const handleOpenBookingWithProfessional = (profId: string) => {
    setPreselectedProfId(profId);
    setPreselectedServiceId(undefined);
    setIsBookingOpen(true);
  };

  const handleAppointmentCreated = (newAppointment: Appointment) => {
    loadStoreData();
  };

  const handleStatusChange = (id: string, status: AppointmentStatus) => {
    ClinicStore.updateAppointmentStatus(id, status);
    loadStoreData();
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-aura-bone text-aura-noir">
      
      {/* Barra de Navegação Superior */}
      <Navbar 
        currentView={currentView}
        onNavigate={setCurrentView}
        onOpenBooking={handleOpenBooking}
      />

      {/* Conteúdo da Visão Ativa */}
      <main className="flex-1">
        {currentView === 'patient' ? (
          <PatientLanding
            services={services}
            professionals={professionals}
            onOpenBookingWithService={handleOpenBookingWithService}
            onOpenBookingWithProfessional={handleOpenBookingWithProfessional}
            onOpenBooking={handleOpenBooking}
          />
        ) : (
          <AdminDashboard
            appointments={appointments}
            professionals={professionals}
            services={services}
            onStatusChange={handleStatusChange}
            onRefreshData={loadStoreData}
          />
        )}
      </main>

      {/* Modal Multi-Step de Agendamento */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        services={services}
        professionals={professionals}
        onAppointmentCreated={handleAppointmentCreated}
        initialServiceId={preselectedServiceId}
        initialProfessionalId={preselectedProfId}
      />

    </div>
  );
}

export default App;
