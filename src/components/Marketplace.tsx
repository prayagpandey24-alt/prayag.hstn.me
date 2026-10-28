import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShoppingBag,
  Search,
  Filter,
  MapPin,
  Truck,
  ShieldCheck,
  Star,
  ArrowRight,
} from 'lucide-react';
import { Product } from '../types';

export const Marketplace: React.FC = () => {
  const { products, openBookingModal } = useApp();
  const [selectedCat, setSelectedCat] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Agro & Grains', 'Dairy & Jaggery', 'Handicrafts', 'Honey & Preserves', 'Textiles'];

  const filtered = products.filter((p) => {
    const matchCat = selectedCat === 'All' || p.category === selectedCat;
    const matchSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.nameMarathi && p.nameMarathi.includes(searchQuery)) ||
      p.village.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.district.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Marketplace Header */}
        <div className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white p-8 rounded-2xl shadow-sm">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs uppercase font-semibold text-emerald-300 tracking-wider">
              Maharashtra Rural Producers Directory
            </span>
            <h1 className="text-3xl font-bold tracking-tight">
              Rural Marketplace · Direct Village Dispatches
            </h1>
            <p className="text-xs md:text-sm text-slate-300">
              Support rural entrepreneurs, organic sugarcane farmers, and traditional artisans. Delivered to your doorstep with transparent tracking and low last-mile delivery rates.
            </p>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search jaggery, Kolhapuri chappal, raw honey, village..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-600"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCat(c)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  selectedCat === c
                    ? 'bg-emerald-800 text-white shadow-2xs font-semibold'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filtered.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="relative h-48 bg-slate-100 overflow-hidden">
                <img
                  src={prod.imageUrl}
                  alt={prod.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-lg text-xs font-mono font-bold text-emerald-900 shadow-xs">
                  ₹{prod.price}
                </div>
                <div className="absolute bottom-3 left-3 bg-slate-900/85 backdrop-blur-xs px-2.5 py-1 rounded-lg text-[10px] text-white flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-emerald-400" />
                  <span>{prod.village}, {prod.district}</span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                    {prod.category} · {prod.weightKg} kg
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 leading-snug">
                    {prod.name}
                  </h3>
                  {prod.nameMarathi && (
                    <div className="text-xs text-slate-600 font-medium">
                      {prod.nameMarathi}
                    </div>
                  )}
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                    {prod.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-xs">
                    <span className="text-slate-400 block text-[11px]">Producer</span>
                    <span className="font-semibold text-slate-800 truncate block max-w-[140px]">
                      {prod.sellerName}
                    </span>
                  </div>

                  <button
                    onClick={() => openBookingModal(prod)}
                    className="px-3.5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-colors"
                  >
                    <Truck className="w-3.5 h-3.5" />
                    <span>Order with Delivery</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
