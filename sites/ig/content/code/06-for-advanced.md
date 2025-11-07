---
title: for-Schleifen verstehen
---
> [!success] Lernziele
> 
> - **`for`-Schleife verstehen**: Sie verstehen, dass die `for`-Schleife verwendet wird, um über die Elemente einer Liste zu iterieren.
> - **`for`-Schleife nutzen**: Sie sind in der Lage, eigene Listen zu erstellen und mit einer `for`-Schleife über deren Elemente zu iterieren.
> - **Länge einer Liste ermitteln**: Sie können mit `len()` die Länge einer Liste ermitteln und dies in Ihren Programmen sinnvoll einsetzen.

Kurzer Reminder: Wir wollen letztlich ein Programm schreiben, dass ein Bild zeichnet. Dazu müssen wir die Natur der `for`-Schleife etwas näher untersuchen.

![[listenbild_teaser.mp4]]

## Was ist das `i` in `for i in range(5)`? Und was tut die Funktion `range()`?

> [!exercise] Sie sind dran!
> 
> - Nutzen Sie die `print()`-Funktion, um herauszufinden, was `i` in der for-Schleife für Werte hat.
> - Kann man den Buchstaben `i` ändern oder ist er fix?

```turtle
range_als_liste = list(range(6))
print("Das hat range() erzeugt:", range_als_liste)

print("Beispiel mit range()")
for i in range(6):
	print(i)

print("Beispiel mit Liste")
for i in [0,1,2,3,4,5]:
	print(i)
```

### Erklärvideo

![[for-advanced.mp4]]
### Eine Spirale

Zeichnen Sie eine gleichmässig wachsende Spirale mit 100 Segmenten.

![[eva-spirale.png]]

> [!solution]- Lösung mit Videoerklärung 📺
> 
> ```python
> for i in range(100):  # Anzahl der Schritte
>     eva.forward(i)  # Abstand wird schrittweise grösser
>     eva.right(20)  # Konstanter Drehwinkel
> ```
> 
> ![[for-spirale.mp4]]


> [!info] Zusammenfassung
> 
> - `range()` ist nichts Anderes als eine Sequenz aus Zahlen von 0 bis zur angegebenen Zahl, aber ohne die angegebene Zahl. 
> 	- `range(3)` entspricht der Liste `[0, 1, 2]`.
> 	- `range(5)` entspricht der Liste `[0, 1, 2, 3, 4]`.
> - `for i in range(5):` können Sie so lesen: Für jedes Element $i$ der Liste, führe den Block aus.
## Listen selbst definieren

Sie sehen: Listen schreibt man mit eckigen Klammern, z.B. `[0, 1, 2]` und man kann sie auch manuell erzeugen ohne `range()`. 

Für unser Projekt kommen wir damit zu einem entscheidenden Punkt: **Listen können nicht nur Zahlen enthalten**, sonder verschiedene Datentypen.

```turtle
liste = ["Hallo", 3, "Velo", "Und zum Schluss ein ganzer Satz."]

for element in liste:
	print(element)
```

> [!example] Sie sind dran!
> 
> Schreiben Sie folgendes Programm um, um ein Quadrat mit verschiedenfarbigen Seiten zu erzeugen. Beachten Sie, dass ich mit `eva.color("red")` die Farbe verändert habe.
> 
> ![[eva-farbquadrat.png]]


```turtle
import turtle
eva = turtle.Turtle()

eva.color("red")

for i in range(4):
	eva.forward(50)
	eva.right(90)
```

### Erklärvideo

![[for-advanced-farbquadrat.mp4]]

> [!solution]- Lösung
> 
> ```python
> import turtle
> eva = turtle.Turtle()
> 
> farben = ["red", "blue", "yellow", "green"]
> 
> for farbe in farben:
>     eva.color(farbe)
>     eva.forward(100)
>     eva.right(90)
> 
> ```
### Übungen
![[eva-farbfünfeck.png]]

> [!question]- ☝️ Ändern Sie den Code ab, um ein **Fünfeck** mit verschiedenen Farben zu zeichnen.
> ```python
> import turtle
> eva = turtle.Turtle()
> 
> farben = ["red", "blue", "yellow", "green", "orange"]
> 
> for farbe in farben:
>     eva.color(farbe)
>     eva.forward(100)
>     eva.right(360/5)
> 
> ```

![[eva-farbsiebeneck.png]]

> [!question]- ☝️ Ändern Sie den Code ab, um ein **Siebeneck** mit verschiedenen Farben zu zeichnen.
> ```python
> import turtle
> eva = turtle.Turtle()
> 
> farben = ["red", "blue", "yellow", "green", "orange", "lightblue", "black"]
> 
> for farbe in farben:
>     eva.color(farbe)
>     eva.forward(50)
>     eva.right(360/7)
> 
> ```

Mit `len()` können Sie die Länge einer Liste ermitteln.

```python
farbliste = ["red", "blue", "yellow", "green", "orange"]
print(len(farbliste)) # Gibt 5 aus, weil die Liste 5 Elemente hat
```

> [!question]- ☝️ Schreiben Sie Ihr Programm fürs **Siebeneck** so ab, dass sich die Figur automatisch der Anzahl Farben in der Liste anpasst.
> 
> ```python
> import turtle
> eva = turtle.Turtle()
> 
> farben = ["red", "blue", "yellow", "green", "orange", "lightblue", "black"]
> 
> for farbe in farben:
>     eva.color(farbe)
>     eva.forward(50)
>     eva.right(360/len(farben))
> ```


> [!info] Zusammenfassung
> 
> - Listen schreibt man mit eckigen Klammern und Kommas. Sie können verschiedene Datentypen enthalten: `[0, "Ein Wort", 2]`
> - Mit `for`-Schleifen kann man durch Listen iterieren.
> 	```python
> 	for farbe in ["red", "blue", "yellow", "green"]:
> 		print(farbe)
> 	```
> - Mit `len()` kann man die Länge einer Liste ermitteln.
> 	```python
> 	farbliste = ["red", "blue", "yellow", "green", "orange"]
> 	print(len(farbliste)) # Gibt 5 aus, weil die Liste 5 Elemente hat
> 	```

## Eine Linie aus farbigen Punkten zeichnen

> [!example] Sie sind dran!
> 
> ![[eva-farblinie.png]]
> 
> Sie haben nun alle Werkzeuge, um eine Linie aus Farben für unser Bild zu erzeugen. Schreiben Sie ein Programm, dass folgende Linie nutzt.
> 
> ```python
> linie = ["red", "blue", "yellow", "green", "orange", "lightblue", "black", "white", "purple", "brown", "pink", "gray", "cyan", "magenta", "lime", "maroon", "navy", "teal", "gold", "coral", "khaki", "salmon", "indigo", "violet"]
> ```
> 
> Danach versuchen Sie das Programm so zu erweitern, dass die Turtle wieder an den Anfang der Linie zurückkehrt. Dazu wird Ihnen folgender Befehl helfen:
> - `eva.penup()` setzt den Stift ab
> - `eva.pendown()` setzt den Stift wieder aufs Papier

> [!solution]- Lösung
> 
> ```python
> import turtle
> window = turtle.Screen() # können Sie ignorieren
> window.setup(0.25, 0.25) # können Sie ignorieren
> window.bgcolor("#202020") # können Sie ignorieren
> eva = turtle.Turtle()
> 
> 
> farbliste = ["red", "blue", "yellow", "green", "orange", "lightblue", "black", "white", "purple", "brown", "pink", "gray", "cyan", "magenta", "lime", "maroon", "navy", "teal", "gold", "coral", "khaki", "salmon", "indigo", "violet"]
> print(len(farbliste)) # 24, weil len(farbliste) gibt die Zahl der Elemente in der Liste zurück
> 
> PIXEL = 10 # Eine Konstante, um die Grösse der Pixel überall kohärent zu nutzen
> eva.pensize(PIXEL) # Die Höhe einer Linie entspricht der Dicke der gezeichneten Linie
> 
> for farbe in farbliste:
>     print(farbe) # Das ist um zu zeigen, dass bei jeder Iteration der for-Schleife ein Element der Liste einzeln in "farbe" abgefüllt wird
>     eva.color(farbe) # Nun übergeben wir diese Farbe eva
>     eva.forward(PIXEL) # Die Breite jedes Pixels ist dadurch bestimmt, wie weit eva vorwärts fahrt
> 
> # Was tun wir nach der Linie?
> eva.penup() # Wir setzen den Stift ab, um nicht die Linie zu übermalen
> eva.back(len(farbliste) * PIXEL) # Wir gehen an den Anfang der Linie zurück
> 
> # Jetzt gehen wir auf die nächste Linie
> eva.right(90)
> eva.forward(PIXEL)
> eva.left(90)
> 
> turtle.done()
> ```

## `range()` genauer steuern

> [!example] Sie sind dran!
> 
> - Der Funktion `range()` können Sie nicht nur ein Argument übergeben, sondern auch zwei (z.B. `range(3,8)` ) oder drei (z.B. `range(4,18,2)` ). Finden Sie heraus, was diese Argumente bezwecken.

```turtle
range_als_liste = list(range(6))
print("Das entspricht:", range_als_liste)

print("Das Ganze noch in einer for-Schleife:")
for i in range_als_liste:
	print(i)
```

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

> [!info] Zusammenfassung
> 
> - Man kann `range()` mehrere Argumente geben, um die Zahlenliste genauer zu steuern:
> 	- Zwei Argumente (von, bis): `range(2, 5)` entspricht `[2,3,4]`
> 	- Drei Argumente (von, bis, Schritt): `range(4, 18, 6)` entspricht `[4, 10, 16]`

