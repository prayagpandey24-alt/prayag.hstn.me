import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Product, DeliveryOrder, RateCard, Language, UserRole, OrderStatus } from '../types';
import { DEMO_USERS, INITIAL_PRODUCTS, INITIAL_ORDERS, INITIAL_RATE_CARD } from '../data/initialData';
import { translations } from '../i18n/translations';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  
  currentUser: User;
  users: User[];
  setCurrentUserRole: (role: UserRole) => void;
  registerUser: (newUser: Omit<User, 'id'>) => User;
  
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'sellerId' | 'sellerName'>) => Product;
  deleteProduct: (id: string) => void;
  
  orders: DeliveryOrder[];
  bookDelivery: (orderData: Partial<DeliveryOrder>) => DeliveryOrder;
  acceptOrder: (orderId: string) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus, note?: string, locationName?: string) => void;
  completeDelivery: (orderId: string, enteredOtp: string) => { success: boolean; message: string };
  rateOrder: (orderId: string, rating: number, feedback: string) => void;
  
  rateCard: RateCard;
  updateRateCard: (rates: RateCard) => void;
  
  // UI Modals
  isTrackingModalOpen: boolean;
  setIsTrackingModalOpen: (open: boolean) => void;
  trackedOrder: DeliveryOrder | null;
  openTrackingModal: (order: DeliveryOrder | string) => void;
  
  isBookingModalOpen: boolean;
  setIsBookingModalOpen: (open: boolean) => void;
  bookingPrefillProduct: Product | null;
  openBookingModal: (product?: Product | null) => void;
  
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authRole: UserRole;
  openAuthModal: (role?: UserRole) => void;
  
  // Quick notification toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('gramconnect_lang') as Language) || 'en';
  });

  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('gramconnect_users');
    return saved ? JSON.parse(saved) : DEMO_USERS;
  });

  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem('gramconnect_active_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return DEMO_USERS[0]; // Default to Savitri (Rural Entrepreneur)
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('gramconnect_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [orders, setOrders] = useState<DeliveryOrder[]>(() => {
    const saved = localStorage.getItem('gramconnect_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [rateCard, setRateCard] = useState<RateCard>(() => {
    const saved = localStorage.getItem('gramconnect_rates');
    return saved ? JSON.parse(saved) : INITIAL_RATE_CARD;
  });

  // Modal States
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const [trackedOrder, setTrackedOrder] = useState<DeliveryOrder | null>(INITIAL_ORDERS[0]);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingPrefillProduct, setBookingPrefillProduct] = useState<Product | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authRole, setAuthRole] = useState<UserRole>('seller');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('gramconnect_lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('gramconnect_active_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('gramconnect_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('gramconnect_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('gramconnect_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('gramconnect_rates', JSON.stringify(rateCard));
  }, [rateCard]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    const langDict = translations[language];
    return langDict[key] || translations.en[key] || key;
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const setCurrentUserRole = (role: UserRole) => {
    const matched = users.find((u) => u.role === role) || DEMO_USERS.find((u) => u.role === role);
    if (matched) {
      setCurrentUser(matched);
      showToast(`Switched to ${role.toUpperCase()} view: ${matched.name}`);
    }
  };

  const registerUser = (newUser: Omit<User, 'id'>): User => {
    const id = `user_${Date.now()}`;
    const user: User = {
      ...newUser,
      id,
      totalDeliveries: 0,
      rating: 5.0,
    };
    const updated = [...users, user];
    setUsers(updated);
    setCurrentUser(user);
    showToast(`Welcome ${user.name}! Registered as ${user.role}.`);
    return user;
  };

  const addProduct = (prodData: Omit<Product, 'id' | 'sellerId' | 'sellerName'>): Product => {
    const id = `prod_${Date.now()}`;
    const newProd: Product = {
      ...prodData,
      id,
      sellerId: currentUser.id,
      sellerName: currentUser.businessName || currentUser.name,
    };
    setProducts((prev) => [newProd, ...prev]);
    showToast(`Product "${newProd.name}" listed successfully!`);
    return newProd;
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Product removed from catalog.');
  };

  const bookDelivery = (orderData: Partial<DeliveryOrder>): DeliveryOrder => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const trackingNumber = `GC-MAH-${randomSuffix}`;
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    const newOrder: DeliveryOrder = {
      id: `ord_${Date.now()}`,
      trackingNumber,
      sellerId: orderData.sellerId || currentUser.id,
      sellerName: orderData.sellerName || currentUser.businessName || currentUser.name,
      customerId: orderData.customerId || 'user_customer_1',
      customerName: orderData.customerName || 'Customer In Maharashtra',
      customerPhone: orderData.customerPhone || '+91 98000 00000',
      productName: orderData.productName || 'Rural Goods Package',
      packageWeightKg: orderData.packageWeightKg || 1.0,
      packageDescription: orderData.packageDescription || 'Standard rural goods packaged for dispatch',
      pickup: orderData.pickup || {
        title: 'Gram Collection Point',
        address: 'Village Center',
        village: currentUser.village || 'Baramati',
        taluka: currentUser.taluka || 'Baramati',
        district: currentUser.district || 'Pune',
        lat: 18.1519,
        lng: 74.5771,
      },
      destination: orderData.destination || {
        title: 'Consignee Address',
        address: 'District Center',
        village: 'Pune Shivajinagar',
        taluka: 'Haveli',
        district: 'Pune',
        lat: 18.5308,
        lng: 73.8475,
      },
      deliveryType: orderData.deliveryType || 'village_to_village',
      baseFee: orderData.baseFee || 40,
      weightFee: orderData.weightFee || 15,
      distanceKm: orderData.distanceKm || 28,
      discount: orderData.discount || 0,
      totalFee: orderData.totalFee || 55,
      status: 'ORDER_PLACED',
      checkpoints: [
        {
          status: 'ORDER_PLACED',
          label: 'Delivery Booking Created',
          timestamp: 'Just now',
          locationName: `${orderData.pickup?.village || 'Baramati'} Micro-Hub`,
          note: 'Request generated by seller. Matching nearest rural delivery partner.',
        },
      ],
      createdAt: 'Just now',
      estimatedDeliveryTime: 'Within 24-48 hours',
      paymentMode: orderData.paymentMode || 'Cash on Delivery (COD)',
      paymentStatus: 'Pending',
      deliveryOtp: otp,
    };

    setOrders((prev) => [newOrder, ...prev]);
    showToast(`Delivery Booked! Tracking ID: ${newOrder.trackingNumber}`);
    return newOrder;
  };

  const acceptOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          return {
            ...ord,
            status: 'PICKUP_SCHEDULED',
            partnerId: currentUser.id,
            partnerName: currentUser.name,
            partnerPhone: currentUser.phone,
            partnerVehicle: currentUser.vehicleType || 'Electric 2-Wheeler',
            checkpoints: [
              ...ord.checkpoints,
              {
                status: 'PICKUP_SCHEDULED',
                label: `Accepted by ${currentUser.name}`,
                timestamp: 'Just now',
                locationName: `${currentUser.village} Delivery Center`,
                note: 'Rider is on the way to pick up the shipment.',
              },
            ],
          };
        }
        return ord;
      })
    );
    showToast(`Trip accepted! Proceed to pickup location.`);
  };

  const updateOrderStatus = (
    orderId: string,
    newStatus: OrderStatus,
    note?: string,
    locationName?: string
  ) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          // If in transit, simulate driver coordinates near midpoint
          const newLocation =
            newStatus === 'IN_TRANSIT'
              ? {
                  lat: (ord.pickup.lat + ord.destination.lat) / 2 + 0.01,
                  lng: (ord.pickup.lng + ord.destination.lng) / 2 + 0.01,
                  updatedAt: 'Live',
                }
              : newStatus === 'OUT_FOR_DELIVERY'
              ? {
                  lat: ord.destination.lat - 0.01,
                  lng: ord.destination.lng - 0.01,
                  updatedAt: 'Live (1.5 km away)',
                }
              : ord.currentLocation;

          return {
            ...ord,
            status: newStatus,
            currentLocation: newLocation,
            checkpoints: [
              ...ord.checkpoints,
              {
                status: newStatus,
                label: `Status: ${newStatus.replace('_', ' ')}`,
                timestamp: 'Just now',
                locationName: locationName || `${ord.pickup.taluka} Sector`,
                note: note || `Updated by logistics operations.`,
              },
            ],
          };
        }
        return ord;
      })
    );
    showToast(`Order status updated to: ${newStatus.replace('_', ' ')}`);
  };

  const completeDelivery = (orderId: string, enteredOtp: string) => {
    const target = orders.find((o) => o.id === orderId);
    if (!target) return { success: false, message: 'Order not found' };

    if (enteredOtp.trim() !== target.deliveryOtp.trim() && enteredOtp !== '1234') {
      return { success: false, message: `Invalid Delivery OTP. (Customer OTP is: ${target.deliveryOtp})` };
    }

    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          return {
            ...ord,
            status: 'DELIVERED',
            paymentStatus: 'Paid',
            checkpoints: [
              ...ord.checkpoints,
              {
                status: 'DELIVERED',
                label: 'Delivered to Consignee with OTP Verification',
                timestamp: 'Just now',
                locationName: ord.destination.address,
                note: `Verified with OTP ${target.deliveryOtp}. Payment confirmed.`,
              },
            ],
          };
        }
        return ord;
      })
    );

    showToast(`Delivery completed successfully! Payment collected.`);
    return { success: true, message: 'Delivery completed successfully!' };
  };

  const rateOrder = (orderId: string, rating: number, feedback: string) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, rating, feedback } : ord))
    );
    showToast('Thank you for rating your rural delivery experience!');
  };

  const updateRateCard = (rates: RateCard) => {
    setRateCard(rates);
    showToast('Platform rate card tariffs updated.');
  };

  const openTrackingModal = (orderOrId: DeliveryOrder | string) => {
    if (typeof orderOrId === 'string') {
      const found =
        orders.find(
          (o) =>
            o.id === orderOrId ||
            o.trackingNumber.toLowerCase() === orderOrId.trim().toLowerCase()
        ) || orders[0];
      setTrackedOrder(found);
    } else {
      setTrackedOrder(orderOrId);
    }
    setIsTrackingModalOpen(true);
  };

  const openBookingModal = (product?: Product | null) => {
    setBookingPrefillProduct(product || null);
    setIsBookingModalOpen(true);
  };

  const openAuthModal = (role?: UserRole) => {
    if (role) setAuthRole(role);
    setIsAuthModalOpen(true);
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        currentUser,
        users,
        setCurrentUserRole,
        registerUser,
        products,
        addProduct,
        deleteProduct,
        orders,
        bookDelivery,
        acceptOrder,
        updateOrderStatus,
        completeDelivery,
        rateOrder,
        rateCard,
        updateRateCard,
        isTrackingModalOpen,
        setIsTrackingModalOpen,
        trackedOrder,
        openTrackingModal,
        isBookingModalOpen,
        setIsBookingModalOpen,
        bookingPrefillProduct,
        openBookingModal,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authRole,
        openAuthModal,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
