import React from 'react';
import { MessageCircle, Send } from 'lucide-react';

export default function StickyWhatsApp() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-zinc-950 via-zinc-950/95 to-transparent px-4 pb-5 pt-3 md:hidden">
      <a
        href="https://wa.me/967772121616"
        target="_blank"
        referrerPolicy="no-referrer"
        className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 py-4 px-6 text-sm font-black text-white shadow-lg shadow-emerald-500/20 transition-all active:scale-95 outline-none"
        style={{ minHeight: '52px' }}
      >
        <MessageCircle className="h-5 w-5 animate-pulse text-white" />
        <span className="tracking-wide">تواصل فوري م. عبدالرحمن عبر واتساب</span>
        <Send className="h-4 w-4 mr-1 text-emerald-100" />
      </a>
    </div>
  );
}
