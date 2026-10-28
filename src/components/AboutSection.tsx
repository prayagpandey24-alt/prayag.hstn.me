import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  MapPin,
  Phone,
  Mail,
  HelpCircle,
  Send,
  CheckCircle2,
  Building,
  ShieldCheck,
  ChevronDown,
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { showToast } = useApp();

  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactTaluka, setContactTaluka] = useState('Baramati, Pune');
  const [contactMsg, setContactMsg] = useState('');
  const [isSent, setIsSent] = useState(false);

  const faqs = [
    {
      q: 'How does GramConnect keep delivery fees as low as ₹25 to ₹50?',
      a: 'We leverage "Combined Milk-Run Delivery" where electric 2-wheelers and local tempos aggregate parcels across neighboring villages into a scheduled pooled route, eliminating the high cost of solo trips.',
    },
    {
      q: 'Can rural women SHGs and farmers use Cash on Delivery (COD)?',
      a: 'Yes! Customers can pay Cash on Delivery at their doorstep. Our rider verifies the OTP, collects the cash, and the seller receives instant direct bank settlement via UPI/GramPay with zero hold period.',
    },
    {
      q: 'What types of rural products can be transported?',
      a: 'We specialize in rural handicrafts, handloom sarees, organic jaggery, raw honey, cold-pressed oils, grains, and non-perishable/semi-perishable farm produce packed up to 25 kg per package.',
    },
    {
      q: 'How can a local village youth register as a Delivery Partner?',
      a: 'Any local individual with an electric 2-wheeler, motorcycle, or cargo tempo can register in our Delivery Partner portal. We provide induction training, app onboarding in Marathi/Hindi, and steady daily earnings.',
    },
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    showToast('Inquiry received! Our Maharashtra Taluka Nodal Officer will call you back.');
  };

  return (
    <section id="about" className="py-16 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Mission Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
              Our Maharashtra Mission
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900" style={{ textWrap: 'balance' }}>
              Empowering Rural Artisans & Farmers Beyond Village Boundaries
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              In rural Maharashtra, talented self-help groups (SHGs), organic farmers, and master craftsmen often struggle not because of product quality, but because big logistics companies consider their villages "unserviceable" or charge prohibitive freight.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              GramConnect solves this by creating hyper-local micro-hubs in taluka centers like Baramati, Wai, Yeola, and Kagal. By coordinating electric two-wheelers on existing village milk and agro supply routes, we connect rural workshops directly to urban households.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-3 text-xs">
              <div className="border border-slate-200 p-3 rounded-xl bg-slate-50">
                <span className="font-bold text-slate-900 block">36 Districts Vision</span>
                <span className="text-slate-500">Expanding cluster by cluster across Western Maharashtra & Marathwada</span>
              </div>
              <div className="border border-slate-200 p-3 rounded-xl bg-slate-50">
                <span className="font-bold text-slate-900 block">Carbon-Neutral Fleet</span>
                <span className="text-slate-500">Promoting solar-charged electric bikes for village deliveries</span>
              </div>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-md">
            <img
              src="/src/assets/images/rural_products_artisan_1791645764713.jpg"
              alt="Artisanal Goods Packaged"
              className="w-full h-80 object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
              <div className="text-white text-xs">
                <div className="font-bold text-sm">Authentic Goods from Sahyadri Foothills</div>
                <div className="text-slate-300">Kolhapuri leatherware, organic jaggery, raw honey, and Yeola Paithani</div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ & Contact Form Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* FAQ Accordion */}
          <div className="lg:col-span-7 space-y-4">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-slate-900">
                Frequently Asked Questions
              </h3>
              <p className="text-xs text-slate-500">
                Common queries from rural business owners and buyers.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50"
                >
                  <button
                    onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
                    className="w-full px-4 py-3.5 text-left text-xs font-bold text-slate-900 flex items-center justify-between gap-3 hover:bg-slate-100 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-500 transition-transform ${
                        faqOpen === idx ? 'rotate-180 text-emerald-800' : ''
                      }`}
                    />
                  </button>
                  {faqOpen === idx && (
                    <div className="px-4 pb-3.5 text-xs text-slate-600 border-t border-slate-200/80 pt-2 leading-relaxed bg-white">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Support Form */}
          <div className="lg:col-span-5 bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-5">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900">
                Connect with GramConnect Support
              </h3>
              <p className="text-xs text-slate-500">
                Need customized bulk village pickup or have questions? Send a message.
              </p>
            </div>

            {isSent ? (
              <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2 text-xs">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <div className="font-bold text-emerald-900">Message Received!</div>
                <p className="text-emerald-700">
                  Our rural logistics coordinator will reach you at {contactPhone} shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="e.g. Santosh Jagtap"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    required
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="+91 98XXX XXXXX"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Taluka / District</label>
                  <input
                    type="text"
                    required
                    value={contactTaluka}
                    onChange={(e) => setContactTaluka(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">How can we help your business?</label>
                  <textarea
                    rows={3}
                    required
                    value={contactMsg}
                    onChange={(e) => setContactMsg(e.target.value)}
                    placeholder="We produce 50kg jaggery per week and need regular pickups..."
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold rounded-lg shadow-2xs transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Inquiry</span>
                </button>
              </form>
            )}

            <div className="pt-3 border-t border-slate-200 text-xs text-slate-500 space-y-1.5">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
                <span>State Ops Hub: Baramati MIDC Road, Pune 413133</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
                <span className="font-mono">Toll-Free Helpline: 1800-GRAM-CONNECT</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
