import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  TrendingDown,
  Route,
  Network,
  Bell,
  Coins,
  CheckCircle2,
  Play,
  RotateCcw,
  Zap,
  ArrowRight,
} from 'lucide-react';

export const SmartDeliveryFeatures: React.FC = () => {
  const { t, language } = useApp();

  // Route optimization simulation state
  const [simulationStep, setSimulationStep] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);

  const routeSteps = [
    { title: 'Taluka Micro-Hub: Baramati', type: 'Depot', detail: 'Electric vehicle fully charged at solar charging station' },
    { title: 'Pickup 1: Malegaon Budruk (Savitri SHG)', type: 'Pickup', detail: 'Collected 2 kg organic jaggery blocks' },
    { title: 'Pickup 2: Morgaon Artisan Unit', type: 'Pickup', detail: 'Collected 1.5 kg stone-milled ragi flour' },
    { title: 'Drop 1: Supe Grampanchayat Center', type: 'Drop', detail: 'Delivered parcel with customer OTP verification' },
    { title: 'Consolidated Delivery: Pune Metro Hub', type: 'Drop', detail: 'Dispatched to metropolitan consumer delivery route' },
  ];

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setSimulationStep(0);
    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      setSimulationStep(step);
      if (step >= routeSteps.length - 1) {
        clearInterval(interval);
        setIsSimulating(false);
      }
    }, 1200);
  };

  const handleResetSimulation = () => {
    setSimulationStep(0);
    setIsSimulating(false);
  };

  return (
    <section id="smart-features" className="py-16 bg-slate-50 border-t border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-100/80 px-3 py-1 rounded-full uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 text-emerald-700" />
            <span>Last-Mile Tech for Rural Maharashtra</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900" style={{ textWrap: 'balance' }}>
            {t('smartFeatureTitle')}
          </h2>
          <p className="text-sm md:text-base text-slate-600">
            Tailored algorithms that conquer unpaved village roads, seasonal farm harvest surges, and small parcel economics.
          </p>
        </div>

        {/* 4 Pillars Bento-style Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <Coins className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                {t('smartAffordable')}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Starting at just ₹25 for intra-village drops. No exorbitant metro surge rates or unrealistic minimum order values.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 text-[11px] font-semibold text-emerald-800">
              ✓ 70% cheaper than private couriers
            </div>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <Network className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                {t('smartV2V')}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Connects neighboring wadis, padas, and grampanchayats directly without routing through distant city depots.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 text-[11px] font-semibold text-emerald-800">
              ✓ Hyperlocal Gram-to-Gram
            </div>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <TrendingDown className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                {t('smartBatch')}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dynamic clustering bundles shipments heading along the same rural corridor, giving sellers an instant 35% discount.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 text-[11px] font-semibold text-emerald-800">
              ✓ Pooled Milk-Run Routing
            </div>
          </div>

          {/* Feature 4 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <Bell className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Vernacular SMS & Voice OTP
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Automated Marathi (मराठी), Hindi, and English alerts ensure every village seller and buyer stays fully updated.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 text-[11px] font-semibold text-emerald-800">
              ✓ 100% Smartphone & Feature Phone Friendly
            </div>
          </div>
        </div>

        {/* Interactive Milk-Run Route Optimization Demonstration */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 space-y-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <Route className="w-5 h-5 text-emerald-800" />
                <h3 className="text-lg font-bold text-slate-900">
                  Interactive Route Optimization Demonstration
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Watch how GramConnect consolidates farm collections into an optimized milk-run route across Baramati & Purandar talukas.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleRunSimulation}
                disabled={isSimulating}
                className="px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 disabled:opacity-50 rounded-lg shadow-2xs transition-colors flex items-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isSimulating ? 'Simulating Transit...' : 'Run Route Simulation'}</span>
              </button>
              <button
                type="button"
                onClick={handleResetSimulation}
                className="p-2 text-slate-600 hover:text-slate-900 bg-slate-100 rounded-lg transition-colors"
                title="Reset Route"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Comparison Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Without GramConnect */}
            <div className="bg-rose-50/50 p-5 rounded-xl border border-rose-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-900">Traditional Solo Courier Runs</span>
                <span className="text-xs font-mono font-bold text-rose-700">₹680 Total Cost</span>
              </div>
              <p className="text-xs text-slate-600">
                Each farmer hires an independent motorcycle or auto-rickshaw to travel into town individually.
              </p>
              <div className="grid grid-cols-3 gap-2 text-center text-xs pt-2 border-t border-rose-200/80">
                <div className="bg-white p-2 rounded-lg border border-rose-100">
                  <span className="text-slate-400 block text-[10px]">Total Distance</span>
                  <span className="font-mono font-bold text-slate-800">142 km</span>
                </div>
                <div className="bg-white p-2 rounded-lg border border-rose-100">
                  <span className="text-slate-400 block text-[10px]">Travel Time</span>
                  <span className="font-mono font-bold text-slate-800">4.5 hrs</span>
                </div>
                <div className="bg-white p-2 rounded-lg border border-rose-100">
                  <span className="text-slate-400 block text-[10px]">Cost / Parcel</span>
                  <span className="font-mono font-bold text-rose-700">₹170 avg</span>
                </div>
              </div>
            </div>

            {/* With GramConnect Batching */}
            <div className="bg-emerald-50/70 p-5 rounded-xl border border-emerald-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-950">GramConnect Batch Route</span>
                <span className="text-xs font-mono font-bold text-emerald-800">₹320 (-52% Savings!)</span>
              </div>
              <p className="text-xs text-slate-600">
                Single electric courier follows an algorithmically sequenced pickup and drop trajectory.
              </p>
              <div className="grid grid-cols-3 gap-2 text-center text-xs pt-2 border-t border-emerald-200">
                <div className="bg-white p-2 rounded-lg border border-emerald-100">
                  <span className="text-slate-400 block text-[10px]">Optimized Path</span>
                  <span className="font-mono font-bold text-emerald-900">76 km</span>
                </div>
                <div className="bg-white p-2 rounded-lg border border-emerald-100">
                  <span className="text-slate-400 block text-[10px]">Travel Time</span>
                  <span className="font-mono font-bold text-emerald-900">2.1 hrs</span>
                </div>
                <div className="bg-white p-2 rounded-lg border border-emerald-100">
                  <span className="text-slate-400 block text-[10px]">Cost / Parcel</span>
                  <span className="font-mono font-bold text-emerald-800">₹45 - ₹55</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Stepper Visualizer */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Simulation Trajectory (Waypoints 1 through 5)
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {routeSteps.map((step, idx) => {
                const isActive = simulationStep === idx;
                const isPassed = simulationStep > idx;
                return (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isActive
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-semibold ring-2 ring-emerald-500/20'
                        : isPassed
                        ? 'border-slate-300 bg-slate-50 text-slate-800'
                        : 'border-slate-200 bg-white text-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] uppercase font-mono mb-1">
                      <span className={isActive ? 'text-emerald-800 font-bold' : 'text-slate-400'}>
                        Step 0{idx + 1}
                      </span>
                      {isPassed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                      {isActive && <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>}
                    </div>
                    <div className="text-xs font-bold leading-tight">{step.title}</div>
                    <div className="text-[11px] text-slate-500 mt-1">{step.detail}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SMS / Notification Simulation Box */}
          <div className="bg-slate-900 text-white p-4 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <Bell className="w-3.5 h-3.5" />
                <span>Simulated Vernacular Notification Feed</span>
              </span>
              <span>Baramati Telemetry</span>
            </div>
            <div className="font-mono text-xs text-slate-200 bg-black/40 p-3 rounded-lg border border-slate-800">
              {simulationStep === 0 && (
                <span>[SMS / WhatsApp] ग्रामकनेक्ट: बारामती हबवरून इलेक्ट्रिक रायडर सचिन शिंदे यांची रवानगी झाली आहे.</span>
              )}
              {simulationStep === 1 && (
                <span>[SMS / WhatsApp] ग्रामकनेक्ट: माळेगाव बुद्रुक येथे सावित्री महिला बचत गटाकडून २ किलो सेंद्रिय गूळ पिकअप पूर्ण झाले!</span>
              )}
              {simulationStep === 2 && (
                <span>[SMS / WhatsApp] ग्रामकनेक्ट: मोरगाव येथील नाचणी पीठ पार्सल एकत्र केले. कंबाइंड बॅच बचत लागू.</span>
              )}
              {simulationStep === 3 && (
                <span>[SMS / WhatsApp] ग्रामकनेक्ट: सुपे येथील ग्राहकाला पार्सल सुपूर्द. OTP #4829 द्वारे पडताळणी झाली.</span>
              )}
              {simulationStep >= 4 && (
                <span>[SMS / WhatsApp] ग्रामकनेक्ट: पुणे मेट्रो हबला सर्व पार्सल सुरक्षित पोहोचले. अंतिम वितरण वेळेत पूर्ण!</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
