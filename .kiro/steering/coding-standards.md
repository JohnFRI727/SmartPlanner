# Coding Standards – SmartPlanner

## Sprache & Framework

- **TypeScript** ist für alle Dateien Pflicht (kein plain JavaScript)
- **Next.js App Router** – verwende Server Components als Default, Client Components nur wenn nötig (`"use client"`)
- **React 18+** mit funktionalen Komponenten und Hooks

## Dateistruktur

- Verwende die Verzeichnisstruktur aus `docs/design.md`
- Eine Komponente pro Datei
- Co-locate: Tests neben dem Code (`*.test.ts` / `*.test.tsx`)
- Index-Dateien nur für Public APIs eines Moduls

## Namenskonventionen

| Element | Konvention | Beispiel |
|---------|-----------|----------|
| Dateien (Komponenten) | kebab-case | `project-card.tsx` |
| Dateien (Services) | kebab-case mit Suffix | `project.service.ts` |
| Dateien (Types) | kebab-case | `project.types.ts` |
| Komponenten | PascalCase | `ProjectCard` |
| Funktionen/Variablen | camelCase | `getProjectById` |
| Konstanten | UPPER_SNAKE_CASE | `MAX_SUBTASKS` |
| TypeScript Types/Interfaces | PascalCase | `CreateProjectInput` |
| Zod Schemas | camelCase mit Schema-Suffix | `createProjectSchema` |
| API Routes | RESTful, Plural | `/api/projects`, `/api/tasks/:id` |
| CSS Klassen | Tailwind Utility Classes | Keine custom CSS-Klassen wenn vermeidbar |

## Code-Stil

### TypeScript
- Strict Mode aktiviert (`"strict": true`)
- Keine `any` – verwende `unknown` und Type Guards
- Bevorzuge `interface` für Objekt-Shapes, `type` für Unions/Intersections
- Explizite Return Types für Service-Funktionen
- Zod für Runtime-Validierung, TypeScript für Compile-Time

### React
- Server Components als Default
- `"use client"` nur für interaktive Komponenten (Event-Handler, Hooks, Browser APIs)
- Props mit TypeScript Interface typen
- Keine prop drilling über 2 Ebenen → Zustand hochziehen oder Zustand-Store
- Error Boundaries für kritische Sektionen

### Styling
- Tailwind CSS für alles
- shadcn/ui Komponenten verwenden und erweitern
- Keine inline styles
- Responsive: Mobile-First (`sm:`, `md:`, `lg:` Breakpoints)
- Dark Mode: `dark:` Varianten (über class strategy)

### Datenbank
- Prisma für alle DB-Zugriffe (kein Raw SQL im Normal-Fall)
- Service Layer zwischen API und Prisma (nicht direkt in API Routes)
- Immer `userId` prüfen (kein Zugriff auf fremde Daten)
- Transactions für zusammenhängende Operationen

### API Routes
- Input-Validierung mit Zod als erste Aktion
- Einheitliche Response-Formate:
  - Erfolg: `{ data: ... }`
  - Fehler: `{ error: { code: "...", message: "..." } }`
- HTTP-Statuscodes korrekt verwenden (201 bei Create, 204 bei Delete)
- Auth-Check in jeder API Route (Session prüfen)

### Error Handling
- Try-Catch in Service-Funktionen
- Spezifische Error-Klassen (z.B. `NotFoundError`, `ValidationError`)
- Keine sensiblen Infos in Error-Messages an Client
- Logging: Fehler loggen, aber keine Secrets

## Git & Commits

- Conventional Commits: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`
- Eine logische Änderung pro Commit
- Branch-Naming: `feature/T-XX-description`, `fix/T-XX-description`
- PR-Beschreibung: Was, Warum, Wie testen

## Testing

- **Unit Tests**: Vitest für Services und Utility-Funktionen
- **Integration Tests**: API Routes mit Test-DB
- **E2E Tests**: Playwright für kritische User-Flows
- Mindestens Tests für: Auth-Flow, CRUD-Operationen, KI-Bestätigung
- Mocking: Prisma und externe APIs mocken in Unit Tests

## Performance

- Verwende `loading.tsx` für Suspense-Boundaries
- Lazy load schwere Client-Komponenten mit `dynamic()`
- DB-Queries: Nur benötigte Felder selektieren (`select` statt volles Model)
- Pagination für Listen (Default: 20 Items)
- Caching: Next.js `revalidatePath` / `revalidateTag` für Server-Seiten

## Sicherheit

- Alle Inputs validieren (Client UND Server)
- Parameterized Queries (Prisma macht das automatisch)
- Keine Secrets im Code – nur über Environment Variables
- `next.config.ts`: Security-Headers setzen
- Auth-Middleware: Alle geschützten Routes absichern
