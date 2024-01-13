---
title: "B02: Nachprüfung"
---
> [!success] Lernziele
> 
> - Sie wissen wie man simple Bilder (z.B. Image.HAPPY) auf dem Microbit-Display anzeigt, einzelne LEDs anstellt, oder einzelne Reihen oder Spalten mit einer for-Schleife auffüllt.
> - Sie können Programme schreiben, die auf Inputs über den Bewegungssensor oder die Knöpfe A und B reagieren.
> - Sie können das Design-Muster mit `while RUNNING` aus [[binp-b2l0506-leds#Theorie Design-Muster|L05+06]] nutzen, damit man ein Programm beenden kann.
> - Sie können eigene Funktionen wie `spalte(x)` definieren und nutzen.

Tipp: Sie können [hier den gewohnten Editor und Microbit-Simulator](https://python.microbit.org/v/3/reference) benutzen, um zu üben.
## 1. Unhappy Microbit 😣

Zeigen Sie zwei Sekunden lang ein unglückliches Smiley an, wenn der Microbit geschüttelt wird.

> [!question]- Lösung mit Video-Erklärung
> 
> <video controls width="100%"><source src="https://v.nostr.build/5OQr.mp4" type="video/mp4" /></video>
> 
> ```python
> # Imports go at the top
> from microbit import *
> 
> # Endlosschleife
> while True:
> 	# Falls Microbit geschüttelt wurde,
>     if accelerometer.was_gesture("shake"):
> 		# zeige ein unglückliches Gesicht,
>         display.show(Image.SAD)
>         # warte 2 Sekunden,
>         sleep(2000)
>         # stell alle Pixel aus.
>         display.clear()
> ```

## 2. Spalte auffüllen

Schreiben Sie ein Programm mit einer Funktion `spalte(x)`, die die LEDs in einer Spalte so anstellt, dass man sieht, wie ein LED nach dem anderen anstellt.
- Wenn man Knopf A drückt, soll die Spalte 0 aufgefüllt werden. Wenn man Knopf A erneut drückt, wird alles gelöscht und Spalte 0 füllt erneut auf.
- Wenn man Knopf B drückt, soll die Spalte 3 aufgefüllt werden. Wenn man Knopf B erneut drückt, wird alles gelöscht und Spalte 3 füllt erneut auf.
- Wenn man den Microbit schüttelt, soll das Programm beenden.

> [!question]- Lösung mit Video-Erklärung
> 
> <video controls width="100%"><source src="https://v.nostr.build/Ryaq.mp4" type="video/mp4" /></video>
> 
> ```python
> # Imports go at the top
> from microbit import *
> 
> # Wir definieren unsere Funktion "spalte" mit einem Parameter "x" für die X-Koordinate der Spalte.
> def spalte(x):
>     display.clear()
>     for y in range(5):
>         display.set_pixel(x, y, 9)
>         sleep(500)
> 
> # "RUNNING" is eine Variabel mit dem Wert "True".
> RUNNING = True
> while RUNNING:
>     if button_a.was_pressed():
>         spalte(0) # Jetzt führen wir unsere Funktion spalte aus mit dem Argument 0. Das heisst, die X-Koordinate "x" soll 0 sein.
>     if button_b.was_pressed():
>         spalte(3) # Jetzt führen wir unsere Funktion spalte aus mit dem Argument 3. Das heisst, die X-Koordinate "x" soll 3 sein.
>     if accelerometer.was_gesture('shake'):
>         RUNNING = False # Jetzt verändern wir den Wert der Variabel "RUNNING"
>     
> 
> ```

## 3. Spalte verschieben

Ändern Sie den Code der Lösung von Aufgabe 2 so ab, dass immer eine Spalte angestellt ist, die man aber mit den Knöpfen A und B verschieben kann. Am Anfang soll die Spalte 2 leuchten.

> [!question]- Lösung mit Video-Erklärung
> 
> <video controls width="100%"><source src="https://v.nostr.build/xwyz.mp4" type="video/mp4" /></video>
> 
> ```python
> # Imports go at the top
> from microbit import *
> 
> # Wir definieren unsere Funktion "spalte"
> def spalte(x):
>     display.clear()
>     for y in range(5):
>         display.set_pixel(x, y, 9)
> 
> # "RUNNING" is eine Variabel mit dem Wert "True".
> RUNNING = True
> aktuelle_spalte = 2 # Eine Hilfsvariabel, um uns die aktuelle Spalte zu merken
> spalte(aktuelle_spalte) # Am Anfang soll die Spalte 2 leuchten
> while RUNNING:
>     if button_a.was_pressed():
> 	    # Überschreib die Variabel "aktuelle_spalte" mit ihrem eigenen Wert - 1
>         aktuelle_spalte = aktuelle_spalte - 1
>         # Hier verhindern wir, dass aktuelle_spalte kleiner als 0 werden kann.
>         if aktuelle_spalte < 0:
>             aktuelle_spalte = 0
>         spalte(aktuelle_spalte) 
>     if button_b.was_pressed():
> 	    # Überschreib die Variabel "aktuelle_spalte" mit ihrem eigenen Wert + 1
>         aktuelle_spalte = aktuelle_spalte + 1
> 	    # Hier verhindern wir, dass aktuelle_spalte grösser als 4 werden kann.
>         if aktuelle_spalte > 4:
>             aktuelle_spalte = 4
>         spalte(aktuelle_spalte) 
>     if accelerometer.was_gesture('shake'):
>         RUNNING = False
>    
> ```

[[binp-b2l0708-radio|Zurück]]
[[Weiter]]