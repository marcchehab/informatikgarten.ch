---
title: Lichtsensoren des Maqueen-Roboters
---

> [!success] Lernziele
>
> - **Funktionsweise eines optischen Sensors**: Sie können erklären, wie der Infrarot-Lichtsensor des Maqueen funktioniert.
> - **Digitale Signalverarbeitung**: Sie verstehen, wie der micro:bit das Signal des Sensors einliest und verarbeitet.
> - **Anwendung in der Linienverfolgung**: Sie können nachvollziehen, wie die Sensoren für die Linienverfolgung eingesetzt werden.

## 1. Der Infrarot-Lichtsensor des Maqueen

Der Maqueen-Roboter von DFRobot verfügt über zwei sogenannte **Patrol-Sensoren**, die sich an der Unterseite des Roboters befinden. Diese Sensoren basieren auf **Infrarot-Technologie** und bestehen aus zwei Komponenten:

1. **Infrarot-LED (Sender)**: Sendet unsichtbares Infrarotlicht nach unten auf die Oberfläche
2. **Fototransistor (Empfänger)**: Empfängt das von der Oberfläche reflektierte Licht

### Funktionsprinzip

Das Funktionsprinzip ist einfach aber effektiv:

- **Helle Oberfläche (weiss)**: Das Infrarotlicht wird stark reflektiert. Der Fototransistor empfängt viel Licht und gibt ein **HIGH-Signal (1)** aus.
- **Dunkle Oberfläche (schwarz)**: Das Infrarotlicht wird absorbiert und kaum reflektiert. Der Fototransistor empfängt wenig Licht und gibt ein **LOW-Signal (0)** aus.

```
        IR-LED    Fototransistor
           |           |
           v           ^
           *~~~~~~~~~~~*
                |   ^
    ========================  <- Oberfläche
```

## 2. Signalverarbeitung durch den micro:bit

Der Maqueen-Roboter ist so konstruiert, dass die Patrol-Sensoren direkt mit den GPIO-Pins des micro:bit verbunden sind:

- **Linker Sensor**: Pin 13
- **Rechter Sensor**: Pin 14

Die Sensoren liefern bereits ein **digitales Signal** – das bedeutet, die Elektronik im Sensor wandelt die analoge Lichtintensität bereits in ein einfaches 0 oder 1 um. Der micro:bit muss also nur diesen digitalen Wert einlesen.

### Die Funktion `read_patrol()` in der Bibliothek `maqueen.py`

In unserer Bibliothek `maqueen.py` haben wir eine Funktion, die das Einlesen der Sensoren vereinfacht:

```python
def read_patrol(which):
    """
    Reads patrol sensor, returns 0 or 1.

    Args:
            which (int): 0 = left, 1 = right
    """
    if which == 0:  # left
        return microbit.pin13.read_digital()
    elif which == 1:  # right
        return microbit.pin14.read_digital()
```

**Erklärung:**
- Der Parameter `which` bestimmt, welcher Sensor ausgelesen wird (0 = links, 1 = rechts)
- `microbit.pin13.read_digital()` liest den digitalen Wert vom entsprechenden Pin
- Die Funktion gibt **0** zurück, wenn der Sensor eine dunkle Fläche sieht, und **1** bei einer hellen Fläche

> [!example] Reflexion
>
> Überlegen Sie: Warum verwenden wir Infrarotlicht statt sichtbarem Licht? Ein Grund ist, dass Infrarot weniger von Umgebungslicht beeinflusst wird. Ein weiterer Vorteil: Das unsichtbare Licht stört nicht bei der Beobachtung des Roboters.


## 3. Physik des Fototransistors

Ein Fototransistor ist im Wesentlichen ein Transistor, dessen Basis dem Licht ausgesetzt ist. Um seine Funktionsweise zu verstehen, müssen wir uns mit **Halbleitern** beschäftigen.

#### Halbleiter und der pn-Übergang

Halbleiter wie Silizium haben eine besondere Eigenschaft: Ihre elektrische Leitfähigkeit liegt zwischen der von Leitern (z.B. Kupfer) und Isolatoren (z.B. Glas). Durch gezielte Verunreinigung (**Dotierung**) kann man zwei Typen erzeugen:

- **n-Typ**: Überschuss an freien Elektronen (negative Ladungsträger)
- **p-Typ**: Überschuss an "Löchern" (fehlende Elektronen, wirken wie positive Ladungsträger)

Bringt man p- und n-dotierte Schichten zusammen, entsteht ein **Übergang**. An dieser Grenzschicht bildet sich eine **Sperrzone**, in der kaum freie Ladungsträger vorhanden sind.

#### Der photoelektrische Effekt

Wenn Licht (Photonen) auf den Halbleiter trifft, kann es Elektronen aus ihren Bindungen lösen – vorausgesetzt, die Photonenenergie ist gross genug. 

Ein einfacher pn-Übergang (Photodiode) erzeugt nur einen sehr kleinen Strom. Der **Fototransistor** löst dieses Problem durch eingebaute Verstärkung:

1. **Licht trifft auf die Basis**: Photonen erzeugen Elektron-Loch-Paare
2. **Basisstrom entsteht**: Die erzeugten Ladungsträger bilden einen kleinen Photostrom
3. **Transistor verstärkt**: Dieser kleine Basisstrom steuert einen viel grösseren Kollektorstrom

Der Verstärkungsfaktor liegt typischerweise bei 100-1000. Das bedeutet: Ein kleines Lichtsignal erzeugt ein gut messbares elektrisches Signal.

## 4. Grenzen und Herausforderungen

Der einfache digitale Sensor hat einige Einschränkungen:

- **Keine Abstufungen**: Der Sensor liefert nur 0 oder 1, keine Graustufen. Ein analoger Sensor könnte feinere Unterschiede erkennen.
- **Umgebungslicht**: Starkes Sonnenlicht oder Scheinwerfer können die Messung beeinflussen.
- **Oberflächenbeschaffenheit**: Glänzende Oberflächen können Licht anders reflektieren als matte.
- **Abstand zur Oberfläche**: Der Sensor funktioniert nur in einem bestimmten Abstandsbereich optimal.

