---
display: hidden
---

## Alte Aufgaben mit Turtle

### Aufgabe Inputtreppe
Schreiben Sie ein Turtle-Programm, dass die User **10-mal** mit `input(...)` aus [[01-intro|dieser Lektion]] um eine Eingabe bittet und die Nummer des aktuellen Durchgangs anzeigt. Wenn die Nutzer "treppe" eingeben, zeichnet eva eine Treppe der Länge vier. Ansonsten soll das Programm eine nette Nachricht mit dem Input der User anzeigen.

```turtle
import turtle
eva = turtle.Turtle()

# Ihr Code
```

> [!solution]- Mögliche Lösung
> 
> ```python
> import turtle
> eva = turtle.Turtle()
>  
> for i in range(1,11):
>     eingabe = input("Wir sind bei Durchgang " + str(i) + ". Ihre Eingabe bitte:")
>     if eingabe == "treppe":
>         for i in range(4):
>             eva.left(90)
>             eva.forward(20)
>             eva.right(90)
>             eva.forward(20)
>     else:
>         print("Sie haben '" + eingabe + "' eingegeben.")
> ```

### Aufgabe Inputfiguren

Erweitern Sie Ihr Turtle-Treppenprogramm mit weiteren Figuren.
- Die Turtle soll Drei- bis und mit Siebeneck ("dreieck", "viereck", etc.) zeichnen.
- Die Turtle soll einen "kreis" zeichnen können, wenn die User das eingeben.
### Aufgabe Input Anzahl Ecken

Erweitern Sie Ihr Turtle-Programm weiter, sodass Ihre User eine Zahl eingeben können, und ein entsprechendes Xeck gezeichnet wird - also ein Eingabe von "5" zeichnet ein Fünfeck. 

Im nächsten Block lernen Sie, was Datentypen sind. Für diese Aufgabe ist bereits folgende Info wichtig: Eine Eingabe wird immer als **Zeichenkette / String** interpretiert, **nicht als Zahl**. Hierzu zwei Tipps:

1) Python hängt an Zeichenketten viele Funktion an, sogenannte "Methoden". `variabelname.isdigit()` testet beispielsweise, ob eine Zeichenkette nur Zahlen enthält, und wird je nachdem als `True` oder `False` ausgewertet. Ein Beispiel:
```turtle
zahlenmittext = "123hallo" # Zahlen und Buchstaben
nurzahlen = "41232" # Nur Zahlen

print( zahlenmittext.isdigit() )
if zahlenmittext.isdigit():
	print("zahlenmittest.isdigit() wurde als wahr ausgewertet! Schauen Sie:", zahlenmittext.isdigit())

print( nurzahlen.isdigit() )
if nurzahlen.isdigit():
	print("nurzahlen.isdigit() wurde als wahr ausgewertet! Schauen Sie:" nurzahlen.isdigit())
```

2) Sie können eine Eingabe mit der Funktion `int()` in eine natürliche Zahl umwandeln.



## Altes Beispiel mit Turtle

```turtle
import turtle
import random

# Initialisieren der Turtle und des Fensters
eva = turtle.Turtle("turtle")
eva.speed(5)
screen = turtle.Screen()

# Begrenzungen des Fensters
x_limit = screen.window_width() / 2 - 100
y_limit = screen.window_height() / 2 - 100

# Unsichtbare Turtle um Text anzuzeigen
textturtle = turtle.Turtle()
textturtle.hideturtle()
textturtle.penup()
textturtle.setposition(0,y_limit/2)

# Rahmen zeichnen
eva.penup()
eva.setposition(x_limit, y_limit)
eva.color("red")
eva.pensize(3)
eva.pendown()
eva.setposition(-x_limit, y_limit)
eva.setposition(-x_limit, -y_limit)
eva.setposition(x_limit, -y_limit)
eva.setposition(x_limit, y_limit)
eva.penup()
eva.setposition(0,0)
eva.color("black")
eva.pensize(1)
eva.pendown()

# Solange die Koordinaten kleiner als die Limiten sind
while abs(eva.xcor()) < x_limit and abs(eva.ycor()) < y_limit:

    eva.setheading(random.randint(0, 360))  # Zufallssrichtung
    eva.forward(50) 

textturtle.write("Lauf Eva, lauf! 😍", align="center", font=("Arial", 60, "bold"))
turtle.done()

```
