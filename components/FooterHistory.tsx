'use client';
import { useState, useEffect } from 'react';
import { getTodayFact, getRandomBharatFact }
  from '../data/techHistory';
import { getVikramSamvatFull, VS_RITUS }
  from '../lib/vikramSamvat';

export default function FooterHistory() {
  const [vs, setVs]       = useState(null);
  const [fact, setFact]   = useState(null);
  const [bh, setBh]       = useState(null);
  const [open, setOpen]   = useState(false);
  const [vsOpen, setVsOpen] = useState(false);

  useEffect(() => {
    setVs(getVikramSamvatFull());
    setFact(getTodayFact());
    setBh(getRandomBharatFact());
  }, []);

  if (!vs || !fact || !bh) return null;

  return (
    <div className="w-full border-t 
      border-gray-200 dark:border-gray-800 
      mt-6">

      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center 
          justify-center gap-2 py-3 
          text-xs font-medium 
          text-gray-400 
          hover:text-amber-500 
          transition-colors 
          cursor-pointer
          focus:outline-none"
      >
        <span>🇮🇳</span>
        <span>
          {open 
            ? 'Hide Bharat History' 
            : 'Bharat Computing Legacy · Tech History · Vikram Samvat'
          }
        </span>
        <span className={`transition-transform 
          duration-300 text-xs
          ${open ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>

      {/* Expandable content */}
      {open && (
        <div className="pb-6 px-4 
          max-w-2xl mx-auto space-y-4">

          {/* ── BHARAT LEGACY ── */}
          <div className="border-l-2 
            border-amber-500 pl-3 
            py-1">
            <div className="flex items-center 
              justify-between mb-1">
              <span className="text-xs 
                font-semibold 
                text-amber-500 
                uppercase tracking-wide">
                🇮🇳 {bh.era}
              </span>
            </div>
            <p className="text-sm 
              font-medium 
              text-gray-700 
              dark:text-gray-300 mb-1">
              {bh.person}
              <span className="text-xs 
                font-normal 
                text-gray-400 ml-1">
                — {bh.title}
              </span>
            </p>
            <p className="text-xs 
              text-gray-500 
              dark:text-gray-400 
              leading-relaxed mb-2">
              {bh.fact}
            </p>
            <div className="flex gap-1.5 
              items-start">
              <span className="text-teal-500 
                text-xs mt-0.5 flex-shrink-0">
                ⚡
              </span>
              <p className="text-xs 
                text-teal-600 
                dark:text-teal-400 
                leading-relaxed">
                {bh.connection}
              </p>
            </div>
          </div>

          {/* ── TODAY IN HISTORY ── */}
          <div className="border-t 
            border-gray-100 
            dark:border-gray-800 pt-3">
            <p className="text-xs 
              font-semibold 
              text-gray-400 
              uppercase tracking-widest 
              mb-1.5">
              On This Day in Tech History
            </p>
            <p className="text-sm 
              text-gray-600 
              dark:text-gray-300 
              leading-relaxed">
              <span className="text-amber-500 
                font-semibold">
                {fact.year}
              </span>
              {" — "}
              {fact.fact}
            </p>
          </div>

          {/* ── VIKRAM SAMVAT ── */}
          <div className="border-t 
            border-gray-100 
            dark:border-gray-800 pt-3">
            <button
              onClick={() => 
                setVsOpen(!vsOpen)}
              className="w-full text-center 
                focus:outline-none 
                cursor-pointer group"
            >
              <p className="text-sm 
                font-semibold 
                text-amber-500 
                leading-snug">
                {vs.line1}
              </p>
              <p className="text-xs 
                text-amber-400/70 
                mt-0.5">
                {vs.line2}
              </p>
              <p className="text-xs 
                text-gray-400 
                tracking-widest my-1">
                ━━━━━
              </p>
              <p className="text-xs 
                text-gray-500">
                {vs.line3}
              </p>
              <p className="text-xs 
                text-gray-400 mt-1">
                {vs.ritu?.icon} 
                {vs.ritu?.name} Ritu
                {vs.daysToNavVarsh > 0 && (
                  <span className="text-amber-400 
                    ml-2">
                    · {vs.daysToNavVarsh} days 
                    to VS 2083 🙏
                  </span>
                )}
                {vs.daysToNavVarsh === 0 && (
                  <span className="text-amber-400 
                    ml-2 font-medium">
                    🎊 नव वर्षाभिनन्दनम्!
                  </span>
                )}
                <span className="text-gray-500 
                  ml-1 
                  group-hover:text-gray-400">
                  {vsOpen ? '▲' : '▼'}
                </span>
              </p>
            </button>

            {/* VS Expanded */}
            {vsOpen && (
              <div className="mt-3 pt-3 
                border-t border-gray-100 
                dark:border-gray-800">
                <p className="text-xs 
                  text-gray-400 
                  uppercase tracking-widest 
                  text-center mb-2">
                  षड् ऋतु — Six Seasons
                </p>
                <div className="grid 
                  grid-cols-3 gap-1.5 
                  sm:grid-cols-6 mb-3">
                  {VS_RITUS.map(r => (
                    <div key={r.name}
                      className={`text-center 
                        p-1.5 rounded-lg 
                        border text-xs
                        ${vs.ritu?.name===r.name
                          ? 'border-amber-400/50 bg-amber-50 dark:bg-amber-900/20'
                          : 'border-gray-200 dark:border-gray-700'
                        }`}
                    >
                      <div className="text-sm 
                        mb-0.5">
                        {r.icon}
                      </div>
                      <div className={`font-medium 
                        text-xs
                        ${vs.ritu?.name===r.name
                          ? 'text-amber-600 dark:text-amber-400'
                          : 'text-gray-400'
                        }`}>
                        {r.name}
                      </div>
                    </div>
                  ))}
                </div>
                {vs.festivals?.length > 0 && (
                  <div className="flex 
                    flex-wrap gap-1 
                    justify-center mb-2">
                    {vs.festivals.map(f => (
                      <span key={f}
                        className="text-xs 
                          px-2 py-0.5 
                          rounded-full 
                          border 
                          border-amber-300/50 
                          text-amber-600 
                          dark:text-amber-400">
                        {f}
                      </span>
                    ))}
                  </div>
                )}
                <p className="text-center 
                  text-xs text-gray-400 
                  dark:text-gray-600 mt-1">
                  Founded by Emperor 
                  Vikramaditya · 57 BCE · 
                  {vs.vsYear} years 🇮🇳
                </p>
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
}
