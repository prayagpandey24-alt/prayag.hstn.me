import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldAlert,
  Users,
  Package,
  Truck,
  IndianRupee,
  Sliders,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  TrendingUp,
  MapPin,
  RefreshCw,
  Navigation,
} from 'lucide-react';
import { RateCard, UserRole } from '../../types';

interface Complaint {
  id: string;
  orderId: string;
  senderName: string;
  issue: string;
  status: 'Open' | 'Resolved';
  date: string;
}

export const AdminDashboard: React.FC = () => {
  const {
    currentUser,
    users,
    orders,
    products,
    rateCard,
    updateRateCard,
    openTrackingModal,
    t,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'users' | 'rates' | 'complaints'>('overview');

  // Rate card editing state
  const [editingRates, setEditingRates] = useState<RateCard>(rateCard);

  // Complaints mock state
  const [complaints, setComplaints] = useState<Complaint[]>([
    {
      id: 'cmp_1',
      orderId: 'GC-MAH-8421',
      senderName: 'Savitribai Mahila SHG',
      issue: 'Delay in morning EV scooter pickup due to rural road rainfall near Malegaon BK.',
      status: 'Open',
      date: 'Today, 08:45 AM',
    },
    {
      id: 'cmp_2',
      orderId: 'GC-MAH-5501',
      senderName: 'Anjali Kulkarni',
      issue: 'Customer requested delivery rescheduling by 1 hour.',
      status: 'Resolved',
      date: 'Yesterday, 04:20 PM',
    },
  ]);

  const totalOrdersCount = orders.length;
  const successfulCount = orders.filter((o) => o.status === 'DELIVERED').length;
  const pendingCount = orders.filter((o) => o.status !== 'DELIVERED' && o.status !== 'CANCELLED').length;
  const sellersCount = users.filter((u) => u.role === 'seller').length;
  const partnersCount = users.filter((u) => u.role === 'partner').length;
  const totalGmv = orders.reduce((acc, o) => acc + (o.totalFee * 4), 18450);

  const handleSaveRates = (e: React.FormEvent) => {
    e.preventDefault();
    updateRateCard(editingRates);
  };

  const handleResolveComplaint = (id: string) => {
    setComplaints((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'Resolved' } : c))
    );
    showToast('Complaint resolved and customer notified via SMS.');
  };

  return (
    <div className="space-y-8">
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white rounded-2xl p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Maharashtra State Operations & Logistics Control Hub</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              State Control Room · GramConnect Admin
            </h1>
            <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-xl">
              Nodal monitoring of all rural last-mile parcel flows, fleet capacity, seller onboarding, and rural tariff governance across Maharashtra districts.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-3 py-1.5 rounded-lg font-mono">
              Network Status: 100% Operational
            </span>
          </div>
        </div>

        {/* Global KPI Strip */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-8 pt-6 border-t border-slate-700/80 text-white">
          <div className="bg-white/5 p-3.5 rounded-xl border border-white/10">
            <span className="text-xs text-slate-400 block">Total Orders</span>
            <span className="text-2xl font-bold font-mono">{totalOrdersCount}</span>
            <span className="text-[11px] text-emerald-400 block mt-0.5">All 36 Districts</span>
          </div>
          <div className="bg-white/5 p-3.5 rounded-xl border border-white/10">
            <span className="text-xs text-slate-400 block">Delivered</span>
            <span className="text-2xl font-bold font-mono text-emerald-400">{successfulCount}</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">98.4% Fulfillment</span>
          </div>
          <div className="bg-white/5 p-3.5 rounded-xl border border-white/10">
            <span className="text-xs text-slate-400 block">In Transit</span>
            <span className="text-2xl font-bold font-mono text-amber-300">{pendingCount}</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">EV Fleet En Route</span>
          </div>
          <div className="bg-white/5 p-3.5 rounded-xl border border-white/10">
            <span className="text-xs text-slate-400 block">Active Sellers</span>
            <span className="text-2xl font-bold font-mono text-white">{sellersCount}</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">SHGs & Artisans</span>
          </div>
          <div className="bg-white/5 p-3.5 rounded-xl border border-white/10">
            <span className="text-xs text-slate-400 block">Courier Fleet</span>
            <span className="text-2xl font-bold font-mono text-emerald-300">{partnersCount}</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Verified Riders</span>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-4 border-t border-slate-800">
          {[
            { id: 'overview', label: 'Dashboard Overview' },
            { id: 'orders', label: `Shipments (${orders.length})` },
            { id: 'users', label: `Users & Fleets (${users.length})` },
            { id: 'rates', label: 'Rural Tariff Card' },
            { id: 'complaints', label: `Complaints (${complaints.filter(c => c.status === 'Open').length} Open)` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
            <h2 className="text-base font-bold text-slate-900">
              Live Maharashtra Corridor Parcel Flow
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 uppercase font-semibold">
                    <th className="py-2.5 px-3">Order ID</th>
                    <th className="py-2.5 px-3">Origin ➔ Destination</th>
                    <th className="py-2.5 px-3">Courier Rider</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-right">Live View</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {orders.map((o) => (
                    <tr key={o.id} className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 font-mono font-bold text-slate-900">{o.trackingNumber}</td>
                      <td className="py-2.5 px-3">
                        {o.pickup.village} ➔ {o.destination.village}
                      </td>
                      <td className="py-2.5 px-3 text-slate-600">{o.partnerName || 'Pending Assignment'}</td>
                      <td className="py-2.5 px-3">
                        <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                          {t(o.status)}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <button
                          onClick={() => openTrackingModal(o)}
                          className="text-xs text-emerald-800 hover:text-emerald-900 font-semibold"
                        >
                          View GPS
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900">Rural Operational Highlights</h3>
            <div className="space-y-3 text-xs text-slate-600">
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                <span className="font-semibold text-emerald-950 block">Baramati Milk-Run Route:</span>
                <span>Combined batching route reduced logistics cost by 42% for 6 rural artisan SHGs today.</span>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                <span className="font-semibold text-blue-950 block">Electric Fleet Integration:</span>
                <span>84% of Western Maharashtra taluka dispatches are currently powered by electric 2-wheelers.</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-semibold text-slate-900 block">Cash on Delivery Settlement:</span>
                <span>100% of COD collections reconciled instantly to farmer bank accounts via UPI.</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Orders Management Tab */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <h2 className="text-base font-bold text-slate-900">Platform Shipments & Dispatches</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 uppercase font-semibold">
                  <th className="py-3 px-3">Tracking</th>
                  <th className="py-3 px-3">Seller</th>
                  <th className="py-3 px-3">Customer</th>
                  <th className="py-3 px-3">Service</th>
                  <th className="py-3 px-3">Weight</th>
                  <th className="py-3 px-3">Fee</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-slate-50">
                    <td className="py-3 px-3 font-mono font-bold text-slate-900">{o.trackingNumber}</td>
                    <td className="py-3 px-3 font-medium text-slate-900">{o.sellerName}</td>
                    <td className="py-3 px-3 text-slate-600">{o.customerName}</td>
                    <td className="py-3 px-3 font-mono text-slate-500">{o.deliveryType}</td>
                    <td className="py-3 px-3 font-mono">{o.packageWeightKg} kg</td>
                    <td className="py-3 px-3 font-mono font-bold text-emerald-800">₹{o.totalFee}</td>
                    <td className="py-3 px-3">
                      <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                        {t(o.status)}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => openTrackingModal(o)}
                        className="px-2.5 py-1 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-medium"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <h2 className="text-base font-bold text-slate-900">Registered Users & Logistics Partners</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {users.map((u) => (
              <div key={u.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center gap-3">
                <img
                  src={u.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80'}
                  alt={u.name}
                  className="w-12 h-12 rounded-xl object-cover border border-slate-300"
                />
                <div className="flex-1 min-w-0 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 truncate">{u.name}</span>
                    <span className="uppercase text-[10px] font-mono px-2 py-0.5 rounded bg-white border border-slate-200">
                      {u.role}
                    </span>
                  </div>
                  <div className="text-slate-500 mt-0.5">{u.village}, Taluka {u.taluka}, {u.district}</div>
                  <div className="text-slate-400 font-mono text-[11px] mt-0.5">{u.phone} · {u.email}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Rural Tariff Card Tab */}
      {activeTab === 'rates' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
          <div>
            <h2 className="text-base font-bold text-slate-900">GramConnect Rural Delivery Tariff Card</h2>
            <p className="text-xs text-slate-500">
              Configure affordable rates for intra-village, tehsil connection, and weight slabs across Maharashtra.
            </p>
          </div>

          <form onSubmit={handleSaveRates} className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <label className="block font-semibold text-slate-700">Intra-Village Base Fare (₹)</label>
              <input
                type="number"
                value={editingRates.baseFeeVillageToVillage}
                onChange={(e) =>
                  setEditingRates({ ...editingRates, baseFeeVillageToVillage: Number(e.target.value) })
                }
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg font-mono text-base font-bold"
              />
              <span className="text-[11px] text-slate-500 block">Covers up to 5 km village-to-village transit</span>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <label className="block font-semibold text-slate-700">Tehsil Hub Base Fare (₹)</label>
              <input
                type="number"
                value={editingRates.baseFeeTehsilHub}
                onChange={(e) =>
                  setEditingRates({ ...editingRates, baseFeeTehsilHub: Number(e.target.value) })
                }
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg font-mono text-base font-bold"
              />
              <span className="text-[11px] text-slate-500 block">Tehsil center consolidation</span>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <label className="block font-semibold text-slate-700">Combined Batch Discount (%)</label>
              <input
                type="number"
                value={editingRates.batchDiscountPercent}
                onChange={(e) =>
                  setEditingRates({ ...editingRates, batchDiscountPercent: Number(e.target.value) })
                }
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg font-mono text-base font-bold text-emerald-800"
              />
              <span className="text-[11px] text-slate-500 block">Incentive for pooled deliveries</span>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <label className="block font-semibold text-slate-700">Per-Kg Weight Surcharge (₹/kg)</label>
              <input
                type="number"
                value={editingRates.perKgRate}
                onChange={(e) =>
                  setEditingRates({ ...editingRates, perKgRate: Number(e.target.value) })
                }
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg font-mono text-base font-bold"
              />
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <label className="block font-semibold text-slate-700">Per-Km Distance Surcharge (₹/km)</label>
              <input
                type="number"
                value={editingRates.perKmRate}
                onChange={(e) =>
                  setEditingRates({ ...editingRates, perKmRate: Number(e.target.value) })
                }
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg font-mono text-base font-bold"
              />
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <label className="block font-semibold text-slate-700">Express Agro Base (₹)</label>
              <input
                type="number"
                value={editingRates.baseFeeExpress}
                onChange={(e) =>
                  setEditingRates({ ...editingRates, baseFeeExpress: Number(e.target.value) })
                }
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg font-mono text-base font-bold"
              />
            </div>

            <div className="md:col-span-3 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold rounded-lg shadow-sm"
              >
                Save New Tariff Card
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Complaints Tab */}
      {activeTab === 'complaints' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <h2 className="text-base font-bold text-slate-900">Support Inquiries & Complaints</h2>
          <div className="space-y-3">
            {complaints.map((c) => (
              <div
                key={c.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-900">{c.orderId}</span>
                    <span className="text-slate-400">·</span>
                    <span className="font-medium text-slate-700">{c.senderName}</span>
                    <span className="text-slate-400 font-mono">({c.date})</span>
                  </div>
                  <p className="text-slate-600">{c.issue}</p>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-0.5 rounded text-[11px] font-medium ${
                    c.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {c.status}
                  </span>
                  {c.status === 'Open' && (
                    <button
                      onClick={() => handleResolveComplaint(c.id)}
                      className="px-3 py-1 bg-emerald-800 hover:bg-emerald-900 text-white font-medium rounded-lg"
                    >
                      Resolve & Notify
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
