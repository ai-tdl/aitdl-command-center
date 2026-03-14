/**
 * ============================================
 * AITDL — India's AI Command Center
 * ============================================
 * @author    Jawahar Ramkripal Mallah
 * @role      Software Developer & Service 
 *            Provider since 2007
 *            Published Author | Tech Entrepreneur
 * @website   https://aitdl.com
 * @email     hello@aitdl.com
 * @copyright © 2025 All Rights Reserved
 * ============================================
 * @books
 * - When Code Learned to Feel:
 *   The Day Code Took a Breath (Kindle)
 * - Code Without Limits:
 *   The End of Human Coding (Upcoming)
 * - Gaṇitsūtram:
 *   Golden Book of Vedic Mathematics (Upcoming)
 * ============================================
 */

import Link from 'next/link'
import { useState, useRef } from 'react'

export default function ToolCard({ 
  tool, 
  onCompare, 
  isSelected,
  viewMode = 'grid'
}) {
  const cardRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  const isList = viewMode === 'list'

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      style={{
        borderRadius: 20,
        padding: 'var(--card-padding)',
        display: 'flex',
        flexDirection: isList ? 'row' : 'column',
        alignItems: isList ? 'center' : 'stretch',
        gap: 'var(--card-gap, 24px)',
        transition: 'all 0.4s var(--ease)',
        position: 'relative',
        overflow: 'hidden',
        animation: 'slide-up 0.5s var(--ease) forwards',
        border: tool.featured ? '1.5px solid var(--accent)' : '1px solid var(--border)',
      }}
      className="premium-glass-card"
    >
      {/* Spotlight Effect */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0,
        right: 0, bottom: 0,
        background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, var(--accent-glow), transparent 70%)`,
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0,
        transition: 'opacity 0.4s ease',
      }} className="spotlight" />

      {/* Top badges */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: '100%',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {tool.featured && (
            <span style={{
              fontSize: 10,
              padding: '5px 12px',
              borderRadius: 30,
              background: 'var(--accent)',
              color: '#fff',
              fontWeight: 800,
              letterSpacing: '0.05em',
              boxShadow: '0 4px 12px var(--accent-glow)',
            }}>FEATURED</span>
          )}
          <span style={{
            fontSize: 10,
            padding: '5px 12px',
            borderRadius: 30,
            background: tool.pricing === 'free'
              ? 'rgba(34,197,94,0.08)'
              : tool.pricing === 'freemium'
              ? 'rgba(251,191,36,0.08)'
              : 'rgba(239,68,68,0.08)',
            color: tool.pricing === 'free'
              ? '#4ADE80'
              : tool.pricing === 'freemium'
              ? '#FBBF24'
              : '#F87171',
            fontWeight: 800,
            textTransform: 'uppercase',
            border: `1px solid ${
              tool.pricing === 'free' ? 'rgba(74, 222, 128, 0.2)' 
              : tool.pricing === 'freemium' ? 'rgba(251, 191, 36, 0.2)' 
              : 'rgba(248, 113, 113, 0.2)'
            }`,
          }}>
            {tool.pricing}
          </span>
        </div>
        {tool.verified && (
          <span style={{
            width: 20, height: 20,
            borderRadius: '50%',
            background: '#4ADE80',
            color: '#030306',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 10,
            fontWeight: 900,
          }} title="Verified Tool">✓</span>
        )}
      </div>

      {/* Tool Info */}
      <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
        <div style={{ 
          marginBottom: 16,
          display: 'flex',
          alignItems: 'center',
          gap: 16
        }}>
          <div style={{ 
            fontSize: 42,
            filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.5))',
            background: 'rgba(255,255,255,0.03)',
            padding: 12,
            borderRadius: 16,
            border: '1px solid rgba(255,255,255,0.05)',
            transition: 'all 0.3s ease',
          }} className="emoji-box">{tool.emoji}</div>
          <h3 style={{ 
            fontSize: 22, 
            fontWeight: 900, 
            color: 'var(--text)',
            margin: 0,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}>
            {tool.name}
          </h3>
        </div>
        <p style={{
          fontSize: 15,
          color: 'var(--text2)',
          lineHeight: 1.7,
          marginBottom: 24,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          fontWeight: 500,
        }}>
          {tool.description}
        </p>
        
        {/* Category Tags */}
        <div style={{
          display: 'flex',
          gap: 8,
          flexWrap: 'wrap',
          marginBottom: 24,
        }}>
          {tool.category.slice(0, 3).map(cat => (
            <span key={cat} style={{
              fontSize: 11,
              padding: '4px 14px',
              borderRadius: 12,
              background: 'rgba(255,255,255,0.03)',
              color: 'var(--text3)',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              border: '1px solid rgba(255,255,255,0.05)',
            }}>
              {cat}
            </span>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div style={{
        display: 'flex',
        gap: 16,
        marginTop: 'auto',
        position: 'relative',
        zIndex: 1,
      }}>
        <Link href={`/tools/${tool.slug}`}
          style={{
            flex: 1.5,
            padding: '14px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 14,
            fontSize: 14,
            fontWeight: 800,
            color: 'var(--text)',
            textDecoration: 'none',
            textAlign: 'center',
            transition: 'all 0.3s var(--ease)',
          }} className="btn-details">
          View Concept →
        </Link>

        <button
          onClick={(e) => {
            e.stopPropagation()
            onCompare(tool)
          }}
          style={{
            flex: 1,
            padding: '14px',
            background: isSelected 
              ? 'var(--accent)' 
              : 'transparent',
            border: `1px solid ${isSelected ? 'var(--accent)' : 'rgba(255,255,255,0.1)'}`,
            borderRadius: 14,
            fontSize: 13,
            fontWeight: 800,
            color: isSelected ? '#fff' : 'var(--text2)',
            cursor: 'pointer',
            transition: 'all 0.3s var(--ease)',
          }}>
          {isSelected ? '✓ Ready' : 'Compare'}
        </button>
      </div>

      <style jsx>{`
        .premium-glass-card:hover {
          transform: translateY(-8px) scale(1.02);
          border-color: var(--accent) !important;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6), 0 0 20px var(--accent-glow);
        }
        .premium-glass-card:hover .spotlight {
          opacity: 1 !important;
        }
        .premium-glass-card:hover .emoji-box {
          background: var(--accent-glow);
          border-color: var(--accent);
          transform: scale(1.1) rotate(5deg);
        }
        .btn-details:hover {
          background: rgba(255,255,255,0.08);
          border-color: var(--accent);
          color: var(--accent);
        }
      `}</style>
    </div>
  )
}
