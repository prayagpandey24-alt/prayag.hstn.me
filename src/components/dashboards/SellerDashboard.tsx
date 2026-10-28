import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Package,
  PlusCircle,
  Truck,
  CheckCircle2,
  Clock,
  TrendingUp,
  MapPin,
  Eye,
  Trash2,
  Navigation,
} from 'lucide-react';
import { Product } from '../../types';

export const SellerDashboard: React.FC = () => {
  const {
    currentUser,
    orders,
    products,
    addProduct,
    deleteProduct,
    openBookingModal,
    openTrackingModal,
    t,
  } = useApp();

  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdNameMr, setNewProdNameMr] = useState('');
  const [newProdPrice, setNewProdPrice] = useState<number>(200);
  const [newProdWeight, setNewProdWeight] = useState<number>(1.0);
  const [newProdQty, setNewProdQty] = useState<number>(25);
  const [newProdCat, setNewProdCat] = useState<Product['category']>('Agro & Grains');
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdVillage, setNewProdVillage] = useState(currentUser.village || 'Baramati');
  const [newProdDist, setNewProdDist] = useState(currentUser.district || 'Pune');

  // Filter orders related to this seller
  const sellerOrders = orders.filter((o) => o.sellerId === currentUser.id);
  const sellerProducts = products.filter((p) => p.sellerId === currentUser.id);

  const completedCount = sellerOrders.filter((o) => o.status === 'DELIVERED').length;
  const inTransitCount = sellerOrders.filter(
    (o) => o.status === 'IN_TRANSIT' || o.status === 'OUT_FOR_DELIVERY' || o.status === 'PICKUP_SCHEDULED'
  ).length;
  const pendingCount = sellerOrders.filter((o) => o.status === 'ORDER_PLACED').length;
  
  const totalRevenue = sellerOrders
    .filter((o) => o.paymentStatus === 'Paid')
    .reduce((acc, o) => acc + (o.totalFee * 3), 4200); // realistic revenue representation

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct({
      name: newProdName,
      nameMarathi: newProdNameMr || undefined,
      category: newProdCat,
      price: Number(newProdPrice),
      weightKg: Number(newProdWeight),
      quantity: Number(newProdQty),
      village: newProdVillage,
      district: newProdDist,
      description: newProdDesc,
      imageUrl: '/src/assets/images/rural_products_artisan_1791645764713.jpg',
      inStock: true,
    });
    setIsAddProductOpen(false);
    setNewProdName('');
    setNewProdNameMr('');
    setNewProdDesc('');
  };

  return (
    <div className="space-y-8">
      {/* Seller Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-slate-900 text-white rounded-2xl p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-300 uppercase tracking-wider mb-2">
              <MapPin className="w-3.5 h-3.5" />
              <span>{currentUser.village}, Taluka {currentUser.taluka}, {currentUser.district}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              {currentUser.businessName || currentUser.name}
            </h1>
            <p className="text-xs md:text-sm text-emerald-200 mt-1 max-w-xl">
              Manage your rural goods inventory, request instant village pickups, and track dispatches across Maharashtra.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsAddProductOpen(true)}
              className="px-4 py-2 text-xs font-semibold text-emerald-950 bg-emerald-300 hover:bg-emerald-200 rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add New Product</span>
            </button>
            <button
              onClick={() => openBookingModal()}
              className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-600 rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
            >
              <Truck className="w-4 h-4" />
              <span>Book Rural Delivery</span>
            </button>
          </div>
        </div>

        {/* KPI Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-emerald-700/60 text-white">
          <div className="bg-white/10 p-4 rounded-xl backdrop-blur-xs">
            <span className="text-xs text-emerald-200 block">Total Deliveries</span>
            <span className="text-2xl font-bold font-mono">{sellerOrders.length}</span>
            <span className="text-[11px] text-emerald-300 block mt-0.5">Across 4 talukas</span>
          </div>
          <div className="bg-white/10 p-4 rounded-xl backdrop-blur-xs">
            <span className="text-xs text-emerald-200 block">Active In-Transit</span>
            <span className="text-2xl font-bold font-mono text-amber-300">{inTransitCount}</span>
            <span className="text-[11px] text-emerald-300 block mt-0.5">Assigned to EV fleet</span>
          </div>
          <div className="bg-white/10 p-4 rounded-xl backdrop-blur-xs">
            <span className="text-xs text-emerald-200 block">Completed</span>
            <span className="text-2xl font-bold font-mono text-emerald-300">{completedCount}</span>
            <span className="text-[11px] text-emerald-300 block mt-0.5">OTP verified</span>
          </div>
          <div className="bg-white/10 p-4 rounded-xl backdrop-blur-xs">
            <span className="text-xs text-emerald-200 block">Gross Sales Realized</span>
            <span className="text-2xl font-bold font-mono">₹{totalRevenue.toLocaleString()}</span>
            <span className="text-[11px] text-emerald-300 block mt-0.5">Via COD & GramPay</span>
          </div>
        </div>
      </div>

      {/* Add Product Modal Overlay */}
      {isAddProductOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 bg-emerald-900 text-white flex items-center justify-between">
              <h3 className="text-base font-semibold">Add Rural Product to Catalog</h3>
              <button
                onClick={() => setIsAddProductOpen(false)}
                className="text-white/80 hover:text-white"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleCreateProduct} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Product Name (English)</label>
                <input
                  type="text"
                  required
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  placeholder="e.g. Pure Desi Gir Cow Ghee (१ लिटर)"
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:border-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Name in Marathi (Optional)</label>
                <input
                  type="text"
                  value={newProdNameMr}
                  onChange={(e) => setNewProdNameMr(e.target.value)}
                  placeholder="उदा. शुद्ध गावरान तूप"
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:border-emerald-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    required
                    min="10"
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:border-emerald-600 focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Unit Weight (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={newProdWeight}
                    onChange={(e) => setNewProdWeight(parseFloat(e.target.value) || 0.5)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:border-emerald-600 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    required
                    value={newProdQty}
                    onChange={(e) => setNewProdQty(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:border-emerald-600 focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Category</label>
                  <select
                    value={newProdCat}
                    onChange={(e) => setNewProdCat(e.target.value as any)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:border-emerald-600 focus:outline-none"
                  >
                    <option value="Agro & Grains">Agro & Grains</option>
                    <option value="Dairy & Jaggery">Dairy & Jaggery</option>
                    <option value="Honey & Preserves">Honey & Preserves</option>
                    <option value="Handicrafts">Handicrafts</option>
                    <option value="Textiles">Textiles</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Short Description & Origin Story</label>
                <textarea
                  rows={3}
                  value={newProdDesc}
                  onChange={(e) => setNewProdDesc(e.target.value)}
                  placeholder="Prepared by village artisans, traditional wood-fired processing..."
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:border-emerald-600 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsAddProductOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-medium rounded-lg"
                >
                  Save & Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Active Orders Management */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Active Outbound Deliveries
            </h2>
            <p className="text-xs text-slate-500">
              Track parcel progression, assigned electric courier partner, and customer delivery OTPs.
            </p>
          </div>

          <button
            onClick={() => openBookingModal()}
            className="text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-200 flex items-center gap-1.5 transition-colors"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>New Booking</span>
          </button>
        </div>

        {sellerOrders.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200 text-xs text-slate-500">
            No active delivery orders yet. Click "Book Rural Delivery" above to initiate your first shipment!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
                  <th className="py-3 px-3">Tracking ID</th>
                  <th className="py-3 px-3">Consignee & Destination</th>
                  <th className="py-3 px-3">Product / Weight</th>
                  <th className="py-3 px-3">Tariff & Mode</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sellerOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-3">
                      <div className="font-mono font-bold text-slate-900">{ord.trackingNumber}</div>
                      <div className="text-[11px] text-slate-400">{ord.createdAt}</div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-medium text-slate-900">{ord.customerName}</div>
                      <div className="text-slate-500 text-[11px]">{ord.destination.village}, {ord.destination.district}</div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="text-slate-900 font-medium">{ord.productName}</div>
                      <div className="text-slate-500 font-mono text-[11px]">{ord.packageWeightKg} kg</div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-mono font-bold text-emerald-800">₹{ord.totalFee}</div>
                      <div className="text-[11px] text-slate-500">{ord.paymentMode}</div>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium ${
                        ord.status === 'DELIVERED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : ord.status === 'IN_TRANSIT'
                          ? 'bg-blue-100 text-blue-800'
                          : ord.status === 'PICKUP_SCHEDULED'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-100 text-slate-800'
                      }`}>
                        {t(ord.status)}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => openTrackingModal(ord)}
                        className="px-2.5 py-1 text-xs font-semibold text-emerald-800 bg-white border border-emerald-300 hover:bg-emerald-50 rounded-lg inline-flex items-center gap-1 shadow-2xs transition-colors"
                      >
                        <Navigation className="w-3 h-3 text-emerald-700" />
                        <span>Live GPS</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Seller Products Catalog Grid */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Listed Rural Goods ({sellerProducts.length})
            </h2>
            <p className="text-xs text-slate-500">
              Products manufactured or harvested at your village unit available for direct dispatch.
            </p>
          </div>
          <button
            onClick={() => setIsAddProductOpen(true)}
            className="text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-200 flex items-center gap-1.5 transition-colors"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Add Product</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sellerProducts.map((prod) => (
            <div
              key={prod.id}
              className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 flex flex-col justify-between hover:border-slate-300 transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-emerald-800 block">
                      {prod.category}
                    </span>
                    <h3 className="text-xs font-bold text-slate-900 leading-snug">
                      {prod.name}
                    </h3>
                    {prod.nameMarathi && (
                      <span className="text-[11px] text-slate-600 block mt-0.5 font-medium">
                        {prod.nameMarathi}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => deleteProduct(prod.id)}
                    className="text-slate-400 hover:text-rose-600 p-1"
                    title="Remove Product"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <p className="text-[11px] text-slate-500 line-clamp-2">
                  {prod.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200/80 mt-3 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold font-mono text-slate-900">₹{prod.price}</span>
                  <span className="text-[10px] text-slate-500 block font-mono">Weight: {prod.weightKg} kg</span>
                </div>

                <button
                  onClick={() => openBookingModal(prod)}
                  className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-medium flex items-center gap-1 shadow-2xs transition-colors"
                >
                  <Truck className="w-3 h-3" />
                  <span>Dispatch Delivery</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
