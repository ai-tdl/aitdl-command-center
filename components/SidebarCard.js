'use client';
import { useState, useEffect, useRef } from 'react';
import { getVikramSamvatFull, VS_RITUS } 
  from '../lib/vikramSamvat';
import { getTodayFact, getRandomBharatFact } 
  from '../data/techHistory';

export default function SidebarCard() {
  const [mounted, setMounted]     = useState(false);
  const [visible, setVisible]     = useState(false);
  const [open, setOpen]           = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [showCt, setShowCt]       = useState(false);
  const [vsOpen, setVsOpen]       = useState(false);

  const [vs, setVs]     = useState(null);
  const [fact, setFact] = useState(null);
  const [bh, setBh]     = useState(null);

  const ctRef   = useRef(null);
  const fillRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    setVs(getVikramSamvatFull());
    setFact(getTodayFact());
    setBh(getRandomBharatFact());
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const handleLoad = () => {
      setTimeout(() => {
        setVisible(true);
        setTimeout(() => {
          setOpen(true);
          setShowCt(true);
          setCountdown(5);
          let ct = 5;
          if (fillRef.current) {
            fillRef.current.style.transition = 'none';
            fillRef.current.style.width = '100%';
            setTimeout(() => {
              if (fillRef.current) {
                fillRef.current.style.transition = 'width 5s linear';
                fillRef.current.style.width = '0%';
              }
            }, 50);
          }
          ctRef.current = setInterval(() => {
            ct--;
            setCountdown(ct);
            if (ct <= 0) {
              clearInterval(ctRef.current);
              setOpen(false);
              setShowCt(false);
            }
          }, 1000);
        }, 100);
      }, 2000);
    };
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, [mounted]);

  const handleTabClick = () => {
    if (ctRef.current) clearInterval(ctRef.current);
    setShowCt(false);
    setOpen(prev => !prev);
  };

  if (!mounted || !vs || !fact || !bh) return null;

  return (
    <div className={`fixed right-0 top-1/2 
      -translate-y-1/2 z-50 flex items-center 
      transition-all duration-500
      ${visible 
        ? 'translate-x-0 opacity-100' 
        : 'translate-x-full opacity-0'}`}
    >
      {/* TAB */}
      <button
        onClick={handleTabClick}
        className="bg-white dark:bg-gray-900 
          border border-r-0 
          border-gray-200 dark:border-gray-700 
          rounded-l-lg px-2 py-3 
          flex flex-col items-center gap-1.5 
          cursor-pointer 
          hover:bg-gray-50 dark:hover:bg-gray-800 
          transition-colors flex-shrink-0 
          focus:outline-none"
        aria-label="Toggle info panel"
      >
        <span style={{ fontSize: '14px' }}>🇮🇳</span>
        <div className="flex flex-col gap-0.5 
          items-center">
          {[0,1,2].map(i => (
            <div key={i} className="w-1 h-1 
              rounded-full bg-gray-400 
              dark:bg-gray-600" />
          ))}
        </div>
        <span className={`text-xs text-gray-400 
          transition-transform duration-300 
          ${open ? 'rotate-0' : 'rotate-180'}`}>
          ▶
        </span>
      </button>

      {/* CARD */}
      <div
        className="overflow-hidden bg-white 
          dark:bg-gray-900 border border-r-0 
          border-gray-200 dark:border-gray-700 
          rounded-l-lg"
        style={{
          width: open ? '210px' : '0px',
          opacity: open ? 1 : 0,
          transition: 
            'width 0.4s cubic-bezier(0.4,0,0.2,1),'
            +'opacity 0.35s ease',
        }}
      >
        {/* Header */}
        <div className="px-3 py-2 border-b 
          border-gray-100 dark:border-gray-800 
          flex items-center justify-between">
          <span className="text-xs font-medium 
            text-gray-400 uppercase 
            tracking-widest whitespace-nowrap"
            style={{fontSize:'9px'}}>
            Bharat · History · Calendar
          </span>
          <div className="w-1.5 h-1.5 rounded-full 
            bg-green-400 animate-pulse 
            flex-shrink-0" />
        </div>

        {/* Section 1 — Bharat Legacy */}
        <div className="px-3 py-2.5 border-b 
          border-gray-100 dark:border-gray-800">
          <div className="flex items-center 
            gap-1.5 mb-2">
            <span style={{fontSize:'11px'}}>🇮🇳</span>
            <span className="text-xs font-medium 
              px-1.5 py-0.5 rounded-full 
              bg-amber-50 dark:bg-amber-900/20
              text-amber-700 dark:text-amber-400
              border border-amber-200/60
              whitespace-nowrap"
              style={{fontSize:'9px'}}>
              {bh.era}
            </span>
          </div>
          <p className="text-xs font-semibold 
            text-gray-800 dark:text-gray-200 
            mb-0.5 leading-tight">
            {bh.person}
          </p>
          <p className="text-gray-400 mb-1.5 
            leading-tight"
            style={{fontSize:'10px'}}>
            {bh.title}
          </p>
          <p className="text-gray-500 
            dark:text-gray-400 leading-relaxed 
            mb-2" style={{fontSize:'10px'}}>
            {bh.fact.length > 90 
              ? bh.fact.slice(0,90)+'…' 
              : bh.fact}
          </p>
          <div className="flex gap-1.5 p-1.5 
            rounded-md bg-teal-50 
            dark:bg-teal-900/20">
            <span className="text-teal-500 
              flex-shrink-0 mt-0.5"
              style={{fontSize:'10px'}}>⚡</span>
            <p className="text-teal-700 
              dark:text-teal-400 leading-relaxed"
              style={{fontSize:'9px'}}>
              {bh.connection.length > 80
                ? bh.connection.slice(0,80)+'…'
                : bh.connection}
            </p>
          </div>
        </div>

        {/* Section 2 — Vikram Samvat */}
        <div className="px-3 py-2.5 border-b 
          border-gray-100 dark:border-gray-800">
          <button
            onClick={() => setVsOpen(!vsOpen)}
            className="w-full text-left 
              focus:outline-none">
            <p className="text-xs font-semibold 
              text-amber-500 leading-snug mb-0.5">
              {vs.line1}
            </p>
            <p className="text-amber-600/70 mb-1"
              style={{fontSize:'10px'}}>
              {vs.line2}
            </p>
            <div className="flex items-center 
              gap-1 my-1.5">
              <div className="flex-1 h-px 
                bg-gray-100 dark:bg-gray-800"/>
              <span className="text-gray-300"
                style={{fontSize:'8px'}}>✦</span>
              <div className="flex-1 h-px 
                bg-gray-100 dark:bg-gray-800"/>
            </div>
            <p className="text-gray-500 
              dark:text-gray-400"
              style={{fontSize:'10px'}}>
              {vs.line3.split('|')[0].trim()}
            </p>
            <p className="text-gray-400"
              style={{fontSize:'9px'}}>
              {vs.line3.split('|')[1]?.trim()}
            </p>
            <div className="flex items-center 
              gap-1.5 mt-1.5 flex-wrap">
              <span className="px-1.5 py-0.5 
                rounded-full border 
                border-gray-200 
                dark:border-gray-700 
                text-gray-400 whitespace-nowrap"
                style={{fontSize:'9px'}}>
                {vs.ritu?.icon} {vs.ritu?.name}
              </span>
              {vs.daysToNavVarsh > 0 && (
                <span className="text-amber-500 
                  whitespace-nowrap"
                  style={{fontSize:'9px'}}>
                  {vs.daysToNavVarsh}d to VS 2083 🙏
                </span>
              )}
              {vs.daysToNavVarsh === 0 && (
                <span className="text-amber-500 
                  font-medium"
                  style={{fontSize:'9px'}}>
                  🎊 नव वर्षाभिनन्दनम्!
                </span>
              )}
              <span className="text-gray-400 ml-auto"
                style={{fontSize:'9px'}}>
                {vsOpen ? '▲' : '▼'}
              </span>
            </div>
          </button>

          {/* VS Expanded — Ritus */}
          {vsOpen && (
            <div className="mt-2 pt-2 border-t 
              border-gray-100 dark:border-gray-800">
              <div className="grid grid-cols-3 
                gap-1 mb-2">
                {VS_RITUS.map(r => (
                  <div key={r.name}
                    className={`text-center p-1 
                      rounded border
                      ${vs.ritu?.name===r.name
                        ? 'border-amber-400/50 bg-amber-50 dark:bg-amber-900/20'
                        : 'border-gray-100 dark:border-gray-800'
                      }`}>
                    <div style={{fontSize:'11px'}}>
                      {r.icon}
                    </div>
                    <div className={`font-medium 
                      ${vs.ritu?.name===r.name
                        ? 'text-amber-600 dark:text-amber-400'
                        : 'text-gray-400'
                      }`}
                      style={{fontSize:'8px'}}>
                      {r.name}
                    </div>
                  </div>
                ))}
              </div>
              {vs.festivals?.length > 0 && (
                <div className="flex flex-wrap 
                  gap-1">
                  {vs.festivals
                    .slice(0,3)
                    .map(f => (
                    <span key={f}
                      className="px-1.5 py-0.5 
                        rounded-full border 
                        border-amber-300/50 
                        text-amber-600 
                        dark:text-amber-400"
                      style={{fontSize:'8px'}}>
                      {f}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Section 3 — Today in History */}
        <div className="px-3 py-2.5 border-b 
          border-gray-100 dark:border-gray-800">
          <div className="flex items-center 
            gap-2 mb-1.5">
            <span className="font-medium 
              px-1.5 py-0.5 rounded 
              bg-amber-50 dark:bg-amber-900/20
              text-amber-700 dark:text-amber-400
              whitespace-nowrap"
              style={{fontSize:'10px'}}>
              {fact.year}
            </span>
            <span className="text-gray-400"
              style={{fontSize:'9px'}}>
              On This Day
            </span>
          </div>
          <p className="text-gray-500 
            dark:text-gray-400 leading-relaxed"
            style={{fontSize:'10px'}}>
            {fact.fact.length > 100
              ? fact.fact.slice(0,100)+'…'
              : fact.fact}
          </p>
        </div>

        {/* Footer — Phase 2 */}
        <div className="px-3 py-2">
          <button className="w-full text-gray-300 
            hover:text-amber-500 
            transition-colors flex items-center 
            justify-center gap-1 
            focus:outline-none"
            style={{fontSize:'9px'}}>
            📖 View Full History →
          </button>
        </div>

        {/* Countdown bar */}
        {showCt && (
          <div className="px-3 py-1.5 border-t 
            border-gray-100 dark:border-gray-800 
            flex items-center gap-2">
            <div className="flex-1 h-0.5 
              bg-gray-200 dark:bg-gray-700 
              rounded-full overflow-hidden">
              <div
                ref={fillRef}
                className="h-0.5 bg-amber-500 
                  rounded-full"
                style={{width:'100%'}}
              />
            </div>
            <span className="text-gray-400 
              min-w-[14px] text-right"
              style={{fontSize:'10px'}}>
              {countdown}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
