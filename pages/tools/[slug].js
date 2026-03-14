import Head from 'next/head'
import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ToolCard from '../../components/ToolCard'
import { useState } from 'react'

export default function ToolPage({ 
  tool, similarTools 
}) {
  const [lang, setLang] = useState('en')

  if (!tool) return (
    <div style={{
      textAlign: 'center',
      padding: 60,
      color: 'var(--text2)',
    }}>
      <h2>Tool not found</h2>
      <Link href="/">← Back to home</Link>
    </div>
  )

  return (
    <>
      <Head>
        <title>
          {tool.name} — Free AI Tool | AITDL
        </title>
        <meta name="description"
          content={`${tool.description} 
          India Score: ${tool.india_score}/5. 
          ${tool.pricing}. Best for 
          Indian students.`}
        />
        <link rel="canonical"
          href={`https://aitdl.com/tools/${tool.slug}`}
        />
      </Head>

      <Header lang={lang} setLang={setLang}/>

      <main style={{
        maxWidth: 800,
        margin: '0 auto',
        padding: '32px 16px',
      }}>
        {/* Back */}
        <Link href="/" style={{
          fontSize: 13,
          color: 'var(--text3)',
          textDecoration: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          marginBottom: 24,
        }}>
          ← All Tools
        </Link>

        {/* Tool hero */}
        <div style={{
          background: 'var(--bg2)',
          border: '0.5px solid var(--border)',
          borderRadius: 16,
          padding: 32,
          marginBottom: 24,
        }}>
          <div style={{
            display: 'flex',
            gap: 20,
            alignItems: 'flex-start',
            marginBottom: 20,
          }}>
            <div style={{ fontSize: 48 }}>
              {tool.emoji}
            </div>
            <div>
              <h1 style={{
                fontSize: 28,
                fontWeight: 800,
                color: 'var(--text)',
                marginBottom: 8,
              }}>
                {tool.name}
              </h1>
              <div style={{
                display: 'flex',
                gap: 8,
                flexWrap: 'wrap',
              }}>
                <span style={{
                  fontSize: 12,
                  padding: '3px 10px',
                  borderRadius: 10,
                  background: tool.pricing === 'free'
                    ? 'rgba(34,197,94,0.15)'
                    : 'rgba(251,191,36,0.15)',
                  color: tool.pricing === 'free'
                    ? '#22C55E' : '#FBBF24',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                }}>
                  {tool.pricing}
                </span>
                <span style={{
                  fontSize: 12,
                  padding: '3px 10px',
                  borderRadius: 10,
                  background: 'rgba(255,107,53,0.15)',
                  color: 'var(--accent)',
                  fontWeight: 600,
                }}>
                  India {tool.india_score}/5 ⭐
                </span>
                {tool.hindi_support && (
                  <span style={{
                    fontSize: 12,
                    padding: '3px 10px',
                    borderRadius: 10,
                    background: 'rgba(99,102,241,0.15)',
                    color: '#818CF8',
                    fontWeight: 600,
                  }}>
                    हिंदी Support
                  </span>
                )}
              </div>
            </div>
          </div>

          <p style={{
            fontSize: 15,
            color: 'var(--text2)',
            lineHeight: 1.7,
            marginBottom: 20,
          }}>
            {tool.description}
          </p>

          {/* Exam tags */}
          {tool.exam_tags?.length > 0 && (
            <div style={{
              display: 'flex',
              gap: 8,
              flexWrap: 'wrap',
              marginBottom: 24,
            }}>
              {tool.exam_tags.map(tag => (
                <span key={tag} style={{
                  fontSize: 12,
                  padding: '4px 12px',
                  borderRadius: 8,
                  background: 'var(--bg3)',
                  color: 'var(--text2)',
                  border: '0.5px solid var(--border)',
                }}>
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Visit button */}
          <a href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              padding: '12px 28px',
              background: 'var(--accent)',
              color: '#fff',
              borderRadius: 10,
              textDecoration: 'none',
              fontSize: 15,
              fontWeight: 700,
            }}>
            Visit {tool.name} →
          </a>
        </div>

        {/* Similar tools */}
        {similarTools?.length > 0 && (
          <div>
            <h2 style={{
              fontSize: 18,
              fontWeight: 600,
              color: 'var(--text)',
              marginBottom: 16,
            }}>
              Similar Tools
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 
                'repeat(auto-fill, minmax(250px, 1fr))',
              gap: 16,
            }}>
              {similarTools.map(t => (
                <ToolCard
                  key={t.id}
                  tool={t}
                  onCompare={() => {}}
                  isSelected={false}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer/>
    </>
  )
}

export async function getStaticPaths() {
  const data = require('../../data/tools.json')
  const tools = data.tools || data
  return {
    paths: tools.map(t => ({
      params: { slug: t.slug }
    })),
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const data = require('../../data/tools.json')
  const tools = data.tools || data
  const tool = tools.find(
    t => t.slug === params.slug
  )
  if (!tool) return { notFound: true }
  const similarTools = tools
    .filter(t =>
      t.category.some(c =>
        tool.category.includes(c)
      ) && t.slug !== tool.slug
    )
    .slice(0, 3)
  return { props: { tool, similarTools } }
}
