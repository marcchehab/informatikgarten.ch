---
title: for-Schleifen verschachteln
---
> [!success] Lernziele
> 
> - Sie können `for`-Schleifen richtig verschachteln und für komplexere Figuren nutzen.
> - Sie wissen, wie man den Wert einer Variable auf Basis ihres aktuellen Werts verändern kann, dass sie z.B. um eins erhöht wird.

`for`-Schleifen kann man **verschachteln**. Dabei wird die innere `for`-Schleife (blau) bei jedem Durchgang der äusseren `for`-Schleife (orange) komplett und wie gewohnt ausgeführt. Der Körper der inneren Schleife (hellblau) wird also insgesamt sechsmal ausgeführt. (Beachten Sie: Man sollte **nicht zweimal die Variable `i` zu gebrauchen**.)

Formen Sie eine Hypothese, was die `print()`-Befehle in diesem Programm ausgeben, und schauen Sie dann die Auflösung an. Nehmen Sie sich Zeit, die Auflösung im Detail nachzuvollziehen.

import { Tabs } from 'nextra/components'

<Tabs items={['Programm', 'Auflösung', 'Video-Erklärung']}>
  <Tabs.Tab>
![[04-for-verschachtelt-intro-task.excalidraw.light.svg]]
  </Tabs.Tab>
<Tabs.Tab>
![[04-for-verschachtelt-intro-solution.excalidraw.light.svg]]
</Tabs.Tab>
<Tabs.Tab>
![[for-verschachtelt-intro-print.mp4]]
</Tabs.Tab>
</Tabs>

### Quadratschiene

Wir wollen nun folgende Figur mit verschachtelten `for`-Schleifen zeichnen.
![[quadratschiene.png]]

Dazu habe ich Ihnen ein Erklärvideo erstellt, wie Sie solche Aufgaben angehen können.

![[for-quadratschiene.mp4]]

Wenn Sie in der äusseren Schleife eine Farbliste nutzen, können Sie Ihre Quadrate einfärben.

```turtle
import turtle
eva = turtle.Turtle()

quadratfarben = ["red", "orange", "cyan"]

for quadratfarbe in quadratfarben:
	eva.color(quadratfarbe)
	for seite in range(4):
		eva.forward(50)
		eva.right(90)
	eva.forward(50)
```

## Eigenständige Übungen

### Quadratschiene extended

Machen Sie diese Figur von versetzten Quadraten nach mit einer **Variabel `quadrate`** für die Anzahl Quadrate.

![[quadratschiene-extended.png]]

> [!solution]- Lösung
> 
> ```python
> quadrate = 3
> 
> for i in range(quadrate):
> 	for j in range(4):
> 		eva.forward(50)
> 		eva.right(90)
> 	eva.forward(70)
> ```

### Quadrat aus Quadraten
Ein Quadrat aus Quadraten

![[quadrat-aus-quadraten.png]]

> [!solution]- Lösung
> ```python
> for i in range(4):
> 	for j in range(4):
> 		eva.forward(50)
> 		eva.right(90)
> 	eva.right(90)
> ```

### Quadrattreppe

Machen Sie diese Leiter aus Quadraten nach mit einer **Variabel `quadrate`** für die Anzahl Quadrate.

![[quadrattreppe.png]]


> [!solution]- Lösung mit Videoerklärung 📺
> 
> ```python
> quadrate = 3
> 
> for i in range(quadrate):
> 	for j in range(4):
> 		eva.forward(50)
> 		eva.right(90)
> 	eva.forward(50)
> 	eva.right(90)
> 	eva.forward(50)
> 	eva.left(90)
> ```
> 
> ![[for-quadrattreppe.mp4]]

### `n`-Eck advanced

Sie können eine Variabel um 1 erhöhen, indem Sie sie mit sich selbst plus 1 überschreiben – also so:
```turtle
zahl = 3
print("Jetzt hat die Variabel den Wert: ", zahl)
zahl = zahl + 1
print("Jetzt hat die Variabel den Wert: ", zahl)
```

Versuchen Sie mit diesem Wissen Folgendes: Schreiben Sie ein Programm, das hintereinander zuerst ein Dreieck, dann ein Viereck, dann ein Fünfeck und zuletzt ein Sechseck zeichnet.

![[neck.png]]

> [!solution]- Lösung mit Videoerklärung
> 
> ```python
> ecken = 3
> 
> for i in range (4):
> 	for j in range(ecken):
> 		eva.forward(50)
> 		eva.right(360/ecken)
> 	ecken = ecken + 1
> ```
> 
> Das könnte man auch mit range() direkt lösen.
> 
> ```python
> for ecken in range (3,7):
> 	for j in range(ecken):
> 		eva.forward(50)
> 		eva.right(360/ecken)
> ```
> 
> ![[mehrere-neck.mp4]]

### Quadratpyramide

Machen Sie eine Pyramide aus Quadraten, bei der jede Reihe weniger Quadrate hat als die darunterliegende.

![[quadratpyramide.png]]

> [!solution]- Lösung mit Videoerklärung 📺
> 
> ```python
> seite = 50
> 
> for anzahl_quadrate in range(5, 0, -1):  # Reihen von 5 bis 1
>     for quadrat in range(anzahl_quadrate):  # Quadrate in jeder Reihe
>         for _ in range(4):  # Zeichnet ein Quadrat
>             eva.forward(seite)
>             eva.left(90)
>         # Weg zum nächsten Quadrat
>         eva.forward(seite)
>     # Weg zur nächsten Reihe
>     eva.back(50 * anzahl_quadrate)
>     eva.left(90)
>     eva.forward(seite)
>     eva.right(90)
>     eva.forward(seite / 2)
> turtle.done()
> ```
> 
> ![[quadratpyramide.mp4]]

### Blume

Versuchen Sie, **eine Blume mit fünf Blüten** zu zeichnen. Überlegen Sie sich, oder diskutieren Sie, wie Sie die Blume **in einfachere Schritte aufteilen könnten** und beginnen Sie mit dem einfachsten Teil.

![[blume.png]]


> [!solution]- Lösung mit Videoerklärung 📺
> 
> ```python
> import turtle
> 
> eva = turtle.Turtle("turtle")
> eva.speed(0)
> eva.pensize(2)
> blaetter = 5
> 
> # Blütenblätter wiederholen
> for k in range(blaetter):
>     # Zwei runde Linien pro Blütenblatt
>     for j in range(2):
>         # 60 kleine Schrittlein mit je einem Grad Drehung pro Linie
>         for i in range(60):
>             eva.forward(5)
>             eva.right(1)
>         eva.right(120)
>     eva.right(360/blaetter)
> 
> turtle.done()
> ```
> 
> ![[blume.mp4]]

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

### Quadratspirale

Eine Spirale aus grösser werdenden Quadraten.

![[quadratspirale.png]]

> [!solution]- Lösung mit Videoerklärung 📺
> 
> ```python
> for i in range(12):
>     for j in range(4):  # Quadrat zeichnen
>         eva.forward(20 + i * 10)  # Quadrate werden immer grösser
>         eva.right(90)
>     eva.right(30)  # Spiraleffekt durch Rotation
> ```
> 
> ![[quadratspirale.mp4]]

### Zusammenfassung

> [!info] Zusammenfassung
> 
> ## Verschachteln von for-Schleifen
> `for`-Schleifen kann man **verschachteln**. Auch der Körper des inneren Codeblocks (hellblau) braucht wieder **einen Einzug mehr** als erste Linie des blauen Blocks mit dem Doppelpunkt.
> 
> ![[04-for-verschachtelt-intro-solution.excalidraw.light.svg]]
> 
> Man muss aufpassen, **nicht zweimal die Variable `i` zu gebrauchen**. Typischerweise verwenden wir `i` und `j`.
> 
> Eine Zahlen-Variabel kann man um eins erhöhen, indem man sie mit sich selbst + 1 überschreibt.
> 
> ```python
> zahl = 3
> print("Jetzt hat die Variabel den Wert: ", zahl)
> zahl = zahl + 1
> print("Jetzt hat die Variabel den Wert: ", zahl)
> ```
