import React from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Phone, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  setCurrentView: (view: 'home' | 'dashboard' | 'marketplace') => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentView }) => {
  const { t } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <div className="w-7 h-7 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold text-xs">
                GC
              </div>
              <span>{t('appName')}</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Affordable, reliable, and smarter last-mile rural logistics connecting Maharashtra's farmers, artisans, and women self-help groups (SHGs) to thriving urban markets.
            </p>
            <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Certified Rural Last-Mile Delivery Protocol</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <div className="text-white font-semibold uppercase tracking-wider text-[11px]">
              Platform Links
            </div>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button
                  onClick={() => setCurrentView('home')}
                  className="hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('marketplace')}
                  className="hover:text-white transition-colors"
                >
                  Rural Products Market
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className="hover:text-white transition-colors"
                >
                  Role Dashboards (Seller, Partner, Customer, Admin)
                </button>
              </li>
              <li>
                <a href="#smart-features" className="hover:text-white transition-colors">
                  Milk-Run Route Optimization
                </a>
              </li>
            </ul>
          </div>

          {/* Coverage Regions */}
          <div className="space-y-3">
            <div className="text-white font-semibold uppercase tracking-wider text-[11px]">
              Key Service Corridors
            </div>
            <ul className="space-y-1.5 text-[11px] text-slate-400">
              <li>• Baramati - Purandar - Pune Metro Corridor</li>
              <li>• Wai - Mahabaleshwar - Satara Agro Belt</li>
              <li>• Kagal - Ichalkaranji - Kolhapur Artisan Cluster</li>
              <li>• Yeola - Niphad - Nashik Handloom Route</li>
              <li>• Sangamner - Akole Organic Oil Corridor</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <div className="text-white font-semibold uppercase tracking-wider text-[11px]">
              State Operations Cell
            </div>
            <div className="space-y-2 text-[11px] text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>GramConnect Hub, MIDC Baramati, District Pune, Maharashtra 413133</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="font-mono">+91 20 2567 8900 / 1800-GRAM-CONNECT</span>
              </div>
              <div className="text-slate-500 pt-1">
                Language Support: मराठी, हिंदी, English
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 mt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © 2026 GramConnect Logistics Technologies Pvt. Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Privacy Policy</span>
            <span>·</span>
            <span>Terms of Rural Transit</span>
            <span>·</span>
            <span>Maharashtra Shetkari Sahayata</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
