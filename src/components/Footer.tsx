import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, ArrowUpRight } from 'lucide-react';
import { useClinic } from '../context/ClinicContext';

export const Footer: React.FC = () => {
  const { contactConfig } = useClinic();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Brand & Mission */}
          <div className="space-y-4">
            <Link
              to="/"
              className="text-xl font-bold tracking-tight text-white font-display inline-block"
            >
              PawCare – Pet Health & Wellness Center
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Compassionate, evidence-based veterinary medicine, preventive wellness, surgical care, and diagnostic imaging for dogs, cats, and companion birds in Colombo, Sri Lanka.
            </p>
            <p className="text-xs text-slate-400 pt-1">
              Registered Sri Lankan Veterinary Practice · Sample Demo Environment
            </p>
          </div>

          {/* Column 2: Quick Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-tight mb-4">
              Clinic Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-teal-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-teal-400 transition-colors">
                  About Us & Story
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-teal-400 transition-colors">
                  Our Veterinary Services
                </Link>
              </li>
              <li>
                <Link to="/veterinarians" className="hover:text-teal-400 transition-colors">
                  Our Veterinarians
                </Link>
              </li>
              <li>
                <Link to="/book-appointment" className="hover:text-teal-400 transition-colors">
                  Book Appointment
                </Link>
              </li>
              <li>
                <Link to="/my-bookings" className="hover:text-teal-400 transition-colors">
                  My Bookings
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-teal-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-teal-400 transition-colors">
                  Login / Register (Demo)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services Direct Prefill Links */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-tight mb-4">
              Book by Department
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  to="/book-appointment?serviceId=srv-checkup"
                  className="hover:text-teal-400 transition-colors inline-flex items-center gap-1"
                >
                  General Health Checkups
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
                </Link>
              </li>
              <li>
                <Link
                  to="/book-appointment?serviceId=srv-vaccination"
                  className="hover:text-teal-400 transition-colors inline-flex items-center gap-1"
                >
                  Core & Booster Vaccinations
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
                </Link>
              </li>
              <li>
                <Link
                  to="/book-appointment?serviceId=srv-dental"
                  className="hover:text-teal-400 transition-colors inline-flex items-center gap-1"
                >
                  Ultrasonic Dental Scaling
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
                </Link>
              </li>
              <li>
                <Link
                  to="/book-appointment?serviceId=srv-surgery"
                  className="hover:text-teal-400 transition-colors inline-flex items-center gap-1"
                >
                  Surgical Consultations
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
                </Link>
              </li>
              <li>
                <Link
                  to="/book-appointment?serviceId=srv-diagnostics"
                  className="hover:text-teal-400 transition-colors inline-flex items-center gap-1"
                >
                  In-House Lab & Ultrasound
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
                </Link>
              </li>
              <li>
                <Link
                  to="/book-appointment?serviceId=srv-emergency"
                  className="hover:text-teal-400 transition-colors inline-flex items-center gap-1"
                >
                  Emergency Triage Care
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Sample Sri Lanka Contact Info */}
          <div className="space-y-3 text-sm">
            <h3 className="text-sm font-semibold text-white tracking-tight mb-4">
              Colombo Clinic Contact (Sample Data)
            </h3>
            <div className="flex items-start gap-2.5 text-slate-300">
              <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-1" />
              <div>
                <p>{contactConfig.addressLine1}</p>
                <p>{contactConfig.addressLine2}</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-teal-400 shrink-0" />
              <a
                href={`tel:${contactConfig.phonePrimary.replace(/\s+/g, '')}`}
                className="hover:text-teal-400 transition-colors tabular-nums"
              >
                {contactConfig.phonePrimary}
              </a>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-teal-400 shrink-0" />
              <a
                href={`mailto:${contactConfig.emailGeneral}`}
                className="hover:text-teal-400 transition-colors"
              >
                {contactConfig.emailGeneral}
              </a>
            </div>
            <div className="flex items-start gap-2.5 pt-1 text-xs text-slate-400">
              <Clock className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p>{contactConfig.openingHoursWeekdays}</p>
                <p>{contactConfig.openingHoursWeekend}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} PawCare – Pet Health & Wellness Center. All rights reserved.
          </p>
          <p>
            Frontend Demo Note: Appointments, contact edits, and demo accounts are stored locally in your browser’s localStorage.
          </p>
        </div>
      </div>
    </footer>
  );
};
