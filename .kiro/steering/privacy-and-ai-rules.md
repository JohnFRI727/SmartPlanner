# Datenschutz & KI-Regeln – SmartPlanner

## Grundprinzipien

1. **Privacy-by-Default**: Daten werden nie ohne explizite Zustimmung geteilt
2. **Datensparsamkeit**: Nur notwendige Daten erheben und speichern
3. **Transparenz**: Nutzer sieht immer, was mit seinen Daten passiert
4. **Kontrolle**: Nutzer kann jederzeit Daten löschen oder Export widerrufen
5. **Sicherheit**: Verschlüsselung, Hashing, Zugriffskontrolle

## Datenschutz-Regeln für Code

### Speicherung
- Alle Nutzerdaten ausschließlich in eigener PostgreSQL-Datenbank
- Passwörter: bcrypt mit mindestens 12 Rounds
- Keine sensiblen Daten in Logs (Passwörter, API-Keys, personenbezogene Daten)
- Environment Variables für alle Secrets (`.env` niemals committen)
- `.env.example` nur mit Platzhaltern

### Zugriffskontrolle
- Jede DB-Query MUSS `userId` als Filter enthalten
- Kein Nutzer darf auf Daten eines anderen Nutzers zugreifen
- Auth-Middleware auf allen geschützten Routes
- API-Endpunkte validieren Ownership vor jeder Operation

### Workspace-Datenschutz
- Workspace mit `privacyLevel: CONFIDENTIAL`:
  - Daten werden NICHT standardmäßig an KI gesendet
  - Export enthält automatisch Datenschutzhinweis
  - UI zeigt visuellen Indikator (🔒 Icon)

### Löschung (DSGVO Art. 17)
- Nutzer kann Account und alle Daten löschen
- Cascade-Delete über alle verknüpften Entitäten
- Bestätigungs-Dialog mit klarer Warnung
- Keine versteckten Backups personenbezogener Daten

## KI-Regeln

### Allgemeine KI-Regeln

| Regel | Beschreibung |
|-------|-------------|
| KI-01 | KI führt KEINE Aktionen ohne Nutzerbestätigung aus |
| KI-02 | KI erhält NUR Kontext, den der Nutzer explizit freigibt |
| KI-03 | Vertrauliche Daten (CONFIDENTIAL Workspace) werden NICHT automatisch an KI gesendet |
| KI-04 | Nutzer sieht VOR dem API-Call den vollständigen Kontext (Vorschau) |
| KI-05 | Jeder KI-API-Call wird in der Datenbank geloggt (AIMessage) |
| KI-06 | Maximal 10 Actions pro KI-Vorschlag |
| KI-07 | KI darf keine Sicherheitseinstellungen oder Auth-Daten ändern |
| KI-08 | Bei Ollama/lokalem LLM: Hinweis anzeigen, dass Daten lokal bleiben |
| KI-09 | Bei externem Provider: Hinweis anzeigen, dass Daten an Drittanbieter gesendet werden |
| KI-10 | Token-Budget pro Konversation (konfigurierbar, Default: 100k Tokens) |

### Implementierungs-Regeln für KI-Code

```typescript
// RICHTIG: Kontext mit expliziter Nutzer-Freigabe
async function buildContext(userId: string, options: ContextOptions) {
  // Nur freigegebene Workspaces einbeziehen
  const workspaces = await getWorkspaces(userId, options.allowedWorkspaceIds);
  
  // Vertrauliche Daten filtern
  const filteredData = workspaces.filter(ws => 
    ws.privacyLevel !== 'CONFIDENTIAL' || options.includeConfidential === true
  );
  
  return filteredData;
}

// FALSCH: Alle Daten ohne Prüfung an KI senden
async function buildContext(userId: string) {
  return await getAllUserData(userId); // ❌ NIEMALS
}
```

### Bestätigungs-Flow

Jede KI-Aktion durchläuft diesen Flow:

```
1. Nutzer sendet Nachricht
2. System baut Kontext (nur freigegebene Daten)
3. Nutzer sieht Kontext-Vorschau (kann anpassen)
4. Nutzer bestätigt Senden
5. KI-API wird aufgerufen
6. Response wird geparst → proposedActions
7. Actions werden als Karten dargestellt
8. Nutzer bestätigt/lehnt einzelne Actions ab
9. Nur bestätigte Actions werden in DB geschrieben
10. Feedback an Nutzer
```

### Action-Typen und Validierung

Jede KI-Action muss durch Zod-Schema validiert werden:

```typescript
const createTaskActionSchema = z.object({
  type: z.literal('create_task'),
  title: z.string().min(1).max(200),
  description: z.string().max(5000).optional(),
  deadline: z.string().datetime().optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']),
  projectId: z.string().uuid().optional(),
  subtasks: z.array(z.object({
    title: z.string().min(1).max(200),
    deadline: z.string().datetime().optional(),
  })).max(20).optional(),
});
```

### Fehlerbehandlung bei KI

- Bei API-Fehler: Informative Meldung an Nutzer, keine Retry ohne Einwilligung
- Bei ungültigem KI-Output: "KI-Antwort konnte nicht verarbeitet werden. Bitte anders formulieren."
- Bei Rate-Limit: Cooldown anzeigen
- Bei Timeout: Abbruch nach 30 Sekunden, Nutzer informieren
- Graceful Degradation: App funktioniert vollständig ohne KI

## Export-Datenschutz

### Regeln für Export
- Export geschäftlicher Daten: Immer Datenschutzhinweis anzeigen
- Anonymisierung als Option prominent anbieten
- Export enthält Privacy-Notice im Dokument
- Keine automatischen Exports (nur auf Nutzer-Aktion)
- Export-Historie wird geloggt

### Anonymisierungs-Regeln

Bei aktivierter Anonymisierung werden erkannt und ersetzt:
- Personennamen → `[Person A]`, `[Person B]`
- Firmennamen → `[Unternehmen]`
- E-Mail-Adressen → `[E-Mail entfernt]`
- Telefonnummern → `[Telefon entfernt]`
- URLs → `[URL entfernt]` (optional)
- Custom-Regeln: Nutzer kann eigene Begriffe zur Anonymisierung definieren

## Drittanbieter-Kommunikation

| Dienst | Daten die gesendet werden | Kontrolle |
|--------|--------------------------|-----------|
| OpenAI/Anthropic | Nur freigegebener Kontext + Nutzer-Nachricht | Opt-in, Vorschau |
| Ollama (lokal) | Gleicher Kontext, verlässt Server nicht | Standard-Option für Datenschutz |
| Push-Service (Web Push) | Nur Notification-Titel + Body (keine Aufgabeninhalte) | Automatisch minimal |
| E-Mail (optional) | Nur Erinnerungs-Hinweis, kein Aufgabeninhalt | Konfigurierbar |

## Checkliste für Entwickler

Vor jedem PR mit Datenzugriff prüfen:
- [ ] Wird `userId` in der DB-Query geprüft?
- [ ] Werden vertrauliche Workspaces korrekt gefiltert?
- [ ] Werden sensible Daten in Logs vermieden?
- [ ] Ist die Input-Validierung vollständig?
- [ ] Werden KI-Daten nur nach Freigabe gesendet?
- [ ] Ist die Error-Message frei von sensiblen Details?
- [ ] Werden keine Secrets hardcoded?
