# SmartPlanner – Vollständige Projektspezifikation

## 1. Annahmen

| # | Annahme | Begründung |
|---|---------|------------|
| A1 | Einzelnutzer-App im MVP, Multi-User optional später | Reduziert Komplexität für den Start |
| A2 | Entwickler ist Bachelor-Informatik-Student mit Grundkenntnissen in TypeScript/React | Technologie-Entscheidungen basieren darauf |
| A3 | Deployment zunächst lokal oder auf einem eigenen Server (Self-Hosted) | Datenschutz-Priorität |
| A4 | KI-Integration über OpenAI-kompatible API (z.B. OpenAI, Anthropic, lokale LLMs via Ollama) | Flexibilität und Datenschutz |
| A5 | Budget-Constraint: Keine teuren Cloud-Dienste im MVP | Studentisches Projekt |
| A6 | Deutsch als primäre UI-Sprache, Code und Docs auf Englisch | Best Practice |
| A7 | Web-App (kein Native Mobile im MVP), responsive Design reicht | Schnellerer Start |
| A8 | Keine Echtzeit-Kollaboration im MVP | Nur ein Nutzer |

---

## 2. Produktvision

### Kurzbeschreibung
SmartPlanner ist eine moderne, KI-gestützte Planner-App für Studierende und Berufstätige, die Projekte, Aufgaben, Deadlines und Kalendertermine in einer übersichtlichen Oberfläche vereint – mit klarer Trennung zwischen Uni- und Geschäftsbereichen.

### Zielgruppe
- Informatik-Studierende mit parallelen Uni- und Werkstudenten-/Freelance-Projekten
- Berufstätige mit mehreren Projekten und Deadlines
- Personen, die KI-gestützt ihre Aufgabenplanung optimieren wollen

### Hauptnutzen
1. **Einheitliche Verwaltung** von Uni- und Geschäftsaufgaben in einer App
2. **KI-gestützte Planung**: Natürlichsprachliche Projektzerlegung und Priorisierung
3. **Kontextexport** für nahtlose Zusammenarbeit mit externen KI-Systemen
4. **Datenschutz-first**: Volle Kontrolle über Daten und KI-Kontext

### Abgrenzung zu einfachen To-do-Apps
| Feature | To-do-App | SmartPlanner |
|---------|-----------|--------------|
| Projektstruktur | Flache Listen | Hierarchisch (Projekt → Aufgabe → Unteraufgabe) |
| Kontexttrennung | Keine | Uni / Geschäftlich mit Datenschutz |
| KI-Integration | Keine | Chat-basierte Planung mit Bestätigung |
| Kontextexport | Keine | Strukturierter Export für andere KI-Systeme |
| Kalender | Einfache Deadline-Ansicht | Tages-/Wochen-/Monatsansicht mit Filtern |

---

## 3. MVP und Feature-Roadmap

### MVP (Phase 1 – 6-8 Wochen)
- [ ] Benutzer-Authentifizierung (Login/Register)
- [ ] Workspaces: Uni und Geschäftlich
- [ ] Projekte CRUD (erstellen, bearbeiten, archivieren, löschen)
- [ ] Aufgaben CRUD mit Zuweisung zu Projekten
- [ ] Unteraufgaben CRUD
- [ ] Deadlines und Prioritäten
- [ ] Status-Management (geplant, aktiv, wartend, abgeschlossen)
- [ ] Tags
- [ ] Dashboard mit Übersicht
- [ ] Aufgabenliste mit Filtern und Sortierung
- [ ] Responsive Design (Desktop + Mobile)

### Phase 2 – Kalender & Notifications (4 Wochen)
- [ ] Kalenderansicht (Tag, Woche, Monat)
- [ ] Erinnerungen und Benachrichtigungen
- [ ] Konfigurierbare Reminder
- [ ] Überfällige Aufgaben hervorheben

### Phase 3 – KI-Integration (4-6 Wochen)
- [ ] KI-Chat-Interface
- [ ] Projekt aus natürlicher Sprache erstellen
- [ ] Aufgaben aus Text extrahieren
- [ ] Aufgaben in Unteraufgaben zerlegen
- [ ] Priorisierungsvorschläge
- [ ] Tagesplanung vorschlagen
- [ ] Bestätigungs-Flow für KI-Aktionen

### Phase 4 – Export & Erweiterungen (3-4 Wochen)
- [ ] Kontextexport als Markdown
- [ ] Kontextexport als JSON
- [ ] Anonymisierungsoption
- [ ] Datenschutz-Hinweise bei Export geschäftlicher Daten

### Nice-to-have (Backlog)
- Drag-and-drop im Kalender
- Multi-User und Rollenmodell
- Zeiterfassung
- Wiederkehrende Aufgaben
- Kanban-Board-Ansicht
- iCal-Import/Export
- Mobile Native App
- Offline-Support
- Gantt-Diagramme
- Integration mit externen Kalendern (Google, Outlook)


---

## 4. Funktionale Anforderungen

### FA-01: Benutzerverwaltung
- FA-01.1: Nutzer kann sich registrieren (E-Mail + Passwort)
- FA-01.2: Nutzer kann sich einloggen/ausloggen
- FA-01.3: Passwort-Reset per E-Mail
- FA-01.4: Profil bearbeiten (Name, E-Mail, Präferenzen)

### FA-02: Workspace/Bereich-Verwaltung
- FA-02.1: Vordefinierte Bereiche: "Uni" und "Geschäftlich"
- FA-02.2: Nutzer kann eigene Bereiche erstellen
- FA-02.3: Jeder Bereich hat eigene Datenschutz-Einstellungen

### FA-03: Projektmanagement
- FA-03.1: Projekte erstellen mit Name, Beschreibung, Bereich, Status, Priorität
- FA-03.2: Projekte bearbeiten und löschen
- FA-03.3: Projekte archivieren (Soft-Delete)
- FA-03.4: Projektstatus: geplant, aktiv, wartend, abgeschlossen
- FA-03.5: Projekte nach Bereich, Status, Priorität filtern

### FA-04: Aufgabenmanagement
- FA-04.1: Aufgaben erstellen mit Titel, Beschreibung, Deadline, Priorität, Status, Tags
- FA-04.2: Aufgaben einem Projekt zuordnen
- FA-04.3: Aufgaben bearbeiten, löschen, abschließen
- FA-04.4: Aufgabenstatus: offen, in Bearbeitung, wartend, erledigt
- FA-04.5: Aufgaben filtern und sortieren
- FA-04.6: Schnellerfassung (Quick-Add) neuer Aufgaben

### FA-05: Unteraufgaben
- FA-05.1: Unteraufgaben zu Aufgaben hinzufügen
- FA-05.2: Unteraufgaben haben eigenen Status, Deadline, Notizen
- FA-05.3: Fortschritt der Hauptaufgabe aus Unteraufgaben berechnen
- FA-05.4: Unteraufgaben bearbeiten und löschen

### FA-06: Kalender
- FA-06.1: Kalenderansicht mit Tag, Woche, Monat
- FA-06.2: Aufgaben mit Deadline im Kalender anzeigen
- FA-06.3: Filter nach Bereich, Projekt, Priorität, Status
- FA-06.4: Kalendereinträge anklicken → Aufgabendetail öffnen

### FA-07: Erinnerungen
- FA-07.1: Reminder pro Aufgabe konfigurierbar (z.B. 1h, 1d, 1w vorher)
- FA-07.2: Benachrichtigung im Browser (Push-Notification)
- FA-07.3: Übersicht überfälliger Aufgaben im Dashboard

### FA-08: KI-Chat
- FA-08.1: Chat-Interface zur Interaktion mit KI
- FA-08.2: KI extrahiert Projekte, Aufgaben, Deadlines aus natürlicher Sprache
- FA-08.3: KI-Vorschläge werden vor Ausführung angezeigt
- FA-08.4: Nutzer muss Vorschläge bestätigen oder ablehnen
- FA-08.5: KI kann Priorisierung und Tagesplanung vorschlagen
- FA-08.6: KI kann Aufgaben in Unteraufgaben zerlegen

### FA-09: Kontextexport
- FA-09.1: Export eines Projekts/einer Aufgabe als Markdown
- FA-09.2: Export als JSON
- FA-09.3: Export enthält alle relevanten Kontextinformationen
- FA-09.4: Anonymisierungsoption für sensible Daten
- FA-09.5: Datenschutzhinweis bei geschäftlichen Exports

---

## 5. Nicht-funktionale Anforderungen

### NFA-01: Performance
- Seitenladezeit < 2 Sekunden
- API-Response-Zeit < 500ms für Standard-Operationen
- KI-Antworten < 10 Sekunden (abhängig vom Modell)

### NFA-02: Sicherheit
- Passwort-Hashing mit bcrypt (min. 12 Rounds)
- JWT-basierte Authentifizierung mit Refresh-Token
- HTTPS-only in Produktion
- Input-Validierung auf Client und Server
- Rate-Limiting für API-Endpunkte
- CORS korrekt konfiguriert

### NFA-03: Datenschutz
- Daten werden ausschließlich auf eigenem Server gespeichert
- KI-Kontext wird nur nach expliziter Nutzer-Freigabe gesendet
- Geschäftliche Daten erhalten zusätzliche Schutzmarkierung
- Löschung von Nutzerdaten auf Anfrage (DSGVO)
- Kein Tracking, keine Analytics ohne Einwilligung

### NFA-04: Verfügbarkeit
- Self-Hosted: Verfügbarkeit abhängig von eigener Infrastruktur
- Graceful Error Handling bei KI-API-Ausfall
- Offline-Fallback: Grundfunktionen ohne KI nutzbar

### NFA-05: Wartbarkeit
- TypeScript für Typ-Sicherheit
- Modulare Architektur
- Automatisierte Tests (Unit + Integration)
- CI/CD-Pipeline
- Dokumentierter Code

### NFA-06: Skalierbarkeit
- Architektur erlaubt späteren Multi-User-Betrieb
- Datenbankschema unterstützt mehrere Nutzer
- Stateless Backend (horizontal skalierbar)


---

## 6. User Stories und Akzeptanzkriterien

### US-01: Projekt erstellen
**Als** Nutzer **möchte ich** ein neues Projekt erstellen und einem Bereich zuordnen, **damit** ich meine Aufgaben strukturiert organisieren kann.

**Akzeptanzkriterien:**
- Nutzer kann Name, Beschreibung, Bereich und Priorität angeben
- Projekt erscheint in der Projektübersicht
- Projekt ist dem gewählten Bereich zugeordnet
- Validierung: Name ist Pflichtfeld

### US-02: Aufgabe schnell erstellen
**Als** Nutzer **möchte ich** eine Aufgabe schnell mit minimalem Aufwand erstellen, **damit** ich Ideen und Todos sofort festhalten kann.

**Akzeptanzkriterien:**
- Quick-Add-Feld ist von jeder Ansicht erreichbar
- Nur Titel ist Pflichtfeld
- Optional: Projekt, Deadline, Priorität direkt angeben
- Aufgabe erscheint sofort in der Liste

### US-03: Unteraufgaben verwalten
**Als** Nutzer **möchte ich** einer Aufgabe Unteraufgaben hinzufügen, **damit** ich komplexe Aufgaben in machbare Schritte zerlegen kann.

**Akzeptanzkriterien:**
- Unteraufgaben sind in der Aufgabendetailansicht sichtbar
- Fortschrittsbalken zeigt erledigte/gesamt Unteraufgaben
- Unteraufgaben haben eigenen Status und optionale Deadline
- Hauptaufgabe gilt als erledigt, wenn alle Unteraufgaben erledigt sind (optional konfigurierbar)

### US-04: Kalender nutzen
**Als** Nutzer **möchte ich** meine Aufgaben und Deadlines in einem Kalender sehen, **damit** ich meine Zeit besser planen kann.

**Akzeptanzkriterien:**
- Kalender zeigt Tages-, Wochen- und Monatsansicht
- Aufgaben mit Deadline erscheinen am entsprechenden Tag
- Klick auf Eintrag öffnet Aufgabendetails
- Filter nach Bereich und Projekt sind verfügbar

### US-05: KI-Chat nutzen
**Als** Nutzer **möchte ich** in natürlicher Sprache mit einer KI über meine Planung sprechen, **damit** ich schnell Projekte und Aufgaben erstellen kann.

**Akzeptanzkriterien:**
- Chat-Interface ist als eigene Ansicht erreichbar
- KI-Vorschläge werden visuell dargestellt (nicht sofort ausgeführt)
- Nutzer kann Vorschlag bestätigen oder ablehnen
- Nach Bestätigung werden Daten erstellt
- KI-Aktionen sind transparent nachvollziehbar

### US-06: Kontext exportieren
**Als** Nutzer **möchte ich** den vollständigen Kontext eines Projekts oder einer Aufgabe exportieren, **damit** ich mit einer anderen KI weiterarbeiten kann.

**Akzeptanzkriterien:**
- Export als Markdown und JSON verfügbar
- Export enthält alle relevanten Felder (siehe Exportformat)
- Bei geschäftlichen Daten erscheint Datenschutzhinweis
- Anonymisierungsoption ist verfügbar
- Download als Datei möglich

### US-07: Erinnerungen erhalten
**Als** Nutzer **möchte ich** vor Deadlines erinnert werden, **damit** ich keine wichtigen Termine verpasse.

**Akzeptanzkriterien:**
- Reminder sind pro Aufgabe konfigurierbar
- Standardmäßig: 1 Tag und 1 Stunde vorher
- Browser-Push-Notification wird ausgelöst
- Überfällige Aufgaben werden im Dashboard markiert

### US-08: Dashboard nutzen
**Als** Nutzer **möchte ich** auf einen Blick sehen, was heute und diese Woche ansteht, **damit** ich meinen Tag effizient planen kann.

**Akzeptanzkriterien:**
- Dashboard zeigt: Heute fällig, diese Woche fällig, überfällig
- Aufgaben nach Priorität sortiert
- Schnellzugriff auf aktive Projekte
- KI-Vorschlag für Tagesplanung (Phase 3)

### US-09: Bereiche trennen
**Als** Nutzer **möchte ich** meine Uni- und Geschäftsaufgaben klar getrennt sehen können, **damit** ich mich auf den jeweiligen Kontext konzentrieren kann.

**Akzeptanzkriterien:**
- Globaler Filter für Bereich (Alle / Uni / Geschäftlich)
- Projekte und Aufgaben sind einem Bereich zugeordnet
- Geschäftliche Daten sind als vertraulich markierbar
- Filter-Zustand bleibt erhalten

### US-10: KI-Vorschläge für Priorisierung
**Als** Nutzer **möchte ich** von der KI Vorschläge zur Priorisierung meiner Aufgaben erhalten, **damit** ich mich auf das Wichtigste konzentrieren kann.

**Akzeptanzkriterien:**
- KI analysiert Deadlines, Prioritäten und Abhängigkeiten
- Vorschlag wird als geordnete Liste präsentiert
- Nutzer kann Vorschlag übernehmen oder anpassen
- KI erklärt ihre Empfehlung


---

## 7. Domänenmodell

### Entitäten und Beziehungen

```
User (1) ──── (n) Workspace
User (1) ──── (n) Project
User (1) ──── (n) AIConversation

Workspace (1) ──── (n) Project
Project (1) ──── (n) Task
Task (1) ──── (n) Subtask
Task (1) ──── (n) Reminder
Task (n) ──── (m) Tag
Project (n) ──── (m) Tag

Task (1) ──── (0..n) CalendarEvent
AIConversation (1) ──── (n) AIMessage
ContextExport (1) ──── (1) Project|Task
```

### Entitäten mit Feldern

#### User
| Feld | Typ | Beschreibung |
|------|-----|--------------|
| id | UUID | Primärschlüssel |
| email | String | Eindeutig, für Login |
| passwordHash | String | bcrypt-Hash |
| name | String | Anzeigename |
| preferences | JSON | UI-Einstellungen, Sprache, etc. |
| createdAt | DateTime | Erstellungszeitpunkt |
| updatedAt | DateTime | Letzte Änderung |

#### Workspace
| Feld | Typ | Beschreibung |
|------|-----|--------------|
| id | UUID | Primärschlüssel |
| userId | UUID | FK → User |
| name | String | z.B. "Uni", "Geschäftlich" |
| type | Enum | UNI, BUSINESS, CUSTOM |
| privacyLevel | Enum | NORMAL, CONFIDENTIAL |
| color | String | Farbe für UI |
| createdAt | DateTime | |

#### Project
| Feld | Typ | Beschreibung |
|------|-----|--------------|
| id | UUID | Primärschlüssel |
| userId | UUID | FK → User |
| workspaceId | UUID | FK → Workspace |
| name | String | Projektname |
| description | Text | Ausführliche Beschreibung |
| goal | Text | Projektziel |
| status | Enum | PLANNED, ACTIVE, WAITING, COMPLETED, ARCHIVED |
| priority | Enum | LOW, MEDIUM, HIGH, URGENT |
| deadline | DateTime? | Optionale Projekt-Deadline |
| createdAt | DateTime | |
| updatedAt | DateTime | |
| archivedAt | DateTime? | |

#### Task
| Feld | Typ | Beschreibung |
|------|-----|--------------|
| id | UUID | Primärschlüssel |
| projectId | UUID | FK → Project |
| userId | UUID | FK → User |
| title | String | Aufgabentitel |
| description | Text | Ausführliche Beschreibung |
| status | Enum | OPEN, IN_PROGRESS, WAITING, DONE |
| priority | Enum | LOW, MEDIUM, HIGH, URGENT |
| deadline | DateTime? | Fälligkeitsdatum |
| completedAt | DateTime? | Abschlusszeitpunkt |
| position | Integer | Sortierung innerhalb Projekt |
| createdAt | DateTime | |
| updatedAt | DateTime | |

#### Subtask
| Feld | Typ | Beschreibung |
|------|-----|--------------|
| id | UUID | Primärschlüssel |
| taskId | UUID | FK → Task |
| title | String | Titel |
| status | Enum | OPEN, IN_PROGRESS, DONE |
| deadline | DateTime? | Optionale Deadline |
| notes | Text | Notizen |
| position | Integer | Sortierung |
| createdAt | DateTime | |
| updatedAt | DateTime | |

#### Tag
| Feld | Typ | Beschreibung |
|------|-----|--------------|
| id | UUID | Primärschlüssel |
| userId | UUID | FK → User |
| name | String | Tag-Name |
| color | String | Farbe |

#### Reminder
| Feld | Typ | Beschreibung |
|------|-----|--------------|
| id | UUID | Primärschlüssel |
| taskId | UUID | FK → Task |
| remindAt | DateTime | Erinnerungszeitpunkt |
| type | Enum | BROWSER_PUSH, EMAIL |
| sent | Boolean | Bereits gesendet? |
| createdAt | DateTime | |

#### CalendarEvent
| Feld | Typ | Beschreibung |
|------|-----|--------------|
| id | UUID | Primärschlüssel |
| taskId | UUID? | FK → Task (optional) |
| userId | UUID | FK → User |
| title | String | Titel |
| startDate | DateTime | Beginn |
| endDate | DateTime? | Ende |
| allDay | Boolean | Ganztägig? |
| createdAt | DateTime | |

#### AIConversation
| Feld | Typ | Beschreibung |
|------|-----|--------------|
| id | UUID | Primärschlüssel |
| userId | UUID | FK → User |
| title | String | Konversationstitel |
| context | JSON | Gesendeter Kontext |
| createdAt | DateTime | |
| updatedAt | DateTime | |

#### AIMessage
| Feld | Typ | Beschreibung |
|------|-----|--------------|
| id | UUID | Primärschlüssel |
| conversationId | UUID | FK → AIConversation |
| role | Enum | USER, ASSISTANT, SYSTEM |
| content | Text | Nachrichteninhalt |
| proposedActions | JSON? | Vorgeschlagene Aktionen |
| actionStatus | Enum? | PENDING, CONFIRMED, REJECTED |
| createdAt | DateTime | |

#### ContextExport
| Feld | Typ | Beschreibung |
|------|-----|--------------|
| id | UUID | Primärschlüssel |
| userId | UUID | FK → User |
| entityType | Enum | PROJECT, TASK |
| entityId | UUID | Referenz auf Projekt/Task |
| format | Enum | MARKDOWN, JSON |
| anonymized | Boolean | Anonymisiert? |
| content | Text | Exportierter Inhalt |
| createdAt | DateTime | |


---

## 8. Architekturentscheidung

### Vergleich der Tech-Stack-Optionen

| Kriterium | Option A: Next.js Full-Stack | Option B: React + Express | Option C: SvelteKit |
|-----------|------------------------------|---------------------------|---------------------|
| **Stack** | Next.js 14+ (App Router), Prisma, PostgreSQL | React (Vite), Express.js, Prisma, PostgreSQL | SvelteKit, Prisma, PostgreSQL |
| **Einfachheit** | ⭐⭐⭐⭐⭐ Alles in einem Projekt | ⭐⭐⭐ Zwei separate Projekte | ⭐⭐⭐⭐ Alles in einem, aber weniger verbreitet |
| **Erweiterbarkeit** | ⭐⭐⭐⭐ Server Actions, API Routes | ⭐⭐⭐⭐⭐ Klare Trennung FE/BE | ⭐⭐⭐⭐ Gut erweiterbar |
| **KI-Integration** | ⭐⭐⭐⭐⭐ Vercel AI SDK, Streaming | ⭐⭐⭐⭐ Manuell, aber flexibel | ⭐⭐⭐ Weniger KI-Libraries |
| **Kalender/Notifications** | ⭐⭐⭐⭐ Gute Libraries verfügbar | ⭐⭐⭐⭐ Gute Libraries verfügbar | ⭐⭐⭐ Weniger Auswahl |
| **Datenschutz** | ⭐⭐⭐⭐ Self-Hostable | ⭐⭐⭐⭐⭐ Volle Kontrolle | ⭐⭐⭐⭐ Self-Hostable |
| **Deployment** | ⭐⭐⭐⭐⭐ Docker oder Vercel | ⭐⭐⭐ Zwei Services deployen | ⭐⭐⭐⭐ Docker oder Node |
| **Community/Docs** | ⭐⭐⭐⭐⭐ Riesige Community | ⭐⭐⭐⭐⭐ Sehr verbreitet | ⭐⭐⭐ Kleiner |
| **Lernkurve** | ⭐⭐⭐⭐ Moderat | ⭐⭐⭐ Mehr Boilerplate | ⭐⭐⭐⭐ Einfach, aber anders |

### Empfehlung: Option A – Next.js Full-Stack

**Begründung:**
1. **Ein Projekt, ein Deployment**: Kein separates Backend nötig – reduziert Komplexität massiv
2. **Vercel AI SDK**: Erstklassige KI-Integration mit Streaming, Tool-Calls und strukturierter Ausgabe
3. **Server Components + Server Actions**: Sichere Datenbankzugriffe ohne separate API
4. **Prisma ORM**: Type-safe Datenbankzugriffe mit Migrations
5. **Große Community**: Viele Tutorials, Beispiele und Libraries
6. **Self-Hostable**: Docker-Deployment problemlos möglich
7. **TypeScript End-to-End**: Typ-Sicherheit von DB bis UI

### Gewählter Tech-Stack

| Schicht | Technologie |
|---------|-------------|
| **Framework** | Next.js 14+ (App Router) |
| **Sprache** | TypeScript |
| **UI-Library** | React 18+ |
| **Styling** | Tailwind CSS + shadcn/ui |
| **State Management** | React Server Components + Zustand (Client) |
| **Datenbank** | PostgreSQL |
| **ORM** | Prisma |
| **Auth** | NextAuth.js (Auth.js v5) |
| **KI** | Vercel AI SDK + OpenAI/Anthropic/Ollama |
| **Kalender** | FullCalendar oder eigene Implementierung |
| **Notifications** | Web Push API + Service Worker |
| **Validierung** | Zod |
| **Testing** | Vitest + Playwright |
| **Deployment** | Docker (Self-Hosted) |


---

## 9. Systemdesign

### Gesamtarchitektur

```
┌─────────────────────────────────────────────────────┐
│                    Client (Browser)                   │
│  ┌──────────────────────────────────────────────┐   │
│  │          Next.js Frontend (React)             │   │
│  │  ┌─────────┐ ┌─────────┐ ┌──────────────┐   │   │
│  │  │Dashboard│ │Kalender │ │  KI-Chat     │   │   │
│  │  └─────────┘ └─────────┘ └──────────────┘   │   │
│  └──────────────────────────────────────────────┘   │
│  Service Worker (Push Notifications)                 │
└─────────────────────────────────────────────────────┘
                        │
                        │ HTTPS
                        ▼
┌─────────────────────────────────────────────────────┐
│                Next.js Backend (Node.js)              │
│  ┌────────────┐ ┌────────────┐ ┌────────────────┐  │
│  │ API Routes │ │Server      │ │ Server Actions │  │
│  │            │ │Components  │ │                │  │
│  └──────┬─────┘ └─────┬──────┘ └───────┬────────┘  │
│         │              │                │           │
│  ┌──────┴──────────────┴────────────────┴────────┐  │
│  │              Service Layer                     │  │
│  │  ┌──────┐ ┌──────┐ ┌──────┐ ┌─────────────┐  │  │
│  │  │Auth  │ │Task  │ │Export│ │Notification │  │  │
│  │  │Svc   │ │Svc   │ │Svc  │ │Service      │  │  │
│  │  └──────┘ └──────┘ └──────┘ └─────────────┘  │  │
│  │  ┌──────┐ ┌──────────────┐ ┌─────────────┐   │  │
│  │  │Cal.  │ │AI Service    │ │Privacy      │   │  │
│  │  │Svc   │ │(Prompt+Parse)│ │Service      │   │  │
│  │  └──────┘ └──────┬───────┘ └─────────────┘   │  │
│  └─────────────────────────────────────────────────┘│
│         │              │                            │
│  ┌──────┴──────┐ ┌────┴────┐                       │
│  │  Prisma ORM │ │ AI API  │                       │
│  └──────┬──────┘ │(OpenAI/ │                       │
│         │        │Ollama)  │                       │
│         ▼        └─────────┘                       │
│  ┌─────────────┐                                    │
│  │ PostgreSQL  │                                    │
│  └─────────────┘                                    │
└─────────────────────────────────────────────────────┘
```

### Frontend-Struktur

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth-Gruppe (Login, Register)
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── (app)/                    # Authentifizierte App
│   │   ├── dashboard/page.tsx
│   │   ├── projects/
│   │   │   ├── page.tsx          # Projektliste
│   │   │   └── [id]/page.tsx     # Projektdetail
│   │   ├── tasks/
│   │   │   ├── page.tsx          # Aufgabenliste
│   │   │   └── [id]/page.tsx     # Aufgabendetail
│   │   ├── calendar/page.tsx
│   │   ├── ai-chat/page.tsx
│   │   ├── export/page.tsx
│   │   └── settings/page.tsx
│   ├── api/                      # API Routes
│   │   ├── projects/
│   │   ├── tasks/
│   │   ├── ai/
│   │   ├── export/
│   │   └── notifications/
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/                       # shadcn/ui Basis-Komponenten
│   ├── layout/                   # Navigation, Sidebar, Header
│   ├── projects/                 # Projekt-spezifische Komponenten
│   ├── tasks/                    # Task-spezifische Komponenten
│   ├── calendar/                 # Kalender-Komponenten
│   ├── ai-chat/                  # KI-Chat-Komponenten
│   └── export/                   # Export-Komponenten
├── lib/
│   ├── db.ts                     # Prisma Client
│   ├── auth.ts                   # Auth-Konfiguration
│   ├── ai/                       # KI-Integration
│   │   ├── client.ts
│   │   ├── prompts/
│   │   └── parsers/
│   ├── services/                 # Business Logic
│   │   ├── project.service.ts
│   │   ├── task.service.ts
│   │   ├── export.service.ts
│   │   ├── notification.service.ts
│   │   └── calendar.service.ts
│   ├── validators/               # Zod Schemas
│   └── utils/
├── hooks/                        # Custom React Hooks
├── stores/                       # Zustand Stores
├── types/                        # TypeScript Types
└── prisma/
    ├── schema.prisma
    └── migrations/
```

### Backend-Struktur (integriert in Next.js)

Die Backend-Logik ist in `lib/services/` organisiert:

- **AuthService**: Login, Register, Session-Management
- **ProjectService**: CRUD-Operationen für Projekte
- **TaskService**: CRUD für Aufgaben und Unteraufgaben
- **CalendarService**: Kalender-Daten aggregieren
- **AIService**: Prompt-Erstellung, API-Calls, Response-Parsing
- **ExportService**: Markdown/JSON-Export mit Anonymisierung
- **NotificationService**: Reminder-Scheduling, Push-Notifications
- **PrivacyService**: Datenschutz-Prüfungen, Anonymisierung

### Authentifizierung

- NextAuth.js (Auth.js v5) mit Credentials Provider
- JWT-Sessions (stateless)
- Optional: OAuth (GitHub, Google) für spätere Erweiterung
- Middleware schützt alle `/app/(app)` Routes
- Refresh-Token-Rotation für Sicherheit


---

## 10. KI-Integration

### Architektur

```
┌──────────┐     ┌────────────────┐     ┌──────────────┐
│  Nutzer  │────▶│  AI Chat UI    │────▶│  AI Service  │
│  Input   │     │  (Streaming)   │     │  (Backend)   │
└──────────┘     └────────────────┘     └──────┬───────┘
                                               │
                        ┌──────────────────────┤
                        │                      │
                        ▼                      ▼
                 ┌─────────────┐      ┌─────────────────┐
                 │ Prompt       │      │ Context Builder  │
                 │ Templates    │      │ (DB → Kontext)   │
                 └──────┬──────┘      └─────────────────┘
                        │
                        ▼
                 ┌─────────────┐
                 │ LLM API     │
                 │ (OpenAI/    │
                 │  Ollama)    │
                 └──────┬──────┘
                        │
                        ▼
                 ┌─────────────┐
                 │ Response     │
                 │ Parser       │
                 └──────┬──────┘
                        │
                        ▼
                 ┌─────────────────────────┐
                 │ Proposed Actions        │
                 │ (Projekt/Task erstellen,│
                 │  Priorisierung, etc.)   │
                 └──────────┬──────────────┘
                            │
                            ▼
                 ┌─────────────────────────┐
                 │ Nutzer-Bestätigung      │
                 │ ✅ Bestätigen           │
                 │ ❌ Ablehnen             │
                 │ ✏️ Bearbeiten           │
                 └──────────┬──────────────┘
                            │ (bei Bestätigung)
                            ▼
                 ┌─────────────────────────┐
                 │ Daten in DB schreiben   │
                 └─────────────────────────┘
```

### KI-Flow im Detail

1. **Kontext laden**: Relevante Projekte/Aufgaben des Nutzers werden als Kontext bereitgestellt
2. **Nutzer-Eingabe**: Natürliche Sprache im Chat
3. **Prompt zusammenbauen**: System-Prompt + Kontext + Nutzernachricht
4. **LLM-Aufruf**: Streaming-Response mit strukturierter Ausgabe (JSON)
5. **Parsing**: Response wird in typisierte Actions geparst
6. **Anzeige**: Actions werden dem Nutzer visuell präsentiert
7. **Bestätigung**: Nutzer prüft und bestätigt/lehnt ab
8. **Ausführung**: Bestätigte Actions werden in der DB umgesetzt

### Sicherheitsregeln für KI-Aktionen

| Regel | Beschreibung |
|-------|-------------|
| SR-01 | KI darf NIEMALS Daten ohne Nutzerbestätigung ändern |
| SR-02 | KI darf KEINE geschäftlichen Daten an externe APIs senden, ohne Freigabe |
| SR-03 | KI-Kontext wird auf das Minimum beschränkt (nur relevante Projekte) |
| SR-04 | Nutzer sieht VOR dem API-Call, welche Daten gesendet werden |
| SR-05 | KI-Aktionen werden geloggt (AIMessage mit proposedActions) |
| SR-06 | Maximal 10 Aktionen pro KI-Vorschlag (Begrenzung) |
| SR-07 | KI darf keine Nutzer-Accounts oder Sicherheitseinstellungen ändern |
| SR-08 | Bei Ollama/lokalem LLM: Keine Daten verlassen den Server |

### Prompt-Templates

#### Template 1: Aufgabe aus Text erstellen
```
Du bist ein Planungsassistent. Extrahiere aus der folgenden Nutzereingabe eine oder mehrere Aufgaben.

Antworte ausschließlich im folgenden JSON-Format:
{
  "actions": [
    {
      "type": "create_task",
      "title": "...",
      "description": "...",
      "deadline": "YYYY-MM-DD" oder null,
      "priority": "LOW|MEDIUM|HIGH|URGENT",
      "projectId": "..." oder null,
      "subtasks": [
        { "title": "...", "deadline": "..." }
      ]
    }
  ]
}

Kontext des Nutzers:
{{user_context}}

Nutzereingabe:
{{user_input}}
```

#### Template 2: Projekt aus Text erstellen
```
Du bist ein Planungsassistent. Erstelle aus der folgenden Beschreibung ein Projekt mit Aufgaben.

Antworte im JSON-Format:
{
  "actions": [
    {
      "type": "create_project",
      "name": "...",
      "description": "...",
      "goal": "...",
      "workspace": "UNI|BUSINESS",
      "deadline": "YYYY-MM-DD" oder null,
      "tasks": [
        {
          "title": "...",
          "deadline": "...",
          "priority": "...",
          "subtasks": [...]
        }
      ]
    }
  ]
}

Nutzereingabe:
{{user_input}}
```

#### Template 3: Aufgabe in Unteraufgaben zerlegen
```
Du bist ein Planungsassistent. Zerlege die folgende Aufgabe in sinnvolle Unteraufgaben.

Aktuelle Aufgabe:
- Titel: {{task_title}}
- Beschreibung: {{task_description}}
- Deadline: {{task_deadline}}

Antworte im JSON-Format:
{
  "actions": [
    {
      "type": "create_subtasks",
      "taskId": "{{task_id}}",
      "subtasks": [
        { "title": "...", "deadline": "...", "notes": "..." }
      ]
    }
  ]
}
```

#### Template 4: Tagesplanung vorschlagen
```
Du bist ein Planungsassistent. Schlage eine sinnvolle Tagesplanung basierend auf den offenen Aufgaben vor.

Heutiges Datum: {{today}}
Offene Aufgaben: {{open_tasks}}

Priorisiere nach: Deadline-Nähe, Priorität, geschätzte Dauer.

Antworte im JSON-Format:
{
  "actions": [
    {
      "type": "daily_plan",
      "tasks": [
        { "taskId": "...", "order": 1, "reason": "..." }
      ],
      "explanation": "..."
    }
  ]
}
```

#### Template 5: Kontext für externe KI exportieren
```
Fasse den folgenden Projektkontext so zusammen, dass eine andere KI damit weiterarbeiten kann.

Projekt: {{project_data}}
Aufgaben: {{tasks_data}}

Strukturiere die Ausgabe wie folgt:
- Projektziel
- Aktueller Stand
- Offene Aufgaben mit Priorität
- Nächste sinnvolle Schritte
- Offene Fragen
- Empfohlenes Ausgabeformat
```


---

## 11. Kontext-Export

### Markdown-Exportformat

```markdown
# Projekt: [Projektname]

## Metadaten
- **Bereich:** Uni / Geschäftlich
- **Status:** Aktiv
- **Priorität:** Hoch
- **Deadline:** 2026-10-20
- **Erstellt:** 2026-08-01

## Ziel
[Projektziel-Beschreibung]

## Beschreibung
[Ausführliche Projektbeschreibung]

## Aufgaben

### ✅ Literaturrecherche [ERLEDIGT]
- **Deadline:** 2026-08-15
- **Priorität:** Hoch
- **Unteraufgaben:**
  - [x] Papers suchen
  - [x] Papers lesen und zusammenfassen
  - [x] Literaturverzeichnis erstellen

### 🔄 Gliederung erstellen [IN BEARBEITUNG]
- **Deadline:** 2026-09-01
- **Priorität:** Hoch
- **Unteraufgaben:**
  - [x] Kapitelstruktur entwerfen
  - [ ] Mit Betreuer besprechen
  - [ ] Gliederung finalisieren

### ⬜ Kapitel schreiben [OFFEN]
- **Deadline:** 2026-10-01
- **Priorität:** Mittel

## Notizen und Entscheidungen
- Betreuer bevorzugt IEEE-Format
- Fokus auf praktische Evaluation

## Offene Fragen
- Welches Framework für die Evaluation?
- Umfang der Nutzerstudie?

## Nächster Schritt
Gliederung mit Betreuer besprechen und Feedback einarbeiten.

## Gewünschtes Ausgabeformat
Bitte antworte mit konkreten Vorschlägen für die Kapitelstruktur im Markdown-Format.

---
⚠️ DATENSCHUTZHINWEIS: Dieses Dokument enthält [keine] vertraulichen geschäftlichen Informationen.
```

### JSON-Exportformat

```json
{
  "export": {
    "version": "1.0",
    "exportedAt": "2026-08-03T10:00:00Z",
    "format": "smartplanner-context-v1"
  },
  "metadata": {
    "entityType": "project",
    "workspace": "UNI",
    "privacyLevel": "NORMAL",
    "anonymized": false
  },
  "project": {
    "name": "Bachelorarbeit",
    "goal": "Bachelorarbeit zum Thema KI-gestützte Planung fertigstellen",
    "description": "Entwicklung und Evaluation einer KI-basierten Planner-App",
    "status": "ACTIVE",
    "priority": "HIGH",
    "deadline": "2026-10-20",
    "createdAt": "2026-08-01"
  },
  "tasks": [
    {
      "title": "Literaturrecherche",
      "status": "DONE",
      "priority": "HIGH",
      "deadline": "2026-08-15",
      "completedAt": "2026-08-14",
      "subtasks": [
        { "title": "Papers suchen", "status": "DONE" },
        { "title": "Papers lesen und zusammenfassen", "status": "DONE" },
        { "title": "Literaturverzeichnis erstellen", "status": "DONE" }
      ]
    },
    {
      "title": "Gliederung erstellen",
      "status": "IN_PROGRESS",
      "priority": "HIGH",
      "deadline": "2026-09-01",
      "subtasks": [
        { "title": "Kapitelstruktur entwerfen", "status": "DONE" },
        { "title": "Mit Betreuer besprechen", "status": "OPEN" },
        { "title": "Gliederung finalisieren", "status": "OPEN" }
      ]
    }
  ],
  "notes": [
    "Betreuer bevorzugt IEEE-Format",
    "Fokus auf praktische Evaluation"
  ],
  "decisions": [
    "IEEE-Zitierformat verwenden",
    "Praktische Evaluation statt rein theoretisch"
  ],
  "openQuestions": [
    "Welches Framework für die Evaluation?",
    "Umfang der Nutzerstudie?"
  ],
  "nextStep": "Gliederung mit Betreuer besprechen und Feedback einarbeiten",
  "desiredOutputFormat": "Konkrete Vorschläge für Kapitelstruktur als Markdown",
  "privacy": {
    "containsConfidentialData": false,
    "anonymizationApplied": false,
    "notice": "Dieses Dokument enthält keine vertraulichen geschäftlichen Informationen."
  }
}
```

### Anonymisierung

Bei aktivierter Anonymisierung werden folgende Felder ersetzt:
- Personennamen → "[Person A]", "[Person B]"
- Firmennamen → "[Unternehmen]"
- E-Mail-Adressen → "[E-Mail entfernt]"
- Telefonnummern → "[Telefon entfernt]"
- Spezifische Projektinterna → "[Details anonymisiert]"


---

## 12. UI/UX-Konzept

### Hauptscreens

#### 1. Dashboard
- Übersicht: Heute fällig, diese Woche, überfällig
- Aktive Projekte (Top 5)
- Fortschrittsanzeige pro Projekt
- Quick-Add für neue Aufgaben
- Optional: KI-Tagesplanung-Widget

#### 2. Projektübersicht
- Kachelansicht oder Listenansicht (umschaltbar)
- Filter: Bereich, Status, Priorität
- Suche nach Projektname
- Projekt-Karte: Name, Status, Fortschritt, Deadline, Bereich-Badge

#### 3. Projektdetail
- Projektinformationen (editierbar)
- Aufgabenliste des Projekts
- Fortschrittsbalken
- Aktionen: Bearbeiten, Archivieren, Exportieren

#### 4. Aufgabenliste
- Globale Aufgabenliste (alle Projekte)
- Filter: Bereich, Projekt, Status, Priorität, Tags
- Sortierung: Deadline, Priorität, Erstellungsdatum
- Quick-Add-Zeile oben
- Checkbox zum Abschließen

#### 5. Aufgabendetail
- Titel, Beschreibung, Metadaten
- Unteraufgaben mit Fortschritt
- Reminder konfigurieren
- Tags bearbeiten
- Export-Button

#### 6. Kalenderansicht
- Tages-/Wochen-/Monatsansicht (Tabs)
- Aufgaben als farbige Einträge (Farbe = Bereich/Priorität)
- Klick öffnet Aufgabendetail
- Filterleiste oben

#### 7. KI-Chat
- Chat-Interface (ähnlich ChatGPT)
- Nachrichtenverlauf
- Vorschläge werden als Karten dargestellt
- Bestätigungs-Buttons pro Vorschlag
- Kontext-Indikator: "KI sieht: Projekt X, Y offene Aufgaben"

#### 8. Export-Ansicht
- Projekt oder Aufgabe auswählen
- Format wählen: Markdown / JSON
- Anonymisierung an/aus
- Vorschau des Exports
- Download-Button
- Datenschutzhinweis für geschäftliche Daten

#### 9. Einstellungen
- Profil bearbeiten
- KI-Konfiguration (API-Key, Modell, lokaler Endpunkt)
- Benachrichtigungs-Einstellungen
- Datenschutz-Einstellungen
- Theme (Hell/Dunkel)

### Navigation

```
┌─────────────────────────────────────────────┐
│  🏠 SmartPlanner        [Bereich: Alle ▾]  │
├──────────┬──────────────────────────────────┤
│ Sidebar  │         Hauptbereich             │
│          │                                  │
│ 📊 Dashboard                                │
│ 📁 Projekte                                 │
│ ✅ Aufgaben                                  │
│ 📅 Kalender                                  │
│ 🤖 KI-Chat                                   │
│ 📤 Export                                    │
│ ⚙️ Einstellungen                              │
│          │                                  │
│ ──────── │                                  │
│ Quick-Add│                                  │
│ [+ Neue  │                                  │
│  Aufgabe]│                                  │
└──────────┴──────────────────────────────────┘
```

### Mobile Navigation
- Bottom Tab Bar mit: Dashboard, Aufgaben, Kalender, KI-Chat, Mehr
- Sidebar wird zu Hamburger-Menü
- Quick-Add als Floating Action Button

### Filter, Suche und Sortierung
- **Globale Suche**: Über Header erreichbar, sucht in Projekten und Aufgaben
- **Filter-Bar**: In Listen-Ansichten, kombinierbare Filter-Chips
- **Sortierung**: Dropdown in Listen (Deadline, Priorität, Name, Erstellt)
- **Bereichs-Filter**: Global im Header, filtert gesamte App


---

## 13. Datenbankmodell

### Entscheidung: Relationale Datenbank (PostgreSQL)

**Begründung:**
- Klare Beziehungen zwischen Entitäten (1:n, n:m)
- ACID-Compliance für Datenintegrität
- Prisma unterstützt PostgreSQL erstklassig
- JSON-Felder für flexible Daten (Preferences, AI-Context)
- Hervorragende Volltextsuche
- Free-Tier bei vielen Anbietern (oder lokal per Docker)

### Prisma Schema (Übersicht)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id           String    @id @default(uuid())
  email        String    @unique
  passwordHash String
  name         String
  preferences  Json      @default("{}")
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt

  workspaces      Workspace[]
  projects        Project[]
  tasks           Task[]
  tags            Tag[]
  aiConversations AIConversation[]
  contextExports  ContextExport[]
}

model Workspace {
  id           String        @id @default(uuid())
  userId       String
  name         String
  type         WorkspaceType
  privacyLevel PrivacyLevel  @default(NORMAL)
  color        String        @default("#3B82F6")
  createdAt    DateTime      @default(now())

  user     User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  projects Project[]

  @@index([userId])
}

model Project {
  id          String        @id @default(uuid())
  userId      String
  workspaceId String
  name        String
  description String?       @db.Text
  goal        String?       @db.Text
  status      ProjectStatus @default(PLANNED)
  priority    Priority      @default(MEDIUM)
  deadline    DateTime?
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt
  archivedAt  DateTime?

  user      User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  workspace Workspace @relation(fields: [workspaceId], references: [id])
  tasks     Task[]
  tags      Tag[]     @relation("ProjectTags")

  @@index([userId])
  @@index([workspaceId])
  @@index([status])
  @@index([deadline])
}

model Task {
  id          String     @id @default(uuid())
  projectId   String
  userId      String
  title       String
  description String?    @db.Text
  status      TaskStatus @default(OPEN)
  priority    Priority   @default(MEDIUM)
  deadline    DateTime?
  completedAt DateTime?
  position    Int        @default(0)
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt

  project   Project   @relation(fields: [projectId], references: [id], onDelete: Cascade)
  user      User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  subtasks  Subtask[]
  reminders Reminder[]
  tags      Tag[]     @relation("TaskTags")
  calendarEvents CalendarEvent[]

  @@index([projectId])
  @@index([userId])
  @@index([status])
  @@index([deadline])
  @@index([priority])
}

model Subtask {
  id        String       @id @default(uuid())
  taskId    String
  title     String
  status    SubtaskStatus @default(OPEN)
  deadline  DateTime?
  notes     String?      @db.Text
  position  Int          @default(0)
  createdAt DateTime     @default(now())
  updatedAt DateTime     @updatedAt

  task Task @relation(fields: [taskId], references: [id], onDelete: Cascade)

  @@index([taskId])
}

model Tag {
  id     String @id @default(uuid())
  userId String
  name   String
  color  String @default("#6B7280")

  user     User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  projects Project[] @relation("ProjectTags")
  tasks    Task[]    @relation("TaskTags")

  @@unique([userId, name])
}

model Reminder {
  id        String       @id @default(uuid())
  taskId    String
  remindAt  DateTime
  type      ReminderType @default(BROWSER_PUSH)
  sent      Boolean      @default(false)
  createdAt DateTime     @default(now())

  task Task @relation(fields: [taskId], references: [id], onDelete: Cascade)

  @@index([taskId])
  @@index([remindAt, sent])
}

model CalendarEvent {
  id        String   @id @default(uuid())
  taskId    String?
  userId    String
  title     String
  startDate DateTime
  endDate   DateTime?
  allDay    Boolean  @default(false)
  createdAt DateTime @default(now())

  task Task? @relation(fields: [taskId], references: [id], onDelete: SetNull)

  @@index([userId, startDate])
}

model AIConversation {
  id        String   @id @default(uuid())
  userId    String
  title     String   @default("Neue Konversation")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  user     User        @relation(fields: [userId], references: [id], onDelete: Cascade)
  messages AIMessage[]

  @@index([userId])
}

model AIMessage {
  id              String        @id @default(uuid())
  conversationId  String
  role            MessageRole
  content         String        @db.Text
  proposedActions Json?
  actionStatus    ActionStatus?
  createdAt       DateTime      @default(now())

  conversation AIConversation @relation(fields: [conversationId], references: [id], onDelete: Cascade)

  @@index([conversationId])
}

model ContextExport {
  id         String     @id @default(uuid())
  userId     String
  entityType EntityType
  entityId   String
  format     ExportFormat
  anonymized Boolean    @default(false)
  content    String     @db.Text
  createdAt  DateTime   @default(now())

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
}

// Enums
enum WorkspaceType {
  UNI
  BUSINESS
  CUSTOM
}

enum PrivacyLevel {
  NORMAL
  CONFIDENTIAL
}

enum ProjectStatus {
  PLANNED
  ACTIVE
  WAITING
  COMPLETED
  ARCHIVED
}

enum TaskStatus {
  OPEN
  IN_PROGRESS
  WAITING
  DONE
}

enum SubtaskStatus {
  OPEN
  IN_PROGRESS
  DONE
}

enum Priority {
  LOW
  MEDIUM
  HIGH
  URGENT
}

enum ReminderType {
  BROWSER_PUSH
  EMAIL
}

enum MessageRole {
  USER
  ASSISTANT
  SYSTEM
}

enum ActionStatus {
  PENDING
  CONFIRMED
  REJECTED
}

enum EntityType {
  PROJECT
  TASK
}

enum ExportFormat {
  MARKDOWN
  JSON
}
```

### Wichtige Indizes

| Tabelle | Index | Grund |
|---------|-------|-------|
| Task | (deadline, status) | Kalender-Queries, Fällige Aufgaben |
| Task | (projectId, position) | Sortierte Aufgabenliste |
| Reminder | (remindAt, sent) | Cron-Job für Benachrichtigungen |
| CalendarEvent | (userId, startDate) | Kalenderansicht laden |
| Project | (workspaceId, status) | Gefilterte Projektliste |


---

## 14. API-Konzept

### REST API Endpunkte

#### Authentifizierung
| Methode | Endpunkt | Beschreibung |
|---------|----------|--------------|
| POST | /api/auth/register | Registrierung |
| POST | /api/auth/login | Login |
| POST | /api/auth/logout | Logout |
| POST | /api/auth/refresh | Token erneuern |
| GET | /api/auth/me | Aktueller Nutzer |

#### Workspaces
| Methode | Endpunkt | Beschreibung |
|---------|----------|--------------|
| GET | /api/workspaces | Alle Workspaces des Nutzers |
| POST | /api/workspaces | Workspace erstellen |
| PUT | /api/workspaces/:id | Workspace bearbeiten |
| DELETE | /api/workspaces/:id | Workspace löschen |

#### Projekte
| Methode | Endpunkt | Beschreibung |
|---------|----------|--------------|
| GET | /api/projects | Projekte auflisten (mit Filtern) |
| POST | /api/projects | Projekt erstellen |
| GET | /api/projects/:id | Projektdetails |
| PUT | /api/projects/:id | Projekt bearbeiten |
| DELETE | /api/projects/:id | Projekt löschen |
| PATCH | /api/projects/:id/archive | Projekt archivieren |

#### Aufgaben
| Methode | Endpunkt | Beschreibung |
|---------|----------|--------------|
| GET | /api/tasks | Aufgaben auflisten (mit Filtern) |
| POST | /api/tasks | Aufgabe erstellen |
| GET | /api/tasks/:id | Aufgabendetails |
| PUT | /api/tasks/:id | Aufgabe bearbeiten |
| DELETE | /api/tasks/:id | Aufgabe löschen |
| PATCH | /api/tasks/:id/status | Status ändern |

#### Unteraufgaben
| Methode | Endpunkt | Beschreibung |
|---------|----------|--------------|
| GET | /api/tasks/:taskId/subtasks | Unteraufgaben einer Aufgabe |
| POST | /api/tasks/:taskId/subtasks | Unteraufgabe erstellen |
| PUT | /api/subtasks/:id | Unteraufgabe bearbeiten |
| DELETE | /api/subtasks/:id | Unteraufgabe löschen |
| PATCH | /api/subtasks/:id/status | Status ändern |

#### Kalender
| Methode | Endpunkt | Beschreibung |
|---------|----------|--------------|
| GET | /api/calendar?start=...&end=... | Kalendereinträge im Zeitraum |
| POST | /api/calendar/events | Kalendereintrag erstellen |

#### KI
| Methode | Endpunkt | Beschreibung |
|---------|----------|--------------|
| GET | /api/ai/conversations | Konversationen auflisten |
| POST | /api/ai/conversations | Neue Konversation |
| POST | /api/ai/chat | Nachricht senden (Streaming) |
| POST | /api/ai/confirm | Vorschlag bestätigen |
| POST | /api/ai/reject | Vorschlag ablehnen |

#### Export
| Methode | Endpunkt | Beschreibung |
|---------|----------|--------------|
| POST | /api/export/project/:id | Projekt exportieren |
| POST | /api/export/task/:id | Aufgabe exportieren |
| GET | /api/export/history | Export-Historie |

#### Tags
| Methode | Endpunkt | Beschreibung |
|---------|----------|--------------|
| GET | /api/tags | Alle Tags |
| POST | /api/tags | Tag erstellen |
| DELETE | /api/tags/:id | Tag löschen |

### Request/Response-Beispiele

#### Projekt erstellen (POST /api/projects)

**Request:**
```json
{
  "name": "Bachelorarbeit",
  "description": "KI-gestützte Planner-App entwickeln und evaluieren",
  "goal": "Abgabe bis 20.10.2026",
  "workspaceId": "ws-uuid-uni",
  "priority": "HIGH",
  "deadline": "2026-10-20"
}
```

**Response (201):**
```json
{
  "id": "proj-uuid-123",
  "name": "Bachelorarbeit",
  "description": "KI-gestützte Planner-App entwickeln und evaluieren",
  "goal": "Abgabe bis 20.10.2026",
  "workspaceId": "ws-uuid-uni",
  "workspace": { "name": "Uni", "type": "UNI" },
  "status": "PLANNED",
  "priority": "HIGH",
  "deadline": "2026-10-20T00:00:00Z",
  "taskCount": 0,
  "completedTaskCount": 0,
  "createdAt": "2026-08-03T10:00:00Z"
}
```

#### KI-Chat (POST /api/ai/chat)

**Request:**
```json
{
  "conversationId": "conv-uuid-456",
  "message": "Erstelle mir ein Projekt für die Bachelorarbeit mit Literaturrecherche, Gliederung und Abgabe bis 20.10.",
  "context": {
    "includeProjects": true,
    "workspaceFilter": "UNI"
  }
}
```

**Response (200, Streaming):**
```json
{
  "messageId": "msg-uuid-789",
  "role": "ASSISTANT",
  "content": "Ich schlage folgendes Projekt mit Aufgaben vor:",
  "proposedActions": [
    {
      "type": "create_project",
      "data": {
        "name": "Bachelorarbeit",
        "workspace": "UNI",
        "deadline": "2026-10-20",
        "tasks": [
          {
            "title": "Literaturrecherche",
            "deadline": "2026-08-30",
            "priority": "HIGH"
          },
          {
            "title": "Gliederung erstellen",
            "deadline": "2026-09-15",
            "priority": "HIGH"
          },
          {
            "title": "Arbeit schreiben",
            "deadline": "2026-10-10",
            "priority": "HIGH"
          },
          {
            "title": "Abgabe vorbereiten",
            "deadline": "2026-10-20",
            "priority": "URGENT"
          }
        ]
      }
    }
  ],
  "actionStatus": "PENDING"
}
```

#### KI-Vorschlag bestätigen (POST /api/ai/confirm)

**Request:**
```json
{
  "messageId": "msg-uuid-789",
  "confirmedActions": [0]
}
```

**Response (200):**
```json
{
  "success": true,
  "created": {
    "project": { "id": "proj-uuid-new", "name": "Bachelorarbeit" },
    "tasks": [
      { "id": "task-1", "title": "Literaturrecherche" },
      { "id": "task-2", "title": "Gliederung erstellen" },
      { "id": "task-3", "title": "Arbeit schreiben" },
      { "id": "task-4", "title": "Abgabe vorbereiten" }
    ]
  }
}
```

#### Export (POST /api/export/project/:id)

**Request:**
```json
{
  "format": "MARKDOWN",
  "anonymize": false,
  "includeTasks": true,
  "includeSubtasks": true,
  "includeNotes": true
}
```

**Response (200):**
```json
{
  "id": "export-uuid",
  "format": "MARKDOWN",
  "content": "# Projekt: Bachelorarbeit\n\n## Metadaten\n...",
  "privacy": {
    "containsConfidentialData": false,
    "notice": null
  },
  "createdAt": "2026-08-03T10:00:00Z"
}
```


---

## 15. Datenschutz und Sicherheit

### Datenschutz-Architektur

| Ebene | Maßnahme |
|-------|----------|
| **Speicherung** | Alle Daten auf eigenem Server (PostgreSQL in Docker) |
| **Übertragung** | HTTPS-only, TLS 1.3 |
| **Authentifizierung** | bcrypt-Hashing, JWT mit kurzer Lebensdauer |
| **KI-Daten** | Nutzer wählt explizit, welcher Kontext an KI gesendet wird |
| **Geschäftsdaten** | Zusätzliche Markierung als "vertraulich" |
| **Export** | Datenschutzhinweis + Anonymisierungsoption |
| **Löschung** | Vollständige Datenlöschung auf Anfrage (DSGVO Art. 17) |
| **Logging** | Kein Logging sensibler Inhalte, nur Metadaten |

### KI-Datenschutz-Regeln

1. **Opt-in Kontext**: KI erhält nur Daten, die der Nutzer freigibt
2. **Kontext-Vorschau**: Nutzer sieht vor dem Senden, welche Daten an die KI gehen
3. **Lokale Option**: Bei Ollama verlassen keine Daten den Server
4. **Kein Trainieren**: Daten werden nicht zum Training externer Modelle verwendet
5. **Vertraulich-Flag**: Geschäftliche Aufgaben mit vertraulich-Flag werden standardmäßig NICHT an KI gesendet
6. **Audit-Log**: Jeder KI-API-Call wird geloggt (was wurde gesendet, wann)

### Sicherheits-Checkliste

- [ ] Input-Validierung mit Zod auf allen Endpunkten
- [ ] SQL-Injection-Schutz (Prisma parametrized queries)
- [ ] XSS-Schutz (React escaped by default + CSP-Header)
- [ ] CSRF-Schutz (SameSite Cookies)
- [ ] Rate-Limiting auf Auth-Endpunkten
- [ ] Helmet.js für Security-Headers
- [ ] Regelmäßige Dependency-Updates (Dependabot)
- [ ] Environment Variables für Secrets (niemals im Code)

---

## 16. Entwicklungsplan

### Phase 1: Foundation (Woche 1-2)
| Task | Abhängigkeit | Beschreibung |
|------|-------------|--------------|
| T-01 | - | Projekt-Setup: Next.js, TypeScript, Tailwind, shadcn/ui |
| T-02 | T-01 | Prisma Setup + PostgreSQL Docker |
| T-03 | T-02 | Datenbankschema erstellen + erste Migration |
| T-04 | T-01 | NextAuth.js Setup (Credentials Provider) |
| T-05 | T-04 | Login/Register UI |
| T-06 | T-01 | Layout-Komponente mit Sidebar-Navigation |
| T-07 | T-01 | shadcn/ui Basis-Komponenten installieren |

### Phase 2: Core Features (Woche 3-5)
| Task | Abhängigkeit | Beschreibung |
|------|-------------|--------------|
| T-08 | T-03, T-04 | Workspace CRUD (Service + API) |
| T-09 | T-08 | Workspace UI (bei Erstanmeldung: Uni + Geschäftlich anlegen) |
| T-10 | T-08 | Project CRUD (Service + API) |
| T-11 | T-10 | Projektübersicht UI |
| T-12 | T-10 | Projektdetail UI |
| T-13 | T-10 | Task CRUD (Service + API) |
| T-14 | T-13 | Aufgabenliste UI mit Filtern |
| T-15 | T-13 | Aufgabendetail UI |
| T-16 | T-13 | Subtask CRUD (Service + API + UI) |
| T-17 | T-13 | Quick-Add Komponente |
| T-18 | T-10 | Tag-System (CRUD + UI) |
| T-19 | T-14 | Dashboard UI |

### Phase 3: Kalender & Notifications (Woche 6-7)
| Task | Abhängigkeit | Beschreibung |
|------|-------------|--------------|
| T-20 | T-13 | Kalender-Service (Aggregation der Tasks nach Datum) |
| T-21 | T-20 | Kalender-UI (FullCalendar oder Custom) |
| T-22 | T-13 | Reminder CRUD (Service + API) |
| T-23 | T-22 | Reminder UI in Aufgabendetail |
| T-24 | T-22 | Notification Service (Cron + Web Push) |
| T-25 | T-24 | Service Worker für Push Notifications |

### Phase 4: KI-Integration (Woche 8-10)
| Task | Abhängigkeit | Beschreibung |
|------|-------------|--------------|
| T-26 | T-13 | AI Service Setup (Vercel AI SDK) |
| T-27 | T-26 | Prompt-Templates erstellen |
| T-28 | T-27 | AI-Chat API Route (Streaming) |
| T-29 | T-28 | AI-Chat UI |
| T-30 | T-28 | Response-Parser für strukturierte Actions |
| T-31 | T-30 | Bestätigungs-Flow UI |
| T-32 | T-31 | Action-Ausführung (Daten erstellen nach Bestätigung) |
| T-33 | T-26 | KI-Einstellungen UI (API-Key, Modell) |
| T-34 | T-28 | Kontext-Builder (relevante Daten für KI zusammenstellen) |
| T-35 | T-34 | Kontext-Vorschau vor KI-Call |

### Phase 5: Export (Woche 11-12)
| Task | Abhängigkeit | Beschreibung |
|------|-------------|--------------|
| T-36 | T-13 | Export-Service (Markdown-Generator) |
| T-37 | T-36 | Export-Service (JSON-Generator) |
| T-38 | T-36 | Anonymisierungs-Service |
| T-39 | T-36 | Export UI (Auswahl, Vorschau, Download) |
| T-40 | T-38 | Datenschutzhinweis-Integration |

### Phase 6: Polish & Testing (Woche 13-14)
| Task | Abhängigkeit | Beschreibung |
|------|-------------|--------------|
| T-41 | Alle | Unit Tests (Services) |
| T-42 | Alle | Integration Tests (API) |
| T-43 | Alle | E2E Tests (Playwright) |
| T-44 | Alle | Performance-Optimierung |
| T-45 | Alle | Responsive Design finalisieren |
| T-46 | Alle | Docker-Setup für Deployment |
| T-47 | Alle | Dokumentation |

### MVP-Roadmap (Visual)

```
Woche:  1   2   3   4   5   6   7   8   9   10  11  12  13  14
        ├───┤───┤───┤───┤───┤───┤───┤───┤───┤───┤───┤───┤───┤
Phase 1 ████████
Phase 2         ████████████████
Phase 3                         ████████
Phase 4                                 ████████████
Phase 5                                             ████████
Phase 6                                                     ████
```

---

## 17. Risiken und offene Fragen

### Technische Risiken

| Risiko | Wahrscheinlichkeit | Impact | Mitigation |
|--------|-------------------|--------|------------|
| KI-API-Ausfälle | Mittel | Mittel | Fallback auf lokales Ollama, Graceful Degradation |
| Performance bei vielen Aufgaben | Niedrig | Mittel | Pagination, DB-Indizes, Lazy Loading |
| Kalender-Library-Limitierungen | Mittel | Niedrig | Alternativen evaluieren, notfalls Custom |
| Auth-Security-Lücken | Niedrig | Hoch | NextAuth.js (bewährt), Security-Audit |

### Datenschutzrisiken

| Risiko | Mitigation |
|--------|------------|
| Geschäftsdaten an externe KI gesendet | Opt-in, Kontext-Vorschau, Vertraulich-Flag |
| Unverschlüsselte Speicherung | PostgreSQL mit verschlüsselter Partition |
| Token-Theft | Short-lived JWTs, HttpOnly Cookies, Refresh-Rotation |

### KI-Risiken

| Risiko | Mitigation |
|--------|------------|
| Falsche Deadlines extrahiert | Nutzer-Bestätigung vor jeder Aktion |
| Halluzinierte Projekte/Aufgaben | Strukturierte Ausgabe (JSON), Validierung |
| Unangemessene Vorschläge | Content-Filter, Prompt-Guardrails |
| Hohe API-Kosten | Rate-Limiting, Token-Budget pro Konversation |

### UX-Risiken

| Risiko | Mitigation |
|--------|------------|
| Zu komplexe UI | MVP-Fokus, iteratives Feedback |
| Langsame KI-Antworten | Streaming, Loading-States, Skeleton-UI |
| Verwirrende KI-Bestätigung | Klares UI-Pattern, Preview der Änderungen |

### Offene Entscheidungen

| # | Frage | Empfehlung |
|---|-------|------------|
| OE-01 | Hosting: Self-Hosted vs. Cloud? | Self-Hosted (Docker) für MVP, Cloud optional später |
| OE-02 | KI-Provider: OpenAI vs. Anthropic vs. Ollama? | OpenAI als Standard, Ollama als Datenschutz-Option |
| OE-03 | Kalender-Library: FullCalendar vs. Custom? | FullCalendar (ausgereift, Lizenz prüfen) |
| OE-04 | E-Mail-Service für Reminder? | Im MVP nur Browser-Push, E-Mail in Phase 2+ |
| OE-05 | Multi-User: Vorbereiten oder ignorieren? | Schema vorbereiten (userId überall), UI erst später |
| OE-06 | Mobile App: PWA oder Native? | PWA (responsive Web) reicht für MVP |


---

## 18. Kiro-Artefakte

Die folgenden Artefakte sind als separate Dateien vorbereitet und können direkt in Kiro verwendet werden:

- `docs/requirements.md` — Funktionale und nicht-funktionale Anforderungen
- `docs/design.md` — Architektur und Systemdesign
- `docs/tasks.md` — Implementierungs-Tasks in Reihenfolge
- `.kiro/steering/coding-standards.md` — Coding Standards
- `.kiro/steering/privacy-and-ai-rules.md` — Datenschutz und KI-Regeln

---

## 19. Konkrete nächste Schritte

### Sofort umsetzbar (Task-Liste für Implementierung)

1. **T-01**: Next.js Projekt initialisieren (`npx create-next-app@latest`)
2. **T-02**: PostgreSQL via Docker Compose + Prisma Setup
3. **T-03**: Prisma Schema aus dieser Spec übernehmen + `prisma migrate dev`
4. **T-04**: NextAuth.js mit Credentials Provider konfigurieren
5. **T-05**: Login/Register Pages erstellen
6. **T-06**: App-Layout mit Sidebar erstellen
7. **T-07**: shadcn/ui installieren und Basis-Komponenten einrichten

### Empfohlene Reihenfolge für den Start

```
1. Projekt-Setup (T-01 bis T-07)     → Laufende App mit Auth
2. Workspace + Project CRUD           → Erste Daten erstellen
3. Task CRUD + Subtasks               → Kern-Funktionalität
4. Dashboard + Filter                  → Nutzbare Oberfläche
5. Kalender                           → Zeitliche Übersicht
6. KI-Integration                     → Intelligente Planung
7. Export                             → Kontextexport
```

