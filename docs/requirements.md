# SmartPlanner – Anforderungen

## Funktionale Anforderungen

### REQ-F01: Benutzerverwaltung
- REQ-F01.1: Nutzer kann sich mit E-Mail und Passwort registrieren
- REQ-F01.2: Nutzer kann sich einloggen und ausloggen
- REQ-F01.3: Nutzer kann sein Passwort zurücksetzen
- REQ-F01.4: Nutzer kann sein Profil bearbeiten

### REQ-F02: Workspace-Verwaltung
- REQ-F02.1: Beim Erstanmeldung werden "Uni" und "Geschäftlich" Workspaces erstellt
- REQ-F02.2: Nutzer kann eigene Workspaces erstellen
- REQ-F02.3: Jeder Workspace hat ein Datenschutz-Level (NORMAL, CONFIDENTIAL)
- REQ-F02.4: Globaler Workspace-Filter in der gesamten App

### REQ-F03: Projektmanagement
- REQ-F03.1: Projekte erstellen mit Name, Beschreibung, Ziel, Workspace, Status, Priorität, Deadline
- REQ-F03.2: Projekte bearbeiten und löschen
- REQ-F03.3: Projekte archivieren (Soft-Delete)
- REQ-F03.4: Projektstatus: PLANNED, ACTIVE, WAITING, COMPLETED, ARCHIVED
- REQ-F03.5: Projekte filtern nach Workspace, Status, Priorität
- REQ-F03.6: Projekt-Fortschritt aus Tasks berechnen

### REQ-F04: Aufgabenmanagement
- REQ-F04.1: Aufgaben erstellen mit Titel, Beschreibung, Deadline, Priorität, Status, Tags
- REQ-F04.2: Aufgaben einem Projekt zuordnen
- REQ-F04.3: Aufgaben bearbeiten, löschen, abschließen
- REQ-F04.4: Aufgabenstatus: OPEN, IN_PROGRESS, WAITING, DONE
- REQ-F04.5: Aufgaben filtern und sortieren (Deadline, Priorität, Status, Tags)
- REQ-F04.6: Quick-Add für schnelle Aufgabenerfassung

### REQ-F05: Unteraufgaben
- REQ-F05.1: Unteraufgaben zu Aufgaben hinzufügen
- REQ-F05.2: Unteraufgaben haben Status, optionale Deadline und Notizen
- REQ-F05.3: Fortschritt der Hauptaufgabe aus Unteraufgaben berechenbar
- REQ-F05.4: Unteraufgaben bearbeiten und löschen

### REQ-F06: Kalender
- REQ-F06.1: Kalenderansicht mit Tages-, Wochen- und Monatsansicht
- REQ-F06.2: Aufgaben mit Deadline im Kalender anzeigen
- REQ-F06.3: Filter nach Workspace, Projekt, Priorität, Status
- REQ-F06.4: Klick auf Kalendereintrag öffnet Aufgabendetail

### REQ-F07: Erinnerungen
- REQ-F07.1: Reminder pro Aufgabe konfigurierbar (Zeitpunkt)
- REQ-F07.2: Browser-Push-Notification bei Fälligkeit
- REQ-F07.3: Übersicht überfälliger Aufgaben im Dashboard

### REQ-F08: KI-Chat
- REQ-F08.1: Chat-Interface für KI-Interaktion
- REQ-F08.2: KI extrahiert Projekte, Aufgaben, Deadlines aus natürlicher Sprache
- REQ-F08.3: KI-Vorschläge werden vor Ausführung angezeigt (PENDING Status)
- REQ-F08.4: Nutzer muss Vorschläge bestätigen oder ablehnen
- REQ-F08.5: KI kann Priorisierung und Tagesplanung vorschlagen
- REQ-F08.6: KI kann Aufgaben in Unteraufgaben zerlegen
- REQ-F08.7: Transparente Anzeige, welche Daten die KI erhält

### REQ-F09: Kontextexport
- REQ-F09.1: Export eines Projekts oder einer Aufgabe als Markdown
- REQ-F09.2: Export als JSON
- REQ-F09.3: Export enthält: Name, Bereich, Ziel, Beschreibung, Aufgaben, Unteraufgaben, Deadlines, Status, Prioritäten, Notizen, Entscheidungen, offene Fragen, nächster Schritt
- REQ-F09.4: Anonymisierungsoption für sensible Daten
- REQ-F09.5: Datenschutzhinweis bei geschäftlichen Exports

### REQ-F10: Dashboard
- REQ-F10.1: Übersicht: Heute fällig, diese Woche fällig, überfällig
- REQ-F10.2: Aktive Projekte mit Fortschritt
- REQ-F10.3: Quick-Add-Zugang

## Nicht-funktionale Anforderungen

### REQ-NF01: Performance
- Seitenladezeit < 2 Sekunden
- API-Response < 500ms (Standard-Operationen)
- KI-Response mit Streaming (Start < 2s)

### REQ-NF02: Sicherheit
- Passwort-Hashing mit bcrypt (min. 12 Rounds)
- JWT-Sessions mit kurzer Lebensdauer (15min Access, 7d Refresh)
- HTTPS-only in Production
- Input-Validierung (Client + Server) mit Zod
- Rate-Limiting auf Auth-Endpunkten
- CORS korrekt konfiguriert

### REQ-NF03: Datenschutz
- Alle Daten auf eigenem Server gespeichert
- KI-Kontext nur nach Nutzer-Freigabe gesendet
- Geschäftliche Daten als vertraulich markierbar
- Vollständige Datenlöschung auf Anfrage (DSGVO)
- Kein Tracking ohne Einwilligung
- Anonymisierungsoption bei Export

### REQ-NF04: Wartbarkeit
- TypeScript end-to-end
- Modulare Architektur (Services, Components, Types getrennt)
- Automatisierte Tests (Unit, Integration, E2E)
- Dokumentierter Code

### REQ-NF05: Usability
- Responsive Design (Desktop + Mobile)
- Minimalistisches, übersichtliches Design
- Konsistente Navigation
- Schnelle Aufgabenerfassung (max. 2 Klicks)
- Barrierefreiheit (WCAG 2.1 Level AA)

### REQ-NF06: Verfügbarkeit
- Grundfunktionen ohne KI-API nutzbar
- Graceful Degradation bei externen Service-Ausfällen
- Fehlermeldungen informativ und hilfreich
