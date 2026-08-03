# SmartPlanner

Eine moderne, KI-gestützte Planner-App für die Verwaltung von Projekten, Aufgaben, Deadlines und Kalendertermine – mit klarer Trennung zwischen Uni- und Geschäftsbereichen.

## Features (geplant)

- 📁 Projekte und Aufgaben mit Unteraufgaben verwalten
- 🎓 Trennung: Uni vs. Geschäftlich
- 📅 Kalenderansicht (Tag/Woche/Monat)
- 🤖 KI-Chat für natürlichsprachliche Planung
- 📤 Kontextexport (Markdown/JSON) für andere KI-Systeme
- 🔔 Erinnerungen und Benachrichtigungen
- 🔒 Datenschutz-first: Volle Kontrolle über eigene Daten

## Tech-Stack

- **Framework:** Next.js 14+ (App Router)
- **Sprache:** TypeScript
- **UI:** React + Tailwind CSS + shadcn/ui
- **Datenbank:** PostgreSQL + Prisma
- **Auth:** NextAuth.js v5
- **KI:** Vercel AI SDK (OpenAI / Anthropic / Ollama)
- **Testing:** Vitest + Playwright
- **Deployment:** Docker (Self-Hosted)

## Dokumentation

- [Vollständige Spezifikation](docs/spec/SPECIFICATION.md)
- [Anforderungen](docs/requirements.md)
- [Architektur & Design](docs/design.md)
- [Implementierungs-Tasks](docs/tasks.md)

## Projekt-Status

🟡 **Planungsphase** – Spezifikation und Architektur erstellt, Implementierung startet mit Phase 1 (Foundation).

## Schnellstart (nach Implementierung)

```bash
# Repository klonen
git clone <repo-url>
cd smartplanner

# Dependencies installieren
npm install

# Datenbank starten
docker compose up -d postgres

# Prisma Migration
npx prisma migrate dev

# Development Server
npm run dev
```

## Lizenz

Privates Projekt.
