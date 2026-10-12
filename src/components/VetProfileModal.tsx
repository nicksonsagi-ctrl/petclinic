import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Calendar, GraduationCap, Globe, CheckCircle2 } from 'lucide-react';
import { Veterinarian } from '../types/clinic';
import { ResilientImage } from './ResilientImage';

interface VetProfileModalProps {
  vet: Veterinarian | null;
  onClose: () => void;
}

export const VetProfileModal: React.FC<VetProfileModalProps> = ({ vet, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (vet) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [vet, onClose]);

  if (!vet) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="vet-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>Veterinarian Profile</span>
            <span aria-hidden="true">·</span>
            <span>Fictional Sample Clinician</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
            aria-label="Close profile dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden border border-slate-200 shrink-0">
              <ResilientImage
                src={vet.image}
                alt={vet.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-2">
              <h2
                id="vet-modal-title"
                className="text-2xl font-bold text-slate-900 font-display tracking-tight"
              >
                {vet.name}
              </h2>
              <p className="text-sm font-medium text-teal-700">{vet.specialization}</p>
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span>{vet.credentials}</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{vet.experienceYears} Years Clinical Experience</span>
              </div>
              <p className="text-xs text-slate-500 pt-1">
                Schedule: <span className="text-slate-800 font-medium">{vet.availabilitySummary}</span>
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-slate-900">Clinical Biography</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{vet.bio}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-slate-100">
            <div className="space-y-2.5">
              <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-teal-700" />
                Qualifications & Credentials
              </h3>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {vet.education.map((edu, index) => (
                  <li key={index} className="leading-relaxed">
                    • {edu}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2.5">
              <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-700" />
                Special Focus Areas
              </h3>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {vet.focusAreas.map((area, index) => (
                  <li key={index} className="leading-relaxed">
                    • {area}
                  </li>
                ))}
              </ul>
              <div className="pt-2 flex items-center gap-2 text-xs text-slate-500">
                <Globe className="w-3.5 h-3.5 text-teal-700" />
                <span>Languages Spoken: {vet.languages.join(', ')}</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              Available Days: <span className="text-slate-700 font-medium">{vet.availabilityDays.join(', ')}</span>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 sm:flex-initial px-4 py-2.5 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap"
              >
                Close
              </button>
              <Link
                to={`/book-appointment?vetId=${vet.id}`}
                onClick={onClose}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors whitespace-nowrap"
              >
                <Calendar className="w-4 h-4" />
                Book with {vet.name.split(' ')[1] ? `Dr. ${vet.name.split(' ')[1]}` : vet.name}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
