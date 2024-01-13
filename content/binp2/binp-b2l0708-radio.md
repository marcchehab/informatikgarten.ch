---
title: "B02L07+L08: Radiomodul & Sensoren mit fill()"
---
> [!solution] Lernziele
> 
> - Sie können einen Event-Loop schreiben, der je nach Input die passende Funktion aufruft (siehe Theorieeintrag)
> - Sie wissen, wie man mit dem Radiomodul eine einfache Nachricht verschickt und empfängt.
> - Sie verstehen die Aufgabe S1 mit dem Bewegungssenor.

## Das Radiomodul

Mit dem Radiomodul können zwei Microbit miteinander kommunizieren. Sie finden die nötigen Informationen dazu im Editor links in der Referenz:

![[attachments/Pasted image 20231121120917.png]]

### R1: Ein Bild anzeigen

Wählen Sie in 2er-Teams eine Radiogruppe und erstellen Sie ein Programm, das ein Bildchen Ihrer Wahl anzeigt, wenn die andere Person den Knopf "A" drückt.

### R2: Text und Bild verschicken

Versuchen Sie das Programm so zu schreiben, dass eine Nachricht verschickt wird, die über den LED-Schirm scrollt.

#### Zusatz: Bild verschicken
Verschicken Sie ein Bild, das auf dem anderen Microbit angezeigt wird.

### R3: Wart's nur ab, ich füll Dir den Screen!

- Programmieren Sie ihre Microbit so, dass Sie sich gegenseitig mit Ihrer Funktion `fill()` von letzter Woche den Screen füllen können. 
- Mit jedem Tastendruck wird ein Pixel beim anderen Microbit aufgefüllt. 
- Wenn alle Pixel aufgefüllt wurden, wird ein Bild angezeigt. 
- Zusatz: Wenn alle Pixel aufgefüllt wurden, wird das Programm ordnungsgemäss beendet.

## Einen Sensor gebrauchen

Unser Microbit hat verschiedene Sensoren, darunter einen Beschleunigungssensor, einen Kompass, ein Temperatursensor, ein Lichtsensor und Eingabeknöpfe. Diese Sensoren ermöglichen es dem Microbit, auf physikalische Bewegungen und Umgebungsänderungen zu reagieren. In den Referenzen und im Editor finden Sie alle nötigen Infos zu diesen Sensoren.

### S1: Schüttel-`fill()`

In der Informatik muss man Systeme oft kennenlernen, indem man mit Ihnen "spielt" und experimentiert, wie sie auf verschiedene Zustände reagieren. Keine Angst, Sie können nichts kaputtmachen!

Das versuchen wir nun mit dem Bewegungssensor. Schreiben Sie ein Programm, das je mehr LEDs unseres Displays anstellt, je stärker unser Microbit geschüttelt wird! 😊

### S2: Handy nachmachen

Imitieren Sie mit Ihrem Microbit ein Handy: Er liegt auf dem Tisch, aber wenn wir in die Hand nehmen, wird das Display (also unsere LEDs) angestellt. Und wenn er wieder auf dem Tisch liegt und nicht bewegt wird, stellt das Display wieder ab.

### S3: Schrittzähler

Erstellen Sie einen einfachen Schrittzähler. Zählen Sie jedes Mal, wenn der Microbit eine bestimmte Bewegungsintensität erkennt, einen Schritt. Zeigen Sie die Anzahl der Schritte auf dem LED-Display an, wenn ein Knopf gedrückt wird.


> [!note] ## Theorie: Event-Loop und Funktionen
> 
> Das ist jetzt kein eigentliches Design-Muster, aber lenken Sie Ihre Aufmerksamkeit auf das Zusammenspiel zwischen dem Event-Loop und Funktionen. Funktionen werden ja auch **Unterprogramme** genannt - und jetzt macht das hoffentlich Sinn, wieso! 
> 
> Im Hauptprogramm läuft der Event-Loop mit `while RUNNING`. Hier läuft die Hauptlogik des Programms, das auf verschiedene Eventualitäten reagiert und je nach Bedarf die Funktionen aufruft. So bleibt die Hauptlogik schön übersichtlich. 
> 
> Ein Beispiel zu Veranschaulichung:
> 
> ```python
> from microbit import *
> 
> RUNNING = True
> leds = 0
> 
> def fill(anzahl_leds):
>     # Inhalt der Funktion
> 
> def send_message(message):
>     # Inhalt der Funktion
> 
> while RUNNING:
>     # Auf Ereignisse reagieren
>     
>     if accelerometer.was_gesture('shake'):
>         send_message("He, schüttle mich nicht!")
>         fill(25)
> 
>     if button_a.was_pressed():
>         fill(leds)
> ```
> ### Kommentare
> Alles, was auf einer Zeile nach einem Hashtag (#) steht, wird vom Computer ignorierft und dient uns Menschen, um Kommentare einzufügen.

[[binp-b2l0506-leds|Zurück]]
[[binp-b2l0910-probe|Weiter]]
