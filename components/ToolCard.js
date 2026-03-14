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

export default function ToolCard({ 
  tool, 
  onCompare, 
  isSelected 
}) {
  return (
    <div style={{
      background: 'var(--bg2)',
      border: tool.featured
        ? '1px solid var(--accent)'
        : '0.5px solid var(--border)',
      borderRadius: 16,
      padding: 20,
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      transition: 'all 0.2s ease',
      animation: 'fadeIn 0.3s ease',
      cursor: 'pointer',
    }}>
      {/* Top badges */}
      <div style={{
        display: 'flex',
        gap: 6,
        flexWrap: 'wrap',
      }}>
        {tool.featured && (
          <span style={{
            fontSize: 10,
            padding: '2px 8px',
            borderRadius: 10,
            background: 'rgba(255,107,53,0.15)',
            color: 'var(--accent)',
            fontWeight: 600,
          }}>FEATURED</span>
        )}
        {tool.verified && (
          <span style={{
            fontSize: 10,
            padding: '2px 8px',
            borderRadius: 10,
            background: 'rgba(34,197,94,0.15)',
            color: '#22C55E',
            fontWeight: 600,
          }}>✓ Verified</span>
        )}
        <span style={{
          fontSize: 10,
          padding: '2px 8px',
          borderRadius: 10,
          background: tool.pricing === 'free'
            ? 'rgba(34,197,94,0.15)'
            : tool.pricing === 'freemium'
            ? 'rgba(251,191,36,0.15)'
            : 'rgba(239,68,68,0.15)',
          color: tool.pricing === 'free'
            ? '#22C55E'
            : tool.pricing === 'freemium'
            ? '#FBBF24'
            : '#EF4444',
          fontWeight: 600,
          textTransform: 'uppercase',
        }}>
          {tool.pricing}
        </span>
        {tool.hindi_support && (
          <span style={{
            fontSize: 10,
            padding: '2px 8px',
            borderRadius: 10,
            background: 'rgba(99,102,241,0.15)',
            color: '#818CF8',
            fontWeight: 600,
          }}>हिंदी</span>
        )}
      </div>
      {/* Tool Info */}
      <div style={{ flex: 1 }}>
        <div style={{ 
          fontSize: 24, 
          marginBottom: 8,
          display: 'flex',
          alignItems: 'center',
          gap: 12
        }}>
          <span>{tool.emoji}</span>
          <h3 style={{ 
            fontSize: 18, 
            fontWeight: 700, 
            color: 'var(--text)',
            margin: 0
          }}>
            {tool.name}
          </h3>
        </div>
        <p style={{
          fontSize: 13,
          color: 'var(--text2)',
          lineHeight: 1.5,
          marginBottom: 16,
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
          gap: 6,
          flexWrap: 'wrap',
          marginBottom: 16,
        }}>
          {tool.category.slice(0, 3).map(cat => (
            <span key={cat} style={{
              fontSize: 10,
              padding: '2px 8px',
              borderRadius: 4,
              background: 'rgba(255,255,255,0.05)',
              color: 'var(--text3)',
              textTransform: 'capitalize',
              border: '0.5px solid var(--border)',
            }}>
              {cat}
            </span>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div style={{
        display: 'flex',
        gap: 8,
        marginTop: 'auto',
      }}>
        <Link href={`/tools/${tool.slug}`}
          style={{
            flex: 1,
            padding: '8px',
            background: 'var(--bg3)',
            border: '0.5px solid var(--border)',
            borderRadius: 8,
            fontSize: 12,
            color: 'var(--text2)',
            textDecoration: 'none',
            textAlign: 'center',
          }}>
          Details →
        </Link>

        <button
          onClick={() => onCompare(tool)}
          style={{
            padding: '8px 12px',
            background: isSelected 
              ? 'rgba(255,107,53,0.2)' 
              : 'var(--bg3)',
            border: isSelected
              ? '0.5px solid var(--accent)'
              : '0.5px solid var(--border)',
            borderRadius: 8,
            fontSize: 12,
            color: isSelected 
              ? 'var(--accent)' 
              : 'var(--text2)',
            cursor: 'pointer',
          }}>
          {isSelected ? '✓ Added' : '+ Compare'}
        </button>
      </div>
    </div>
  )
}
