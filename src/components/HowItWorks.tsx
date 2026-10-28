import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Smartphone,
  Truck,
  Layers,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const { openBookingModal } = useApp();

  const steps = [
    {
      num: '01',
      title: 'Easy Mobile Booking',
      desc: 'Rural artisans or farmers enter package weight and destination in Marathi, Hindi, or English.',
      icon: Smartphone,
      highlight: 'Voice & text assisted',
    },
    {
      num: '02',
      title: 'Village Farm Pickup',
      desc: 'Assigned local delivery partner arrives on an electric vehicle directly at the rural workshop or farm gate.',
      icon: Truck,
      highlight: 'Zero travel for producer',
    },
    {
      num: '03',
      title: 'Smart Taluka Batching',
      desc: 'Parcels heading in the same direction are combined into milk-run routes, lowering delivery costs by 35%.',
      icon: Layers,
      highlight: 'Route optimized',
    },
    {
      num: '04',
      title: 'OTP Secured Delivery',
      desc: 'Final doorstep delivery verified through digital OTP with instant Cash on Delivery or UPI reconciliation.',
      icon: CheckCircle,
      highlight: 'Safe & transparent',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
            Simple 4-Step Process
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900" style={{ textWrap: 'balance' }}>
            How GramConnect Delivers in Rural Maharashtra
          </h2>
          <p className="text-sm text-slate-600">
            A reliable bridge between remote rural producers and urban buyers designed specifically for Indian village terrain.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((st) => {
            const Icon = st.icon;
            return (
              <div
                key={st.num}
                className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between space-y-4 hover:border-emerald-300 hover:bg-emerald-50/20 transition-all"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-slate-400">
                      STEP {st.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-emerald-800 flex items-center justify-center shadow-2xs">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900">{st.title}</h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">{st.desc}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200/80 text-[11px] font-semibold text-emerald-800">
                  {st.highlight}
                </div>
              </div>
            );
          })}
        </div>

        {/* Operational CTA Banner */}
        <div className="bg-emerald-900 text-white rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1">
            <h3 className="text-xl font-bold">Have goods to dispatch from your village?</h3>
            <p className="text-xs md:text-sm text-emerald-200">
              Calculate exact delivery charges instantly and have a partner at your door within hours.
            </p>
          </div>
          <button
            onClick={() => openBookingModal()}
            className="px-6 py-2.5 bg-white text-emerald-950 font-semibold text-xs rounded-xl shadow-xs hover:bg-emerald-50 transition-colors shrink-0"
          >
            Calculate Delivery Charges & Book
          </button>
        </div>
      </div>
    </section>
  );
};
