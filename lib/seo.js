import { generateDefaultSeo, generateNextSeo } from 'next-seo/pages'

const SITE_URL = 'https://aitdl.com'
const SITE_NAME = 'AITDL'
const AUTHOR = 'Jawahar Ramkripal Mallah'
const TWITTER = '@aitdl'

const DEFAULT_SEO = {
  title: "AITDL — India's #1 AI Command Center",
  titleTemplate: "%s | AITDL",
  description: "100+ verified AI tools for Indian students. JEE, NEET, UPSC ke liye best free AI tools — ek jagah. Artificial Intelligence Technology & Deep Learning.",
  canonical: SITE_URL,
  additionalMetaTags: [
    {
      name: 'author',
      content: AUTHOR,
    },
    {
      name: 'keywords',
      content: 'AI tools India, free AI tools JEE NEET UPSC, Indian AI platform, Hindi AI tools, best AI tools students India, AITDL, artificial intelligence tools',
    },
    {
      name: 'theme-color',
      content: '#0A0A1F',
    },
    {
      name: 'application-name',
      content: SITE_NAME,
    },
  ],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    title: "AITDL — India's #1 AI Command Center",
    description: "100+ verified AI tools for Indian students. JEE, NEET, UPSC ke liye best free AI tools.",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'AITDL — India AI Command Center',
        type: 'image/png',
      },
    ],
    site_name: SITE_NAME,
  },
  twitter: {
    handle: TWITTER,
    site: TWITTER,
    cardType: 'summary_large_image',
  },
}

export const GlobalSEO = () => generateDefaultSeo(DEFAULT_SEO)

export const PageSEO = ({ 
  title, 
  description, 
  slug,
  image 
}) => generateNextSeo({
    title,
    description,
    canonical: `${SITE_URL}${slug}`,
    openGraph: {
      url: `${SITE_URL}${slug}`,
      title,
      description,
      images: image ? [{
        url: image,
        width: 1200,
        height: 630,
        alt: title,
      }] : undefined,
    },
})

export const ToolSEO = ({ tool }) => generateNextSeo({
    title: `${tool.name} — Free AI Tool`,
    description: `${tool.description} India Score: ${tool.india_score}/5. ${tool.pricing} tool for Indian students. Best for: ${tool.exam_tags.join(', ')}.`,
    canonical: `${SITE_URL}/tools/${tool.slug}`,
    openGraph: {
      url: `${SITE_URL}/tools/${tool.slug}`,
      title: tool.name,
      description: tool.description,
      images: [{
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: tool.name,
      }],
    },
})
