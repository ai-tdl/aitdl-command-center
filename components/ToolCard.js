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
  isSelected 
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

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      style={{
        background: 'var(--bg2)',
        border: tool.featured
          ? '1.5px solid var(--accent)'
          : '1px solid var(--border)',
        borderRadius: 16,
        padding: 24,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        transition: 'transform 0.3s var(--ease), box-shadow 0.3s var(--ease)',
        position: 'relative',
        overflow: 'hidden',
        animation: 'slide-up 0.4s var(--ease) forwards',
      }}
      className="premium-card"
    >
      {/* Spotlight Effect */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0,
        right: 0, bottom: 0,
        background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 107, 53, 0.08), transparent 80%)`,
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Top badges */}
      <div style={{
        display: 'flex',
        gap: 8,
        flexWrap: 'wrap',
        position: 'relative',
        zIndex: 1,
      }}>
        {tool.featured && (
          <span style={{
            fontSize: 10,
            padding: '4px 10px',
            borderRadius: 12,
            background: 'var(--accent)',
            color: '#fff',
            fontWeight: 700,
            letterSpacing: '0.02em',
          }}>FEATURED</span>
        )}
        {tool.verified && (
          <span style={{
            fontSize: 10,
            padding: '4px 10px',
            borderRadius: 12,
            background: 'rgba(34,197,94,0.1)',
            color: '#4ADE80',
            fontWeight: 600,
            border: '1px solid rgba(74, 222, 128, 0.2)',
          }}>✓ Verified</span>
        )}
        <span style={{
          fontSize: 10,
          padding: '4px 10px',
          borderRadius: 12,
          background: tool.pricing === 'free'
            ? 'rgba(34,197,94,0.1)'
            : tool.pricing === 'freemium'
            ? 'rgba(251,191,36,0.1)'
            : 'rgba(239,68,68,0.1)',
          color: tool.pricing === 'free'
            ? '#4ADE80'
            : tool.pricing === 'freemium'
            ? '#FBBF24'
            : '#F87171',
          fontWeight: 700,
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

      {/* Tool Info */}
      <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
        <div style={{ 
          marginBottom: 10,
          display: 'flex',
          alignItems: 'center',
          gap: 14
        }}>
          <span style={{ 
            fontSize: 32,
            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
          }}>{tool.emoji}</span>
          <h3 style={{ 
            fontSize: 20, 
            fontWeight: 800, 
            color: 'var(--text)',
            margin: 0,
            lineHeight: 1.2,
          }}>
            {tool.name}
          </h3>
        </div>
        <p style={{
          fontSize: 14,
          color: 'var(--text2)',
          lineHeight: 1.6,
          marginBottom: 20,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {tool.description}
        </p>
        
        {/* Category Tags */}
        <div style={{
          display: 'flex',
          gap: 8,
          flexWrap: 'wrap',
          marginBottom: 20,
        }}>
          {tool.category.slice(0, 3).map(cat => (
            <span key={cat} style={{
              fontSize: 11,
              padding: '3px 10px',
              borderRadius: 8,
              background: 'var(--bg3)',
              color: 'var(--text3)',
              fontWeight: 500,
              textTransform: 'capitalize',
              border: '1px solid var(--border)',
            }}>
              {cat}
            </span>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div style={{
        display: 'flex',
        gap: 12,
        marginTop: 'auto',
        position: 'relative',
        zIndex: 1,
      }}>
        <Link href={`/tools/${tool.slug}`}
          style={{
            flex: 1.5,
            padding: '10px',
            background: 'var(--bg3)',
            border: '1px solid var(--border)',
            borderRadius: 10,
            fontSize: 13,
            fontWeight: 600,
            color: 'var(--text)',
            textDecoration: 'none',
            textAlign: 'center',
            transition: 'all 0.2s var(--ease)',
          }} className="btn-secondary">
          Details →
        </Link>

        <button
          onClick={(e) => {
            e.stopPropagation()
            onCompare(tool)
          }}
          style={{
            flex: 1,
            padding: '10px 14px',
            background: isSelected 
              ? 'var(--accent)' 
              : 'transparent',
            border: `1px solid ${isSelected ? 'var(--accent)' : 'var(--border)'}`,
            borderRadius: 10,
            fontSize: 13,
            fontWeight: 600,
            color: isSelected ? '#fff' : 'var(--text2)',
            cursor: 'pointer',
            transition: 'all 0.2s var(--ease)',
          }}>
          {isSelected ? '✓ Added' : '+ Compare'}
        </button>
      </div>

      <style jsx>{`
        .premium-card:hover {
          transform: translateY(-4px) scale(1.01);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.6);
          border-color: rgba(255, 107, 53, 0.3);
        }
        .btn-secondary:hover {
          background: var(--bg2);
          border-color: var(--accent);
          color: var(--accent);
        }
      `}</style>
    </div>
  )
}
