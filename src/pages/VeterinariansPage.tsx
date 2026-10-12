import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, GraduationCap, CheckCircle2, Info } from 'lucide-react';
import { VETERINARIANS_DATA } from '../data/clinicData';
import { Veterinarian } from '../types/clinic';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ResilientImage } from '../components/ResilientImage';
import { VetProfileModal } from '../components/VetProfileModal';

export const VeterinariansPage: React.FC = () => {
  const [selectedVet, setSelectedVet] = useState<Veterinarian | null>(null);
  const [dayFilter, setDayFilter] = useState<string>('All Days');

  const daysOfWeek = [
    'All Days',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const filteredVets =
    dayFilter === 'All Days'
      ? VETERINARIANS_DATA
      : VETERINARIANS_DATA.filter((v) => v.availabilityDays.includes(dayFilter));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div>
        <Breadcrumbs items={[{ label: 'Our Veterinarians' }]} />

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-medium text-teal-700">
              <span>SLVC Registered Veterinary Surgeons</span>
              <span aria-hidden="true">·</span>
              <span>Fictional Sample Clinician Directory</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight">
              Meet Our Veterinary Specialists
            </h1>
            <p className="text-base text-slate-600 leading-relaxed">
              Our multidisciplinary veterinary team combines international postgraduate credentials with compassionate, low-stress pet care. Select “View Profile” for full qualifications or “Book Appointment” to schedule directly with your preferred clinician.
            </p>
          </div>

          <div className="bg-sky-50 border border-sky-200/80 rounded-xl px-4 py-3 text-xs text-slate-700 flex items-center gap-2.5 shrink-0">
            <Info className="w-4 h-4 text-teal-700 shrink-0" />
            <span>
              All veterinarian profiles below are clearly labelled fictional sample data for demonstration.
            </span>
          </div>
        </div>
      </div>

      {/* Availability Day Filter */}
      <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <span className="text-xs font-semibold text-slate-700 whitespace-nowrap">
          Filter by Consulting Day:
        </span>
        <div
          className="flex flex-wrap items-center gap-1.5"
          role="group"
          aria-label="Filter veterinarians by day of week"
        >
          {daysOfWeek.map((day) => {
            const active = dayFilter === day;
            return (
              <button
                key={day}
                type="button"
                onClick={() => setDayFilter(day)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  active
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      {/* Veterinarian Profiles Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredVets.map((vet) => (
          <div
            key={vet.id}
            className="flex flex-col justify-between bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-teal-600/40 transition-colors"
          >
            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                  <ResilientImage
                    src={vet.image}
                    alt={vet.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span className="tabular-nums font-medium text-slate-700">
                      {vet.experienceYears} Years Experience
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>Fictional Sample Profile</span>
                  </div>

                  <h2 className="text-2xl font-bold text-slate-900 font-display tracking-tight">
                    {vet.name}
                  </h2>

                  <p className="text-sm font-semibold text-teal-700">
                    {vet.specialization}
                  </p>

                  <p className="text-xs text-slate-500 flex items-center gap-1.5 pt-0.5">
                    <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{vet.credentials}</span>
                  </p>

                  <p className="text-xs text-slate-600 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                    <span>{vet.availabilitySummary}</span>
                  </p>
                </div>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">{vet.bio}</p>

              <div className="space-y-2 pt-2 border-t border-slate-100">
                <p className="text-xs font-semibold text-slate-800">
                  Clinical Focus Areas:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {vet.focusAreas.map((area, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-xs text-slate-600"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                      <span>{area}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-6 sm:px-8 py-4 bg-slate-50 border-t border-slate-200/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setSelectedVet(vet)}
                className="flex-1 inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold text-slate-800 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl transition-colors whitespace-nowrap"
              >
                View Profile
              </button>

              <Link
                to={`/book-appointment?vetId=${vet.id}`}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-xl transition-colors whitespace-nowrap"
              >
                <Calendar className="w-4 h-4" />
                Book Appointment
              </Link>
            </div>
          </div>
        ))}
      </div>

      <VetProfileModal vet={selectedVet} onClose={() => setSelectedVet(null)} />
    </div>
  );
};
