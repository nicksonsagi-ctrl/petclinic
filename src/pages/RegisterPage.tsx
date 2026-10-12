import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  Info,
  ArrowRight,
} from 'lucide-react';
import { useClinic } from '../context/ClinicContext';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const RegisterPage: React.FC = () => {
  const { registerDemoUser } = useClinic();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [registeredSuccess, setRegisteredSuccess] = useState(false);

  const validate = (): boolean => {
    const nextErrors: Record<string, string> = {};

    if (!fullName.trim() || fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter your full name (at least 2 characters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }

    const cleanPhone = phone.replace(/[\s()-]/g, '');
    if (!cleanPhone || !/^\+?[0-9]{9,15}$/.test(cleanPhone)) {
      nextErrors.phone = 'Please enter a valid phone number (e.g., +94 77 123 4567).';
    }

    if (!password || password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters long.';
    }

    if (confirmPassword !== password) {
      nextErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!validate()) return;

    const result = registerDemoUser(fullName, email, phone, password);
    if (!result.success) {
      setFormError(result.message);
      return;
    }

    setRegisteredSuccess(true);
    setTimeout(() => {
      navigate('/book-appointment');
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs
        items={[
          { label: 'Login', to: '/login' },
          { label: 'Register (Demo Account)' },
        ]}
      />

      <div className="max-w-lg mx-auto space-y-6">
        {/* Transparent Demo Registration Notice */}
        <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-slate-700 leading-relaxed">
          <Info className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-slate-900">
              Demo-Only Registration Notice
            </p>
            <p className="mt-0.5">
              Account registration in this preview is demo-only and stored locally in your browser (<code className="font-mono text-teal-900">localStorage</code>) until a production backend database is connected.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
          <div className="space-y-1.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display tracking-tight">
              Create a Pet Parent Demo Profile
            </h1>
            <p className="text-sm text-slate-600">
              Save your contact details locally to speed up future veterinary appointment bookings.
            </p>
          </div>

          {formError && (
            <div className="bg-rose-50 border border-rose-200 text-rose-800 rounded-xl p-3.5 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          {registeredSuccess && (
            <div className="bg-teal-50 border border-teal-200 text-teal-900 rounded-xl p-4 text-xs flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-teal-700 shrink-0" />
              <div>
                <p className="font-bold">Demo profile created in localStorage!</p>
                <p>Redirecting you to the appointment booking page...</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <label
                htmlFor="reg-fullname"
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                Full Name <span className="text-rose-600">*</span>
              </label>
              <input
                id="reg-fullname"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g., Nuwanthi Perera"
                className={`w-full px-3.5 py-2.5 text-sm rounded-lg border ${
                  errors.fullName ? 'border-rose-500 bg-rose-50/30' : 'border-slate-300'
                } focus:outline-none focus:ring-2 focus:ring-teal-600`}
              />
              {errors.fullName && (
                <p className="mt-1 text-xs text-rose-600">{errors.fullName}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="reg-email"
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                Email Address <span className="text-rose-600">*</span>
              </label>
              <input
                id="reg-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nuwanthi@example.lk"
                className={`w-full px-3.5 py-2.5 text-sm rounded-lg border ${
                  errors.email ? 'border-rose-500 bg-rose-50/30' : 'border-slate-300'
                } focus:outline-none focus:ring-2 focus:ring-teal-600`}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-rose-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="reg-phone"
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                Phone Number <span className="text-rose-600">*</span>
              </label>
              <input
                id="reg-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+94 77 123 4567"
                className={`w-full px-3.5 py-2.5 text-sm rounded-lg border tabular-nums ${
                  errors.phone ? 'border-rose-500 bg-rose-50/30' : 'border-slate-300'
                } focus:outline-none focus:ring-2 focus:ring-teal-600`}
              />
              {errors.phone && (
                <p className="mt-1 text-xs text-rose-600">{errors.phone}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="reg-password"
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                Password <span className="text-rose-600">*</span>
              </label>
              <div className="relative">
                <input
                  id="reg-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  className={`w-full pl-3.5 pr-10 py-2.5 text-sm rounded-lg border ${
                    errors.password ? 'border-rose-500 bg-rose-50/30' : 'border-slate-300'
                  } focus:outline-none focus:ring-2 focus:ring-teal-600`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 text-slate-500 hover:text-slate-800 rounded"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-rose-600">{errors.password}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="reg-confirm-password"
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                Confirm Password <span className="text-rose-600">*</span>
              </label>
              <input
                id="reg-confirm-password"
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your password"
                className={`w-full px-3.5 py-2.5 text-sm rounded-lg border ${
                  errors.confirmPassword
                    ? 'border-rose-500 bg-rose-50/30'
                    : 'border-slate-300'
                } focus:outline-none focus:ring-2 focus:ring-teal-600`}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-rose-600">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-xl transition-colors cursor-pointer mt-2"
            >
              <span>Create Demo Profile</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <span>Already have a demo profile?</span>
            <Link
              to="/login"
              className="font-semibold text-teal-700 hover:text-teal-800 hover:underline"
            >
              Back to Login →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
