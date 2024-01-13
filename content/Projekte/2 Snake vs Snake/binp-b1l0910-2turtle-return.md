---
slug: binpl0910-2turtle-return
title: "L09+L10: Zwei Turtle & das return-Statement"
---
## Zwei Turtle

> [!question]- Aktueller Stand: Snake-Steuerung für eine Turtle
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
> KEY_ESC = 27
> 
> # RUNNING soll True sein, solange das Programm läuft
> RUNNING = True
> 
> # Steuert beide Turtle bei keypressed-Event
> def steuern(key):
> 	global RUNNING
> 	
> 	if key.keyCode == KEY_ESC:
> 		RUNNING = False
> 		
> 	elif key.keyCode == KEY_RIGHT:
> 		eva.setHeading(90)
> 	elif key.keyCode == KEY_UP:
> 		eva.setHeading(0)
> 	elif key.keyCode == KEY_LEFT:
> 		eva.setHeading(270)
> 	elif key.keyCode == KEY_DOWN:
> 		eva.setHeading(180)
> 	else:
> 		print("Unbekannte Taste")
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
> while RUNNING:
> 	eva.forward(10)
> ```

### Übung 1

Wir haben jetzt eine komplette Snake-Steuerung für die Turtle `eva` gebaut. Zudem kann man das Spiel mit ESC abbrechen.

> [!example] Steuerung auf zweite Turtle erweitern
> 
> Wir formen Teams aus zwei oder drei Personen. 
> 
> Erweitern Sie unser bestehendes Programm, damit auch die zweite Turtle `joe` auf den Tasten A, S, D, W gesteuert werden kann. 

## Bedingungen von `while` und `if`

Das letzte Mal haben wir `while`-Schleifen und `if...elif...else`-Selektionen kennengelernt. Schauen wir uns jetzt die **Bedingungen** etwas genauer an, wann sie ausgeführt werden.

Bedingungen sind Vergleiche, die vom Computer ausgewertet werden, und entweder `True` (wahr) oder `False` (falsch) sind.

- 3 ist nicht gleich 4, also stimmt `3 == 4` offensichtlich nicht. Dieser Vergleich ergibt `False`.
- 3 ist aber kleiner als 4, also stimmt `3 < 4`. Dieser Vergleich ergibt `True`.

Schauen wir das mal in Aktion an. In diesem Beispiel startet `zahl`bei 0 und die Schleife läuft, **solange es `True` ist, dass `zahl` kleiner als 5 ist**.

```turtle
zahl = 0

while zahl < 5:
	if zahl == 3:
		print("Jetzt ist die Zahl 3!")
	else:
		print("Der Zähler ist:", zahl)
	zahl = zahl + 1  # Erhöht zahl um 1
```

In der Schleife wird `zahl` aber bei jeder Wiederholung um eins erhöht (Linie 8). Der Wert von `zahl` wird also um

Innerhalb der Schleife führt der Wert von `zahl` je nachdem zu anderen Ergebnissen wegen der `if...else`-Selektion.
- Wenn `zahl == 3` wahr ist, wird das erste Print-Statement auf Linie 5 ausgeführt.
- Ansonsten wir das zweite Print-Statement auf Linie 7 ausgeführt.

Tipp: Sie können mit `print()` anzeigen, ob eine Bedingung `True` oder `False` ist. Ein Beispiel:

```turtle
name = "Melanie"  
zahl = 5  
 
print(zahl)
print(3 > zahl)  
print(3 <= zahl)  
print(zahl == 4)  
print(zahl == 5)  
  
print(name)  
print(name == "Marc")  
print(name == "Melanie")
```

## Das return-Statement für Funktionen

Bislang haben wir gesehen, wie man Werte als Argumente in die Parameter einer Funktion abfüllt. Aber wie könnten wir **Werte von der Funktion wieder ins Hauptprogramm zurückgeben**?

In Python dient dazu das `return`-Statement. Sobald in einer Funktion `return` aufgerufen wird, **beendet die Funktion** ihre Ausführung und gibt den angegebenen Wert zurück.

Ein einfaches erstes Beispiel:
```turtle
def addieren(a, b):
	ergebnis = a + b
	return ergebnis

resultat = addieren(3, 5)
print(resultat)
```

Hier wird der Variabel `resultat` also **der Wert von `addieren(3, 5)` zugewiesen**. Das geht, weil die Funktion auch tatsächlich mit `return` einen Wert zurückgibt. In der Variabel wird dieser retournierte Wert gespeichert, nicht die Funktion `addieren(3, 5)` selbst.

> [!example] Gerade?
> 
> Schreiben Sie eine Funktion `gerade(zahl)`, die `True` zurückgibt, wenn `zahl` gerade ist, und ansonsten `False`. 
> 
> Dazu einige Tipps:
> - `return` beendet die Funktion
> - Mit `%` erhalten Sie den **Rest einer Division**. `17 % 3` gibt 2.

> [!question]- Lösung zu gerade
> 
> ```
> def istgerade(zahl):  
>     if zahl % 2 == 0:  
>         return True  
>     return False  
>   
> if istgerade(15):  
>     print("Das wird nie ausgeführt, weil 15 nicht gerade ist.")  
>       
> if istgerade(14):  
>     print("Das wird ausgeführt, weil 14 gerade ist.")
> ```

### Übung 3

> [!example] Funktion für Primzahl
> 
> Schreiben Sie eine Funktion `primzahl(zahl)`, die `True` zurückgibt, wenn `zahl` eine Primzahl ist, und ansonsten `False`. 
> 
> Dazu einige Tipps:
> - `return` beendet die Funktion
> - Mit `%` erhalten Sie den **Rest einer Division**. `17 % 3` gibt 2.
> - Mit `//` erhalten Sie das **abgerundete, ganzzahlige Ergebnis** einer Division. `9 // 5` gibt also 1.
> - Optionaler Effizienz-Tipp: Bei `for`-Schleifen mit `range(...)`ist `i` (oder j, k, ...) eine Zählvariabel, die Sie gebrauchen können. Versuchen Sie z.B. mal:
> 	```python
> 	for i in range(10):
> 		print(i)
> 	```

### Übung 3

> [!example] Alle Primzahlen bis 100 finden
> 
> Schreiben Sie mit Ihrer Funktion `primzahl(zahl)` ein Programm, das alle Primzahlen bis 100 findet. 
> 
> Dazu ein Tipp:
> - Sie können Werte mit `print()` ausgeben (das nicht sehr effizient, aber funktioniert).
> - Sie können eine Funktion direkt als Bedingung einer `if`-Selektion gebrauchen. Das ist speziell sinnvoll, wenn die Funktion `True` oder `False` als Wert zurückgibt - das sind ja genau die Werte, die `if`-Bedingungen auswerten!


> [!NOTE] Theorieeintrag
> 
> ## Theorie: Das return-Statement bei Funktionen
> 
> Mit `return` kann eine Funktion **einen Wert ans Hauptprogramm zurückgeben**. `return` **beendet die Funktion**! 
> 
> In diesem Beispiel wird der Rückgabewert `8` in der Variabel `ergebnis` gespeichert und dann mit `print()` ausgegeben.
> 
> ```python
> def addieren(a, b):
> 	ergebnis = a + b
> 	return ergebnis
> 
> ergebnis = addieren(3, 5)
> print(ergebnis)
> ```
> 
> Speziell wenn Funktionen die Werte `True` oder `False` zurückgeben, kann man sie direkt in `if`-Selektionen oder `while`-Schleifen **als Bedingung gebrauchen**.
> ```python
> def istgerade(zahl):  
>     if zahl % 2 == 0:  
>         return True  
>     return False  
>   
> if istgerade(15):  
>     print("Das wird nie ausgeführt, weil 15 nicht gerade ist.")  
>       
> if istgerade(14):  
>     print("Das wird ausgeführt, weil 14 gerade ist.")
> ```


> [!question]- Lösung zur Primzahl
> 
> ```python
> def primzahl(zahl):  
>     if zahl < 2:  
>         return False1
>     divisor = 2
>     for i in range(zahl//2):  
>         if zahl % divisor == 0:  
>             return False
>         divisor = divisor + 1
>     return True
>   
> # Test der Funktion  
> print(ist_primzahl(7))  # Sollte True zurückgeben  
> print(ist_primzahl(10))  # Sollte False zurückgeben
> 
> ```

[[binp-b1l0708-events2|Zurück]]
[[binp-b1l1112-crash|Weiter]]
