---
title: Interessante Übungen
---

> [!attention] Hinweis
> 
> Diese Übungen sind nicht Teil des Prüfungsstoffs.

### Übung: Eine Funktion plotten

Schreiben Sie ein Programm, das ein Koordinatensystem für den Bereich $x \in [-300, 300]$ und $y \in [-300, 300]$ zeichnet. Dann plotten Sie eine lineare Funktion $f(x) = x / 2 - 50$. Testen und nutzen Sie hierzu die Funktion `eva.goto(x,y)`.

![[eva-plotter.png]]


> [!solution]- Lösung
> 
> ```python
> import turtle
> 
> window = turtle.Screen()
> window.bgcolor("#111313")
> 
> eva = turtle.Turtle("turtle")
> eva.color("grey")
> 
> # Koordinatensystem zeichnen
> eva.goto(-300, 0) # ganz links
> eva.goto(300, 0) # ganz rechts
> eva.goto(0,0) # Mitte
> eva.goto(0,300) # oben
> eva.goto(0,-300) # unten
> eva.goto(0,0) # Mitte
> 
> # Eva stylen
> eva.color("#0cc")
> eva.speed(0)
> eva.pensize(2)
> eva.penup() # Der Weg zum ersten Punkt soll nicht gezeichnet werden
> 
> for x in range(-300,300):
>     y = x / 2 - 50 # unsere lineare Gleichung
>     
>     eva.goto(x,y)
>     eva.pendown() # Ab dem ersten Punkt wird der Stift wieder angesetzt
> 
> turtle.done()
> ```



### Kreisraster

Erstellen Sie ein Raster aus Kreisen. Sie können dazu die Befehle `eva.penup()`, `eva.pendown()`, `eva.goto(x,y)` und `eva.circle(r)` verwenden. 

![[kreisraster.png]]

> [!solution]- Lösung
> 
> ```python
> for i in range(5):  # 5 Reihen
>     for j in range(5):  # 5 Spalten
>         eva.penup()
>         eva.goto(j * 60, -i * 60)  # Verschiebt sich horizontal und vertikal
>         eva.pendown()
>         eva.circle(20)  # Zeichnet einen Kreis mit Radius 20
> ```