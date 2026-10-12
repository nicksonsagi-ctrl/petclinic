import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useClinic } from '../context/ClinicContext';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { currentUser, bookings } = useClinic();

  const confirmedCount = bookings.filter((b) => b.status === 'Confirmed').length;

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname, location.search]);

  const navItems = [
    { label: 'Home', to: '/', end: true },
    { label: 'About Us', to: '/about' },
    { label: 'Our Services', to: '/services' },
    { label: 'Our Veterinarians', to: '/veterinarians' },
    {
      label: confirmedCount > 0 ? `My Bookings (${confirmedCount})` : 'My Bookings',
      to: '/my-bookings',
    },
    { label: 'Contact Us', to: '/contact' },
    {
      label: currentUser ? `Account (${currentUser.fullName.split(' ')[0]})` : 'Login / Register',
      to: '/login',
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 no-print">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 lg:px-8 h-16">
        {/* Zone 1: Single text element wordmark */}
        <Link
          to="/"
          className="text-xl font-bold tracking-tight text-slate-900 font-display whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 rounded"
        >
          PawCare
        </Link>

        {/* Zone 2: Desktop Single-line Navigation Links */}
        <nav
          aria-label="Main Navigation"
          className="hidden xl:flex items-center gap-6 text-sm font-medium text-slate-600"
        >
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 rounded-xs ${
                  isActive
                    ? 'border-teal-700 text-teal-800 font-semibold'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Zone 3: 1 Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/book-appointment"
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-teal-700 rounded-lg hover:bg-teal-800 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
          >
            Book Appointment
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="xl:hidden inline-flex items-center justify-center p-2.5 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Responsive Mobile & Tablet Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 shadow-lg">
          <nav aria-label="Mobile Navigation" className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-teal-50 text-teal-800 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <div className="pt-3 mt-2 border-t border-slate-100">
              <Link
                to="/book-appointment"
                className="w-full inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold text-white bg-teal-700 rounded-lg hover:bg-teal-800 transition-colors"
              >
                Book Appointment
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
