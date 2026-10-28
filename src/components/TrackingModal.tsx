import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TrackingMap } from './TrackingMap';
import {
  X,
  Package,
  Phone,
  Clock,
  CheckCircle2,
  AlertCircle,
  Truck,
  Copy,
  Share2,
  Navigation,
  ShieldCheck,
  Star,
} from 'lucide-react';
import { OrderStatus } from '../types';

export const TrackingModal: React.FC = () => {
  const {
    isTrackingModalOpen,
    setIsTrackingModalOpen,
    trackedOrder,
    t,
    updateOrderStatus,
    rateOrder,
    showToast,
  } = useApp();

  const [rating, setRating] = useState(5);
  const [feedbackText, setFeedbackText] = useState('');
  const [hasRated, setHasRated] = useState(false);

  if (!isTrackingModalOpen || !trackedOrder) return null;

  const statuses: OrderStatus[] = [
    'ORDER_PLACED',
    'PICKUP_SCHEDULED',
    'IN_TRANSIT',
    'OUT_FOR_DELIVERY',
    'DELIVERED',
  ];

  const currentIdx = statuses.indexOf(trackedOrder.status);

  const handleCopyTracking = () => {
    navigator.clipboard.writeText(trackedOrder.trackingNumber);
    showToast(`Tracking number ${trackedOrder.trackingNumber} copied to clipboard!`);
  };

  const handleAdvanceStatusDemo = () => {
    if (currentIdx < statuses.length - 1) {
      const nextStatus = statuses[currentIdx + 1];
      updateOrderStatus(
        trackedOrder.id,
        nextStatus,
        `Demo live simulation progressed to ${nextStatus}`,
        `${trackedOrder.pickup.taluka} Hub`
      );
    }
  };

  const handleRateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    rateOrder(trackedOrder.id, rating, feedbackText);
    setHasRated(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-emerald-900 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <Package className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold tracking-tight">
                  Track Delivery
                </h3>
                <span className="font-mono text-xs bg-white/20 text-white px-2 py-0.5 rounded font-bold">
                  {trackedOrder.trackingNumber}
                </span>
              </div>
              <p className="text-xs text-emerald-200">
                {trackedOrder.productName} · {trackedOrder.packageWeightKg} kg
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyTracking}
              className="text-xs bg-white/10 hover:bg-white/20 text-white px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
              title="Copy Tracking ID"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy ID</span>
            </button>
            <button
              onClick={() => setIsTrackingModalOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto space-y-6">

          {/* Stepper Status Bar */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
              Live Delivery Lifecycle
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {statuses.map((st, idx) => {
                const isPassed = currentIdx >= idx;
                const isCurrent = currentIdx === idx;
                return (
                  <div
                    key={st}
                    className={`relative p-2.5 rounded-lg border text-left transition-all ${
                      isCurrent
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-semibold shadow-xs'
                        : isPassed
                        ? 'border-slate-300 bg-white text-slate-800'
                        : 'border-dashed border-slate-200 bg-slate-100/50 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono uppercase text-slate-500">Step 0{idx + 1}</span>
                      {isPassed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                    </div>
                    <div className="text-xs leading-snug">{t(st)}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Map Section */}
          <TrackingMap order={trackedOrder} />

          {/* Details 2-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Delivery Partner & Security Details */}
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4">
              <h4 className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Assigned Delivery Courier
              </h4>

              <div className="flex items-center gap-4 bg-white p-3.5 rounded-lg border border-slate-200">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                  alt="Delivery Partner"
                  className="w-12 h-12 rounded-full object-cover border border-emerald-500"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-slate-900 truncate">
                    {trackedOrder.partnerName || 'Sachin Shinde (सचिन शिंदे)'}
                  </div>
                  <div className="text-xs text-slate-500 truncate">
                    {trackedOrder.partnerVehicle || 'EV Scooter · Wai-Satara Corridor'}
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-xs text-slate-600">
                    <span className="text-amber-600 font-semibold">★ 4.95 Rating</span>
                    <span>·</span>
                    <span>380+ Village Deliveries</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <span className="text-slate-500 block">Delivery OTP</span>
                  <span className="font-mono text-base font-bold text-emerald-800 tracking-widest">
                    {trackedOrder.deliveryOtp}
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Share with rider on doorstep</span>
                </div>
                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <span className="text-slate-500 block">Payment Mode</span>
                  <span className="text-xs font-bold text-slate-800 block mt-0.5">
                    {trackedOrder.paymentMode}
                  </span>
                  <span className="text-[10px] text-emerald-700 font-semibold block mt-0.5">
                    Total: ₹{trackedOrder.totalFee}
                  </span>
                </div>
              </div>

              {/* Demo Simulator Action */}
              <div className="pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={handleAdvanceStatusDemo}
                  disabled={trackedOrder.status === 'DELIVERED'}
                  className="w-full py-2 px-3 text-xs font-medium text-emerald-800 bg-emerald-100 hover:bg-emerald-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>
                    {trackedOrder.status === 'DELIVERED'
                      ? 'Package Already Delivered'
                      : 'Simulate Next Milestone Progression'}
                  </span>
                </button>
              </div>
            </div>

            {/* Checkpoints Timeline */}
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4">
              <h4 className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Transit Activity Log
              </h4>

              <div className="space-y-4 max-h-[220px] overflow-y-auto pr-2">
                {trackedOrder.checkpoints.map((cp, idx) => (
                  <div key={idx} className="flex gap-3 text-xs">
                    <div className="flex flex-col items-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 my-1"></div>
                      {idx !== trackedOrder.checkpoints.length - 1 && (
                        <div className="w-0.5 flex-1 bg-emerald-200"></div>
                      )}
                    </div>
                    <div className="flex-1 pb-3">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-900">{cp.label}</span>
                        <span className="text-slate-400 font-mono text-[11px]">{cp.timestamp}</span>
                      </div>
                      <div className="text-slate-600 mt-0.5">{cp.locationName}</div>
                      {cp.note && <div className="text-slate-500 italic mt-0.5 text-[11px]">{cp.note}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Feedback Section if Delivered */}
          {trackedOrder.status === 'DELIVERED' && (
            <div className="bg-emerald-50/60 p-5 rounded-xl border border-emerald-200 space-y-3">
              <h4 className="text-xs font-semibold text-emerald-900 uppercase tracking-wider">
                Customer Rating & Feedback
              </h4>

              {hasRated || trackedOrder.rating ? (
                <div className="text-xs text-emerald-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Thank you for your rating ({trackedOrder.rating || rating} Stars)! Feedback recorded.</span>
                </div>
              ) : (
                <form onSubmit={handleRateSubmit} className="space-y-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-700">Rate your experience:</span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className={`p-1 rounded ${
                            rating >= star ? 'text-amber-500' : 'text-slate-300'
                          }`}
                        >
                          <Star className="w-4 h-4 fill-current" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <input
                    type="text"
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    placeholder="Share feedback on packaging, delivery speed, or rural product quality..."
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600"
                  />

                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-emerald-800 text-white rounded-lg font-medium hover:bg-emerald-900 transition-colors"
                  >
                    Submit Feedback
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>GramConnect Maharashtra Rural Network Protocol</span>
          </div>
          <button
            onClick={() => setIsTrackingModalOpen(false)}
            className="px-4 py-2 text-xs font-medium text-slate-700 hover:text-slate-900 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
