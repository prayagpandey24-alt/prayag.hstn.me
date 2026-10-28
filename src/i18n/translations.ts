import { Language } from '../types';

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Top Bar & Nav
    appName: 'GramConnect',
    tagline: 'Rural Last Mile Delivery',
    navHome: 'Home',
    navMarketplace: 'Rural Market',
    navTrack: 'Live Tracking',
    navSmartFeatures: 'Smart Logistics',
    navAbout: 'About & FAQ',
    btnBookDelivery: 'Book a Delivery',
    btnGetStarted: 'Get Started',
    btnTrackOrder: 'Track Your Order',
    btnDashboard: 'Dashboard',
    btnLogin: 'Login / Register',
    btnLogout: 'Sign Out',
    
    // Hero
    heroHeadline: 'Connecting Rural Businesses to Bigger Markets.',
    heroSubtitle: 'Affordable, reliable, and smarter last-mile delivery for rural Maharashtra.',
    heroBullet1: '₹25 starting intra-village rates',
    heroBullet2: '35% savings with batch grouping',
    heroBullet3: 'Real-time GPS tracking across Sahyadri hubs',
    
    // Roles
    roleSeller: 'Rural Entrepreneur / Seller',
    rolePartner: 'Delivery Partner',
    roleCustomer: 'Customer / Buyer',
    roleAdmin: 'State Administrator',
    
    // Statuses
    ORDER_PLACED: 'Order Placed',
    PICKUP_SCHEDULED: 'Pickup Scheduled',
    IN_TRANSIT: 'In Transit',
    OUT_FOR_DELIVERY: 'Out for Delivery',
    DELIVERED: 'Delivered',
    CANCELLED: 'Cancelled',
    
    // Booking Form
    pickupLocation: 'Pickup Location (Village/Taluka)',
    deliveryDestination: 'Delivery Destination (Village/City)',
    productDetails: 'Product Name & Description',
    packageWeight: 'Package Weight (kg)',
    deliveryTypeLabel: 'Delivery Service Type',
    estFee: 'Estimated Delivery Fee',
    confirmBooking: 'Confirm & Book Delivery',
    
    // Smart Features
    smartFeatureTitle: 'Smarter Rural Logistics Built for Bharat',
    smartRouteOpt: 'Dynamic Route Optimization',
    smartBatch: 'Combined Batch Deliveries',
    smartV2V: 'Gram-to-Gram Direct Dispatch',
    smartAffordable: 'Hyper-Affordable Rural Tariff',
    
    // Footer & Contact
    contactUs: 'Contact Maharashtra Hub Office',
    supportNumber: '+91 20 2567 8900 / 1800-GRAM-CONNECT',
  },
  
  mr: {
    // Top Bar & Nav
    appName: 'ग्रामकनेक्ट',
    tagline: 'ग्रामीण शेवटचा टप्पा वितरण',
    navHome: 'मुख्यपृष्ठ',
    navMarketplace: 'ग्रामीण बाजार',
    navTrack: 'थेट ट्रॅकिंग',
    navSmartFeatures: 'स्मार्ट वाहतूक',
    navAbout: 'माहिती व संपर्क',
    btnBookDelivery: 'डिलिव्हरी बुक करा',
    btnGetStarted: 'सुरू करा',
    btnTrackOrder: 'ऑर्डर ट्रॅक करा',
    btnDashboard: 'डॅशबोर्ड',
    btnLogin: 'लॉगिन / नोंदणी',
    btnLogout: 'बाहेर पडा',
    
    // Hero
    heroHeadline: 'ग्रामीण उद्योगांना मोठ्या बाजारपेठांशी जोडत आहोत.',
    heroSubtitle: 'ग्रामीण महाराष्ट्रासाठी परवडणारी, विश्वासार्ह आणि आधुनिक डिलिव्हरी व्यवस्था.',
    heroBullet1: 'गावांतर्गत डिलिव्हरी फक्त ₹२५ पासून',
    heroBullet2: 'एकत्रित डिलिव्हरीने ३५% बचत',
    heroBullet3: 'सह्याद्री भागातील थेट GPS ट्रॅकिंग',
    
    // Roles
    roleSeller: 'ग्रामीण उद्योजक / उत्पादक',
    rolePartner: 'डिलिव्हरी पार्टनर',
    roleCustomer: 'ग्राहक / खरेदीदार',
    roleAdmin: 'राज्य व्यवस्थापक (Admin)',
    
    // Statuses
    ORDER_PLACED: 'ऑर्डर नोंदवली',
    PICKUP_SCHEDULED: 'पिकअप नियोजित',
    IN_TRANSIT: 'मार्गावर आहे (In Transit)',
    OUT_FOR_DELIVERY: 'डिलिव्हरीसाठी बाहेर पडले',
    DELIVERED: 'यशस्वी वितरण झाले (Delivered)',
    CANCELLED: 'रद्द केली',
    
    // Booking Form
    pickupLocation: 'पिकअप ठिकाण (गाव / तालुका)',
    deliveryDestination: 'डिलिव्हरी ठिकाण (गाव / शहर)',
    productDetails: 'उत्पादनाचे नाव व तपशील',
    packageWeight: 'पार्सलचे वजन (किलो)',
    deliveryTypeLabel: 'डिलिव्हरी सेवा प्रकार',
    estFee: 'अंदाजे डिलिव्हरी शुल्क',
    confirmBooking: 'डिलिव्हरी बुक करा',
    
    // Smart Features
    smartFeatureTitle: 'ग्रामीण महाराष्ट्रासाठी खास डिझाइन केलेली स्मार्ट लॉजिस्टिक्स',
    smartRouteOpt: 'मार्ग ऑप्टिमायझेशन (Route Optimization)',
    smartBatch: 'एकत्रित डिलिव्हरी गट',
    smartV2V: 'ग्राम ते ग्राम थेट वितरण',
    smartAffordable: 'अत्यंत परवडणारे ग्रामीण दर',
    
    // Footer & Contact
    contactUs: 'महाराष्ट्र मध्यवर्ती केंद्र संपर्क',
    supportNumber: '+९१ २० २५६७ ८९०० / १८००-ग्राम-कनेक्ट',
  },
  
  hi: {
    // Top Bar & Nav
    appName: 'ग्रामकनेक्ट',
    tagline: 'ग्रामीण लास्ट माइल डिलीवरी',
    navHome: 'होम',
    navMarketplace: 'ग्रामीण बाज़ार',
    navTrack: 'लाइव ट्रैकिंग',
    navSmartFeatures: 'स्मार्ट लॉजिस्टिक्स',
    navAbout: 'हमारे बारे में',
    btnBookDelivery: 'डिलीवरी बुक करें',
    btnGetStarted: 'शुरुआत करें',
    btnTrackOrder: 'ऑर्डर ट्रैक करें',
    btnDashboard: 'डैशबोर्ड',
    btnLogin: 'लॉगिन / रजिस्टर',
    btnLogout: 'साइन आउट',
    
    // Hero
    heroHeadline: 'ग्रामीण उद्यमियों को बड़े बाज़ारों से जोड़ना।',
    heroSubtitle: 'ग्रामीण महाराष्ट्र के लिए किफ़ायती, विश्वसनीय और स्मार्ट लास्ट-माइल डिलीवरी प्लेटफॉर्म।',
    heroBullet1: 'ग्राम-स्तरीय डिलीवरी मात्र ₹25 से शुरू',
    heroBullet2: 'संयुक्त डिलीवरी से 35% तक बचत',
    heroBullet3: 'रियल-टाइम जीपीएस ट्रैकिंग सुविधा',
    
    // Roles
    roleSeller: 'ग्रामीण उद्यमी / विक्रेता',
    rolePartner: 'डिलीवरी पार्टनर',
    roleCustomer: 'ग्राहक / खरीदार',
    roleAdmin: 'एडमिनिस्ट्रेटर (Admin)',
    
    // Statuses
    ORDER_PLACED: 'ऑर्डर दर्ज हुआ',
    PICKUP_SCHEDULED: 'पिकअप निर्धारित',
    IN_TRANSIT: 'रास्ते में है (In Transit)',
    OUT_FOR_DELIVERY: 'डिलीवरी के लिए रवाना',
    DELIVERED: 'डिलीवरी पूरी हुई',
    CANCELLED: 'रद्द किया गया',
    
    // Booking Form
    pickupLocation: 'पिकअप स्थान (गाँव / तहसील)',
    deliveryDestination: 'डिलीवरी स्थान (गाँव / शहर)',
    productDetails: 'उत्पाद का नाम और विवरण',
    packageWeight: 'पार्सल का वजन (किलो)',
    deliveryTypeLabel: 'डिलीवरी सेवा प्रकार',
    estFee: 'अनुमानित डिलीवरी शुल्क',
    confirmBooking: 'डिलीवरी बुक करें',
    
    // Smart Features
    smartFeatureTitle: 'भारत के ग्रामीण क्षेत्रों के लिए स्मार्ट लॉजिस्टिक्स',
    smartRouteOpt: 'रूट ऑप्टिमाइज़ेशन',
    smartBatch: 'कंबाइंड बैच डिलीवरी',
    smartV2V: 'गाँव से गाँव सीधी डिलीवरी',
    smartAffordable: 'अत्यंत किफ़ायती ग्रामीण दरें',
    
    // Footer & Contact
    contactUs: 'महाराष्ट्र नोडल केंद्र संपर्क',
    supportNumber: '+91 20 2567 8900 / 1800-ग्राम-कनेक्ट',
  }
};
