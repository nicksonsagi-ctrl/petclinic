import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  ShieldCheck,
  HeartHandshake,
  Microscope,
  Award,
  ArrowRight,
} from 'lucide-react';
import { CLINIC_IMAGES, VETERINARIANS_DATA } from '../data/clinicData';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ResilientImage } from '../components/ResilientImage';
import { VetProfileModal } from '../components/VetProfileModal';
import { Veterinarian } from '../types/clinic';

export const AboutPage: React.FC = () => {
  const [selectedVet, setSelectedVet] = useState<Veterinarian | null>(null);

  const coreValues = [
    {
      number: '01',
      title: 'Fear-Free, Low-Stress Handling',
      description:
        'Separate canine and feline waiting zones, pheromone-diffused examination suites, and gentle restraint protocols ensure anxious pets feel safe.',
      icon: HeartHandshake,
    },
    {
      number: '02',
      title: 'Evidence-Based Diagnostics',
      description:
        'Equipped with digital radiography, abdominal ultrasound, and an in-house hematology laboratory for rapid, accurate diagnoses within 45 minutes.',
      icon: Microscope,
    },
    {
      number: '03',
      title: 'Transparent Clinical Guidance',
      description:
        'We walk every pet parent through diagnostic findings, preventive options, and itemized LKR fee estimates before beginning any procedure.',
      icon: ShieldCheck,
    },
    {
      number: '04',
      title: 'Specialist Surgical Standards',
      description:
        'Dedicated sterile operating theater with isoflurane gas anesthesia, continuous ECG/SpO2 monitoring, and dedicated recovery nursing.',
      icon: Award,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-20">
      <div>
        <Breadcrumbs items={[{ label: 'About Us' }]} />

        {/* Hero / Clinic Story Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            <div className="flex items-center gap-2 text-xs font-medium text-teal-700">
              <span>Established 2016 in Colombo 05</span>
              <span aria-hidden="true">·</span>
              <span>Our Clinical Story</span>
            </div>

            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-display tracking-tight leading-tight"
              style={{ textWrap: 'balance' }}
            >
              Setting a Higher Standard for Veterinary Medicine in Sri Lanka
            </h1>

            <p className="text-base text-slate-600 leading-relaxed">
              PawCare – Pet Health & Wellness Center was founded in 2016 by Dr. Ananya Perera and Dr. Rohan Fernando with a clear conviction: companion animals in Sri Lanka deserve the same diagnostic precision, surgical sterility, and compassionate pain management found in leading international veterinary hospitals.
            </p>

            <p className="text-sm text-slate-600 leading-relaxed">
              Starting from a two-room practice in Thimbirigasyaya, we have grown into a full-service veterinary wellness and surgical center featuring species-specific consultation rooms, an in-house PCR & blood biochemistry laboratory, ultrasonic dental suites, and a 24/7 emergency stabilization unit.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to="/book-appointment"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-xl transition-colors whitespace-nowrap shrink-0"
              >
                <Calendar className="w-4 h-4" />
                Book a Visit
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors whitespace-nowrap shrink-0"
              >
                Explore Clinical Services
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 flex">
            <div className="w-full rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
              <ResilientImage
                src={CLINIC_IMAGES.interior}
                alt="Modern PawCare Veterinary Clinic reception and surgical wing in Colombo"
                className="w-full h-full min-h-[320px] lg:h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-teal-950 text-white rounded-2xl p-8 sm:p-10 space-y-4 border border-teal-900">
          <div className="text-xs font-semibold text-teal-300">
            01. Our Clinical Mission
          </div>
          <h2 className="text-2xl font-bold font-display tracking-tight">
            Preventive Wellness & Rapid, Compassionate Healing
          </h2>
          <p className="text-sm sm:text-base text-teal-100/90 leading-relaxed">
            To extend and enrich the lives of companion animals through proactive preventive care, rapid in-house diagnostics, fear-free handling, and clear partnership with pet parents at every stage of their pet’s life.
          </p>
        </div>

        <div className="bg-slate-50 rounded-2xl p-8 sm:p-10 space-y-4 border border-slate-200">
          <div className="text-xs font-semibold text-teal-700">
            02. Our Long-Term Vision
          </div>
          <h2 className="text-2xl font-bold text-slate-900 font-display tracking-tight">
            Sri Lanka’s Most Trusted Pet Healthcare Institution
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            To pioneer modern, accessible veterinary specializations across Sri Lanka—empowering families with digital health records, stress-free clinical environments, and world-class surgical outcomes.
          </p>
        </div>
      </section>

      {/* Core Values & Why Pet Owners Trust PawCare */}
      <section className="space-y-10">
        <div className="max-w-2xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-medium text-teal-700">
            <span>Why Pet Owners Trust PawCare</span>
            <span aria-hidden="true">·</span>
            <span>Clinical Standards</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display tracking-tight">
            Built Around Your Pet’s Comfort and Safety
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Every architectural detail and clinical protocol inside our hospital is engineered to reduce stress and improve medical accuracy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {coreValues.map((val) => {
            const IconComponent = val.icon;
            return (
              <div
                key={val.number}
                className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold text-slate-400 tabular-nums">
                    Principle {val.number}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-display">
                  {val.number}. {val.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {val.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Clinic Facility Gallery & Team Section */}
      <section className="space-y-10 pt-4 border-t border-slate-200/80">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-medium text-teal-700">
              <span>Leadership & Clinical Team</span>
              <span aria-hidden="true">·</span>
              <span>Fictional Sample Clinician Profiles</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display tracking-tight">
              Led by Dedicated Veterinary Specialists
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Meet the clinicians guiding PawCare’s medical, surgical, dental, and nutritional departments.
            </p>
          </div>
          <Link
            to="/veterinarians"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 hover:text-teal-800 whitespace-nowrap"
          >
            View Full Veterinarian Directory
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
                <div className="aspect-square w-full bg-slate-100 overflow-hidden border-b border-slate-100">
                  <ResilientImage
                    src={vet.image}
                    alt={vet.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5 space-y-1.5">
                  <p className="text-xs text-slate-500">
                    {vet.experienceYears} Years Experience · Sample Profile
                  </p>
                  <h3 className="text-base font-bold text-slate-900 font-display">
                    {vet.name}
                  </h3>
                  <p className="text-xs font-medium text-teal-700">
                    {vet.specialization}
                  </p>
                </div>
              </div>
              <div className="p-5 pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedVet(vet)}
                  className="flex-1 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap"
                >
                  Read Bio
                </button>
                <Link
                  to={`/book-appointment?vetId=${vet.id}`}
                  className="flex-1 text-center px-3 py-2 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors whitespace-nowrap"
                >
                  Book a Visit
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="bg-gradient-to-r from-teal-900 to-slate-900 text-white rounded-3xl p-8 sm:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-tight">
            Ready to Schedule Your Pet’s Next Checkup?
          </h2>
          <p className="text-sm text-teal-100/90 leading-relaxed">
            Book your preferred veterinarian and time slot online in under two minutes with instant confirmation.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link
            to="/book-appointment"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-xl transition-colors whitespace-nowrap"
          >
            <Calendar className="w-4 h-4" />
            Book a Visit Now
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-5 py-3.5 text-sm font-semibold text-white bg-white/10 hover:bg-white/20 rounded-xl transition-colors whitespace-nowrap"
          >
            Contact Our Reception
          </Link>
        </div>
      </section>

      <VetProfileModal vet={selectedVet} onClose={() => setSelectedVet(null)} />
    </div>
  );
};
