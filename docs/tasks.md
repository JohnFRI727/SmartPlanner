# SmartPlanner – Implementierungs-Tasks

## Phase 1: Foundation (Woche 1-2)

- [ ] **T-01** Projekt-Setup: Next.js mit TypeScript, Tailwind CSS, ESLint, Prettier
  - `npx create-next-app@latest smartplanner --typescript --tailwind --app --src-dir`
  - Abhängigkeit: keine

- [ ] **T-02** Docker Compose für PostgreSQL + Prisma installieren
  - docker-compose.yml mit postgres:16
  - `npm install prisma @prisma/client`
  - `npx prisma init`
  - Abhängigkeit: T-01

- [ ] **T-03** Datenbankschema erstellen und erste Migration ausführen
  - Alle Modelle aus der Spezifikation in schema.prisma
  - `npx prisma migrate dev --name init`
  - Seed-Script mit Testdaten
  - Abhängigkeit: T-02

- [ ] **T-04** NextAuth.js Setup mit Credentials Provider
  - `npm install next-auth@beta`
  - Auth-Config mit JWT-Sessions
  - Middleware für Route-Protection
  - Abhängigkeit: T-03

- [ ] **T-05** Login und Register UI-Seiten
  - `/login` und `/register` Pages
  - Formular-Validierung mit Zod
  - Error-Handling und Loading-States
  - Abhängigkeit: T-04

- [ ] **T-06** App-Layout mit Sidebar-Navigation
  - Root Layout mit Sidebar
  - Navigation-Links zu allen Hauptseiten
  - Responsive (Sidebar → Hamburger auf Mobile)
  - User-Info im Header
  - Abhängigkeit: T-04

- [ ] **T-07** shadcn/ui Basis-Komponenten installieren
  - `npx shadcn-ui@latest init`
  - Button, Input, Card, Dialog, Select, Badge, Table, Tabs
  - Abhängigkeit: T-01

## Phase 2: Core Features (Woche 3-5)

- [ ] **T-08** Workspace Service + API
  - WorkspaceService: create, list, update, delete
  - API Routes: GET/POST /api/workspaces, PUT/DELETE /api/workspaces/:id
  - Zod-Validierung
  - Abhängigkeit: T-03, T-04

- [ ] **T-09** Workspace UI + Onboarding
  - Bei Erstanmeldung: automatisch "Uni" + "Geschäftlich" erstellen
  - Workspace-Auswahl im Header (globaler Filter)
  - Abhängigkeit: T-08

- [ ] **T-10** Project Service + API
  - ProjectService: create, update, archive, delete, getById, list
  - API Routes mit Filtern (workspace, status, priority)
  - Pagination
  - Abhängigkeit: T-08

- [ ] **T-11** Projektübersicht UI
  - Kachel- und Listenansicht
  - Filter-Bar (Workspace, Status, Priorität)
  - Projekt-Karten mit Fortschritt
  - Create-Button → Dialog
  - Abhängigkeit: T-10, T-07

- [ ] **T-12** Projektdetail UI
  - Projektinformationen anzeigen/bearbeiten
  - Aufgabenliste des Projekts
  - Aktionen: Archivieren, Löschen, Exportieren (Link)
  - Abhängigkeit: T-11

- [ ] **T-13** Task Service + API
  - TaskService: create, update, updateStatus, delete, getById, list
  - API Routes mit Filtern und Pagination
  - Sortierung nach Deadline, Priorität
  - Abhängigkeit: T-10

- [ ] **T-14** Aufgabenliste UI mit Filtern
  - Globale Aufgabenliste
  - Filter-Bar: Workspace, Projekt, Status, Priorität, Tags
  - Sortierung: Dropdown
  - Checkbox für Status-Toggle
  - Abhängigkeit: T-13, T-07

- [ ] **T-15** Aufgabendetail UI
  - Alle Felder anzeigen/bearbeiten
  - Unteraufgaben-Sektion
  - Reminder-Sektion (Platzhalter für Phase 3)
  - Abhängigkeit: T-14

- [ ] **T-16** Subtask Service + API + UI
  - SubtaskService: create, update, updateStatus, delete, list
  - API Routes unter /api/tasks/:taskId/subtasks
  - UI: Checklist in Aufgabendetail, Fortschrittsbalken
  - Abhängigkeit: T-13

- [ ] **T-17** Quick-Add Komponente
  - Globale Quick-Add-Leiste (Keyboard-Shortcut: Ctrl+K oder ähnlich)
  - Minimal: nur Titel eingeben
  - Optional: Projekt, Deadline, Priorität inline
  - Abhängigkeit: T-13

- [ ] **T-18** Tag-System
  - TagService: create, delete, list
  - Tag-API
  - Tag-Auswahl in Task- und Projekt-Formularen
  - Tag-Filter in Listen
  - Abhängigkeit: T-13

- [ ] **T-19** Dashboard UI
  - "Heute fällig" Sektion
  - "Diese Woche" Sektion
  - "Überfällig" Sektion (rot markiert)
  - Aktive Projekte mit Fortschritt
  - Quick-Add-Zugang
  - Abhängigkeit: T-14, T-16

## Phase 3: Kalender & Notifications (Woche 6-7)

- [ ] **T-20** Kalender-Service
  - CalendarService: getEvents(start, end, filters)
  - Aggregation: Tasks mit Deadline → Kalendereinträge
  - API: GET /api/calendar?start=...&end=...
  - Abhängigkeit: T-13

- [ ] **T-21** Kalender UI
  - FullCalendar Integration oder Custom-Kalender
  - Tages-/Wochen-/Monatsansicht (Tabs)
  - Farbcodierung nach Workspace/Priorität
  - Klick → Aufgabendetail
  - Filter-Bar
  - Abhängigkeit: T-20

- [ ] **T-22** Reminder Service + API
  - ReminderService: create, delete, listForTask, getUpcoming
  - API Routes
  - Abhängigkeit: T-13

- [ ] **T-23** Reminder UI
  - In Aufgabendetail: Reminder hinzufügen/entfernen
  - Presets: 1h, 1d, 1w vorher
  - Custom-Zeitpunkt
  - Abhängigkeit: T-22, T-15

- [ ] **T-24** Notification Service
  - Background-Job (Cron oder setInterval) prüft fällige Reminder
  - Web Push API Setup (VAPID Keys)
  - Push-Nachricht an Browser senden
  - Abhängigkeit: T-22

- [ ] **T-25** Service Worker für Push
  - sw.js registrieren
  - Push-Events empfangen und Notification anzeigen
  - Klick auf Notification → App öffnen
  - Abhängigkeit: T-24

## Phase 4: KI-Integration (Woche 8-10)

- [ ] **T-26** AI Service Setup
  - Vercel AI SDK installieren (`npm install ai @ai-sdk/openai`)
  - AI-Client konfigurieren (Provider wählbar)
  - API-Key-Management (Einstellungen)
  - Abhängigkeit: T-13

- [ ] **T-27** Prompt-Templates erstellen
  - create_task_from_text.ts
  - create_project_from_text.ts
  - split_task_into_subtasks.ts
  - suggest_daily_plan.ts
  - export_context_summary.ts
  - Abhängigkeit: T-26

- [ ] **T-28** AI-Chat API Route (Streaming)
  - POST /api/ai/chat mit Streaming-Response
  - Konversations-Management
  - Abhängigkeit: T-27

- [ ] **T-29** AI-Chat UI
  - Chat-Interface mit Nachrichtenliste
  - Streaming-Anzeige
  - Konversations-Sidebar
  - Abhängigkeit: T-28

- [ ] **T-30** Response-Parser
  - JSON-Actions aus KI-Response extrahieren
  - Validierung mit Zod
  - Fehlerbehandlung bei ungültigem Format
  - Abhängigkeit: T-28

- [ ] **T-31** Bestätigungs-Flow UI
  - Proposed Actions als Karten darstellen
  - Bestätigen/Ablehnen/Bearbeiten Buttons
  - Vorschau der zu erstellenden Daten
  - Abhängigkeit: T-30

- [ ] **T-32** Action-Ausführung
  - POST /api/ai/confirm → Daten in DB schreiben
  - POST /api/ai/reject → Status auf REJECTED setzen
  - Feedback an Nutzer
  - Abhängigkeit: T-31

- [ ] **T-33** KI-Einstellungen UI
  - API-Key eingeben/ändern
  - Modell auswählen (GPT-4, Claude, Ollama)
  - Endpunkt-URL für lokale LLMs
  - Abhängigkeit: T-26

- [ ] **T-34** Kontext-Builder
  - Relevante Projekte/Tasks für KI-Kontext zusammenstellen
  - Optionen: welche Workspaces, welche Projekte einbeziehen
  - Token-Limit beachten
  - Abhängigkeit: T-28

- [ ] **T-35** Kontext-Vorschau
  - Vor KI-Call: anzeigen, welche Daten gesendet werden
  - Nutzer kann Kontext anpassen/einschränken
  - Datenschutz-Warnung bei vertraulichen Daten
  - Abhängigkeit: T-34

## Phase 5: Export (Woche 11-12)

- [ ] **T-36** Export-Service (Markdown)
  - ExportService.toMarkdown(project/task)
  - Format gemäß Spezifikation
  - Abhängigkeit: T-13

- [ ] **T-37** Export-Service (JSON)
  - ExportService.toJSON(project/task)
  - Format gemäß Spezifikation (smartplanner-context-v1)
  - Abhängigkeit: T-36

- [ ] **T-38** Anonymisierungs-Service
  - PrivacyService.anonymize(content, rules)
  - Erkennung: Namen, E-Mails, Firmen, Telefonnummern
  - Ersetzung durch Platzhalter
  - Abhängigkeit: T-36

- [ ] **T-39** Export UI
  - Export-Ansicht: Entität auswählen, Format wählen
  - Vorschau des Exports
  - Download-Button
  - Auch erreichbar aus Projektdetail/Aufgabendetail
  - Abhängigkeit: T-37, T-38

- [ ] **T-40** Datenschutzhinweis-Integration
  - Bei geschäftlichen Exports: Warnung anzeigen
  - Empfehlung zur Anonymisierung
  - Privacy-Notice im Export-Dokument
  - Abhängigkeit: T-39

## Phase 6: Polish & Testing (Woche 13-14)

- [ ] **T-41** Unit Tests für Services
  - Vitest Setup
  - Tests für ProjectService, TaskService, ExportService
  - Mocking von Prisma und AI SDK
  - Abhängigkeit: alle Services

- [ ] **T-42** Integration Tests für API Routes
  - Test-Datenbank (separate PostgreSQL)
  - API-Endpunkte testen
  - Auth-Flow testen
  - Abhängigkeit: T-41

- [ ] **T-43** E2E Tests
  - Playwright Setup
  - Kritische User-Flows testen (Login, Projekt erstellen, Task erstellen)
  - Abhängigkeit: T-42

- [ ] **T-44** Performance-Optimierung
  - Lazy Loading für schwere Komponenten
  - DB-Queries optimieren (Includes, Selects)
  - Image-Optimierung
  - Abhängigkeit: alle UI-Tasks

- [ ] **T-45** Responsive Design finalisieren
  - Alle Seiten auf Mobile testen
  - Touch-Targets prüfen
  - Bottom Navigation auf Mobile
  - Abhängigkeit: alle UI-Tasks

- [ ] **T-46** Docker Deployment Setup
  - Multi-stage Dockerfile
  - docker-compose.prod.yml (App + DB + Reverse-Proxy)
  - .env.production.example
  - Health-Checks
  - Abhängigkeit: T-01

- [ ] **T-47** Dokumentation
  - README.md aktualisieren
  - Setup-Guide für Entwickler
  - Deployment-Guide
  - API-Dokumentation
  - Abhängigkeit: alle Tasks
