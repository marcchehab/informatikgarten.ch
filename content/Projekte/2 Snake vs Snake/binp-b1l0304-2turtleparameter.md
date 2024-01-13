---
title: " L03+L04: Zwei Turtle und Funktionen mit mehreren Parametern"
slug: binpl0304-zwei-turtle-parameter
---

## Zwei Turtle kreieren

Wieso schreiben wir in diesem Modul die Turtle so umständlich?

```python
import gturtle  # Das importiert die Bibliothek
eva = gturtle.Turtle() # Das kreiert die Turtle namens "eva"
eva.forward(100) # Eva geht 100 Pixel nach vorn
```

Falls Sie TigerJython schon kennen, wissen Sie vielleicht, dass man die Turtle nicht unbedingt benennen müsste. Das hier würde z.B. auch funktionieren.

```python
from gturtle import *
makeTurtle()
forward(100)
```

Aber der Krux ist: Wir wollen für unser Spiel ja **zwei Turtle** in unserem Spiel haben! Wenn wir einfach nur `forward(100)` schreiben, wie soll der Computer wissen, **welche Turtle** wir meinen? Deswegen brauchen wir unsere Schreibweise.


> [!example] Zu zweit oder zu dritt
> 
> Schreiben Sie ein Programm mit einer **zweiten Turtle** namens `joe`. Sehr wahrscheinlich stellt sich Ihnen dabei ein Problem: Versuchen Sie die Schwierigkeit so genau wie möglich zu analysieren. Was für eine Lösung bräuchten wir?

## Zwei Turtle im selben Fenster

Das Problem ist, das standardmässig für jede Turtle ein **eigenes Fenster kreiert wird**. Wir müssen `eva` und `joe` irgendwie sagen, dass sie im gleichen Fenster leben sollen.

> [!example] Einzelarbeit
> 
> Versuchen Sie diese Angaben selbst umzusetzen:
> 
> Das funktioniert, indem Sie manuell ein **Fenster kreieren**, das einen **Namen** hat mit einer Linie `tf = gturtle.TurtleFrame()`. 
> 
> `tf` verkörpert dann das Fenster und wir können den beiden Turtle das bei Ihrer Erstellung als **Parameter** in `gturtle.Turtle()` mitgeben.

Nach der Klassendiskussion versuchen Sie, Ihren beiden Turtle Befehle zu geben. Um Ihre Turtle gut zu unterscheiden, können Sie Ihnen andere Farben, Linienstärke und Startpositionen geben:
```python
eva.setColor("green")
eva.setPenColor("green")  
eva.setPenWidth(3)
eva.setPos(115,-50)
```

> [!example] Einzelarbeit & Diskussion
> 
> - Kreieren Sie ein Programm, in dem `eva` ein Siebeneck macht und `joe` ein Fünfeck.
> - Schreiben Sie ein Programm, in dem `eva` eine Treppe mit 6 Stufen zeichnet und `joe` ein Quadrat.
> - Versuchen Sie die Funktion `xeck(...)` aus [[binp-b1l0102-repetition|L01]] zu gebrauchen. Was für ein Problem stellt sich?

> [!NOTE] Eintrag ins Theorieheft
> 
> ## Theorie: Zwei Turtle im gleichen Fenster
> 
>  Zuerst müssen wir dem Fenster einen Namen geben mit:
>  ``` python
>  tf = gturtle.TurtleFrame() 
>  ```
> `tf` verkörpert dann das Fenster und wir können den beiden Turtle das bei Ihrer Erstellung als **Parameter** mitgeben.
> ```python
> sara = gturtle.Turtle(tf)  
> joe = gturtle.Turtle(tf)
> ```

## Funktionen mit mehreren Parametern

In Python ist es möglich, Funktionen zu definieren, die mehrere Parameter definieren. Diese werden in der Funktionsdefinition durch Kommata getrennt. Hier ist ein Beispiel:

```python
def xeck(ecken, seitenlaenge):
    # Ihr Code
```

Sie können diese Funktion dann mit zwei Argumenten aufrufen:

```python
xeck(5, 50) 
```

Manchmal möchten wir, dass bestimmte Parameter einen Standardwert haben, der verwendet wird, wenn das Argument beim Aufruf der Funktion nicht angegeben wird. Dies erreichen wir, indem wir dem Argument in der Funktionsdefinition einen Standardwert vordefinieren:

```python
def xeck(ecken, seitenlaenge = 50):
    # Code der Funktion
```

Jetzt können Sie die Funktion mit nur einem Argument aufrufen, und `seitenlaenge` wird automatisch auf `50` gesetzt:

```python
xeck(5)
```

Sie können den Standardwert aber auch überschreiben, indem Sie beim Aufrufen der Funktion einen anderen Wert angeben:

```python
xeck(5, 100) 
```



> [!NOTE] Eintrag ins Theorieheft
> 
> ## Theorie: Funktionen mit mehreren Parametern
> 
>  Eine Funktion kann mehrere Parameter definieren, z.B.
>  ```python
> def xeck(turtle, ecken, seitenlaenge):
>     # Code der Funktion
> ```
>  Beim Aufrufen der Funktion, werden die Argumente in **derselben Reihenfolge** in die Parameter abgefüllt, z.B.
> 
> ```python
> xeck(eva, 5, 100)
> ```
> Funktionen können für die Parameter einen **Standardwert vordefinieren**. Dieser Wert wird nur gebraucht, wenn beim Aufrufen der Funktion das Argument nicht angegeben wird.
> 
> ```python
> def xeck(turtle, ecken, seitenlaenge = 50):
>     # Code der Funktion
> ```

## Eine Blume zeichnen

> [!example] Einzelarbeit & Diskussion
> 
> - Ergänzen Sie die bestehende Funktion `xeck(...)` für nur eine Turtle (`eva`) mit dem Parameter `seitenlaenge`. 
> - Versuchen Sie eine Funktion `xeck(...)` zu schreiben, die für **beide Turtle** funktioniert.
> - Challenge: Versuchen Sie eine Funktion `blume(...)` zu kreieren mit Parametern für die Grösse und die Anzahl Blätter, die ebenfalls für **beide Turtle** funktioniert.
> 	![[Pasted image 20230823065805.png]]


> [!question]- Lösung zur Blume
> 
> Der Schlüssel liegt darin, die verschiedenen **Bausteine Schritt für Schritt** zu programmieren.
> ```
> 1. Eine Blume besteht aus Blättern.
> 2. Ein Blatt besteht aus zwei runden Linien.
> 3. Eine runde Linie besteht aus vielen kleinen Schritten und Drehungen.
> ```
> ### Runde Linien
> Jetzt beginnen wir von unten bei Nummer 3. Wie machen wir eine **runde Linie**? 
>   
> ```
> for i in range(60):  
> 		turtle.forward(2)  
> 		turtle.right(1)
> ```
> Nachdem wir uns so 60-mal (weil `range(60)`) um ein Grad gedreht haben (weil `turtle.right(1)`), haben wir uns insgesamt 60 Grad gedreht. 
> 
> ### Ein Blatt
> 
> Jetzt machen wir Schritt 2: das Blatt. Dafür muss die Turtle eine runde Linie nach vorne und wieder zurück machen. Nach der ersten runden Linie hat sie sich 60° gedreht. Um wieder zurück zu fahren, muss sie sich insgesamt 180° drehen - also fehlen noch 120°.
> 
> ![[Pasted image 20230829111652.png]]
> 
> Mit dieser Idee kann man eine Funktion `blatt(...)` schreiben.
> 
> ```
> def blatt(turtle, size = 2):  
>     for j in range(2): 
>         for i in range(60):  
>             turtle.forward(size)  
>             turtle.right(1)  
>         turtle.right(120)
> ```
> Die innere Schleife mit `i` macht die runde Linie. Die äussere Schleife mit `j` macht zwei runde Linien mit je 60° und dreht die Turtle 120°.
> 
> ### Eine Blume
> 
> Der Rest ist nun einfacher: Wir müssen die Turle im Kreis drehen und Blätter malen. Eleganterweise könnten wir dafür nochmals eine Funktion `blume(...)` machen, die unsere Funktion `blatt(...)` nutzt und die für beide Turtle funktioniert:
> 
> ```
> def blume(turtle, leaves, size = 2):  
>     for i in range (leaves):  
>         blatt(turtle, size)  
>         turtle.right(360/leaves)
> ```
> Eine Blume mit sieben etwas grösseren Blättern können wir nun so zeichnen: `blume(eva, 7, 4)`

[[binp-b1l0102-repetition|Zurück zur Repetition]]
[[binp-b1l0506-events|Weiter zu L05 + L06]]
