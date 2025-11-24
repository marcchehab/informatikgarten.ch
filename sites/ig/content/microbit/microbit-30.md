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
1. **Modus "Fernsteuern"**: Beide Motoren werden per Funk ferngesteuert - freie Bewegung in alle Richtungen
2. **Modus "Tracker"**: Der Roboter folgt automatisch einem schwarzen Fleck am Boden (links herum)
3. **Modus "Off"**: Alle Motoren werden abgestellt und das Programm wird sauber beendet

Das Besondere: Sie benötigen **zwei Microbits** - einen im Roboter und einen als Fernsteuerung!

## Planung: Die Zustandsmaschine

Erinnern Sie sich an die [Zustandsmaschine aus der Buttons-Lektion](microbit-05-buttons.md#zusatz-laufmodi-verstehen)? Genau dieses Konzept brauchen wir hier!

```python
# Verschiedene Modi als Konstanten (Strings sind einfacher!)
MODE_OFF = "MODE:OFF"
MODE_FERNSTEUERUNG = "MODE:FERNSTEUERUNG"
MODE_TRACKER = "MODE:TRACKER"

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
> MODE_OFF = "MODE:OFF"
> MODE_FERNSTEUERUNG = "MODE:FERNSTEUERUNG"
> MODE_TRACKER = "MODE:TRACKER"
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
> - **Modus "Tracker"**: Der Roboter fährt automatisch, keine Tasten nötig
> - **Moduswechsel**: Schütteln wechselt zwischen den Modi
> - **Ausschalten**: Fernsteuerung umdrehen (face down) schaltet beide aus
>
> **Aufgaben:**
> 1. Erstellen Sie Modi für die Fernsteuerung (gleiche Konstanten wie beim Roboter)
> 2. **Schütteln** (`accelerometer.was_gesture('shake')`) wechselt zwischen MODE_FERNSTEUERUNG und MODE_TRACKER:
>    - Ändert den Modus der Fernsteuerung selbst
>    - Sendet den neuen Modus an den Roboter, um ihn zu synchronisieren (z.B. `radio.send(MODE_FERNSTEUERUNG)`)
> 3. **Umdrehen** (`accelerometer.was_gesture('face down')`) sendet MODE_OFF und beendet beide Loops
> 4. Zeigen Sie den aktuellen Modus auf dem Display an (F oder T)
>
> **Im Fernsteuerungsmodus:**
> - `button_a.is_pressed() and button_b.is_pressed()`: Sende "MOVE:FF" (vorwärts)
> - `button_a.is_pressed()`: Sende "MOVE:LT" (left turn - nach links drehen)
> - `button_b.is_pressed()`: Sende "MOVE:RT" (right turn - nach rechts drehen)
> - Keine Taste gedrückt: Sende "MOVE:00" (stopp)
>
> **Im Tracker-Modus:**
> - Keine Tasten-Steuerung nötig - der Roboter fährt automatisch!
>
> **Tipps:**
> - Beim Moduswechsel: Erst den eigenen Modus ändern, dann den Befehl senden
> - Nutzen Sie `is_pressed()` für kontinuierliche Bewegung (Taste gedrückt halten)
> - Da die Modi jetzt Strings sind, können Sie sie direkt mit `radio.send(mode)` senden!
> - Testen Sie zuerst nur den Moduswechsel mit Schütteln

> [!solution]- Mögliche Lösung Challenge 2
>
> ```python
> from microbit import *
> import radio
>
> # Modi definieren (gleich wie beim Roboter!)
> MODE_OFF = "MODE:OFF"
> MODE_FERNSTEUERUNG = "MODE:FERNSTEUERUNG"
> MODE_TRACKER = "MODE:TRACKER"
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
>         # Roboter synchronisieren - einfach den Modus senden!
>         radio.send(mode)
>         sleep(500)  # Kurz warten, damit nicht mehrfach gewechselt wird
>
>     # Ausschalten durch Umdrehen
>     if accelerometer.was_gesture('face down'):
>         mode = MODE_OFF
>         radio.send(mode)
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
>     # Tracker-Modus: Roboter fährt automatisch
>     elif mode == MODE_TRACKER:
> 	    # Display aktualisieren
> 		display.show("T")
> 		# Keine Tasten-Steuerung nötig!
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
>    - MODE_OFF, MODE_FERNSTEUERUNG, MODE_TRACKER → Modus wechseln
>    - "MOVE:FF", "MOVE:LT", "MOVE:RT", "MOVE:00" → Motoren steuern (nur im Fernsteuerungsmodus)
>
> **Tipps:**
> - "MOVE:FF" bedeutet beide Motoren Full vorwärts (beide Tasten gedrückt)
> - "MOVE:LT" (left turn) bedeutet auf der Stelle nach links drehen (linker Motor rückwärts, rechter vorwärts)
> - "MOVE:RT" (right turn) bedeutet auf der Stelle nach rechts drehen (linker Motor vorwärts, rechter rückwärts)
> - "MOVE:00" bedeutet Stopp (keine Taste gedrückt)
> - Nutzen Sie `if nachricht == MODE_FERNSTEUERUNG:` statt kompliziertem String-Splitting!

> [!solution]- Mögliche Lösung Challenge 3
>
> ```python
> from microbit import *
> import maqueen
> import radio
>
> # Modi definieren
> MODE_OFF = "MODE:OFF"
> MODE_FERNSTEUERUNG = "MODE:FERNSTEUERUNG"
> MODE_TRACKER = "MODE:TRACKER"
>
> # Geschwindigkeiten
> FULL = 100
> SLOW = 50
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
>     # Funknachrichten empfangen
>     nachricht = radio.receive()
>
>     # Moduswechsel - einfacher Vergleich mit den Konstanten!
>     if nachricht == MODE_OFF:
>         mode = MODE_OFF
>     elif nachricht == MODE_FERNSTEUERUNG:
>         mode = MODE_FERNSTEUERUNG
>     elif nachricht == MODE_TRACKER:
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
> Jetzt implementieren Sie den automatischen Tracker-Modus. Der Roboter soll einem **schwarzen Fleck** am Boden folgen - er fährt am Rand des Flecks entlang (links herum).
>
> **Aufgaben:**
> 1. Lesen Sie die Helligkeitssensoren aus: `maqueen.read_patrol(0)` und `maqueen.read_patrol(1)`
> 2. Implementieren Sie die Tracker-Logik für einen schwarzen Fleck:
>    - `left == 0 and right == 1` (linker Sensor auf schwarz): Perfekt! Geradeaus fahren
>    - `left == 1 and right == 1` (beide auf hell): Zu weit rechts! Nach links drehen
>    - `left == 0 and right == 0` (beide auf schwarz): Zu weit links! Nach rechts drehen
>    - Im Fall `left == 1 and right == 0` drehen wir uns weiter
>
> **Tipps:**
> - Der Roboter folgt dem Fleck "links herum" - der linke Sensor ist auf dem Fleck
> - SLOW können Sie auf 0 setzen für schärfere Kurven (Drehen auf der Stelle)
> - Bei "nach links drehen" ist der linke Motor langsam (SLOW), der rechte schnell (FULL)
> - Bei "nach rechts drehen" ist der linke Motor schnell (FULL), der rechte langsam (SLOW)

> [!solution]- Mögliche Lösung Challenge 4
>
> **Roboter-Code erweitern:**
> ```python
> # Im Tracker-Modus diesen Code einfügen:
> elif mode == MODE_TRACKER:
>     display.show("T")
>
>     # Helligkeitssensoren auslesen
>     left = maqueen.read_patrol(0)
>     right = maqueen.read_patrol(1)
>
>     # Tracker-Logik (0 = dunkel/schwarz, 1 = hell/weiss)
>     # Der Roboter fährt links herum um den schwarzen Fleck
>     if left == 0 and right == 1:
>         # Perfekt! Linker Sensor auf schwarz → Geradeaus
>         maqueen.set_motor(0, FULL)
>         maqueen.set_motor(1, FULL)
>     elif left == 0 and right == 0:
>         # Beide auf schwarz → zu weit links! Nach rechts drehen
>         maqueen.set_motor(0, FULL)
>         maqueen.set_motor(1, SLOW)
>     else:
>         # Beide auf hell → zu weit rechts! Nach links drehen
>         # Sie könnten auch schreiben: elif left == 1 and right == 1 ,
>         # aber so dreht der Roboter auch, wenn er verkehrt auf der Kante steht
>         maqueen.set_motor(0, SLOW)
>         maqueen.set_motor(1, FULL)
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
> 7. ✅ Im Tracker-Modus folgt der Roboter automatisch dem schwarzen Fleck (links herum)
> 8. ✅ Nochmal schütteln: Beide wechseln zurück zum Fernsteuerungsmodus
> 9. ✅ Fernsteuerung umdrehen (face down): Beide beenden ihre Loops, Display zeigt "0", alle Motoren stoppen
>
> **Fehlersuche:**
> - Funktioniert die Fernsteuerung nicht? → Prüfen Sie die Radio-Gruppe auf beiden Geräten
> - Modi werden nicht synchronisiert? → Prüfen Sie, ob `radio.send(mode)` korrekt verwendet wird
> - Roboter dreht in falsche Richtung? → Prüfen Sie die Motor-Nummern (0 = links, 1 = rechts) und Vorzeichen
> - Schütteln wechselt mehrfach? → Das `sleep(500)` nach dem Moduswechsel verhindert Doppel-Wechsel
> - Roboter reagiert nicht auf Tracker? → Testen Sie die Helligkeitssensoren einzeln (display.show(left) und display.show(right))
> - Roboter fährt vom Fleck weg? → Prüfen Sie die Logik: left == 0 bedeutet "linker Sensor auf schwarz"
> - Umdrehen schaltet nicht aus? → Prüfen Sie die Schreibweise: `'face down'` (mit Leerzeichen!)

> [!example] Bonus-Challenge: Verbesserungen
>
> Ihr Roboter funktioniert? Perfekt! Jetzt können Sie ihn noch verbessern:
>
> 1. **Rückwärtsfahren hinzufügen**: Wenn man im Fernsteuerungsmodus beide Tasten gedrückt hält UND den Microbit nach unten neigt, fährt der Roboter rückwärts
> 2. **Geschwindigkeitsregelung**: Im Tracker-Modus können Sie mit Taste A/B die Geschwindigkeit zwischen verschiedenen Stufen wechseln
> 3. **LED-Feedback auf Roboter**: Nutzen Sie die LEDs des Maqueen (`maqueen.set_led()`) um den aktuellen Modus anzuzeigen
> 4. **Automatischer Moduswechsel**: Wenn im Tracker-Modus lange keine Linie gefunden wird (beide Sensoren = 1), wechseln Sie automatisch zur Fernsteuerung
> 5. **Sanfteres Drehen**: Statt auf der Stelle zu drehen (LT/RT), könnten Sie mit verschiedenen Geschwindigkeiten sanftere Kurven fahren
> 6. **Code aufräumen**: Lagern Sie die Tracker-Logik in eine eigene Funktion `folge_linie()` aus (siehe [Linienfinder-Lektion](microbit-15-linefinder.md))
> 7. **Notfall-Stop**: Fügen Sie einen Notfall-Stop hinzu - wenn man die Fernsteuerung stark schüttelt (3x hintereinander), stoppen sofort alle Motoren
> 8. **Zweite Fahrtrichtung**: Als Herausforderung können Sie einen zweiten Tracker-Modus hinzufügen, der rechts herum um den Fleck fährt

> [!solution]- Vollständiges Beispiel: Roboter-Code
>
> ```python
> from microbit import *
> import maqueen
> import radio
>
> # Modi definieren
> MODE_OFF = "MODE:OFF"
> MODE_FERNSTEUERUNG = "MODE:FERNSTEUERUNG"
> MODE_TRACKER = "MODE:TRACKER"
>
> # Geschwindigkeiten
> FULL = 100
> SLOW = 0  # 0 für scharfe Kurven, oder 50 für sanftere Kurven
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
>     # Funknachrichten empfangen
>     nachricht = radio.receive()
>
>     # Moduswechsel
>     if nachricht == MODE_OFF:
>         mode = MODE_OFF
>     elif nachricht == MODE_FERNSTEUERUNG:
>         mode = MODE_FERNSTEUERUNG
>     elif nachricht == MODE_TRACKER:
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
> 	    display.show("T")
>	
> 	    # Helligkeitssensoren auslesen
> 	    left = maqueen.read_patrol(0)
> 	    right = maqueen.read_patrol(1)
>	
> 	    # Tracker-Logik (0 = dunkel/schwarz, 1 = hell/weiss)
> 	    # Der Roboter fährt links herum um den schwarzen Fleck
> 	    if left == 0 and right == 1:
> 	        # Perfekt! Linker Sensor auf schwarz → Geradeaus
> 	        maqueen.set_motor(0, FULL)
> 	        maqueen.set_motor(1, FULL)
> 	    elif left == 0 and right == 0:
> 	        # Beide auf schwarz → zu weit links! Nach rechts drehen
> 	        maqueen.set_motor(0, FULL)
> 	        maqueen.set_motor(1, SLOW)
> 	    else:
> 	        # Beide auf hell → zu weit rechts! Nach links drehen
> 	        # Sie könnten auch schreiben: elif left == 1 and right == 1 ,
> 	        # aber so dreht der Roboter auch, wenn er verkehrt auf der Kante steht
> 	        maqueen.set_motor(0, SLOW)
> 	        maqueen.set_motor(1, FULL)
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
> MODE_OFF = "MODE:OFF"
> MODE_FERNSTEUERUNG = "MODE:FERNSTEUERUNG"
> MODE_TRACKER = "MODE:TRACKER"
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
>         # Einfach den Modus senden!
>         radio.send(mode)
>         sleep(500)
>
>     # Ausschalten durch Umdrehen
>     if accelerometer.was_gesture('face down'):
>         mode = MODE_OFF
>         radio.send(mode)
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
>     # Tracker-Modus: Roboter fährt automatisch
>     # (keine Tasten-Steuerung nötig)
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
