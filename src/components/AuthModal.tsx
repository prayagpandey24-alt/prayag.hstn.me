import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import { DEMO_USERS } from '../data/initialData';
import {
  X,
  UserCheck,
  Briefcase,
  Truck,
  ShoppingBag,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authRole,
    registerUser,
    setCurrentUserRole,
    currentUser,
  } = useApp();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [selectedRole, setSelectedRole] = useState<UserRole>(authRole || 'seller');

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+91 ');
  const [password, setPassword] = useState('');
  const [village, setVillage] = useState('Baramati');
  const [taluka, setTaluka] = useState('Baramati');
  const [district, setDistrict] = useState('Pune');
  const [businessName, setBusinessName] = useState('');
  const [vehicleType, setVehicleType] = useState<'Electric 2-Wheeler' | 'Cargo 3-Wheeler'>('Electric 2-Wheeler');

  if (!isAuthModalOpen) return null;

  const handleQuickDemoLogin = (role: UserRole) => {
    setCurrentUserRole(role);
    setIsAuthModalOpen(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === 'register') {
      registerUser({
        name,
        email,
        phone,
        role: selectedRole,
        village,
        taluka,
        district,
        businessName: selectedRole === 'seller' ? businessName : undefined,
        vehicleType: selectedRole === 'partner' ? vehicleType : undefined,
      });
    } else {
      // Find or switch
      setCurrentUserRole(selectedRole);
    }

    setIsAuthModalOpen(false);
  };

  const roleConfigs = [
    {
      id: 'seller',
      title: 'Rural Seller',
      desc: 'Artisans, SHGs, farmers',
      icon: Briefcase,
      color: 'border-emerald-600',
    },
    {
      id: 'partner',
      title: 'Delivery Partner',
      desc: 'Local couriers & riders',
      icon: Truck,
      color: 'border-blue-600',
    },
    {
      id: 'customer',
      title: 'Customer',
      desc: 'Buyers & consumers',
      icon: ShoppingBag,
      color: 'border-amber-600',
    },
    {
      id: 'admin',
      title: 'Operations Admin',
      desc: 'State logistics cell',
      icon: ShieldAlert,
      color: 'border-slate-800',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-900 text-white">
          <div className="flex items-center gap-2.5">
            <UserCheck className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="text-base font-semibold">
                GramConnect Access Portal
              </h3>
              <p className="text-xs text-slate-400">
                Secure authentication for Maharashtra rural logistics network
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 max-h-[80vh] overflow-y-auto space-y-5">
          
          {/* Quick Demo Instant Logins */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              1-Click Instant Demo Role Switch (Ready Profiles)
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {DEMO_USERS.map((u) => {
                const isActive = currentUser.role === u.role;
                return (
                  <button
                    key={u.role}
                    type="button"
                    onClick={() => handleQuickDemoLogin(u.role)}
                    className={`p-2 rounded-lg border text-left transition-all text-xs ${
                      isActive
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-semibold'
                        : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] text-slate-400 uppercase font-mono">
                      <span>{u.role}</span>
                      {isActive && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                    </div>
                    <div className="truncate font-medium mt-0.5">{u.name.split(' ')[0]}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Login or Register Toggle */}
          <div className="flex rounded-lg bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => setMode('login')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                mode === 'login' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Log In to Existing Account
            </button>
            <button
              type="button"
              onClick={() => setMode('register')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                mode === 'register' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Register New Profile
            </button>
          </div>

          {/* Role Chooser Tabs */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">
              Select Your Profile Type
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {roleConfigs.map((rc) => {
                const Icon = rc.icon;
                const isSelected = selectedRole === rc.id;
                return (
                  <button
                    key={rc.id}
                    type="button"
                    onClick={() => setSelectedRole(rc.id as UserRole)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-emerald-700 bg-emerald-50 text-slate-900 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white text-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className={`w-4 h-4 ${isSelected ? 'text-emerald-700' : 'text-slate-500'}`} />
                      <span className="text-xs font-bold text-slate-900">{rc.title}</span>
                    </div>
                    <div className="text-[11px] text-slate-500">{rc.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleFormSubmit} className="space-y-3.5">
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramesh Deshmukh"
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600"
                />
              </div>
            )}

            {mode === 'register' && selectedRole === 'seller' && (
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Enterprise / SHG / Farm Name</label>
                <input
                  type="text"
                  required
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g. Yashoda Mahila Bachat Gat"
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600"
                />
              </div>
            )}

            {mode === 'register' && selectedRole === 'partner' && (
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Delivery Vehicle</label>
                <select
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600"
                >
                  <option value="Electric 2-Wheeler">Electric 2-Wheeler (EV Scooter)</option>
                  <option value="Cargo 3-Wheeler">Cargo 3-Wheeler (Gram E-Rickshaw)</option>
                </select>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Mobile Phone (OTP)</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98XXX XXXXX"
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600 font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@gramconnect.in"
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Security Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600 font-mono"
              />
            </div>

            {mode === 'register' && (
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Village</label>
                  <input
                    type="text"
                    required
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Taluka</label>
                  <input
                    type="text"
                    required
                    value={taluka}
                    onChange={(e) => setTaluka(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">District</label>
                  <input
                    type="text"
                    required
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 mt-4"
            >
              <span>{mode === 'login' ? `Sign In as ${selectedRole.toUpperCase()}` : 'Complete Registration'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
