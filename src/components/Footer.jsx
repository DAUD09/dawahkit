function Footer({ onNavigate }) {
  return (
    <footer className="relative z-10 text-center py-8 px-6 border-t border-glass-border mt-8">
      <p className="font-body text-xs text-gray-500 mb-2">
        {'\u00A9'} {new Date().getFullYear()} DawahKit {'\u2014'} Built for dawah, free for all.
      </p>

      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => onNavigate('privacy')}
          className="font-body text-xs text-gray-400 hover:text-gold-500 transition-colors"
        >
          Privacy Policy
        </button>

        <span className="text-gray-600">{'\u00B7'}</span>

        <button
          onClick={() => onNavigate('terms')}
          className="font-body text-xs text-gray-400 hover:text-gold-500 transition-colors"
        >
          Terms of Use
        </button>

        <span className="text-gray-600">{'\u00B7'}</span>

        <a
          href="https://daud09.github.io/daudi-portfolio"
          target="_blank"
          rel="noopener noreferrer"
          className="font-body text-xs text-gray-400 hover:text-gold-500 transition-colors"
        >
          Built by Daudi Symon
        </a>
      </div>
    </footer>
  );
}

export default Footer;