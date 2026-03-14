import '../styles/globals.css'
import { useEffect } from 'react'

export default function App({ 
  Component, pageProps 
}) {
  useEffect(() => {
    const saved = localStorage
      .getItem('aitdl_theme') || 'dark'
    document.documentElement
      .setAttribute('data-theme', saved)
  }, [])

  return <Component {...pageProps} />
}
