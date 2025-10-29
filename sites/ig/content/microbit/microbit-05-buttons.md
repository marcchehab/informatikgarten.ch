---
title: Buttons abfragen & return-Statement
---
> [!success]  Lernziele
> 
> - **Design-Mustern** und **Event-Loop**: Sie können diese zwei Ideen erklären.
> - **Knöpfe abfragen**: Sie können einen Event-Loop schreiben, den man per Knopfdruck beenden kann.
> - **return-Statement**: Sie können mit `return` die Ausführung einer Funktion beenden und verstehen, wie wir damit die Funktion `fill()` erweitert haben.
> - **`radio`-Modul**: Sie verstehen, wie wir uns mit dem Radio-Modul gegenseitig den Screen aufgefüllt haben und wie die  Umformung von Integers und Strings ablief.

## Design Muster

Design patterns (Design Muster) beim Programmieren sind **Muster, wie man häufig auftretende Probleme elegant lösen kann**. Genau wie Architekten nicht jedes Dach neu erfinden, tauschen sich Programmiererinnen und Programmierer über Ihre Design Patterns aus. So entwickeln sich bewährte Praktiken, die eigentlich fast immer gleich gelöst werden.

> [!example] Design Muster
> 
> ### Programm mit einem Event-Loop (oder Main-Loop)
> 
> Ein Event-Loop ist ein Design-Muster, das häufig bei Anwendungen verwendet wird, die **auf Ereignisse und Nachrichten warten und darauf reagieren müssen**. Es ist eine Art, das Programm dauernd am Laufen zu halten, auch wenn gerade nichts geschieht. Wenn dann etwas passiert, kann es auf die Ereignisse reagieren und den Loop bei Bedarf oder nach getaner Arbeit geordnet beenden.
> 
> In unserem Fall nutzen wir einen Event-Loop, dass der Roboter fortwährend auf die Sensoren und Inputs reagiert. Als programmieren wir, dass wir das Programm mit dem Knopf A beenden können.
> 
> Mit Pseudocode könnte das so aussehen:
> 
> ```text
> running = wahr
> solange running wahr ist:
> 	
> 	# Hier fügen wir später unsere Reaktionen auf die Umwelt hinzu
> 	
> 	falls Knopf A gedrückt wurde:
> 		running = falsch
> ```
> 
> Es gibt einige kompaktere Lösungen, aber wir haben die Grundidee mit einer **booleschen Variabel** (wahr/falsch) namens "running" implementiert.
> 
> ```python 
> running = True
> 
> while running:
> 	# Ihr Code hier, der auf Ereignisse reagiert
> 	
> 	if button_a.was_pressed():
> 		running = False
> 
> ```
> 

### Aufgabe: Mit den Knöpfen A und B auffüllen und leeren

Erweitern Sie Ihr Programm der letzten Lektion mit der Funktion fill() so, dass das Display nicht automatisch auffüllt, sondern:
- Wenn man den Knopf A drückt, füllt sich das Display Pixel um Pixel auf.
- Wenn man den Knopf B drückt, leert sich das Display wieder (ebenfalls Pixel um Pixel, aber deutlich schneller).

> [!solution]- Lösung
> 
> ```python
> from microbit import *
> 
> def fill(helligkeit, wartezeit):
>     for y in range(5):
>         for x in range(5):
>             display.set_pixel(x, y, helligkeit)
>             sleep(wartezeit)
> 
> running = True
> while running:
> 	if button_a.was_pressed():
> 		fill(9, 200)
> 	if button_b.was_pressed():
> 		fill(0, 50)
> ```

## Das `return`-Statement bei Funktionen

> [!example] Design Muster
> 
> ### Funktion ausführen bis `return`
> 
> `return` kann nur innerhalb einer Funktion verwendet werden. Damit kann man dem Hauptprogramm einen Wert zurückgeben. Aber für dieses Design pattern viel wichtiger: Es beendet die Ausführung der Funktion.
> 
> So konnten wir in unserer Funktion `fill()` die LEDs füllen, bis die Summe der LEDs gleich gross war, wie die gewünschte Anzahl, und dann einfach die Funktion beenden.
> 
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

## Übungsaufgaben
### Aufgabe: Eine gewisse Anzahl LEDs anstellen

Erweitern Sie Ihre Funktion fill(), damit Sie auch die Anzahl der LEDs bestimmen können, die angestellt werden soll.

> [!solution]- Mögliche Lösung
> 
> ```python
> from microbit import *
> 
> def fill(helligkeit, wartezeit, anzahl):
>     summe = 0
>     display.clear()
>     for y in range(5):
>         for x in range(5):
>             if summe == anzahl:
>                 return
>             display.set_pixel(x, y, helligkeit)
>             summe = summe + 1
>             sleep(wartezeit)
> 
> # Beispiel: Stelle 8 LEDs langsam halbhell an
> fill(5, 300, 8)
> 
> # Beispiel: Stelle 13 LEDs sofort ganz an
> fill(9, 0, 13)
> ```

---
### Aufgabe: Ein LED mehr, ein LED weniger

Ändern Sie Ihr Programm nun so ab, dass man mit dem Knöpfen A und B jeweils ein LED mehr oder weniger anstellen kann. 

*Achtung: Beachten Sie die "Edge-Cases" - d.h. die Randfälle, wenn Sie beispielsweise bereits keine (also 0) LEDs angestellt haben und nochmal A drücken.*

> [!solution]- Mögliche Lösungen
> 
> Eine Version ohne die "Edge-Cases":
> ```python
> from microbit import *
> 
> def fill(helligkeit, wartezeit, anzahl):
>     summe = 0
>     display.clear()
>     for y in range(5):
>         for x in range(5):
>             if summe == anzahl:
>                 return
>             display.set_pixel(x, y, helligkeit)
>             summe = summe + 1
>             sleep(wartezeit)
> 
> aktuelle_anzahl = 0
> while True:
>     if button_a.was_pressed():
>         aktuelle_anzahl = aktuelle_anzahl - 1
>         fill(9, 0, aktuelle_anzahl)
>     if button_b.was_pressed():
>         aktuelle_anzahl = aktuelle_anzahl + 1
>         fill(9, 0, aktuelle_anzahl)
> ```
> 
> Eine Version, die die "Edge-Cases" berücksichtigt:
> ```python
> from microbit import *
> 
> def fill(helligkeit, wartezeit, anzahl):
>     summe = 0
>     display.clear()
>     for y in range(5):
>         for x in range(5):
>             if summe == anzahl:
>                 return
>             display.set_pixel(x, y, helligkeit)
>             summe = summe + 1
>             sleep(wartezeit)
> 
> aktuelle_anzahl = 0
> while True:
>     if button_a.was_pressed() and aktuelle_anzahl > 0:
>         aktuelle_anzahl = aktuelle_anzahl - 1
>         fill(9, 0, aktuelle_anzahl)
>     if button_b.was_pressed() and aktuelle_anzahl <= 24:
>         aktuelle_anzahl = aktuelle_anzahl + 1
>         fill(9, 0, aktuelle_anzahl)
> ```

---
### Aufgabe: Per Radio auffüllen

Nutzen Sie zu zweit Ihr Radio, sodass Sie den Knopf A drücken können und bei Ihrer Nachbarin ein weiteres LED angestellt wird.

*Danach gibt es eine Hacking-Wettbewerb.*

> [!solution]- Lösung aus dem Unterricht
> 
> ![[fill-radio.png]]

----
### Knacknuss: "Kitt, I need you pal!"

In den 1980ern und 1990ern waren viele aus dem Häuschen wegen einer Serie, in der ein junger Schönling mit seinem schwarzen, künstlich-intelligenten Auto für Gerechtigkeit kämpft. Die Rede ist von "Knight Rider" mit David Hasselhoff. Zu Ihrer Belustigung, hier ein Trailer:

<Youtube id="oNyXYPhnUIs">Knight Rider YT Video</Youtube>

Jetzt wollen Sie natürlich Ihren Microbit genau so cool machen wie K.I.T.T., das intelligente Auto... Beginnen wir also ganz vorne: Machen Sie die Animation der roten Lichter in K.I.T.T.s Kühlerhaube mit Ihrem Microbit nach.

> [!solution]- Mögliche Lösung
> 
> ```python
> from microbit import *
> 
> def kitt(x):
> 
>     # Alle bestehenden LEDs um 1 dimmen
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
> 	# Von links nach rechts
>     for i in range(5):
>         kitt(i)
> 	# Von rechts nach links
>     for i in range(4, -1, -1):
>         kitt(i)
> ```

## Zusatz: Laufmodi verstehen

Anstatt einer booleschen Variable könnten Sie auch Zahlen verwenden und damit verschiedene Zustände des Programms kodieren - zum Beispiel so:
- 1 = finde die schwarze Linie 
- 2 = folge der schwarzen Linie
- 3 = kehre zur Docking-Station zurück
- 4 = lade die Batterie auf
- 5 = beende das Programm

Je nach Zustand ("state") könnte Ihr Roboter dann einer anderen Logik folgen. Zudem könnten Sie die Übergänge von einem Zustand in den nächsten mit weiteren Funktionen regeln. Dann hätten Sie eine sogenannte "State machine" (Zustandsmaschine) gebaut.

Ein praktisches Beispiel für Zustandsmaschinen im echten Leben sind die "Runlevels" in Linux-Betriebssystemen. Linux verwendet traditionell Zahlen von 0 bis 6, um verschiedene Betriebszustände zu definieren:

- 0 = Herunterfahren
- 1 = Single-User-Modus (Wartungsmodus)
- 3 = Multi-User-Modus ohne grafische Oberfläche
- 5 = Multi-User-Modus mit grafischer Oberfläche
- 6 = Neustart

Das System wechselt zwischen diesen Zuständen basierend auf Befehlen oder Ereignissen - genau wie unser Roboter zwischen seinen Betriebszuständen wechseln würde. Jeder Zustand hat seine eigenen Regeln und Verhaltensweisen.

