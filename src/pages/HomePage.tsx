import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  ArrowRight,
  PhoneCall,
  Clock,
  ShieldCheck,
  MapPin,
  Users,
} from 'lucide-react';
import {
  CLINIC_IMAGES,
  SERVICES_DATA,
  VETERINARIANS_DATA,
  TESTIMONIALS_DATA,
} from '../data/clinicData';
import { useClinic } from '../context/ClinicContext';
import { ResilientImage } from '../components/ResilientImage';
import { ServiceIcon } from '../components/ServiceIcon';
import { VetProfileModal } from '../components/VetProfileModal';
import { Veterinarian } from '../types/clinic';

export const HomePage: React.FC = () => {
  const { contactConfig } = useClinic();
  const [selectedVet, setSelectedVet] = useState<Veterinarian | null>(null);

  const featuredServices = SERVICES_DATA.slice(0, 6);

  return (
    <div className="space-y-20 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-b from-sky-50/70 via-teal-50/30 to-white pt-10 pb-14 lg:py-16 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            {/* Left Column: Proposition & Functional CTAs */}
            <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
              <div className="flex items-center gap-2 text-xs font-medium text-teal-800">
                <span>Colombo Veterinary Hospital & Wellness Center</span>
                <span aria-hidden="true">·</span>
                <span>SLVC Accredited Practice</span>
              </div>

              <h1
                className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-slate-900 tracking-tight leading-[1.12] font-display"
                style={{ textWrap: 'balance' }}
              >
                Your Pet Deserves the Best Care
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                Trusted, fear-free veterinary medicine for dogs, cats, and companion birds in Sri Lanka. From preventive vaccinations and ultrasonic dental care to rapid in-house diagnostics and surgery, our experienced clinicians treat every pet like family.
              </p>

              {/* 3 Required Functional Hero Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Link
                  to="/book-appointment"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-xl shadow-xs transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
                >
                  <Calendar className="w-4 h-4" />
                  Book an Appointment
                </Link>

                <Link
                  to="/services"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
                >
                  Explore Services
                  <ArrowRight className="w-4 h-4 text-teal-700" />
                </Link>

                <Link
                  to="/veterinarians"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-teal-800 bg-teal-50/80 hover:bg-teal-100/80 rounded-xl transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
                >
                  <Users className="w-4 h-4 text-teal-700" />
                  Meet Our Vets
                </Link>
              </div>

              <div className="pt-4 border-t border-slate-200/80 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-600">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-teal-700" />
                  Fear-Free Certified Handling
                </span>
                <span aria-hidden="true" className="hidden sm:inline text-slate-300">
                  ·
                </span>
                <span>Same-Day Blood & Ultrasound Lab</span>
                <span aria-hidden="true" className="hidden sm:inline text-slate-300">
                  ·
                </span>
                <span className="tabular-nums">24/7 Emergency Triage: {contactConfig.phoneEmergency}</span>
              </div>
            </div>

            {/* Right Column: High-Quality Dog & Cat Clinical Image */}
            <div className="lg:col-span-6 flex">
              <div className="relative w-full rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-100">
                <ResilientImage
                  src={CLINIC_IMAGES.hero}
                  alt="Golden retriever dog and ginger cat sitting calmly on an examination table at PawCare Veterinary Clinic"
                  className="w-full h-full min-h-[320px] lg:h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/85 via-slate-900/45 to-transparent p-6 text-white">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-medium text-teal-300">
                        Separate Canine & Feline Examination Suites
                      </p>
                      <p className="text-sm font-semibold text-white">
                        Designed for calm, low-stress clinical visits in Colombo 05
                      </p>
                    </div>
                    <Link
                      to="/book-appointment"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-teal-600/90 hover:bg-teal-600 px-3.5 py-2 rounded-lg transition-colors whitespace-nowrap shrink-0 self-start sm:self-auto"
                    >
                      Check Available Slots
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. CLINIC STATISTICS STRIP (Full-width 4-column row below hero split) */}
          <div className="mt-12 pt-10 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-5 rounded-xl border border-slate-200/90">
              <p className="text-3xl font-bold text-slate-900 font-display tabular-nums">
                14,800+
              </p>
              <p className="text-sm font-semibold text-slate-800 mt-1">
                Pets Treated Since 2016
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Dogs, cats, and companion birds across Western Province
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200/90">
              <p className="text-3xl font-bold text-teal-700 font-display tabular-nums">
                45 Min
              </p>
              <p className="text-sm font-semibold text-slate-800 mt-1">
                In-House Diagnostic Turnaround
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Rapid hematology, tick-fever PCR, and digital radiography
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200/90">
              <p className="text-3xl font-bold text-slate-900 font-display tabular-nums">
                99.2%
              </p>
              <p className="text-sm font-semibold text-slate-800 mt-1">
                Surgical Recovery Success Rate
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Over 3,200 orthopedic and soft-tissue procedures completed
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200/90">
              <p className="text-3xl font-bold text-teal-700 font-display tabular-nums">
                4.9 / 5.0
              </p>
              <p className="text-sm font-semibold text-slate-800 mt-1">
                Verified Pet Owner Satisfaction
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Based on 1,950+ post-visit clinical care reviews
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SERVICE HIGHLIGHTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-medium text-teal-700">
              <span>01. Clinical Capabilities</span>
              <span aria-hidden="true">·</span>
              <span>Transparent LKR Pricing</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display tracking-tight">
              Comprehensive Veterinary Care Under One Roof
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Every consultation includes a thorough physical assessment and clear treatment breakdown. Select any service below to pre-fill your appointment booking.
            </p>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 hover:text-teal-800 whitespace-nowrap shrink-0"
          >
            View All {SERVICES_DATA.length} Services
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredServices.map((service, index) => (
            <div
              key={service.id}
              className="flex flex-col justify-between bg-white rounded-2xl border border-slate-200/90 p-6 hover:border-teal-600/40 transition-colors"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="w-11 h-11 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                    <ServiceIcon name={service.iconName} className="w-5 h-5" />
                  </div>
                  <div className="text-right text-xs text-slate-500">
                    <span>{service.category}</span>
                    <span aria-hidden="true"> · </span>
                    <span className="tabular-nums">{service.durationMinutes} mins</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 font-display">
                    0{index + 1}. {service.name}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {service.shortDescription}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-slate-500 block">Standard Fee</span>
                  <span className="text-base font-bold text-slate-900 tabular-nums">
                    LKR {service.priceLKR.toLocaleString()}
                  </span>
                </div>

                <Link
                  to={`/book-appointment?serviceId=${service.id}`}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  Book This Service
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FEATURED VETERINARIANS */}
      <section className="bg-slate-50/80 py-16 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-medium text-teal-700">
                <span>02. Veterinary Specialists</span>
                <span aria-hidden="true">·</span>
                <span>Fictional Sample Clinician Profiles</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display tracking-tight">
                Meet Our Experienced Veterinary Surgeons
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                Our clinicians combine postgraduate specialist training with compassionate handling. Click any veterinarian to view their full credentials or schedule directly.
              </p>
            </div>
            <Link
              to="/veterinarians"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 hover:text-teal-800 whitespace-nowrap shrink-0"
            >
              Explore Full Clinical Team
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VETERINARIANS_DATA.map((vet) => (
              <div
                key={vet.id}
                className="flex flex-col justify-between bg-white rounded-2xl border border-slate-200 overflow-hidden"
              >
                <div>
                  <div className="aspect-square w-full overflow-hidden bg-slate-100 border-b border-slate-100">
                    <ResilientImage
                      src={vet.image}
                      alt={vet.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <span className="tabular-nums">{vet.experienceYears} Yrs Exp</span>
                      <span aria-hidden="true">·</span>
                      <span>Sample Profile</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 font-display">
                      {vet.name}
                    </h3>
                    <p className="text-xs font-medium text-teal-700">
                      {vet.specialization}
                    </p>
                    <p className="text-xs text-slate-500 pt-1">
                      {vet.availabilitySummary}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedVet(vet)}
                    className="flex-1 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap"
                  >
                    View Profile
                  </button>
                  <Link
                    to={`/book-appointment?vetId=${vet.id}`}
                    className="flex-1 text-center px-3 py-2 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors whitespace-nowrap"
                  >
                    Book Visit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CUSTOMER TESTIMONIALS (Adjacent Proof Section) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-2 max-w-2xl mb-10">
          <div className="flex items-center gap-2 text-xs font-medium text-teal-700">
            <span>03. Client Outcomes & Proof</span>
            <span aria-hidden="true">·</span>
            <span>Colombo Pet Parents</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display tracking-tight">
            Trusted by Pet Families Across Sri Lanka
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Real-world recovery stories demonstrating rapid diagnostics, gentle handling, and transparent veterinary care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS_DATA.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between bg-white rounded-2xl border border-slate-200 p-6 space-y-5"
            >
              <div className="space-y-3">
                <div className="text-xs font-semibold text-teal-800">
                  Outcome: {item.outcomeMetric}
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  “{item.quote}”
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100">
                <p className="text-sm font-bold text-slate-900">{item.ownerName}</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {item.role} · {item.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. OPENING HOURS & EMERGENCY CONTACT SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-slate-900 text-white rounded-3xl p-8 sm:p-10 lg:p-12 border border-slate-800">
          {/* Opening Hours */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-medium text-teal-400">
              <Clock className="w-4 h-4" />
              <span>Clinic Opening Hours & Location (Sample Sri Lanka Data)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-tight">
              Open 7 Days a Week for Scheduled Consultations & Walk-Ins
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
              Reserve your preferred time slot online to skip the waiting room, or contact our 24/7 emergency triage desk immediately if your pet requires urgent medical stabilization.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-4 space-y-1">
                <span className="text-xs text-slate-400">Outpatient Consultations</span>
                <p className="text-sm font-semibold text-white">
                  {contactConfig.openingHoursWeekdays}
                </p>
                <p className="text-xs text-slate-300">
                  {contactConfig.openingHoursWeekend}
                </p>
              </div>

              <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-4 space-y-1">
                <span className="text-xs text-slate-400">Clinic Location</span>
                <p className="text-sm font-semibold text-white flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-teal-400 shrink-0" />
                  {contactConfig.addressLine1}
                </p>
                <p className="text-xs text-slate-300">{contactConfig.addressLine2}</p>
              </div>
            </div>
          </div>

          {/* 24/7 Emergency Triage Callout */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-teal-950/80 border border-teal-800/70 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-teal-300">
                <PhoneCall className="w-4 h-4" />
                <span>24/7 Emergency Veterinary Triage</span>
              </div>
              <h3 className="text-xl font-bold text-white font-display">
                Urgent Pet Medical Emergency?
              </h3>
              <p className="text-xs sm:text-sm text-teal-100/90 leading-relaxed">
                {contactConfig.emergencyHours}. Call our emergency hotline before arrival so our surgical and oxygen triage team can prepare for your pet immediately.
              </p>
            </div>

            <div className="space-y-3">
              <a
                href={`tel:${contactConfig.phoneEmergency.replace(/\s+/g, '')}`}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-xl transition-colors tabular-nums"
              >
                <PhoneCall className="w-4 h-4" />
                Call Emergency: {contactConfig.phoneEmergency}
              </a>

              <div className="flex items-center gap-3">
                <Link
                  to="/book-appointment?serviceId=srv-emergency"
                  className="flex-1 text-center px-4 py-2.5 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  Book Emergency Slot
                </Link>
                <Link
                  to="/contact"
                  className="flex-1 text-center px-4 py-2.5 text-xs font-semibold text-teal-200 hover:text-white bg-teal-900/60 hover:bg-teal-900 rounded-lg transition-colors"
                >
                  Directions & Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vet Profile Modal */}
      <VetProfileModal vet={selectedVet} onClose={() => setSelectedVet(null)} />
    </div>
  );
};
