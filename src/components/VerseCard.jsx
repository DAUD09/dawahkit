import ShareCard from './ShareCard'
import TafsirPanel from './TafsirPanel'

function VerseCard({ verse, index }) {
  const reference = `${verse.surah.englishName} ${verse.surah.number}:${verse.numberInSurah}`
  const translation = verse.surah.englishNameTranslation

  return (
    <div className="verse-card-enter group relative w-full rounded-2xl border border-glass-border bg-white dark:bg-glass backdrop-blur-md p-6 md:p-8 shadow-md hover:shadow-gold-500/10 hover:border-gold-500/40 transition-all duration-300 hover:-translate-y-1" 
      style={{ animationDelay: `${index * 80}ms` }}>

      {/* Reference badge */}
      <div className="inline-flex items-center gap-2 mb-5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30">
        <span className="text-gold-500 font-body font-semibold text-xs tracking-wide uppercase">
          {reference}
        </span>
        <span className="text-gray-400 font-body text-xs">
          · {translation}
        </span>
      </div>

      {/* Arabic text */}
      {verse.arabic && (
        <p
          dir="rtl"
          lang="ar"
          className="font-display text-2xl md:text-3xl text-right text-navy-900 dark:text-white leading-loose mb-6"
        >
          {verse.arabic}
        </p>
      )}

      {/* Divider */}
      <div className="w-12 h-px bg-gold-500/40 mb-5" />

      {/* English translation */}
      <p className="font-body text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed italic">
        "{verse.text}"
      </p>

      {/* Edition credit */}
      <p className="mt-4 font-body text-xs text-gray-400">
        Translation: Muhammad Asad
      </p>

      {/* Tafsir panel */}
      <div className="mt-4">
        <TafsirPanel verseNumber={verse.number} />
      </div>

      {/* Action buttons */}
      <div className="mt-4 flex items-center gap-3">
        <ShareCard verse={verse} />
      </div>

    </div>
  )
}

export default VerseCard