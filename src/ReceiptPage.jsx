import React, { useState } from 'react';
import { CheckCircle2, Copy, Sparkles, Store, Gift, ShieldCheck, Heart } from 'lucide-react';

export default function ReceiptPage() {
  const [lang, setLang] = useState('ky');
  const [copied, setCopied] = useState(false);

  // Генерируем случайный код скидки или используем фиксированный
  const promoCode = 'REPLASTIC-ECO-2026';

  const t = {
    ky: {
      status: 'Чек тастыкталды',
      thanks: 'Кыргызстандын тазалыгына кошкон салымыңыз үчүн рахмат!',
      earned: 'Сизге чегерилген балдар:',
      points: '+2 БАЛЛ',
      promoTitle: 'Өнөктөш дүкөндөр үчүн промокод:',
      copy: 'Көчүрүү',
      copied: 'Көчүрүлдү!',
      howToUse: 'Балдарды кантип колдонсо болот?',
      step1: 'Globus, Народный же Фрунзе маркеттерине барыңыз',
      step2: 'Кассадан машыктыруучу промокодду же ушул QR-кодду көрсөтүңүз',
      step3: 'Сатып алууда 10% арзандатуу же бонус алыңыз',
      ecoImpact: 'Сиз 1 пластик бөтөлкөнү кайра иштетүүгө тапшырдыңыз!',
      footer: 'Replastic Eco Terminal System © 2026'
    },
    ru: {
      status: 'Чек подтвержден',
      thanks: 'Спасибо за ваш вклад в чистоту Кыргызстана!',
      earned: 'Вам начислено:',
      points: '+2 БАЛЛА',
      promoTitle: 'Промокод для магазинов-партнеров:',
      copy: 'Копировать',
      copied: 'Скопировано!',
      howToUse: 'Как использовать баллы?',
      step1: 'Придите в супермаркет Globus, Народный или Фрунзе',
      step2: 'Покажите этот промокод или QR-код на кассе',
      step3: 'Получите скидку 10% или бонусы на покупку',
      ecoImpact: 'Вы сдали 1 ПЭТ-бутылку на вторичную переработку!',
      footer: 'Replastic Eco Terminal System © 2026'
    }
  }[lang];

  const handleCopy = () => {
    navigator.clipboard.writeText(promoCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 text-slate-100 flex justify-center items-start p-4 font-sans">
      <div className="w-full max-w-md bg-emerald-950/40 border border-emerald-500/30 rounded-3xl p-6 shadow-2xl backdrop-blur-xl mt-4">
        
        {/* Переключатель языка */}
        <div className="flex justify-between items-center mb-6 border-b border-emerald-800/40 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold tracking-wider text-emerald-300">REPLASTIC BONUS</span>
          </div>
          <button
            onClick={() => setLang(lang === 'ky' ? 'ru' : 'ky')}
            className="text-xs font-bold bg-emerald-900/60 border border-emerald-500/40 hover:bg-emerald-800 text-emerald-200 px-3 py-1.5 rounded-full transition-all"
          >
            {lang === 'ky' ? 'РУС 🇷🇺' : 'КЫР 🇰🇬'}
          </button>
        </div>

        {/* Статус успешного сканирования */}
        <div className="text-center space-y-3 mb-6">
          <div className="inline-flex p-3 bg-emerald-500/10 border border-emerald-400/30 rounded-full text-emerald-400 mb-1 shadow-inner">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h1 className="text-xl font-black text-white">{t.status}</h1>
          <p className="text-xs text-emerald-200/80 leading-relaxed px-2">
            {t.thanks} <Heart className="w-3.5 h-3.5 text-red-400 inline ml-1 fill-red-400" />
          </p>
        </div>

        {/* Начисленные баллы */}
        <div className="bg-gradient-to-r from-emerald-900/60 to-teal-900/60 border border-emerald-500/40 rounded-2xl p-5 text-center relative overflow-hidden mb-6 shadow-lg">
          <div className="absolute -right-4 -bottom-4 text-emerald-500/10 opacity-30">
            <Sparkles className="w-24 h-24" /></div>
          <span className="text-xs font-medium text-emerald-300 block mb-1">{t.earned}</span>
          <div className="text-3xl font-black text-amber-300 tracking-wider drop-shadow-md">
            {t.points}
          </div>
          <div className="mt-2 text-[11px] text-emerald-200/70 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t.ecoImpact}</span>
          </div>
        </div>

        {/* Промокод */}
        <div className="space-y-2 mb-6">
          <label className="text-xs font-medium text-emerald-300/80 block">{t.promoTitle}</label>
          <div className="flex items-center justify-between bg-black/50 border border-emerald-500/40 p-3 rounded-xl">
            <code className="text-sm font-mono font-bold text-amber-300">{promoCode}</code>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-3 py-1.5 rounded-lg transition-all active:scale-95"
            >
              <Copy className="w-3.5 h-3.5" />
              {copied ? t.copied : t.copy}
            </button>
          </div>
        </div>

        {/* Инструкция как потратить */}
        <div className="bg-slate-900/60 border border-emerald-900/60 rounded-2xl p-4 space-y-3">
          <h3 className="text-xs font-bold text-emerald-300 flex items-center gap-2">
            <Store className="w-4 h-4" />
            {t.howToUse}
          </h3>
          <ol className="text-xs text-slate-300 space-y-2 pl-4 list-decimal">
            <li>{t.step1}</li>
            <li>{t.step2}</li>
            <li>{t.step3}</li>
          </ol>
        </div>

        {/* Футер */}
        <div className="mt-6 text-center text-[10px] text-emerald-500/50">
          {t.footer}
        </div>

      </div>
    </div>
  );
}