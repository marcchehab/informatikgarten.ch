---
title: "L11+L12: Wie detektieren wir einen Crash?"
---
Wir haben unser Spiel fast fertig! Jetzt müssen wir aber noch irgendwie ermitteln können, ob ein Zusammenstoss stattgefunden hat.

> [!question]- Aktueller Stand: Zwei Turtle mit Snake-Steuerung
> 
> ```python
> import gturtle
> 
> # Konfigurationsvariabeln
> speed = 15
> messabstand = 10
> 
> # Helfervariabeln für uns Menschen
> KEY_D = 68
> KEY_A = 65
> KEY_S = 83
> KEY_W = 87
> 
> KEY_LEFT = 37
> KEY_RIGHT = 39
> KEY_UP = 38
> KEY_DOWN = 40
> KEY_SPACE = 32
> 
> KEY_ESC = 27
> 
> # Steuert beide Turtle bei keypressed-Event
> def steuern(key):
>     global RUNNING
>     key = key.keyCode
>     
>     if (key == KEY_ESC):
>         RUNNING = False
>         
>     elif (key == KEY_RIGHT):
>         eva.setHeading(90)
>     elif (key == KEY_UP):
>         eva.setHeading(0)
>     elif (key == KEY_LEFT):
>         eva.setHeading(270)
>     elif (key == KEY_DOWN):
>         eva.setHeading(180)
> 
>     elif (key == KEY_D):
>         joe.setHeading(90)
>     elif (key == KEY_W):
>         joe.setHeading(0)
>     elif (key == KEY_S):
>         joe.setHeading(180)
>     elif (key == KEY_A):
>         joe.setHeading(270)
>     
>     else:
>         print("Unbekannte Taste")
> 
> # Fenster mit Eventhandler
> tf = gturtle.TurtleFrame(keyPressed = steuern)
> 
> # Erste Spiel-Turtle
> eva = gturtle.Turtle(tf)
> eva.setColor("green")
> eva.setPenColor("green")
> eva.setPenWidth(speed)
> eva.setPos(115,-50)
> 
> # Zweite Spiel-Turtle
> joe = gturtle.Turtle(tf)
> joe.setColor("red")
> joe.setPenColor("red")
> joe.setPenWidth(speed)
> joe.setPos(-135, -50)
> 
> # Laufzeit-Variabeln, die uns das Leben erleichtern
> RUNNING = True
> 
> # Der Eventloop. Läuft solange RUNNING == True.
> while RUNNING:
>     eva.forward(speed)
>     joe.forward(speed)
> ```

## Kollisionserkennung

Wir brauchen die Bibliothek `gturtle` auf eine Art, die nicht vorgesehen ist. Darum gibt es auch keine fertige Lösung um festzustellen, wenn eine Turtle in ein Hindernis prallt. Wir müssen also **selbst etwas erfinden**!

### Übung 1: Kurze Diskussion

> [!example] Besprechen Sie im Team folgende Frage
> 
> Wie könnten Sie einem Computer **so einfach wie möglich erklären**, was als eine Kollision gilt? Als Beispiel ein Bildausschnitt.
> 
> ![[Pasted image 20230919125800.png]]

## Wieso eine `detector`-Turtle und wohin damit?

Turtle haben die Möglichkeit mit `turtle.getPixelColor()` die aktuelle Farbe an ihrem Ort zu messen - aber wenn sie selbst sichtbar sind, wird ihre eigene Farbe gemessen! Das heisst, wir müssen uns etwas einfallen lassen...

Die `detector`-Turtle ist eine unsichtbare Turtle, die wir benutzen, um die **Farbe direkt vor der Nase einer unserer Spiel-Turtle zu überprüfen**. Ist es dort weiss, darf sie fahren. Ist es dort nicht weiss, ist das ein Crash!

Kreieren Sie also nach `eva` und `joe` eine Turtle namens `detector`. Wir verstecken sie aber noch nicht, weil jetzt müssen wir sie **positionieren**... Und dazu ist es gut, sie auch zu sehen.

```python
# Unsichtbare Detector-Turtle
detector = gturtle.Turtle(tf)
#detector.hideTurtle()
detector.setColor("black")
hintergrundfarbe = detector.getPixelColor() # Die Farbe am Ort der Detector-Turtle. Jetzt am Anfang ist das sicher die Hintergrundfarbe
```

Die Positionierung der `detector`-Turtle, die Farbmessung und die Crash-Logik machen wir in einer Funktion `detectCrash(turtle)`, die für beide Turtle funktionieren soll.
- Wenn kein Crash detektiert wird, soll die Funktion den Wert `False` zurückgeben.
- Wenn ein Crash detektiert wird, soll die Funktion den Wert `True` zurückgeben.

```python
def detectCrash(turtle):
	crash = False

	# Ab hier setzen wir die Position der detector-Turtle
	x = turtle.getX() # Die x-Position der aktuellen Spiel-Turtle
	y = turtle.getY() # Die y-Position der aktuellen Spiel-Turtle
	
	
	detector.setPos(x, y) # Wir setzen die Detector-Turtle auf die Position der aktuellen Spiel-Turtle

	# Jetzt können wir die Farbmessung vornehmen
	farbmessung = detector.getPixelColor() # Die Farbe am Ort der Detector-Turtle
	print(farbmessung)
	return crash
```

Jetzt ändern wir die Logik in der `while`-Schlaufe am Ende. In Pseudocode ausgedrückt:
```
Wenn detectCrash(eva) eine Kollision feststellt:
	Stoppe das Spiel
	Zeige an, dass Eva einen Crash hatte
Andernfalls:
	Lass Eva vorwärtsfahren
```

In Python:
```python
while RUNNING:  
	if detectCrash(eva):
		RUNNING = False
		print("Eva crashed!")
		eva.label("CRASH!")
	else:
		eva.forward(speed)
	
	joe.forward(speed)
```

Jetzt wollen wir doch mal mit `eva` testen, ob das funktioniert. Beachten Sie die Ausgabe von `farbmessung` - was fällt Ihnen auf?

```
Color(r:0.00%, g:100.00%, b:0.00%)
Color(r:0.00%, g:100.00%, b:0.00%)
Color(r:0.00%, g:100.00%, b:0.00%)
Color(r:0.00%, g:100.00%, b:0.00%)
Color(r:0.00%, g:100.00%, b:0.00%)
Color(r:0.00%, g:100.00%, b:0.00%)
```

Sie erhalten immer die Farbe von `eva` - grün!

Das passiert, weil Sie die gleiche Position wie `eva` haben, und quasi die Farbe von `eva`s Rücken sehen. Wir müssen also die **Detector-Turtle vor der Farbmessung verschieben**, um die Farbe vor `eva`s Nase zu erhalten!


> [!question]- Der zusammengesetzte Code bis jetzt
> ```python
> import gturtle
> 
> # Konfigurationsvariabeln
> speed = 15
> messabstand = 10
> 
> # Helfervariabeln für uns Menschen
> KEY_D = 68
> KEY_A = 65
> KEY_S = 83
> KEY_W = 87
> 
> KEY_LEFT = 37
> KEY_RIGHT = 39
> KEY_UP = 38
> KEY_DOWN = 40
> KEY_SPACE = 32
> 
> KEY_ESC = 27
> 
> # Steuert beide Turtle bei keypressed-Event
> def steuern(key):
>     global RUNNING
>     key = key.keyCode
>     
>     if (key == KEY_ESC):
>         RUNNING = False
>         
>     elif (key == KEY_RIGHT):
>         eva.setHeading(90)
>     elif (key == KEY_UP):
>         eva.setHeading(0)
>     elif (key == KEY_LEFT):
>         eva.setHeading(270)
>     elif (key == KEY_DOWN):
>         eva.setHeading(180)
> 
>     elif (key == KEY_D):
>         joe.setHeading(90)
>     elif (key == KEY_W):
>         joe.setHeading(0)
>     elif (key == KEY_S):
>         joe.setHeading(180)
>     elif (key == KEY_A):
>         joe.setHeading(270)
>     
>     else:
>         print("Unbekannte Taste")
> 
> def detectCrash(turtle):
>     crash = False
> 
>     # Ab hier setzen wir die Position der detector-Turtle
>     x = turtle.getX() # Die x-Position der aktuellen Spiel-Turtle
>     y = turtle.getY() # Die y-Position der aktuellen Spiel-Turtle
>     
>     # Hier verändern wir x und y
> 
>     detector.setPos(x, y) # Wir setzen die Detector-Turtle auf die Position der aktuellen Spiel-Turtle
> 
>     # Jetzt können wir die Farbmessung vornehmen
>     farbmessung = detector.getPixelColor() # Die Farbe am Ort der Detector-Turtle
>     print(farbmessung)
>     return crash
> 
> # Fenster mit Eventhandler
> tf = gturtle.TurtleFrame(keyPressed = steuern)
> 
> # Erste Spiel-Turtle
> eva = gturtle.Turtle(tf)
> eva.setColor("green")
> eva.setPenColor("green")
> eva.setPenWidth(speed)
> eva.setPos(115,-50)
> 
> # Zweite Spiel-Turtle
> joe = gturtle.Turtle(tf)
> joe.setColor("red")
> joe.setPenColor("red")
> joe.setPenWidth(speed)
> joe.setPos(-135, -50)
> 
> # Unsichtbare Detector-Turtle
> detector = gturtle.Turtle(tf)
> #detector.hideTurtle()
> detector.setColor("black")
> hintergrundfarbe = detector.getPixelColor() # Die Farbe am Ort der Detector-Turtle. Jetzt am Anfang ist das sicher die Hintergrundfarbe
> 
> # Laufzeit-Variabeln, die uns das Leben erleichtern
> RUNNING = True
> 
> # Der Eventloop. Läuft solange RUNNING == True.
> while RUNNING:  
>     if detectCrash(eva):
>         RUNNING = False
>         print("eva crashed!")
>         eva.label("CRASH!")
>     else:
>         eva.forward(speed)
>     
>     joe.forward(speed)
> ```

### Übung 2: Positionieren der Detector-Turtle

> [!example] Wo soll also unser Messpunkt sein?
> 
> 1. Diskutieren Sie in Teams, wie sich der Messpunkt verändern muss, wenn `eva` nach oben, unten, links oder rechts fährt. 
> 	![[Pasted image 20230919161025.png]]
> 2. Machen Sie einen spezifischen Vorschlag, wie Sie das mit den Variabeln `x` und `y` ausrechnen könnten. Ob `eva` nach oben, unten, links, oder rechts fährt, können Sie mit `turtle.heading()` ermitteln.
> 	```python
> 	if turtle.heading() == 0: # eva fährt nach oben
> 		# Positionieren der detector-Turtle
> 	elif turtle.heading() == 90: # eva fährt nach rechts
> 		# Positionieren der detector-Turtle
> 	...
> 	```
> 3. Versuchen Sie in der Funktion `detectCrash` **vor `detector.setPos(x, y)`** die Variabeln x und y so zu verändern, dass die `detector`-Turtle direkt vor die Nase von `eva` platziert wird und die uns die Farbe Weiss liefert, wenn vor ihr nichts ist. 
> 	```
> 	Color(r:100.00%, g:100.00%, b:100.00%)
> 	Color(r:100.00%, g:100.00%, b:100.00%)
> 	Color(r:100.00%, g:100.00%, b:100.00%)
> 	Color(r:100.00%, g:100.00%, b:100.00%)
> 	```
> 4. Schreiben Sie den Messabstand, den Sie gefunden haben, in die Konfigurationsvariabel `messabstand`.

> [!question]- Lösung Positionierung
> 
> ```python
> # Ab hier setzen wir die Position der detector-Turtle
> x = turtle.getX()
> y = turtle.getY()
> 
> if turtle.heading() == 0:
> 		y = y + messabstand
> elif turtle.heading() == 90:
> 		x = x + messabstand
> elif turtle.heading() == 180:
> 		y = y - messabstand
> elif turtle.heading() == 270:
> 		x = x - messabstand
> detector.setPos(x, y)
> ```

## Farbmessungen

Jetzt, wo wir die `detector`-Turtle richtig positioniert haben, müssen wir sie nur noch verstecken und die gemessene Farbe mit der Hintergrundfarbe vergleichen.

Die Hintergrundfarbe wird gleich nach der Kreation von der `detector`-Turtle gemessen und in die Variabel `hintergrundfarbe` gespeichert. Auch die aktuelle Farbmessung in der Funktion `detectCrash(turtle)` steht schon da: `farbmessung = detector.getPixelColor()`.

### Übung 3: Logik der Farbvergleichs

> [!example] Logik des Farbvergleichs
> 
> Überlegen Sie sich mithilfe der Variabeln `farbmessung` und `hintergrundfarbe`, wann `crash = True` sein soll. Schreiben Sie Ihre Idee als `if`-Statement in die Funktion `detectCrash(turtle)`.

> [!question]- Lösung Farbvergleich
> 
> ```python
> # Jetzt können wir die Farbmessung vornehmen
> farbmessung = detector.getPixelColor() # Die Farbe am Ort der Detector-Turtle
> if farbmessung != hintergrundsfarbe:
> 		crash = True
> return crash
> ```

## Auch für Joe

Jetzt müssen Sie einzig noch die Logik in der `while`-Schlaufe auf `joe` ausweiten.

> [!question]- Das fertige Spiel
> 
> ```python
> import gturtle
> 
> # Konfigurationsvariabeln
> speed = 15
> messabstand = 10
> 
> # Helfervariabeln für uns Menschen
> KEY_D = 68
> KEY_A = 65
> KEY_S = 83
> KEY_W = 87
> KEY_LEFT = 37
> KEY_RIGHT = 39
> KEY_UP = 38
> KEY_DOWN = 40
> KEY_SPACE = 32
> KEY_ESC = 27
> 
> # Steuert beide Turtle bei keypressed-Event
> def onKeyPressed(key):
>     key = key.keyCode
>     
>     if (key == KEY_ESC):
>         RUNNING = False
>         
>     elif (key == KEY_RIGHT):
>         eva.setHeading(90)
>     elif (key == KEY_UP):
>         eva.setHeading(0)
>     elif (key == KEY_LEFT):
>         eva.setHeading(270)
>     elif (key == KEY_DOWN):
>         eva.setHeading(180)
> 
>     if (key == KEY_D):
>         joe.setHeading(90)
>     elif (key == KEY_W):
>         joe.setHeading(0)
>     elif (key == KEY_S):
>         joe.setHeading(180)
>     elif (key == KEY_A):
>         joe.setHeading(270)
> 
> def detectCrash(turtle):
>     crash = False
> 
>     # Ab hier setzen wir die Position der detector-Turtle
>     x = turtle.getX()
>     y = turtle.getY()
> 
>     if turtle.heading() == 0:
>         y = y + messabstand
>     elif turtle.heading() == 90:
>         x = x + messabstand
>     elif turtle.heading() == 180:
>         y = y - messabstand
>     elif turtle.heading() == 270:
>         x = x - messabstand
>     detector.setPos(x, y)
> 
>     # Jetzt können wir die Farbmessung vornehmen
>     farbmessung = detector.getPixelColor() # Die Farbe am Ort der Detector-Turtle
>     if farbmessung == hintergrundsfarbe:
> 	    crash = False
>     else:
> 	    crash = True
>     return crash
>     
> tf = gturtle.TurtleFrame(keyPressed = onKeyPressed)
> 
> # Erste Spiel-Turtle
> eva = gturtle.Turtle(tf)
> eva.setColor("green")
> eva.setPenColor("green")
> eva.setPenWidth(speed)
> eva.setPos(115,-50)
> 
> # Zweite Spiel-Turtle
> joe = gturtle.Turtle(tf)
> joe.setColor("red")
> joe.setPenColor("red")
> joe.setPenWidth(speed)
> joe.setPos(-135, -50)
> 
> # Unsichtbare Detector-Turtle
> detector = gturtle.Turtle(tf)
> detector.hideTurtle()
> hintergrundsfarbe = detector.getPixelColor()
> 
> 
> # Laufzeit-Variabeln, die uns das Leben erleichtern
> RUNNING = True
> 
> # Der Eventloop. Läuft solange RUNNING == True.
> while RUNNING:
>     if detectCrash(eva):
>         print("eva crashed!")
>         eva.label("CRASH!")
>         RUNNING = False
>     else:
>         eva.forward(speed)
>     
>     if detectCrash(joe):
>         print("Joe crashed!")
>         joe.label("CRASH!")
>         RUNNING = False
>     else:
>         joe.forward(speed)
> 
> ```


[[binp-b1l0910-2turtle-return|Zurück]]
[[binp-b1l1314-listen|Weiter]]
