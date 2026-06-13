import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Trash2, ArrowLeft, Send, Sparkles, MessageCircleCode } from 'lucide-react';
import { ServiceItem } from '../types';
import { convertPriceText } from '../utils/currency';

interface InteractiveInquiryProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItems: ServiceItem[];
  onRemoveItem: (id: string) => void;
  onClearAll: () => void;
  selectedCurrency: string;
}

export default function InteractiveInquiry({
  isOpen,
  onClose,
  selectedItems,
  onRemoveItem,
  onClearAll,
  selectedCurrency,
}: InteractiveInquiryProps) {
  const [customNote, setCustomNote] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [isValidPromo, setIsValidPromo] = useState(false);
  const [promoMessage, setPromoMessage] = useState('');

  const handleApplyPromo = () => {
    if (!promoCode.trim()) return;
    const lowerCode = promoCode.trim().toUpperCase();
    if (lowerCode === 'SUB90' || lowerCode === 'SUBHOOK' || lowerCode === 'FREE') {
      setIsValidPromo(true);
      setPromoMessage('🎉 تم قبول الكوبون بنجاح! خصم إضافي فوري ممتاز بالطلب.');
    } else {
      setIsValidPromo(false);
      setPromoMessage('❌ كوبون غير صالح أو انتهت صلاحيته.');
    }
  };

  const handleSendWhatsApp = () => {
    if (selectedItems.length === 0) return;

    // Build the Arabic message
    let message = `مرحبا م. عبدالرحمن الريمي،\n`;
    message += `أريد هذا الطلب الذي تمت إضافته إلى السلة كما هو:\n\n`;

    selectedItems.forEach((item, index) => {
      const convertedPrice = convertPriceText(item.priceText, selectedCurrency);
      const priceTextWithAlt = selectedCurrency !== 'USD'
        ? `${convertedPrice} (يعادل ${item.priceText})`
        : item.priceText;
      message += `${index + 1}. *${item.name}* (${item.englishName || ''}) \n`;
      message += `   🔹 المميز: ${priceTextWithAlt}\n\n`;
    });

    if (selectedItems.length >= 2) {
      message += `💡 *باقة كميات:* أرجو تطبيق خصم الكميات الخاص بالمجموعات.\n`;
    }

    if (customNote.trim()) {
      message += `📝 *ملاحظات إضافية:* ${customNote.trim()}\n`;
    }

    if (isValidPromo) {
      message += `🎁 *رمز الخصم المفعل:* ${promoCode.trim().toUpperCase()}\n`;
    }

    message += `\n🔗 تم التجهيز عبر متجر SubHook التفاعلي.\n`;
    message += `أرجو تزويدي بالأسعار النهائية لطلب تفعيلي الفوري.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/967772121616?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm cursor-pointer"
          />

          {/* Sliding Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed inset-y-0 right-0 z-50 flex h-full w-full flex-col bg-zinc-950 border-l border-zinc-800 shadow-2xl sm:max-w-md"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-900 px-6 py-5">
              <div className="flex items-center gap-2.5">
                <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
                  <ShoppingBag className="h-4 w-4" />
                  {selectedItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse" />
                  )}
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">حقيبة الطلبات التفاعلية</h2>
                  <p className="text-[10px] text-zinc-500">اختر، صمّم بريدك، وتواصل للتنشيط</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="rounded-lg border border-zinc-900 bg-zinc-900/30 p-2 text-zinc-400 hover:text-white transition cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content Drawer */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
              {selectedItems.length === 0 ? (
                /* Empty state */
                <div className="flex h-[350px] flex-col items-center justify-center text-center">
                  <div className="rounded-full bg-zinc-900 p-5 text-zinc-600 mb-4 border border-zinc-850">
                    <ShoppingBag className="h-10 w-10 stroke-[1.5]" />
                  </div>
                  <h3 className="text-sm font-semibold text-zinc-300">حقيبة الاستفسار فارغة</h3>
                  <p className="mt-2 max-w-[240px] text-xs text-zinc-500 leading-relaxed">
                    تصفح باقات الخدمات في الأسفل، وأضف الاشتراكات التي ترغب بالاستفادة من عروضها إلى السلة لتسليمها لمهندس التفعيل بضغطة واحدة.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-6 inline-flex items-center gap-1.5 rounded-xl bg-zinc-900 px-5 py-2.5 text-xs font-bold text-amber-400 border border-zinc-800 hover:bg-zinc-850 transition cursor-pointer"
                  >
                    <span>العودة للتصفح</span>
                    <ArrowLeft className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : (
                /* Selected Items List */
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-400 font-bold">الاشتراكات المحددة ({selectedItems.length})</span>
                    <button
                      onClick={onClearAll}
                      className="text-red-400 font-bold hover:text-red-300 transition flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>تفريغ الكل</span>
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {selectedItems.map((item) => (
                      <motion.div
                        layout
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="flex items-start justify-between gap-3 rounded-xl border border-zinc-900 bg-zinc-900/30 p-3"
                      >
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-white truncate">{item.name}</h4>
                          <span className="text-[10px] text-zinc-500 block truncate mt-0.5">{item.englishName}</span>
                          <span className="inline-block mt-2 rounded bg-amber-500/10 px-1.5 py-0.5 text-[9px] font-bold text-amber-300 border border-amber-400/5">
                            {convertPriceText(item.priceText, selectedCurrency)}
                          </span>
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-zinc-600 hover:text-red-400 p-1.5 transition rounded-lg hover:bg-zinc-900 cursor-pointer"
                          title="حذف"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </motion.div>
                    ))}
                  </div>

                  {/* Quantity based discount recommendation */}
                  {selectedItems.length >= 2 && (
                    <div className="rounded-xl bg-purple-500/10 p-3 border border-purple-500/20 flex gap-2">
                      <Sparkles className="h-5 w-5 text-purple-400 shrink-0 mt-0.5" />
                      <div>
                        <h5 className="text-xs font-bold text-purple-300">ميزة باقة المجموعات نشطة</h5>
                        <p className="text-[10px] text-zinc-400 leading-relaxed mt-0.5">
                          لقد قمت باختيار خدمتين أو أكثر. سيقوم م. عبدالرحمن الريمي بتطبيق خصم كميات إضافي خاص ومميز لك عند التفعيل.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Interactive Option Notes */}
                  <div className="space-y-2 pt-4 border-t border-zinc-900">
                    <label className="text-xs font-bold text-zinc-300 block">هل لديك ملاحظات أو تطلعات خاصة بالاشتراكات؟</label>
                    <textarea
                      value={customNote}
                      onChange={(e) => setCustomNote(e.target.value)}
                      placeholder="امثلة: تفعيل سنوي، أرغب في إضافة مستخدمين إضافيين، تفاصيل عن بريدي، الخ..."
                      rows={3}
                      className="w-full rounded-xl border border-zinc-900 bg-zinc-900/50 p-3 text-xs text-zinc-200 outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition"
                    />
                  </div>

                  {/* Promo Code Fields */}
                  <div className="space-y-2 pt-2">
                    <label className="text-xs font-bold text-zinc-300 block">هل تمتلك كوبون خصم؟</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="أدخل الرمز هنا (مثال: SUB90)"
                        className="flex-1 rounded-xl border border-zinc-900 bg-zinc-900/50 px-3 py-2 text-xs text-zinc-200 outline-none focus:border-amber-400 transition"
                      />
                      <button
                        onClick={handleApplyPromo}
                        className="rounded-xl bg-zinc-900 border border-zinc-800 px-4 py-2 text-xs font-extrabold text-amber-300 hover:bg-zinc-800 transition cursor-pointer"
                      >
                        تطبيق
                      </button>
                    </div>
                    {promoMessage && (
                      <p className={`text-[10px] font-semibold ${isValidPromo ? 'text-emerald-400' : 'text-red-400'}`}>
                        {promoMessage}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Sticky Actions in drawer footer */}
            {selectedItems.length > 0 && (
              <div className="border-t border-zinc-900 bg-zinc-950/90 p-5 space-y-3">
                <div className="rounded-xl bg-amber-500/5 border border-amber-500/10 p-3">
                  <p className="text-[10px] text-zinc-500 leading-normal text-right">
                    ⚠️ <strong className="text-zinc-300">ملاحظة التفعيل:</strong> تختلف الأسعار وتخضع لبعض الضوابط حسب التحديثات الرسمية للمنصات. نحن نضمن حماية وتفعيلاً رسمياً مضموناً بالكامل بنسبة 100%.
                  </p>
                </div>

                <button
                  onClick={handleSendWhatsApp}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 py-4 text-sm font-black text-white shadow-xl shadow-emerald-600/10 hover:shadow-emerald-600/20 hover:scale-[1.01] transition duration-300 cursor-pointer"
                >
                  <Send className="h-4 w-4" />
                  <span>تأكيد الباقة والتواصل م. عبدالرحمن</span>
                </button>

                <p className="text-center text-[9px] text-zinc-600 font-mono tracking-wider">
                  M. ABDULRAHMAN AL-REEMI | SUBHOOK
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
