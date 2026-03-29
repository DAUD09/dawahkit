import { useState } from 'react'

function TafsirPanel({ verseNumber }) {
  const [tafsir, setTafsir] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  async function handleToggle() {
    // If already open, just close it
    if (isOpen) {
      setIsOpen(false)
      return
    }

    // If we already fetched it, just open
    if (tafsir) {
      setIsOpen(true)
      return
    }

    // First time opening — fetch from API
    setIsLoading(true)
    try {
      const res = await fetch(
        `https://api.alquran.cloud/v1/ayah/${verseNumber}/en.maududi`
      )
      const data = await res.json()
      setTafsir(data.data?.text || 'No tafsir available for this verse.')
      setIsOpen(true)
    } catch {
      setTafsir('Could not load tafsir. Please try again.')
      setIsOpen(true)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      {/* Toggle button */}
      <button
        onClick={handleToggle}
        disabled={isLoading}
        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-glass hover:bg-navy-800/50 border border-glass-border text-gray-400 hover:text-white font-body text-xs font-medium transition-all duration-200 disabled:opacity-40"
      >
        {isLoading ? '⏳' : isOpen ? '▲ Tafsir' : '📖 Tafsir'}
      </button>

      {/* Tafsir content — only shown when open */}
      {isOpen && tafsir && (
        <div className="mt-4 p-4 rounded-xl bg-navy-800/40 border border-glass-border">
          <p className="font-body text-xs text-emerald-400 uppercase tracking-widest font-semibold mb-2">
            Tafsir — Maududi
          </p>
          <p className="font-body text-sm text-gray-300 leading-relaxed">
            {tafsir}
          </p>
        </div>
      )}
    </div>
  )
}

export default TafsirPanel