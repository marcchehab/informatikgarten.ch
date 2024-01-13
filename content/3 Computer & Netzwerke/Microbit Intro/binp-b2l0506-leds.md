---
title: "L05+L06: Den Screen ansteuern"
---
> [!success]  Lernziele
> 
> - Sie können die Idee von Design-Mustern erklären.
> - Sie können mit einem Event Loop ein Programm schreiben, das man per Knopfdruck beenden kann (siehe Theorieeintrag)
> - Sie wissen, wie man mit `return` eine Funktion abbrechen kann, wenn Sie den gewünschten Zustand erreicht hat, z.B. L2  (siehe Theorieeintrag)

Der Microbit hat ein 5x5 Screen mit insgesamt 25 LEDs, die wir mit `microbit.display` ansteuern können.
## LEDs auffüllen

### L1: Reihe auffüllen
Schreiben Sie ein Programm, bei dem man sieht, wie es die erste Reihe Pixel um Pixel auffüllt.

> [!question]- Lösung
> 
> ```python
> 	for x in range(5):
> 			display.set_pixel(x, 0, 9)
> 			sleep(500)
> ```
### L2: Gesamten Screen auffüllen
Erweitern Sie das Programm so, dass nicht nur die erste Reihe, sondern der gesamte Screen aufgefüllt wird.
> [!question]- Lösung
> 
> ```python
> for y in range(5):
>     for x in range(5):
> 		display.set_pixel(x, y, 9)
>         sleep(500)
> ```
### L3: Zusatz: Diagonale
Erweitern Sie das Programm so, dass die Pixel der Diagonale **nicht** angestellt werden - alle andern aber schon! 😊
> [!question]- Lösung
> 
> ```python
> for y in range(5):
>     for x in range(5):
>         if not x == y:
>             display.set_pixel(x, y, 9)
>         sleep(500)
> ```

### L4: Funktion fill
Jetzt lagern wir diese Funktionalität in eine Funktion aus. Das nennt man **Refaktorierung**: ein bisschen wie bei Multiplikationen extrahieren wir einen Teil unsere Programms als "Faktor" in eine Funktion.

Schreiben Sie eine Funktion `fill(nr, wartezeit)`, die die Anzahl `nr` LEDs auf dem Display auffüllt und zwischen den Pixeln immer `wartezeit` wartet. Also fill(7, 0) soll sofort das hier anzeigen: ![[Pasted image 20231121114144.png]]

Speichern Sie sich diese Funktion `fill()` irgendwo ab, wir werden die sicher nochmals gebrauchen!

*Tipp: Wir haben das `return`-Statement bei der Turtle kennengelernt, um einen Wert von der Funktion zurück ans Hauptprogramm zu schicken. Das werden Sie hier auch gebrauchen, aber nicht weil Sie einen Wert ans Hauptprogramm schicken wollen, sondern weil `return` auch die Funktion beendet.*

> [!question]- Lösung
> 
> ```python
> def fill(nr, wartezeit):
> 	display.clear()
>     sum = 0
>     for y in range(5):
>         for x in range(5):
>             if sum == nr:
>                 return
>             display.set_pixel(x, y, 9)
>             sum = sum + 1
>             sleep(wartezeit)
> ```

### L5: Knacknuss

Modifizieren Sie die Funktion `fill()` so, dass die LEDs auch wieder der Reihe nach abstellen.

### L6: Knacknuss: "Kitt, I need you pal!

In den 1980ern und 1990ern waren viele aus dem Häuschen wegen einer Serie, in der ein junger Schönling mit seinem schwarzen, künstlich-intelligenten Auto für Gerechtigkeit kämpft. Die Rede ist von "Knight Rider" mit David Hasselhoff. Zu Ihrer Belustigung, hier ein Trailer:

<iframe width="560" height="315" src="https://www.youtube.com/embed/oNyXYPhnUIs?si=hfWIoy-fwSMzE2mA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

Jetzt wollen Sie natürlich Ihren Microbit genau so cool machen wie K.I.T.T., das intelligente Auto... Beginnen wir also ganz vorne: Machen Sie die Animation der roten Lichter in K.I.T.T.s Kühlerhaube mit Ihrem Microbit nach.

> [!question]- Lösung
> 
> ```python
> from microbit import *
> 
> def kitt(x):
> 
>     # Alle bestehenden LEDs ein bisschen dimmen
>     for i in range(5):
>         neue_helligkeit = display.get_pixel(i, 0) - 1
>         if neue_helligkeit < 0:
>             neue_helligkeit = 0
>         display.set_pixel(i, 0, neue_helligkeit)
>         
> 	# Ein aktuelles LED ganz anstellen
>     display.set_pixel(x, 0, 9)
>     sleep(200)
>     
> 
> while True:
>     for i in range(5):
>         kitt(i)
>     for i in range(4, -1, -1):
>         kitt(i)
> ```

## Theorie: Design-Muster

> [!example] Theorieeintrag
> 
> ### Design-Muster
> 
> Design patterns (Design-Muster) beim Programmieren sind Muster, wie man häufig auftretende Probleme lösen kann. Genau wie Architekten nicht jedes Dach neu erfinden, tauschen sich Programmierer über Ihre Design Patterns aus. So entwickeln sich bewährte Praktiken, die eigentlich fast immer gleich gelöst werden.
> 
> Heute haben wir ein Muster erneut angetroffen, den wir aus der Turtle-Welt kennen.
> 
> ### Event Loop (oder Main Loop)
> 
> Ein Event Loop ist ein Design-Muster, das häufig in der Programmierung verwendet wird, insbesondere bei Anwendungen, die auf Ereignisse warten und darauf reagieren müssen. Es ist eine Art, das Programm solange am Laufen zu halten, wie unsere User wollen, und es ordnungsgemäss zu beenden, wenn die User das Programm schliessen. Ohne dieses Muster wäre das Programm, wenn nichts passiert, ja einfach fertig und beendet!
> 
> Ein Event Loop wird typischerweise mit einer `while` (solange) Schleife implementiert. Diese Schleife läuft solange der Wahrheitstest `True` ist. Jetzt gibt es zwei Optionen:
> - Die Vorlagen auf Microbit brauchen oft `while True`. Das ist eine echte **Endlosschleife**. Der Vorteil: Es ist kurz und knapp. Der Nachteil: Es gibt keine Art, das Programm ordnungsgemäss zu beenden. Ein Beispiel:
> 	```python
> 	while True:
> 	    # Ihr Code hier, der auf Ereignisse reagiert
> 	```
> - Anstatt eine endlose Schleife zu verwenden, ist es oft besser, eine boolesche (wahr/falsch) Variable zu verwenden, z.B. `while RUNNING`. Der Vorteil davon ist, dass Sie den Event Loop kontrolliert wieder beenden können. Der Nachteil: Sie müssen ein bisschen mehr Code schreiben. 
> 	Hier ein Beispiel:
> 	```python 
> 	RUNNING = True
> 	
> 	while RUNNING:
> 	    # Ihr Code hier, der auf Ereignisse reagiert
> 	    
> 	    if button_a.was_pressed():
> 	        RUNNING = False
> 	
> 	```
> 
> ### Funktion ausführen bis `return`
> 
> `return` kann nur innerhalb einer Funktion verwendet werden. Damit kann man dem Hauptprogramm einen Wert zurückgeben. Aber für dieses Design pattern viel wichtiger: Es beendet die Ausführung der Funktion.
> 
> So konnten wir in unserer Funktion `fill()` die LEDs füllen, bis die Summe der LEDs gleich gross war, wie die gewünschte Anzahl, und dann einfach die Funktion beenden.
> ```python {hl_lines="2 6-8"}
> def fill(nr, wartezeit):
>     sum = 0
>     for y in range(5):
>         for x in range(5):
>             if sum == nr:
>                 return
>             display.set_pixel(x, y, 9)
>             sum = sum + 1
>             sleep(wartezeit)
> ```

[[binp-b2l0102-intro|Zurück]]
[[binp-b2l0708-radio|Weiter]]