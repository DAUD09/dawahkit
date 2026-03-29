import { useState, useEffect } from 'react'
import { getSurahList } from '../utils/api'

function SurahBrowser({ onSelectSurah }) {
  const [surahs, setSurahs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState('')

  useEffect(() => {
    getSurahList()
      .then(data => setSurahs(data))
      .catch(() => setSurahs([]))
      .finally(() => setIsLoading(false))
  }, []) // empty array = run once when component first mounts

  const filtered = surahs.filter(s =>
    s.englishName.toLowerCase().includes(filter.toLowerCase()) ||
    s.name.includes(filter) ||
    String(s.number).includes(filter)
  )

  return (
    <div className="w-full max-w-2xl mt-12 mb-8">
      <p className="font-body text-xs text-gray-400 uppercase tracking-widest mb-4">
        ✦ Browse All 114 Surahs
      </p>

      {/* Filter input */}
      <input
        type="text"
        value={filter}
        onChange={e => setFilter(e.target.value)}
        placeholder="Filter by name or number…"
        className="w-full mb-4 px-4 py-2.5 rounded-xl border border-glass-border bg-white dark:bg-glass text-sm font-body text-gray-800 dark:text-gray-200 placeholder-gray-400 outline-none focus:border-gold-500/50 transition-all duration-200"
      />

      {isLoading ? (
        <p className="font-body text-sm text-gray-400 animate-pulse text-center py-8">
          Loading Surahs…
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-96 overflow-y-auto pr-1">
          {filtered.map(surah => (
            <button
              key={surah.number}
              onClick={() => onSelectSurah(surah.number, surah.englishName)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl border border-glass-border bg-white dark:bg-glass hover:border-gold-500/50 hover:bg-gold-500/5 transition-all duration-200 group text-left"
            >
              {/* Number badge */}
              <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-gold-500/10 border border-gold-500/20 flex items-center justify-center font-body text-xs font-bold text-gold-500">
                {surah.number}
              </span>

              <div className="flex-1 min-w-0">
                <span className="block font-body text-sm font-medium text-gray-800 dark:text-gray-200 group-hover:text-white truncate">
                  {surah.englishName}
                </span>
                <span className="block font-body text-xs text-gray-400 truncate">
                  {surah.englishNameTranslation} · {surah.numberOfAyahs} verses · {surah.revelationType}
                </span>
              </div>

              {/* Arabic name */}
              <span className="flex-shrink-0 font-display text-base text-gray-400 group-hover:text-gold-500 transition-colors">
                {surah.name}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default SurahBrowser