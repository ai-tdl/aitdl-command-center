export const HomeJsonLD = ({ toolCount }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "AITDL",
        "url": "https://aitdl.com",
        "description": "India's #1 AI Tools Platform",
        "author": {
          "@type": "Person",
          "name": "Jawahar Ramkripal Mallah",
          "jobTitle": "Software Developer & Published Author",
          "url": "https://aitdl.com/about"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": 
              "https://aitdl.com/?q={search_term}"
          },
          "query-input": 
            "required name=search_term"
        }
      })
    }}
  />
)

export const ToolJsonLD = ({ tool }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": tool.name,
        "description": tool.description,
        "url": tool.url,
        "applicationCategory": 
          "EducationalApplication",
        "operatingSystem": "Web, Android, iOS",
        "offers": {
          "@type": "Offer",
          "price": tool.pricing === 'free' 
            ? "0" : "varies",
          "priceCurrency": "INR"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": tool.india_score,
          "bestRating": "5",
          "worstRating": "1",
          "ratingCount": "100"
        },
        "author": {
          "@type": "Person",
          "name": "Jawahar Ramkripal Mallah"
        }
      })
    }}
  />
)
