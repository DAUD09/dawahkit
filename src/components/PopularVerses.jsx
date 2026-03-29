const POPULAR_VERSES = [
  { ref: '1:1',   label: 'Al-Fatiha 1:1',     desc: 'The Opening — recited in every prayer' },
  { ref: '2:255', label: 'Al-Baqara 2:255',    desc: 'Ayatul Kursi — The Throne Verse' },
  { ref: '2:286', label: 'Al-Baqara 2:286',    desc: 'No soul is burdened beyond capacity' },
  { ref: '3:185', label: 'Ali\'Imran 3:185',   desc: 'Every soul shall taste death' },
  { ref: '49:13', label: 'Al-Hujurat 49:13',   desc: 'We created you from male and female' },
  { ref: '39:53', label: 'Az-Zumar 39:53',     desc: 'Do not despair of God\'s mercy' },
  { ref: '94:5',  label: 'Al-Inshirah 94:5',   desc: 'With every hardship comes ease' },
  { ref: '112:1', label: 'Al-Ikhlas 112:1',    desc: 'Say: He is God, the One' },
]

function PopularVerses({ onSelect }) {
  return (
    <div className="w-full max-w-2xl mt-12">
      <p className="font-body text-xs text-gray-400 uppercase tracking-widest mb-4">
        ✦ Popular Verses
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {POPULAR_VERSES.map((item) => (
          <button
            key={item.ref}
            onClick={() => onSelect(item.ref)}
            className="text-left px-4 py-3 rounded-xl border border-glass-border bg-white dark:bg-glass backdrop-blur-sm hover:border-gold-500/50 hover:bg-gold-500/5 transition-all duration-200 group"
          >
            <span className="block font-body text-xs font-semibold text-gold-500 group-hover:text-gold-400 mb-0.5">
              {item.label}
            </span>
            <span className="block font-body text-xs text-gray-400 group-hover:text-gray-300">
              {item.desc}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default PopularVerses