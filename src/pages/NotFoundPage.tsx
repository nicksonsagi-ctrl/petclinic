import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft, Calendar } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Breadcrumbs items={[{ label: '404 Page Not Found' }]} />

      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 text-center space-y-6">
        <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center mx-auto">
          <Compass className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold text-teal-700">Error 404</p>
          <h1 className="text-3xl font-extrabold text-slate-900 font-display tracking-tight">
            We Couldn’t Find That Clinic Page
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto">
            The page or route you requested does not exist. Use the buttons below to return to the PawCare home page or schedule an appointment.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <Link
            to="/book-appointment"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
          >
            <Calendar className="w-4 h-4 text-teal-700" />
            Book Appointment
          </Link>
        </div>
      </div>
    </div>
  );
};
