function PrivacyPage({ onBack }) {
  return (
    <div className="relative z-10 max-w-2xl mx-auto px-6 py-12">
      <button
        onClick={onBack}
        className="mb-8 flex items-center gap-2 font-body text-sm text-gray-400 hover:text-gold-500 transition-colors"
      >
        {'\u2190'} Back to DawahKit
      </button>

      <h1 className="font-display text-3xl md:text-4xl font-bold text-navy-900 dark:text-white mb-2">
        Privacy Policy
      </h1>
      <p className="font-body text-xs text-gray-400 mb-8">
        Last updated: April 2026
      </p>

      <div className="flex flex-col gap-8 font-body text-sm text-gray-600 dark:text-gray-300 leading-relaxed">

        <section>
          <h2 className="font-body font-semibold text-base text-navy-900 dark:text-white mb-2">
            1. Overview
          </h2>
          <p>
            DawahKit is a free, open-source Islamic verse discovery tool. We are committed to your privacy.
          </p>
        </section>

        <section>
          <h2 className="font-body font-semibold text-base text-navy-900 dark:text-white mb-2">
            2. Data We Do Not Collect
          </h2>
          <p>
            We do not collect personal data such as name, email, or location.
          </p>
        </section>

        <section>
          <h2 className="font-body font-semibold text-base text-navy-900 dark:text-white mb-2">
            3. Search Queries
          </h2>
          <p>
            Queries are sent to the Al-Quran Cloud API (
            <span className="text-gold-500">api.alquran.cloud</span>
            ). We do not store them.
          </p>
        </section>

        <section>
          <h2 className="font-body font-semibold text-base text-navy-900 dark:text-white mb-2">
            4. Local Storage
          </h2>
          <p>
            Theme preference is stored locally in your browser only.
          </p>
        </section>

        <section>
          <h2 className="font-body font-semibold text-base text-navy-900 dark:text-white mb-2">
            5. Google Fonts
          </h2>
          <p>
            Fonts are loaded from Google servers, which may log requests.
          </p>
        </section>

        <section>
          <h2 className="font-body font-semibold text-base text-navy-900 dark:text-white mb-2">
            6. Analytics
          </h2>
          <p>No analytics or tracking is used.</p>
        </section>

        <section>
          <h2 className="font-body font-semibold text-base text-navy-900 dark:text-white mb-2">
            7. Hosting
          </h2>
          <p>
            Hosted on GitHub Pages which may log access data.
          </p>
        </section>

        <section>
          <h2 className="font-body font-semibold text-base text-navy-900 dark:text-white mb-2">
            8. Contact
          </h2>
          <p>
            Contact via{' '}
            <a
              href="https://daud09.github.io/daudi-portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-500 hover:underline"
            >
              daud09.github.io/daudi-portfolio
            </a>
          </p>
        </section>

      </div>
    </div>
  );
}

export default PrivacyPage;