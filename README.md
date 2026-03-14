# Sex-Bibel

Eine SEO-optimierte Bildungswebsite über Sexstellungen, erstellt mit Next.js (App Router), Tailwind CSS und TypeScript.

## Tech Stack

- **Next.js 14** (App Router)
- **Tailwind CSS**
- **TypeScript**
- **Statische Generierung** für alle Seiten (SEO-optimiert)

## Projektstruktur

```
├── src/
│   ├── app/                    # App Router Seiten
│   │   ├── page.tsx            # Homepage
│   │   ├── layout.tsx          # Root Layout
│   │   ├── sitemap.ts          # Sitemap (SEO)
│   │   ├── robots.ts           # robots.txt (SEO)
│   │   ├── blog/               # Blog-Bereich
│   │   ├── challenge/          # Challenge-Bereich
│   │   └── sexstellungen/      # Sexstellungen Datenbank
│   ├── components/             # Wiederverwendbare Komponenten
│   ├── data/                   # Daten (Positionen, Blog, Challenges)
│   ├── lib/                    # Hilfsfunktionen
│   └── types/                  # TypeScript-Typen
```

## Entwicklung

```bash
npm install
npm run dev
```

Öffne [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Seiten

- **/** – Homepage mit Featured Content
- **/sexstellungen** – Alle Sexstellungen
- **/sexstellungen/[slug]** – Positions-Detail ODER Kategorie (z.B. fuer-anfaenger)
- **/blog** – Alle Blog-Artikel
- **/blog/[slug]** – Einzelner Artikel
- **/challenge** – Alle Challenges
- **/challenge/[slug]** – Challenge-Detail

## SEO

- Metadata für alle Seiten
- Sitemap unter `/sitemap.xml`
- robots.txt unter `/robots.txt`
- JSON-LD strukturierte Daten auf Positionsseiten
- Interne Verlinkung zwischen allen relevanten Seiten
