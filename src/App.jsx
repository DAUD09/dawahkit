import { useState, useEffect } from 'react'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import VerseCard from './components/VerseCard'
import PopularVerses from './components/PopularVerses'
import SurahBrowser from './components/SurahBrowser'
import {
  parseSearchQuery,
  searchVerses,
  searchArabic,
  getVerseByRef,
  getVerseRange,
  getSurahVerses,
} from './utils/api'

function App() {
  const [darkMode, setDarkMode] = useState(true)
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [hasSearched, setHasSearched] = useState(false)
  const [searchLabel, setSearchLabel] = useState('')

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  function toggleDarkMode() {
    setDarkMode(prev => !prev)
  }

  function goHome() {
    setHasSearched(false)
    setResults([])
    setError(null)
    setSearchLabel('')
  }

  async function handleSearch(rawQuery) {
    setIsLoading(true)
    setError(null)
    setHasSearched(true)

    const parsed = parseSearchQuery(rawQuery)
    let label = ''

    try {
      let verses = []

      
      if (parsed.type === 'arabic') {
        label = `"${parsed.query}"`
        verses = await searchArabic(parsed.query)

      } else if (parsed.type === 'verse') {
        label = `Verse ${parsed.surah}:${parsed.ayah}`
        verses = await getVerseByRef(parsed.surah, parsed.ayah)

      } else if (parsed.type === 'range') {
        label = `Verses ${parsed.surah}:${parsed.from}–${parsed.to}`
        verses = await getVerseRange(parsed.surah, parsed.from, parsed.to)

      } else {
        label = `"${rawQuery}"`
        verses = await searchVerses(rawQuery)
      }

      setResults(verses)
      setSearchLabel(label)

    } catch (err) {
      setError('Something went wrong. Please check your connection and try again.')
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSurahSelect(surahNumber, surahName) {
    setIsLoading(true)
    setError(null)
    setHasSearched(true)
    setSearchLabel(`Surah ${surahNumber} — ${surahName}`)
    setResults([])

    try {
      const verses = await getSurahVerses(surahNumber)
      setResults(verses)
    } catch (err) {
      setError('Could not load this Surah. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-navy-950 font-body">

      {/* Background pattern */}
      <div
        className="fixed inset-0 opacity-[0.03] dark:opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='1'%3E%3Cpath d='M30 0l8.66 5v10L30 20l-8.66-5V5L30 0zm0 40l8.66 5v10L30 60l-8.66-5V45L30 40z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} onGoHome={goHome} showHome={hasSearched} />

      <main className="relative z-10 flex flex-col items-center px-6 pt-10 pb-20">

        {/* ── HOME VIEW ── */}
        {!hasSearched && (
          <>
            <div className="text-center mb-10">
              <h1 className="font-display text-4xl md:text-6xl font-bold text-navy-900 dark:text-white leading-tight">
                Find the Right Verse,<br />
                <span className="text-gold-500">Share It Beautifully.</span>
              </h1>
              <p className="font-body mt-6 max-w-xl text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Search by keyword, topic, or verse reference (e.g. <span className="text-gold-500 font-medium">2:286</span>). Or browse all 114 Surahs below.
              </p>
            </div>

            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
            <PopularVerses onSelect={handleSearch} />
            <SurahBrowser onSelectSurah={handleSurahSelect} />
          </>
        )}

        {/* ── RESULTS VIEW ── */}
        {hasSearched && (
          <div className="w-full max-w-2xl">

            <SearchBar onSearch={handleSearch} isLoading={isLoading} />

            {/* Loading */}
            {isLoading && (
              <div className="text-center py-16">
                <p className="font-display text-4xl mb-4">🌙</p>
                <p className="font-body text-gray-400 animate-pulse">Loading verses…</p>
              </div>
            )}

            {/* Error */}
            {error && !isLoading && (
              <div className="text-center py-10 px-6 rounded-2xl border border-red-500/20 bg-red-500/5 mt-8">
                <p className="font-body text-red-400">{error}</p>
              </div>
            )}

            {/* Empty */}
            {!isLoading && !error && results.length === 0 && (
              <div className="text-center py-16">
                <p className="font-display text-4xl mb-4">📭</p>
                <p className="font-body text-gray-400">
                  No verses found for <span className="text-gold-500">{searchLabel}</span>. Try a different keyword.
                </p>
              </div>
            )}

            {/* Results count */}
            {results.length > 0 && !isLoading && (
              <p className="font-body text-sm text-gray-400 mt-8 mb-6">
                <span className="text-gold-500 font-semibold">{results.length}</span> verse{results.length !== 1 ? 's' : ''} — {searchLabel}
              </p>
            )}

            {/* Cards */}
            <div className="flex flex-col gap-6">
              {results.map((verse, index) => (
                <VerseCard key={`${verse.number}-${index}`} verse={verse} index={index} />
              ))}
            </div>

          </div>
        )}

      </main>
    </div>
  )
}

export default App