const BASE_URL = 'https://api.alquran.cloud/v1'

// ─── Smart Query Parser ───────────────────────────────────────────
// Looks at what the user typed and decides which kind of search it is

export function parseSearchQuery(query) {
  const q = query.trim()

  // Pattern: "2:286" or "2 : 286"
  const verseRef = q.match(/^(\d{1,3})\s*:\s*(\d{1,3})$/)
  if (verseRef) return { type: 'verse', surah: verseRef[1], ayah: verseRef[2] }

  // Pattern: "2:1-7" or "2:1 to 7"
  const verseRange = q.match(/^(\d{1,3})\s*:\s*(\d{1,3})\s*(?:-|to)\s*(\d{1,3})$/i)
  if (verseRange) return { type: 'range', surah: verseRange[1], from: verseRange[2], to: verseRange[3] }

  // Default: keyword search
  return { type: 'keyword', query: q }
}

// ─── Keyword Search ───────────────────────────────────────────────
export async function searchVerses(keyword) {
  const searchRes = await fetch(`${BASE_URL}/search/${keyword}/all/en.asad`)
  const searchData = await searchRes.json()

  if (!searchData.data || !searchData.data.matches) return []

  const matches = searchData.data.matches.slice(0, 12)

  const arabicResponses = await Promise.all(
    matches.map(m =>
      fetch(`${BASE_URL}/ayah/${m.number}/quran-uthmani`).then(r => r.json())
    )
  )

  return matches.map((verse, index) => ({
    ...verse,
    arabic: arabicResponses[index]?.data?.text || '',
  }))
}

// ─── Single Verse by Reference ────────────────────────────────────
export async function getVerseByRef(surahNum, ayahNum) {
  const [engRes, arabicRes] = await Promise.all([
    fetch(`${BASE_URL}/ayah/${surahNum}:${ayahNum}/en.asad`).then(r => r.json()),
    fetch(`${BASE_URL}/ayah/${surahNum}:${ayahNum}/quran-uthmani`).then(r => r.json()),
  ])

  if (!engRes.data) return []

  return [{
    ...engRes.data,
    arabic: arabicRes.data?.text || '',
  }]
}

// ─── Verse Range ──────────────────────────────────────────────────
// Cap at 20 verses to avoid hammering the API
export async function getVerseRange(surahNum, from, to) {
  const fromN = parseInt(from)
  const toN = Math.min(parseInt(to), fromN + 19) // max 20 verses

  const refs = Array.from({ length: toN - fromN + 1 }, (_, i) => fromN + i)

  const results = await Promise.all(
    refs.map(ayah => getVerseByRef(surahNum, ayah))
  )

  return results.flat().filter(Boolean)
}

// ─── All 114 Surahs List ──────────────────────────────────────────
export async function getSurahList() {
  const res = await fetch(`${BASE_URL}/surah`)
  const data = await res.json()
  return data.data || []
}

// ─── All Verses of a Surah ────────────────────────────────────────
export async function getSurahVerses(surahNum) {
  const [engRes, arabicRes] = await Promise.all([
    fetch(`${BASE_URL}/surah/${surahNum}/en.asad`).then(r => r.json()),
    fetch(`${BASE_URL}/surah/${surahNum}/quran-uthmani`).then(r => r.json()),
  ])

  const surahInfo = {
    number: engRes.data.number,
    name: engRes.data.name,
    englishName: engRes.data.englishName,
    englishNameTranslation: engRes.data.englishNameTranslation,
  }

  const engVerses = engRes.data?.ayahs || []
  const arabicVerses = arabicRes.data?.ayahs || []

  return engVerses.map((verse, i) => ({
    ...verse,
    arabic: arabicVerses[i]?.text || '',
    surah: surahInfo,
  }))
}