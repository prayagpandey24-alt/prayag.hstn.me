import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShoppingBag,
  Package,
  Star,
  MapPin,
  Truck,
  CheckCircle2,
  Clock,
  Navigation,
  ArrowRight,
  Filter,
  Search,
} from 'lucide-react';

export const CustomerDashboard: React.FC = () => {
  const {
    currentUser,
    orders,
    products,
    openBookingModal,
    openTrackingModal,
    rateOrder,
    t,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'my-orders' | 'browse'>('my-orders');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Rating modal state
  const [ratingOrder, setRatingOrder] = useState<string | null>(null);
  const [stars, setStars] = useState(5);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  // Customer orders
  const myOrders = orders.filter((o) => o.customerId === currentUser.id || o.customerName === currentUser.name);

  // Filtered products
  const filteredProducts = products.filter((p) => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.nameMarathi && p.nameMarathi.includes(searchQuery)) ||
      p.village.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleRateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ratingOrder) {
      rateOrder(ratingOrder, stars, feedbackMsg);
      setRatingOrder(null);
      setFeedbackMsg('');
    }
  };

  return (
    <div className="space-y-8">
      {/* Customer Header */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-2xl p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-300 uppercase tracking-wider mb-2">
              <MapPin className="w-3.5 h-3.5" />
              <span>Direct Farm-to-Fork & Artisan Delivery · Maharashtra</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Namaste, {currentUser.name}
            </h1>
            <p className="text-xs md:text-sm text-emerald-200 mt-1 max-w-xl">
              Buy directly from verified rural women SHGs, organic sugarcane farmers, and Sahyadri artisans with reliable last-mile village delivery.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('browse')}
              className="px-4 py-2 text-xs font-semibold text-emerald-950 bg-emerald-300 hover:bg-emerald-200 rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Browse Rural Market</span>
            </button>
            <button
              onClick={() => setActiveTab('my-orders')}
              className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-600 rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
            >
              <Package className="w-4 h-4" />
              <span>My Orders ({myOrders.length})</span>
            </button>
          </div>
        </div>

        {/* Quick Tabs */}
        <div className="flex items-center gap-2 mt-8 pt-4 border-t border-emerald-700/60">
          <button
            onClick={() => setActiveTab('my-orders')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'my-orders'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-emerald-200 hover:text-white'
            }`}
          >
            My Active & Past Deliveries ({myOrders.length})
          </button>
          <button
            onClick={() => setActiveTab('browse')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'browse'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-emerald-200 hover:text-white'
            }`}
          >
            Explore Artisanal Products ({products.length})
          </button>
        </div>
      </div>

      {activeTab === 'my-orders' ? (
        /* My Orders View */
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Delivery Orders & Tracking History
              </h2>
              <p className="text-xs text-slate-500">
                Real-time tracking of shipments dispatched from rural producers to your destination.
              </p>
            </div>
          </div>

          {myOrders.length === 0 ? (
            <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200 text-xs text-slate-500 space-y-3">
              <div>You haven't placed any rural delivery orders yet.</div>
              <button
                onClick={() => setActiveTab('browse')}
                className="px-4 py-2 bg-emerald-800 text-white rounded-lg font-medium inline-flex items-center gap-1.5"
              >
                <span>Browse Products & Order</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {myOrders.map((ord) => (
                <div
                  key={ord.id}
                  className="border border-slate-200 rounded-xl p-5 bg-white space-y-4 hover:border-slate-300 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                        <Package className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-slate-900">
                            {ord.trackingNumber}
                          </span>
                          <span className="text-[11px] text-slate-500">· {ord.createdAt}</span>
                        </div>
                        <div className="text-xs font-bold text-slate-900 mt-0.5">
                          {ord.productName}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2.5 py-1 rounded font-medium ${
                        ord.status === 'DELIVERED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : ord.status === 'IN_TRANSIT'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {t(ord.status)}
                      </span>
                      <button
                        onClick={() => openTrackingModal(ord)}
                        className="px-3 py-1 text-xs font-semibold text-emerald-800 bg-white border border-emerald-300 hover:bg-emerald-50 rounded-lg inline-flex items-center gap-1 shadow-2xs transition-colors"
                      >
                        <Navigation className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Live GPS</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                      <span className="text-slate-400 block text-[11px]">Dispatched By</span>
                      <span className="font-medium text-slate-900 block mt-0.5">{ord.sellerName}</span>
                      <span className="text-slate-500 text-[11px]">{ord.pickup.village}, {ord.pickup.district}</span>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                      <span className="text-slate-400 block text-[11px]">Rider & OTP</span>
                      <span className="font-medium text-slate-900 block mt-0.5">
                        {ord.partnerName || 'Assigning nearest rider...'}
                      </span>
                      <span className="text-emerald-800 font-mono font-bold text-[11px]">
                        Your Delivery OTP: {ord.deliveryOtp}
                      </span>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                      <span className="text-slate-400 block text-[11px]">Payment & Delivery Tariff</span>
                      <span className="font-mono font-bold text-slate-900 block mt-0.5">₹{ord.totalFee}</span>
                      <span className="text-slate-500 text-[11px]">{ord.paymentMode} ({ord.paymentStatus})</span>
                    </div>
                  </div>

                  {/* Feedback button if delivered */}
                  {ord.status === 'DELIVERED' && (
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                      {ord.rating ? (
                        <div className="flex items-center gap-2 text-slate-700">
                          <span className="text-amber-500 font-bold">★ {ord.rating} Stars Given:</span>
                          <span className="italic text-slate-600">"{ord.feedback || 'Great delivery!'}"</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => setRatingOrder(ord.id)}
                          className="text-emerald-800 hover:text-emerald-900 font-semibold inline-flex items-center gap-1.5"
                        >
                          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                          <span>Leave Rating & Review for Producer</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Browse Products Grid */
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Direct Rural Marketplace
              </h2>
              <p className="text-xs text-slate-500">
                Products sourced straight from Maharashtra villages without intermediaries.
              </p>
            </div>

            {/* Filter controls */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  placeholder="Search jaggery, honey, chappal..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-600 w-56"
                />
              </div>

              <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
                {['All', 'Agro & Grains', 'Dairy & Jaggery', 'Handicrafts', 'Honey & Preserves'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                      selectedCategory === cat
                        ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                className="border border-slate-200 rounded-xl overflow-hidden bg-white flex flex-col justify-between hover:shadow-md transition-all group"
              >
                <div className="relative h-44 bg-slate-100 overflow-hidden">
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2.5 right-2.5 bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded text-[11px] font-mono font-bold text-emerald-900 shadow-xs">
                    ₹{p.price}
                  </div>
                  <div className="absolute bottom-2.5 left-2.5 bg-slate-900/80 backdrop-blur-xs px-2 py-0.5 rounded text-[10px] text-white">
                    📍 {p.village}, {p.district}
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider">
                      {p.category}
                    </span>
                    <h3 className="text-xs font-bold text-slate-900 mt-1 leading-snug">
                      {p.name}
                    </h3>
                    {p.nameMarathi && (
                      <div className="text-[11px] text-slate-600 font-medium">
                        {p.nameMarathi}
                      </div>
                    )}
                    <p className="text-[11px] text-slate-500 mt-1.5 line-clamp-2">
                      {p.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-slate-400 block">Producer</span>
                      <span className="text-xs font-semibold text-slate-800 truncate block max-w-[130px]">
                        {p.sellerName}
                      </span>
                    </div>

                    <button
                      onClick={() => openBookingModal(p)}
                      className="px-3.5 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-semibold flex items-center gap-1 shadow-2xs transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Order (₹{p.price})</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Customer Rating Modal */}
      {ratingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 bg-emerald-900 text-white flex items-center justify-between">
              <h3 className="text-base font-semibold">Rate Your Rural Order</h3>
              <button onClick={() => setRatingOrder(null)} className="text-white/80 hover:text-white">✕</button>
            </div>
            <form onSubmit={handleRateSubmit} className="p-6 space-y-4 text-xs">
              <div className="space-y-1">
                <label className="block font-medium text-slate-700">How satisfied were you with this delivery?</label>
                <div className="flex items-center gap-2 pt-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setStars(s)}
                      className={`p-1.5 rounded ${stars >= s ? 'text-amber-500' : 'text-slate-300'}`}
                    >
                      <Star className="w-6 h-6 fill-current" />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-slate-800 ml-2">{stars} Stars</span>
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Feedback Comments</label>
                <textarea
                  rows={3}
                  required
                  value={feedbackMsg}
                  onChange={(e) => setFeedbackMsg(e.target.value)}
                  placeholder="Tell the artisan and delivery team how they did..."
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setRatingOrder(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-medium rounded-lg"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
