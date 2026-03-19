'use client';
import { useState, useEffect } from 'react';
import { getTodayFact, getRandomBharatFact }
  from '../data/techHistory';
import { getVikramSamvatFull, VS_RITUS }
  from '../lib/vikramSamvat';

export default function RightPanel() {
  const [vs, setVs]         = useState(null);
  const [fact, setFact]     = useState(null);
  const [bh, setBh]         = useState(null);
  const [vsOpen, setVsOpen] = useState(true);
  const [open, setOpen]     = useState(true);  // hide/show state

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVs(getVikramSamvatFull());
    setFact(getTodayFact());
    setBh(getRandomBharatFact());
    // Restore persisted preference
    const saved = localStorage.getItem('rightpanel_open');
    if (saved !== null) setOpen(saved === 'true');
  }, []);

  const toggle = () => {
    setOpen(prev => {
      localStorage.setItem('rightpanel_open', String(!prev));
      return !prev;
    });
  };

  if (!vs || !fact || !bh) return null;

  return (
    <div style={{ position: 'relative' }}>

      {/* ── Floating toggle tab ── */}
      <button
        onClick={toggle}
        title={open ? 'Hide sidebar' : 'Show sidebar'}
        style={{
          position: 'absolute',
          top: '12px',
          left: open ? '-28px' : '-40px',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: open ? '28px' : '40px',
          height: '38px',
          borderRadius: open ? '8px 0 0 8px' : '8px 0 0 8px',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border)',
          borderRight: 'none',
          cursor: 'pointer',
          boxShadow: '-4px 2px 12px rgba(0,0,0,0.08)',
          transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
          color: 'var(--text-tertiary)',
          fontSize: '12px',
          fontWeight: 700,
          gap: '3px',
          padding: '0 6px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
        }}
        className="rightpanel-toggle-btn"
      >
        <span style={{
          display: 'inline-block',
          transition: 'transform 0.3s ease',
          transform: open ? 'scaleX(1)' : 'scaleX(-1)',
          fontSize: '10px',
        }}>
          ◀
        </span>
        {!open && (
          <span style={{
            fontSize: '9px',
            fontWeight: 700,
            color: 'var(--accent)',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}>
            BHC
          </span>
        )}
      </button>

      {/* ── Panel body ── */}
      <div style={{
        width: open ? '240px' : '0px',
        overflow: 'hidden',
        transition: 'width 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease',
        opacity: open ? 1 : 0,
        borderRadius: '12px',
        background: 'var(--bg-secondary)',
        border: open ? '1px solid var(--border)' : 'none',
        fontSize: '13px',
        boxShadow: open ? '0 4px 24px rgba(0,0,0,0.10)' : 'none',
        transition: 'width 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease, box-shadow 0.3s ease',
      }}>

        {/* ── Header ── */}
        <div style={{
          padding: '10px 14px',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          minWidth: '220px',
        }}>
          <span style={{
            fontSize: '10px',
            fontWeight: 700,
            color: 'var(--text-tertiary)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}>
            Bharat · History · Calendar
          </span>
          {/* Hide button inside header */}
          <button
            onClick={toggle}
            title="Collapse sidebar"
            style={{
              background: 'none',
              border: '0.5px solid var(--border)',
              borderRadius: '6px',
              cursor: 'pointer',
              padding: '2px 6px',
              fontSize: '10px',
              color: 'var(--text-tertiary)',
              lineHeight: 1,
              transition: 'all 0.2s ease',
            }}
            className="rightpanel-collapse-btn"
          >
            ✕
          </button>
        </div>

        {/* ── Bharat Legacy ── */}
        <div style={{
          padding: '12px 14px',
          borderBottom: '1px solid var(--border)',
          minWidth: '220px',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '6px',
          }}>
            <span>🇮🇳</span>
            <span style={{
              fontSize: '9px',
              fontWeight: 600,
              padding: '2px 7px',
              borderRadius: '99px',
              background: '#FAEEDA',
              color: '#854F0B',
              border: '0.5px solid #BA751740',
            }}>
              {bh.era}
            </span>
          </div>
          <p style={{
            fontSize: '12px',
            fontWeight: 600,
            color: 'var(--text-primary)',
            marginBottom: '2px',
          }}>
            {bh.person}
          </p>
          <p style={{
            fontSize: '10px',
            color: 'var(--text-tertiary)',
            marginBottom: '6px',
          }}>
            {bh.title}
          </p>
          <p style={{
            fontSize: '11px',
            color: 'var(--text-secondary)',
            lineHeight: 1.5,
            marginBottom: '8px',
          }}>
            {bh.fact.length > 100 ? bh.fact.slice(0,100)+'…' : bh.fact}
          </p>
          <div style={{
            display: 'flex',
            gap: '5px',
            padding: '6px 8px',
            background: '#E1F5EE',
            borderRadius: '6px',
          }}>
            <span style={{ color: '#0F6E56', fontSize: '11px', flexShrink: 0 }}>⚡</span>
            <p style={{ fontSize: '10px', color: '#0F6E56', lineHeight: 1.5 }}>
              {bh.connection.length > 80 ? bh.connection.slice(0,80)+'…' : bh.connection}
            </p>
          </div>
        </div>

        {/* ── Vikram Samvat ── */}
        <div style={{
          padding: '12px 14px',
          borderBottom: '1px solid var(--border)',
          minWidth: '220px',
        }}>
          <button
            onClick={() => setVsOpen(!vsOpen)}
            style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0 }}
          >
            <p style={{ fontSize: '12px', fontWeight: 600, color: '#BA7517', marginBottom: '2px' }}>
              {vs.line1}
            </p>
            <p style={{ fontSize: '10px', color: '#854F0B', opacity: 0.8, marginBottom: '6px', fontWeight: 700 }}>
              {vs.line2}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
              <div style={{ flex: 1, height: '0.5px', background: 'var(--border)' }} />
              <span style={{ fontSize: '8px', color: 'var(--text-tertiary)' }}>✦</span>
              <div style={{ flex: 1, height: '0.5px', background: 'var(--border)' }} />
            </div>
            <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '6px' }}>
              {vs.line3}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '10px', padding: '2px 7px', borderRadius: '99px', border: '0.5px solid var(--border)', color: 'var(--text-tertiary)' }}>
                {vs.ritu?.icon} {vs.ritu?.name}
              </span>
              {vs.daysToNavVarsh > 0 && (
                <span style={{ fontSize: '10px', color: '#BA7517' }}>{vs.daysToNavVarsh}d to VS 2083 🙏</span>
              )}
              {vs.daysToNavVarsh === 0 && (
                <span style={{ fontSize: '10px', color: '#BA7517', fontWeight: 600 }}>🎊 नव वर्षाभिनन्दनम्!</span>
              )}
              <span style={{ fontSize: '9px', color: 'var(--text-tertiary)', marginLeft: 'auto' }}>
                {vsOpen ? '▲' : '▼'}
              </span>
            </div>
          </button>

          {vsOpen && (
            <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '0.5px solid var(--border)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px', marginBottom: '8px' }}>
                {VS_RITUS.map(r => (
                  <div key={r.name} style={{
                    textAlign: 'center', padding: '5px 2px',
                    border: vs.ritu?.name===r.name ? '1.5px solid #BA7517' : '0.5px solid var(--border)',
                    borderRadius: '6px',
                    background: vs.ritu?.name===r.name ? '#FAEEDA' : 'transparent',
                    boxShadow: vs.ritu?.name===r.name ? '0 0 10px rgba(186,117,23,0.1)' : 'none',
                  }}>
                    <div style={{ fontSize: '12px' }}>{r.icon}</div>
                    <div style={{ fontSize: '8px', fontWeight: 500, color: vs.ritu?.name===r.name ? '#BA7517' : 'var(--text-tertiary)' }}>
                      {r.name}
                    </div>
                  </div>
                ))}
              </div>
              {vs.festivals?.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {vs.festivals.slice(0,3).map(f => (
                    <span key={f} style={{ fontSize: '9px', padding: '2px 7px', borderRadius: '99px', border: '0.5px solid #BA751744', color: '#BA7517' }}>
                      {f}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── Today in History ── */}
        <div style={{ padding: '12px 14px', borderBottom: '1px solid var(--border)', minWidth: '220px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span style={{ fontSize: '11px', fontWeight: 600, padding: '2px 7px', borderRadius: '4px', background: '#FAEEDA', color: '#854F0B' }}>
              {fact.year}
            </span>
            <span style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>On This Day</span>
          </div>
          <p style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            {fact.fact.length > 100 ? fact.fact.slice(0,100)+'…' : fact.fact}
          </p>
        </div>

        {/* ── Footer ── */}
        <div style={{ padding: '8px 14px', textAlign: 'center', minWidth: '220px' }}>
          <span style={{ fontSize: '10px', color: 'var(--text-tertiary)', fontStyle: 'italic' }}>
            📖 View Full History →
          </span>
        </div>

      </div>

      {/* ── Keyframe & hover styles injected inline ── */}
      <style>{`
        .rightpanel-toggle-btn:hover {
          background: var(--accent-glow) !important;
          border-color: var(--accent) !important;
          color: var(--accent) !important;
        }
        .rightpanel-collapse-btn:hover {
          background: rgba(239,68,68,0.08) !important;
          border-color: rgba(239,68,68,0.3) !important;
          color: #ef4444 !important;
        }
      `}</style>
    </div>
  );
}
