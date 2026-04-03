const BASE_URL = 'https://api.alquran.cloud/v1'
const TIMEOUT_MS = 8000

// ─── Centralized fetch with timeout and status validation ─────────
async function fetchJson(url) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)

  try {
    const res = await fetch(url, { signal: controller.signal })
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`)
    return await res.json()
  } finally {
    clearTimeout(timer)
  }
}

// ─── Input bounds clamping ────────────────────────────────────────
function clampInt(value, min, max) {
  const n = parseInt(value, 10)
  if (isNaN(n)) throw new Error(`Invalid number: ${value}`)
  return Math.min(Math.max(n, min), max)
}

// ─── Arabic detection ─────────────────────────────────────────────
function isArabic(text) {
  return /[\u0600-\u06FF]/.test(text)
}

// ─── Smart Query Parser ───────────────────────────────────────────
export function parseSearchQuery(query) {
  const q = query.trim()

  // Pattern: "2:286"
  const verseRef = q.match(/^(\d{1,3})\s*:\s*(\d{1,3})$/)
  if (verseRef) return { type: 'verse', surah: verseRef[1], ayah: verseRef[2] }

  // Pattern: "2:1-7" or "2:1 to 7"
  const verseRange = q.match(/^(\d{1,3})\s*:\s*(\d{1,3})\s*(?:-|to)\s*(\d{1,3})$/i)
  if (verseRange) return { type: 'range', surah: verseRange[1], from: verseRange[2], to: verseRange[3] }

  // Arabic text detected
  if (isArabic(q)) return { type: 'arabic', query: q }

  // Default: English keyword
  return { type: 'keyword', query: q }
}

// ─── English Keyword Search ───────────────────────────────────────
export async function searchVerses(keyword) {
  const searchData = await fetchJson(
    `${BASE_URL}/search/${encodeURIComponent(keyword)}/all/en.asad`
  )
  if (!searchData.data || !searchData.data.matches) return []

  const matches = searchData.data.matches.slice(0, 12)

  const arabicResponses = await Promise.all(
    matches.map(m => fetchJson(`${BASE_URL}/ayah/${m.number}/quran-uthmani`))
  )

  return matches.map((verse, index) => ({
    ...verse,
    arabic: arabicResponses[index]?.data?.text || '',
  }))
}

// ─── Arabic Text Search ───────────────────────────────────────────
export async function searchArabic(arabicText) {
  const searchData = await fetchJson(
    `${BASE_URL}/search/${encodeURIComponent(arabicText)}/all/quran-uthmani`
  )
  if (!searchData.data || !searchData.data.matches) return []

  const matches = searchData.data.matches.slice(0, 12)

  const engResponses = await Promise.all(
    matches.map(m => fetchJson(`${BASE_URL}/ayah/${m.number}/en.asad`))
  )

  return matches.map((verse, index) => ({
    ...verse,
    arabic: verse.text,
    text: engResponses[index]?.data?.text || '',
    surah: engResponses[index]?.data?.surah || verse.surah,
    numberInSurah: engResponses[index]?.data?.numberInSurah || verse.numberInSurah,
  }))
}

// ─── Single Verse by Reference ────────────────────────────────────
export async function getVerseByRef(surahNum, ayahNum) {
  const s = clampInt(surahNum, 1, 114)
  const a = clampInt(ayahNum, 1, 286)

  const [engRes, arabicRes] = await Promise.all([
    fetchJson(`${BASE_URL}/ayah/${s}:${a}/en.asad`),
    fetchJson(`${BASE_URL}/ayah/${s}:${a}/quran-uthmani`),
  ])

  if (!engRes.data) return []

  return [{
    ...engRes.data,
    arabic: arabicRes.data?.text || '',
  }]
}

// ─── Verse Range ──────────────────────────────────────────────────
export async function getVerseRange(surahNum, from, to) {
  const s = clampInt(surahNum, 1, 114)
  const fromN = clampInt(from, 1, 286)
  const toN = Math.min(clampInt(to, 1, 286), fromN + 19) // hard cap at 20 verses

  const refs = Array.from({ length: toN - fromN + 1 }, (_, i) => fromN + i)

  const results = await Promise.all(
    refs.map(ayah => getVerseByRef(s, ayah))
  )

  return results.flat().filter(Boolean)
}

// ─── All 114 Surahs List ──────────────────────────────────────────
export async function getSurahList() {
  const data = await fetchJson(`${BASE_URL}/surah`)
  return data.data || []
}

// ─── All Verses of a Surah ────────────────────────────────────────
export async function getSurahVerses(surahNum) {
  const s = clampInt(surahNum, 1, 114)

  const [engRes, arabicRes] = await Promise.all([
    fetchJson(`${BASE_URL}/surah/${s}/en.asad`),
    fetchJson(`${BASE_URL}/surah/${s}/quran-uthmani`),
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