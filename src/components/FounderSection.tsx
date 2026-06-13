import React from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, CheckCircle, PhoneCall, Mail } from 'lucide-react';

export default function FounderSection() {
  return (
    <section id="about-founder" className="relative py-24 bg-zinc-950 border-t border-zinc-900/40">
      {/* Background decoration */}
      <div className="absolute bottom-0 right-1/3 h-80 w-80 rounded-full bg-amber-500/5 blur-[120px] pointer-events-none"></div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl border border-zinc-900 bg-zinc-900/10 p-8 md:p-12 backdrop-blur-md">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-3.5 py-1.5 text-xs font-bold text-amber-400 border border-amber-500/15">
                💼 المالك والمطور الرئيسي لـ SubHook
              </span>

              <h2 className="text-3xl font-black text-white sm:text-4xl tracking-tight">
                المهندس عبدالرحمن الريمي
              </h2>

              <p className="text-sm sm:text-base leading-relaxed text-zinc-400 font-normal">
                مرحباً بكم. نؤمن في <strong className="text-zinc-200">SubHook</strong> بأن التحول الرقمي والتواجد الاحترافي هما الركيزتان الأساسيتان لنجاح أي علامة تجارية أو طموح شخصي اليوم. لذلك، تم تأسيس هذا القسم ليكون مرجعاً آمناً وعالياً الموثوقية يُوفّر حلول تفعيل مرخصة، واستشارات نمو أصيلة قائمة على استراتيجيات تسويقية حقيقية دون الوقوع في شبك المخالفات الرقمية.
              </p>

              {/* Strict platform rules checklist */}
              <div className="rounded-2xl border border-red-500/10 bg-red-500/5 p-5 space-y-3">
                <div className="flex items-center gap-2.5 text-red-400 font-extrabold text-sm">
                  <ShieldAlert className="h-5 w-5" />
                  <h4>ميثاق النزاهة والالتزام والسياسة المهنية</h4>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                  بموجب ميثاق الخدمة، لا نقبل ولا نقدم أبداً خدمات تفاعلية وهمية أو متابعين وهميين أو أي رشق أو تضليل يخالف سياسة منصات التواصل الاجتماعي (مثل إنستغرام، يوتيوب، سناب شات، إكس). نركز جهودنا بالكامل على:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-300 pt-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>تحسين جودة المحتوى وبناء البيو</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>التسويق الحقيقي والحملات الممولة</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>عناصر الموضة والشعارات العصرية</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>بناء هوية ومتاجر متطورة</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Contact Card Card Column */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-6 sm:p-8 relative overflow-hidden">
                <div className="absolute -left-16 -top-16 h-32 w-32 rounded-full bg-amber-400/10 blur-xl"></div>
                
                <h3 className="text-base font-bold text-white mb-6 border-b border-zinc-800 pb-4">
                  بيانات الاتصال الفوري والموثق
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-emerald-500/10 p-2.5 text-emerald-400 border border-emerald-500/5">
                      <PhoneCall className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-zinc-500 uppercase font-mono block">رقم للتواصل المباشر والواتساب</span>
                      <a href="https://wa.me/967772121616" dir="ltr" className="text-sm font-extrabold text-white hover:text-amber-400 transition block text-right">
                        +967 772 121 616
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-amber-400/10 p-2.5 text-amber-400 border border-amber-400/5">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-zinc-500 uppercase font-mono block">البريد الإلكتروني للعمل</span>
                      <span className="text-xs font-bold text-zinc-300">
                        info@subhook.com
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <a
                    href="https://wa.me/967772121616"
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 py-3.5 text-xs font-bold text-white shadow-md hover:scale-[1.02] active:scale-95 transition cursor-pointer"
                  >
                    <span>طلب استشارة أو تفعيل عبر واتساب</span>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
