import { useRef } from 'react'
import html2canvas from 'html2canvas'

function ShareCard({ verse }) {
  const cardRef = useRef(null)

  const reference = `${verse.surah.englishName} ${verse.surah.number}:${verse.numberInSurah}`

  async function handleDownload() {
    if (!cardRef.current) return

    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,           // 2x resolution — sharp on mobile screens
        useCORS: true,      // allow external fonts/images
        backgroundColor: null,
      })

      const link = document.createElement('a')
      link.download = `dawahkit-${verse.surah.number}-${verse.numberInSurah}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (err) {
      console.error('Share card generation failed:', err)
    }
  }

  return (
    <div>
      {/* The hidden card that gets photographed */}
      <div
        ref={cardRef}
        style={{
          position: 'absolute',
          left: '-9999px',
          top: '-9999px',
          width: '600px',
          padding: '48px',
          background: 'linear-gradient(135deg, #070D1A 0%, #0F172A 50%, #1a1f35 100%)',
          borderRadius: '24px',
          fontFamily: 'Amiri, serif',
        }}
      >
        {/* Top accent line */}
        <div style={{
          width: '48px',
          height: '3px',
          background: '#D4AF37',
          marginBottom: '32px',
          borderRadius: '2px',
        }} />

        {/* Arabic text */}
        {verse.arabic && (
          <p style={{
            direction: 'rtl',
            fontSize: '28px',
            color: '#FFFFFF',
            lineHeight: '2',
            marginBottom: '32px',
            textAlign: 'right',
          }}>
            {verse.arabic}
          </p>
        )}

        {/* Divider */}
        <div style={{
          width: '100%',
          height: '1px',
          background: 'rgba(212,175,55,0.2)',
          marginBottom: '28px',
        }} />

        {/* English translation */}
        <p style={{
          fontSize: '16px',
          color: '#CBD5E1',
          lineHeight: '1.8',
          fontStyle: 'italic',
          marginBottom: '32px',
          fontFamily: 'DM Sans, sans-serif',
        }}>
          "{verse.text}"
        </p>

        {/* Reference */}
        <p style={{
          fontSize: '13px',
          color: '#D4AF37',
          fontFamily: 'DM Sans, sans-serif',
          fontWeight: '600',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginBottom: '8px',
        }}>
          — {reference}
        </p>

        {/* Watermark */}
        <p style={{
          fontSize: '11px',
          color: 'rgba(255,255,255,0.25)',
          fontFamily: 'DM Sans, sans-serif',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
        }}>
          ☽ DawahKit
        </p>
      </div>

      {/* The visible button the user clicks */}
      <button
        onClick={handleDownload}
        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gold-500/10 hover:bg-gold-500/20 border border-gold-500/30 text-gold-500 font-body text-xs font-medium transition-all duration-200"
      >
        🖼️ Share Card
      </button>
    </div>
  )
}

export default ShareCard