import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Truck,
  CheckCircle2,
  MapPin,
  Phone,
  Clock,
  ShieldCheck,
  Navigation,
  KeyRound,
  AlertCircle,
  IndianRupee,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react';
import { DeliveryOrder } from '../../types';

export const PartnerDashboard: React.FC = () => {
  const {
    currentUser,
    orders,
    acceptOrder,
    updateOrderStatus,
    completeDelivery,
    openTrackingModal,
    t,
    showToast,
  } = useApp();

  const [isOnline, setIsOnline] = useState(true);
  const [selectedOrderForOtp, setSelectedOrderForOtp] = useState<DeliveryOrder | null>(null);
  const [otpInput, setOtpInput] = useState('');
  const [otpError, setOtpError] = useState<string | null>(null);

  // Filter orders
  // Available requests: unassigned orders in ORDER_PLACED status
  const availableOrders = orders.filter(
    (o) => o.status === 'ORDER_PLACED' && (!o.partnerId || o.partnerId === '')
  );

  // My active deliveries
  const myAssignedOrders = orders.filter(
    (o) =>
      o.partnerId === currentUser.id &&
      (o.status === 'PICKUP_SCHEDULED' || o.status === 'IN_TRANSIT' || o.status === 'OUT_FOR_DELIVERY')
  );

  // My completed deliveries
  const myCompletedOrders = orders.filter(
    (o) => o.partnerId === currentUser.id && o.status === 'DELIVERED'
  );

  // Earnings calculation: partner receives ₹40 + 70% of total fee for each delivery
  const todayEarnings = myCompletedOrders.reduce((acc, o) => acc + Math.round(o.totalFee * 0.75), 450);

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrderForOtp) return;

    const res = completeDelivery(selectedOrderForOtp.id, otpInput);
    if (res.success) {
      setSelectedOrderForOtp(null);
      setOtpInput('');
      setOtpError(null);
    } else {
      setOtpError(res.message);
    }
  };

  return (
    <div className="space-y-8">
      {/* Partner Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-emerald-950 text-white rounded-2xl p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=140&q=80"
              alt="Rider"
              className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-400"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl md:text-2xl font-bold tracking-tight">{currentUser.name}</h1>
                <span className="text-[11px] bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded font-mono font-medium">
                  {currentUser.vehicleType || 'Electric 2-Wheeler'}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Base Sector: {currentUser.village}, Taluka {currentUser.taluka} · Rating: ★ 4.95 (384 Deliveries)
              </p>
            </div>
          </div>

          {/* Duty Switch */}
          <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl backdrop-blur-xs">
            <div className="text-right">
              <div className="text-xs font-semibold">{isOnline ? 'Online for Dispatch' : 'Offline / On Break'}</div>
              <div className="text-[10px] text-slate-300">Auto-receiving nearby rural pickups</div>
            </div>
            <button
              onClick={() => {
                setIsOnline(!isOnline);
                showToast(isOnline ? 'Rider went offline' : 'Rider online! Ready for rural deliveries');
              }}
              className="text-white hover:text-emerald-300 transition-colors"
            >
              {isOnline ? (
                <ToggleRight className="w-8 h-8 text-emerald-400" />
              ) : (
                <ToggleLeft className="w-8 h-8 text-slate-400" />
              )}
            </button>
          </div>
        </div>

        {/* Fleet KPI */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-700/80 text-white">
          <div className="bg-white/5 p-4 rounded-xl border border-white/10">
            <span className="text-xs text-slate-400 block">Today's Payout (₹)</span>
            <span className="text-2xl font-bold font-mono text-emerald-300">₹{todayEarnings}</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Direct to GramPay UPI</span>
          </div>
          <div className="bg-white/5 p-4 rounded-xl border border-white/10">
            <span className="text-xs text-slate-400 block">Active Runs</span>
            <span className="text-2xl font-bold font-mono text-amber-300">{myAssignedOrders.length}</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Parcels on vehicle</span>
          </div>
          <div className="bg-white/5 p-4 rounded-xl border border-white/10">
            <span className="text-xs text-slate-400 block">Completed Today</span>
            <span className="text-2xl font-bold font-mono text-white">{myCompletedOrders.length + 3}</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">100% on-time rate</span>
          </div>
          <div className="bg-white/5 p-4 rounded-xl border border-white/10">
            <span className="text-xs text-slate-400 block">Clean Energy Savings</span>
            <span className="text-2xl font-bold font-mono text-emerald-300">14.2 kg</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">CO2 saved with EV runs</span>
          </div>
        </div>
      </div>

      {/* Available Requests in Taluka */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              New Rural Delivery Requests ({availableOrders.length})
            </h2>
            <p className="text-xs text-slate-500">
              Orders placed by local farmers & artisans waiting for rider assignment in your sector.
            </p>
          </div>
        </div>

        {availableOrders.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200 text-xs text-slate-500">
            No unassigned requests in your immediate perimeter right now. You are ready for incoming dispatches.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableOrders.map((ord) => {
              const partnerShare = Math.round(ord.totalFee * 0.75);
              return (
                <div
                  key={ord.id}
                  className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-3 hover:border-slate-300 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-emerald-800">
                      {ord.trackingNumber}
                    </span>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full font-mono">
                      Earn ₹{partnerShare}
                    </span>
                  </div>

                  <div className="text-xs space-y-2">
                    <div className="text-slate-900 font-semibold">{ord.productName} ({ord.packageWeightKg} kg)</div>
                    <div className="flex items-start gap-2 text-slate-600">
                      <span className="text-emerald-700 font-bold">Pick:</span>
                      <span>{ord.pickup.village} ({ord.pickup.address})</span>
                    </div>
                    <div className="flex items-start gap-2 text-slate-600">
                      <span className="text-blue-700 font-bold">Drop:</span>
                      <span>{ord.destination.village} ({ord.destination.address})</span>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Distance: {ord.distanceKm} km · Service: {ord.deliveryType.replace('_', ' ')}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-slate-200">
                    <button
                      onClick={() => acceptOrder(ord.id)}
                      className="flex-1 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-2xs transition-colors text-center"
                    >
                      Accept Assignment (₹{partnerShare})
                    </button>
                    <button
                      onClick={() => openTrackingModal(ord)}
                      className="px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors"
                    >
                      View Route
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* My Active Assigned Runs */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            Active Assigned Deliveries ({myAssignedOrders.length})
          </h2>
          <p className="text-xs text-slate-500">
            Update parcel status as you progress across villages and verify delivery OTP on arrival.
          </p>
        </div>

        {myAssignedOrders.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200 text-xs text-slate-500">
            No runs currently in transit. Accept an assignment above to start delivery!
          </div>
        ) : (
          <div className="space-y-4">
            {myAssignedOrders.map((ord) => (
              <div
                key={ord.id}
                className="border border-slate-200 rounded-xl p-5 bg-white space-y-4 shadow-2xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                      <Truck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-mono text-xs font-bold text-slate-900">
                        {ord.trackingNumber} · {ord.productName}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Consignee: {ord.customerName} ({ord.customerPhone})
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2.5 py-1 rounded bg-amber-50 text-amber-800 font-medium border border-amber-200">
                      {t(ord.status)}
                    </span>
                    <button
                      onClick={() => openTrackingModal(ord)}
                      className="px-2.5 py-1 text-xs text-emerald-800 bg-emerald-50 rounded border border-emerald-200 hover:bg-emerald-100"
                    >
                      GPS Map
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600">
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 space-y-1">
                    <div className="font-semibold text-slate-900">Pickup Location</div>
                    <div>{ord.pickup.title} - {ord.pickup.address}</div>
                    <div className="text-[11px] text-emerald-800 font-medium">{ord.pickup.village}, {ord.pickup.taluka}</div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 space-y-1">
                    <div className="font-semibold text-slate-900">Destination Point</div>
                    <div>{ord.destination.title} - {ord.destination.address}</div>
                    <div className="text-[11px] text-blue-800 font-medium">{ord.destination.village}, {ord.destination.district}</div>
                  </div>
                </div>

                {/* Status Advancement Controls */}
                <div className="pt-2 flex flex-wrap items-center gap-2 justify-end">
                  {ord.status === 'PICKUP_SCHEDULED' && (
                    <button
                      onClick={() =>
                        updateOrderStatus(
                          ord.id,
                          'IN_TRANSIT',
                          'Parcel collected from farm workshop and onboard EV vehicle',
                          `${ord.pickup.village} Center`
                        )
                      }
                      className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors"
                    >
                      Confirm Pickup & Start Transit
                    </button>
                  )}

                  {ord.status === 'IN_TRANSIT' && (
                    <button
                      onClick={() =>
                        updateOrderStatus(
                          ord.id,
                          'OUT_FOR_DELIVERY',
                          'Courier arrived in local destination sector. Preparing delivery.',
                          `${ord.destination.village} Sector`
                        )
                      }
                      className="px-4 py-2 bg-blue-800 hover:bg-blue-900 text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors"
                    >
                      Mark "Out for Delivery"
                    </button>
                  )}

                  {(ord.status === 'OUT_FOR_DELIVERY' || ord.status === 'IN_TRANSIT') && (
                    <button
                      onClick={() => setSelectedOrderForOtp(ord)}
                      className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors flex items-center gap-1.5"
                    >
                      <KeyRound className="w-3.5 h-3.5" />
                      <span>Deliver with Customer OTP</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* OTP Delivery Verification Modal */}
      {selectedOrderForOtp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 bg-emerald-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-emerald-300" />
                <h3 className="text-base font-semibold">Verify OTP & Complete Delivery</h3>
              </div>
              <button
                onClick={() => {
                  setSelectedOrderForOtp(null);
                  setOtpError(null);
                }}
                className="text-white/80 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleVerifyOtp} className="p-6 space-y-4 text-xs">
              <p className="text-slate-600">
                Ask recipient <strong className="text-slate-900">{selectedOrderForOtp.customerName}</strong> for the 4-digit Delivery OTP sent to their mobile.
              </p>

              <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-200 text-emerald-900">
                <span className="font-semibold block">Demo Tip / Test Assistance:</span>
                <span>The customer's secret OTP is: </span>
                <strong className="font-mono text-sm underline">{selectedOrderForOtp.deliveryOtp}</strong>
                <span className="block text-[11px] text-emerald-700 mt-0.5">(or enter master demo OTP: 1234)</span>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Enter 4-Digit OTP</label>
                <input
                  type="text"
                  maxLength={6}
                  required
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value)}
                  placeholder="e.g. 4829"
                  className="w-full text-center text-lg tracking-widest font-mono py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600 font-bold"
                />
              </div>

              {otpError && (
                <div className="p-2.5 bg-rose-50 text-rose-700 rounded-lg border border-rose-200 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{otpError}</span>
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedOrderForOtp(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-medium rounded-lg"
                >
                  Verify & Handover Parcel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
