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

  useEffect(() => {
    setVs(getVikramSamvatFull());
    setFact(getTodayFact());
    setBh(getRandomBharatFact());
  }, []);

  if (!vs || !fact || !bh) return null;

  return (
    <div className="w-full mt-6">

      {/* ══ SECTION 1 — BHARAT LEGACY ══ */}
      <div className="border-t border-gray-800 
        pt-5 mb-4">
        <p className="text-xs font-medium 
          text-gray-500 uppercase 
          tracking-widest mb-3">
          🇮🇳 Bharat Computing Legacy
        </p>
        <div className="border-l-2 
          border-amber-600/60 pl-3 
          bg-amber-500/5 rounded-r-lg 
          py-3 pr-3">
          <div className="flex items-start 
            justify-between gap-2 mb-1.5">
            <div>
              <span className="text-sm 
                font-medium 
                text-amber-300">
                {bh.person}
              </span>
              <span className="text-xs 
                text-amber-600/70 ml-2">
                — {bh.title}
              </span>
            </div>
            <span className="text-xs 
              text-amber-700/60 
              flex-shrink-0 
              border border-amber-700/30 
              px-2 py-0.5 rounded-full">
              {bh.era}
            </span>
          </div>
          <p className="text-xs 
            text-gray-400 
            leading-relaxed mb-2">
            {bh.fact}
          </p>
          <div className="flex gap-2 
            items-start border-t 
            border-amber-800/20 pt-2">
            <span className="text-teal-400 
              text-xs flex-shrink-0 mt-0.5">
              ⚡
            </span>
            <p className="text-xs 
              text-teal-400/70 
              leading-relaxed">
              <span className="font-medium">
                Modern connection:
              </span>
              {" "}{bh.connection}
            </p>
          </div>
        </div>
      </div>

      {/* ══ SECTION 2 — DAILY HISTORY ══ */}
      <div className="border-t 
        border-gray-800/60 pt-4 pb-4">
        <p className="text-xs font-medium 
          text-gray-500 uppercase 
          tracking-widest mb-2">
          On This Day in Tech History
        </p>
        <p className="text-sm 
          text-gray-300 leading-relaxed">
          <span className="text-amber-400 
            font-medium">
            {fact.year}
          </span>
          {" — "}
          {fact.fact}
        </p>
      </div>

      {/* ══ SECTION 3 — VIKRAM SAMVAT ══ */}
      <div className="border-t 
        border-gray-800/60 pt-4">
        <div
          className="cursor-pointer group 
            text-center select-none"
          onClick={() => setOpen(!open)}
        >
          <p className="text-sm font-medium 
            text-amber-400 leading-relaxed">
            {vs.line1}
          </p>
          <p className="text-xs 
            text-amber-500/70 mt-0.5">
            {vs.line2}
          </p>
          <p className="text-xs 
            text-gray-600 my-1.5 
            tracking-widest">
            ━━━━━
          </p>
          <p className="text-xs 
            text-gray-400">
            {vs.line3}
          </p>
          <p className="text-xs 
            text-gray-500 mt-1.5">
            {vs.ritu?.icon} {vs.ritu?.name} Ritu
            {vs.isAdhikMaas && (
              <span className="text-amber-400 
                ml-2">
                · Adhik Maas ✨
              </span>
            )}
            {vs.daysToNavVarsh > 0 && (
              <span className="text-amber-400/70 
                ml-2">
                · {vs.daysToNavVarsh} days to 
                VS 2083 🙏
              </span>
            )}
            {vs.daysToNavVarsh === 0 && (
              <span className="text-amber-300 
                ml-2 font-medium">
                🎊 नव वर्षाभिनन्दनम्!
              </span>
            )}
            <span className="text-gray-700 
              ml-2 
              group-hover:text-gray-500 
              transition-colors">
              {open ? '▲' : '▼'}
            </span>
          </p>
        </div>

        {open && (
          <div className="mt-3 pt-3 
            border-t border-gray-800/40">

            <p className="text-xs 
              text-gray-600 uppercase 
              tracking-widest 
              text-center mb-2">
              षड् ऋतु — Six Seasons
            </p>

            <div className="grid grid-cols-3 
              gap-1.5 mb-3 
              sm:grid-cols-6">
              {VS_RITUS.map(r => (
                <div key={r.name}
                  className={`text-center 
                    p-2 rounded-lg border 
                    text-xs transition-colors
                    ${vs.ritu?.name===r.name
                      ? 'border-amber-600/50 bg-amber-500/10'
                      : 'border-gray-800/60'
                    }`}
                >
                  <div className="text-base 
                    mb-1">
                    {r.icon}
                  </div>
                  <div className={`font-medium
                    ${vs.ritu?.name===r.name
                      ? 'text-amber-400'
                      : 'text-gray-500'
                    }`}>
                    {r.name}
                  </div>
                  <div className="text-gray-600">
                    {r.en}
                  </div>
                </div>
              ))}
            </div>

            {vs.festivals?.length > 0 && (
              <div className="mb-3">
                <p className="text-xs 
                  text-gray-600 
                  text-center mb-1.5">
                  🎊 Upcoming Festivals
                </p>
                <div className="flex 
                  flex-wrap gap-1.5 
                  justify-center">
                  {vs.festivals.map(f => (
                    <span key={f}
                      className="text-xs 
                        px-2.5 py-0.5 
                        rounded-full 
                        border 
                        border-amber-700/30 
                        text-amber-500/80">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {vs.daysToNavVarsh > 0 && 
             vs.daysToNavVarsh <= 30 && (
              <p className="text-center 
                text-xs text-amber-500/50 
                mb-2">
                ✨ VS 2083 has 13 months 
                (Adhika Maas) — 
                first time in 3 years
              </p>
            )}

            <p className="text-center 
              text-xs text-gray-700">
              Founded by Emperor Vikramaditya 
              of Ujjain · 57 BCE · 
              {vs.vsYear} years of unbroken 
              tradition 🇮🇳
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
