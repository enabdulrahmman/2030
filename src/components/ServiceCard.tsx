import React from 'react';
import { motion } from 'motion/react';
import { Check, Plus, Sparkles, MessageSquare } from 'lucide-react';
import { ServiceItem } from '../types';
import { convertPriceText } from '../utils/currency';

interface ServiceCardProps {
  key?: string | number;
  item: ServiceItem;
  isSelected: boolean;
  onToggleSelect: () => void;
  onQuickInquire: () => void;
  selectedCurrency: string;
}

export default function ServiceCard({
  item,
  isSelected,
  onToggleSelect,
  onQuickInquire,
  selectedCurrency,
}: ServiceCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.35 }}
      onClick={onToggleSelect}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-zinc-900/40 p-6 backdrop-blur-md transition-all duration-300 cursor-pointer ${
        isSelected
          ? 'border-amber-400 bg-zinc-900/90 shadow-lg shadow-amber-500/5'
          : 'border-zinc-800 hover:border-amber-400/50 hover:bg-zinc-900/60'
      }`}
    >
      {/* Background radial highlight */}
      <div className="absolute -top-12 -right-12 h-36 w-36 rounded-full bg-gradient-to-br from-amber-400/5 to-violet-600/5 blur-2xl transition-all duration-300 group-hover:from-amber-400/10 group-hover:to-violet-600/10" />

      {/* Decorative metal shine overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/2 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

      <div>
        {/* Top bar with badge or category marker */}
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-lg bg-zinc-950 px-2.5 py-1 text-[10px] font-semibold text-zinc-400 tracking-wider">
            {item.englishName ? item.englishName.toUpperCase() : 'PREMIUM SERVICE'}
          </span>
          
          {item.badge && (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/15 px-2.5 py-0.5 text-[10px] font-bold text-amber-300 border border-amber-400/10">
              <Sparkles className="h-2.5 w-2.5 text-amber-400" />
              <span>{item.badge}</span>
            </span>
          )}
        </div>

        {/* Card Title Arabic */}
        <h3 className="mt-4 text-xl font-bold tracking-tight text-white group-hover:text-amber-300 transition-colors duration-200">
          {item.name}
        </h3>

        {/* Short Description */}
        <p className="mt-3 text-xs leading-relaxed text-zinc-400 font-normal">
          {item.description}
        </p>

        {/* Price Tag Details */}
        <div className="mt-5 flex items-baseline gap-2 rounded-xl bg-zinc-950/80 p-3 border border-zinc-850">
          <span className="text-sm font-semibold text-zinc-500">العرض:</span>
          <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-lg font-black text-transparent">
            {convertPriceText(item.priceText, selectedCurrency)}
          </span>
          {item.originalPriceText && (
            <span className="text-xs font-medium text-zinc-600 line-through mr-1">
              {convertPriceText(item.originalPriceText, selectedCurrency)}
            </span>
          )}
          {item.discountPercentage && (
            <span className="mr-auto rounded bg-red-500/10 px-1.5 py-0.5 text-[9px] font-extrabold text-red-400 border border-red-500/5">
              وفر {item.discountPercentage}%
            </span>
          )}
        </div>

        {/* Core Features list */}
        <div className="mt-6 space-y-2.5">
          <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-500 uppercase block">
            المميزات والضوابط :
          </span>
          {item.features.map((feat, index) => (
            <div key={index} className="flex items-start gap-2.5 text-xs text-zinc-300">
              <Check className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
              <span className="font-normal leading-relaxed text-right">{feat}</span>
            </div>
          ))}
        </div>

        {/* Extra subFeatures or parameters */}
        {item.subFeatures && item.subFeatures.length > 0 && (
          <div className="mt-5 rounded-xl bg-zinc-950/40 p-3 border border-zinc-900/60">
            <span className="text-[9px] font-mono font-bold tracking-wider text-amber-400/70 block mb-1.5">
              تفاصيل تفعيل إضافية :
            </span>
            <div className="space-y-1.5">
              {item.subFeatures.map((sub, idx) => (
                <div key={idx} className="flex items-start gap-1.5 text-[11px] text-zinc-400">
                  <div className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-amber-400" />
                  <span className="leading-relaxed text-right">{sub}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Card actions */}
      <div className="mt-8 pt-4 border-t border-zinc-850/60 flex gap-2">
        {/* Toggle Select / Cart add */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleSelect();
          }}
          className={`flex-1 flex items-center justify-center gap-2.5 rounded-xl py-3 px-4 text-xs font-black transition-all cursor-pointer ${
            isSelected
              ? 'bg-amber-400 text-zinc-950 hover:bg-amber-300'
              : 'border border-zinc-800 bg-zinc-900/80 text-zinc-300 hover:border-zinc-700 hover:text-white'
          }`}
        >
          {isSelected ? (
            <>
              <Check className="h-4 w-4 stroke-[3]" />
              <span>تم تحديده للطلب</span>
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" />
              <span>إضافة لسلّة الطلبات</span>
            </>
          )}
        </button>

        {/* Quick Direct Inquire via WhatsApp */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickInquire();
          }}
          title="استفسار مباشر وسريع عبر واتساب"
          className="flex h-10 w-11 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all cursor-pointer"
        >
          <MessageSquare className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
}
