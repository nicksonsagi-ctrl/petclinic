export type PetType = 'Dog' | 'Cat' | 'Bird' | 'Other';

export type ServiceCategory =
  | 'Preventive Care'
  | 'Surgery & Diagnostics'
  | 'Wellness & Grooming'
  | 'Emergency & Dental';

export interface ClinicService {
  id: string;
  name: string;
  category: ServiceCategory;
  shortDescription: string;
  fullDescription: string;
  priceLKR: number;
  durationMinutes: number;
  iconName: string;
  highlights: string[];
}

export interface Veterinarian {
  id: string;
  name: string;
  credentials: string;
  specialization: string;
  experienceYears: number;
  availabilityDays: string[];
  availabilitySummary: string;
  image: string;
  bio: string;
  education: string[];
  languages: string[];
  focusAreas: string[];
  isSampleProfile: boolean;
}

export type BookingStatus = 'Confirmed' | 'Cancelled' | 'Completed';

export interface AppointmentBooking {
  id: string;
  referenceNumber: string;
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  petName: string;
  petType: PetType;
  breed: string;
  petAge: string;
  serviceId: string;
  serviceName: string;
  servicePriceLKR: number;
  vetId: string;
  vetName: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "09:30 AM"
  reason: string;
  notes: string;
  status: BookingStatus;
  createdAt: string;
}

export interface DemoUser {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  isDemoAccount: boolean;
}

export interface ClinicContactConfig {
  clinicName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  country: string;
  phonePrimary: string;
  phoneEmergency: string;
  emailGeneral: string;
  emailAppointments: string;
  openingHoursWeekdays: string;
  openingHoursWeekend: string;
  emergencyHours: string;
}
