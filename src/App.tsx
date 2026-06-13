import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  SlidersHorizontal,
  Sparkles,
  TrendingUp,
  X,
  Check,
  ShoppingBag,
  MessageSquare,
  Globe,
  Award,
  ChevronLeft
} from 'lucide-react';

import { SERVICES, CATEGORIES } from './data';
import { ServiceItem } from './types';
import { CURRENCY_OPTIONS, convertPriceText } from './utils/currency';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServiceCard from './components/ServiceCard';
import InteractiveInquiry from './components/InteractiveInquiry';
import StickyWhatsApp from './components/StickyWhatsApp';
import FAQSection from './components/FAQSection';
import SpecialOffersSection from './components/SpecialOffersSection';
import FounderSection from './components/FounderSection';
import ReviewSection, { Review, INITIAL_REVIEWS } from './components/ReviewSection';

export default function App() {
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const stored = localStorage.getItem('subhook_local_reviews');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Prepend user-custom reviews from localStorage to INITIAL_REVIEWS
          const customReviews = parsed.filter((rev: any) => rev.id?.startsWith('r-custom'));
          return [...customReviews, ...INITIAL_REVIEWS];
        }
      }
    } catch (e) {
      console.error('Error loading reviews from localStorage', e);
    }
    return INITIAL_REVIEWS;
  });

  const [selectedItems, setSelectedItems] = useState<ServiceItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<string | null>(null);

  const [selectedCurrency, setSelectedCurrency] = useState<string>(() => {
    try {
      const stored = localStorage.getItem('subhook_preferred_currency');
      return stored || 'USD';
    } catch (e) {
      return 'USD';
    }
  });
  const [isCurrencyOpen, setIsCurrencyOpen] = useState<boolean>(false);

  const handleCurrencyChange = (code: string) => {
    setSelectedCurrency(code);
    try {
      localStorage.setItem('subhook_preferred_currency', code);
    } catch (e) {
      console.error(e);
    }
  };

  // Toggle item selection in cart
  const handleToggleSelectItem = (item: ServiceItem) => {
    const exists = selectedItems.find((i) => i.id === item.id);
    if (exists) {
      setSelectedItems(selectedItems.filter((i) => i.id !== item.id));
      triggerToast(`تم إزالة ${item.name} من السلة`);
    } else {
      setSelectedItems([...selectedItems, item]);
      triggerToast(`تم إضافة ${item.name} إلى سلة الاستفسار ✨`);
    }
  };

  const handleRemoveItem = (id: string) => {
    const item = selectedItems.find((i) => i.id === id);
    if (item) {
      setSelectedItems(selectedItems.filter((i) => i.id !== id));
      triggerToast(`تم حذف ${item.name}`);
    }
  };

  const handleClearAll = () => {
    setSelectedItems([]);
    triggerToast('تم إفراغ سلة طلباتك بالكامل');
  };

  const triggerToast = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => {
      setShowToast(null);
    }, 3000);
  };

  // Direct quick WhatsApp checkout template for single services
  const handleQuickInquire = (item: ServiceItem) => {
    const convertedPrice = convertPriceText(item.priceText, selectedCurrency);
    const priceTextWithAlt = selectedCurrency !== 'USD'
      ? `${convertedPrice} (يعادل ${item.priceText})`
      : item.priceText;
    const greeting = `مرحبا م. عبدالرحمن الريمي،\nأريد الاستفسار بخصوص تفعيل خدمة SubHook التالية:\n\n*${item.name}* (${item.englishName || ''})\n🔹 كود الخدمة/العرض: ${priceTextWithAlt}\n\nأرجو تزويدي بالآلية والخطوات اللازمة للتفعيل. وشكراً!`;
    const url = `https://wa.me/967772121616?text=${encodeURIComponent(greeting)}`;
    window.open(url, '_blank', 'noreferrer,noopener');
  };

  // Filter items by category and search query
  const filteredServices = useMemo(() => {
    return SERVICES.filter((service) => {
      // Category match
      const categoryMatch = activeCategory === 'all' || service.category === activeCategory;

      // Search match
      const lowerSearch = searchQuery.toLowerCase();
      const searchMatch =
        searchQuery === '' ||
        service.name.toLowerCase().includes(lowerSearch) ||
        (service.englishName && service.englishName.toLowerCase().includes(lowerSearch)) ||
        service.description.toLowerCase().includes(lowerSearch) ||
        service.features.some((f) => f.toLowerCase().includes(lowerSearch));

      return categoryMatch && searchMatch;
    });
  }, [activeCategory, searchQuery]);

  // Scroll smoothly to target HTML element
  const handleScrollToServices = () => {
    const elem = document.getElementById('services-section');
    elem?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div dir="rtl" className="min-h-screen bg-zinc-950 font-sans text-right select-text antialiased selection:bg-amber-400 selection:text-zinc-900 pb-[76px] md:pb-0">
      
      {/* Premium Navbar */}
      <Navbar
        selectedCount={selectedItems.length}
        onOpenCart={() => setIsCartOpen(true)}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      {/* Hero section */}
      <Hero onExploreClick={handleScrollToServices} />

      {/* Top Compact Reviews Marquee Segment - Positioned consistently above the subscription bundles categories */}
      <ReviewSection mode="compact" reviews={reviews} setReviews={setReviews} />

      {/* Main section for services */}
      <main id="services-section" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 relative">
        <div className="absolute top-0 left-10 h-72 w-72 rounded-full bg-violet-500/5 blur-[100px] pointer-events-none" />

        {/* Categories and search block wrapper */}
        <div className="rounded-3xl border border-zinc-900 bg-zinc-950/60 p-6 md:p-8 backdrop-blur-md relative z-10">
          
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between border-b border-zinc-900 pb-6 mb-8">
            <div>
              <h2 className="text-xl font-extrabold text-white sm:text-2xl tracking-tight">
                كتالوج باقات الخدمات والاشتراكات الرقمية
              </h2>
              <p className="text-xs text-zinc-500 mt-1">
                تصفح عن طريق تصنيف الخدمة أو ابحث عن برامج الذكاء الاصطناعي والتصميم مباشرة
              </p>
            </div>

            {/* Quick stats indicator */}
            <div className="hidden sm:flex items-center gap-4 text-xs font-medium text-zinc-400">
              <div className="flex items-center gap-1.5 rounded-lg bg-zinc-900 px-3 py-1.5 border border-zinc-850">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span>رسمي 100%</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-lg bg-zinc-900 px-3 py-1.5 border border-zinc-850">
                <span className="h-2 w-2 rounded-full bg-amber-400" />
                <span>دعم مابعد البيع</span>
              </div>
            </div>
          </div>

          {/* Search and Currency Controls Group */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 items-end relative z-30">
            <div className="relative flex-1 w-full">
              <label className="block text-[11px] font-bold text-zinc-500 mb-1.5 pr-1">ابحث في الخدمات الرقمية :</label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-zinc-500">
                  <Search className="h-5 w-5" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث عن اشتراك (مثال: ChatGPT, Adobe Creative, Canva, تريلو ...)..."
                  className="w-full rounded-2xl border border-zinc-850 bg-zinc-900/40 py-4 pl-12 pr-12 text-sm text-zinc-100 outline-none placeholder:text-zinc-500 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute inset-y-0 left-0 flex items-center pl-4 text-zinc-500 hover:text-white transition cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Currency Selection Dropdown */}
            <div className="relative shrink-0 w-full md:w-64">
              <label className="block text-[11px] font-bold text-zinc-500 mb-1.5 pr-1">عملة عرض أسعار الباقات :</label>
              <button
                onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
                className="w-full h-[54px] flex items-center justify-between gap-2.5 rounded-2xl border border-zinc-850 bg-zinc-900/40 px-4 text-sm text-zinc-100 outline-none hover:border-zinc-800 focus:border-amber-400 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">{CURRENCY_OPTIONS.find(c => c.code === selectedCurrency)?.flag}</span>
                  <span className="font-bold text-zinc-200">
                    {CURRENCY_OPTIONS.find(c => c.code === selectedCurrency)?.symbol} - {CURRENCY_OPTIONS.find(c => c.code === selectedCurrency)?.name}
                  </span>
                </div>
                <Globe className="h-4 w-4 text-zinc-500 group-hover:text-amber-400 transition-colors" />
              </button>
              
              <AnimatePresence>
                {isCurrencyOpen && (
                  <>
                    <div className="fixed inset-0 z-20" onClick={() => setIsCurrencyOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 top-full mt-2 z-35 w-full rounded-2xl border border-zinc-850 bg-zinc-900 p-1.5 shadow-2xl"
                    >
                      {CURRENCY_OPTIONS.map((opt) => (
                        <button
                          key={opt.code}
                          onClick={() => {
                            handleCurrencyChange(opt.code);
                            setIsCurrencyOpen(false);
                            triggerToast(`تم تحويل عرض الأسعار إلى ${opt.name} ✨`);
                          }}
                          className={`w-full flex items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-xs font-bold transition-all text-right cursor-pointer ${
                            selectedCurrency === opt.code
                              ? 'bg-amber-400 text-zinc-950 hover:bg-amber-300'
                              : 'text-zinc-300 hover:bg-zinc-850 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-sm">{opt.flag}</span>
                            <span>{opt.name}</span>
                          </div>
                          <span className={selectedCurrency === opt.code ? 'text-zinc-950 font-black' : 'text-zinc-500'}>
                            {opt.symbol}
                          </span>
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Categories Pill filters */}
          <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`rounded-xl px-4 py-2.5 text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-zinc-950 shadow-md shadow-amber-500/10'
                      : 'border border-zinc-900 bg-zinc-900/30 text-zinc-400 hover:border-zinc-800 hover:text-white'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>

        </div>

        {/* Flash banner promo snippet */}
        <div className="mt-8 rounded-2xl bg-gradient-to-r from-amber-500/15 via-violet-600/10 to-transparent p-5 border border-amber-500/10 flex flex-col sm:flex-row items-center justify-between gap-4 z-10 relative">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 shrink-0 rounded-xl bg-amber-400/20 flex items-center justify-center text-amber-300 border border-amber-400/15">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-white">الاشتراكات تتوفر بطرق نظامية بالكامل</h4>
              <p className="text-[11px] text-zinc-400 mt-0.5">ضمان كلي مستمر، خصوصية قصوى، مع تفعيل آمن للكميات والمجموعات.</p>
            </div>
          </div>
          <button
            onClick={() => {
              setSearchQuery('رسمي');
              handleScrollToServices();
            }}
            className="text-xs font-bold text-amber-300 hover:text-amber-200 transition shrink-0 flex items-center gap-1 cursor-pointer"
          >
            <span>شاهد الخيارات ذات التفعيل الفوري</span>
            <ChevronLeft className="h-3 w-3" />
          </button>
        </div>

        {/* Service Cards Grid Container */}
        <div className="mt-12">
          {filteredServices.length === 0 ? (
            /* Empty state when filters result in 0 */
            <div className="rounded-2xl border border-zinc-900 bg-zinc-900/10 p-12 text-center max-w-xl mx-auto">
              <SlidersHorizontal className="h-10 w-10 mx-auto text-zinc-700 stroke-[1.5]" />
              <h3 className="text-base font-bold text-zinc-300 mt-4">لا توجد خدمات مطابقة لبحثك في القسم</h3>
              <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
                لم نجد أي اشتراك يطابق "{searchQuery}" حالياً. جرب تفقد فئات أخرى، أو تواصل معنا مباشرة للاستفسار وتوفير أي اشتراك غير مدرج لك.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="mt-6 inline-flex items-center gap-1.5 rounded-xl bg-zinc-900 px-5 py-2.5 text-xs font-bold text-amber-400 border border-zinc-800 hover:bg-zinc-850 transition cursor-pointer"
              >
                <span>تهيئة الفلاتر واستعراض الكل</span>
              </button>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filteredServices.map((service) => {
                const isSelected = !!selectedItems.find((i) => i.id === service.id);
                return (
                  <ServiceCard
                    key={service.id}
                    item={service}
                    isSelected={isSelected}
                    onToggleSelect={() => handleToggleSelectItem(service)}
                    onQuickInquire={() => handleQuickInquire(service)}
                    selectedCurrency={selectedCurrency}
                  />
                );
              })}
            </motion.div>
          )}
        </div>

      </main>

      {/* Special Seasonal and Holiday Offers Component */}
      <SpecialOffersSection />

      {/* Founder Profile and commitment rules checks */}
      <FounderSection />

      {/* FAQ and Legality Accordion */}
      <FAQSection />

      {/* Luxurious Page Footer */}
      <footer className="bg-zinc-950 border-t border-zinc-900 py-12 text-zinc-500 text-xs text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient from-zinc-900/30 via-transparent to-transparent opacity-50 blur-3xl pointer-events-none" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Brand & Badge in footer */}
          <div className="flex flex-col items-center justify-center gap-3 mb-8">
            <div className="flex items-center gap-2">
              <span className="font-mono text-amber-400 font-black tracking-widest text-lg">SubHook</span>
              <span className="h-1.5 w-1.5 bg-amber-400 rounded-full" />
              <span className="font-sans text-zinc-400 font-bold">الاشتراكات والخدمات الرقمية</span>
            </div>
            <p className="text-[11px] text-zinc-600 max-w-md mx-auto leading-relaxed">
              توفير آمن، مرخص، ودائم لكافة المبدعين، وصناع المحتوى والفرق الرقمية بالتعاون مع المهندس عبدالرحمن الريمي.
            </p>
          </div>

          <div className="border-t border-zinc-900/80 my-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
            <span className="text-zinc-600">
              © {new Date().getFullYear()} SubHook. جميع الحقوق محفوظة لجهة العمل المنشأة.
            </span>
            <div className="flex items-center gap-4 font-bold text-zinc-500">
              <a href="#services-section" className="hover:text-amber-400 transition">تنشيط البرامج</a>
              <span className="text-zinc-800">•</span>
              <a href="#special-offers" className="hover:text-amber-400 transition">العروض الموسمية</a>
              <span className="text-zinc-800">•</span>
              <a href="#about-founder" className="hover:text-amber-400 transition">سياسة النزاهة</a>
            </div>
          </div>

        </div>
      </footer>

      {/* Sliding interactive cart Drawer */}
      <InteractiveInquiry
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        selectedItems={selectedItems}
        onRemoveItem={handleRemoveItem}
        onClearAll={handleClearAll}
        selectedCurrency={selectedCurrency}
      />

      {/* Toast notifications handler */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-20 left-4 sm:left-6 z-50 rounded-2xl bg-zinc-900 border border-amber-500/30 px-5 py-3.5 text-xs font-bold text-white shadow-xl shadow-amber-500/5 flex items-center gap-2.5 max-w-xs sm:max-w-md"
          >
            <div className="h-2 w-2 rounded-full bg-amber-400 animate-ping" />
            <span>{showToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Mobile WhatsApp Button Panel */}
      <StickyWhatsApp />

    </div>
  );
}
