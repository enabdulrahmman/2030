import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ShieldCheck, TicketCheck, Users } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
}

export default function Hero({ onExploreClick }: HeroProps) {
  return (
    <div className="relative overflow-hidden bg-zinc-950 pt-20 pb-16 md:pt-28 md:pb-24">
      {/* Premium Ambient Light Effect */}
      <div className="absolute top-0 right-1/4 h-[350px] w-[350px] rounded-full bg-amber-500/10 blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-10 left-1/4 h-[300px] w-[300px] rounded-full bg-violet-600/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-zinc-900/40 blur-[140px] pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Promotional Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 rounded-full border border-amber-500/20 bg-amber-500/5 px-4 py-1.5 text-xs text-amber-300"
        >
          <Sparkles className="h-4 w-4 animate-pulse text-amber-400" />
          <span className="font-medium tracking-wide">عروض موسمية وخصومات حصرية تصل إلى 90% 🎯</span>
        </motion.div>

        {/* Big Premium Titles */}
        <div className="mt-8 space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl font-black tracking-tight text-white sm:text-6xl"
          >
            <span className="block font-sans text-zinc-400 font-normal text-2xl sm:text-3xl mb-3">
              قسم الاشتراكات والخدمات الرقمية في
            </span>
            <span className="relative inline-block">
              <span className="absolute -inset-x-2 -bottom-2 h-4 w-full bg-gradient-to-r from-amber-500/30 to-violet-600/30 blur-sm rounded-lg"></span>
              <span className="relative bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
                مـنـصـة SubHook
              </span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto max-w-3xl text-sm leading-relaxed text-zinc-400 sm:text-lg sm:leading-loose text-center font-normal px-2"
          >
            نوفر في <strong className="text-zinc-200 font-bold">SubHook</strong> مجموعة واسعة من الاشتراكات والخدمات الرقمية المرخصة رسميًا مع عروض وخصومات موسمية مميزة. نركز على تزويد الأفراد والشركات بأبرز أدوات الذكاء الاصطناعي، برامج التصميم، الأكاديميات التعليمية، وتهيئة مشاريع التجارة الإلكترونية وإدارة حسابات التواصل وفقًا لأعلى معايير الأمان وبشكل رسمي وقانوني تمامًا.
          </motion.p>
        </div>

        {/* Buttons and call to actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4 px-4"
        >
          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 px-8 py-4 text-sm font-black text-zinc-950 transition-all hover:scale-[1.03] hover:shadow-lg hover:shadow-amber-500/20 active:scale-95 cursor-pointer"
          >
            تصفح الاشتراكات والخدمات الرقمية
          </button>
          
          <a
            href="https://wa.me/967772121616"
            target="_blank"
            referrerPolicy="no-referrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/60 px-8 py-4 text-sm font-bold text-zinc-200 transition-all hover:bg-zinc-800 hover:border-zinc-700 active:scale-95"
          >
            <span>طلب عرض مخصص عبر واتساب</span>
          </a>
        </motion.div>

        {/* Value Prop Badges */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 gap-4 border-t border-zinc-900/80 pt-10 sm:grid-cols-4 max-w-5xl mx-auto"
        >
          <div className="flex flex-col items-center gap-2 rounded-2xl border border-zinc-900 bg-zinc-950 p-4 text-center">
            <div className="rounded-xl bg-amber-500/10 p-2.5 text-amber-400">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-xs sm:text-sm font-semibold text-zinc-200">اشتراكات نظامية ورسمية</h3>
            <p className="text-[10px] sm:text-xs text-zinc-500">مضمونة 100% دون انقطاع</p>
          </div>

          <div className="flex flex-col items-center gap-2 rounded-2xl border border-zinc-900 bg-zinc-950 p-4 text-center">
            <div className="rounded-xl bg-violet-600/10 p-2.5 text-violet-400">
              <TicketCheck className="h-6 w-6" />
            </div>
            <h3 className="text-xs sm:text-sm font-semibold text-zinc-200">خصومات تصل لـ 90%</h3>
            <p className="text-[10px] sm:text-xs text-zinc-500">أقل تسعير للمنتجات الرقمية</p>
          </div>

          <div className="flex flex-col items-center gap-2 rounded-2xl border border-zinc-900 bg-zinc-950 p-4 text-center">
            <div className="rounded-xl bg-emerald-600/10 p-2.5 text-emerald-400">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-xs sm:text-sm font-semibold text-zinc-200">خصم هائل للكميات</h3>
            <p className="text-[10px] sm:text-xs text-zinc-500">باقات خاصة بفرق العمل والشركات</p>
          </div>

          <div className="flex flex-col items-center gap-2 rounded-2xl border border-zinc-900 bg-zinc-950 p-4 text-center">
            <div className="rounded-xl bg-teal-500/10 p-2.5 text-teal-400">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="text-xs sm:text-sm font-semibold text-zinc-200">سرية وخصوصية تامة</h3>
            <p className="text-[10px] sm:text-xs text-zinc-500">لا نشارك بياناتك أو حساباتك أبداً</p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
