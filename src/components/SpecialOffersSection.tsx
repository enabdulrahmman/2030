import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, GraduationCap, Heart, Rocket, Gift } from 'lucide-react';
import { SPECIAL_OFFERS } from '../data';

const iconMap: Record<string, React.ComponentType<any>> = {
  Sparkles: Sparkles,
  GraduationCap: GraduationCap,
  Heart: Heart,
  Rocket: Rocket,
};

export default function SpecialOffersSection() {
  return (
    <section id="special-offers" className="relative py-24 bg-zinc-950 border-t border-zinc-900/60">
      {/* Background Lights */}
      <div className="absolute top-1/2 left-0 h-64 w-64 rounded-full bg-violet-600/5 blur-[100px] pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-3.5 py-1.5 text-xs text-amber-300 border border-zinc-800">
            <Gift className="h-4 w-4" />
            <span>نظام الخصومات التنافسي والعروض</span>
          </div>
          <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl tracking-tight">
            العروض والمناسبات الخاصة بـ SubHook
          </h2>
          <p className="mt-3 text-sm text-zinc-500 max-w-xl mx-auto leading-relaxed">
            استفد من حملاتنا المميزة طوال العام وعروضنا الخاصة لعملاء المجموعات ورواد المشاريع الناشئة.
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SPECIAL_OFFERS.map((offer, index) => {
            const IconComponent = iconMap[offer.iconName] || Gift;
            return (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                key={index}
                className="group relative rounded-2xl border border-zinc-900 bg-zinc-900/10 p-6 hover:border-amber-400/20 hover:bg-zinc-900/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Icon & Badge */}
                  <div className="flex items-center justify-between">
                    <div className="rounded-xl bg-amber-400/10 p-3 text-amber-300 border border-amber-400/5">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    {offer.badgeText && (
                      <span className="rounded bg-amber-400/20 px-2 py-0.5 text-[9px] font-extrabold text-amber-300 border border-amber-500/10">
                        {offer.badgeText}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="mt-5 text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                    {offer.title}
                  </h3>

                  {/* Desc */}
                  <p className="mt-3 text-xs leading-relaxed text-zinc-400 font-normal">
                    {offer.desc}
                  </p>
                </div>

                {/* Micro CTA */}
                <div className="mt-6 pt-4 border-t border-zinc-900/80 flex items-center justify-between">
                  <span className="text-[10px] text-zinc-600 font-mono">CODE: SUB90</span>
                  <a
                    href="https://wa.me/967772121616"
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="text-xs text-amber-400 font-bold hover:text-amber-300 transition flex items-center gap-1"
                  >
                    <span>تفاصيل العرض 💬</span>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
