import Head from 'next/head';
import Link from 'next/link';

export default function AboutFounder() {
  return (
    <>
      <Head>
        <title>About Founder — Jawahar Ramkripal Mallah | AITDL</title>
        <meta name="description" content="Meet Jawahar Ramkripal Mallah — Software Developer & Service Provider since 2007, Published Author, and Founder of AITDL — India's #1 AI Tools Discovery Platform." />
        <link rel="canonical" href="https://aitdl.com/about-founder/" />
      </Head>

      <main className="min-h-screen max-w-2xl mx-auto px-4 py-12">

        {/* Back link */}
        <Link href="/" className="text-xs text-gray-400 hover:text-gray-600 transition-colors mb-8 inline-flex items-center gap-1">
          ← Back to AITDL
        </Link>

        {/* Header */}
        <div className="mt-6 mb-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-2xl font-bold text-amber-700 flex-shrink-0">
              JM
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Jawahar Ramkripal Mallah
              </h1>
              <p className="text-sm text-amber-600 mt-0.5">
                Founder, AITDL
              </p>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            {[
              '🇮🇳 Made in Bharat',
              '💻 Developer since 2007',
              '📚 Published Author',
              '⚡ System Architect',
            ].map(b => (
              <span key={b} className="text-xs px-3 py-1 rounded-full border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20">
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 dark:border-gray-800 mb-8" />

        {/* About */}
        <section className="mb-8">
          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-4">
            About
          </h2>
          <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>
              Jawahar Ramkripal Mallah is a Software Developer & Service Provider based in India with over 17 years of experience building digital products and services.
            </p>
            <p>
              A Published Author and system architect, he built AITDL — India's #1 AI Tools Discovery Platform — to help 1.4 billion Indians find the right AI tool at the right time, completely free and without signup.
            </p>
            <p>
              AITDL was designed, built, and deployed entirely by Jawahar — solo — from infrastructure to CI/CD pipeline to frontend design, using modern AI-assisted development.
            </p>
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-gray-100 dark:border-gray-800 mb-8" />

        {/* AITDL Mission */}
        <section className="mb-8">
          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-4">
            The AITDL Mission
          </h2>
          <div className="border-l-2 border-amber-400 pl-4 space-y-3">
            {[
              { icon: '🎯', text: 'Right AI Tool At The Right Time — for every Indian student and professional' },
              { icon: '🆓', text: '100% Free. No signup required. No barriers.' },
              { icon: '🇮🇳', text: 'India-first — built for JEE, NEET, UPSC, and every Indian exam and use case' },
              { icon: '✓', text: 'AITDL Verified — every tool manually checked before listing' },
            ].map((item, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="text-base flex-shrink-0 mt-0.5" style={{ fontSize: '15px' }}>
                  {item.icon}
                </span>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-gray-100 dark:border-gray-800 mb-8" />

        {/* What was built */}
        <section className="mb-8">
          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-4">
            AITDL v1.0 — Built Solo
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { num: '100+', label: 'Verified AI tools' },
              { num: '5', label: 'Development sprints' },
              { num: '3', label: 'Live environments' },
              { num: '0', label: 'Servers needed' },
              { num: '17+', label: 'Years experience' },
              { num: '∞', label: 'For Bharat 🇮🇳' },
            ].map((s, i) => (
              <div key={i} className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 border border-gray-100 dark:border-gray-800">
                <div className="text-xl font-bold text-amber-500 mb-0.5">
                  {s.num}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-gray-100 dark:border-gray-800 mb-8" />

        {/* Tech Stack */}
        <section className="mb-8">
          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-4">
            Built With
          </h2>
          <div className="flex flex-wrap gap-2">
            {[
              'Next.js', 'React', 'Tailwind CSS', 'GitHub Pages',
              'GitHub Actions', 'Firebase', 'Vercel Analytics', 'TypeScript',
            ].map(t => (
              <span key={t} className="text-xs px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800">
                {t}
              </span>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-gray-100 dark:border-gray-800 mb-8" />

        {/* Contact */}
        <section className="mb-10">
          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-4">
            Connect
          </h2>
          <a href="mailto:hello@aitdl.com" className="inline-flex items-center gap-2 text-sm text-amber-600 hover:text-amber-700 transition-colors">
            ✉ hello@aitdl.com
          </a>
        </section>

        {/* Footer of page */}
        <div className="border-t border-gray-100 dark:border-gray-800 pt-6 text-center">
          <p className="text-xs text-gray-400">
            Built with ❤️ for Bharat
          </p>
          <p className="text-xs text-gray-400 mt-1">
            © 2026 AITDL — Empowering 1.4 Billion minds
          </p>
        </div>

      </main>
    </>
  );
}
