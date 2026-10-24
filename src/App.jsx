import React, { useState, useEffect } from 'react';
import {RefreshCw as Recyclable, CheckCircle2, QrCode, RefreshCw, Zap, Award, Globe, Leaf } from 'lucide-react';

// Переводы на 3 языка (RU / KG / EN)
const TRANSLATIONS = {
  RU: {
    title: "REPLASTIC",
    subtitle: "Эко-терминал №001 • Бишкек",
    statusReady: "Готов к приему",
    step1Title: "Сдайте пластик",
    step1Desc: "Выберите тип тары для запуска сканера",
    petBottle: "ПЭТ Бутылка",
    petDesc: "До 2.0 литров",
    hdpeBottle: "ПНД Флакон",
    hdpeDesc: "Бытовая химия",
    discountTag: "Скидка 10%",
    scanLaser: "Сканирование лазером...",
    scanWeight: "Измерение массы и плотности...",
    scanCrush: "Автоматическое измельчение прессом...",
    scanCheck: "Формирование эко-чека...",
    successTitle: "Пластик измельчен!",
    successDesc: "Нажмите кнопку ниже для печати чека",
    receiptTitle: "REPLASTIC",
    receiptType: "Тара",
    receiptVolume: "Объем",
    receiptVolumeVal: "-70% объема",
    receiptDiscount: "СКИДКА 10%",
    receiptPartners: "Globus / Народный / Alma",
    receiptThanks: "Спасибо за чистый Кыргызстан!",
    btnPrint: "Распечатать чек 🖨️",
    btnReset: "Вернуться на главный экран"
  },
  KG: {
    title: "REPLASTIC",
    subtitle: "Эко-терминал №001 • Бишкек",
    statusReady: "Кабыл алууга даяр",
    step1Title: "Желим бөтөлкө тапшырыңыз",
    step1Desc: "Сканерди баштоо үчүн таранын түрүн тандаңыз",
    petBottle: "ПЭТ Бөтөлкө",
    petDesc: "2.0 литрге чейин",
    hdpeBottle: "ПНД Флакон",
    hdpeDesc: "Тиричилик химиясы",
    discountTag: "10% арзандатуу",
    scanLaser: "Лазер менен сканерлөө...",
    scanWeight: "Салмагын жана тыгыздыгын өлчөө...",
    scanCrush: "Пресс менен майдалоо...",
    scanCheck: "Эко-чекти даярдоо...",
    successTitle: "Желим майдаланды!",
    successDesc: "Чекти басып чыгаруу үчүн баскычты басыңыз",
    receiptTitle: "REPLASTIC",
    receiptType: "Идиш",
    receiptVolume: "Көлөмү",
    receiptVolumeVal: "-70% көлөмгө азайды",
    receiptDiscount: "10% АРЗАНДАТУУ",
    receiptPartners: "Globus / Народный / Alma",
    receiptThanks: "Таза Кыргызстан үчүн рахмат!",
    btnPrint: "Чекти чыгаруу 🖨️",
    btnReset: "Башкы экранга кайтуу"
  },
  EN: {
    title: "REPLASTIC",
    subtitle: "Eco-terminal #001 • Bishkek",
    statusReady: "Ready to accept",
    step1Title: "Recycle Plastic",
    step1Desc: "Select item type to start laser scanner",
    petBottle: "PET Bottle",
    petDesc: "Up to 2.0 liters",
    hdpeBottle: "HDPE Container",
    hdpeDesc: "Household liquids",
    discountTag: "10% Discount",
    scanLaser: "Laser scanning in progress...",
    scanWeight: "Measuring weight & density...",
    scanCrush: "Automated shredding & pressing...",
    scanCheck: "Generating eco-receipt...",
    successTitle: "Plastic Shredded!",
    successDesc: "Tap the button below to print receipt",
    receiptTitle: "REPLASTIC",
    receiptType: "Item",
    receiptVolume: "Volume",
    receiptVolumeVal: "-70% reduced",
    receiptDiscount: "10% DISCOUNT",
    receiptPartners: "Globus / Narodnyi / Alma",
    receiptThanks: "Thank you for clean Kyrgyzstan!",
    btnPrint: "Print Receipt 🖨️",
    btnReset: "Back to Home"
  }
};

// Состояние для часов в реальном времени

export default function App() {
  const [lang, setLang] = useState('RU');
  const [step, setStep] = useState('select'); // 'select' | 'processing' | 'success'
  const [selectedTypeKey, setSelectedTypeKey] = useState('petBottle');
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('');

  const t = TRANSLATIONS[lang];

  // Плавная анимация обработки с таймером
  const handleStartProcess = (typeKey) => {
    setSelectedTypeKey(typeKey);
    setStep('processing');
    setProgress(0);
    setStatusText(t.scanLaser);

    const interval = setInterval(() => {
      setProgress((prev) => {if (prev < 30) {
          setStatusText(t.scanWeight);
          return prev + 10;
        } else if (prev < 75) {
          setStatusText(t.scanCrush);
          return prev + 10;
        } else if (prev < 100) {
          setStatusText(t.scanCheck);
          return prev + 10;
        } else {
          clearInterval(interval);
          setStep('success');
          return 100;
        }
      });
    }, 400); // 4 секунды на весь процесс
  };


  const [currentTime, setCurrentTime] = useState(new Date());

useEffect(() => {
  const timer = setInterval(() => setCurrentTime(new Date()), 1000);
  return () => clearInterval(timer);
}, []);


  const resetTerminal = () => {
    setStep('select');
    setProgress(0);
  };

  return (
    <div className="min-h-screen max-w-md mx-auto bg-emerald-950 text-white font-sans flex flex-col justify-between p-4 selection:bg-none">
 {/* ОБНОВЛЕННЫЕ СТИЛИ С МАКСИМАЛЬНОЙ ШИРИНОЙ И БЕЗ ВТОРОЙ СТРАНИЦЫ */}
<style>{`
@media print {
@page {
margin: 0 !important;
size: auto !important;
}
html, body {
margin: 0 !important;
padding: 0 !important;
background: #ffffff !important;
}
body * {
visibility: hidden !important;
}
#printable-receipt, #printable-receipt * {
visibility: visible !important;
}
#printable-receipt {
position: absolute !important;
left: 0 !important;
top: 0 !important;
width: 58mm !important; /* Четкая ширина ленты */
min-width: 58mm !important;
padding: 8px 4px !important;
background: #ffffff !important;
color: #000000 !important;
font-family: 'Courier New', monospace, sans-serif !important;
}
.no-print {
display: none !important;
}
}
`}</style>
{/* ШАПКА ТЕРМИНАЛА (Часы + Вращающийся Логотип + Переключатель Языков) */}
<header className="no-print space-y-3 border-b border-emerald-800/60 pb-3">
  
  {/* Верхняя строчка: Часы и Выбор языка */}
  <div className="flex justify-between items-center text-xs">
    
    {/* Живые часы и дата */}
    <div className="flex items-center gap-1.5 bg-emerald-900/60 text-emerald-300 px-2.5 py-1 rounded-lg border border-emerald-700/40 font-mono text-[11px]">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
      <span>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
    </div>

    {/* Переключатель языков */}
    <div className="flex bg-emerald-900/90 rounded-lg p-0.5 border border-emerald-700/50">
      {['RU', 'KG', 'EN'].map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-2 py-0.5 text-[11px] font-bold rounded-md transition-all ${
            lang === l ? 'bg-emerald-400 text-emerald-950 shadow' : 'text-emerald-300 hover:text-white'
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  </div>

{/* ФИРМЕННЫЙ ДИНАМИЧЕСКИЙ ЛОГОТИП (Стрелки + Листочек) */}
<div className="flex justify-between items-center pt-1">
  <div className="flex items-center gap-2.5">
    
    {/* Внешний анимированный контейнер */}
    <div className="relative bg-emerald-900/80 p-2 rounded-xl border border-emerald-500/40 shadow-lg shadow-emerald-500/10 flex items-center justify-center w-10 h-10 overflow-hidden">
      
      {/* Вращающиеся стрелки переработки на заднем плане */}
      <Recyclable className="w-7 h-7 text-emerald-400 absolute animate-[spin_8s_linear_infinite] opacity-80 stroke-[1.8]" />
      
      {/* Эко-листочек в центре (пульсирует) */}
      <Leaf className="w-4 h-4 text-emerald-300 relative z-10 animate-pulse fill-emerald-400/30" />
    </div>
    
    <div>
      <h1 className="font-extrabold text-lg tracking-wider text-emerald-200 drop-shadow-sm">{t.title}</h1>
      <p className="text-[9px] text-emerald-400/70">{t.subtitle}</p>
    </div>
  </div>

  {/* Пульсирующий индикатор готовности */}
  <div className="bg-emerald-900/80 text-emerald-300 text-[10px] px-2.5 py-1 rounded-full border border-emerald-700/50 flex items-center gap-1.5">
    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
    {t.statusReady}
  </div>
</div>
</header>

      {/* ОСНОВНОЙ КОНТЕНТ ПОД МОБИЛЬНЫЙ ЭКРАН */}
      <main className="my-auto py-4">
        
        {/* ШАГ 1: ВЫБОР ТАРЫ */}
        {step === 'select' && (
          <div className="no-print flex flex-col items-center text-center space-y-5">
            <div>
              <h2 className="text-xl font-bold text-white mb-0.5">{t.step1Title}</h2>
              <p className="text-xs text-emerald-300/80">{t.step1Desc}</p>
            </div><div className="flex flex-col gap-3 w-full">
              <button
                onClick={() => handleStartProcess('petBottle')}
                className="bg-emerald-900/60 hover:bg-emerald-800/80 border-2 border-emerald-500/50 hover:border-emerald-400 p-4 rounded-2xl flex items-center justify-between transition-all active:scale-95 shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-400/20 p-3 rounded-xl text-emerald-300">
                    <Recyclable className="w-8 h-8" />
                  </div>
                  <div className="text-left">
                    <span className="font-bold text-sm block text-white">{t.petBottle}</span>
                    <span className="text-[10px] text-emerald-300/70">{t.petDesc}</span>
                  </div>
                </div>
                <span className="bg-emerald-400 text-emerald-950 font-extrabold text-[10px] px-2.5 py-1 rounded-md">
                  {t.discountTag}
                </span>
              </button>

              <button
                onClick={() => handleStartProcess('hdpeBottle')}
                className="bg-emerald-900/30 hover:bg-emerald-800/50 border border-emerald-800/60 p-4 rounded-2xl flex items-center justify-between transition-all active:scale-95"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-800/40 p-3 rounded-xl text-emerald-400">
                    <Award className="w-8 h-8" />
                  </div>
                  <div className="text-left">
                    <span className="font-bold text-sm block text-emerald-200">{t.hdpeBottle}</span>
                    <span className="text-[10px] text-emerald-400/60">{t.hdpeDesc}</span>
                  </div>
                </div>
                <span className="bg-emerald-800 text-emerald-300 text-[10px] px-2.5 py-1 rounded-md">
                  {t.discountTag}
                </span>
              </button>
            </div>
          </div>
        )}

        {/* ШАГ 2: ПЛАВНАЯ АНИМАЦИЯ СЖАТИЯ И ТАЙМЕР */}
        {step === 'processing' && (
          <div className="no-print flex flex-col items-center text-center space-y-5 max-w-xs mx-auto">
            <div className="relative w-24 h-24 flex items-center justify-center">
              <div className="absolute inset-0 border-4 border-emerald-800 rounded-full"></div>
              <div 
                className="absolute inset-0 border-4 border-emerald-400 rounded-full transition-all duration-300 border-t-transparent animate-spin"
              ></div>
              <Recyclable className="w-10 h-10 text-emerald-300 animate-pulse" />
            </div>

            <div className="w-full space-y-2">
              <h3 className="text-sm font-bold text-emerald-200 h-8 flex items-center justify-center">{statusText}</h3>
              <div className="w-full bg-emerald-900/80 h-2.5 rounded-full overflow-hidden border border-emerald-700/50">
                <div 
                  className="bg-emerald-400 h-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <span className="text-[10px] text-emerald-400/70 font-mono">{progress}%</span>
            </div>
          </div>
        )}

        {/* ШАГ 3: УСПЕХ И ПЕЧАТЬ МИНИ-ЧЕКА */}
        {step === 'success' && (
          <div className="flex flex-col items-center text-center space-y-3">
            
            <div className="no-print space-y-0.5">
              <div className="inline-flex p-1.5 bg-emerald-500/20 text-emerald-400 rounded-full mb-1">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-bold text-white">{t.successTitle}</h2>
              <p className="text-[11px] text-emerald-300/80">{t.successDesc}</p>
            </div>

{/* ЧЕК С ФИКСИРОВАННЫМИ РАЗМЕРАМИ И ВЫСОТОЙ */}
<div 
id="printable-receipt" 
className="bg-white text-black p-4 rounded-xl shadow-xl max-w-[240px] w-full text-center my-1 border-2 border-black"
>
{/* Крупный заголовок */}
<div className="font-black text-2xl tracking-wider border-b-2 border-black pb-2 mb-2 uppercase text-black">
{t.receiptTitle}
</div>

{/* Тара и Объем с фиксированной высотой строки */}
<div className="text-sm font-black text-left my-3 space-y-2 leading-relaxed">
<p className="flex justify-between items-center">
<span>{t.receiptType}:</span>
<span className="text-base font-extrabold">{t[selectedTypeKey]}</span>
</p>
<p className="flex justify-between items-center">
<span>{t.receiptVolume}:</span>
<span className="text-base font-extrabold">{t.receiptVolumeVal}</span>
</p>
</div>

{/* Высокий блок скидки */}
<div className="border-t-2 border-b-2 border-black py-3 my-3">
<span className="text-2xl font-black block tracking-widest uppercase">{t.receiptDiscount}</span>
</div>

{/* QR-код с ЧЁТКИМИ ФИКСИРОВАННЫМИ РАЗМЕРАМИ (120x120px) */}
<div className="flex flex-col items-center justify-center my-3 min-h-[120px]">
<img 
src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=REPLASTIC-10" 
alt="QR" 
className="w-28 h-28 border-2 border-black p-1 object-contain"
/>
</div>

{/* Текст внизу */}
<div className="text-xs font-black border-t-2 border-black pt-2 mt-2 leading-normal uppercase">
<p>СПАСИБО ЗА ЧИСТЫЙ</p>
<p className="text-sm tracking-wider mt-1 font-extrabold">КЫРГЫЗСТАН!</p>
</div>

{/* КНОПКА ПЕЧАТИ */}
<button
onClick={() => window.print()}
className="no-print mt-4 w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-lg text-sm transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-95"
>
<QrCode className="w-4 h-4" />
{t.btnPrint}
</button>
</div>

            {/* Завершить */}
            <button 
              onClick={resetTerminal}
              className="no-print text-[11px] text-emerald-400/60 hover:text-emerald-300 underline flex items-center gap-1 pt-1"
            >
              <RefreshCw className="w-3 h-3" />
              {t.btnReset}
            </button>
          </div>
        )}

      </main>

      {/* ПОДВАЛ */}
      <footer className="no-print text-center text-[9px] text-emerald-500/50 border-t border-emerald-900/50 pt-2">
        Replastic Mobile Terminal • 2026
      </footer>

    </div>
  );
}