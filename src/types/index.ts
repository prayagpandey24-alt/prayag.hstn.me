export type UserRole = 'seller' | 'partner' | 'customer' | 'admin';

export type Language = 'en' | 'mr' | 'hi';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  village: string;
  taluka: string;
  district: string;
  avatar?: string;
  rating?: number;
  totalDeliveries?: number;
  vehicleType?: 'Electric 2-Wheeler' | 'Cargo 3-Wheeler' | 'Rural Tempo' | 'Motorcycle';
  businessName?: string;
}

export interface Product {
  id: string;
  sellerId: string;
  sellerName: string;
  name: string;
  nameMarathi?: string;
  category: 'Agro & Grains' | 'Handicrafts' | 'Honey & Preserves' | 'Dairy & Jaggery' | 'Textiles';
  price: number;
  weightKg: number;
  quantity: number;
  village: string;
  district: string;
  description: string;
  imageUrl: string;
  inStock: boolean;
}

export type OrderStatus =
  | 'ORDER_PLACED'
  | 'PICKUP_SCHEDULED'
  | 'IN_TRANSIT'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'CANCELLED';

export type DeliveryType =
  | 'village_to_village'
  | 'tehsil_hub'
  | 'combined_batch'
  | 'express';

export interface LocationPoint {
  title: string;
  address: string;
  village: string;
  taluka: string;
  district: string;
  lat: number;
  lng: number;
}

export interface TrackingCheckpoint {
  status: OrderStatus;
  label: string;
  timestamp: string;
  locationName: string;
  note?: string;
}

export interface DeliveryOrder {
  id: string;
  trackingNumber: string;
  sellerId: string;
  sellerName: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  partnerId?: string;
  partnerName?: string;
  partnerPhone?: string;
  partnerVehicle?: string;
  
  productName: string;
  packageWeightKg: number;
  packageDescription: string;
  
  pickup: LocationPoint;
  destination: LocationPoint;
  
  deliveryType: DeliveryType;
  baseFee: number;
  weightFee: number;
  distanceKm: number;
  discount: number;
  totalFee: number;
  
  status: OrderStatus;
  currentLocation?: {
    lat: number;
    lng: number;
    updatedAt: string;
  };
  
  checkpoints: TrackingCheckpoint[];
  createdAt: string;
  estimatedDeliveryTime: string;
  paymentMode: 'Cash on Delivery (COD)' | 'UPI' | 'GramPay Wallet';
  paymentStatus: 'Pending' | 'Paid';
  deliveryOtp: string;
  rating?: number;
  feedback?: string;
}

export interface RateCard {
  baseFeeVillageToVillage: number;
  baseFeeTehsilHub: number;
  baseFeeExpress: number;
  perKgRate: number;
  perKmRate: number;
  batchDiscountPercent: number;
}
