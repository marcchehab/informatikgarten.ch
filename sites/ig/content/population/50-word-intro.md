---
title: Textverarbeitung Intro
---
# Professionelle Textverarbeitung in Word

Für Ihren schriftlichen Auftrag benötigen Sie einige grundlegende Kenntnisse der Textverarbeitung. Diese Anleitung gilt sowohl für Microsoft Word als auch für LibreOffice Writer.

## Zeichenformatierung vs. Formatvorlagen

### Das Problem der direkten Formatierung

Viele Anfänger formatieren Text direkt: Sie markieren eine Überschrift und klicken auf "Fett", "Schriftgrösse 18", "Blau". Das nennt man **direkte Formatierung** oder **Zeichenformatierung**.

Das funktioniert bei kurzen Dokumenten, wird aber schnell zum Problem:
- Sie haben 20 Überschriften und möchten die Farbe ändern? Sie müssen jede einzeln anpassen.
- Sie möchten ein automatisches Inhaltsverzeichnis? Word erkennt Ihre Überschriften nicht.
- Das Dokument sieht inkonsistent aus, weil Sie vergessen haben, eine Überschrift gleich zu formatieren.

### Die Lösung: Formatvorlagen

**Formatvorlagen** (englisch: Styles) sind vordefinierte Formatierungspakete. Statt einzelne Eigenschaften zuzuweisen, weisen Sie einem Absatz eine *Rolle* zu:

| Formatvorlage | Bedeutung |
|---------------|-----------|
| Überschrift 1 | Hauptkapitel |
| Überschrift 2 | Unterkapitel |
| Überschrift 3 | Abschnitt |
| Standard | Normaler Fliesstext |
| Zitat | Eingerücktes Zitat |

**Vorteile von Formatvorlagen:**
1. **Konsistenz**: Alle Überschriften gleicher Ebene sehen identisch aus
2. **Effizienz**: Ändern Sie die Vorlage, ändern sich alle zugehörigen Textstellen automatisch
3. **Automatisierung**: Word erkennt die Struktur und kann automatisch Inhaltsverzeichnisse generieren
4. **Professionalität**: Ihr Dokument wirkt einheitlich und durchdacht

### Formatvorlagen anwenden

**In Word:**
1. Markieren Sie den Text (z.B. eine Überschrift)
2. Gehen Sie zu **Start** > **Formatvorlagen**
3. Wählen Sie die passende Vorlage (z.B. "Überschrift 1")

**In LibreOffice Writer:**
1. Markieren Sie den Text
2. Öffnen Sie die Seitenleiste mit **F11** oder **Ansicht** > **Formatvorlagen**
3. Doppelklicken Sie auf die gewünschte Vorlage

### Formatvorlagen anpassen

Sie können Formatvorlagen nach Ihren Wünschen anpassen:
1. Rechtsklick auf die Formatvorlage
2. **Ändern...** wählen
3. Schriftart, Grösse, Farbe, Abstände etc. anpassen
4. **OK** klicken

Alle Textstellen mit dieser Vorlage werden automatisch aktualisiert.

## Seitenumbrüche

### Manueller Seitenumbruch

Ein **Seitenumbruch** zwingt den Text, auf einer neuen Seite weiterzugehen. Verwenden Sie ihn, um ein neues Kapitel auf einer frischen Seite zu beginnen.

**In Word:**
- **Ctrl + Enter** (Tastenkombination) oder
- **Einfügen** > **Seitenumbruch**

**In LibreOffice Writer:**
- **Ctrl + Enter** oder
- **Einfügen** > **Umbruch** > **Seitenumbruch**

**Wichtig:** Verwenden Sie *niemals* mehrere Leerzeilen oder Enter-Tasten, um auf eine neue Seite zu kommen. Das führt zu Problemen, sobald Sie Text hinzufügen oder entfernen.

## Abschnitte im Dokument

### Wozu Abschnitte?

Ein **Abschnitt** (englisch: Section) ist ein Bereich im Dokument mit eigenen Layouteinstellungen. Abschnitte ermöglichen:
- Unterschiedliche Kopf-/Fusszeilen pro Kapitel
- Wechsel zwischen Hoch- und Querformat
- Unterschiedliche Seitennummerierung
- Verschiedene Spaltenanzahlen

### Abschnittswechsel einfügen

**In Word:**
1. Setzen Sie den Cursor an die Stelle, wo der neue Abschnitt beginnen soll
2. Gehen Sie zu **Layout** > **Umbrüche**
3. Wählen Sie unter "Abschnittswechsel":
   - **Nächste Seite**: Neuer Abschnitt beginnt auf neuer Seite
   - **Fortlaufend**: Neuer Abschnitt auf derselben Seite

**In LibreOffice Writer:**
1. **Einfügen** > **Bereich...** oder
2. **Einfügen** > **Umbruch** > **Seitenumbruch** mit Seitenvorlage

### Abschnittswechsel sichtbar machen

Um zu sehen, wo Ihre Abschnitte sind:
- **Word**: **Start** > Absatzmarken anzeigen (Pilcrow-Symbol ¶)
- **LibreOffice**: **Ansicht** > **Formatierungszeichen**

## Kopf- und Fusszeilen variieren

### Grundlagen

Kopf- und Fusszeilen erscheinen auf jeder Seite. Typische Inhalte:
- Dokumenttitel oder Kapitelname
- Seitenzahlen
- Autorenname
- Datum

### Unterschiedliche Kopf-/Fusszeilen pro Abschnitt

Standardmässig sind Kopf- und Fusszeilen im ganzen Dokument gleich. Um sie pro Abschnitt zu variieren:

**In Word:**
1. Fügen Sie zuerst einen Abschnittswechsel ein (siehe oben)
2. Doppelklicken Sie in die Kopf- oder Fusszeile des neuen Abschnitts
3. Deaktivieren Sie **"Mit vorheriger verknüpfen"** in der Registerkarte "Kopf- und Fusszeile"
4. Jetzt können Sie diese Kopf-/Fusszeile unabhängig voneinander anpassen

**In LibreOffice Writer:**
1. Definieren Sie verschiedene **Seitenvorlagen** (z.B. "Erste Seite", "Kapitelseite")
2. Jede Seitenvorlage kann eigene Kopf-/Fusszeilen haben
3. Weisen Sie die Seitenvorlagen den entsprechenden Seiten zu

### Seitenzahlen einfügen

**In Word:**
1. Doppelklick in die Fusszeile
2. **Einfügen** > **Seitenzahl**
3. Position und Format wählen

**In LibreOffice Writer:**
1. **Einfügen** > **Kopf- und Fusszeile** > **Fusszeile**
2. Cursor in die Fusszeile setzen
3. **Einfügen** > **Feldbefehl** > **Seitennummer**

## Richtig zitieren mit Fussnoten

### Wieso zitieren wir überhaupt?

Zitieren ist keine lästige Pflicht, sondern ein Grundpfeiler wissenschaftlicher Arbeit:

- **Ehrlichkeit**: Sie zeigen transparent, welche Gedanken von Ihnen stammen und welche von anderen. Fremde Ideen als eigene auszugeben ist ein Plagiat – ein schwerwiegendes Vergehen in der Wissenschaft.
- **Absicherung**: Wenn Sie eine Aussage mit einer seriösen Quelle belegen, zeigen Sie, dass Sie sorgfältig recherchiert haben. Sollte sich die Quelle später als fehlerhaft erweisen, haben Sie dennoch wissenschaftlich korrekt gearbeitet – anders als bei unbelegten Behauptungen.
- **Nachprüfbarkeit**: Ihre Leser können Ihre Quellen selbst überprüfen und sich ein eigenes Bild machen.
- **Würdigung**: Sie anerkennen die geistige Arbeit anderer Menschen.
- **Glaubwürdigkeit**: Gut belegte Aussagen wirken überzeugender als unbelegte Behauptungen.
- **Weiterführung**: Interessierte Leser können anhand Ihrer Quellen tiefer in ein Thema einsteigen.

### Warum Fussnoten?

In wissenschaftlichen Arbeiten müssen Sie Ihre Quellen angeben. Fussnoten sind eine elegante Methode dafür:
- Der Lesefluss wird nicht unterbrochen
- Die Quellenangabe steht direkt auf derselben Seite
- Nummerierung erfolgt automatisch

### Fussnoten einfügen

**In Word:**
1. Setzen Sie den Cursor an die Stelle im Text, wo die Fussnote erscheinen soll
2. Gehen Sie zu **Referenzen** > **Fussnote einfügen** (oder **Ctrl+Alt+F**)
3. Word fügt eine hochgestellte Zahl ein und springt zum Fussnotenbereich
4. Geben Sie dort Ihre Quellenangabe ein

**In LibreOffice Writer:**
1. Cursor positionieren
2. **Einfügen** > **Fuss-/Endnote** > **Fussnote**
3. Quellenangabe eingeben

### Zitierungsstile

Es gibt viele verschiedene Zitierungsstile, die sich in Formatierung und Reihenfolge der Angaben unterscheiden:

| Stil | Verbreitung |
|------|-------------|
| APA | Psychologie, Sozialwissenschaften |
| MLA | Geisteswissenschaften, Literatur |
| Chicago | Geschichte, Kunst |
| Harvard | Wirtschaft, Naturwissenschaften |
| IEEE | Technik, Informatik |

Jede Fachrichtung und Institution hat ihre Präferenzen. **Fragen Sie am besten Ihre Lehrperson**, welcher Zitierungsstil für Ihre Arbeit erwartet wird.

### Korrekte Quellenangabe (deutsche Zitierweise)

In dieser Anleitung verwenden wir eine **vereinfachte deutsche Zitierweise** mit Fussnoten. Diese ist im deutschsprachigen Raum weit verbreitet und gut lesbar.

Eine vollständige Quellenangabe in der Fussnote enthält:

**Für Bücher:**
```
Nachname, Vorname: Titel. Ort: Verlag, Jahr, S. X.
```
Beispiel: Müller, Hans: Populationsdynamik verstehen. Zürich: Springer, 2020, S. 45.[/home/chris/git/informatikgarten.ch/sites/ig/content/population/51-wordtext.txt](file:///home/chris/git/informatikgarten.ch/sites/ig/content/population/51-wordtext.txt)

**Für Webseiten:**
```
Autor/Organisation: Titel der Seite. URL (abgerufen am TT.MM.JJJJ).
```
Beispiel: WWF Schweiz: Der Wolf in der Schweiz. https://www.wwf.ch/wolf (abgerufen am 15.03.2024).

**Für wissenschaftliche Artikel:**
```
Nachname, Vorname: "Titel des Artikels". In: Zeitschrift, Band (Jahr), S. X-Y.
```

### Tipps zum Zitieren

- **Konsistenz**: Verwenden Sie immer dasselbe Format für gleichartige Quellen
- **Vollständigkeit**: Geben Sie alle nötigen Informationen an, damit die Quelle auffindbar ist
- **Bei wiederholten Zitaten**: Verwenden Sie "Ebd." (ebenda) oder "A.a.O." (am angegebenen Ort) mit Seitenzahl
- **Wörtliche Zitate**: In Anführungszeichen setzen und Seitenzahl angeben
- **Sinngemässe Zitate**: Mit "Vgl." (vergleiche) einleiten
- **Hilfsprogramm Zotero**: Falls Sie viele Quellen nutzen und grössere Arbeiten erstellen, automatisieren Sie die Arbeit mit dem Programm Zotero.

### Beispiel im Text

> Die Wolfspopulation in der Schweiz hat sich seit 2012 vervielfacht.[1] Experten führen dies auf verbesserte Schutzmassnahmen zurück.[2]
>
> _______________
> [1] Vgl. BAFU: Monitoring Wolf Schweiz. https://www.bafu.admin.ch/wolf (abgerufen am 10.03.2024).
> [2] Müller, Hans: Wildtiere in der Schweiz. Bern: Haupt, 2022, S. 87.

### Quellenverzeichnis (Bibliografie)

Am Ende Ihrer Arbeit fügen Sie ein **Quellenverzeichnis** ein. Hier listen Sie alle verwendeten Quellen nochmals vollständig auf – diesmal **alphabetisch nach Nachnamen sortiert** und ohne Seitenzahlen.

**Aufbau:**
- Neue Seite mit der Überschrift "Quellenverzeichnis" oder "Literaturverzeichnis"
- Alle zitierten Quellen alphabetisch sortiert
- Bei Webseiten ohne Autor: nach Titel oder Organisation sortieren
- Jede Quelle nur einmal aufführen (auch wenn mehrfach zitiert)

**Beispiel:**

> **Quellenverzeichnis**
>
> BAFU: Monitoring Wolf Schweiz. https://www.bafu.admin.ch/wolf (abgerufen am 10.03.2024).
>
> Müller, Hans: Populationsdynamik verstehen. Zürich: Springer, 2020.
>
> Müller, Hans: Wildtiere in der Schweiz. Bern: Haupt, 2022.
>
> WWF Schweiz: Der Wolf in der Schweiz. https://www.wwf.ch/wolf (abgerufen am 15.03.2024).

**Unterschied zur Fussnote:**
- Fussnote: Mit Seitenzahl, zeigt genau wo die Information steht
- Quellenverzeichnis: Ohne Seitenzahl, zeigt das gesamte Werk
