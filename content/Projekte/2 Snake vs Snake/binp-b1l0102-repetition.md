---
title: " L01+L02: Wiederholung der Grundkonzepte in Python"
slug: binpl01-wiederholung
---

Herzlich willkommen in der Informatik. Dieses Semester vertiefen wir Ihr Grundwissen. Das Ziel unseres ersten Blocks: Wir programmieren ein an "Snake" angelehntes Zweispieler-Spiel mit Turtle, in dem man sein Gegenüber mit Geschick gewieft austricksen und einschliessen muss.

![[Pasted image 20230815191002.png]]

Dafür müssen wir zuerst schauen, dass die Basics auch sitzen, und unsere Lernumgebung installieren: [TigerJython](https://tigerjython.ch/). 

Es gibt mehrere Arten, ein Turtle-Programm zu beginnen. Aber hier machen wir das so:

```python
import gturtle  # Das importiert die Bibliothek
eva = gturtle.Turtle() # Das kreiert die Turtle namens "eva"
eva.forward(100) # Eva geht 100 Pixel nach vorn
```


> [!example] Jetzt sind Sie dran!
> 
> Installieren Sie TigerJython und versuchen Sie folgende Aufgaben für sich selbst zu lösen:

> [!question]- Die Turtle zeichnet ein gleichseitiges Dreieck (ohne Repeat-Schleife)
> 
> Das funktioniert so:
> ```python
> import gturtle  
> eva = gturtle.Turtle()  
> 
> eva.forward(100)  
> eva.right(120)
> eva.forward(100)  
> eva.right(120)
> eva.forward(100)  
> eva.right(120)
> ```

> [!question]- Die Turtle zeichnet ein gleichseitiges Dreieck (mit Repeat-Schleife)
> 
> Das funktioniert so:
> ```python
> import gturtle  
> eva = gturtle.Turtle()  
> 
> repeat 3:
> 	eva.forward(100)  
> 	eva.right(120)
> ```

> [!question]- Die Turtle zeichnet ein gleichseitiges Fünfeck (mit Repeat-Schleife). Rechnen Sie dabei den Winkel nicht manuell aus, sondern schreiben Sie die Rechnung direkt in die Funktion `eva.right(...)`.
> 
> Das funktioniert so:
> ```python
> import gturtle  
> eva = gturtle.Turtle()  
> 
> repeat 5:
> 	eva.forward(100)  
> 	eva.right(360/5)
> ```

> [!question]- Finden Sie eine allgemeine Lösung für ein n-Eck? Erstellen Sie dazu eine Variabel "ecken", in der man die Anzahl Ecken verändern kann.
> 
> Das funktioniert so:
> ```python
> import gturtle  
> eva = gturtle.Turtle()  
> 
> ecken = 7
> 
> repeat ecken:
> 	eva.forward(100)  
> 	eva.right(360/ecken)
> ```

> [!question]- Definieren Sie eine Funktion `dreieck()`, die ein gleichseitiges Dreieck zeichnet, und führen Sie sie aus.
> 
> Das funktioniert so:
> ```python
> import gturtle  
> eva = gturtle.Turtle()  
> 
> def dreieck():
> 	repeat 3:
> 		eva.forward(100)
> 		eva.right(120)
> 
> dreieck() 
> ```

> [!question]- Definieren Sie eine Funktion `xeck()` mit einem Parameter für die Anzahl Ecken und zeichnen Sie zuerst ein Fünfeck, dann ein Neuneck und dann ein Elfeck.
> 
> Das funktioniert so:
> ```python
> import gturtle  
> eva = gturtle.Turtle()  
> 
> def xeck(ecken):
> 	repeat ecken:
> 		eva.forward(100)
> 		eva.right(360/ecken)
> 
> xeck(5)
> xeck(9)
> xeck(11) 
> ```


> [!NOTE] Eintrag ins Theorieheft
> ## Wiederholung der wichtigsten Begriffe
> ### Variabel
> ```python
> name = "Melanie"
> zahl = 5
> ```
> - `name` und `zahl` sind **Variabeln**. Sie speichern die Werte `"Melanie"` und `5`.
> - Ein einzelnes Gleichheitszeichen `=` ist beim Programmieren **kein *Ver*gleich**, sondern eine **Wert*zuweisung*** - z.B. oft für eine Variabel.
> 
> ### Codeblock
> 
> ```python {hl_lines=["1-3"]}
> repeat 3:
> 	eva.forward(100)  
> 	eva.right(120)
> eva.left(60)
> eva.forward(200)
> ```
> 
> - Zu einem **Codeblock** (markiert) gehört in Python immer alles, was einmal mehr eingezogen ist (also einen Abstand mehr hat) als die Linie mit dem Doppelpunkt.
> 
> ### Funktion
> ```python
> def xeck(ecken):
> 	repeat ecken:
> 		eva.forward(100)
> 		eva.right(360/ecken)
> 
> xeck(5)
> ```
> - **Funktionen** sind Teilprogramme, die etwas **tun**. Man erkennt sie an den **runden Klammern**, z.B. `print(...)`.
> - Funktionen können **Werte verarbeiten**, die in ihre vordefinierten **Parameter** abgefüllt werden. In diesem Beispiel definiert die Funktion `xeck(ecken)` ein Parameter `ecken`, das dann jeweils beim Aufrufen der Funktion definiert wird–hier `xeck(5)`.
> - **Variabeln *speichern* etwas**, **Funktionen *tun* etwas**.
> 
> ## Turtle
> - Die Turtle befolgt die Anweisungen **Schritt für Schritt**.
> - Die Turtle dreht sich um den **Aussenwinkel**.
> ![[Pasted image 20230818101325.png]]

[Zum Index zurück](/)
[[binp-b1l0304-2turtleparameter|Legen wir los mit L02 + L03!]]

