import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Language, UserRole } from '../types';
import {
  Package,
  Globe,
  UserCheck,
  ChevronDown,
  Menu,
  X,
  Truck,
} from 'lucide-react';

interface NavbarProps {
  currentView: 'home' | 'dashboard' | 'marketplace';
  setCurrentView: (view: 'home' | 'dashboard' | 'marketplace') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, setCurrentView }) => {
  const {
    t,
    language,
    setLanguage,
    currentUser,
    setCurrentUserRole,
    openAuthModal,
    openBookingModal,
  } = useApp();

  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'mr', label: 'मराठी' },
    { code: 'hi', label: 'हिंदी' },
  ];

  const roleLabels: Record<UserRole, string> = {
    seller: 'Seller (उद्योजक)',
    partner: 'Partner (डिलिव्हरी)',
    customer: 'Customer (ग्राहक)',
    admin: 'Admin (प्रशासक)',
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          
          {/* Zone 1: Brand Wordmark (Single Text Element) */}
          <button
            onClick={() => setCurrentView('home')}
            className="text-xl font-bold tracking-tight text-emerald-900 whitespace-nowrap shrink-0 flex items-center gap-2 text-left"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-800 text-white flex items-center justify-center font-bold text-sm shadow-2xs">
              GC
            </div>
            <span>{t('appName')}</span>
          </button>

          {/* Zone 2: 4-5 Clean Single-Line Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600">
            <button
              onClick={() => setCurrentView('home')}
              className={`hover:text-emerald-900 transition-colors whitespace-nowrap shrink-0 ${
                currentView === 'home' ? 'text-emerald-800 font-bold' : ''
              }`}
            >
              {t('navHome')}
            </button>
            <button
              onClick={() => setCurrentView('marketplace')}
              className={`hover:text-emerald-900 transition-colors whitespace-nowrap shrink-0 ${
                currentView === 'marketplace' ? 'text-emerald-800 font-bold' : ''
              }`}
            >
              {t('navMarketplace')}
            </button>
            <a
              href="#smart-features"
              onClick={() => {
                if (currentView !== 'home') setCurrentView('home');
              }}
              className="hover:text-emerald-900 transition-colors whitespace-nowrap shrink-0"
            >
              {t('navSmartFeatures')}
            </a>
            <a
              href="#about"
              onClick={() => {
                if (currentView !== 'home') setCurrentView('home');
              }}
              className="hover:text-emerald-900 transition-colors whitespace-nowrap shrink-0"
            >
              {t('navAbout')}
            </a>
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`hover:text-emerald-900 transition-colors whitespace-nowrap shrink-0 ${
                currentView === 'dashboard' ? 'text-emerald-800 font-bold' : ''
              }`}
            >
              {t('btnDashboard')}
            </button>
          </nav>

          {/* Zone 3: 1 Primary Action Area */}
          <div className="flex items-center gap-2.5 shrink-0">
            
            {/* Language Switcher */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setIsLangMenuOpen(!isLangMenuOpen);
                  setIsRoleMenuOpen(false);
                }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                title="Change Language"
              >
                <Globe className="w-3.5 h-3.5 text-slate-500" />
                <span className="font-semibold uppercase">{language}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {isLangMenuOpen && (
                <div className="absolute right-0 mt-1.5 w-32 bg-white rounded-xl shadow-lg border border-slate-200 py-1 z-50 text-xs">
                  {languages.map((lng) => (
                    <button
                      key={lng.code}
                      onClick={() => {
                        setLanguage(lng.code);
                        setIsLangMenuOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-left flex items-center justify-between hover:bg-slate-50 transition-colors ${
                        language === lng.code ? 'font-bold text-emerald-800 bg-emerald-50/50' : 'text-slate-700'
                      }`}
                    >
                      <span>{lng.label}</span>
                      {language === lng.code && <span className="text-emerald-700 font-bold">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Demo Role Switcher Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setIsRoleMenuOpen(!isRoleMenuOpen);
                  setIsLangMenuOpen(false);
                }}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors"
              >
                <UserCheck className="w-3.5 h-3.5 text-emerald-800" />
                <span className="font-semibold capitalize">{currentUser.role}:</span>
                <span className="text-slate-600 truncate max-w-[100px]">{currentUser.name.split(' ')[0]}</span>
                <ChevronDown className="w-3 h-3 text-slate-500" />
              </button>

              {isRoleMenuOpen && (
                <div className="absolute right-0 mt-1.5 w-52 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-50 text-xs">
                  <div className="px-3 py-1.5 border-b border-slate-100 text-[10px] text-slate-400 uppercase font-bold">
                    Switch Active Demo Role:
                  </div>
                  {(['seller', 'partner', 'customer', 'admin'] as UserRole[]).map((r) => (
                    <button
                      key={r}
                      onClick={() => {
                        setCurrentUserRole(r);
                        setIsRoleMenuOpen(false);
                        setCurrentView('dashboard');
                      }}
                      className={`w-full px-3 py-2 text-left flex items-center justify-between hover:bg-slate-50 ${
                        currentUser.role === r ? 'font-bold text-emerald-800 bg-emerald-50' : 'text-slate-700'
                      }`}
                    >
                      <span>{roleLabels[r]}</span>
                      {currentUser.role === r && <span className="text-emerald-800">●</span>}
                    </button>
                  ))}
                  <div className="pt-1 border-t border-slate-100">
                    <button
                      onClick={() => {
                        setIsRoleMenuOpen(false);
                        openAuthModal();
                      }}
                      className="w-full px-3 py-1.5 text-left text-slate-500 hover:text-slate-900 text-[11px]"
                    >
                      + Login / Register Another Account
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Primary Action Button */}
            <button
              onClick={() => openBookingModal()}
              className="px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-2xs transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <Truck className="w-3.5 h-3.5" />
              <span>{t('btnBookDelivery')}</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-slate-600 hover:text-slate-900"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200 space-y-2 text-xs font-semibold">
            <button
              onClick={() => {
                setCurrentView('home');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-slate-700 hover:text-emerald-900"
            >
              {t('navHome')}
            </button>
            <button
              onClick={() => {
                setCurrentView('marketplace');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-slate-700 hover:text-emerald-900"
            >
              {t('navMarketplace')}
            </button>
            <button
              onClick={() => {
                setCurrentView('dashboard');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-slate-700 hover:text-emerald-900"
            >
              {t('btnDashboard')} ({currentUser.role})
            </button>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-slate-500 text-[11px]">Role Switch:</span>
              <div className="flex gap-1">
                {(['seller', 'partner', 'customer', 'admin'] as UserRole[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      setCurrentUserRole(r);
                      setCurrentView('dashboard');
                      setMobileMenuOpen(false);
                    }}
                    className={`px-2 py-1 text-[10px] rounded uppercase ${
                      currentUser.role === r ? 'bg-emerald-800 text-white font-bold' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
