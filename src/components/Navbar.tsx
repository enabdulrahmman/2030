import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Menu, X, PhoneCall } from 'lucide-react';

interface NavbarProps {
  selectedCount: number;
  onOpenCart: () => void;
  activeCategory: string;
  onSelectCategory: (id: string) => void;
}

export default function Navbar({
  selectedCount,
  onOpenCart,
  activeCategory,
  onSelectCategory,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-xl transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 via-yellow-500 to-violet-600 p-[1.5px] shadow-lg shadow-amber-500/10">
              <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-zinc-950 font-mono text-xl font-black text-amber-400 tracking-wider">
                SH
              </div>
              <div className="absolute -inset-1 -z-10 rounded-xl bg-gradient-to-br from-amber-400 to-violet-600 opacity-20 blur-sm"></div>
            </div>
            
            <div className="flex flex-col text-right">
              <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text font-sans text-2xl font-black tracking-tight text-transparent">
                SubHook
              </span>
              <span className="font-mono text-[9px] tracking-widest text-zinc-500 uppercase">
                Premium Digital Hub
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 text-sm font-medium text-zinc-300">
            <button
              onClick={() => {
                const element = document.getElementById('services-section');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 py-2 rounded-lg hover:text-white hover:bg-zinc-900/60 transition-colors cursor-pointer"
            >
              الخدمات والاشتراكات
            </button>
            <button
              onClick={() => {
                const element = document.getElementById('special-offers');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 py-2 rounded-lg hover:text-white hover:bg-zinc-900/60 transition-colors cursor-pointer"
            >
              العروض الحالية
            </button>
            <button
              onClick={() => {
                const element = document.getElementById('reviews-marquee-section');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 py-2 rounded-lg hover:text-white hover:bg-zinc-900/60 transition-colors cursor-pointer"
            >
              تقييمات العملاء
            </button>
            <button
              onClick={() => {
                const element = document.getElementById('about-founder');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 py-2 rounded-lg hover:text-white hover:bg-zinc-900/60 transition-colors cursor-pointer"
            >
              الضمان والسياسة
            </button>
            <button
              onClick={() => {
                const element = document.getElementById('faqs');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 py-2 rounded-lg hover:text-white hover:bg-zinc-900/60 transition-colors cursor-pointer"
            >
              الأسئلة الشائعة
            </button>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* WhatsApp Contact Quick Action */}
            <a
              href="https://wa.me/967772121616"
              target="_blank"
              referrerPolicy="no-referrer"
              className="hidden sm:flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 px-4 py-2.5 text-xs font-bold text-white transition-all hover:scale-[1.03] hover:shadow-lg hover:shadow-emerald-500/20 active:scale-95"
            >
              <PhoneCall className="h-4 w-4" />
              <span>تواصل مباشر</span>
            </a>

            {/* Cart / Selected Items Badge */}
            <button
              onClick={onOpenCart}
              className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/50 text-zinc-300 hover:text-amber-400 hover:border-amber-500/30 transition-all duration-300"
            >
              <ShoppingBag className="h-5 w-5" />
              {selectedCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-[10px] font-black text-zinc-950 shadow-md shadow-amber-500/20"
                >
                  {selectedCount}
                </motion.span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-850 bg-zinc-900/30 text-zinc-400 md:hidden hover:text-white transition-all cursor-pointer"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden border-t border-zinc-900 bg-zinc-950 px-4 py-4"
          >
            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  setIsOpen(false);
                  const element = document.getElementById('services-section');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full text-right py-3 px-4 rounded-xl text-sm font-medium text-zinc-300 hover:bg-zinc-900 hover:text-white transition"
              >
                الخدمات والاشتراكات
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  const element = document.getElementById('special-offers');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full text-right py-3 px-4 rounded-xl text-sm font-medium text-zinc-300 hover:bg-zinc-900 hover:text-white transition"
              >
                العروض الحالية والموسمية
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  const element = document.getElementById('reviews-marquee-section');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full text-right py-3 px-4 rounded-xl text-sm font-medium text-zinc-300 hover:bg-zinc-900 hover:text-white transition"
              >
                تقييمات العملاء
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  const element = document.getElementById('about-founder');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full text-right py-3 px-4 rounded-xl text-sm font-medium text-zinc-300 hover:bg-zinc-900 hover:text-white transition"
              >
                الضمان وسياسة الاستخدام
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  const element = document.getElementById('faqs');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full text-right py-3 px-4 rounded-xl text-sm font-medium text-zinc-300 hover:bg-zinc-900 hover:text-white transition"
              >
                الأسئلة الشائعة (FAQ)
              </button>

              <div className="border-t border-zinc-900/60 my-2 pt-3">
                <a
                  href="https://wa.me/967772121616"
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 py-3 text-sm font-bold text-white shadow-lg"
                >
                  <PhoneCall className="h-4 w-4" />
                  <span>تواصل عبر واتساب مباشر</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
