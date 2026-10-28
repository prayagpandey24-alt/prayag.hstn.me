import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { MAHARASHTRA_VILLAGE_NODES } from '../data/initialData';
import { DeliveryType } from '../types';
import {
  X,
  Truck,
  Package,
  MapPin,
  Calculator,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export const BookingFormModal: React.FC = () => {
  const {
    isBookingModalOpen,
    setIsBookingModalOpen,
    bookingPrefillProduct,
    bookDelivery,
    rateCard,
    currentUser,
    openTrackingModal,
  } = useApp();

  const [pickupVillage, setPickupVillage] = useState('Baramati');
  const [pickupAddress, setPickupAddress] = useState('Gat 44, Agro Workshop Center');
  const [destVillage, setDestVillage] = useState('Pune Shivajinagar');
  const [destAddress, setDestAddress] = useState('Flat 204, Model Colony');
  const [recipientName, setRecipientName] = useState('Anjali Kulkarni');
  const [recipientPhone, setRecipientPhone] = useState('+91 98811 54320');
  
  const [productName, setProductName] = useState('Artisanal Rural Products Pack');
  const [weightKg, setWeightKg] = useState<number>(1.5);
  const [packageNotes, setPackageNotes] = useState('Fragile organic farm produce');
  const [deliveryType, setDeliveryType] = useState<DeliveryType>('combined_batch');
  const [paymentMode, setPaymentMode] = useState<'Cash on Delivery (COD)' | 'UPI' | 'GramPay Wallet'>('Cash on Delivery (COD)');

  // Auto-fill when product selected from marketplace
  useEffect(() => {
    if (bookingPrefillProduct) {
      setProductName(bookingPrefillProduct.name);
      setWeightKg(bookingPrefillProduct.weightKg);
      setPickupVillage(bookingPrefillProduct.village || 'Baramati');
      setPackageNotes(`${bookingPrefillProduct.category} - Packed by ${bookingPrefillProduct.sellerName}`);
    } else if (currentUser.role === 'seller') {
      setPickupVillage(currentUser.village || 'Malegaon Budruk');
    }
  }, [bookingPrefillProduct, currentUser]);

  if (!isBookingModalOpen) return null;

  // Find coordinates
  const pickupNode = MAHARASHTRA_VILLAGE_NODES.find((n) => n.name === pickupVillage) || MAHARASHTRA_VILLAGE_NODES[0];
  const destNode = MAHARASHTRA_VILLAGE_NODES.find((n) => n.name === destVillage) || MAHARASHTRA_VILLAGE_NODES[8];

  // Rough distance calculation
  const dx = (destNode.lat - pickupNode.lat) * 111;
  const dy = (destNode.lng - pickupNode.lng) * 105;
  const rawDist = Math.max(12, Math.round(Math.sqrt(dx * dx + dy * dy)));

  // Calculate pricing based on rateCard
  let baseRate = rateCard.baseFeeVillageToVillage;
  if (deliveryType === 'tehsil_hub') baseRate = rateCard.baseFeeTehsilHub;
  if (deliveryType === 'express') baseRate = rateCard.baseFeeExpress;
  if (deliveryType === 'combined_batch') baseRate = rateCard.baseFeeTehsilHub;

  const weightFee = Math.round(weightKg * rateCard.perKgRate);
  const distanceFee = Math.round(rawDist * rateCard.perKmRate * 0.4); // rural pooled tariff
  const grossTotal = baseRate + weightFee + distanceFee;
  const discount = deliveryType === 'combined_batch' ? Math.round(grossTotal * (rateCard.batchDiscountPercent / 100)) : 0;
  const finalFee = Math.max(25, grossTotal - discount);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const createdOrder = bookDelivery({
      productName,
      packageWeightKg: Number(weightKg),
      packageDescription: packageNotes,
      customerName: recipientName,
      customerPhone: recipientPhone,
      pickup: {
        title: `${pickupVillage} Pickup Hub`,
        address: pickupAddress,
        village: pickupNode.name,
        taluka: pickupNode.taluka,
        district: pickupNode.district,
        lat: pickupNode.lat,
        lng: pickupNode.lng,
      },
      destination: {
        title: `${destVillage} Delivery Point`,
        address: destAddress,
        village: destNode.name,
        taluka: destNode.taluka,
        district: destNode.district,
        lat: destNode.lat,
        lng: destNode.lng,
      },
      deliveryType,
      baseFee: baseRate,
      weightFee,
      distanceKm: rawDist,
      discount,
      totalFee: finalFee,
      paymentMode,
    });

    setIsBookingModalOpen(false);
    // Directly open live tracking for immediate satisfaction
    openTrackingModal(createdOrder);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-emerald-900 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <Truck className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h3 className="text-lg font-semibold tracking-tight">
                Book Rural Delivery Request
              </h3>
              <p className="text-xs text-emerald-200">
                GramConnect Micro-Logistics Network · Maharashtra Sector
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsBookingModalOpen(false)}
            className="text-white/80 hover:text-white p-1 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 max-h-[82vh] overflow-y-auto space-y-6">
          
          {/* Pickup & Destination */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
            {/* Pickup */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider">
                <MapPin className="w-4 h-4 text-emerald-700" />
                <span>Pickup Origin (Village/Taluka)</span>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Select Village / Hub</label>
                <select
                  value={pickupVillage}
                  onChange={(e) => setPickupVillage(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600 font-medium"
                >
                  {MAHARASHTRA_VILLAGE_NODES.map((n) => (
                    <option key={n.name} value={n.name}>
                      {n.name} ({n.taluka}, {n.district}) - {n.hubType}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Farm / Workshop Address</label>
                <input
                  type="text"
                  required
                  value={pickupAddress}
                  onChange={(e) => setPickupAddress(e.target.value)}
                  placeholder="Gat no, Landmark, Near Grampanchayat"
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600"
                />
              </div>
            </div>

            {/* Destination */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-900 uppercase tracking-wider">
                <MapPin className="w-4 h-4 text-blue-800" />
                <span>Delivery Destination</span>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Destination Village / City</label>
                <select
                  value={destVillage}
                  onChange={(e) => setDestVillage(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600 font-medium"
                >
                  {MAHARASHTRA_VILLAGE_NODES.map((n) => (
                    <option key={n.name} value={n.name}>
                      {n.name} ({n.taluka}, {n.district})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Consignee Street Address</label>
                <input
                  type="text"
                  required
                  value={destAddress}
                  onChange={(e) => setDestAddress(e.target.value)}
                  placeholder="Flat/House no., Colony, Near Landmark"
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600"
                />
              </div>
            </div>
          </div>

          {/* Consignee Contact & Product Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Recipient Info</h4>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Customer / Buyer Name</label>
                <input
                  type="text"
                  required
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Mobile Phone (for OTP & SMS)</label>
                <input
                  type="tel"
                  required
                  value={recipientPhone}
                  onChange={(e) => setRecipientPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600 font-mono"
                />
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Package Specification</h4>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Weight (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0.1"
                    max="50"
                    required
                    value={weightKg}
                    onChange={(e) => setWeightKg(parseFloat(e.target.value) || 0.5)}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Special Handling</label>
                  <input
                    type="text"
                    value={packageNotes}
                    onChange={(e) => setPackageNotes(e.target.value)}
                    placeholder="e.g. Glass jar, perishable"
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Service Type Selection */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Choose Rural Delivery Service Type
            </label>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2.5">
              {[
                {
                  id: 'village_to_village',
                  title: 'Gram-to-Gram Direct',
                  desc: 'Village to adjacent village delivery',
                  badge: 'Starts ₹30',
                },
                {
                  id: 'combined_batch',
                  title: 'Combined Batch',
                  desc: 'Pooled milk-run route saving 35%',
                  badge: 'Recommended',
                },
                {
                  id: 'tehsil_hub',
                  title: 'Tehsil to City Hub',
                  desc: 'Drop at district/railway consolidation',
                  badge: 'Standard',
                },
                {
                  id: 'express',
                  title: 'Agro Express',
                  desc: 'Same-day emergency farm supply/goods',
                  badge: 'Same Day',
                },
              ].map((svc) => (
                <button
                  key={svc.id}
                  type="button"
                  onClick={() => setDeliveryType(svc.id as DeliveryType)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    deliveryType === svc.id
                      ? 'border-emerald-700 bg-emerald-50 text-slate-900 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-semibold text-emerald-800">{svc.badge}</span>
                    {deliveryType === svc.id && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />}
                  </div>
                  <div className="text-xs font-bold text-slate-900">{svc.title}</div>
                  <div className="text-[11px] text-slate-500 mt-1">{svc.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Payment Settlement
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                'Cash on Delivery (COD)',
                'UPI',
                'GramPay Wallet',
              ].map((pm) => (
                <label
                  key={pm}
                  className={`flex items-center gap-2 p-2.5 rounded-lg border text-xs cursor-pointer ${
                    paymentMode === pm
                      ? 'border-emerald-700 bg-emerald-50 font-medium text-emerald-950'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMode"
                    checked={paymentMode === pm}
                    onChange={() => setPaymentMode(pm as any)}
                    className="text-emerald-700 focus:ring-emerald-700"
                  />
                  <span>{pm}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Transparent Rate Breakdown Card */}
          <div className="bg-slate-900 text-white p-4 rounded-xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                <Calculator className="w-4 h-4" />
                <span>Transparent Delivery Cost Calculation</span>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                Est. Distance: {rawDist} km
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-slate-300">
              <div>
                <span className="text-slate-400 block text-[11px]">Base Fare</span>
                <span className="font-mono">₹{baseRate}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Weight ({weightKg}kg)</span>
                <span className="font-mono">+₹{weightFee}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Distance Fare</span>
                <span className="font-mono">+₹{distanceFee}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Batch Saving</span>
                <span className="font-mono text-emerald-400">-₹{discount}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-[11px] text-slate-400">Total Delivery Charges</div>
                <div className="text-xl font-bold font-mono text-emerald-400">₹{finalFee}</div>
              </div>
              <div className="text-right text-[11px] text-slate-400">
                Estimated Delivery: <span className="text-white font-medium">Tomorrow by 1:00 PM</span>
              </div>
            </div>
          </div>

          {/* Submit CTA */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsBookingModalOpen(false)}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-2"
            >
              <span>Confirm & Book Delivery (₹{finalFee})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
