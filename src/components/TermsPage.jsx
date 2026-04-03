function TermsPage({ onBack }) {
  return (
    <div className="relative z-10 max-w-2xl mx-auto px-6 py-12">
      <button
        onClick={onBack}
        className="mb-8 flex items-center gap-2 font-body text-sm text-gray-400 hover:text-gold-500 transition-colors"
      >
        {'\u2190'} Back to DawahKit
      </button>

      <h1 className="font-display text-3xl md:text-4xl font-bold text-navy-900 dark:text-white mb-2">
        Terms of Use
      </h1>
      <p className="font-body text-xs text-gray-400 mb-8">
        Last updated: April 2026
      </p>

      <div className="flex flex-col gap-8 font-body text-sm text-gray-600 dark:text-gray-300 leading-relaxed">

        <section>
          <h2 className="font-body font-semibold text-base text-navy-900 dark:text-white mb-2">
            1. Acceptance
          </h2>
          <p>
            By using DawahKit, you agree to these terms.
          </p>
        </section>

        <section>
          <h2 className="font-body font-semibold text-base text-navy-900 dark:text-white mb-2">
            2. Purpose
          </h2>
          <p>
            Tool for discovering Quranic verses for personal and dawah use.
          </p>
        </section>

        <section>
          <h2 className="font-body font-semibold text-base text-navy-900 dark:text-white mb-2">
            3. Quran Content
          </h2>
          <p>
            Content sourced from Al-Quran Cloud API.
          </p>
        </section>

        <section>
          <h2 className="font-body font-semibold text-base text-navy-900 dark:text-white mb-2">
            4. Accuracy
          </h2>
          <p>
            Accuracy is not guaranteed. Consult scholars where necessary.
          </p>
        </section>

        <section>
          <h2 className="font-body font-semibold text-base text-navy-900 dark:text-white mb-2">
            5. Shareable Image Cards
          </h2>
          <p>
            Cards can be shared responsibly.
          </p>
        </section>

        <section>
          <h2 className="font-body font-semibold text-base text-navy-900 dark:text-white mb-2">
            6. Prohibited Use
          </h2>
          <p>
            No misuse or misrepresentation of Quranic content.
          </p>
        </section>

        <section>
          <h2 className="font-body font-semibold text-base text-navy-900 dark:text-white mb-2">
            7. Open Source
          </h2>
          <p>
            Source code available on{' '}
            <a
              href="https://github.com/DAUD09/dawahkit"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-500 hover:underline"
            >
              GitHub
            </a>{' '}
            under MIT license.
          </p>
        </section>

        <section>
          <h2 className="font-body font-semibold text-base text-navy-900 dark:text-white mb-2">
            8. Disclaimer
          </h2>
          <p>
            Provided "as is" without warranty.
          </p>
        </section>

      </div>
    </div>
  );
}

export default TermsPage;