'use client';
import { useState, useEffect, useRef } from 'react';
import { getVikramSamvatFull } from '../lib/vikramSamvat';
import { getTodayFact, getRandomBharatFact } from '../data/techHistory';

export default function SidebarCard() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [showCt, setShowCt] = useState(false);

  const [vs, setVs] = useState(null);
  const [fact, setFact] = useState(null);
  const [bh, setBh] = useState(null);

  const ctRef = useRef(null);
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
      // 2 second wait after full load
      setTimeout(() => {
        setVisible(true);

        // Slide in then open card
        setTimeout(() => {
          setOpen(true);
          setShowCt(true);
          setCountdown(5);

          // Start countdown
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
    // Clear auto-hide countdown
    if (ctRef.current) {
      clearInterval(ctRef.current);
    }
    setShowCt(false);
    setOpen(prev => !prev);
  };

  if (!mounted || !vs || !fact || !bh) return null;

  return (
    <div
      className={`fixed right-0 top-1/2 -translate-y-1/2 z-50 flex items-center transition-all duration-500
        ${visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
    >
      {/* ── TAB ── */}
      <button
        onClick={handleTabClick}
        className="bg-white dark:bg-gray-900 border border-r-0 border-gray-200 dark:border-gray-700 rounded-l-lg px-2 py-3 flex flex-col items-center gap-1.5 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex-shrink-0 focus:outline-none"
        aria-label="Toggle info panel"
      >
        <span style={{ fontSize: '14px' }}>🇮🇳</span>
        <div className="flex flex-col gap-0.5 items-center">
          {[0, 1, 2].map(i => (
            <div key={i} className="w-1 h-1 rounded-full bg-gray-400 dark:bg-gray-600" />
          ))}
        </div>
        <span className={`text-xs text-gray-400 transition-transform duration-300 ${open ? 'rotate-0' : 'rotate-180'}`}>▶</span>
      </button>

      {/* ── CARD ── */}
      <div
        className={`overflow-hidden transition-all duration-400 ease-in-out bg-white dark:bg-gray-900 border border-r-0 border-gray-200 dark:border-gray-700 rounded-l-lg
          ${open ? 'w-48 opacity-100' : 'w-0 opacity-0'}`}
        style={{
          width: open ? '192px' : '0px',
          opacity: open ? 1 : 0,
          transition: 'width 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.35s ease',
        }}
      >
        {/* Section 1 — Bharat Legacy */}
        <div className="px-3 py-2.5 border-b border-gray-100 dark:border-gray-800">
          <div className="text-[10px] font-medium text-amber-600 uppercase tracking-wide mb-1">
            🇮🇳 {bh.era}
          </div>
          <div className="text-[11px] font-semibold text-gray-800 dark:text-gray-200 mb-1 leading-tight">
            {bh.person}
          </div>
          <div className="text-[10px] text-gray-500 dark:text-gray-400 leading-relaxed mb-1.5">
            {bh.fact.length > 80 ? bh.fact.slice(0, 80) + '…' : bh.fact}
          </div>
          <div className="text-[10px] text-teal-600 dark:text-teal-400 leading-relaxed border-t border-gray-100 dark:border-gray-800 pt-1.5">
            ⚡ {bh.connection.length > 60 ? bh.connection.slice(0, 60) + '…' : bh.connection}
          </div>
        </div>

        {/* Section 2 — VS Date */}
        <div className="px-3 py-2.5 border-b border-gray-100 dark:border-gray-800">
          <div className="text-[11px] font-semibold text-amber-500 leading-snug mb-0.5">
            {vs.line1}
          </div>
          <div className="text-[10px] text-amber-600/70 mb-1">
            {vs.line2}
          </div>
          <div className="text-[10px] text-gray-400 tracking-widest mb-1">━━━━</div>
          <div className="text-[10px] text-gray-500 dark:text-gray-400">
            {vs.line3}
          </div>
        </div>

        {/* Section 3 — Today in History */}
        <div className="px-3 py-2.5 border-b border-gray-100 dark:border-gray-800">
          <div className="text-[11px] font-semibold text-amber-500 mb-1">
            {fact.year} — Today
          </div>
          <div className="text-[10px] text-gray-500 dark:text-gray-400 leading-relaxed">
            {fact.fact.length > 75 ? fact.fact.slice(0, 75) + '…' : fact.fact}
          </div>
        </div>

        {/* View Full History — Phase 2 */}
        <div className="px-3 py-2 text-center">
          <span className="text-[10px] text-gray-400 dark:text-gray-600 italic">
            Full history — coming soon
          </span>
        </div>

        {/* Countdown progress bar */}
        {showCt && (
          <div className="px-3 py-1.5 border-t border-gray-100 dark:border-gray-800 flex items-center gap-2">
            <div className="flex-1 h-0.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                ref={fillRef}
                className="h-0.5 bg-amber-500 rounded-full"
                style={{ width: '100%' }}
              />
            </div>
            <span className="text-[10px] text-gray-400 min-w-[14px] text-right">
              {countdown}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
