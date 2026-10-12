import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  Eye,
  RefreshCw,
  XCircle,
  CheckCircle2,
  AlertTriangle,
  Plus,
  X,
} from 'lucide-react';
import { useClinic } from '../context/ClinicContext';
import { AppointmentBooking } from '../types/clinic';
import { Breadcrumbs } from '../components/Breadcrumbs';

type FilterTab = 'all' | 'upcoming' | 'past';

export const MyBookingsPage: React.FC = () => {
  const { bookings, cancelBooking } = useClinic();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [selectedDetailsBooking, setSelectedDetailsBooking] =
    useState<AppointmentBooking | null>(null);
  const [bookingToCancel, setBookingToCancel] =
    useState<AppointmentBooking | null>(null);
  const [feedbackBanner, setFeedbackBanner] = useState<string | null>(null);

  const todayDateStr = useMemo(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }, []);

  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      const isUpcoming = b.date >= todayDateStr && b.status === 'Confirmed';
      if (activeTab === 'upcoming') return isUpcoming;
      if (activeTab === 'past') return !isUpcoming;
      return true;
    });
  }, [bookings, activeTab, todayDateStr]);

  const upcomingCount = useMemo(
    () =>
      bookings.filter((b) => b.date >= todayDateStr && b.status === 'Confirmed')
        .length,
    [bookings, todayDateStr]
  );

  const pastOrCancelledCount = bookings.length - upcomingCount;

  const handleConfirmCancel = () => {
    if (!bookingToCancel) return;
    cancelBooking(bookingToCancel.id);
    setFeedbackBanner(
      `Appointment ${bookingToCancel.referenceNumber} for ${bookingToCancel.petName} has been cancelled and updated in localStorage.`
    );
    setBookingToCancel(null);
  };

  const handleReschedule = (bookingId: string) => {
    navigate(`/book-appointment?rescheduleId=${bookingId}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div>
        <Breadcrumbs items={[{ label: 'My Bookings' }]} />

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-medium text-teal-700">
              <span>Appointment Management</span>
              <span aria-hidden="true">·</span>
              <span>Synced with Browser localStorage</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight">
              My Veterinary Bookings
            </h1>
            <p className="text-sm sm:text-base text-slate-600">
              View your scheduled visits, inspect clinical booking references, reschedule time slots, or cancel appointments with instant updates.
            </p>
          </div>

          <Link
            to="/book-appointment"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-xl transition-colors whitespace-nowrap shrink-0 self-start md:self-auto"
          >
            <Plus className="w-4 h-4" />
            Book New Appointment
          </Link>
        </div>
      </div>

      {feedbackBanner && (
        <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 flex items-center justify-between gap-4 text-xs sm:text-sm text-teal-950">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0" />
            <span>{feedbackBanner}</span>
          </div>
          <button
            type="button"
            onClick={() => setFeedbackBanner(null)}
            className="p-1 text-teal-700 hover:text-teal-900 rounded"
            aria-label="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Filter Tabs: All, Upcoming, Past & Cancelled */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div
          className="inline-flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl self-start"
          role="tablist"
          aria-label="Filter appointments"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'all'}
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap tabular-nums ${
              activeTab === 'all'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Bookings ({bookings.length})
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'upcoming'}
            onClick={() => setActiveTab('upcoming')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap tabular-nums ${
              activeTab === 'upcoming'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Upcoming ({upcomingCount})
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'past'}
            onClick={() => setActiveTab('past')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap tabular-nums ${
              activeTab === 'past'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Past & Cancelled ({pastOrCancelledCount})
          </button>
        </div>

        <p className="text-xs text-slate-500">
          Showing <strong className="text-slate-800 tabular-nums">{filteredBookings.length}</strong> appointments
        </p>
      </div>

      {/* Empty State or Bookings List */}
      {filteredBookings.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center mx-auto">
            <Calendar className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 font-display">
            No {activeTab !== 'all' ? activeTab : ''} appointments found
          </h2>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            {activeTab === 'upcoming'
              ? 'You don’t have any upcoming confirmed appointments right now. Schedule a checkup, vaccination, or grooming session below.'
              : 'No bookings match the selected filter.'}
          </p>
          <div className="pt-2">
            <Link
              to="/book-appointment"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-xl transition-colors"
            >
              <Calendar className="w-4 h-4" />
              Book an Appointment
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking) => {
            const isCancelled = booking.status === 'Cancelled';
            const isCompleted =
              booking.status === 'Completed' ||
              (booking.date < todayDateStr && booking.status !== 'Cancelled');

            return (
              <div
                key={booking.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 hover:border-teal-600/40 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                <div className="space-y-2.5">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span className="font-mono font-bold text-slate-900 tabular-nums">
                      Ref: {booking.referenceNumber}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span
                      className={`font-semibold ${
                        isCancelled
                          ? 'text-rose-700'
                          : isCompleted
                          ? 'text-slate-600'
                          : 'text-teal-700'
                      }`}
                    >
                      Status: {isCancelled ? 'Cancelled' : isCompleted ? 'Completed' : 'Confirmed'}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">
                      Fee: LKR {booking.servicePriceLKR.toLocaleString()}
                    </span>
                  </div>

                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-display">
                    {booking.petName} ({booking.petType} · {booking.breed}) —{' '}
                    <span className="text-teal-800">{booking.serviceName}</span>
                  </h2>

                  <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs sm:text-sm text-slate-600">
                    <span>
                      Clinician: <strong className="text-slate-800">{booking.vetName}</strong>
                    </span>
                    <span className="flex items-center gap-1.5 tabular-nums">
                      <Calendar className="w-3.5 h-3.5 text-teal-700" />
                      {booking.date}
                    </span>
                    <span className="flex items-center gap-1.5 tabular-nums">
                      <Clock className="w-3.5 h-3.5 text-teal-700" />
                      {booking.timeSlot}
                    </span>
                  </div>
                </div>

                {/* Action Controls */}
                <div className="flex flex-wrap items-center gap-2.5 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                  <button
                    type="button"
                    onClick={() => setSelectedDetailsBooking(booking)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    View Details
                  </button>

                  <button
                    type="button"
                    onClick={() => handleReschedule(booking.id)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Reschedule
                  </button>

                  {!isCancelled && (
                    <button
                      type="button"
                      onClick={() => setBookingToCancel(booking)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal 1: View Booking Details */}
      {selectedDetailsBooking && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-details-title"
          onClick={() => setSelectedDetailsBooking(null)}
        >
          <div
            className="w-full max-w-lg bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-100">
              <div>
                <span className="text-xs text-slate-500 block">
                  Appointment Record
                </span>
                <h3
                  id="booking-details-title"
                  className="text-base font-bold text-slate-900 font-mono tabular-nums"
                >
                  {selectedDetailsBooking.referenceNumber}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedDetailsBooking(null)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-lg"
                aria-label="Close details modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-sm">
              <dl className="grid grid-cols-2 gap-y-3 gap-x-4">
                <div>
                  <dt className="text-xs text-slate-500">Pet Name & Species</dt>
                  <dd className="font-semibold text-slate-900">
                    {selectedDetailsBooking.petName} ({selectedDetailsBooking.petType})
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-500">Breed & Age</dt>
                  <dd className="font-semibold text-slate-900">
                    {selectedDetailsBooking.breed} · {selectedDetailsBooking.petAge}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-500">Service</dt>
                  <dd className="font-semibold text-teal-800">
                    {selectedDetailsBooking.serviceName}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-500">Consultation Fee</dt>
                  <dd className="font-semibold text-slate-900 tabular-nums">
                    LKR {selectedDetailsBooking.servicePriceLKR.toLocaleString()}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-500">Veterinarian</dt>
                  <dd className="font-semibold text-slate-900">
                    {selectedDetailsBooking.vetName}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-500">Date & Time</dt>
                  <dd className="font-semibold text-slate-900 tabular-nums">
                    {selectedDetailsBooking.date} · {selectedDetailsBooking.timeSlot}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-500">Owner Name</dt>
                  <dd className="text-slate-800">{selectedDetailsBooking.ownerName}</dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-500">Owner Contact</dt>
                  <dd className="text-slate-800 tabular-nums">
                    {selectedDetailsBooking.ownerPhone}
                  </dd>
                </div>
              </dl>

              <div className="pt-3 border-t border-slate-100 space-y-1">
                <p className="text-xs text-slate-500">Reason for Visit</p>
                <p className="text-slate-800">{selectedDetailsBooking.reason}</p>
                {selectedDetailsBooking.notes && (
                  <p className="text-xs text-slate-500 pt-1">
                    Notes: {selectedDetailsBooking.notes}
                  </p>
                )}
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <Link
                  to={`/booking-success?bookingId=${selectedDetailsBooking.id}`}
                  className="px-4 py-2 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors"
                >
                  Open Printable Slip
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    const id = selectedDetailsBooking.id;
                    setSelectedDetailsBooking(null);
                    handleReschedule(id);
                  }}
                  className="px-4 py-2 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors cursor-pointer"
                >
                  Reschedule
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: Cancel Confirmation Dialog */}
      {bookingToCancel && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cancel-dialog-title"
          onClick={() => setBookingToCancel(null)}
        >
          <div
            className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-xl p-6 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3
                  id="cancel-dialog-title"
                  className="text-lg font-bold text-slate-900 font-display"
                >
                  Cancel Appointment {bookingToCancel.referenceNumber}?
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Are you sure you want to cancel{' '}
                  <strong>{bookingToCancel.petName}</strong>’s{' '}
                  <strong>{bookingToCancel.serviceName}</strong> with{' '}
                  <strong>{bookingToCancel.vetName}</strong> on{' '}
                  <span className="tabular-nums">
                    {bookingToCancel.date} at {bookingToCancel.timeSlot}
                  </span>
                  ? This frees up the time slot immediately.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setBookingToCancel(null)}
                className="px-4 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                Keep Appointment
              </button>
              <button
                type="button"
                onClick={handleConfirmCancel}
                className="px-4 py-2.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors cursor-pointer"
              >
                Yes, Cancel Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
