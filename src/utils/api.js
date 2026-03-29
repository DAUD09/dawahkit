const BASE_URL = 'https://api.alquran.cloud/v1'

export async function searchVerses(keyword) {
  // Fetch English translation results
  const searchRes = await fetch(`${BASE_URL}/search/${keyword}/all/en.asad`)
  const searchData = await searchRes.json()

  if (!searchData.data || !searchData.data.matches) {
    return []
  }

  const matches = searchData.data.matches.slice(0, 12) // limit to 12 results

  // For each match, also fetch its Arabic text in parallel
  const arabicResponses = await Promise.all(
    matches.map(m =>
      fetch(`${BASE_URL}/ayah/${m.number}/quran-uthmani`).then(r => r.json())
    )
  )

  // Merge English + Arabic into one combined object per verse
  return matches.map((verse, index) => ({
    ...verse,
    arabic: arabicResponses[index]?.data?.text || '',
  }))
}