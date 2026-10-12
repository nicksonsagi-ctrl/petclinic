import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  CheckCircle2,
  Printer,
  Calendar,
  ArrowLeft,
  Clock,
  MapPin,
  Phone,
  AlertCircle,
} from 'lucide-react';
import { useClinic } from '../context/ClinicContext';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const BookingSuccessPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { getBookingById, lastConfirmedBookingId, contactConfig } = useClinic();

  const queryBookingId = searchParams.get('bookingId');
  const targetId = queryBookingId || lastConfirmedBookingId || '';
  const booking = targetId ? getBookingById(targetId) : undefined;

  const handlePrint = () => {
    window.print();
  };

  if (!booking) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <Breadcrumbs items={[{ label: 'Appointment Confirmation' }]} />
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 text-center space-y-5">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mx-auto">
            <AlertCircle className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 font-display">
            No Recent Confirmed Booking Selected
          </h1>
          <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            We only display a booking confirmation slip after a valid appointment has been saved. You can schedule a new appointment now or inspect your existing saved bookings.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              to="/book-appointment"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-xl transition-colors"
            >
              <Calendar className="w-4 h-4" />
              Book an Appointment
            </Link>
            <Link
              to="/my-bookings"
              className="inline-flex items-center justify-center px-5 py-3 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
            >
              View My Bookings
            </Link>
            <Link
              to="/"
              className="inline-flex items-center justify-center px-5 py-3 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'My Bookings', to: '/my-bookings' },
          { label: `Confirmation ${booking.referenceNumber}` },
        ]}
      />

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        {/* Top Confirmation Banner */}
        <div className="bg-gradient-to-r from-teal-900 to-slate-900 text-white p-8 sm:p-10 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-400/20 border border-teal-400/40 text-teal-300 flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div className="text-right">
              <span className="text-xs text-teal-300 block">Booking Reference</span>
              <span className="text-lg sm:text-xl font-extrabold font-mono tracking-tight text-white tabular-nums">
                {booking.referenceNumber}
              </span>
            </div>
          </div>

          <div className="space-y-1.5 pt-2">
            <div className="text-xs font-semibold text-teal-300">
              Status: {booking.status} · Saved to Browser Storage
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight">
              Your Veterinary Appointment is Confirmed!
            </h1>
            <p className="text-sm text-teal-100/90">
              We have reserved {booking.petName}’s consultation with {booking.vetName}. Please arrive 10 minutes prior to your scheduled time slot.
            </p>
          </div>
        </div>

        {/* Appointment Details Body */}
        <div className="p-6 sm:p-10 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 space-y-3">
              <p className="text-xs font-semibold text-teal-800">
                01. Companion Pet & Service
              </p>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between gap-2">
                  <dt className="text-slate-500">Pet Name:</dt>
                  <dd className="font-bold text-slate-900">
                    {booking.petName} ({booking.petType})
                  </dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-slate-500">Breed & Age:</dt>
                  <dd className="text-slate-800">
                    {booking.breed} · {booking.petAge}
                  </dd>
                </div>
                <div className="flex justify-between gap-2 pt-2 border-t border-slate-200/70">
                  <dt className="text-slate-500">Selected Service:</dt>
                  <dd className="font-semibold text-teal-800 text-right">
                    {booking.serviceName}
                  </dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-slate-500">Consultation Fee:</dt>
                  <dd className="font-bold text-slate-900 tabular-nums">
                    LKR {booking.servicePriceLKR.toLocaleString()}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 space-y-3">
              <p className="text-xs font-semibold text-teal-800">
                02. Clinician, Date & Time Slot
              </p>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between gap-2">
                  <dt className="text-slate-500">Veterinarian:</dt>
                  <dd className="font-bold text-slate-900 text-right">
                    {booking.vetName}
                  </dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-teal-700" />
                    Date:
                  </dt>
                  <dd className="font-bold text-slate-900 tabular-nums">
                    {booking.date}
                  </dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-slate-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-teal-700" />
                    Time Slot:
                  </dt>
                  <dd className="font-bold text-teal-800 tabular-nums">
                    {booking.timeSlot}
                  </dd>
                </div>
                <div className="flex justify-between gap-2 pt-2 border-t border-slate-200/70">
                  <dt className="text-slate-500">Pet Owner:</dt>
                  <dd className="text-slate-800 text-right">{booking.ownerName}</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-2 text-sm">
            <p className="text-xs font-semibold text-slate-500">
              Reason for Visit & Clinical Notes
            </p>
            <p className="text-slate-800 font-medium">{booking.reason}</p>
            {booking.notes && (
              <p className="text-xs text-slate-600 pt-1">
                Additional Notes: {booking.notes}
              </p>
            )}
          </div>

          {/* Clinic Location Reminder */}
          <div className="bg-teal-50/70 rounded-2xl border border-teal-200/80 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-700">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-900">
                  {contactConfig.clinicName}
                </p>
                <p>
                  {contactConfig.addressLine1}, {contactConfig.addressLine2}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 font-semibold text-teal-900 tabular-nums shrink-0">
              <Phone className="w-4 h-4 text-teal-700" />
              <span>{contactConfig.phonePrimary}</span>
            </div>
          </div>

          {/* 3 Required Working Action Buttons */}
          <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 no-print">
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/my-bookings"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-xl transition-colors whitespace-nowrap"
              >
                <Calendar className="w-4 h-4" />
                View My Bookings
              </Link>

              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors whitespace-nowrap cursor-pointer"
              >
                <Printer className="w-4 h-4 text-teal-700" />
                Print Confirmation
              </button>
            </div>

            <Link
              to="/"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-3 text-sm font-semibold text-slate-600 hover:text-slate-900 rounded-xl transition-colors whitespace-nowrap"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
