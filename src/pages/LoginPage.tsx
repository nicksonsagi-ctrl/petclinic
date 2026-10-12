import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  Info,
  LogOut,
  Calendar,
  ArrowRight,
} from 'lucide-react';
import { useClinic } from '../context/ClinicContext';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const LoginPage: React.FC = () => {
  const { currentUser, loginDemoUser, logoutDemoUser } = useClinic();
  const navigate = useNavigate();

  const [email, setEmail] = useState('demo@pawcareclinic.lk');
  const [password, setPassword] = useState('PawCare2026');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!password || password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    const result = loginDemoUser(email, password);
    if (!result.success) {
      setErrorMessage(result.message);
      return;
    }

    setSuccessMessage(result.message);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs items={[{ label: 'Login (Demo Session)' }]} />

      <div className="max-w-lg mx-auto space-y-6">
        {/* Transparent Demo Authentication Notice */}
        <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-slate-700 leading-relaxed">
          <Info className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-slate-900">
              Frontend Demo Authentication Notice
            </p>
            <p className="mt-0.5">
              This sign-in form uses local browser storage (<code className="font-mono text-teal-900">localStorage</code>) to pre-fill your pet owner profile when booking appointments. No credentials are sent to an external server until a production backend is connected.
            </p>
          </div>
        </div>

        {currentUser ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-lg font-display">
                {currentUser.fullName.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-xs font-semibold text-teal-700">
                  Active Demo Session (localStorage)
                </p>
                <h1 className="text-2xl font-bold text-slate-900 font-display">
                  Welcome, {currentUser.fullName}
                </h1>
              </div>
            </div>

            <dl className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-slate-500">Email:</dt>
                <dd className="font-medium text-slate-900">{currentUser.email}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Phone:</dt>
                <dd className="font-medium text-slate-900 tabular-nums">
                  {currentUser.phone}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Account Mode:</dt>
                <dd className="text-xs font-semibold text-teal-800">
                  Browser Demo Profile
                </dd>
              </div>
            </dl>

            {successMessage && (
              <div className="bg-teal-50 border border-teal-200 text-teal-900 rounded-xl p-3.5 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                to="/book-appointment"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-xl transition-colors"
              >
                <Calendar className="w-4 h-4" />
                Book Appointment
              </Link>
              <Link
                to="/my-bookings"
                className="flex-1 inline-flex items-center justify-center px-5 py-3 text-sm font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                My Bookings
              </Link>
            </div>

            <button
              type="button"
              onClick={() => {
                logoutDemoUser();
                setSuccessMessage(null);
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              Sign Out of Demo Session
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <div className="space-y-1.5">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display tracking-tight">
                Pet Parent Demo Sign In
              </h1>
              <p className="text-sm text-slate-600">
                Sign in with the preset demo credentials below or use any account you registered in this browser.
              </p>
            </div>

            {errorMessage && (
              <div className="bg-rose-50 border border-rose-200 text-rose-800 rounded-xl p-3.5 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div>
                <label
                  htmlFor="login-email"
                  className="block text-xs font-semibold text-slate-700 mb-1.5"
                >
                  Email Address
                </label>
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="demo@pawcareclinic.lk"
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>

              <div>
                <label
                  htmlFor="login-password"
                  className="block text-xs font-semibold text-slate-700 mb-1.5"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full pl-3.5 pr-10 py-2.5 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-teal-600"
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
              </div>

              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 flex items-center justify-between gap-2 text-xs text-slate-600">
                <div>
                  <span className="font-semibold text-slate-800">Preset Demo Login:</span>{' '}
                  demo@pawcareclinic.lk / PawCare2026
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setEmail('demo@pawcareclinic.lk');
                    setPassword('PawCare2026');
                  }}
                  className="text-teal-700 font-semibold hover:underline shrink-0 cursor-pointer"
                >
                  Fill Preset
                </button>
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-xl transition-colors cursor-pointer"
              >
                <span>Sign In (Demo Mode)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
              <span>New to PawCare’s booking portal?</span>
              <Link
                to="/register"
                className="font-semibold text-teal-700 hover:text-teal-800 hover:underline"
              >
                Create a Demo Account →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
