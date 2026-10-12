import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, X, Calendar, Check, ArrowRight } from 'lucide-react';
import { SERVICES_DATA } from '../data/clinicData';
import { ServiceCategory } from '../types/clinic';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ServiceIcon } from '../components/ServiceIcon';

const CATEGORIES: ('All' | ServiceCategory)[] = [
  'All',
  'Preventive Care',
  'Wellness & Grooming',
  'Surgery & Diagnostics',
  'Emergency & Dental',
];

export const ServicesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | ServiceCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredServices = useMemo(() => {
    return SERVICES_DATA.filter((service) => {
      const matchesCategory =
        selectedCategory === 'All' || service.category === selectedCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        service.name.toLowerCase().includes(query) ||
        service.shortDescription.toLowerCase().includes(query) ||
        service.fullDescription.toLowerCase().includes(query) ||
        service.category.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div>
        <Breadcrumbs items={[{ label: 'Our Services' }]} />

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-medium text-teal-700">
              <span>Veterinary Services & Sample LKR Tariff</span>
              <span aria-hidden="true">·</span>
              <span>8 Specialized Departments</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight">
              Our Veterinary Services & Care Packages
            </h1>
            <p className="text-base text-slate-600 leading-relaxed">
              Explore our complete range of preventive, diagnostic, dental, grooming, surgical, and emergency services. Click “Book This Service” on any card to open the appointment scheduler with that service automatically selected.
            </p>
          </div>

          <Link
            to="/book-appointment"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-xl transition-colors whitespace-nowrap shrink-0 self-start lg:self-auto"
          >
            <Calendar className="w-4 h-4" />
            Book General Appointment
          </Link>
        </div>
      </div>

      {/* Interactive Filter Controls & Search Bar */}
      <div className="bg-slate-50 rounded-2xl p-4 sm:p-6 border border-slate-200/90 space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Category Segmented Buttons */}
          <div
            className="flex flex-wrap items-center gap-1.5"
            role="group"
            aria-label="Filter services by category"
          >
            {CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-teal-700 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <label htmlFor="service-search" className="sr-only">
              Search veterinary services
            </label>
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="service-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search checkup, dental, vaccine..."
              className="w-full pl-10 pr-9 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded"
                aria-label="Clear search query"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
          <span>
            Showing <strong className="text-slate-800 tabular-nums">{filteredServices.length}</strong> of{' '}
            <strong className="text-slate-800 tabular-nums">{SERVICES_DATA.length}</strong> clinical services
          </span>
          {(selectedCategory !== 'All' || searchQuery.trim() !== '') && (
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="text-teal-700 hover:text-teal-800 font-semibold underline"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Service Cards Grid */}
      {filteredServices.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
          <p className="text-lg font-bold text-slate-900 font-display">
            No matching veterinary services found
          </p>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            We couldn’t find any services matching “{searchQuery}” in the {selectedCategory} category. Try clearing your search filter.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors"
          >
            Show All 8 Services
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredServices.map((service, index) => (
            <div
              key={service.id}
              className="flex flex-col justify-between bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 hover:border-teal-600/40 transition-colors"
            >
              <div className="space-y-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                    <ServiceIcon name={service.iconName} className="w-6 h-6" />
                  </div>
                  <div className="text-right text-xs text-slate-500">
                    <span>{service.category}</span>
                    <span aria-hidden="true"> · </span>
                    <span className="tabular-nums">Est. {service.durationMinutes} mins</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h2 className="text-xl font-bold text-slate-900 font-display">
                    0{index + 1}. {service.name}
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {service.fullDescription}
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <p className="text-xs font-semibold text-slate-700">
                    What’s Included in This Visit:
                  </p>
                  <ul className="space-y-1.5">
                    {service.highlights.map((highlight, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-xs text-slate-600"
                      >
                        <Check className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-slate-500 block">
                    Sample Consultation / Procedure Fee
                  </span>
                  <span className="text-xl font-extrabold text-slate-900 font-display tabular-nums">
                    LKR {service.priceLKR.toLocaleString()}
                  </span>
                </div>

                <Link
                  to={`/book-appointment?serviceId=${service.id}`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-xl transition-colors whitespace-nowrap shrink-0"
                >
                  Book This Service
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
