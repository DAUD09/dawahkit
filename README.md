# 🌙 DawahKit — Islamic Verse Discovery & Share Tool

> Search the Quran by keyword, topic, or verse reference. Read Arabic text with English translation, explore Tafsir, and generate beautiful shareable verse cards — built for dawah.

**Live Site:** [daud09.github.io/dawahkit](https://daud09.github.io/dawahkit/)

---

## ✨ Features

- **Smart Search** — search by keyword (e.g. *mercy*), verse reference (e.g. *2:286*), or range (e.g. *2:1-7*)
- **Surah Browser** — browse and filter all 114 Surahs, load any Surah's full verses instantly
- **Popular Verses** — one-click access to 8 well-known dawah verses
- **Arabic + Translation** — every verse displays Uthmani Arabic script alongside Muhammad Asad's English translation
- **Tafsir** — expandable Maududi commentary per verse, fetched on demand and cached
- **Share Card Generator** — one click generates a branded PNG verse card (Arabic + English + reference + DawahKit watermark) ready to share on WhatsApp or social media
- **Dark / Light Mode** — toggle between midnight navy and clean light theme
- **SEO Optimised** — meta tags, Open Graph, JSON-LD structured data, sitemap, robots.txt

---

## 🛠️ Tech Stack

| Tool | Purpose |
|---|---|
| React 18 + Vite | UI framework and build tool |
| Tailwind CSS v4 | Utility-first styling |
| Al-Quran Cloud API | Free public Quran data (verses, audio, tafsir) |
| html2canvas | DOM-to-PNG share card generation |
| gh-pages | GitHub Pages deployment |

---

## 🚀 Getting Started
```bash
# Clone the repo
git clone https://github.com/DAUD09/dawahkit.git
cd dawahkit

# Install dependencies
npm install

# Start local dev server
npm run dev

# Deploy to GitHub Pages
npm run deploy
```

---

## 📖 Usage Examples

| What you type | What happens |
|---|---|
| `mercy` | Keyword search across all translations |
| `2:286` | Loads exactly that verse |
| `2:1-7` | Loads verses 1 through 7 of Al-Baqara |
| Click a Popular Verse tile | Loads that verse directly |
| Click a Surah in the browser | Loads the full Surah |

---

## 🎨 Design

- **Colour palette:** Midnight navy `#070D1A` · Gold `#D4AF37` · Emerald `#2DD4BF`
- **Typography:** Amiri (Arabic & headings) · DM Sans (UI & body)
- **Style:** Glassmorphism cards over a subtle Islamic geometric pattern

---

## 🤲 Why DawahKit?

Most Quran apps are Surah-first — you need to already know where a verse is. DawahKit flips this: start from a topic, keyword, or concept and find the right verse to share. It's designed for people doing dawah who need to quickly locate, read, and share Quranic content in a conversation.

---

## 📄 License

MIT — free to use, share, and build upon.

---

*Built by [Daudi Symon](https://daud09.github.io/daudi-portfolio) · Blantyre, Malawi*
