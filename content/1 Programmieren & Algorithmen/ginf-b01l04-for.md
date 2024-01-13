---
title: "L04: Wiederholungen in Python mit for-Schleifen"
slug: b01l04-block-repeat
---

Wir haben das letzte Mal gesehen, wie man eine Turtle namens `eva` erstellt und fernsteuert. Es gibt die Befehle:
- `eva.forward(10)`
- `eva.back(10)`
- `eva.right(50)`
- `eva.left(50)`

Heute schauen wir uns **Wiederholungen** an. In Python und anderen Programmiersprachen sind die häufigsten Arten von Wiederholungsschleifen die **`for`- und `while`-Schleifen**. 

- `for`-Schleifen wiederholen Codeblöcke eine gewisse **Anzahl** mal.
- `while`-Schleifen wiederholen Codeblöcke, **solange eine Bedingung wahr ist**.

## Einfacher Einsatz der `for`-Schleife

Zur Erinnerung, unser Code für den Würfel aus [[ginf-b01l02-turtleintro|Lektion 2]].

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

Vereinfachen wir diesen Code mit einer `for`-Schleife!

```turtle
import turtle
eva = turtle.Turtle()

for i in range(4):
	eva.forward(50)
	eva.right(90)
```

Merken Sie sich für den Moment einfach: Sie können bei dieser `for`-Schleife bei `range(...)` in den runden Klammern die Anzahl Wiederholungen definieren, die Sie brauchen.

> [!example] Individuell arbeiten
> 
> Versuchen Sie, folgende Aufgaben zu lösen. (Versuchen Sie es zuerst unbedingt selbst!)

![[Pasted image 20240113121015.png]]

> [!question]- ☝️ Ändern Sie den Code ab, um ein **Rechteck** mit einer `for`-Schleife zu zeichnen.
> ```
> for i in range(2):
> 	eva.forward(100)
> 	eva.right(90)
> 	eva.forward(50)
> 	eva.right(90)
> ```

![[Pasted image 20240113121128.png]]
> [!question]- ☝️ Ändern Sie den Code ab, um ein **Dreieck** mit einer `for`-Schleife zu zeichnen.
> ```
> for i in range(3):
> 	eva.forward(50)
> 	eva.right(120)
> ```

![[Pasted image 20240113121302.png]]
> [!question]- ☝️Zeichnen Sie eine Treppe mit sechs Stufen mit einer `for`-Schleife.
> 
> ```
> for i in range(6):
> 	eva.forward(10)
> 	eva.left(90)
> 	eva.forward(10)
> 	eva.right(90)
> ```

Tipp für die nächste Aufgabe: Die mathematischen Grundoperationen kann man beim Programmieren wir folgt schreiben:

- **Addition**: `+` 
- **Subtraktion**: `-`
- **Multiplikation**: `*`
- **Division**: `/`

> [!question]- Machen Sie ein Fünfeck, ein Sechseck und ein Siebeneck – diesmal indem Sie die Rechnung für den Winkel direkt in den Code schreiben.
> 
> Beispielsweise für ein Siebeneck:
> ```
> for i in range(7):
> 	eva.forward(50)
> 	eva.right(360/7)
> ```

> [!example] Gruppenarbeit
> 
> Lösen Sie folgende Aufgaben zu zweit oder zu dritt.

> [!question]- Versuchen Sie eine **Variable `ecken`** für die Anzahl der Ecken der Figur zu gebrauchen. (Tipp: Speichern Sie diesen Code.)
> ```
> ecken = 7
> 
> for i in range(ecken):
> 	eva.forward(50)
> 	eva.right(360/ecken)
> ```

> [!question]- Zeichnen Sie einen Kreis.
> ```
> ecken = 360
> 
> for i in range(ecken):
> 	eva.forward(50)
> 	eva.right(360/ecken)
> ```
> Wobei 360 ineffizient und unnötig ist – eine kleinere Zahl sieht ebenfalls kreisförmig aus.

![[Pasted image 20230821172657.png]]

> [!question]- Ändern Sie Ihren Code ab, damit ein Stern aus der Anzahl `ecken` Strahlen entsteht, z.B. hier mit `ecken = 6`. 
> 
> ```
> ecken = 6
> 
> for i in range(ecken):
> 	eva.forward(50)
> 	eva.back(50)
> 	eva.right(360/ecken)
> ```

![[Pasted image 20230821174051.png]]
> [!question]- Schreiben Sie ein Programm, das eine Variable `stufen` definiert und dann eine entsprechend lange Treppe zeichnet.
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

Zu `for`-Schleife merken wir uns Folgendes:

> [!NOTE] Eintrag ins Theorieheft
> 
> ## Einfache Wiederholungen mit `for` in Python
> 
> Python und viele andere Programmiersprachen kennen **`for`- und `while`-Schleifen**. 
> 
> - `for`-Schleifen wiederholen Codeblöcke eine gewisse **Anzahl** mal.
> - `while`-Schleifen wiederholen Codeblöcke, **solange** eine Bedingung wahr ist.
 >
> Eine einfache Wiederholung mit `for` für ein Quadrat:
> 
> ![[Pasted image 20230821211452.png]]
> 
> Wir passen die **Zahl bei `range(...)`** an, um die **Anzahl Wiederholungen** zu ändern. Dort kann man auch **Variablen** verwenden.

[[ginf-b01l03-wiederholungen|L03]]
[[ginf-b01l05-verschachteltwiederholen|L05: Wiederholungen verschachteln]]