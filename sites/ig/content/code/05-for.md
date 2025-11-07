---
title: Wiederholungen in Python mit for-Schleifen
---
> [!success] Lernziele
> 
> - Sie kennen das Konzept von **Schleifen**, die gewisse Zeilen Code **wiederholen**.
> - Sie kennen den Unterschied von `for`- und `while`-Schleifen im Abstrakten.
> - Sie haben `for`-Schleifen genutzt, um regelmässige geometrische Formen mit der Turtle zu zeichnen.

Wir haben das letzte Mal gesehen, wie man eine Turtle namens `eva` erstellt und fernsteuert. Es gibt die Befehle:
- `eva.forward(10)`
- `eva.back(10)`
- `eva.right(50)`
- `eva.left(50)`

Heute schauen wir uns **Wiederholungen** an. In Python und anderen Programmiersprachen sind die häufigsten Arten von Wiederholungsschleifen die **`for`- und `while`-Schleifen**. 

- `for`-Schleifen wiederholen Codeblöcke eine gewisse **Anzahl** mal. Die Anzahl Wiederholungen muss also zu Beginn der Schleife bekannt sein.
- `while`-Schleifen wiederholen Codeblöcke, **solange eine Bedingung wahr ist**. Die Anzahl Wiederholungen muss also zu Beginn nicht bekannt sein.
## Einfacher Einsatz der `for`-Schleife

Schauen wir uns an, wie man eine `for`-Schleife in Python schreibt. Zur Erinnerung, unser Code für den Würfel aus [[01-intro|der letzten Lektion]].

```python
import turtle
eva = turtle.Turtle()

eva.forward(100)
eva.right(90)
eva.forward(100)
eva.right(90)
eva.forward(100)
eva.right(90)
eva.forward(100)
eva.right(90)
```

Da wiederholen sich zwei Anweisungen einfach viermal. Das kann man sehr viel eleganter schreiben.

![[for-simple.excalidraw.light.svg]]
Alle diese Elemente werden in den nächsten Lektionen Sinn ergeben, aber hier eine Übersicht:
- `for` ist ein für diese Schleife reservierter Begriff in Python.
- `i` nennt man eine Laufvariable.
- `in` ist ebenfalls ein reservierter Begriff.
- `range(4)` erzeugt eine Art von Liste mit vier Elementen (genauer: einen Bereich).
- Der Doppelpunkt `:` signalisiert, dass jetzt **ein Codeblock beginnt**. Alle Linien des Codeblocks werden als Block wiederholt. Die einzelnen Durchgänge der Wiederholung nennt man **Iterationen**.
- Der linke Abstand der nächsten Linien (mit Tabulator oder Leerschlägen) bestimmt, welche Linien zum **Körper des Codeblocks** gehören und Teil der Wiederholung sind.

Eine einfache Wiederholung mit `for` für ein Quadrat hat also vier Iterationen. Für den Moment reicht es, zu wissen, dass wir die **Zahl bei `range(...)`** anpassen, um die **Anzahl Iterationen** zu ändern.

Hier eine Demonstration der Codes.

```turtle
import turtle
eva = turtle.Turtle()

for i in range(4):
	eva.forward(50)
	eva.right(90)
```

### Erklärvideo

![[for-basic.mp4]]

## Übungen
### Rechteck

Ändern Sie den Code ab, um ein **Rechteck** mit einer `for`-Schleife zu zeichnen.

![[eva-rechteck.png]]

> [!solution]- Lösung
> ```
> for i in range(2):
> 	eva.forward(100)
> 	eva.right(90)
> 	eva.forward(50)
> 	eva.right(90)
> ```

### Dreieck

Ändern Sie den Code ab, um ein **Dreieck** mit einer `for`-Schleife zu zeichnen.

![[eva-dreieck.png]]


> [!solution]- Lösung
> ```
> for i in range(3):
> 	eva.forward(50)
> 	eva.right(120)
> ```

### Treppe

Zeichnen Sie eine Treppe mit sechs Stufen mit einer `for`-Schleife.

![[eva-treppe.png]]

> [!solution]- Lösung
> 
> ```
> for i in range(6):
> 	eva.forward(10)
> 	eva.left(90)
> 	eva.forward(10)
> 	eva.right(90)
> ```
## Rechnungen im Code

Tipp für die nächste Aufgabe: Die mathematischen Grundoperationen kann man beim Programmieren wir folgt schreiben:

- **Addition**: `+` 
- **Subtraktion**: `-`
- **Multiplikation**: `*`
- **Division**: `/`

### $n$-Eck

Machen Sie ein Fünfeck, ein Sechseck und ein Siebeneck – diesmal indem Sie die Rechnung für den Winkel direkt in den Code schreiben.

> [!solution]- Lösung
> 
> Beispielsweise für ein Siebeneck:
> ```
> for i in range(7):
> 	eva.forward(50)
> 	eva.right(360/7)
> ```

> [!exercise] Sie sind dran!
> 
> Die for-Schleifen für gleichmässige geometrische Figuren waren immer sehr ähnlich, seien es regelmässige Dreiecke, Quadrate, Fünfecke etc. 
> 
> Erstellen Sie nun eine Variabel `ecken`, die die Anzahl der Ecken der Figur speichert, also z.B. `ecken = 6`. Schreiben Sie eine `for`-Schleife, die diese Variabel nutzt und ein entsprechendes $n$-Eck zeichnet.

> [!solution]- Lösung für $n$-Eck mit einer Variabel `ecken`
> ```
> ecken = 7
> 
> for i in range(ecken):
> 	eva.forward(50)
> 	eva.right(360/ecken)
> ```

### Kreis

Zeichnen Sie einen Kreis.

> [!solution]- Lösung
> ```
> ecken = 360
> 
> for i in range(ecken):
> 	eva.forward(50)
> 	eva.right(360/ecken)
> ```
> Wobei 360 ineffizient und unnötig ist – eine kleinere Zahl sieht ebenfalls kreisförmig aus.

### Stern

Ändern Sie Ihren Code ab, damit ein Stern aus der Anzahl `ecken` Strahlen entsteht, z.B. hier mit `ecken = 6`. 

![[eva-stern.png]]


> [!solution]- Lösung
> 
> ```
> ecken = 6
> 
> for i in range(ecken):
> 	eva.forward(50)
> 	eva.back(50)
> 	eva.right(360/ecken)
> ```

### Variable Treppe

Schreiben Sie ein Programm, das eine Variable `stufen` definiert und dann eine entsprechend lange Treppe zeichnet.

![[eva-treppe.png]]

> [!solution]- Lösung
> 
> ```
> stufen = 6
> 
> for i in range(stufen):
> 	eva.forward(20)
> 	eva.left(90)
> 	eva.forward(20)
> 	eva.right(90)
> ```

## Zusammenfassung

Zu `for`-Schleife merken wir uns Folgendes:

> [!info] Zusammenfassung
> 
> Python und viele andere Programmiersprachen kennen zwei Schleifen, um Dinge zu wiederholen: die **`for`- und `while`-Schleifen**. 
> 
> - `for`-Schleifen wiederholen Codeblöcke eine gewisse **Anzahl** mal.
> - `while`-Schleifen wiederholen Codeblöcke, **solange** eine Bedingung wahr ist.
> 
 >Jeden einzelnen Durchgang dieser Schleifen nennt man eine **Iteration**. Eine einfache Wiederholung mit `for` für ein Quadrat hat also vier Iterationen.
> 
> ![[for-simple.excalidraw.light.svg]]
> 
> Wir passen die **Zahl bei `range(...)`** an, um die **Anzahl Wiederholungen** zu ändern. Dort kann man auch **Variablen** verwenden.
