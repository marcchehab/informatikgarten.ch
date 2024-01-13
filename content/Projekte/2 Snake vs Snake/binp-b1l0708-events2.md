---
title: "L07+L08: if ... elif ... else & Snake-Steuerung"
slug: binpl0708-eventsteuerung2
---
> [!question]- Aktueller Stand: Erste Steuerung für eine Turtle
> 
> ```python
> import gturtle
> 
> # Helfervariabeln für uns Menschen
> KEY_LEFT = 37
> KEY_RIGHT = 39
> KEY_UP = 38
> KEY_DOWN = 40
> 
> # Steuert beide Turtle bei keypressed-Event
> def steuern(key):
>     if key.keyCode == KEY_RIGHT:
>         eva.right(90)
>     if key.keyCode == KEY_UP:
>         eva.forward(10)
>     if key.keyCode == KEY_LEFT:
>         eva.left(90)
>     if key.keyCode == KEY_DOWN:
>         eva.back(10)
>     
> tf = gturtle.TurtleFrame(keyPressed = steuern)
> 
> # Erste Spiel-Turtle
> eva = gturtle.Turtle(tf)
> eva.setColor("green")
> eva.setPenColor("green")
> eva.setPenWidth(10)
> eva.setPos(115,-50)
> 
> # Zweite Spiel-Turtle
> joe = gturtle.Turtle(tf)
> joe.setColor("red")
> joe.setPenColor("red")
> joe.setPenWidth(10)
> joe.setPos(-135, -50)
> 
> ```

## Repetition if ... elif ... else

Zunächst repetieren wir die `if...elif...else`-Struktur. Lesen Sie dazu [[ginf-b01l15-ifelse|den Eintrag im Grundkurs]] durch.

### Übung 1

> [!example] Input mit `if ... elif ... else` auswerten
> 
> Nehmen Sie folgendes Programm als Basis, bei dem ein Input in der Variabel `figur` gespeichert und ausgegeben wird.
> ```python
> import gturtle  
>   
> eva = gturtle.Turtle()  
>   
> figur = input("Welche Figur wollen Sie zeichnen?")
> 
> print(figur)
> 
> ```
> Erweitern Sie das Programm so, dass:
> - wenn der User "dreieck" schreibt, macht eva ein Dreieck
> - wenn der User "viereck" schreibt, macht eva ein Viereck
> - wenn der User etwas Anderes schreibt, macht eva nichts und wir zeigen die Nachricht "unbekannte Figur" mit print()

### Übung 2

> [!example] Optimieren wir unsere Steuerung
> 
> Mit diesem Wissen der `if...elif...else`-Struktur überlegen Sie sich, was wir an unserer Steuerung  **optimieren** könnten.
> 
> Bis jetzt haben wir die Steuerung ja so gemacht:
> 
> ```python
> ...
> def steuern(key):
> 	if key.keyCode == KEY_RIGHT:
> 		eva.right(90)
> 	if key.keyCode == KEY_UP:
> 		eva.forward(10)
> 	if key.keyCode == KEY_LEFT:
> 		eva.left(90)
> 	if key.keyCode == KEY_DOWN:
> 		eva.back(10)
> ...
> ```
> 

## Eine Steuerung wie bei Snake

Unsere Steuerung funktioniert bis jetzt ganz anders als bei Snake...
### Übung 3

> [!example] Zu zweit oder zu dritt
> 
> 1. Überlegen Sie sich genau, wie die Steuerung bei Snake funktioniert. Spielen Sie hierzu ein [Snake-Spiel](https://playsnake.org/) und überlegen Sie sich: **Wie funktioniert die Steuerung genau?**
> 2. Finden Sie in TigerJython unter `Hilfe > APLU-Dokumentation > Befehle` geeignetere Kommandos für ein Snake-Spiel als `eva.right(...)` und `eva.left(...)`?
> 3. Haben Sie eine Idee, wie wir es schaffen könnten, dass sich die Turlte **immer** vorwärts bewegt? Formulieren Sie Ihre Ideen in Python oder Pseudocode.

> [!question]- Wie ist eine Snake-Steuerung anders?
> 
> 1. Die Steuerung bei Snake ist **absolut**. Die Pfeiltaste nach rechts lässt die Schlange auf dem Bildschirm nach rechts kriechen, anstatt dass die Schlange relativ zu ihrer Position rechts dreht, wie bei uns.
> 2. Bei Snake bewegt sich die Schlange **immer** vorwärts.
> 
> Dazu haben wir in TigerJython folgende Lösungen gefunden:
> 
> 1. In der Dokumentation haben wir die Funktion `eva.setHeading(...)` gefunden, mit der man der Turtle einen **absoluten Winkel** vorgeben kann. `eva.setHeading(90)` richtet die Turtle auf dem Bildschirm nach rechts aus.
> 2. Wir können eine lange Wiederholungsschleife brauchen, damit die Turtle einfach vorwärts läuft. Das funktioniert, aber wir lernen noch eine bessere Lösung kennen.
> 	```python
> 	...
> 	for i in range(100000000):
> 		eva.forward(10)
> 	...
> 	```

### "Solange"-Schleife mit `while`

Eine lange Wiederholungsschleife ist nicht optimal, weil wir ja nicht wissen, **wie lange** das Spiel dauert. Da gibt es eine besser Lösung...

Die **`while`-Schleife** in Python ermöglicht es, einen Block von Anweisungen wiederholt auszuführen, **solange** eine bestimmte Bedingung `True` ist. Die Bedingung funktioniert genau gleich, wie bei der `if`-Selektion.

```python
while Bedingung:
    # Auszuführende Anweisungen, solange die Bedingung wahr ist
```

Die `while`-Schleife ist nützlich, wenn man nicht im Voraus weiss, wie oft der Codeblock ausgeführt werden muss. Aber **Vorsicht**: Wenn die Bedingung immer wahr bleibt, führt das zu einer **Endlosschleife**.

### Übung 4

> [!example] Zu zweit oder zu dritt
> 
> Wir bauen eine `while`-Schleife, damit die Turtle so lange vorwärts geht, bis ESC gedrückt wird. Wir erstellen dazu eine **Helfervariabel `RUNNING`**, die standardmässig `True` speichert, aber dann auf `False` gesetzt wird, sobald ESC gedrückt wird.
> 
> 1. Erstellen Sie am Anfang eine Helfervariabel `RUNNING = True`.
> 2. Erstellen Sie am Ende des Programms eine `while`-Schleife, die folgenden Pseudocode umsetzt:
> 	```
> 	Solange RUNNING True ist:
> 		Bewege eva ein bisschen nach vorn
> 	```
> 3. In der Funktion `steuern()` müssen Sie dem Computer erklären, dass Sie eine **"globale" Variabel aus dem Hauptprogramm**  gebrauchen wollen. Fügen Sie dazu ganz am Anfang der Funktion die Linie `global RUNNING` hinzu. Danach können Sie die Variabel in der Funktion normal gebrauchen.
> 4. Versuchen Sie in der Funktion folgenden Pseudocode umzusetzen:
> 	```
> 	Falls die aktuelle Taste ESC ist:
> 		Gib der Variabel RUNNING den Wert False
> 	```

> [!NOTE] Theorieeintrag
> 
> ## Theorie: Einfache Steuerung
> 
> - Mit `eva.setHeading(...)` haben wir der Turtle einen **absoluten Winkel** auf dem Bildschirm vorgegeben – `0` ist nach oben, `90` nach rechts, `180` nach unten, `270` nach links, etc.
> 	```python
> 	def steuern(key): 
> 		if key.keyCode == KEY_UP:
> 			eva.setHeading(0)
> 		elif key.keyCode == KEY_RIGHT: 
> 			eva.setHeading(90)
> 		elif key.keyCode == KEY_DOWN: 
> 			eva.setHeading(180)
> 		elif key.keyCode == KEY_LEFT: 
> 			eva.setHeading(270)
> 		else:
> 			print("Unbekannte Taste")
> 	```
> - Damit die Turtle **konstant vorwärts geht**, haben wir am Ende des Programms eine **Schleife** gemacht. (Das verbessern wir in der nächsten Lektion)
> 	```python
> 	while RUNNING == True:
> 	    eva.forward(10)
> 	```
> 	Weil in RUNNING bereits `True` oder `False` gespeichert ist, kann man das auch abkürzen:
> 	```python
> 	while RUNNING:
> 	    eva.forward(10)
> 	```
> - Wenn ESC gedrückt wird, ändern wir den Wert von RUNNING zu `False`. Damit endet dann die `while`-Schleife und das Programm.

[[binp-b1l0506-events|Zurück]]
[[binp-b1l0910-2turtle-return|Weiter]]
