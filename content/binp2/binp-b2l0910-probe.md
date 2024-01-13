---
title: "B02L09+L10: Probeprüfung"
---
> [!solution] Lernziele
> 
> - Die Prüfung wird eine 45-minütige Openbook-Prüfung sein, bei der Sie den Microbit programmieren.
> - Die Aufgaben der Prüfung werden vorzu schwieriger.
> - Sie werden die Aufgaben wie bei der ersten Prüfung bereits auf Onenote  erhalten und Ihren Code dort abgeben.
> - Sie dürfen während der Prüfung Musik hören, falls Ihnen das bei der Konzentration hilft. (Am Prüfungstag werden Ihre Mitschülerinnen und Mitschüler an Ihrer Projektarbeit weiterarbeiten.)

## 1. Unhappy Microbit 😣

Zeigen Sie zwei Sekunden lang ein unglückliches Smiley an, wenn der Microbit geschüttelt wird.

> [!question]- Lösung
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
## 2. Digitaler Würfel

Starten Sie mit Ihrem Code von Augabe 1 und **erstellen Sie eine Würfelspiel**, bei dem das Schütteln des Microbits eine zufällige Zahl zwischen 0 und 9 auf dem LED-Display anzeigt.

Tipp: Suchen Sie in der Referenzspalte nach `random`.

> [!question]- Lösung
> 
> <video controls width="100%"><source src="https://v.nostr.build/kz8l.mp4" type="video/mp4" /></video>
> 
> ```python
> # Imports go at the top
> from microbit import *
> import random
> 
> # Endlosschleife
> while True:
> 	# Falls Microbit geschüttelt wurde...
>     if accelerometer.was_gesture("shake"):
> 	    # ... generiere eine Zufallszahl...
>         nr = random.randint(0, 9)
>         # ... und zeige sie an.
>         display.show(nr)
> ```

## 3. Countdown-Timer
Der Microbit soll nichts anzeigen bis der Knopf A gedrückt wird. Dann soll er auf dem Display angezeigt von 9 herunterzählen, bis und mit 0. Danach soll das Programm beenden (wenn man also erneut den Knopf A drückt, passiert nichts).

> [!question]- Lösung
> 
> <video controls width="100%"><source src="https://v.nostr.build/mnvQ.mp4" type="video/mp4" /></video>
> Den letzten Teil noch separat
> <video controls width="100%"><source src="https://v.nostr.build/RAKq.mp4" type="video/mp4" /></video> 
> 
> ```python
> from microbit import *
> 
> def countdown(nr):
>     for i in range(nr, -1, -1):
>         display.show(i)
>         sleep(1000)
> 
> RUNNING = True
> 
> while RUNNING:
>     if button_a.was_pressed():
>         countdown(9)
>         RUNNING = False
> ```

## 4. Anpassbarer Countdown

Starten Sie mit Ihrem Code von Aufgabe 4. Nun soll der Microbit am Anfang weiterhin nichts anzeigen, aber er zählt mit, wie oft Knopf B gedrückt wird. Dann wenn die User Knopf A drücken, startet der Countdown bei der Anzahl gezählten Knopfdrücke und zählt herunter bis und mit 0. Wenn also 4-mal B gedrückt wird und dann A, dann started der Countdown bei 4 und endet bei 0. Am Schluss beendet das Programm, wenn man also nochmals A drückt passiert nichts.

> [!question]- Lösung
> 
> <video controls width="100%"><source src="https://v.nostr.build/X4n7.mp4" type="video/mp4" /></video>
> 
> ```python
> from microbit import *
> 
> def countdown(nr):
>     for i in range(nr, -1, -1):
>         display.show(i)
>         sleep(1000)
> 
> RUNNING = True
> b_pressed = 0
> 
> while RUNNING:
>     if button_a.was_pressed():
>         countdown(b_pressed)
>         RUNNING = False
>         
>     if button_b.was_pressed():
>         b_pressed = b_pressed + 1
> ```

## 5. Ein LED greift nach den Sternen

Auf dem Display leuchtet immer nur ein LED. Dieses kann man auf dem Display verrutschen, indem man den Microbit bewegt. Wenn man den Microbit kippt, sucht das LED immer die höchste Position.

Tipp: Die Schwerkraft ist eine Beschleunigung (Englisch: acceleration).
![[attachments/star-led.png]]

> [!question]- Lösung
> 
> <video controls width="100%"><source src="https://v.nostr.build/GOMA.mp4" type="video/mp4" /></video>
> 
> ```python
> # Imports go at the top
> from microbit import *
> 
> # Das sind die Koordinaten unseres Pixels
> x = 2
> y = 2
> 
> # Das ist eine Konstante, die uns das Leben einfacher macht
> GRENZE = 500
> 
> # Code in a 'while True:' loop repeats forever
> while True:
> 
>     # Die Beschleunigung in Richtung x und y
>     x_strength = accelerometer.get_x()
>     y_strength = accelerometer.get_y()
> 
>     # Falls stärker als Grenze nach rechts oder links bewegt wird
>     if x_strength > GRENZE:
>         x = x - 1
>         if x < 0:
>             x = 0
>     
>     if x_strength < -GRENZE:
>         x = x + 1
>         if x > 4:
>             x = 4
> 
>     # Falls stärker als Grenze nach oben und unten bewegt wird
>     if y_strength > GRENZE:
>         y = y - 1
>         if y < 0:
>             y = 0
> 
>     if y_strength < -GRENZE:
>         y = y + 1
>         if y > 4:
>             y = 4
>     
>     display.clear()
>     display.set_pixel(x, y ,9)
>     sleep(100)
> ```

[[binp-b2l0708-radio|Zurück]]
[[Weiter]]