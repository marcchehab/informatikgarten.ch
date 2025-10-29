---
title: Prüfungsvorbereitung
---

> [!success] Umfang
> 
> - Die Prüfung wird auf Exam.net stattfinden und 60 Minuten dauern. Sie umfasst Theorie, aber besteht hauptsächlich aus praktischen Programmieraufgaben.
> - Sie werden Zugang [zum Microbit-Editor](https://python.microbit.org/v/3) und seiner Dokumentation haben, mit dem Sie dank dem Simulator auf der rechten Seite auch zuhause üben können.
> - Es gelten die Lernziele der Lektionen, die wir behandelt haben, sofern sie hier nicht ausgeschlossen werden:
> 	- Bei der Lektion [[microbit-05-buttons|zu den Knöpfen]] haben wir die Knacknuss-Aufgabe ("Kitt") und den Teil zu Laufmodi nicht behandelt.

Folgende Übungsaufgaben sollten Ihnen zur Prüfungsvorbereitung hilfreich sein. 
## Herz pocht nicht

Hilfe! Folgendes Programm zeigt immer nur ein grosses Herz an. Erklären Sie meinen Fehler und was man auf welchen Linien hinzufügen müsste.

```python showLineNumbers
from microbit import *

while True:
    display.show(Image.HEART)
    sleep(1000)
    display.show(Image.HEART_SMALL)
```

> [!solution]- Lösung
> 
> Nach `display.show(Image.HEART_SMALL)` wiederholt der Microbit die while-Schleife sofort und zeigt wieder das grosse Herz an. Man müsste also etwas **warten mit `sleep()`, z.B. `sleep(500)`**.

---
## Muster selbst zeichnen

Was für ein Muster generiert folgenden Code? Sagen Sie voraus, welche LEDs nach diesem Programm angestellt sein werden.

```python
from microbit import *

for i in range(1,4):
    display.set_pixel(i, 1, 9)

for i in range(1,2):
    display.set_pixel(i, 2, 9)

for i in range(0,3):
    display.set_pixel(2, i, 0)

display.set_pixel(3, 3, 0)
```

> [!solution]- Lösung
> 
> ![[microbit-led-pattern3.png]]

## Muster nachprogrammieren

Schreiben Sie ein Programm mit so wenigen Zeilen Code wie möglich, das folgendes Muster auf dem Display generiert. (Ohne Image() zu gebrauchen. Leerzeilen zählen nicht.)

![[microbit-90-examprep-pattern-1.png]]


> [!solution]- Lösung
> 
> ```python
> from microbit import *
> 
> for i in range(0,4):
>     display.set_pixel(1, i, 9)
> 
> for i in range(2,5):
>     display.set_pixel(i, 4, 9)
> 
> display.set_pixel(4, 1, 9)
> ```

## Spalten füllen

Schreiben Sie ein Programm, das im Sekundentakt ein LED nach dem andern der mittleren Spalte anstellt.


> [!solution]- Lösung
> 
> ```python
> from microbit import *
> 
> for i in range(5):
>     display.set_pixel(2,i,9)
>     sleep(1000)
> ```
> 

## Display füllen

Schreiben Sie ein Programm mit einer Funktion `fill(anzahl)`, die in den mittleren drei Spalten die gewünschte Anzahl LEDs sofort anstellt. Ein Beispiel-Auftruf für 13 LEDs wäre `fill(13)` und würde so aussehen:

![[microbit-90-fillmiddle.png]]

> [!solution]- Lösung
> 
> ```python
> from microbit import *
> 
> def fill(anzahl):
>     angestellt = 0
>     for x in range(1,4):
>         for y in range(5):
>             if angestellt == anzahl:
>                 return
>             display.set_pixel(x,y,9)
>             angestellt += 1
> 
> fill(13)
> ```

## Display mit Knöpfen auffüllen

Erweitern Sie das fill()-Programm so, dass die Spalten nicht automatisch auffüllen, sondern dass man die Knöpfe A und B drücken kann, und dann jeweils ein LED mehr (Knopf B) oder weniger (Knopf A) anstellt. Achtung: Beachten Sie die "Edge-Cases" - d.h. die Randfälle, wenn Sie beispielsweise bereits keine LEDs angestellt haben und nochmal A drücken.

> [!solution]- Lösung
> 
> ```python
> from microbit import *
> 
> def fill(anzahl):
>     display.clear()
>     angestellt = 0
>     for x in range(1,4):
>         for y in range(5):
>             if angestellt == anzahl:
>                 return
>             display.set_pixel(x,y,9)
>             angestellt += 1
> 
> leds = 7
> fill(leds)
> 
> while True:
>     if button_a.was_pressed() and leds > 0:
>         leds -= 1
>         fill(leds)
>     if button_b.was_pressed() and leds < 15:
>         leds += 1
>         fill(leds)
> ```

## Beschleunigungssensor gebrauchen

Schreiben Sie ein Programm, das auf dem Screen ein Smiley anzeigt, wenn Sie die Vorderseite des Microbit nach oben drehen, und den Screen wieder abstellt, wenn Sie den Microbit nach unten drehen.

> [!solution]- Lösung
> 
> ```python
> from microbit import *
> 
> while True:
>     if accelerometer.was_gesture('face up'):
>         display.show(Image.HAPPY)
>     if accelerometer.was_gesture('face down'):
>         display.clear()
> ```
