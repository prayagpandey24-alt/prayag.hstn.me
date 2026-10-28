import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowRight,
  Package,
  Search,
  Truck,
  CheckCircle2,
  ShieldCheck,
  TrendingUp,
  MapPin,
  Sparkles,
} from 'lucide-react';

export const Hero: React.FC = () => {
  const {
    t,
    openBookingModal,
    openTrackingModal,
    openAuthModal,
    setCurrentUserRole,
  } = useApp();

  const [trackInput, setTrackInput] = useState('GC-MAH-8421');

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackInput.trim()) {
      openTrackingModal(trackInput.trim());
    }
  };

  return (
    <div className="relative bg-white pt-8 pb-16 overflow-hidden">
      {/* Subtle ambient background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 2-Column Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & Actions */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Trust Kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              <span>Maharashtra Rural Innovation & Logistics Initiative</span>
            </div>

            {/* Headline with text-wrap balance */}
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.12]"
              style={{ textWrap: 'balance' }}
            >
              {t('heroHeadline')}
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-slate-600 max-w-xl leading-relaxed">
              {t('heroSubtitle')}
            </p>

            {/* Quick Tracking Search Bar */}
            <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-200 shadow-sm max-w-lg">
              <form onSubmit={handleTrackSubmit} className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={trackInput}
                    onChange={(e) => setTrackInput(e.target.value)}
                    placeholder="Enter Order Tracking # (e.g. GC-MAH-8421)"
                    className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-mono font-medium focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors shrink-0 flex items-center gap-1.5"
                >
                  <Package className="w-3.5 h-3.5" />
                  <span>{t('btnTrackOrder')}</span>
                </button>
              </form>
              <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-2 px-1">
                <span>Try sample tracking IDs:</span>
                <button
                  type="button"
                  onClick={() => openTrackingModal('GC-MAH-8421')}
                  className="font-mono text-emerald-700 hover:underline font-semibold"
                >
                  GC-MAH-8421
                </button>
                <span>·</span>
                <button
                  type="button"
                  onClick={() => openTrackingModal('GC-MAH-9012')}
                  className="font-mono text-emerald-700 hover:underline font-semibold"
                >
                  GC-MAH-9012
                </button>
              </div>
            </div>

            {/* Hero Primary Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => openBookingModal()}
                className="px-6 py-3 bg-emerald-800 hover:bg-emerald-900 text-white text-sm font-semibold rounded-xl shadow-sm hover:shadow transition-all flex items-center gap-2"
              >
                <span>{t('btnBookDelivery')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => openAuthModal('seller')}
                className="px-6 py-3 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-sm font-semibold rounded-xl shadow-2xs transition-colors"
              >
                <span>{t('btnGetStarted')}</span>
              </button>
            </div>

            {/* Proof Points */}
            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-slate-200 text-xs text-slate-600">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span className="font-medium">Starts ₹25 / Intra-Village</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span className="font-medium">35% Shared Route Batch Savings</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span className="font-medium">100% Cash on Delivery Supported</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Fidelity Imagery Showcase */}
          <div className="lg:col-span-5 relative">
            
            {/* Primary Visual Showcase Card */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-900 group">
              <img
                src="/src/assets/images/hero_rural_entrepreneur_1791645734722.jpg"
                alt="Rural Entrepreneur in Maharashtra"
                className="w-full h-[400px] object-cover group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              
              {/* Measured contrast scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent"></div>

              {/* Floating Verified Producer Badge */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm text-xs">
                <span className="font-bold text-slate-900 block">Savitribai Agro SHG</span>
                <span className="text-[11px] text-slate-500">Malegaon Budruk, Baramati</span>
              </div>

              {/* Bottom In-Image Card */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-white/20 shadow-lg text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                    <span className="font-bold text-slate-900">GramConnect Electric Fleet</span>
                  </div>
                  <span className="font-mono text-[11px] text-emerald-800 font-semibold">Active Run</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Consolidated pickup of natural jaggery & pure honey moving from Baramati to Pune Hub.
                </p>
              </div>
            </div>

            {/* Overlapping Secondary Asset */}
            <div className="hidden sm:block absolute -bottom-6 -left-8 w-44 rounded-xl overflow-hidden border-2 border-white shadow-xl">
              <img
                src="/src/assets/images/delivery_partner_ev_1791645750888.jpg"
                alt="Delivery Partner on EV"
                className="w-full h-28 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="bg-emerald-950 text-white p-2 text-[10px] text-center font-medium">
                Sachin Shinde · EV Courier
              </div>
            </div>
          </div>
        </div>

        {/* 4-Metric Proof Row below hero */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-8 border-t border-slate-200">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="text-2xl font-bold font-mono text-slate-900">140+</div>
            <div className="text-xs text-slate-600 mt-1">Villages & Wadis Connected</div>
            <div className="text-[11px] text-emerald-700 mt-0.5">Pune & Satara belt</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="text-2xl font-bold font-mono text-emerald-800">₹25</div>
            <div className="text-xs text-slate-600 mt-1">Starting Intra-Village Base</div>
            <div className="text-[11px] text-emerald-700 mt-0.5">Empowering micro-producers</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="text-2xl font-bold font-mono text-slate-900">98.4%</div>
            <div className="text-xs text-slate-600 mt-1">On-Time Rural Delivery</div>
            <div className="text-[11px] text-emerald-700 mt-0.5">OTP secured at doorstep</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="text-2xl font-bold font-mono text-slate-900">1,200+</div>
            <div className="text-xs text-slate-600 mt-1">Rural Women & Farmers</div>
            <div className="text-[11px] text-emerald-700 mt-0.5">Connected to metro buyers</div>
          </div>
        </div>
      </div>
    </div>
  );
};
