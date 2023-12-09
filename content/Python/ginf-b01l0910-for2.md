---
title: "B01L09+L10: range(...) und Zählervariabeln bei for-Schleife"
---
## Wozu ist `i` in einer `for`-Schleife da?

Um Repetitionen zu schreiben, haben wir die `for`-Schleife gebraucht, die wir heute etwas besser kennenlernen. Eine 5-fache Wiederholung ging so:

```python
for i in range(5):
	# Code der sich 5-mal wiederholt
```

Aber was geschieht hier genau? Untersuchen wir das doch mal.

```turtle
for i in range(5):
	print("Wert von i ist", i)
```

Aha! Wir lernen: `range(max)` erzeugt eine **Liste** ganzer Zahlen **von und mit 0 bis aber ohne `max`**. 

Im Folgenden wiederholen wir das nicht immer wieder: **"Von A bis B"** verstehen wir, falls nicht anderes angegeben, als: **von und mit A, bis und ohne B**.

### Übung 1: Code-Detektive

> [!example] Code-Detektive
> 
> `range(...)` kann man auch mit **mehreren durch Kommas getrennten Argumenten** gebrauchen, z.B. `range(2, 100, 4)`. **Finden Sie heraus, für was diese Argumente gut sind**!

> [!question] Lösung
> 
> `range(...)` kann man mit einem, zwei oder drei Argumenten gebrauchen:
> - `range(maximum)`: Erzeugt eine Liste von und mit 0 bis aber ohne die Zahl `maximum`. z.B. `range(4)` erzeugt: `[0, 1, 2, 3]`.
> - `range(minimum, maximum)`: Erzeugt eine Liste von und mit `minimum` bis aber ohne `maximum`. z.B. `range(2, 6)` erzeugt: `[2, 3, 4, 5]`.
> - `range(minimum, maximum, abstand)`: Erzeugt eine Liste von und mit `minimum` bis aber ohne `maximum`, wobei die Zahlen immer `abstand` auseinander liegen. z.B. `range(2, 13, 3)` erzeugt: `[2, 5, 8, 11]`.

### Übung 2: Mathematik mit `i`

Schaffen Sie, dass die Zahlen anstatt von 0 bis 5 (0, 1, 2, 3, 4) **umgekehrt von 5 bis 0** (5, 4, 3, 2, 1) ausgedruckt werden?

> [!question] Lösung
> 
> ```python
> for i in range(5):
> 	print("Wert von i ist", 5-i)
> ```

Mit dieser Zählervariabel können Sie auch rechnen. Sagen wir, Sie wollen **Summe aller Zahlen bis *und mit* 500**.
$$
0 + 1 + 2 + 3 + 4 + \ldots + 500
$$
In der Mathematik könnte man das mit dem Summenzeichen Sigma so notieren:
$$
\sum_{n=0}^{500} n
$$
Sie können das (und viel kompliziertere Formeln!) mit einem Programm den Computer ausrechnen lassen!

> [!question] Lösung
> 
> ```python
> summe = 0
> for i in range(501):
> 	summe = summe + i
> print(summe)
> ```

Nur am Rande: Mathematisch lässt sich dieses einfache Beispiel  natürlich viel cleverer lösen, wenn Sie realisieren, dass 0 + 500 und 1 + 499 und 2 + 498 *et cetera* immer das Gleiche gibt (Stichwort: Gauss'sche Summenformel).

### Übung 3: `i` mit der Turtle gebrauchen

Mit diesem Wissen über `range(...)` und die Zählervariabel sollte folgende Übung aus der letzten Lektion relativ einfach zu lösen sein.

Nutzen Sie Ihre Funktion `xeck(ecken)` der letzten Lektion und **nutzen Sie die Zählervariabel i Ihrer `for`-Schleife**, um alle Figuren von einem Dreieck bis und mit einem Zwölfeck zu zeichnet.

![[attachments/Pasted image 20230904190230.png]]

> [!question] Lösung
> 
> ```python
> def xeck(ecken):
> 	for i in range(ecken):
> 		eva.forward(50)
> 		eva.right(360/ecken)
>  
> for i in range(3, 13):
> 	xeck(i)
> ```` 

## Fortgeschrittene `for`-Wiederholungen mit `i`
### Übung 4: Quadrat und Reihe

Nun versuchen wir mit unserem neuen Wissen über `range(...)` und `for`-Schleifen komplexere Konstrukte zu bauen. 

> [!question] Schreiben Sie zunächst eine Funktion `quadrat(seite)`, die ein Quadrat zeichnet.
> 
> ```python
> def quadrat(seite):
> 	for i in range(4):
> 		eva.forward(seite)
> 		eva.left(90)
> ```

Versuchen Sie nun, eine Pyramide aus Quadraten zu bauen. Zerlegen Sie sich das Problem in **einfachere Teilprobleme**!
1. Die Pyramide besteht aus Reihen
2. Die Reihen bestehen aus Quadraten

![[attachments/Pasted image 20230917122710.png]]

> [!question] Beginnen wir mit einer Funktion `reihe(breite)`, die uns eine Reihe aus Quadraten macht und die Turtle wieder an den Ausgangspunkt setzt. Zusätzlich habe ich im Hauptprogramm eine globale Variabel `s = 30` für die Seitenlängen kreiert. 
> 
> ```python
> s = 30
> def reihe(breite):  
> 	for i in range(breite):  
> 		quadrat(s)  
> 		eva.forward(s)
> 	eva.back(s*breite)
> ```

### Übung 5: Pyramide aus Quadraten

Nun müssen wir solche Reihen **aufeinanderstabeln**. Überlegen Sie sich dazu, wo die Turtle nach einer Reihe am Schluss steht (orange) und wo sie zu Beginn der nächsten Reihe stehen sollte (grün).

![[attachments/Pasted image 20230917141440.png|400]]

> [!question] Schreiben Sie eine `for`-Schleife, die eine sechs Quadrate hohe Pyramide baut.
> 
> ```python
> for i in range(6):  
>     reihe(6-i)  
>     eva.left(90)  
>     eva.forward(s)  
>     eva.right(90)  
>     eva.forward(s/2)
> ```

> [!question] Erstellen Sie im Hauptprogramm eine Variabel `hoehe = 6` für die Höhe der Pyramide und passen Sie Ihre `for`-Schleife an.
> 
> ```python
> for i in range(hoehe):  
>     reihe(hoehe-i)  
>     eva.left(90)  
>     eva.forward(s)  
>     eva.right(90)  
>     eva.forward(s/2)
> ```

![[attachments/Pasted image 20230917152249.png]]

> [!question] Verständnisfrage: Was müssten Sie im Code ändern, um diese Figur zu erzeugen 👆 ?
> 
> Man muss die `range`-Funktion der `for`-Schleife im Hauptprogramm leicht abändern, damit sie nur zweimal läuft.
> 
> Anstatt das hier 👇
> ```python
> for i in range(hoehe):
> ```
> 
> Müssen wir das hier schreiben 👇
> ```python
> for i in range(2):
> ```

### Übung 6: Zwei Pyramiden aus Quadraten

![[attachments/Pasted image 20230917144702.png]]

> [!question] 👆 Versuchen Sie mit den bestehenden Funktionen diese Figur reproduzieren.
> 
> ```python
> import gturtle
> 
> eva = gturtle.Turtle()
> eva.right(90)
> 
> s = 30
> hoehe = 6
> 
> def quadrat(seite):
>     for i in range(4):
>         eva.forward(seite)
>         eva.left(90)
> 
> def reihe(breite):
>     for j in range(breite):
>         quadrat(s)
>         eva.forward(s)
>     eva.back(s*breite)
>     
> for i in range(hoehe):
>     reihe(hoehe-i)
>     eva.left(90)
>     eva.forward(s)
>     eva.right(90)
>     eva.forward(s/2)
> 
> eva.back(s/2)
> for i in range(2, hoehe+1):
>     eva.back(s/2)
>     reihe(i)
>     eva.left(90)
>     eva.forward(s)
>     eva.right(90)
> ```

### Übung 7: Pyramide aus Dreiecken

![[attachments/Pasted image 20230917143015.png]]

> [!question] Versuchen Sie eine Pyramide aus Dreiecken zu bauen.
> 
> ```python
> import gturtle
> 
> eva = gturtle.Turtle()
> eva.right(90)
> 
> s = 30
> hoehe = 6  
> 
> def dreieck(seite):
>     for i in range(3):
>         eva.forward(seite)
>         eva.left(360/3)
> 
> def reihe(breite):
>     for j in range(breite):
>         dreieck(s)
>         eva.forward(s)
>     eva.back(s*breite)
>     
> for i in range(hoehe):
>     reihe(hoehe-i)
>     eva.left(60)
>     eva.forward(s)
>     eva.right(60)
> ```


![[attachments/Pasted image 20230917161806.png]]

> [!question] 👆 Versuchen Sie mit den bestehenden Funktionen diese Figur reproduzieren.
> 
> Die Schwierigkeit dieser Aufgabe liegt darin, zu merken, dass Sie die Turtle in der Mitte 180 Grad drehen müssen, damit die Dreiecke auf dem Kopf gezeichnet werden.
> 
> ```python
> import gturtle
> 
> eva = gturtle.Turtle()
> eva.right(90)
> eva.ht()
> 
> s = 30
> hoehe = 6  
> 
> def dreieck(seite):
>     for i in range(3):
>         eva.forward(seite)
>         eva.left(360/3)
> 
> def reihe(breite):
>     for j in range(breite):
>         dreieck(s)
>         eva.forward(s)
>     eva.back(s*breite)
>     
> for i in range(hoehe):
>     reihe(hoehe-i)
>     eva.left(60)
>     eva.forward(s)
>     eva.right(60)
> 
> eva.right(180)
> 
> for i in range(1, hoehe+1):
>     eva.right(120)
>     eva.forward(s)
>     eva.left(120)
>     reihe(i)
> ```

### Übung 8: Eine Blume zeichnen

Challenge: Versuchen Sie eine Funktion `blume(blaetter)` zu kreieren mit einem Parameter für die Anzahl Blätter.

![[attachments/Pasted image 20230918063405.png]]
> [!question] Lösung zur Blume
> 
> Der Schlüssel liegt darin, die verschiedenen **Bausteine Schritt für Schritt** zu programmieren.
> ```
> 1. Eine Blume besteht aus Blättern.
> 2. Ein Blatt besteht aus zwei runden Linien.
> 3. Eine runde Linie besteht aus vielen kleinen Schritten und Drehungen.
> ```
> #### Runde Linien
> Jetzt beginnen wir von unten bei Nummer 3. Wie machen wir eine **runde Linie**? 
>   
> ```
> for i in range(60):  
> 		eva.forward(2)  
> 		eva.right(1)
> ```
> Nachdem wir uns so 60-mal (weil `range(60)`) um ein Grad gedreht haben (weil `eva.right(1)`), haben wir uns insgesamt 60 Grad gedreht. 
> 
> #### Ein Blatt
> 
> Jetzt machen wir Schritt 2: das Blatt. Dafür muss die Turtle eine runde Linie nach vorne und wieder zurück machen. Nach der ersten runden Linie hat sie sich 60° gedreht. Um wieder zurück zu fahren, muss sie sich insgesamt 180° drehen - also fehlen noch 120°.
> 
> ![[../binp2/attachments/Pasted image 20230829111652.png]]
> 
> Mit dieser Idee kann man eine Funktion `blatt()` schreiben.
> 
> ```
> def blatt():  
>     for j in range(2): 
>         for i in range(60):  
>             eva.forward(2)  
>             eva.right(1)  
>         eva.right(120)
> ```
> Die innere Schleife mit `i` macht die runde Linie. Die äussere Schleife mit `j` macht zwei runde Linien mit je 60° und dreht die Turtle 120°.
> 
> #### Eine Blume
> 
> Der Rest ist nun einfacher: Wir müssen die Turle im Kreis drehen und Blätter malen. Eleganterweise könnten wir dafür eine Funktion `blume(blaetter)` schreiben, die unsere Funktion `blatt()` nutzt:
> 
> ```
> def blume(blaetter):  
>     for i in range (blaetter):  
>         blatt()  
>         turtle.right(360/blaetter)
> ```
> Eine Blume mit sieben Blättern können wir nun so zeichnen: `blume(7)`
> 


> [!NOTE] Theorieeintrag
> 
> ## Theorie: `range(...)` und die Variabel der `for`-Schleife 
> 
> Bei for-Schleifen erzeugt die Funktion `range(...)` eine **Liste von Zahlen** und die **Zählervariabel `i` (oder `j`, `k`, ...) nimmt einen Wert nach dem anderen an**.
> 
> `range(...)` kann man mit einem, zwei oder drei Argumenten gebrauchen:
> - `range(maximum)`: Erzeugt eine Liste von und mit 0 bis aber ohne die Zahl `maximum`. z.B. range(4) erzeugt: 0, 1, 2, 3.
> - `range(minimum, maximum)`: Erzeugt eine Liste von und mit `minimum` bis aber ohne `maximum`. z.B. range(2, 6) erzeugt: 2, 3, 4, 5.
> - `range(minimum, maximum, abstand)`: Erzeugt eine Liste von und mit `minimum` bis aber ohne `maximum`, wobei die Zahlen immer `abstand` auseinander liegen. z.B. range(2, 13, 3) erzeugt: 2, 5, 8, 11.

[[ginf-b01l08-funktionenpython|Zurück]]
[[ginf-b01l1112|Weiter]]
