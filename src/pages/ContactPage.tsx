import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Edit3,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Send,
  Navigation,
} from 'lucide-react';
import { useClinic } from '../context/ClinicContext';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ClinicContactConfig } from '../types/clinic';

export const ContactPage: React.FC = () => {
  const { contactConfig, updateContactConfig, resetContactConfig } = useClinic();

  // Editable Sample Clinic Contact State
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [draftConfig, setDraftConfig] = useState<ClinicContactConfig>(contactConfig);
  const [addressSavedBanner, setAddressSavedBanner] = useState<string | null>(null);

  // Contact Inquiry Form State
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  const handleSaveAddressConfig = (e: React.FormEvent) => {
    e.preventDefault();
    updateContactConfig(draftConfig);
    setIsEditingAddress(false);
    setAddressSavedBanner(
      'Sample Sri Lanka clinic address and contact details updated in localStorage.'
    );
  };

  const handleResetAddress = () => {
    resetContactConfig();
    setDraftConfig({
      clinicName: 'PawCare – Pet Health & Wellness Center (Sample Clinic Data)',
      addressLine1: 'No. 142, Havelock Road, Thimbirigasyaya',
      addressLine2: 'Colombo 05, Western Province',
      city: 'Colombo',
      country: 'Sri Lanka',
      phonePrimary: '+94 11 258 4920',
      phoneEmergency: '+94 77 890 1122',
      emailGeneral: 'care@pawcareclinic.lk',
      emailAppointments: 'bookings@pawcareclinic.lk',
      openingHoursWeekdays: 'Monday – Friday: 08:30 AM – 07:30 PM',
      openingHoursWeekend: 'Saturday – Sunday: 09:00 AM – 05:30 PM',
      emergencyHours: '24/7 Emergency Triage Unit Open Daily (Including Poya & Public Holidays)',
    });
    setIsEditingAddress(false);
    setAddressSavedBanner('Sample Sri Lanka clinic contact details reset to default.');
  };

  const validateInquiry = (): boolean => {
    const errors: Record<string, string> = {};
    if (!senderName.trim() || senderName.trim().length < 2) {
      errors.senderName = 'Please enter your name.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!senderEmail.trim() || !emailRegex.test(senderEmail.trim())) {
      errors.senderEmail = 'Please enter a valid email address.';
    }
    if (!subject.trim() || subject.trim().length < 3) {
      errors.subject = 'Please enter a subject for your inquiry.';
    }
    if (!message.trim() || message.trim().length < 10) {
      errors.message = 'Please enter a message of at least 10 characters.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateInquiry()) return;

    setInquirySubmitted(true);
    setSenderName('');
    setSenderEmail('');
    setSubject('');
    setMessage('');
    setFormErrors({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div>
        <Breadcrumbs items={[{ label: 'Contact Us' }]} />

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-medium text-teal-700">
              <span>Colombo 05 Veterinary Hospital</span>
              <span aria-hidden="true">·</span>
              <span>Editable Sample Contact Data</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight">
              Get in Touch with PawCare
            </h1>
            <p className="text-base text-slate-600 leading-relaxed">
              Reach out to our reception desk for general questions, prescription refills, or surgical inquiries. You can also customize the sample Sri Lanka clinic address below.
            </p>
          </div>

          <div className="flex items-center gap-2.5 self-start lg:self-auto">
            <button
              type="button"
              onClick={() => {
                setDraftConfig(contactConfig);
                setIsEditingAddress((prev) => !prev);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-xl transition-colors cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              {isEditingAddress ? 'Close Sample Data Editor' : 'Edit Sample Clinic Data'}
            </button>
            <button
              type="button"
              onClick={handleResetAddress}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
              title="Reset sample address to default"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Default
            </button>
          </div>
        </div>
      </div>

      {addressSavedBanner && (
        <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 flex items-center justify-between gap-4 text-xs sm:text-sm text-teal-950">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0" />
            <span>{addressSavedBanner}</span>
          </div>
          <button
            type="button"
            onClick={() => setAddressSavedBanner(null)}
            className="text-xs font-semibold text-teal-800 hover:underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Editable Sample Clinic Data Panel */}
      {isEditingAddress && (
        <form
          onSubmit={handleSaveAddressConfig}
          className="bg-slate-50 rounded-2xl border border-teal-300 p-6 sm:p-8 space-y-5"
        >
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h2 className="text-base font-bold text-slate-900 font-display">
                Customize Sample Sri Lanka Clinic Details
              </h2>
              <p className="text-xs text-slate-500">
                Changes are saved in your browser’s localStorage and reflected across the website header, footer, and confirmation slips.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Address Line 1
              </label>
              <input
                type="text"
                value={draftConfig.addressLine1}
                onChange={(e) =>
                  setDraftConfig({ ...draftConfig, addressLine1: e.target.value })
                }
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Address Line 2 (City / Province)
              </label>
              <input
                type="text"
                value={draftConfig.addressLine2}
                onChange={(e) =>
                  setDraftConfig({ ...draftConfig, addressLine2: e.target.value })
                }
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Primary Reception Phone
              </label>
              <input
                type="text"
                value={draftConfig.phonePrimary}
                onChange={(e) =>
                  setDraftConfig({ ...draftConfig, phonePrimary: e.target.value })
                }
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg tabular-nums"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                24/7 Emergency Phone
              </label>
              <input
                type="text"
                value={draftConfig.phoneEmergency}
                onChange={(e) =>
                  setDraftConfig({ ...draftConfig, phoneEmergency: e.target.value })
                }
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg tabular-nums"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Clinic Email Address
              </label>
              <input
                type="email"
                value={draftConfig.emailGeneral}
                onChange={(e) =>
                  setDraftConfig({ ...draftConfig, emailGeneral: e.target.value })
                }
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Weekday Opening Hours
              </label>
              <input
                type="text"
                value={draftConfig.openingHoursWeekdays}
                onChange={(e) =>
                  setDraftConfig({
                    ...draftConfig,
                    openingHoursWeekdays: e.target.value,
                  })
                }
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsEditingAddress(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg cursor-pointer"
            >
              Save Sample Clinic Data
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 5 Columns: Clinic Contact Info & Map Placeholder */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <h2 className="text-xl font-bold text-slate-900 font-display">
              Clinic Contact Details (Sample Data)
            </h2>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500">
                    Colombo Hospital Address
                  </p>
                  <p className="font-semibold text-slate-900 mt-0.5">
                    {contactConfig.addressLine1}
                  </p>
                  <p className="text-slate-600">
                    {contactConfig.addressLine2}, {contactConfig.country}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500">
                    Clickable Phone Numbers
                  </p>
                  <p className="mt-0.5">
                    <span className="text-xs text-slate-500 mr-1.5">Reception:</span>
                    <a
                      href={`tel:${contactConfig.phonePrimary.replace(/\s+/g, '')}`}
                      className="font-bold text-teal-800 hover:underline tabular-nums"
                    >
                      {contactConfig.phonePrimary}
                    </a>
                  </p>
                  <p className="mt-0.5">
                    <span className="text-xs text-slate-500 mr-1.5">24/7 Emergency:</span>
                    <a
                      href={`tel:${contactConfig.phoneEmergency.replace(/\s+/g, '')}`}
                      className="font-bold text-rose-700 hover:underline tabular-nums"
                    >
                      {contactConfig.phoneEmergency}
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500">
                    Clickable Email Links
                  </p>
                  <p className="mt-0.5">
                    <a
                      href={`mailto:${contactConfig.emailGeneral}`}
                      className="font-semibold text-teal-800 hover:underline"
                    >
                      {contactConfig.emailGeneral}
                    </a>
                  </p>
                  <p className="mt-0.5">
                    <a
                      href={`mailto:${contactConfig.emailAppointments}`}
                      className="text-xs text-slate-600 hover:text-teal-800 hover:underline"
                    >
                      {contactConfig.emailAppointments}
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-2 border-t border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-slate-500">
                    Opening Hours
                  </p>
                  <p className="text-slate-800 font-medium">
                    {contactConfig.openingHoursWeekdays}
                  </p>
                  <p className="text-slate-600 text-xs">
                    {contactConfig.openingHoursWeekend}
                  </p>
                  <p className="text-xs font-semibold text-teal-800 pt-1">
                    {contactConfig.emergencyHours}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Map Placeholder for Colombo 05 */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-teal-400">
                <Navigation className="w-4 h-4" />
                <span>Colombo 05 Location Map Preview</span>
              </div>
              <span className="text-[11px] text-slate-400 tabular-nums">
                6.8865° N, 79.8650° E
              </span>
            </div>

            <div className="relative h-52 rounded-xl bg-gradient-to-br from-slate-800 via-teal-950 to-slate-900 border border-slate-700 p-5 flex flex-col justify-between overflow-hidden">
              {/* Stylized Road Grid SVG */}
              <svg
                className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
                viewBox="0 0 400 200"
                fill="none"
              >
                <path d="M0 40 H400 M0 100 H400 M0 160 H400" stroke="#2dd4bf" strokeWidth="1.5" />
                <path d="M80 0 V200 M190 0 V200 M310 0 V200" stroke="#38bdf8" strokeWidth="1.5" />
                <path d="M20 180 L360 20" stroke="#ffffff" strokeWidth="3" />
              </svg>

              <div className="relative z-10 flex items-center gap-2 text-xs text-teal-200">
                <span>Havelock Road · Thimbirigasyaya Junction</span>
              </div>

              <div className="relative z-10 bg-slate-950/90 border border-teal-500/40 rounded-xl p-3.5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-teal-500 text-slate-950 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">
                      PawCare Veterinary Hospital
                    </p>
                    <p className="text-[11px] text-slate-300">
                      {contactConfig.addressLine1} · Dedicated Pet Parking On-Site
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right 7 Columns: Working Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 space-y-6">
          <div className="space-y-1.5 border-b border-slate-100 pb-4">
            <h2 className="text-2xl font-bold text-slate-900 font-display">
              Send Us a Message
            </h2>
            <p className="text-sm text-slate-600">
              Have a question about vaccination schedules, surgery preparation, or nutrition plans? Fill out the form below and our client care team will respond promptly.
            </p>
          </div>

          {inquirySubmitted && (
            <div className="bg-teal-50 border border-teal-200 rounded-2xl p-5 flex items-start gap-3 text-sm text-teal-950">
              <CheckCircle2 className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold">Thank you! Your inquiry has been received.</p>
                <p className="text-xs text-teal-900 leading-relaxed">
                  Our Colombo reception desk has logged your message. For urgent medical questions, please call our direct line at{' '}
                  <a
                    href={`tel:${contactConfig.phonePrimary.replace(/\s+/g, '')}`}
                    className="font-bold underline"
                  >
                    {contactConfig.phonePrimary}
                  </a>
                  .
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleInquirySubmit} noValidate className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-semibold text-slate-700 mb-1.5"
                >
                  Your Name <span className="text-rose-600">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={senderName}
                  onChange={(e) => {
                    setSenderName(e.target.value);
                    setInquirySubmitted(false);
                  }}
                  placeholder="e.g., Chathura De Silva"
                  className={`w-full px-3.5 py-2.5 text-sm rounded-lg border ${
                    formErrors.senderName
                      ? 'border-rose-500 bg-rose-50/30'
                      : 'border-slate-300'
                  } focus:outline-none focus:ring-2 focus:ring-teal-600`}
                />
                {formErrors.senderName && (
                  <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {formErrors.senderName}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-semibold text-slate-700 mb-1.5"
                >
                  Email Address <span className="text-rose-600">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={senderEmail}
                  onChange={(e) => {
                    setSenderEmail(e.target.value);
                    setInquirySubmitted(false);
                  }}
                  placeholder="chathura@example.lk"
                  className={`w-full px-3.5 py-2.5 text-sm rounded-lg border ${
                    formErrors.senderEmail
                      ? 'border-rose-500 bg-rose-50/30'
                      : 'border-slate-300'
                  } focus:outline-none focus:ring-2 focus:ring-teal-600`}
                />
                {formErrors.senderEmail && (
                  <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {formErrors.senderEmail}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-subject"
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                Subject <span className="text-rose-600">*</span>
              </label>
              <input
                id="contact-subject"
                type="text"
                value={subject}
                onChange={(e) => {
                  setSubject(e.target.value);
                  setInquirySubmitted(false);
                }}
                placeholder="e.g., Puppy vaccination schedule inquiry"
                className={`w-full px-3.5 py-2.5 text-sm rounded-lg border ${
                  formErrors.subject
                    ? 'border-rose-500 bg-rose-50/30'
                    : 'border-slate-300'
                } focus:outline-none focus:ring-2 focus:ring-teal-600`}
              />
              {formErrors.subject && (
                <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {formErrors.subject}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                Message <span className="text-rose-600">*</span>
              </label>
              <textarea
                id="contact-message"
                rows={4}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  setInquirySubmitted(false);
                }}
                placeholder="How can our veterinary team help you and your pet?"
                className={`w-full px-3.5 py-2.5 text-sm rounded-lg border ${
                  formErrors.message
                    ? 'border-rose-500 bg-rose-50/30'
                    : 'border-slate-300'
                } focus:outline-none focus:ring-2 focus:ring-teal-600`}
              />
              {formErrors.message && (
                <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {formErrors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-xl transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
