import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { SmartDeliveryFeatures } from './components/SmartDeliveryFeatures';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { Marketplace } from './components/Marketplace';
import { TrackingModal } from './components/TrackingModal';
import { BookingFormModal } from './components/BookingFormModal';
import { AuthModal } from './components/AuthModal';

import { SellerDashboard } from './components/dashboards/SellerDashboard';
import { PartnerDashboard } from './components/dashboards/PartnerDashboard';
import { CustomerDashboard } from './components/dashboards/CustomerDashboard';
import { AdminDashboard } from './components/dashboards/AdminDashboard';
import { UserRole } from './types';
import { CheckCircle2, UserCheck, ShieldCheck } from 'lucide-react';

const AppContent: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'marketplace' | 'dashboard'>('home');
  const { currentUser, setCurrentUserRole, toastMessage } = useApp();

  const roleLabels: Record<UserRole, { title: string; color: string; desc: string }> = {
    seller: { title: 'Rural Entrepreneur / Seller', color: 'bg-emerald-800 text-white', desc: 'Add products & create village delivery requests' },
    partner: { title: 'Delivery Partner (Courier)', color: 'bg-blue-800 text-white', desc: 'Accept requests & update live order progress' },
    customer: { title: 'Customer (Consignee)', color: 'bg-teal-800 text-white', desc: 'Browse products & track parcel deliveries' },
    admin: { title: 'State Operations Admin', color: 'bg-slate-900 text-white', desc: 'Manage tariff rate cards, users & complaints' },
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-[9999] bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl border border-slate-700 flex items-center gap-3 text-xs animate-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation */}
      <Navbar currentView={currentView} setCurrentView={setCurrentView} />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentView === 'home' && (
          <>
            <Hero />
            <HowItWorks />
            <SmartDeliveryFeatures />
            <AboutSection />
          </>
        )}

        {currentView === 'marketplace' && (
          <Marketplace />
        )}

        {currentView === 'dashboard' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            
            {/* Quick Multi-Role Switcher Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-emerald-800" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Active Role Dashboard:
                  </span>
                  <span className="text-xs font-bold text-slate-900">
                    {roleLabels[currentUser.role].title}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  {roleLabels[currentUser.role].desc}
                </p>
              </div>

              {/* Fast Switch Tabs */}
              <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
                {(['seller', 'partner', 'customer', 'admin'] as UserRole[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => setCurrentUserRole(r)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors capitalize ${
                      currentUser.role === r
                        ? 'bg-white text-slate-900 shadow-2xs font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {r === 'seller' ? '1. Seller' : r === 'partner' ? '2. Delivery Partner' : r === 'customer' ? '3. Customer' : '4. Admin'}
                  </button>
                ))}
              </div>
            </div>

            {/* Role-Specific Dashboard Renderer */}
            {currentUser.role === 'seller' && <SellerDashboard />}
            {currentUser.role === 'partner' && <PartnerDashboard />}
            {currentUser.role === 'customer' && <CustomerDashboard />}
            {currentUser.role === 'admin' && <AdminDashboard />}
          </div>
        )}
      </main>

      {/* Global Modals */}
      <TrackingModal />
      <BookingFormModal />
      <AuthModal />

      {/* Quiet Footer */}
      <Footer setCurrentView={setCurrentView} />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
