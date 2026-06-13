import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, MessageSquareCode, PlusCircle, Check, X, ShieldCheck } from 'lucide-react';

export interface Review {
  id: string;
  name: string;
  country: string;
  avatarColor: string;
  rating: number;
  text: string;
}

export const INITIAL_REVIEWS: Review[] = [
  // Row 1
  {
    id: 'r1',
    name: 'أبو فهد العتيبي',
    country: 'المملكة العربية السعودية 🇸🇦',
    avatarColor: 'bg-emerald-500/10 text-emerald-400',
    rating: 5,
    text: 'تفعيل اشتراك شات جي بي تي تم خلال دقائق معدودة وبحسابي الشخصي. الخدمة رسمية وسريعة جداً أنصح بالتعامل معه.'
  },
  {
    id: 'r2',
    name: 'م. خالد اليافعي',
    country: 'اليمن 🇾🇪',
    avatarColor: 'bg-amber-500/10 text-amber-400',
    rating: 5,
    text: 'كان عندي مشكلة بعقد تسويقي مع عميل خارجي والمهندس عبدالرحمن فحص لي البنود ووضح لي الثغرات القانونية. يستاهل كل ريال.'
  },
  {
    id: 'r3',
    name: 'سارة المهيري',
    country: 'الإمارات العربية المتحدة 🇦🇪',
    avatarColor: 'bg-violet-500/10 text-violet-400',
    rating: 5,
    text: 'الاشتراك في أدوبي كامل البرامج وفر علي مبالغ ضخمة وربط بريدي الشخصي رسمي 100% بدون أي مشاكل أو انقطاع.'
  },
  {
    id: 'r4',
    name: 'أحمد ذي غيبان',
    country: 'اليمن 🇾🇪',
    avatarColor: 'bg-blue-500/10 text-blue-400',
    rating: 5,
    text: 'كورس الساب هوك لتعليم تجارة الاشتراكات فادني كثير فككت لي شفرات المجال وعرفت من وين وكيف أجيب أسعار الجملة.'
  },
  {
    id: 'r5',
    name: 'جود الشهري',
    country: 'المملكة العربية السعودية 🇸🇦',
    avatarColor: 'bg-teal-500/10 text-teal-400',
    rating: 5,
    text: 'تصميم بيو الحساب وترتيب هايلايت انستقرام رفع مبيعات متجري بنسبة ملحوظة وصار البروفايل يفتح النفس.'
  },
  {
    id: 'r6',
    name: 'د. طلال السويدي',
    country: 'دولة الكويت 🇰🇼',
    avatarColor: 'bg-rose-500/10 text-rose-400',
    rating: 5,
    text: 'شرينا حزمة مايكروسوفت 365 للفريق كامل، تفعيل مضمون والمساحة السحابية ريحتنا من تخزين الهاردوير الخارجي.'
  },
  {
    id: 'r7',
    name: 'أصيل الحمادي',
    country: 'اليمن 🇾🇪',
    avatarColor: 'bg-amber-500/10 text-amber-400',
    rating: 5,
    text: 'سرعة التجاوب والأخلاق العالية ميزة نادرة، المهندس عبدالرحمن باله طويل ويهمه رضا العميل قبل الفلوس.'
  },
  {
    id: 'r8',
    name: 'فيصل مروعي',
    country: 'المملكة العربية السعودية 🇸🇦',
    avatarColor: 'bg-emerald-500/10 text-emerald-400',
    rating: 5,
    text: 'كانفا برو شغال معاي أكثر من 6 أشهر بدون المشاكل المعتادة بالغروبات المشتركة. شكراً لكم.'
  },
  {
    id: 'r9',
    name: 'ماجد الريمي',
    country: 'اليمن 🇾🇪',
    avatarColor: 'bg-purple-500/10 text-purple-400',
    rating: 5,
    text: 'تصميم متجر جوجل سايت فكرته عبقرية للي ميزانيته بسيطة، وفرت مصاريف الاشتراك الشهري لمنصات المتاجر الثانية.'
  },
  {
    id: 'r10',
    name: 'لينا القحطاني',
    country: 'المملكة العربية السعودية 🇸🇦',
    avatarColor: 'bg-yellow-500/10 text-yellow-500',
    rating: 5,
    text: 'تجاوب سريع جداً بخصوص كاب كت برو، تفعيل بريدي بالكامل وكل الخصائص الاحترافية ممتازة.'
  },
  {
    id: 'r11',
    name: 'عصام الشرعبي',
    country: 'اليمن 🇾🇪',
    avatarColor: 'bg-teal-500/10 text-teal-400',
    rating: 5,
    text: 'أخيراً مكان مضمون أحصل منه على أدوات الذكاء الاصطناعي وبدون خوف من قفل الحسابات فجأة.'
  },
  {
    id: 'r12',
    name: 'خلف الشمري',
    country: 'المملكة العربية السعودية 🇸🇦',
    avatarColor: 'bg-indigo-500/10 text-indigo-400',
    rating: 5,
    text: 'إدارة الحملة الإعلانية على سناب شات جابت لنا عملاء حقيقيين وحققت مبيعات ممتازة، شغل مدروس ومتقن.'
  },
  {
    id: 'r13',
    name: 'غمدان القدسي',
    country: 'اليمن 🇾🇪',
    avatarColor: 'bg-sky-500/10 text-sky-400',
    rating: 5,
    text: 'الاستشارة لمدة ربع ساعة وضحت لي أخطاء شنيعة في حسابي كنت أسويها بدون ما أدري، الله يسعدك مهندس.'
  },
  {
    id: 'r14',
    name: 'نورة الدوسري',
    country: 'المملكة العربية السعودية 🇸🇦',
    avatarColor: 'bg-fuchsia-500/10 text-fuchsia-400',
    rating: 5,
    text: 'اشتراك لينكد إن بريميوم تفعل على حسابي مباشرة، الشارة الذهبية مع الدورات التدريبية فرقت كثير بالسي في المهني.'
  },
  {
    id: 'r15',
    name: 'معد اليريمي',
    country: 'اليمن 🇾🇪',
    avatarColor: 'bg-cyan-500/10 text-cyan-400',
    rating: 5,
    text: 'باقة رواد الأعمال وفرت لي كل شيء للبداية: الموقع، اللوجو، كتابة البيو، وبسعر مذهل جداً مقارنة بالسوق.'
  },
  {
    id: 'r16',
    name: 'حامد الحربي',
    country: 'المملكة العربية السعودية 🇸🇦',
    avatarColor: 'bg-orange-500/10 text-orange-400',
    rating: 5,
    text: 'اشتراك نوشن بلس عظيم جداً لترتيب مهام شركتنا الناشئة، التفعيل رسمي ومباشر.'
  },
  {
    id: 'r17',
    name: 'بشير الوصابي',
    country: 'اليمن 🇾🇪',
    avatarColor: 'bg-pink-500/10 text-pink-400',
    rating: 5,
    text: 'تنسيق القسمة الرابعة لحساب الانستغرام جعل الهوية بصرية عصرية وفخمة للغاية، تجربة ممتازة مع المطور.'
  },
  {
    id: 'r18',
    name: 'فارس العسيري',
    country: 'المملكة العربية السعودية 🇸🇦',
    avatarColor: 'bg-lime-500/10 text-lime-400',
    rating: 5,
    text: 'التعامل رسمي وموثوق، والأسعار مناسبة جداً مع ضمان مستمر. لن يكون التعامل الأخير.'
  },
  {
    id: 'r19',
    name: 'عبدالله السنحاني',
    country: 'اليمن 🇾🇪',
    avatarColor: 'bg-emerald-500/10 text-emerald-400',
    rating: 5,
    text: 'كتابة نصوص صفحات الموقع عندي كانت بأسلوب تسويقي رائع يلامس تطلعات الزوار ويقنعهم بالشراء.'
  },
  {
    id: 'r20',
    name: 'منى البقمي',
    country: 'المملكة العربية السعودية 🇸🇦',
    avatarColor: 'bg-purple-500/10 text-purple-400',
    rating: 5,
    text: 'خدمة سريعة في توفير اشتراك كورسيرا بلس، شهادات ميتا وجوجل فادتني بالدراسة والتوظيف.'
  },
  {
    id: 'r21',
    name: 'وليد السعدي',
    country: 'سلطنة عمان 🇴🇲',
    avatarColor: 'bg-amber-500/10 text-amber-400',
    rating: 5,
    text: 'سعيد جداً لمعرفتي بمنصة ساب هوك، تفعيل فوتوشوب بذكائه الاصطناعي الجديد غير مجرى عملي بالتصميم.'
  },
  {
    id: 'r22',
    name: 'تركي الرشيد',
    country: 'المملكة العربية السعودية 🇸🇦',
    avatarColor: 'bg-violet-500/10 text-violet-400',
    rating: 5,
    text: 'بدون لف ودوران، أفضل اشتراكات أسرية لـ مايكروسوفت، وفرنا أكثر من 80% من القيمة الأصلية.'
  },
  {
    id: 'r23',
    name: 'عمار الحاشدي',
    country: 'اليمن 🇾🇪',
    avatarColor: 'bg-blue-500/10 text-blue-400',
    rating: 5,
    text: 'صفحة الشروط والسياسات تم استخدامها فوراً وتفعيل بوابة الدفع بفضل دقة بنودها القانونية المتوافقة.'
  },
  {
    id: 'r24',
    name: 'خالد المطيري',
    country: 'المملكة العربية السعودية 🇸🇦',
    avatarColor: 'bg-rose-500/10 text-rose-400',
    rating: 5,
    text: 'أدوات تحرير الفيديوهات ساعدتني في إنجاز شغل العملاء بأسرع وقت وأعلى دقة متوفرة.'
  },
  {
    id: 'r25',
    name: 'سامي الأنسي',
    country: 'اليمن 🇾🇪',
    avatarColor: 'bg-teal-500/10 text-teal-400',
    rating: 5,
    text: 'نصوص البيو وتنسيق ألوان حساب تويتر زادت المتابعين الحقيقيين والتفاعل العضوي بشكل رائع.'
  },
  {
    id: 'r26',
    name: 'بندر الهذلي',
    country: 'المملكة العربية السعودية 🇸🇦',
    avatarColor: 'bg-yellow-500/10 text-yellow-500',
    rating: 5,
    text: 'اشتراك سكيلشير المضمون جعلني أتعلم المونتاج ثلاثي الأبعاد بأرخص كلفة.'
  },
  {
    id: 'r27',
    name: 'مأمون المحويتي',
    country: 'اليمن 🇾🇪',
    avatarColor: 'bg-indigo-500/10 text-indigo-400',
    rating: 5,
    text: 'المهندس عبدالرحمن شخص احترافي تهمه سمعة الخدمة، تفعيل برامج أدوبي لديه قانوني مئة بالمئة.'
  },
  {
    id: 'r28',
    name: 'جواهر الفهد',
    country: 'دولة قطر 🇶🇦',
    avatarColor: 'bg-fuchsia-500/10 text-fuchsia-400',
    rating: 5,
    text: 'خدمة عملاء راقية جداً عبر الواتساب وتأكيد مباشر قبل التحويل، مصداقية وأمان.'
  },
  {
    id: 'r29',
    name: 'هشام ذباب',
    country: 'اليمن 🇾🇪',
    avatarColor: 'bg-cyan-500/10 text-cyan-400',
    rating: 5,
    text: 'المساعد الرقمي المكتوب بالذكاء الاصطناعي الذي اقترحوه عليّ وفر لي ساعات عمل مكررة يومياً.'
  },
  {
    id: 'r30',
    name: 'متعب الدوسري',
    country: 'المملكة العربية السعودية 🇸🇦',
    avatarColor: 'bg-orange-500/10 text-orange-400',
    rating: 5,
    text: 'أقوى عروض موسمية، حصلنا على باقة متكاملة بسعر لم نحلم به، بالتوفيق مهندس عبدالرحمن.'
  },
  {
    id: 'r31',
    name: 'رياض الشيباني',
    country: 'اليمن 🇾🇪',
    avatarColor: 'bg-purple-500/10 text-purple-400',
    rating: 5,
    text: 'توليد الصور بدقة فائقة من ميدجورني تفعل معاي بسهولة تامة، جودة خرافية ومصداقية بالتعامل.'
  },
  {
    id: 'r32',
    name: 'سليمان الراجحي',
    country: 'المملكة العربية السعودية 🇸🇦',
    avatarColor: 'bg-emerald-500/10 text-emerald-400',
    rating: 5,
    text: 'أخلاق عالية وضمان حقيقي، تفعيل منتجات مايكروسوفت وأدوبي كان ممتازاً ولجميع أجهزة الاستوديو.'
  },
  // Newly Added Brief, Factual evaluations & Success Stories (r33 - r50)
  {
    id: 'r33',
    name: 'فهد اليامي',
    country: 'المملكة العربية السعودية 🇸🇦',
    avatarColor: 'bg-blue-500/10 text-blue-400',
    rating: 5,
    text: 'اشتراك يوتيوب بريميوم تفعل على حسابي الأصلي مباشرة ودون انقطاع. أرخص سعر بالسوق.'
  },
  {
    id: 'r34',
    name: 'م. عادل القباطي',
    country: 'اليمن 🇾🇪',
    avatarColor: 'bg-pink-500/10 text-pink-400',
    rating: 5,
    text: 'تفعيل سريع لأدوب وشات جي بي تي. خدمة حقيقية ودعم فني متعاون ومتجاوب طوال اليوم.'
  },
  {
    id: 'r35',
    name: 'ريما العتيبي',
    country: 'المملكة العربية السعودية 🇸🇦',
    avatarColor: 'bg-violet-500/10 text-violet-400',
    rating: 5,
    text: 'كاب كت برو تفعل بريدي بالكامل ووفرت أكثر من 70% من التكلفة الأصلية. تجربة ممتازة.'
  },
  {
    id: 'r36',
    name: 'أسامة قطب',
    country: 'جمهورية مصر العربية 🇪🇬',
    avatarColor: 'bg-emerald-500/10 text-emerald-300',
    rating: 5,
    text: 'فريق موثوق، اشتراك مايكروسوفت تفعل فورا والمساحة السحابية أمنة ورسمية بالكامل.'
  },
  {
    id: 'r37',
    name: 'سيف المزروعي',
    country: 'الإمارات العربية المتحدة 🇦🇪',
    avatarColor: 'bg-amber-500/10 text-amber-400',
    rating: 5,
    text: 'تفعيل فوري لبرامج أدوبي. ربط رسمي بالبريد الشخصي ومصداقية تامة في الضمان والتعامل.'
  },
  {
    id: 'r38',
    name: 'منى الحريري',
    country: 'المملكة العربية السعودية 🇸🇦',
    avatarColor: 'bg-cyan-500/10 text-cyan-400',
    rating: 5,
    text: 'بفضل الله ثم باقة رواد الأعمال وتجهيز الهوية البصرية، انطلق متجرنا بنجاح كبير.'
  },
  {
    id: 'r39',
    name: 'أحمد السقاف',
    country: 'اليمن 🇾🇪',
    avatarColor: 'bg-orange-500/10 text-orange-400',
    rating: 5,
    text: 'كورس تجارة الاشتراكات ساب هوك كنز حقيقي لتعلم أسرار تفعيل الخدمات الرقمية والمتاجر.'
  },
  {
    id: 'r40',
    name: 'بندر المطيري',
    country: 'المملكة العربية السعودية 🇸🇦',
    avatarColor: 'bg-yellow-500/10 text-yellow-500',
    rating: 5,
    text: 'اشتراك GPT Plus أصلي ومضمون لحسابي مباشرة. جودة مذهلة وسرعة استجابة فائقة.'
  },
  {
    id: 'r41',
    name: 'د. عمر الشمري',
    country: 'المملكة العربية السعودية 🇸🇦',
    avatarColor: 'bg-indigo-500/10 text-indigo-400',
    rating: 5,
    text: 'توفير مالي كبير بفضل تفعيل حزمة أوفيس العائلية. البرامج أصلية من مايكروسوفت تماما.'
  },
  {
    id: 'r42',
    name: 'هديل الحربي',
    country: 'المملكة العربية السعودية 🇸🇦',
    avatarColor: 'bg-teal-500/10 text-teal-400',
    rating: 5,
    text: 'تنسيق ترتيب حساب انستغرام وتصميم البيو والهايلايت جعل البروفايل يشد العميل ويزيد الثقة.'
  },
  {
    id: 'r43',
    name: 'مروان القدسي',
    country: 'اليمن 🇾🇪',
    avatarColor: 'bg-purple-500/10 text-purple-400',
    rating: 5,
    text: 'شعار أنيق جداً لمتجرنا الجديد مع باقة متكاملة للتسويق وجلب العملاء. أنصح بالخدمات.'
  },
  {
    id: 'r44',
    name: 'صقر السبيعي',
    country: 'المملكة العربية السعودية 🇸🇦',
    avatarColor: 'bg-rose-500/10 text-rose-400',
    rating: 5,
    text: 'كانفا برو تفعل آمن وسريع وبسعر رمزي ومزايا كاملة لفريق العمل كاملاً. شكراً لكم.'
  },
  {
    id: 'r45',
    name: 'رانيا المري',
    country: 'دولة قطر 🇶🇦',
    avatarColor: 'bg-lime-500/10 text-lime-400',
    rating: 5,
    text: 'اشتراك كورسيرا بلس تفعل بنجاح وسعر رائع ووفر علي مبالغ باهظة في التعلم الرقمي المعتمد.'
  },
  {
    id: 'r46',
    name: 'وليد الحاشدي',
    country: 'اليمن 🇾🇪',
    avatarColor: 'bg-emerald-500/10 text-emerald-400',
    rating: 5,
    text: 'فحص بنود العقد مع المستثمر حماني من ثغرات قانونية كبيرة. سرعة وخبرة عالية.'
  },
  {
    id: 'r47',
    name: 'م. إياد قطان',
    country: 'المملكة العربية السعودية 🇸🇦',
    avatarColor: 'bg-violet-500/10 text-violet-400',
    rating: 5,
    text: 'احترافية متناهية وسرعة مدهشة في تفكيك وتفعيل رخص البرامج المتكاملة ومطابقتها للمواصفات.'
  },
  {
    id: 'r48',
    name: 'بسمة الجابري',
    country: 'سلطنة عمان 🇴🇲',
    avatarColor: 'bg-amber-500/10 text-amber-500',
    rating: 5,
    text: 'خدمة سريعة لحل مشكلة اشتراك نوشن وتفعيله بنجاح. مصداقية ملموسة وراقية.'
  },
  {
    id: 'r49',
    name: 'فيصل النفيعي',
    country: 'المملكة العربية السعودية 🇸🇦',
    avatarColor: 'bg-indigo-500/10 text-indigo-400',
    rating: 5,
    text: 'شات جي بي تي أداة يومية في منتهى الفاعلية لأبحاثي وتلخيصاتي الطبية المتقدمة والحمد لله.'
  },
  {
    id: 'r50',
    name: 'طارق الهمداني',
    country: 'اليمن 🇾🇪',
    avatarColor: 'bg-teal-500/10 text-teal-400',
    rating: 5,
    text: 'سرعة البرق في التسليم، ثقة عالية وأمان مستمر، م. عبدالرحمن محترف بحق.'
  }
];

const WORLD_COUNTRIES = [
  "المملكة العربية السعودية 🇸🇦",
  "اليمن 🇾🇪",
  "جمهورية مصر العربية 🇪🇬",
  "الإمارات العربية المتحدة 🇦🇪",
  "دولة الكويت 🇰🇼",
  "دولة قطر 🇶🇦",
  "سلطنة عمان 🇴🇲",
  "مملكة البحرين 🇧🇭",
  "الأردن 🇯🇴",
  "العراق 🇮🇶",
  "فلسطين 🇵🇸",
  "سوريا 🇸🇾",
  "لبنان 🇱🇧",
  "الجزائر 🇩🇿",
  "المغرب 🇲🇦",
  "تونس 🇹🇳",
  "ليبيا 🇱🇾",
  "السودان 🇸🇩",
  "موريتانيا 🇲🇷",
  "جيبوتي 🇩🇯",
  "الصومال 🇸🇴",
  "جزر القمر 🇰🇲",
  "تركيا 🇹🇷",
  "ماليزيا 🇲🇾",
  "إندونيسيا 🇮🇩",
  "سنغافورة 🇸🇬",
  "باكستان 🇵🇰",
  "الهند 🇮🇳",
  "الولايات المتحدة الأمريكية 🇺🇸",
  "المملكة المتحدة 🇬🇧",
  "فرنسا 🇫🇷",
  "ألمانيا 🇩🇪",
  "كندا 🇨🇦",
  "أستراليا 🇦🇺",
  "إيطاليا 🇮🇹",
  "إسبانيا 🇪🇸",
  "اليابان 🇯🇵",
  "الصين 🇨🇳",
  "روسيا 🇷🇺",
  "السويد 🇸🇪",
  "سويسرا 🇨🇭",
  "هولندا 🇳🇱",
  "البرتغال 🇵🇹",
  "بلجيكا 🇧🇪",
  "النمسا 🇦🇹",
  "اليونان 🇬🇷",
  "آيسلندا 🇮🇸",
  "النرويج 🇳🇴",
  "الدنمارك 🇩🇰",
  "فنلندا 🇫🇮",
  "بولندا 🇵🇱",
  "المجر 🇭🇺",
  "ايرلندا 🇮🇪",
  "نيوزيلندا 🇳🇿",
  "البرازيل 🇧🇷",
  "الأرجنتين 🇦🇷",
  "المكسيك 🇲🇽",
  "كولومبيا 🇨🇴",
  "تشيلي 🇨🇱",
  "بيرو 🇵🇪",
  "جنوب أفريقيا 🇿🇦",
  "جمهورية كوريا 🇰🇷",
  "تايلاند 🇹🇭",
  "الفلبين 🇵🇭",
  "فيتنام 🇻🇳",
  "المالديف 🇲🇻",
  "قبرص 🇨🇾",
  "أوكرانيا 🇺🇦",
  "نيجيريا 🇳🇬",
  "كينيا 🇰🇪",
  "إثيوبيا 🇪🇹",
  "غانا 🇬🇭",
  "السنغال 🇸🇳",
  "الكاميرون 🇨🇲",
  "أذربيجان 🇦🇿",
  "جورجيا 🇬🇪",
  "أوزبكستان 🇺🇿",
  "كازاخستان 🇰🇿",
  "سريلانكا 🇱🇰",
  "بنغلاديش 🇧🇩",
  "أفغانستان 🇦🇫",
  "إيران 🇮🇷",
  "رومانيا 🇷🇴",
  "كرواتيا 🇭🇷",
  "بلغاريا 🇧🇬",
  "ألبانيا 🇦🇱",
  "البوسنة والهرسك 🇧🇦",
  "مالطا 🇲🇹",
  "لوكسمبورغ 🇱🇺"
];

interface ReviewSectionProps {
  mode?: 'full' | 'compact';
  reviews: Review[];
  setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
}

export default function ReviewSection({ mode = 'full', reviews, setReviews }: ReviewSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewCountry, setNewReviewCountry] = useState('المملكة العربية السعودية 🇸🇦');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [whatsappRedirectUrl, setWhatsappRedirectUrl] = useState('');
  const [isScrollingPaused, setIsScrollingPaused] = useState(false);

  // Drag-scroll, active index coordinates state, and refs
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isProgrammaticScrollRef = React.useRef(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewText.trim()) return;

    const userReview: Review = {
      id: `r-custom-${Date.now()}`,
      name: newReviewName.trim(),
      country: newReviewCountry,
      avatarColor: 'bg-amber-500/10 text-amber-300 border border-amber-500/20',
      rating: newReviewRating,
      text: newReviewText.trim(),
    };

    // Prepend user review to general list so it is immediately visible on the platform
    const updatedReviews = [userReview, ...reviews];
    setReviews(updatedReviews);

    // Persist newly added custom reviews in localStorage forever
    try {
      const userCustomOnly = updatedReviews.filter(r => r.id.startsWith('r-custom'));
      localStorage.setItem('subhook_local_reviews', JSON.stringify(userCustomOnly));
    } catch (err) {
      console.error('Error persisting reviews to localStorage', err);
    }

    // Build specialized human WhatsApp message
    let whatsappMsg = `مرحباً م. عبدالرحمن الريمي،\n`;
    whatsappMsg += `لقد أضفت بفضل الله قصة نجاح وتقييم جديد لمنصتكم الموقرة SubHook:\n\n`;
    whatsappMsg += `👤 *الاسم كشركتنا:* ${newReviewName.trim()}\n`;
    whatsappMsg += `🌍 *البلد/الدولة:* ${newReviewCountry}\n`;
    whatsappMsg += `⭐ *التقييم لخدماتكم:* ${'⭐'.repeat(newReviewRating)}/5\n`;
    whatsappMsg += `📝 *قصة النجاح الواقعية:* "${newReviewText.trim()}"\n\n`;
    whatsappMsg += `تم توثيق هذا التقييم ونزوله فوراً بصفحة التقييمات في المنصة!`;

    const encodedMsg = encodeURIComponent(whatsappMsg);
    const finalUrl = `https://wa.me/967772121616?text=${encodedMsg}`;
    
    setWhatsappRedirectUrl(finalUrl);
    setSubmittedSuccess(true);

    // Open WhatsApp in a new tab securely (even if sandboxed)
    try {
      window.open(finalUrl, '_blank');
    } catch (err) {
      console.log('Popup/Iframe redirection blocked', err);
    }

    // Give customer plenty of time to view success or click fallback button manually
    setTimeout(() => {
      setSubmittedSuccess(false);
      setIsModalOpen(false);
      // Reset form fields
      setNewReviewName('');
      setNewReviewText('');
      setNewReviewRating(5);
      setWhatsappRedirectUrl('');
    }, 12000);
  };

  // Scroll specific card into center
  const scrollToReview = (index: number) => {
    const container = containerRef.current;
    if (!container || !reviews.length) return;
    const children = container.children;
    if (children && children[index]) {
      const targetElement = children[index] as HTMLElement;
      
      // Set programmatic scroll flag to bypass the onScroll event updates temporarily
      isProgrammaticScrollRef.current = true;
      setActiveIndex(index);
      
      container.scrollTo({
        left: targetElement.offsetLeft - (container.clientWidth / 2) + (targetElement.clientWidth / 2),
        behavior: 'smooth'
      });

      // Clear flag after the smooth scroll animation completes
      setTimeout(() => {
        isProgrammaticScrollRef.current = false;
      }, 600);
    }
  };

  const handleScroll = () => {
    // Skip if programmatic (avoids infinite state loops or screen jittering layout locks)
    if (isProgrammaticScrollRef.current) return;

    const container = containerRef.current;
    if (!container || !reviews.length) return;
    const children = container.children;
    if (!children || children.length === 0) return;

    const containerCenter = container.scrollLeft + container.clientWidth / 2;

    let closestIndex = 0;
    let minDifference = Infinity;

    for (let i = 0; i < Math.min(children.length, reviews.length); i++) {
      const child = children[i] as HTMLElement;
      if (!child) continue;
      const childCenter = child.offsetLeft + child.clientWidth / 2;
      const diff = Math.abs(containerCenter - childCenter);
      if (diff < minDifference) {
        minDifference = diff;
        closestIndex = i;
      }
    }

    if (closestIndex !== activeIndex && closestIndex >= 0 && closestIndex < reviews.length) {
      setActiveIndex(closestIndex);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;
    setIsDragging(true);
    setStartX(e.pageX - container.offsetLeft);
    setScrollLeft(container.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const container = containerRef.current;
    if (!container) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 1.5; // Drag factor sensitivity multiplier
    container.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  // Shared premium drag-scroll slider with continuous glowing gradients and small pagination control dots
  const renderInteractiveSlider = () => (
    <div className="relative w-full overflow-hidden" dir="ltr">
      {/* Outer Shadows for Elegant Borderless Visuals */}
      <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none hidden sm:block" />
      <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none hidden sm:block" />

      {/* Main Draggable List Container */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        onTouchStart={() => {
          setIsDragging(true);
        }}
        onTouchEnd={() => {
          setIsDragging(false);
        }}
        className="flex gap-5 overflow-x-auto pb-4 pt-2 snap-x snap-mandatory select-none cursor-grab active:cursor-grabbing scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none]"
        style={{
          scrollSnapType: isDragging ? 'none' : 'x mandatory',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {reviews.map((rev, index) => {
          const isActive = activeIndex === index;
          return (
            <div
              key={`slider-card-${rev.id}-${index}`}
              dir="rtl"
              className={`snap-center shrink-0 w-[275px] sm:w-[330px] rounded-2xl border p-5 backdrop-blur-sm transition-all duration-300 flex flex-col justify-between whitespace-normal text-right select-none ${
                isActive
                  ? 'border-amber-400 bg-zinc-900/35 shadow-lg shadow-amber-400/5'
                  : 'border-zinc-900 bg-zinc-900/10 hover:border-zinc-800'
              }`}
            >
              <p className="text-xs sm:text-[13px] leading-relaxed text-zinc-300 font-light pr-1">
                {rev.id.startsWith('r-custom') ? '🌟' : index % 3 === 0 ? '💡' : index % 3 === 1 ? '🔥' : '✨'} "{rev.text}"
              </p>
              
              <div className="mt-4 flex items-center justify-between border-t border-zinc-900/60 pt-3">
                <div className="flex items-center gap-2">
                  <div className={`h-8 w-8 rounded-lg flex items-center justify-center text-xs font-black shrink-0 ${rev.avatarColor}`}>
                    {rev.name.substring(0, 2)}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-[11px] font-bold text-white leading-none truncate">{rev.name}</h4>
                    <span className="text-[9px] text-zinc-500 mt-1 block truncate">{rev.country}</span>
                  </div>
                </div>
                
                <div className="flex gap-0.5 text-amber-400 shrink-0">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-amber-400" />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* COMPACT FLOATING ACTIVE EVALUATION TEXT */}
      <div className="flex justify-center text-center mt-3 h-5">
        <span className="text-[10px] sm:text-[11px] font-bold text-zinc-400 bg-zinc-900/50 px-3 py-1 rounded-full border border-zinc-900/60 flex items-center gap-1.5 animate-fade-in">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          {reviews[activeIndex]?.name} • {reviews[activeIndex]?.country}
        </span>
      </div>

      {/* COMPREHENSIVE SMALL DOTS PAGINATION WRAPPER */}
      <div className="flex flex-wrap justify-center items-center gap-[3px] sm:gap-[5px] mt-6 max-w-full px-4 relative z-20 mx-auto">
        {reviews.map((rev, index) => {
          const isActive = activeIndex === index;
          return (
            <button
              key={`dot-${rev.id}-${index}`}
              id={`review-dot-${index}`}
              onClick={() => {
                scrollToReview(index);
              }}
              className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'bg-amber-400 w-4 sm:w-5'
                  : 'bg-zinc-800 hover:bg-zinc-600 w-1.5 sm:w-2'
              }`}
              title={`${rev.name} (${rev.country})`}
            />
          );
        })}
      </div>
    </div>
  );

  return (
    <section 
      id={mode === 'compact' ? 'top-compact-reviews' : 'reviews-marquee-section'} 
      className={`relative w-full overflow-hidden ${
        mode === 'compact' 
          ? 'py-8 bg-zinc-950 border-b border-zinc-900/40' 
          : 'py-24 bg-zinc-950 border-t border-zinc-900/60'
      }`}
    >
      {/* Absolute Ambient Background Lights in Full Mode */}
      {mode === 'full' && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-amber-500/5 blur-[150px] pointer-events-none" />
      )}

      {/* TOP COMPACT VARIANT LAYOUT */}
      {mode === 'compact' ? (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <div>
                <span className="text-xs font-black text-amber-400 tracking-wide block sm:inline">
                  آراء وتجارب مجتمع SubHook الحقيقية 🇸🇦 🇾🇪 🇴🇲 🇦🇪 🇰🇼
                </span>
                <span className="text-zinc-600 text-xs hidden sm:inline px-2">|</span>
                <span className="text-zinc-500 text-[11px] block sm:inline mt-0.5 sm:mt-0">
                  اسحب بإصبعك أو تصفح بالماوس لقراءة أكثر من ٥٠ قصة نجاح حقيقية لشركائنا
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-amber-400 to-yellow-500 hover:opacity-90 px-4 py-2 text-xs font-black text-zinc-950 shadow-md shadow-amber-500/5 transition cursor-pointer"
            >
              <PlusCircle className="h-3.5 w-3.5" />
              <span>أضف تقييمك الآن</span>
            </button>
          </div>

          <div className="select-none relative w-full overflow-hidden flex flex-col py-1">
            {renderInteractiveSlider()}
          </div>
        </div>
      ) : (
        /* BOTTOM FULL VARIANT LAYOUT */
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Header with active CTA button */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
              <div className="max-w-2xl text-right">
                <div className="inline-flex items-center gap-2 rounded-full bg-zinc-900/80 px-3.5 py-1.5 text-xs text-amber-300 border border-zinc-800">
                  <MessageSquareCode className="h-4 w-4" />
                  <span>قصص نجاح وآراء شركاء النجاح</span>
                </div>
                <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl tracking-tight leading-tight">
                  تقييمات مجتمعنا المتكامل (أكثر من ٥٠ تقييم)
                </h2>
                <p className="mt-3 text-sm text-zinc-500 leading-relaxed">
                  تجارب رقمية وقصص نجاح فخرية موثقة لأكثر من ٥٠ عميل في الخليج واليمن لحماية وتفعيل الاشتراكات الرقمية وتطوير المتاجر. <span className="text-amber-400/80 text-xs mt-1 block sm:inline sm:mr-2">💡 انقر بالماوس أو اسحب بإصبعك لتصفح جميع التقييمات بدقة كاملة!</span>
                </p>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 py-3.5 px-6 text-xs font-black text-zinc-950 shadow-lg shadow-amber-500/10 hover:scale-[1.03] active:scale-95 transition cursor-pointer self-start sm:self-auto"
              >
                <PlusCircle className="h-4.5 w-4.5" />
                <span>أضف تقييمك وقصة نجاحك</span>
              </button>
            </div>
          </div>

          {/* INTERACTIVE CLICK & DRAG CAROUSEL TRACK */}
          <div className="select-none relative w-full overflow-hidden flex flex-col gap-2 py-4">
            {renderInteractiveSlider()}
          </div>
        </>
      )}

      {/* LUXURY INTERACTIVE FEEDBACK ADDITION MODAL - SHARED FOR BOTH COGNATE VIEWS */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="fixed inset-x-4 top-[10%] mx-auto z-50 max-w-lg rounded-2xl border border-zinc-850 bg-zinc-950 p-6 shadow-2xl text-right sm:p-8 overflow-y-auto max-h-[85vh]"
            >
              <div className="flex items-center justify-between border-b border-zinc-900 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
                  <h3 className="text-base sm:text-lg font-black text-white">إضافة تقييم معتمد لمجتمع ساب هوك</h3>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg border border-zinc-900 bg-zinc-900/30 p-1.5 text-zinc-400 hover:text-white transition cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {submittedSuccess ? (
                /* Success Feedback Screen */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-8 text-center"
                >
                  <div className="h-16 w-16 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mb-4">
                    <Check className="h-8 w-8 stroke-[3]" />
                  </div>
                  <h4 className="text-base font-black text-white">تم نزول تقييمك في المنصة بنجاح!</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed mt-2 max-w-sm">
                    نشكرك جزيل الشكر على وقتك الثمين وشراكتك معنا. لقد تمت إضافة قصة نجاحك مباشرة إلى شريط التقييمات المتحرك. جاري توثيق التقييم وتأكيده مع م. عبدالرحمن الريمي عبر واتساب...
                  </p>
                  
                  {whatsappRedirectUrl && (
                    <a
                      href={whatsappRedirectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-emerald-500 py-3.5 px-6 text-xs font-black text-white shadow-lg shadow-emerald-500/10 hover:bg-emerald-400 active:scale-95 transition cursor-pointer"
                    >
                      <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12.004 2c-5.51 0-9.99 4.48-9.99 9.99 0 2.09.64 4.04 1.73 5.66L2.3 22l4.51-1.32c1.55.88 3.32 1.39 5.2 1.39 5.51 0 9.99-4.48 9.99-9.99S17.514 2 12.004 2zm5.79 14.1c-.24.68-1.2 1.25-1.92 1.36-.61.09-1.4.16-4.08-.94-3.43-1.4-5.61-4.88-5.78-5.11-.17-.23-1.37-1.82-1.37-3.48S5.49 5.4 5.8 5.07c.26-.26.68-.41.97-.41.13 0 .26.01.37.02.32.01.48.06.69.57.26.63.89 2.18.97 2.34.08.16.14.35.03.56-.1.21-.19.34-.37.56-.18.21-.38.48-.54.65-.18.18-.37.38-.16.74.21.36.93 1.53 2 2.48 1.38 1.23 2.54 1.62 2.9 1.8.36.18.57.15.79-.1.21-.24.9-1.05 1.15-1.41.24-.36.49-.3.8-.18.32.12 2.03 1 2.38 1.17.36.18.59.27.68.42.09.15.09.87-.15 1.55z"/>
                      </svg>
                      <span>تأكيد الإرسال والتوثيق عبر واتساب المباشر</span>
                    </a>
                  )}

                  <div className="mt-6 flex items-center gap-1.5 rounded-full bg-zinc-900 px-4 py-1.5 text-[10px] text-zinc-500 border border-zinc-850">
                    <ShieldCheck className="h-4 w-4 text-emerald-400" />
                    <span>توثيق رقمي فوري وآمن 100%</span>
                  </div>
                </motion.div>
              ) : (
                /* Form fields */
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name Input */}
                  <div>
                    <label className="text-xs font-bold text-zinc-300 block mb-1.5">الاسم أو اسم المؤسسة / الشركة</label>
                    <input
                      type="text"
                      required
                      value={newReviewName}
                      onChange={(e) => setNewReviewName(e.target.value)}
                      placeholder="أمثلة: فيصل القحطاني، شركة تيك سوليوشنز..."
                      className="w-full rounded-xl border border-zinc-900 bg-zinc-900/50 p-3 text-xs text-zinc-200 outline-none focus:border-amber-400 transition"
                    />
                  </div>

                  {/* Country Input with fully functional datalist typing-to-search all world countries */}
                  <div>
                    <label className="text-xs font-bold text-zinc-300 block mb-1.5">
                      الدولة الإقليمية (اكتب حرفاً للبحث التلقائي)
                    </label>
                    <input
                      type="text"
                      required
                      list="world-countries-comprehensive-list"
                      value={newReviewCountry}
                      onChange={(e) => setNewReviewCountry(e.target.value)}
                      placeholder="اكتب اسم البلد، مثلاً: اليمن، السعودية، مصر، قطر..."
                      className="w-full rounded-xl border border-zinc-900 bg-zinc-900/50 p-3 text-xs text-zinc-200 outline-none focus:border-amber-400 transition"
                    />
                    <datalist id="world-countries-comprehensive-list">
                      {WORLD_COUNTRIES.map((cty) => (
                        <option key={cty} value={cty}>
                          {cty}
                        </option>
                      ))}
                    </datalist>
                  </div>

                  {/* Rating Selector */}
                  <div>
                    <label className="text-xs font-bold text-zinc-300 block mb-1.5">التقييم لخدماتنا من (1 إلى 5 نجوم)</label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((starVal) => {
                        const isGold = starVal <= newReviewRating;
                        return (
                          <button
                            type="button"
                            key={starVal}
                            onClick={() => setNewReviewRating(starVal)}
                            className="bg-zinc-900 hover:bg-zinc-850 rounded-lg p-2.5 text-zinc-500 hover:text-amber-400 transition cursor-pointer flex items-center justify-center border border-zinc-850"
                          >
                            <Star className={`h-5 w-5 ${isGold ? 'text-amber-400 fill-amber-400' : 'text-zinc-700'}`} />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Review text */}
                  <div>
                    <label className="text-xs font-bold text-zinc-300 block mb-1.5">قصة نجاحك أو تجربتك الرقمية</label>
                    <textarea
                      required
                      value={newReviewText}
                      onChange={(e) => setNewReviewText(e.target.value)}
                      placeholder="اكتب قصة نجاحك الفخرية وكلماتك المتميزة الموجهة الموثقة هنا للتأثير..."
                      rows={4}
                      className="w-full rounded-xl border border-zinc-900 bg-zinc-900/50 p-3 text-xs text-zinc-200 outline-none focus:border-amber-400 transition"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-xs font-black text-zinc-950 shadow-lg hover:scale-[1.01] transition duration-300 cursor-pointer"
                  >
                    اعتماد قصة النجاح ونزولها فوراً في شريط التقييمات
                  </button>
                </form>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
