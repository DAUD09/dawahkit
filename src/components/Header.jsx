function Header({ darkMode, toggleDarkMode, onGoHome, showHome }) {
  return (
    <header className="relative z-10 flex items-center justify-between px-6 py-5 md:px-12">

      {/* Logo area */}
      <button onClick={onGoHome} className="flex flex-col text-left hover:opacity-80 transition-opacity">
        <span className="font-display text-2xl md:text-3xl font-bold text-gold-500 tracking-wide">
          ☽ DawahKit
        </span>
        <span className="font-body text-xs md:text-sm text-navy-700 dark:text-gray-400 tracking-widest uppercase mt-0.5">
          Discover · Reflect · Share
        </span>
      </button>

      <div className="flex items-center gap-3">
        {/* Home button — only visible in results view */}
        {showHome && (
          <button
            onClick={onGoHome}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-glass-border bg-glass backdrop-blur-sm text-sm font-body font-medium text-gray-600 dark:text-gray-300 hover:border-gold-500 hover:text-gold-500 transition-all duration-200"
          >
            ← Home
          </button>
        )}

        {/* Dark mode toggle */}
        <button
          onClick={toggleDarkMode}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-glass-border bg-glass backdrop-blur-sm text-sm font-body font-medium text-gray-600 dark:text-gray-300 hover:border-gold-500 hover:text-gold-500 transition-all duration-200"
          aria-label="Toggle dark mode"
        >
          <span className="text-base">{darkMode ? '🌙' : '☀️'}</span>
          <span className="hidden sm:inline">{darkMode ? 'Dark' : 'Light'}</span>
        </button>
      </div>

    </header>
  )
}

export default Header