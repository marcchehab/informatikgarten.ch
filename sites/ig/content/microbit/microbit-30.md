---
title: Multi-Modus Roboter - Zustandsmaschine
---

> [!success] Lernziele
>
> - **Zustandsmaschine implementieren**: Sie können verschiedene Betriebsmodi in einem Programm implementieren und zwischen ihnen wechseln.
> - **Konzepte kombinieren**: Sie können Radio-Steuerung, Helligkeitssensoren und Event-Loop zu einem komplexen Programm verbinden.
> - **Code-Organisation**: Sie strukturieren ein grösseres Projekt mit Funktionen und klaren Zuständen.
> - **Fehlersuche**: Sie können ein komplexes System schrittweise testen und Fehler systematisch eingrenzen.

## Das Projekt: Ein Multi-Modus Roboter

Bisher haben Sie verschiedene Einzelfunktionen für den Maqueen programmiert: Fernsteuerung, Linienfolger, Distanzsensoren. Nun kombinieren wir diese zu einem **intelligenten Roboter, der zwischen verschiedenen Modi wechseln kann**.

Unser Roboter soll drei verschiedene Betriebsmodi haben:
1. **Modus 1 "Fernsteuern"**: Beide Motoren werden per Funk ferngesteuert - freie Bewegung in alle Richtungen
2. **Modus 2 "Tracker"**: Der Roboter folgt automatisch einem schwarzen Fleck am Boden. Taste A auf der Fernsteuerung wechselt die Fahrtrichtung (vorwärts/rückwärts)
3. **Modus 0 "Off"**: Alle Motoren werden abgestellt und das Programm wird sauber beendet

Das Besondere: Sie benötigen **zwei Microbits** - einen im Roboter und einen als Fernsteuerung!

## Planung: Die Zustandsmaschine

Erinnern Sie sich an die [Zustandsmaschine aus der Buttons-Lektion](microbit-05-buttons.md#zusatz-laufmodi-verstehen)? Genau dieses Konzept brauchen wir hier!

```python
# Verschiedene Modi als Konstanten
MODE_OFF = 0
MODE_FERNSTEUERUNG = 1
MODE_TRACKER = 2

# Aktueller Modus (starten im Fernsteuerungsmodus)
mode = MODE_FERNSTEUERUNG
```

Unser Event-Loop muss dann je nach Modus unterschiedlich reagieren. Elegant ist es, den Modus direkt in der Loop-Bedingung zu nutzen:

```python
while mode != MODE_OFF:
    if mode == MODE_FERNSTEUERUNG:
        # Auf Funksignale reagieren, Motoren steuern
    elif mode == MODE_TRACKER:
        # Helligkeitssensoren auslesen, automatisch fahren

# Wenn die Loop beendet wird, stoppen wir alle Motoren
maqueen.motor_stop_all()
```

> [!example] Challenge 1: Das Grundgerüst
>
> Erstellen Sie zuerst die Grundstruktur für den **Roboter** (nicht die Fernsteuerung!):
>
> **Aufgaben:**
> 1. Importieren Sie die nötigen Module (`microbit`, `maqueen`, `radio`)
> 2. Definieren Sie die drei Modus-Konstanten
> 3. Setzen Sie die Radio-Gruppe (z.B. `radio.config(group=42)`)
> 4. Erstellen Sie einen Event-Loop mit `while mode != MODE_OFF`
> 5. Bauen Sie die `if/elif`-Struktur für die Modi (nur Fernsteuerung und Tracker, OFF ist ja die Loop-Bedingung!)
> 6. Zeigen Sie auf dem Display an, in welchem Modus Sie sich befinden (z.B. "F" für Fernsteuerung, "T" für Tracker)
> 7. Nach der Loop stoppen Sie alle Motoren und zeigen "0" auf dem Display
>
> **Tipps:**
> - Starten Sie testweise im `MODE_FERNSTEUERUNG` - die Loop sollte laufen und "F" anzeigen
> - Ändern Sie testweise zu `mode = MODE_OFF` - die Loop sollte gar nicht starten
> - Vergessen Sie nicht `radio.on()` am Anfang!

> [!solution]- Mögliche Lösung Challenge 1
>
> ```python
> from microbit import *
> import maqueen
> import radio
>
> # Modi definieren
> MODE_OFF = 0
> MODE_FERNSTEUERUNG = 1
> MODE_TRACKER = 2
>
> # Radio konfigurieren
> radio.config(group=42)
> radio.on()
>
> # Startzustand
> mode = MODE_FERNSTEUERUNG
>
> while mode != MODE_OFF:
>
>     if mode == MODE_FERNSTEUERUNG:
>         display.show("F")
>         # Hier kommt die Fernsteuerung hin
>
>     elif mode == MODE_TRACKER:
>         display.show("T")
>         # Hier kommt der Tracker hin
>
> # Programm wird beendet
> maqueen.motor_stop_all()
> display.show("0")
> ```

> [!example] Challenge 2: Die Fernsteuerung programmieren
>
> Jetzt programmieren Sie die **Fernsteuerung** auf dem zweiten Microbit. Auch sie braucht Modi!
>
> **Die Modi der Fernsteuerung:**
> - **Modus "Fernsteuerung"**: Tasten steuern die Bewegung des Roboters
> - **Modus "Tracker"**: Taste A sendet den Richtungswechsel-Befehl
> - **Moduswechsel**: Schütteln wechselt zwischen den Modi
> - **Ausschalten**: Fernsteuerung umdrehen (face down) schaltet beide aus
>
> **Aufgaben:**
> 1. Erstellen Sie Modi für die Fernsteuerung (gleiche Konstanten wie beim Roboter)
> 2. **Schütteln** (`accelerometer.was_gesture('shake')`) wechselt zwischen MODE_FERNSTEUERUNG und MODE_TRACKER:
>    - Ändert den Modus der Fernsteuerung selbst
>    - Sendet "MODE:1" oder "MODE:2" an den Roboter, um ihn zu synchronisieren
> 3. **Umdrehen** (`accelerometer.was_gesture('face down')`) sendet "MODE:0" und beendet beide Loops
> 4. Zeigen Sie den aktuellen Modus auf dem Display an (F oder T)
>
> **Im Fernsteuerungsmodus:**
> - `button_a.is_pressed() and button_b.is_pressed()`: Sende "MOVE:FF" (vorwärts)
> - `button_a.is_pressed()`: Sende "MOVE:LT" (left turn - nach links drehen)
> - `button_b.is_pressed()`: Sende "MOVE:RT" (right turn - nach rechts drehen)
> - Keine Taste gedrückt: Sende "MOVE:00" (stopp)
>
> **Im Tracker-Modus:**
> - Wenn Taste A `was_pressed()` wird: Sende "TRACKER:REVERSE"
>
> **Tipps:**
> - Beim Moduswechsel: Erst den eigenen Modus ändern, dann den Befehl senden
> - Nutzen Sie `is_pressed()` für kontinuierliche Bewegung (Taste gedrückt halten)
> - Nutzen Sie `was_pressed()` für einmalige Aktionen
> - Testen Sie zuerst nur den Moduswechsel mit Schütteln

> [!solution]- Mögliche Lösung Challenge 2
>
> ```python
> from microbit import *
> import radio
>
> # Modi definieren (gleich wie beim Roboter!)
> MODE_OFF = 0
> MODE_FERNSTEUERUNG = 1
> MODE_TRACKER = 2
>
> # Radio konfigurieren
> radio.config(group=42)
> radio.on()
>
> # Startzustand
> mode = MODE_FERNSTEUERUNG
>
> while mode != MODE_OFF:
>
>     # Moduswechsel mit Schütteln
>     if accelerometer.was_gesture('shake'):
>         # Zwischen den Modi wechseln
>         if mode == MODE_FERNSTEUERUNG:
>             mode = MODE_TRACKER
>         else:
>             mode = MODE_FERNSTEUERUNG
>         # Roboter synchronisieren
>         radio.send("MODE:" + str(mode))
>         sleep(500)  # Kurz warten, damit nicht mehrfach gewechselt wird
>
>     # Ausschalten durch Umdrehen
>     if accelerometer.was_gesture('face down'):
>         mode = MODE_OFF
>         radio.send("MODE:" + str(mode))
>
>     # Fernsteuerungsmodus: Tasten steuern Bewegung
>     if mode == MODE_FERNSTEUERUNG:
> 	    # Display aktualisieren
>         display.show("F")
>         # Befehle senden
>         if button_a.is_pressed() and button_b.is_pressed():
>             radio.send("MOVE:FF")
>         elif button_a.is_pressed():
>             radio.send("MOVE:LT")
>         elif button_b.is_pressed():
>             radio.send("MOVE:RT")
>         else:
>             radio.send("MOVE:00")
>
>     # Tracker-Modus: Taste A für Richtungswechsel
>     elif mode == MODE_TRACKER:
> 	    # Display aktualisieren
> 		display.show("T")
> 		# Befehl senden
>         if button_a.was_pressed():
>             radio.send("TRACKER:REVERSE")
>
>     sleep(100)
>
> # Fernsteuerung beendet
> display.show("0")
> ```

> [!example] Challenge 3: Fernsteuerung im Roboter empfangen
>
> Jetzt muss der **Roboter** die Funknachrichten empfangen und verarbeiten.
>
> **Aufgaben:**
> 1. Empfangen Sie Funknachrichten mit `radio.receive()`
> 2. Prüfen Sie, ob eine Nachricht empfangen wurde (nicht `None`)
> 3. Vergleichen Sie die Nachricht direkt mit den möglichen Befehlen:
>    - "MODE:0", "MODE:1", "MODE:2" → Modus wechseln
>    - "MOVE:FF", "MOVE:LT", "MOVE:RT", "MOVE:00" → Motoren steuern (nur im Fernsteuerungsmodus)
>    - "TRACKER:REVERSE" → Richtung umkehren (nur im Tracker-Modus)
>
> **Tipps:**
> - "MOVE:FF" bedeutet beide Motoren Full vorwärts (beide Tasten gedrückt)
> - "MOVE:LT" (left turn) bedeutet auf der Stelle nach links drehen (linker Motor rückwärts, rechter vorwärts)
> - "MOVE:RT" (right turn) bedeutet auf der Stelle nach rechts drehen (linker Motor vorwärts, rechter rückwärts)
> - "MOVE:00" bedeutet Stopp (keine Taste gedrückt)
> - Nutzen Sie `if nachricht == "MODE:1":` statt kompliziertem String-Splitting!

> [!solution]- Mögliche Lösung Challenge 3
>
> ```python
> from microbit import *
> import maqueen
> import radio
>
> # Modi definieren
> MODE_OFF = 0
> MODE_FERNSTEUERUNG = 1
> MODE_TRACKER = 2
>
> # Geschwindigkeiten
> FULL = 200
> SLOW = 50
>
> # Radio konfigurieren
> radio.config(group=42)
> radio.on()
>
> # Startzustand
> mode = MODE_FERNSTEUERUNG
> tracker_direction = 1  # 1 = vorwärts, -1 = rückwärts
>
> while mode != MODE_OFF:
>
>     # Funknachrichten empfangen
>     nachricht = radio.receive()
>
>     # Moduswechsel
>     if nachricht == "MODE:0":
>         mode = MODE_OFF
>     elif nachricht == "MODE:1":
>         mode = MODE_FERNSTEUERUNG
>     elif nachricht == "MODE:2":
>         mode = MODE_TRACKER
>
>     # Je nach Modus handeln
>     if mode == MODE_FERNSTEUERUNG:
>         display.show("F")
>
>         # Bewegungsbefehle verarbeiten
>         if nachricht == "MOVE:FF":
>             # Beide Motoren vorwärts
>             maqueen.set_motor(0, FULL)
>             maqueen.set_motor(1, FULL)
>         elif nachricht == "MOVE:LT":
>             # Links drehen: linker Motor rückwärts, rechter vorwärts
>             maqueen.set_motor(0, -FULL)
>             maqueen.set_motor(1, FULL)
>         elif nachricht == "MOVE:RT":
>             # Rechts drehen: linker Motor vorwärts, rechter rückwärts
>             maqueen.set_motor(0, FULL)
>             maqueen.set_motor(1, -FULL)
>         elif nachricht == "MOVE:00":
>             # Stopp
>             maqueen.motor_stop_all()
>
>     elif mode == MODE_TRACKER:
>         display.show("T")
>         # Hier kommt der Tracker hin
>
> # Programm wird beendet
> maqueen.motor_stop_all()
> display.show("0")
> ```

> [!example] Challenge 4: Tracker-Modus implementieren
>
> Jetzt implementieren Sie den automatischen Tracker-Modus. Der Roboter soll einem schwarzen Fleck am Boden folgen.
>
> **Aufgaben:**
> 1. Lesen Sie die Helligkeitssensoren aus: `maqueen.read_patrol(0)` und `maqueen.read_patrol(1)`
> 2. Implementieren Sie die Linetracker-Logik (siehe [Linetracker-Lektion](microbit-14-linetracker.md))
> 3. Nutzen Sie die Variable `tracker_direction` um vorwärts (+1) oder rückwärts (-1) zu fahren
> 4. Wenn auf der Fernsteuerung Taste A gedrückt wird (im Tracker-Modus!), senden Sie "TRACKER:REVERSE"
> 5. Beim Empfang von "TRACKER:REVERSE" multiplizieren Sie `tracker_direction` mit -1
>
> **Tipps:**
> - Die Tracker-Logik ist: beide hell → geradeaus, links dunkel → links drehen, rechts dunkel → rechts drehen
> - Mit `tracker_direction` können Sie einfach die Geschwindigkeit umkehren: `FULL * tracker_direction`
> - Testen Sie zuerst nur vorwärts, dann fügen Sie die Richtungsumkehr hinzu

> [!solution]- Mögliche Lösung Challenge 4
>
> **Roboter-Code erweitern:**
> ```python
> # Im Tracker-Modus diesen Code einfügen:
> elif mode == MODE_TRACKER:
>     display.show("T")
>
>     # Richtungsumkehr empfangen
>     if nachricht == "TRACKER:REVERSE":
>         tracker_direction = tracker_direction * -1
>
>     # Helligkeitssensoren auslesen
>     left = maqueen.read_patrol(0)
>     right = maqueen.read_patrol(1)
>
>     # Tracker-Logik (0 = dunkel/schwarz, 1 = hell/weiss)
>     if left == 1 and right == 1:
>         # Beide auf hell → geradeaus
>         maqueen.set_motor(0, FULL * tracker_direction)
>         maqueen.set_motor(1, FULL * tracker_direction)
>     elif left == 0 and right == 1:
>         # Links auf schwarz → nach links drehen
>         maqueen.set_motor(0, SLOW * tracker_direction)
>         maqueen.set_motor(1, FULL * tracker_direction)
>     elif left == 1 and right == 0:
>         # Rechts auf schwarz → nach rechts drehen
>         maqueen.set_motor(0, FULL * tracker_direction)
>         maqueen.set_motor(1, SLOW * tracker_direction)
>     else:
>         # Beide auf schwarz → stoppen
>         maqueen.motor_stop_all()
> ```
>
> **Fernsteuerungs-Code erweitern:**
> ```python
> # In der Fernsteuerung, zusätzliche Funktionalität:
> # Wenn im Tracker-Modus Taste A gedrückt wird
> if button_a.was_pressed() and not button_b.was_pressed():
>     radio.send("TRACKER:REVERSE")
> ```

> [!example] Challenge 5: Alles zusammenfügen und testen
>
> Jetzt haben Sie alle Teile! Zeit für den Systemtest.
>
> **Test-Checkliste:**
> 1. ✅ Roboter und Fernsteuerung starten beide im Fernsteuerungsmodus (F angezeigt)
> 2. ✅ Beide Tasten zusammen: Roboter fährt vorwärts (FF)
> 3. ✅ Taste A alleine: Roboter dreht nach links (LT)
> 4. ✅ Taste B alleine: Roboter dreht nach rechts (RT)
> 5. ✅ Keine Taste: Roboter stoppt (00)
> 6. ✅ Fernsteuerung schütteln: Beide wechseln synchron zum Tracker-Modus (T angezeigt)
> 7. ✅ Im Tracker-Modus folgt der Roboter automatisch dem schwarzen Fleck
> 8. ✅ Taste A im Tracker-Modus: Fahrtrichtung kehrt um
> 9. ✅ Nochmal schütteln: Beide wechseln zurück zum Fernsteuerungsmodus
> 10. ✅ Fernsteuerung umdrehen (face down): Beide beenden ihre Loops, Display zeigt "0", alle Motoren stoppen
>
> **Fehlersuche:**
> - Funktioniert die Fernsteuerung nicht? → Prüfen Sie die Radio-Gruppe auf beiden Geräten
> - Modi werden nicht synchronisiert? → Prüfen Sie, ob `radio.send("MODE:" + str(mode))` korrekt ist
> - Roboter dreht in falsche Richtung? → Prüfen Sie die Motor-Nummern (0 = links, 1 = rechts) und Vorzeichen
> - Schütteln wechselt mehrfach? → Das `sleep(500)` nach dem Moduswechsel verhindert Doppel-Wechsel
> - Roboter reagiert nicht auf Tracker? → Testen Sie die Helligkeitssensoren einzeln
> - Richtungsumkehr funktioniert nicht? → Zeigen Sie `tracker_direction` auf dem Display an
> - Umdrehen schaltet nicht aus? → Prüfen Sie die Schreibweise: `'face down'` (mit Leerzeichen!)

> [!example] Bonus-Challenge: Verbesserungen
>
> Ihr Roboter funktioniert? Perfekt! Jetzt können Sie ihn noch verbessern:
>
> 1. **Rückwärtsfahren hinzufügen**: Wenn man im Fernsteuerungsmodus beide Tasten gedrückt hält UND den Microbit nach unten neigt, fährt der Roboter rückwärts
> 2. **Geschwindigkeitsregelung**: Im Tracker-Modus können Sie mit Taste B die Geschwindigkeit zwischen SLOW, MEDIUM und FULL wechseln
> 3. **Statusanzeige auf Fernsteuerung**: Zeigen Sie im Tracker-Modus an, ob der Roboter vorwärts oder rückwärts trackt (↑ oder ↓ statt nur T)
> 4. **LED-Feedback auf Roboter**: Nutzen Sie die LEDs des Maqueen (`maqueen.set_led()`) um den aktuellen Modus anzuzeigen
> 5. **Automatischer Moduswechsel**: Wenn im Tracker-Modus lange keine Linie gefunden wird (beide Sensoren = 1), wechseln Sie automatisch zur Fernsteuerung
> 6. **Sanfteres Drehen**: Statt auf der Stelle zu drehen (LT/RT), könnten Sie mit verschiedenen Geschwindigkeiten sanftere Kurven fahren
> 7. **Code aufräumen**: Lagern Sie die Tracker-Logik in eine eigene Funktion `folge_linie()` aus (siehe [Linienfinder-Lektion](microbit-15-linefinder.md))
> 8. **Notfall-Stop**: Fügen Sie einen Notfall-Stop hinzu - wenn man die Fernsteuerung stark schüttelt (3x hintereinander), stoppen sofort alle Motoren

> [!solution]- Vollständiges Beispiel: Roboter-Code
>
> ```python
> from microbit import *
> import maqueen
> import radio
>
> # Modi definieren
> MODE_OFF = 0
> MODE_FERNSTEUERUNG = 1
> MODE_TRACKER = 2
>
> # Geschwindigkeiten
> FULL = 200
> SLOW = 50
>
> # Radio konfigurieren
> radio.config(group=42)
> radio.on()
>
> # Startzustand
> mode = MODE_FERNSTEUERUNG
> tracker_direction = 1
>
> while mode != MODE_OFF:
>
>     # Funknachrichten empfangen
>     nachricht = radio.receive()
>
>     # Moduswechsel
>     if nachricht == "MODE:0":
>         mode = MODE_OFF
>     elif nachricht == "MODE:1":
>         mode = MODE_FERNSTEUERUNG
>     elif nachricht == "MODE:2":
>         mode = MODE_TRACKER
>
>     # Je nach Modus handeln
>     if mode == MODE_FERNSTEUERUNG:
>         display.show("F")
>
>         # Bewegungsbefehle verarbeiten
>         if nachricht == "MOVE:FF":
>             maqueen.set_motor(0, FULL)
>             maqueen.set_motor(1, FULL)
>         elif nachricht == "MOVE:LT":
>             maqueen.set_motor(0, -FULL)
>             maqueen.set_motor(1, FULL)
>         elif nachricht == "MOVE:RT":
>             maqueen.set_motor(0, FULL)
>             maqueen.set_motor(1, -FULL)
>         elif nachricht == "MOVE:00":
>             maqueen.motor_stop_all()
>
>     elif mode == MODE_TRACKER:
>         display.show("T")
>
>         # Richtungsumkehr empfangen
>         if nachricht == "TRACKER:REVERSE":
>             tracker_direction = tracker_direction * -1
>
>         # Helligkeitssensoren auslesen
>         left = maqueen.read_patrol(0)
>         right = maqueen.read_patrol(1)
>
>         # Tracker-Logik
>         if left == 1 and right == 1:
>             maqueen.set_motor(0, FULL * tracker_direction)
>             maqueen.set_motor(1, FULL * tracker_direction)
>         elif left == 0 and right == 1:
>             maqueen.set_motor(0, SLOW * tracker_direction)
>             maqueen.set_motor(1, FULL * tracker_direction)
>         elif left == 1 and right == 0:
>             maqueen.set_motor(0, FULL * tracker_direction)
>             maqueen.set_motor(1, SLOW * tracker_direction)
>         else:
>             maqueen.motor_stop_all()
>
> # Programm wird beendet
> maqueen.motor_stop_all()
> display.show("0")
> ```

> [!solution]- Vollständiges Beispiel: Fernsteuerungs-Code
>
> ```python
> from microbit import *
> import radio
>
> # Modi definieren
> MODE_OFF = 0
> MODE_FERNSTEUERUNG = 1
> MODE_TRACKER = 2
>
> # Radio konfigurieren
> radio.config(group=42)
> radio.on()
>
> # Startzustand
> mode = MODE_FERNSTEUERUNG
>
> while mode != MODE_OFF:
>
>     # Moduswechsel mit Schütteln
>     if accelerometer.was_gesture('shake'):
>         if mode == MODE_FERNSTEUERUNG:
>             mode = MODE_TRACKER
>         else:
>             mode = MODE_FERNSTEUERUNG
>         radio.send("MODE:" + str(mode))
>         sleep(500)
>
>     # Ausschalten durch Umdrehen
>     if accelerometer.was_gesture('face down'):
>         mode = MODE_OFF
>         radio.send("MODE:0")
>
>     # Display aktualisieren
>     if mode == MODE_FERNSTEUERUNG:
>         display.show("F")
>     elif mode == MODE_TRACKER:
>         display.show("T")
>
>     # Fernsteuerungsmodus: Tasten steuern Bewegung
>     if mode == MODE_FERNSTEUERUNG:
>         if button_a.is_pressed() and button_b.is_pressed():
>             radio.send("MOVE:FF")
>         elif button_a.is_pressed():
>             radio.send("MOVE:LT")
>         elif button_b.is_pressed():
>             radio.send("MOVE:RT")
>         else:
>             radio.send("MOVE:00")
>
>     # Tracker-Modus: Taste A für Richtungswechsel
>     elif mode == MODE_TRACKER:
>         if button_a.was_pressed():
>             radio.send("TRACKER:REVERSE")
>
>     sleep(100)
>
> # Fernsteuerung beendet
> display.show("0")
> ```

## Reflexion

Sie haben jetzt ein komplexes System gebaut, das verschiedene Konzepte elegant kombiniert:

- **Event-Loop** als Herzstück des Programms
- **Zustandsmaschine** zur Verwaltung verschiedener Modi
- **Radio-Kommunikation** zwischen zwei Geräten
- **Sensoren** zur Umgebungswahrnehmung
- **Motorsteuerung** für präzise Bewegungen

Das ist genau so, wie echte Roboter und autonome Systeme funktionieren! Sie haben die Grundlagen der **Robotik** und der **eingebetteten Systeme** kennengelernt.

## Code refaktorieren und auslagern

Wenn Sie sich Ihren Roboter-Code anschauen, werden Sie feststellen: **Er ist ziemlich lang geworden!** Über 70 Zeilen Code in einer einzigen Datei. Das macht es schwierig:
- Den Überblick zu behalten
- Fehler zu finden
- Code wiederzuverwenden

Die Lösung: **Funktionen und separate Dateien**. Schauen wir uns an, wie wir den Code übersichtlicher machen können.

### Schritt 1: Logik in Funktionen auslagern

Der Linetracker-Code nimmt viel Platz ein und könnte eine eigene Funktion sein:

```python
def folge_linie(tracker_direction, FULL=200, SLOW=50):
    """Folgt einer schwarzen Linie am Boden."""
    # Helligkeitssensoren auslesen
    left = maqueen.read_patrol(0)
    right = maqueen.read_patrol(1)

    # Tracker-Logik (0 = dunkel/schwarz, 1 = hell/weiss)
    if left == 1 and right == 1:
        # Beide auf hell → geradeaus
        maqueen.set_motor(0, FULL * tracker_direction)
        maqueen.set_motor(1, FULL * tracker_direction)
    elif left == 0 and right == 1:
        # Links auf schwarz → nach links drehen
        maqueen.set_motor(0, SLOW * tracker_direction)
        maqueen.set_motor(1, FULL * tracker_direction)
    elif left == 1 and right == 0:
        # Rechts auf schwarz → nach rechts drehen
        maqueen.set_motor(0, FULL * tracker_direction)
        maqueen.set_motor(1, SLOW * tracker_direction)
    else:
        # Beide auf schwarz → stoppen
        maqueen.motor_stop_all()
```

Auch die Bewegungsbefehle könnten wir vereinfachen:

```python
def fahre(nachricht, FULL=200):
    """Verarbeitet Bewegungsbefehle."""
    if nachricht == "MOVE:FF":
        maqueen.set_motor(0, FULL)
        maqueen.set_motor(1, FULL)
    elif nachricht == "MOVE:LT":
        maqueen.set_motor(0, -FULL)
        maqueen.set_motor(1, FULL)
    elif nachricht == "MOVE:RT":
        maqueen.set_motor(0, FULL)
        maqueen.set_motor(1, -FULL)
    elif nachricht == "MOVE:00":
        maqueen.motor_stop_all()
```

### Schritt 2: Funktionen in eigene Dateien auslagern

Jetzt wird es richtig elegant! Wir können die Funktionen in eigene Dateien packen:

**Datei: `linetracker.py`**
```python
import maqueen

def folge_linie(tracker_direction, FULL=200, SLOW=50):
    """Folgt einer schwarzen Linie am Boden."""
    left = maqueen.read_patrol(0)
    right = maqueen.read_patrol(1)

    if left == 1 and right == 1:
        maqueen.set_motor(0, FULL * tracker_direction)
        maqueen.set_motor(1, FULL * tracker_direction)
    elif left == 0 and right == 1:
        maqueen.set_motor(0, SLOW * tracker_direction)
        maqueen.set_motor(1, FULL * tracker_direction)
    elif left == 1 and right == 0:
        maqueen.set_motor(0, FULL * tracker_direction)
        maqueen.set_motor(1, SLOW * tracker_direction)
    else:
        maqueen.motor_stop_all()
```

**Datei: `bewegung.py`**
```python
import maqueen

def fahre(nachricht, FULL=200):
    """Verarbeitet Bewegungsbefehle."""
    if nachricht == "MOVE:FF":
        maqueen.set_motor(0, FULL)
        maqueen.set_motor(1, FULL)
    elif nachricht == "MOVE:LT":
        maqueen.set_motor(0, -FULL)
        maqueen.set_motor(1, FULL)
    elif nachricht == "MOVE:RT":
        maqueen.set_motor(0, FULL)
        maqueen.set_motor(1, -FULL)
    elif nachricht == "MOVE:00":
        maqueen.motor_stop_all()
```

### Schritt 3: Refaktoriertes Hauptprogramm

Jetzt sieht unser Hauptprogramm **viel übersichtlicher** aus:

```python
from microbit import *
import maqueen
import radio
from linetracker import folge_linie
from bewegung import fahre

# Modi definieren
MODE_OFF = 0
MODE_FERNSTEUERUNG = 1
MODE_TRACKER = 2

# Geschwindigkeiten
FULL = 200
SLOW = 50

# Radio konfigurieren
radio.config(group=42)
radio.on()

# Startzustand
mode = MODE_FERNSTEUERUNG
tracker_direction = 1

while mode != MODE_OFF:

    # Funknachrichten empfangen
    nachricht = radio.receive()

    # Moduswechsel
    if nachricht == "MODE:0":
        mode = MODE_OFF
    elif nachricht == "MODE:1":
        mode = MODE_FERNSTEUERUNG
    elif nachricht == "MODE:2":
        mode = MODE_TRACKER

    # Je nach Modus handeln
    if mode == MODE_FERNSTEUERUNG:
        display.show("F")
        fahre(nachricht, FULL)

    elif mode == MODE_TRACKER:
        display.show("T")

        # Richtungsumkehr empfangen
        if nachricht == "TRACKER:REVERSE":
            tracker_direction = tracker_direction * -1

        # Linie folgen
        folge_linie(tracker_direction, FULL, SLOW)

# Programm wird beendet
maqueen.motor_stop_all()
display.show("0")
```

### Die Vorteile

Sehen Sie den Unterschied? Das Hauptprogramm ist von **über 70 Zeilen auf ca. 40 Zeilen** geschrumpft und **viel lesbarer**:

✅ **Übersichtlicher**: Die Hauptlogik ist klar erkennbar
✅ **Wiederverwendbar**: Die Funktionen können Sie in anderen Projekten nutzen
✅ **Einfacher zu testen**: Sie können jede Funktion einzeln testen
✅ **Leichter zu erweitern**: Neue Modi hinzufügen wird einfacher
✅ **Teamarbeit möglich**: Verschiedene Personen können an verschiedenen Dateien arbeiten

> [!tip] Mehr dazu
>
> In der [Linienfinder-Lektion](microbit-15-linefinder.md) finden Sie weitere Details zum Code-Refactoring und wie man Code in mehrere Dateien aufteilt.

**Nächste Schritte:**
- Experimentieren Sie mit weiteren Modi (z.B. "Hindernis-Ausweichen")
- Kombinieren Sie mehrere Sensoren (Distanz + Helligkeit)
- Lagern Sie noch mehr Code in eigene Funktionen und Dateien aus
- Bauen Sie eine Bibliothek von wiederverwendbaren Funktionen für Ihre Projekte
