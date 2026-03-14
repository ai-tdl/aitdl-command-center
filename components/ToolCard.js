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
      borderRadius: 'var(--radius)',
      padding: 20,
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      transition: 'transform 0.2s ease',
      cursor: 'pointer',
      animation: 'fadeIn 0.3s ease',
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

      {/* Tool info */}
      <div style={{
        display: 'flex',
        gap: 12,
        alignItems: 'flex-start',
      }}>
        <div style={{ fontSize: 32 }}>
          {tool.emoji}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{
            fontSize: 16,
            fontWeight: 700,
            color: 'var(--text)',
            marginBottom: 4,
          }}>
            {tool.name}
          </div>
          <div style={{
            fontSize: 12,
            color: 'var(--text2)',
            lineHeight: 1.5,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {tool.description}
          </div>
        </div>
      </div>

      {/* India Score */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        fontSize: 12,
        color: 'var(--text3)',
      }}>
        <span>{'⭐'.repeat(tool.india_score)}</span>
        <span>India {tool.india_score}/5</span>
      </div>

      {/* Exam tags */}
      {tool.exam_tags?.length > 0 && (
        <div style={{
          display: 'flex',
          gap: 6,
          flexWrap: 'wrap',
        }}>
          {tool.exam_tags.map(tag => (
            <span key={tag} style={{
              fontSize: 10,
              padding: '2px 8px',
              borderRadius: 8,
              background: 'var(--bg3)',
              color: 'var(--text3)',
              border: '0.5px solid var(--border)',
            }}>
              {tag}
            </span>
          ))}
        </div>
      )}

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
