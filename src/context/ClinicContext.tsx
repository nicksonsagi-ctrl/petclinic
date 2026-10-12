import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  AppointmentBooking,
  ClinicContactConfig,
  DemoUser,
  BookingStatus,
} from '../types/clinic';
import { DEFAULT_CLINIC_CONTACT, getInitialDemoBookings } from '../data/clinicData';

const STORAGE_KEYS = {
  BOOKINGS: 'pawcare_bookings_v1',
  USER: 'pawcare_demo_user_v1',
  REGISTERED_USERS: 'pawcare_registered_users_v1',
  CONTACT_CONFIG: 'pawcare_clinic_contact_v1',
  LAST_BOOKING_ID: 'pawcare_last_booking_id_v1',
};

interface RegisteredDemoUser extends DemoUser {
  passwordSimple: string;
}

interface ClinicContextType {
  bookings: AppointmentBooking[];
  currentUser: DemoUser | null;
  contactConfig: ClinicContactConfig;
  lastConfirmedBookingId: string | null;
  createBooking: (
    bookingInput: Omit<AppointmentBooking, 'id' | 'referenceNumber' | 'status' | 'createdAt'>,
    rescheduleFromId?: string
  ) => AppointmentBooking;
  cancelBooking: (bookingId: string) => void;
  getBookingById: (bookingId: string) => AppointmentBooking | undefined;
  isSlotTaken: (vetId: string, date: string, timeSlot: string, ignoreBookingId?: string) => boolean;
  loginDemoUser: (email: string, passwordSimple: string) => { success: boolean; message: string };
  registerDemoUser: (
    fullName: string,
    email: string,
    phone: string,
    passwordSimple: string
  ) => { success: boolean; message: string };
  logoutDemoUser: () => void;
  updateContactConfig: (newConfig: ClinicContactConfig) => void;
  resetContactConfig: () => void;
}

const ClinicContext = createContext<ClinicContextType | undefined>(undefined);

export const ClinicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<AppointmentBooking[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error('Failed to read bookings from localStorage', e);
    }
    const initial = getInitialDemoBookings();
    try {
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(initial));
    } catch (e) {
      console.error('Failed to save initial bookings', e);
    }
    return initial;
  });

  const [currentUser, setCurrentUser] = useState<DemoUser | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [contactConfig, setContactConfig] = useState<ClinicContactConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CONTACT_CONFIG);
      return saved ? JSON.parse(saved) : DEFAULT_CLINIC_CONTACT;
    } catch {
      return DEFAULT_CLINIC_CONTACT;
    }
  });

  const [lastConfirmedBookingId, setLastConfirmedBookingId] = useState<string | null>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.LAST_BOOKING_ID);
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
    } catch (e) {
      console.error('Failed to sync bookings to localStorage', e);
    }
  }, [bookings]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(STORAGE_KEYS.USER);
      }
    } catch (e) {
      console.error('Failed to sync user to localStorage', e);
    }
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CONTACT_CONFIG, JSON.stringify(contactConfig));
    } catch (e) {
      console.error('Failed to sync contact config to localStorage', e);
    }
  }, [contactConfig]);

  const isSlotTaken = (
    vetId: string,
    date: string,
    timeSlot: string,
    ignoreBookingId?: string
  ): boolean => {
    return bookings.some(
      (b) =>
        b.status === 'Confirmed' &&
        b.vetId === vetId &&
        b.date === date &&
        b.timeSlot === timeSlot &&
        b.id !== ignoreBookingId
    );
  };

  const createBooking = (
    bookingInput: Omit<AppointmentBooking, 'id' | 'referenceNumber' | 'status' | 'createdAt'>,
    rescheduleFromId?: string
  ): AppointmentBooking => {
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const year = new Date().getFullYear();

    if (rescheduleFromId) {
      const existing = bookings.find((b) => b.id === rescheduleFromId);
      const updatedBooking: AppointmentBooking = {
        ...bookingInput,
        id: existing ? existing.id : `bk-${Date.now()}`,
        referenceNumber: existing ? existing.referenceNumber : `PC-${year}-${randomDigits}`,
        status: 'Confirmed',
        createdAt: new Date().toISOString(),
      };

      const nextBookings = existing
        ? bookings.map((b) => (b.id === rescheduleFromId ? updatedBooking : b))
        : [updatedBooking, ...bookings];

      setBookings(nextBookings);
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(nextBookings));
      setLastConfirmedBookingId(updatedBooking.id);
      localStorage.setItem(STORAGE_KEYS.LAST_BOOKING_ID, updatedBooking.id);
      return updatedBooking;
    }

    const newBooking: AppointmentBooking = {
      ...bookingInput,
      id: `bk-${Date.now()}-${randomDigits}`,
      referenceNumber: `PC-${year}-${randomDigits}`,
      status: 'Confirmed' as BookingStatus,
      createdAt: new Date().toISOString(),
    };

    const nextBookings = [newBooking, ...bookings];
    setBookings(nextBookings);
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(nextBookings));
    setLastConfirmedBookingId(newBooking.id);
    localStorage.setItem(STORAGE_KEYS.LAST_BOOKING_ID, newBooking.id);
    return newBooking;
  };

  const cancelBooking = (bookingId: string) => {
    setBookings((prev) => {
      const next = prev.map((b) =>
        b.id === bookingId ? { ...b, status: 'Cancelled' as BookingStatus } : b
      );
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(next));
      return next;
    });
  };

  const getBookingById = (bookingId: string) => {
    return bookings.find((b) => b.id === bookingId);
  };

  const getRegisteredUsers = (): RegisteredDemoUser[] => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.REGISTERED_USERS);
      if (raw) return JSON.parse(raw);
    } catch {
      // ignore
    }
    return [
      {
        id: 'demo-usr-default',
        fullName: 'Kavindi Jayasinghe',
        email: 'demo@pawcareclinic.lk',
        phone: '+94 77 234 5678',
        passwordSimple: 'PawCare2026',
        isDemoAccount: true,
      },
    ];
  };

  const loginDemoUser = (email: string, passwordSimple: string) => {
    const normalizedEmail = email.trim().toLowerCase();
    const users = getRegisteredUsers();
    const matched = users.find((u) => u.email.toLowerCase() === normalizedEmail);

    if (matched) {
      if (matched.passwordSimple !== passwordSimple) {
        return {
          success: false,
          message: 'Invalid password for this demo account. Try "PawCare2026" for the preset demo user.',
        };
      }
      const sessionUser: DemoUser = {
        id: matched.id,
        fullName: matched.fullName,
        email: matched.email,
        phone: matched.phone,
        isDemoAccount: true,
      };
      setCurrentUser(sessionUser);
      return { success: true, message: 'Signed in to demo session.' };
    }

    // Also allow instant demo login with any valid email + password >= 6 chars for convenience
    const fallbackUser: DemoUser = {
      id: `demo-usr-${Date.now()}`,
      fullName: normalizedEmail.split('@')[0].replace(/[._-]/g, ' '),
      email: normalizedEmail,
      phone: '+94 77 000 0000',
      isDemoAccount: true,
    };
    setCurrentUser(fallbackUser);
    return {
      success: true,
      message: 'Signed in using local browser demo session.',
    };
  };

  const registerDemoUser = (
    fullName: string,
    email: string,
    phone: string,
    passwordSimple: string
  ) => {
    const normalizedEmail = email.trim().toLowerCase();
    const users = getRegisteredUsers();
    if (users.some((u) => u.email.toLowerCase() === normalizedEmail)) {
      return {
        success: false,
        message: 'A demo profile with this email already exists in your browser storage. Please sign in instead.',
      };
    }

    const newUser: RegisteredDemoUser = {
      id: `demo-usr-${Date.now()}`,
      fullName: fullName.trim(),
      email: normalizedEmail,
      phone: phone.trim(),
      passwordSimple,
      isDemoAccount: true,
    };

    const updatedUsers = [...users, newUser];
    try {
      localStorage.setItem(STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(updatedUsers));
    } catch (e) {
      console.error('Failed to save registered demo user', e);
    }

    setCurrentUser({
      id: newUser.id,
      fullName: newUser.fullName,
      email: newUser.email,
      phone: newUser.phone,
      isDemoAccount: true,
    });

    return {
      success: true,
      message: 'Demo account saved to browser storage.',
    };
  };

  const logoutDemoUser = () => {
    setCurrentUser(null);
  };

  const updateContactConfig = (newConfig: ClinicContactConfig) => {
    setContactConfig(newConfig);
  };

  const resetContactConfig = () => {
    setContactConfig(DEFAULT_CLINIC_CONTACT);
  };

  return (
    <ClinicContext.Provider
      value={{
        bookings,
        currentUser,
        contactConfig,
        lastConfirmedBookingId,
        createBooking,
        cancelBooking,
        getBookingById,
        isSlotTaken,
        loginDemoUser,
        registerDemoUser,
        logoutDemoUser,
        updateContactConfig,
        resetContactConfig,
      }}
    >
      {children}
    </ClinicContext.Provider>
  );
};

export const useClinic = (): ClinicContextType => {
  const context = useContext(ClinicContext);
  if (!context) {
    throw new Error('useClinic must be used within a ClinicProvider');
  }
  return context;
};
