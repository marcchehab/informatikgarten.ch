---
title: Code refaktorieren und auslagern
---

Wenn Sie sich Ihren Roboter-Code anschauen, werden Sie feststellen: **Er ist ziemlich lang geworden!** Über 70 Zeilen Code in einer einzigen Datei. Das macht es schwierig:
- Den Überblick zu behalten
- Fehler zu finden
- Code wiederzuverwenden

Die Lösung: **Funktionen und separate Dateien**. Schauen wir uns an, wie wir den Code übersichtlicher machen können.

### Schritt 1: Logik in Funktionen auslagern

Der Linetracker-Code nimmt viel Platz ein und könnte eine eigene Funktion sein:

```python
def folge_linie(FULL=100, SLOW=0):
    """Folgt einem schwarzen Fleck am Boden (links herum)."""
    # Helligkeitssensoren auslesen
    left = maqueen.read_patrol(0)
    right = maqueen.read_patrol(1)

    # Tracker-Logik (0 = dunkel/schwarz, 1 = hell/weiss)
    # Der Roboter fährt links herum um den schwarzen Fleck
    if left == 0 and right == 1:
        # Perfekt! Linker Sensor auf schwarz → Geradeaus
        maqueen.set_motor(0, FULL)
        maqueen.set_motor(1, FULL)
    elif left == 0 and right == 0:
        # Beide auf schwarz → zu weit links! Nach rechts drehen
        maqueen.set_motor(0, FULL)
        maqueen.set_motor(1, SLOW)
    elif left == 1 and right == 1:
        # Beide auf hell → zu weit rechts! Nach links drehen
        maqueen.set_motor(0, SLOW)
        maqueen.set_motor(1, FULL)
    # left == 1 and right == 0 → ignorieren, einfach weiterfahren
```

Auch die Bewegungsbefehle könnten wir vereinfachen:

```python
def fahre(nachricht, FULL=100):
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

def folge_linie(FULL=100, SLOW=0):
    """Folgt einem schwarzen Fleck am Boden (links herum)."""
    left = maqueen.read_patrol(0)
    right = maqueen.read_patrol(1)

    # Tracker-Logik (0 = dunkel/schwarz, 1 = hell/weiss)
    if left == 0 and right == 1:
        # Perfekt! Linker Sensor auf schwarz → Geradeaus
        maqueen.set_motor(0, FULL)
        maqueen.set_motor(1, FULL)
    elif left == 0 and right == 0:
        # Beide auf schwarz → zu weit links! Nach rechts drehen
        maqueen.set_motor(0, FULL)
        maqueen.set_motor(1, SLOW)
    elif left == 1 and right == 1:
        # Beide auf hell → zu weit rechts! Nach links drehen
        maqueen.set_motor(0, SLOW)
        maqueen.set_motor(1, FULL)
    # left == 1 and right == 0 → ignorieren, einfach weiterfahren
```

**Datei: `bewegung.py`**
```python
import maqueen

def fahre(nachricht, FULL=100):
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
MODE_OFF = "MODE:OFF"
MODE_FERNSTEUERUNG = "MODE:FERNSTEUERUNG"
MODE_TRACKER = "MODE:TRACKER"

# Geschwindigkeiten
FULL = 100
SLOW = 0  # 0 für scharfe Kurven, oder 50 für sanftere Kurven

# Radio konfigurieren
radio.config(group=42)
radio.on()

# Startzustand
mode = MODE_FERNSTEUERUNG

while mode != MODE_OFF:

    # Funknachrichten empfangen
    nachricht = radio.receive()

    # Moduswechsel
    if nachricht == MODE_OFF:
        mode = MODE_OFF
    elif nachricht == MODE_FERNSTEUERUNG:
        mode = MODE_FERNSTEUERUNG
    elif nachricht == MODE_TRACKER:
        mode = MODE_TRACKER

    # Je nach Modus handeln
    if mode == MODE_FERNSTEUERUNG:
        display.show("F")
        fahre(nachricht, FULL)

    elif mode == MODE_TRACKER:
        display.show("T")
        # Linie folgen
        folge_linie(FULL, SLOW)

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
