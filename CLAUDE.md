# Pixel Tuning Garage

2D-Pixelart-Tuningspiel im Browser. Man steht mit seinem Auto in einer Werkstatt, tunt alles vom Motor bis zur Karosserie und fährt anschließend auf der Rennstrecke.
Ziel: kostenlose, öffentliche Web-App, die auch auf dem Handy (im Querformat) gut spielbar ist.

Dieses Projekt wird von **zwei Leuten** entwickelt, jeweils mit eigenem Claude. Diese Datei ist der gemeinsame Stand. Wer etwas Grundlegendes ändert, trägt es hier ein.

## Technik

- **Eine einzige Datei:** `index.html` mit HTML, CSS und JavaScript (Vanilla JS, `'use strict'`). Kein Framework, kein Build-Schritt.
- **Rendering:** Canvas `#c` mit 480 × 270 interner Auflösung, hochskaliert mit `image-rendering: pixelated`. Bodenlinie `GY = 226`.
- **Grafik wird per Code gezeichnet**, ohne Sprite-Dateien. Dafür gibt es Pixel-Helfer (`pcirc`, `pxEllipse`, `pline`, `crisp` für harte Kanten und Outline) und eine eigene 3×5-Pixelschrift (`FONT`, `ptext`).
- **Schriften:** „Press Start 2P“ und „VT323“, lokal im Ordner `fonts/` (woff2, SIL Open Font License). Keine externen Anfragen, keine CDNs.
- **Steuerung:** Touch-Buttons (Gas, Bremse, Start/Stop, Schaltung, NOS) und Tastatur (Leertaste Gas · S Bremse · Pfeile schalten · E Motor · N Lachgas · T Werkzeugkasten · R Rennstrecke).

## Aufbau des Codes (in `index.html`)

| Bereich | Inhalt |
|---|---|
| Farb- und Pixel-Helfer | `hex2rgb`, `shade`, `mix`, Zeichenfunktionen |
| `MODELS` | Basisautos: `pikko` (Kleinwagen '93), `varo` (Limousine '01), `kombi`. Umriss, Scheiben, Türen, Lichter usw. als Koordinaten |
| `ENGINES`, `AUFL`, `SOFT`, `EXH`, `NITRO`, … | Werte der Tuningteile |
| `CATS` | Menüstruktur des Werkzeugkastens (Auto, Motor, Auspuff, Getriebe, Fahrwerk, Felgen, Karosserie, Optik) mit Teilen und Preisen |
| `defaults()` / `S` | Aktueller Tuningzustand des Autos |
| `calc()` | Berechnet PS, Gewicht, Vmax, 0–100, Handling, Style, Rechnung und Titel |
| Editor (`#ed`) | Mehrstufiger Editor für eigene Autos (Foto-Import, läuft nur lokal im Browser) |

Weitere Dateien: `impressum.html`, `datenschutz.html` (teilen sich `legal.css`), verlinkt unten im Startbildschirm.

### Drift-Modus (`drift.html`)

Eigener Spielmodus in eigener Datei (Ausnahme von „eine Datei“, damit sich beide nicht in `index.html` in die Quere kommen). Erreichbar über den Knopf **DRIFT** oben rechts in der Garage (`#btnDrift`), zurück über „◀ Garage“.

- Draufsicht statt Seitenansicht, eigene Physik (Driftwinkel, Combo ×5, Wandkuss), Cockpit unten (Gang, Drehzahl, Tacho, Pedale, Schaltwippen), Schalter oder Automatik.
- Drei Stationen: **Parkhaus** (4 Ebenen, Freier Modus + Rennen gegen Bots), **Bergstraße** (endlos, Serpentinen, Abgrund, Leitplanken, Steigung), **Stadt** (Ampeln, Verkehr, Freier Modus + **Police Chase**).
- Eigenes Drift-Tuning (Motor, Fahrwerk, Lenkwinkel, Lackierung) und eigener Speicherstand: `localStorage` `querstehen-v1` (Garage nutzt `ptg-build-v1`, nichts überschneidet sich).
- Schrift VT323 lokal aus `fonts/`, keine externen Anfragen. Handy hochkant → Spiel dreht sich selbst ins Querformat.
- Ausführliches Spielkonzept: Claude-Projekt „auto drift spiel“ (`spielkonzept.md`).

## Regeln für die Arbeit

- **Pixel-Look beibehalten:** harte Kanten, keine Unschärfe, keine Anti-Aliasing-Effekte. Neue Grafik wird per Code gezeichnet, im Stil der vorhandenen Helfer.
- **Handy zuerst:** Jede Änderung muss im Querformat auf dem Handy bedienbar sein (Safe Areas, große Buttons).
- **Sprache im Spiel:** Deutsch.
- **Neue Tuningteile** bekommen einen Eintrag in `CATS`. Falls sie Werte beeinflussen, auch in `calc()` (Leistung, Gewicht, Handling, Style, Preis).
- **Kleine, gezielte Änderungen** statt großer Umbauten. Vorher kurz beschreiben, was geändert wird.
- **Kein Build-Tooling**, keine externen Bibliotheken ohne Absprache.

## Zusammenarbeit

- Vor dem Arbeiten immer **pullen**, danach **committen und pushen**.
- Weil alles in einer Datei liegt: Absprechen, wer gerade woran arbeitet, damit es keine Merge-Konflikte gibt.
- Commit-Nachrichten auf Deutsch, kurz und konkret (z. B. „Heckflügel: neuer Typ Entenbürzel“).

### Wer macht gerade was

- Till: …
- Drift-Modus (`drift.html` + Knopf DRIFT in `index.html`): neu dazugekommen
- (Kumpel): …

## Offene Punkte / Ideen

- `noindex` im `<head>` entfernen, sobald das Spiel bei Google auffindbar sein soll (aktuell bewusst gesperrt, solange es in Arbeit ist)
- Impressum/Datenschutz nennen bisher nur Till als Verantwortlichen; ggf. Kumpel ergänzen
- Kommen neue Dienste dazu (Analytics, Online-Speicher, Bestenliste, externe Bibliotheken), muss `datenschutz.html` angepasst werden
- Weitere Basisautos (Vorbilder: alte Autos wie Twingo 1, Passat 3BG)
- Foto-Import weiter verbessern
- …
