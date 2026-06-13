import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQS } from '../data';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faqs" className="relative py-20 bg-zinc-950 border-t border-zinc-900/40">
      <div className="absolute top-1/4 right-1/10 h-72 w-72 rounded-full bg-amber-500/5 blur-[90px] pointer-events-none"></div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title Group */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-3.5 py-1.5 text-xs text-amber-300 border border-zinc-800">
            <HelpCircle className="h-4 w-4" />
            <span>الأسئلة الشائعة وتفعيل الخدمة</span>
          </div>
          <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl tracking-tight">
            لديك استفسار حول الاشتراكات؟
          </h2>
          <p className="mt-3 text-sm text-zinc-500">
            أجبنا على الأسئلة والاهتمامات الأكثر شيوعاً لتوفير الشفافية الكاملة قبل التفعيل المباشر.
          </p>
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`overflow-hidden rounded-2xl border transition-all duration-350 ${
                  isOpen
                    ? 'border-amber-500/30 bg-zinc-900/30 shadow-md'
                    : 'border-zinc-900 bg-zinc-900/10 hover:border-zinc-800'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between p-5 text-right outline-none cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-bold text-white group-hover:text-amber-300">
                    {faq.question}
                  </span>
                  <div
                    className={`mr-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-950 border border-zinc-850 text-zinc-400 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-amber-400 border-amber-500/20' : ''
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="border-t border-zinc-900/60 p-5 pt-3 text-xs sm:text-sm leading-relaxed text-zinc-400 bg-zinc-950/20">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
