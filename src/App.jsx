import React, { useState, useEffect } from 'react';
import { 
  Recycle, 
  CheckCircle2, 
  QrCode, 
  RefreshCw, 
  Sparkles, 
  Scale, 
  Box, 
  Award, 
  TrendingDown,
  ArrowRight,
  Info,
  ShieldCheck,
  Zap,
  Globe,
  Clock,
  MapPin,
  Ticket
} from 'lucide-react';

export default function App() {
  // Navigation & Simulation State
  const [step, setStep] = useState(1); // 1: Select/Welcome, 2: Processing, 3: Success/Receipt
  const [selectedPlastic, setSelectedPlastic] = useState(null);
  const [language, setLanguage] = useState('RU'); // RU, KG, EN
  const [currentTime, setCurrentTime] = useState(new Date());

  // Processing Animation Sub-phases
  const [processPhase, setProcessPhase] = useState(1);
  const [progress, setProgress] = useState(0);
  const [measuredWeight, setMeasuredWeight] = useState(0);

  // Auto Reset Timer
  const [resetTimer, setResetTimer] = useState(20);

  // Plastic Types Configuration
  const plasticOptions = [
    {
      id: 'pet_small',
      name: {
        RU: 'ПЭТ Бутылка (0.5L - 1.5L)',
        KG: 'ПЭТ Бөтөлкө (0.5L - 1.5L)',
        EN: 'PET Bottle (0.5L - 1.5L)'
      },
      subtitle: {
        RU: 'Вода, соки, газированные напитки',
        KG: 'Суу, ширелер, газдалган суулар',
        EN: 'Water, juices, soft drinks'
      },
      code: 'PETE 01',
      points: 10,
      discount: '10%',
      weightRange: [22, 35],
      icon: '🍾',
      popular: true
    },
    {
      id: 'hdpe_bottle',
      name: {
        RU: 'Флакон HDPE (Бытовая химия)',
        KG: 'HDPE Флакон (Тиричилик химиясы)',
        EN: 'HDPE Container (Household Cleaning)'
      },
      subtitle: {
        RU: 'Шампуни, гели, моющие средства',
        KG: 'Шампундар, гелдер, жуучу каражаттар',
        EN: 'Shampoos, detergents, cleaners'
      },
      code: 'HDPE 02',
      points: 15,
      discount: '15%',
      weightRange: [38, 55],
      icon: '🧴',
      popular: false
    },
    {
      id: 'caps',
      name: {
        RU: 'Пластиковые крышки (Комплект)',
        KG: 'Пластик капкактар (Топтом)',
        EN: 'Plastic Caps (Set of 5)'
      },
      subtitle: {
        RU: 'Разноцветные крышки от бутылок',
        KG: 'Бөтөлкөлөрдүн ар кандай капкактары',
        EN: 'Assorted bottle caps'
      },
      code: 'PP 05',
      points: 5,
      discount: '5%',
      weightRange: [10, 18],
      icon: '🪙',
      popular: false
    }
  ];

  // Translations Map
  const t = {
    RU: {
      status: 'ГОТОВ К ПРИЕМУ ТАРЫ',
      terminalId: 'Терминал #KG-BSH-01 | Бишкек',
      welcomeTitle: 'Сдавай пластик — получай скидки!',
      welcomeSubtitle: 'Защитим экологию Кыргызстана вместе. Сдавайте ПЭТ-бутылки и получайте бонусы в супермаркетах.',
      selectPlastic: 'Выберите тип вставляемой тары:',
      insertBtn: 'Вставить тару в окно',
      cancelBtn: 'Отмена',
      scanning: 'Сканирование и определение материала...',
      weighing: 'Взвешивание и проверка объема...',
      shredding: 'Идет процесс измельчения и прессования...',
      completed: 'Успешно! Пластик принят и измельчен.',
      recycledSuccess: 'Тара успешно принята!',
      recycledSubtitle: 'Пластик направлен на вторичную переработку.',
      ecoContribution: 'Ваш эко-вклад:',
      bonusPoints: 'Эко-Баллы',
      co2Reduced: 'Предотвращено CO2',
      volumeReduced: 'Сжатие объема',
      couponTitle: 'Ваш купон на скидку',
      partnerStores: 'Сеть супермаркетов: Globus / Народный / Alma / Фрунзе',
      promoCode: 'ПРОМОКОД:',
      getReceiptBtn: 'Забрать чек и завершить',
      anotherBottleBtn: 'Сдать еще одну бутылку',
      autoReset: 'Возврат на главный экран через',
      sec: 'сек',
      totalRecycled: '14,280 бутылок',
      totalRecycledLabel: 'Принято в Бишкеке',
      cleanKg: '100% Чистый Кыргызстан'
    },KG: {
      status: 'ИДИШТЕРДИ КАБЫЛ АЛУУГА ДАЯР',
      terminalId: 'Терминал #KG-BSH-01 | Бишкек',
      welcomeTitle: 'Пластик тапшыр — арзандатуу ал!',
      welcomeSubtitle: 'Кыргызстандын экологиясын бирге сактайлы. Бөтөлкөлөрдү тапшырып, супермаркеттерден бонус алыңыз.',
      selectPlastic: 'Тапшырыла турган пластикти тандаңыз:',
      insertBtn: 'Идишти терезеге салыңыз',
      cancelBtn: 'Баш тартуу',
      scanning: 'Сканерлөө жана материалды аныктоо...',
      weighing: 'Салмагын жана көлөмүн текшерүү...',
      shredding: 'Майдалоо жана пресстөө процесси жүрүүдө...',
      completed: 'Ийгиликтүү! Пластик кабыл алынды жана майдаланды.',
      recycledSuccess: 'Идиш ийгиликтүү кабыл алынды!',
      recycledSubtitle: 'Пластик кайра иштетүүгө жөнөтүлдү.',
      ecoContribution: 'Сиздин эко-кошумчаңыз:',
      bonusPoints: 'Эко-Баллдар',
      co2Reduced: 'Азайтылган CO2',
      volumeReduced: 'Көлөмдүн кичирейиши',
      couponTitle: 'Сиздин купондук арзандатууңуз',
      partnerStores: 'Дүкөндөр тармагы: Globus / Народный / Alma / Фрунзе',
      promoCode: 'ПРОМОКОД:',
      getReceiptBtn: 'Чекти алып, аяктоо',
      anotherBottleBtn: 'Дагы бир бөтөлкө тапшыруу',
      autoReset: 'Башкы экранга кайтуу',
      sec: 'сек',
      totalRecycled: '14,280 бөтөлкө',
      totalRecycledLabel: 'Бишкекте кабыл алынды',
      cleanKg: '100% Таза Кыргызстан'
    },
    EN: {
      status: 'READY FOR CONTAINER DEPOSIT',
      terminalId: 'Terminal #KG-BSH-01 | Bishkek',
      welcomeTitle: 'Recycle Plastic — Earn Discounts!',
      welcomeSubtitle: 'Let\'s protect Kyrgyzstan\'s environment together. Recycle bottles and earn supermarket reward vouchers.',
      selectPlastic: 'Select plastic item to deposit:',
      insertBtn: 'Insert item into slot',
      cancelBtn: 'Cancel',
      scanning: 'Scanning and material optical detection...',
      weighing: 'Weighing and digital volume inspection...',
      shredding: 'Shredding and compaction process active...',
      completed: 'Success! Plastic accepted and shredded.',
      recycledSuccess: 'Container accepted!',
      recycledSubtitle: 'Plastic transferred directly to recycling plant.',
      ecoContribution: 'Your Environmental Impact:',
      bonusPoints: 'Eco-Points',
      co2Reduced: 'CO2 Prevented',
      volumeReduced: 'Volume Reduced',
      couponTitle: 'Your Discount Coupon',
      partnerStores: 'Partner Stores: Globus / Narodnyi / Alma / Frunze',
      promoCode: 'PROMO CODE:',
      getReceiptBtn: 'Collect Receipt & Finish',
      anotherBottleBtn: 'Deposit Another Bottle',
      autoReset: 'Returning to home screen in',
      sec: 'sec',
      totalRecycled: '14,280 bottles',
      totalRecycledLabel: 'Recycled in Bishkek',
      cleanKg: '100% Clean Kyrgyzstan'
    }
  };

  // Clock Ticker
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Selection Handler
  const handleSelectPlastic = (item) => {
    setSelectedPlastic(item);
  };

  // Start Terminal Simulation Sequence
  const startSimulation = () => {
    if (!selectedPlastic) return;

    // Generate realistic random weight within item's specs
    const [minW, maxW] = selectedPlastic.weightRange;
    const randomW = Math.floor(Math.random() * (maxW - minW + 1)) + minW;
    setMeasuredWeight(randomW);

    setStep(2);
    setProcessPhase(1);
    setProgress(0);

    // Phase 1: Scan
    setTimeout(() => {
      setProgress(30);
      setProcessPhase(2);
    }, 1500);

    // Phase 2: Weighing
    setTimeout(() => {
      setProgress(65);
      setProcessPhase(3);
    }, 3200);

    // Phase 3: Shredding & Compression
    setTimeout(() => {
      setProgress(100);
      setProcessPhase(4);
    }, 5200);

    // Phase 4 -> Step 3 (Completion & Receipt)
    setTimeout(() => {
      setStep(3);
      startAutoResetTimer();
    }, 6500);
  };// Auto Reset Logic
  const startAutoResetTimer = () => {
    setResetTimer(20);
    const interval = setInterval(() => {
      setResetTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          resetApp();
          return 20;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const resetApp = () => {
    setStep(1);
    setSelectedPlastic(null);
    setProcessPhase(1);
    setProgress(0);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col justify-between overflow-hidden select-none relative">
      {/* Dynamic Background Glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-teal-500/15 rounded-full blur-[120px] pointer-events-none"></div>

      {/* HEADER BAR */}
      <header className="w-full px-6 py-4 bg-slate-900/80 backdrop-blur-md border-b border-emerald-900/40 flex justify-between items-center z-20">
        {/* Brand Logo & Location */}
        <div className="flex items-center space-x-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-700 p-0.5 shadow-lg shadow-emerald-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Recycle className="w-6 h-6 text-emerald-400 animate-spin-slow" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200">
                REPLASTIC
              </span>
              <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold rounded-full">
                ECO-TERMINAL
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center mt-0.5">
              <MapPin className="w-3 h-3 mr-1 text-emerald-500" />
              {t[language].terminalId}
            </p>
          </div>
        </div>

        {/* Status Indicator & Controls */}
        <div className="flex items-center space-x-6">
          {/* Active Status Badge */}
          <div className="hidden sm:flex items-center space-x-2 bg-emerald-950/80 border border-emerald-700/50 px-3.5 py-1.5 rounded-full">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold text-emerald-300 uppercase tracking-wide">
              {t[language].status}
            </span>
          </div>

          {/* Language Switcher */}
          <div className="flex bg-slate-900 border border-slate-800 rounded-xl p-1 space-x-1">
            {['RU', 'KG', 'EN'].map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  language === lang
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          {/* Live Date / Time */}
          <div className="text-right font-mono hidden md:block">
            <div className="text-xs text-slate-400 flex items-center justify-end"><Clock className="w-3 h-3 mr-1 text-emerald-400" />
              {currentTime.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </div>
            <div className="text-[10px] text-slate-500">
              {currentTime.toLocaleDateString('ru-RU')}
            </div>
          </div>
        </div>
      </header>

      {/* MAIN TOUCH SCREEN CONTENT */}
      <main className="flex-1 flex items-center justify-center p-4 md:p-6 z-10">

        {/* ================= STEP 1: WELCOME & PLASTIC SELECTION ================= */}
        {step === 1 && (
          <div className="w-full max-w-5xl bg-slate-900/60 border border-emerald-900/30 backdrop-blur-xl rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
            {/* Banner Header */}
            <div className="text-center max-w-3xl mx-auto mb-8">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold mb-4">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>{t[language].cleanKg}</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-3">
                {t[language].welcomeTitle}
              </h1>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                {t[language].welcomeSubtitle}
              </p>
            </div>

            {/* Selection Grid */}
            <div className="mb-8">
              <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-400 mb-4 flex items-center">
                <Box className="w-4 h-4 mr-2" />
                {t[language].selectPlastic}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {plasticOptions.map((item) => {
                  const isSelected = selectedPlastic?.id === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelectPlastic(item)}
                      className={`relative rounded-2xl p-5 cursor-pointer transition-all duration-300 border ${
                        isSelected
                          ? 'bg-emerald-950/60 border-emerald-400 ring-2 ring-emerald-400/50 shadow-xl shadow-emerald-950/80 scale-[1.02]'
                          : 'bg-slate-950/50 border-slate-800 hover:border-emerald-700/60 hover:bg-slate-900/80'
                      }`}
                    >
                      {item.popular && (
                        <span className="absolute -top-2.5 right-4 px-2.5 py-0.5 bg-emerald-500 text-slate-950 font-black text-[10px] rounded-full uppercase tracking-wider shadow-md">
                          Популярно
                        </span>
                      )}

                      <div className="flex items-start justify-between mb-3">
                        <span className="text-4xl">{item.icon}</span>
                        <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono font-bold text-emerald-400">
                          {item.code}
                        </span>
                      </div>

                      <h3 className="font-bold text-base text-white mb-1">
                        {item.name[language]}
                      </h3>
                      <p className="text-xs text-slate-400 mb-4 line-clamp-2">
                        {item.subtitle[language]}
                      </p>

                      <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
                        <div className="flex items-center space-x-1 text-emerald-400 font-bold text-xs"><Award className="w-3.5 h-3.5" />
                          <span>+{item.points} Баллов</span>
                        </div>
                        <span className="text-xs font-black px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded border border-emerald-500/30">
                          Скидка {item.discount}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Main Action Trigger */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800/80">
              <div className="flex items-center text-xs text-slate-400 space-x-2">
                <Info className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Убедитесь, что тара очищена от остатков жидкости.</span>
              </div>

              <button
                disabled={!selectedPlastic}
                onClick={startSimulation}
                className={`w-full sm:w-auto px-8 py-4 rounded-2xl font-black text-lg tracking-wide flex items-center justify-center space-x-3 transition-all duration-300 shadow-xl ${
                  selectedPlastic
                    ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 text-slate-950 shadow-emerald-500/25 hover:scale-105 active:scale-95 cursor-pointer'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-60'
                }`}
              >
                <span>{t[language].insertBtn}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Bottom Real-time Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8 pt-6 border-t border-slate-800/40 text-center">
              <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-800/50">
                <div className="text-xl font-extrabold text-emerald-400 font-mono">14,280</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{t[language].totalRecycledLabel}</div>
              </div>
              <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-800/50">
                <div className="text-xl font-extrabold text-teal-300 font-mono">714.0 кг</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Предотвращено мусора</div>
              </div>
              <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-800/50 col-span-2 md:col-span-1">
                <div className="text-xl font-extrabold text-emerald-300 font-mono">142,800 с</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Выдано скидок в Globus</div>
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 2: SCANNER & PRESS ANIMATION ================= */}
        {step === 2 && (
          <div className="w-full max-w-2xl bg-slate-900/80 border border-emerald-900/40 backdrop-blur-xl rounded-3xl p-8 text-center relative overflow-hidden shadow-2xl">
            <h2 className="text-xl font-extrabold text-emerald-400 uppercase tracking-wider mb-6 flex items-center justify-center">
              <Zap className="w-5 h-5 mr-2 animate-bounce" />
              Обработка в приемном отсеке
            </h2>

            {/* Scanner Visual Box */}
            <div className="w-56 h-64 mx-auto bg-slate-950 rounded-2xl border-2 border-emerald-500/40 relative overflow-hidden mb-6 flex flex-col items-center justify-center shadow-inner">
              {/* Laser Line Effect */}
              {processPhase === 1 && (
                <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#10b981] animate-laser"></div>
              )}{/* Weight Overlay Effect */}
              {processPhase === 2 && (
                <div className="absolute top-3 right-3 px-2 py-1 bg-emerald-950 border border-emerald-500/50 text-emerald-400 font-mono text-xs font-bold rounded-lg animate-pulse">
                  {measuredWeight}g
                </div>
              )}

              {/* Animated Item Icon */}
              <div
                className={`text-7xl transition-all duration-700 transform ${
                  processPhase === 3
                    ? 'scale-y-25 scale-x-125 opacity-70 rotate-12 blur-[1px]'
                    : processPhase === 4
                    ? 'scale-0 opacity-0'
                    : 'scale-100 opacity-100'
                }`}
              >
                {selectedPlastic?.icon}
              </div>

              {/* Shredding Particles effect */}
              {processPhase === 3 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}

              {processPhase === 4 && (
                <CheckCircle2 className="w-16 h-16 text-emerald-400 animate-bounce" />
              )}
            </div>

            {/* Dynamic Status Title */}
            <div className="min-h-[50px] flex items-center justify-center mb-4">
              <p className="text-lg font-bold text-emerald-300 font-mono">
                {processPhase === 1 && t[language].scanning}
                {`processPhase === 2 && ${t[language].weighing} (${measuredWeight}г)`}
                {processPhase === 3 && t[language].shredding}
                {processPhase === 4 && t[language].completed}
              </p>
            </div>

            {/* Progress Bar Container */}
            <div className="w-full bg-slate-950 rounded-full h-4 overflow-hidden border border-slate-800 mb-4 p-0.5">
              <div
                className="bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-300 h-full rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            {/* Specs readout */}
            <div className="flex justify-between items-center text-xs font-mono text-slate-400 pt-2 border-t border-slate-800">
              <span>ПРОЦЕСС: {progress}%</span>
              <span>ПРЕСС: {processPhase >= 3 ? 'СЖАТИЕ 70%' : 'ОЖИДАНИЕ'}</span>
            </div>
          </div>
        )}

        {/* ================= STEP 3: REWARD & PRINTED RECEIPT ================= */}
        {step === 3 && (
          <div className="w-full max-w-xl flex flex-col items-center ">
            {/* Printed Paper Voucher Component */}
            <div className="w-full bg-emerald-50 text-slate-900 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden border-t-8 border-emerald-600 animate-printReceipt">
              {/* Receipt Header */}
              <div className="text-center pb-4 border-b-2 border-dashed border-slate-300">
                <div className="inline-flex items-center space-x-2 text-emerald-800 font-black text-2xl tracking-wider">
                  <Recycle className="w-7 h-7 text-emerald-600" />
                  <span>REPLASTIC</span>
                </div>
                <p className="text-xs font-mono text-slate-500 mt-1 uppercase">
                  {t[language].terminalId}
                </p>
                <p className="text-xs font-mono text-slate-400">
                  {currentTime.toLocaleDateString('ru-RU')} | {currentTime.toLocaleTimeString('ru-RU')}
                </p>
              </div>

              {/* Eco Impact Stats */}
              <div className="py-4 border-b-2 border-dashed border-slate-300 space-y-2 font-mono text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Принятый тип:</span>
                  <span className="font-bold text-slate-900">{selectedPlastic?.name[language]}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Измеренный вес:</span>
                  <span className="font-bold text-slate-900">{measuredWeight} грамм</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Эко-эффект:</span>
                  <span className="font-bold text-emerald-700">-0.05 кг CO2</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Сжатие объема:</span>
                  <span className="font-bold text-emerald-700">-70%</span>
                </div>
              </div>{/* Supermarket Voucher Highlight */}
              <div className="my-5 bg-gradient-to-br from-emerald-100 to-teal-100 border-2 border-emerald-300/80 p-4 rounded-2xl text-center shadow-sm">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest block mb-1">
                  {t[language].couponTitle}
                </span>
                <div className="text-4xl font-black text-emerald-700 font-mono my-1">
                  СКИДКА {selectedPlastic?.discount}
                </div>
                <p className="text-[11px] font-semibold text-slate-600">
                  {t[language].partnerStores}
                </p>
              </div>

              {/* QR Code Simulation */}
        {/* Ищи экран успешного завершения (SUCCESS / RECEIPT) */}
{step === 'success' && (
  <div className="flex flex-col items-center justify-center p-4 text-center">
    
    {/* Сообщение на экране терминала */}
    <div className="no-print mb-4">
      <h2 className="text-2xl font-bold text-green-400">Бутылка успешно принята!</h2>
      <p className="text-gray-200 text-sm">Возьмите ваш чек со скидкой ниже</p>
    </div>

    {/* ВОТ ЭТОТ БЛОК — НАШ МИНИ-ЧЕК ДЛЯ ПРИНТЕРА */}
    <div 
      id="printable-receipt" 
      className="bg-white text-black p-3 rounded-lg shadow-md max-w-[200px] w-full text-center border border-gray-300"
    >
      {/* Шапка чека */}
      <div className="font-bold text-sm tracking-tighter">REPLASTIC</div>
      <div className="text-[9px] border-b border-black pb-1 mb-1">Тара: ПЭТ Бутылка</div>

      {/* Информация о скидке */}
      <div className="my-1">
        <span className="text-xs font-bold block">СКИДКА 10%</span>
        <span className="text-[8px] text-gray-600 block">Globus / Народный / Alma</span>
      </div>

      {/* Маленький QR-код */}
      <div className="flex flex-col items-center justify-center my-1">
        <img 
          src="https://api.qrserver.com/v1/create-qr-code/?size=60x60&data=RP10" 
          alt="QR" 
          className="w-12 h-12"
        />
        <span className="text-[8px] font-mono mt-0.5">#RP-849</span>
      </div>

      {/* Кнопка вызова печати (видна только на экране!) */}
      <button
        onClick={() => window.print()}
        className="no-print mt-2 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-1.5 px-2 text-xs rounded transition-all"
      >
        🖨️ Распечатать чек
      </button>
    </div>

    {/* Кнопка сброса / Начать заново */}
    <button 
      onClick={resetTerminal}
      className="no-print mt-6 text-xs text-gray-300 underline"
    >
      Завершить работу
    </button>
  </div>
)}

              {/* Action Buttons */}
              <div className="space-y-2 mt-6">
                <button
                  onClick={resetApp}
                  className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-black rounded-xl text-sm transition-all shadow-lg shadow-emerald-700/30 flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>{t[language].getReceiptBtn}</span>
                </button>
              </div>
            </div>

            {/* Countdown Banner */}
            <p className="text-center text-slate-400 text-xs mt-4 font-mono">
              {t[language].autoReset} <span className="text-emerald-400 font-bold">{resetTimer}</span> {t[language].sec}.
            </p>
          </div>
        )}

      </main>

      {/* FOOTER BAR */}
      <footer className="w-full px-6 py-3 bg-slate-900/80 border-t border-emerald-900/30 text-center text-xs text-slate-500 z-20 flex flex-col sm:flex-row justify-between items-center gap-2">
        <span>Replastic Kyrgyzstan © 2026 | Инновации для чистого будущего</span>
        <div className="flex items-center space-x-4 text-slate-400 text-[11px]">
          <span className="flex items-center"><ShieldCheck className="w-3.5 h-3.5 text-emerald-500 mr-1" /> Оптический сканер active</span>
          <span className="flex items-center"><Scale className="w-3.5 h-3.5 text-emerald-500 mr-1" /> Тензодатчики OK</span>
        </div>
      </footer>

      {/* Custom CSS Keyframe Animations */}
      <style>{`
        @keyframes laser {
          0% { top: 10%; opacity: 0.3; }
          50% { opacity: 1; }
          100% { top: 90%; opacity: 0.3; }
        }
        .animate-laser {
          animation: laser 1.5s infinite ease-in-out alternate;
        }
        @keyframes printReceipt {
          0% { transform: translateY(-40px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-printReceipt {
          animation: printReceipt 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes spinSlow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spinSlow 12s linear infinite;
        }
      `}</style>
    </div>
  );
}