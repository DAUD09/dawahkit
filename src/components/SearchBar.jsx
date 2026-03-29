import { useState } from 'react'

function SearchBar({ onSearch, isLoading }) {
  const [query, setQuery] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim())
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <div className="flex items-center gap-3 px-5 py-4 rounded-2xl border border-glass-border bg-white dark:bg-glass backdrop-blur-md shadow-lg focus-within:border-gold-500 transition-all duration-200 search-focus-ring">
        
        <span className="text-gold-500 text-xl flex-shrink-0">
          {isLoading ? '⏳' : '🔍'}
        </span>

        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search by keyword or topic… e.g. mercy, patience, light"
          className="flex-1 min-w-0 bg-transparent outline-none font-body text-sm md:text-base text-gray-800 dark:text-gray-100 placeholder-gray-400"          disabled={isLoading}
        />

        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="flex-shrink-0 px-4 py-2 rounded-xl bg-gold-500 hover:bg-gold-600 disabled:opacity-40 disabled:cursor-not-allowed text-navy-950 font-body font-semibold text-sm transition-all duration-200"
        >
          {isLoading ? 'Searching…' : 'Search'}
        </button>

      </div>
    </form>
  )
}

export default SearchBar