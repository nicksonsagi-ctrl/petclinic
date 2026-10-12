import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  UserCheck,
} from 'lucide-react';
import {
  SERVICES_DATA,
  VETERINARIANS_DATA,
  AVAILABLE_TIME_SLOTS,
} from '../data/clinicData';
import { PetType } from '../types/clinic';
import { useClinic } from '../context/ClinicContext';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const BookAppointmentPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {
    createBooking,
    getBookingById,
    isSlotTaken,
    currentUser,
  } = useClinic();

  const preselectedServiceId = searchParams.get('serviceId') || '';
  const preselectedVetId = searchParams.get('vetId') || '';
  const rescheduleBookingId = searchParams.get('rescheduleId') || '';

  const todayDateString = useMemo(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }, []);

  const defaultTomorrowDateString = useMemo(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const year = tomorrow.getFullYear();
    const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const day = String(tomorrow.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }, []);

  // Form State
  const [ownerName, setOwnerName] = useState(currentUser?.fullName || '');
  const [ownerEmail, setOwnerEmail] = useState(currentUser?.email || '');
  const [ownerPhone, setOwnerPhone] = useState(currentUser?.phone || '');
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState<PetType>('Dog');
  const [breed, setBreed] = useState('');
  const [petAge, setPetAge] = useState('');
  const [serviceId, setServiceId] = useState(
    SERVICES_DATA.some((s) => s.id === preselectedServiceId)
      ? preselectedServiceId
      : SERVICES_DATA[0].id
  );
  const [vetId, setVetId] = useState(
    VETERINARIANS_DATA.some((v) => v.id === preselectedVetId)
      ? preselectedVetId
      : VETERINARIANS_DATA[0].id
  );
  const [date, setDate] = useState(defaultTomorrowDateString);
  const [timeSlot, setTimeSlot] = useState('');
  const [reason, setReason] = useState('');
  const [notes, setNotes] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync URL query params for prefilling service, vet, or rescheduling an existing booking
  useEffect(() => {
    if (rescheduleBookingId) {
      const existing = getBookingById(rescheduleBookingId);
      if (existing) {
        setOwnerName(existing.ownerName.replace(' (Sample Demo Booking)', ''));
        setOwnerEmail(existing.ownerEmail);
        setOwnerPhone(existing.ownerPhone);
        setPetName(existing.petName);
        setPetType(existing.petType);
        setBreed(existing.breed);
        setPetAge(existing.petAge);
        setServiceId(existing.serviceId);
        setVetId(existing.vetId);
        const validDate =
          existing.date >= todayDateString ? existing.date : defaultTomorrowDateString;
        setDate(validDate);
        setTimeSlot(existing.timeSlot);
        setReason(existing.reason);
        setNotes(existing.notes);
        return;
      }
    }

    if (preselectedServiceId && SERVICES_DATA.some((s) => s.id === preselectedServiceId)) {
      setServiceId(preselectedServiceId);
    }
    if (preselectedVetId && VETERINARIANS_DATA.some((v) => v.id === preselectedVetId)) {
      setVetId(preselectedVetId);
    }
  }, [
    rescheduleBookingId,
    preselectedServiceId,
    preselectedVetId,
    getBookingById,
    todayDateString,
    defaultTomorrowDateString,
  ]);

  // Auto-select first available time slot when vet or date changes
  useEffect(() => {
    if (timeSlot && !isSlotTaken(vetId, date, timeSlot, rescheduleBookingId || undefined)) {
      return;
    }
    const firstAvailable = AVAILABLE_TIME_SLOTS.find(
      (slot) => !isSlotTaken(vetId, date, slot, rescheduleBookingId || undefined)
    );
    setTimeSlot(firstAvailable || '');
  }, [vetId, date, isSlotTaken, rescheduleBookingId, timeSlot]);

  const selectedService = useMemo(
    () => SERVICES_DATA.find((s) => s.id === serviceId) || SERVICES_DATA[0],
    [serviceId]
  );

  const selectedVet = useMemo(
    () => VETERINARIANS_DATA.find((v) => v.id === vetId) || VETERINARIANS_DATA[0],
    [vetId]
  );

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!ownerName.trim() || ownerName.trim().length < 2) {
      newErrors.ownerName = 'Please enter the pet owner’s full name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!ownerEmail.trim() || !emailRegex.test(ownerEmail.trim())) {
      newErrors.ownerEmail = 'Please enter a valid email address (e.g. name@example.lk).';
    }

    const phoneClean = ownerPhone.replace(/[\s()-]/g, '');
    const phoneRegex = /^\+?[0-9]{9,15}$/;
    if (!phoneClean || !phoneRegex.test(phoneClean)) {
      newErrors.ownerPhone = 'Please enter a valid phone number (9 to 15 digits, e.g. +94 77 123 4567).';
    }

    if (!petName.trim()) {
      newErrors.petName = 'Please enter your pet’s name.';
    }

    if (!breed.trim()) {
      newErrors.breed = 'Please specify your pet’s breed (or enter Mixed / Domestic).';
    }

    if (!petAge.trim()) {
      newErrors.petAge = 'Please enter your pet’s age (e.g. 2 Years or 6 Months).';
    }

    if (!date) {
      newErrors.date = 'Please select an appointment date.';
    } else if (date < todayDateString) {
      newErrors.date = 'Appointment date cannot be in the past. Please choose today or a future date.';
    }

    if (!timeSlot) {
      newErrors.timeSlot = 'Please select an available time slot.';
    } else if (isSlotTaken(vetId, date, timeSlot, rescheduleBookingId || undefined)) {
      newErrors.timeSlot =
        'This time slot is already booked for the selected veterinarian and date. Please choose another slot.';
    }

    if (!reason.trim() || reason.trim().length < 5) {
      newErrors.reason = 'Please briefly describe the reason for your visit (at least 5 characters).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const savedBooking = createBooking(
        {
          ownerName: ownerName.trim(),
          ownerEmail: ownerEmail.trim(),
          ownerPhone: ownerPhone.trim(),
          petName: petName.trim(),
          petType,
          breed: breed.trim(),
          petAge: petAge.trim(),
          serviceId: selectedService.id,
          serviceName: selectedService.name,
          servicePriceLKR: selectedService.priceLKR,
          vetId: selectedVet.id,
          vetName: selectedVet.name,
          date,
          timeSlot,
          reason: reason.trim(),
          notes: notes.trim(),
        },
        rescheduleBookingId || undefined
      );

      setIsSubmitting(false);
      navigate(`/booking-success?bookingId=${savedBooking.id}`);
    }, 250);
  };

  const fillQuickSamplePet = () => {
    setOwnerName(currentUser?.fullName || 'Dilshan Samarasinghe');
    setOwnerEmail(currentUser?.email || 'dilshan.petparent@example.lk');
    setOwnerPhone(currentUser?.phone || '+94 77 456 7890');
    setPetName('Milo');
    setPetType('Dog');
    setBreed('Labrador Retriever');
    setPetAge('2 Years');
    setReason('Annual wellness examination and core booster check');
    setNotes('Gentle temperament, slightly nervous around loud clippers.');
    setErrors({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs
        items={[
          { label: rescheduleBookingId ? 'Reschedule Appointment' : 'Book Appointment' },
        ]}
      />

      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-medium text-teal-700">
            <span>Real-Time Slot Availability</span>
            <span aria-hidden="true">·</span>
            <span>Instant Reference Number</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight">
            {rescheduleBookingId
              ? 'Reschedule Your Veterinary Appointment'
              : 'Book a Veterinary Appointment'}
          </h1>
          <p className="text-sm sm:text-base text-slate-600">
            Complete your pet’s details below, select your preferred veterinarian and time slot, and review your live booking summary before confirming.
          </p>
        </div>

        <button
          type="button"
          onClick={fillQuickSamplePet}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-xl transition-colors self-start lg:self-auto whitespace-nowrap"
        >
          <UserCheck className="w-4 h-4 text-teal-700" />
          Auto-Fill Sample Pet Details
        </button>
      </div>

      {(preselectedServiceId || preselectedVetId || rescheduleBookingId) && (
        <div className="mb-8 bg-teal-50/90 border border-teal-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs text-teal-950">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0" />
            <span>
              {rescheduleBookingId
                ? 'Existing appointment details have been pre-loaded for rescheduling.'
                : `Pre-selected from your previous selection: ${selectedService.name} with ${selectedVet.name}.`}
            </span>
          </div>
          <Link
            to="/my-bookings"
            className="font-semibold text-teal-800 hover:underline whitespace-nowrap"
          >
            View My Saved Bookings →
          </Link>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 8 Columns: Appointment Form Fields */}
        <div className="lg:col-span-8 space-y-8">
          {/* Section 1: Pet Owner Information */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-lg font-bold text-slate-900 font-display">
                01. Pet Owner Contact Information
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                We will send your appointment reference and clinical preparation guide to these details.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2">
                <label
                  htmlFor="ownerName"
                  className="block text-xs font-semibold text-slate-700 mb-1.5"
                >
                  Owner Full Name <span className="text-rose-600">*</span>
                </label>
                <input
                  id="ownerName"
                  type="text"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  placeholder="e.g., Kavindi Jayasinghe"
                  className={`w-full px-3.5 py-2.5 text-sm rounded-lg border ${
                    errors.ownerName
                      ? 'border-rose-500 bg-rose-50/30'
                      : 'border-slate-300 bg-white'
                  } focus:outline-none focus:ring-2 focus:ring-teal-600`}
                />
                {errors.ownerName && (
                  <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {errors.ownerName}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="ownerEmail"
                  className="block text-xs font-semibold text-slate-700 mb-1.5"
                >
                  Email Address <span className="text-rose-600">*</span>
                </label>
                <input
                  id="ownerEmail"
                  type="email"
                  value={ownerEmail}
                  onChange={(e) => setOwnerEmail(e.target.value)}
                  placeholder="name@example.lk"
                  className={`w-full px-3.5 py-2.5 text-sm rounded-lg border ${
                    errors.ownerEmail
                      ? 'border-rose-500 bg-rose-50/30'
                      : 'border-slate-300 bg-white'
                  } focus:outline-none focus:ring-2 focus:ring-teal-600`}
                />
                {errors.ownerEmail && (
                  <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {errors.ownerEmail}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="ownerPhone"
                  className="block text-xs font-semibold text-slate-700 mb-1.5"
                >
                  Phone Number <span className="text-rose-600">*</span>
                </label>
                <input
                  id="ownerPhone"
                  type="tel"
                  value={ownerPhone}
                  onChange={(e) => setOwnerPhone(e.target.value)}
                  placeholder="+94 77 123 4567"
                  className={`w-full px-3.5 py-2.5 text-sm rounded-lg border tabular-nums ${
                    errors.ownerPhone
                      ? 'border-rose-500 bg-rose-50/30'
                      : 'border-slate-300 bg-white'
                  } focus:outline-none focus:ring-2 focus:ring-teal-600`}
                />
                {errors.ownerPhone && (
                  <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {errors.ownerPhone}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Pet Patient Profile */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-lg font-bold text-slate-900 font-display">
                02. Companion Pet Details
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Tell us about the pet attending this consultation.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="petName"
                  className="block text-xs font-semibold text-slate-700 mb-1.5"
                >
                  Pet Name <span className="text-rose-600">*</span>
                </label>
                <input
                  id="petName"
                  type="text"
                  value={petName}
                  onChange={(e) => setPetName(e.target.value)}
                  placeholder="e.g., Bruno, Mochi, Kiwi"
                  className={`w-full px-3.5 py-2.5 text-sm rounded-lg border ${
                    errors.petName
                      ? 'border-rose-500 bg-rose-50/30'
                      : 'border-slate-300 bg-white'
                  } focus:outline-none focus:ring-2 focus:ring-teal-600`}
                />
                {errors.petName && (
                  <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {errors.petName}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="petType"
                  className="block text-xs font-semibold text-slate-700 mb-1.5"
                >
                  Pet Type <span className="text-rose-600">*</span>
                </label>
                <select
                  id="petType"
                  value={petType}
                  onChange={(e) => setPetType(e.target.value as PetType)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600"
                >
                  <option value="Dog">Dog</option>
                  <option value="Cat">Cat</option>
                  <option value="Bird">Bird</option>
                  <option value="Other">Other Companion Pet</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="breed"
                  className="block text-xs font-semibold text-slate-700 mb-1.5"
                >
                  Breed <span className="text-rose-600">*</span>
                </label>
                <input
                  id="breed"
                  type="text"
                  value={breed}
                  onChange={(e) => setBreed(e.target.value)}
                  placeholder="e.g., Golden Retriever, Persian, Mixed"
                  className={`w-full px-3.5 py-2.5 text-sm rounded-lg border ${
                    errors.breed
                      ? 'border-rose-500 bg-rose-50/30'
                      : 'border-slate-300 bg-white'
                  } focus:outline-none focus:ring-2 focus:ring-teal-600`}
                />
                {errors.breed && (
                  <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {errors.breed}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="petAge"
                  className="block text-xs font-semibold text-slate-700 mb-1.5"
                >
                  Pet Age <span className="text-rose-600">*</span>
                </label>
                <input
                  id="petAge"
                  type="text"
                  value={petAge}
                  onChange={(e) => setPetAge(e.target.value)}
                  placeholder="e.g., 3 Years, 5 Months"
                  className={`w-full px-3.5 py-2.5 text-sm rounded-lg border ${
                    errors.petAge
                      ? 'border-rose-500 bg-rose-50/30'
                      : 'border-slate-300 bg-white'
                  } focus:outline-none focus:ring-2 focus:ring-teal-600`}
                />
                {errors.petAge && (
                  <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {errors.petAge}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Section 3: Service, Veterinarian, Date & Time Slot */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-lg font-bold text-slate-900 font-display">
                03. Service, Clinician & Schedule
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Already booked slots for the selected veterinarian and date are automatically disabled to prevent double-booking.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="serviceId"
                  className="block text-xs font-semibold text-slate-700 mb-1.5"
                >
                  Select Veterinary Service <span className="text-rose-600">*</span>
                </label>
                <select
                  id="serviceId"
                  value={serviceId}
                  onChange={(e) => setServiceId(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600"
                >
                  {SERVICES_DATA.map((srv) => (
                    <option key={srv.id} value={srv.id}>
                      {srv.name} — LKR {srv.priceLKR.toLocaleString()}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="vetId"
                  className="block text-xs font-semibold text-slate-700 mb-1.5"
                >
                  Select Veterinarian <span className="text-rose-600">*</span>
                </label>
                <select
                  id="vetId"
                  value={vetId}
                  onChange={(e) => setVetId(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600"
                >
                  {VETERINARIANS_DATA.map((vet) => (
                    <option key={vet.id} value={vet.id}>
                      {vet.name} ({vet.specialization})
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="appointmentDate"
                  className="block text-xs font-semibold text-slate-700 mb-1.5"
                >
                  Preferred Appointment Date <span className="text-rose-600">*</span>
                </label>
                <div className="relative">
                  <input
                    id="appointmentDate"
                    type="date"
                    min={todayDateString}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className={`w-full sm:w-72 px-3.5 py-2.5 text-sm rounded-lg border tabular-nums ${
                      errors.date
                        ? 'border-rose-500 bg-rose-50/30'
                        : 'border-slate-300 bg-white'
                    } focus:outline-none focus:ring-2 focus:ring-teal-600`}
                  />
                </div>
                {errors.date && (
                  <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {errors.date}
                  </p>
                )}
              </div>

              {/* Selectable Time Slots Grid */}
              <div className="sm:col-span-2 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-700">
                    Available Time Slots for {selectedVet.name} on {date || 'Selected Date'}{' '}
                    <span className="text-rose-600">*</span>
                  </span>
                  <span className="text-xs text-slate-500">
                    Click a time slot to select
                  </span>
                </div>

                <div
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 pt-1"
                  role="radiogroup"
                  aria-label="Available appointment time slots"
                >
                  {AVAILABLE_TIME_SLOTS.map((slot) => {
                    const taken = isSlotTaken(
                      vetId,
                      date,
                      slot,
                      rescheduleBookingId || undefined
                    );
                    const isSelected = timeSlot === slot && !taken;
                    return (
                      <button
                        key={slot}
                        type="button"
                        disabled={taken}
                        onClick={() => setTimeSlot(slot)}
                        className={`px-3 py-2.5 rounded-lg text-xs font-semibold tabular-nums border transition-colors flex flex-col items-center justify-center ${
                          taken
                            ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed line-through'
                            : isSelected
                            ? 'bg-teal-700 text-white border-teal-700 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-300 hover:border-teal-600 hover:bg-teal-50/40'
                        }`}
                      >
                        <span>{slot}</span>
                        {taken && (
                          <span className="text-[10px] font-normal no-underline text-rose-600 mt-0.5">
                            Booked
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {errors.timeSlot && (
                  <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {errors.timeSlot}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Section 4: Clinical Reason & Notes */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-5">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-lg font-bold text-slate-900 font-display">
                04. Reason for Visit & Clinical Notes
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Share symptoms, vaccine history, or dietary questions to help your veterinarian prepare.
              </p>
            </div>

            <div>
              <label
                htmlFor="reason"
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                Primary Reason for Visit <span className="text-rose-600">*</span>
              </label>
              <input
                id="reason"
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="e.g., Annual booster vaccination, skin itching, dental checkup"
                className={`w-full px-3.5 py-2.5 text-sm rounded-lg border ${
                  errors.reason
                    ? 'border-rose-500 bg-rose-50/30'
                    : 'border-slate-300 bg-white'
                } focus:outline-none focus:ring-2 focus:ring-teal-600`}
              />
              {errors.reason && (
                <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {errors.reason}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="notes"
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                Additional Notes / Allergies / Behavioral Preferences (Optional)
              </label>
              <textarea
                id="notes"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Let us know if your pet is anxious around other animals or has known medication sensitivities."
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>
          </div>
        </div>

        {/* Right 4 Columns: Live Booking Summary before Confirmation */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
          <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-7 border border-slate-800 space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <div className="text-xs font-semibold text-teal-400">
                Pre-Confirmation Review
              </div>
              <h2 className="text-xl font-bold font-display mt-1">
                Appointment Summary
              </h2>
            </div>

            <dl className="space-y-4 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-slate-400">Pet Patient:</dt>
                <dd className="font-semibold text-right text-white">
                  {petName.trim() ? `${petName} (${petType})` : 'Not entered yet'}
                </dd>
              </div>

              <div className="flex justify-between gap-4">
                <dt className="text-slate-400">Breed & Age:</dt>
                <dd className="text-right text-slate-200">
                  {breed.trim() || '—'} · {petAge.trim() || '—'}
                </dd>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-between gap-4">
                <dt className="text-slate-400">Selected Service:</dt>
                <dd className="font-semibold text-right text-teal-300">
                  {selectedService.name}
                </dd>
              </div>

              <div className="flex justify-between gap-4">
                <dt className="text-slate-400">Veterinarian:</dt>
                <dd className="font-semibold text-right text-white">
                  {selectedVet.name}
                </dd>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-between gap-4">
                <dt className="text-slate-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-teal-400" />
                  Date:
                </dt>
                <dd className="font-semibold text-right tabular-nums">
                  {date || 'Select date'}
                </dd>
              </div>

              <div className="flex justify-between gap-4">
                <dt className="text-slate-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-teal-400" />
                  Time Slot:
                </dt>
                <dd className="font-semibold text-right tabular-nums text-teal-300">
                  {timeSlot || 'Select slot'}
                </dd>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-baseline justify-between gap-4">
                <dt className="text-xs text-slate-400">
                  Estimated Consultation Fee:
                </dt>
                <dd className="text-2xl font-extrabold font-display text-white tabular-nums">
                  LKR {selectedService.priceLKR.toLocaleString()}
                </dd>
              </div>
            </dl>

            {Object.keys(errors).length > 0 && (
              <div className="bg-rose-950/90 border border-rose-700 text-rose-200 rounded-xl p-3.5 text-xs space-y-1">
                <p className="font-semibold flex items-center gap-1.5 text-rose-100">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  Please complete all required fields:
                </p>
                <p>Check the highlighted inputs on the form to confirm your booking.</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 disabled:opacity-60 rounded-xl transition-colors cursor-pointer"
            >
              {isSubmitting ? (
                <span>Saving Appointment...</span>
              ) : rescheduleBookingId ? (
                <>
                  <span>Confirm Rescheduled Booking</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span>Confirm & Book Appointment</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="flex items-center justify-between pt-2 text-xs text-slate-400">
              <Link to="/my-bookings" className="hover:text-teal-300 transition-colors">
                View My Bookings
              </Link>
              <span>·</span>
              <Link to="/" className="hover:text-teal-300 transition-colors">
                Return Home
              </Link>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-start gap-2 text-[11px] text-slate-400 leading-relaxed">
              <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
              <span>
                No upfront online payment required. Your booking reference is saved immediately to your browser’s My Bookings log.
              </span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
