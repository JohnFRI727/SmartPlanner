# SmartPlanner – Architektur & Design

## Tech-Stack

| Schicht | Technologie | Begründung |
|---------|-------------|------------|
| Framework | Next.js 14+ (App Router) | Full-Stack in einem Projekt, SSR, API Routes |
| Sprache | TypeScript | Typ-Sicherheit, bessere DX |
| UI | React 18+ | Komponentenbasiert, riesiges Ökosystem |
| Styling | Tailwind CSS + shadcn/ui | Schnell, konsistent, anpassbar |
| State | React Server Components + Zustand | Minimal Client-State, Server-First |
| Datenbank | PostgreSQL | Relational, ACID, JSON-Support |
| ORM | Prisma | Type-safe, Migrations, gute DX |
| Auth | NextAuth.js v5 | Bewährt, Credentials + OAuth |
| KI | Vercel AI SDK | Streaming, Tool-Calls, Multi-Provider |
| Validierung | Zod | Schema-Validierung, Type-Inferenz |
| Testing | Vitest + Playwright | Unit/Integration + E2E |
| Deployment | Docker Compose | Self-Hosted, reproduzierbar |

## Systemarchitektur

```
Browser ──HTTPS──▶ Next.js (Node.js)
                        │
                ┌───────┼───────┐
                │       │       │
           API Routes  Server   Server
           (REST)      Comp.    Actions
                │       │       │
                └───────┼───────┘
                        │
                  Service Layer
                        │
              ┌─────────┼─────────┐
              │         │         │
           Prisma    AI SDK    Push API
              │         │
         PostgreSQL   LLM (OpenAI/Ollama)
```

## Verzeichnisstruktur

```
smartplanner/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/             # Öffentliche Auth-Seiten
│   │   ├── (app)/              # Geschützte App-Seiten
│   │   ├── api/                # REST API Routes
│   │   ├── layout.tsx          # Root Layout
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/                 # shadcn/ui Basis
│   │   ├── layout/            # Shell, Sidebar, Header
│   │   ├── projects/          # Projekt-Komponenten
│   │   ├── tasks/             # Task-Komponenten
│   │   ├── calendar/          # Kalender-Komponenten
│   │   ├── ai-chat/           # KI-Chat-Komponenten
│   │   └── export/            # Export-Komponenten
│   ├── lib/
│   │   ├── db.ts              # Prisma Client Singleton
│   │   ├── auth.ts            # NextAuth Config
│   │   ├── ai/                # KI-Integration
│   │   │   ├── client.ts      # AI SDK Setup
│   │   │   ├── prompts/       # Prompt Templates
│   │   │   └── parsers/       # Response Parser
│   │   ├── services/          # Business Logic
│   │   │   ├── project.service.ts
│   │   │   ├── task.service.ts
│   │   │   ├── subtask.service.ts
│   │   │   ├── workspace.service.ts
│   │   │   ├── calendar.service.ts
│   │   │   ├── ai.service.ts
│   │   │   ├── export.service.ts
│   │   │   ├── notification.service.ts
│   │   │   └── privacy.service.ts
│   │   ├── validators/        # Zod Schemas
│   │   └── utils/             # Helper Functions
│   ├── hooks/                 # Custom React Hooks
│   ├── stores/                # Zustand Client Stores
│   └── types/                 # Shared TypeScript Types
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
├── public/
│   └── sw.js                  # Service Worker
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── docker-compose.yml
├── Dockerfile
├── .env.example
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── vitest.config.ts
└── package.json
```

## Service Layer Design

Jeder Service kapselt die Business Logic für einen Bereich:

### ProjectService
- `create(data)` → Projekt erstellen
- `update(id, data)` → Projekt aktualisieren
- `archive(id)` → Soft-Delete
- `delete(id)` → Hard-Delete
- `getById(id)` → Mit Tasks und Progress
- `list(filters)` → Gefilterte Liste

### TaskService
- `create(data)` → Task erstellen
- `update(id, data)` → Task aktualisieren
- `updateStatus(id, status)` → Status ändern
- `delete(id)` → Löschen
- `getById(id)` → Mit Subtasks
- `list(filters)` → Gefilterte Liste mit Pagination
- `getUpcoming(days)` → Fällige Tasks
- `getOverdue()` → Überfällige Tasks

### AIService
- `chat(conversationId, message, context)` → KI-Nachricht senden
- `buildContext(userId, options)` → Kontext zusammenstellen
- `parseActions(response)` → Strukturierte Actions extrahieren
- `confirmAction(messageId, actionIndex)` → Action ausführen
- `rejectAction(messageId)` → Action ablehnen

### ExportService
- `exportProject(projectId, options)` → Projekt exportieren
- `exportTask(taskId, options)` → Task exportieren
- `anonymize(content, rules)` → Daten anonymisieren
- `toMarkdown(data)` → Markdown-Format
- `toJSON(data)` → JSON-Format

## Authentifizierung

- NextAuth.js v5 mit Credentials Provider
- JWT-Sessions (stateless, horizontal skalierbar)
- Middleware schützt alle `/(app)` Routes
- Session enthält: userId, email, name
- Optional später: OAuth (GitHub, Google)

## Datenbank

- PostgreSQL 16 in Docker Container
- Prisma für Schema-Management und Migrations
- Connection Pooling via Prisma (default)
- Seed-Script für Development-Daten
- Backups über pg_dump Cronjob
