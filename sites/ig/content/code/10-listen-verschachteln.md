---
title: Listen verschachteln
---

> [!success] Lernziele
> 
> - Sie können Listen in Python verschachteln.
> - Sie können mit verschachtelten for-Schleifen durch verschachtelte Listen iterieren.

In dieser Lektion werden wir lernen, wie man Listen in Python verschachtelt. Dies ist eine nützliche Technik, die es uns ermöglicht, unser Bild und andere komplexe Datenstrukturen zu erstellen und zu manipulieren.
## Verschachtelte Listen erstellen

Eine verschachtelte Liste ist eine Liste, die andere Listen als Elemente enthält. Hier ist ein Beispiel:

```python
hauptliste = [
	[1, 2, 3, 4], 
	[5, 6], 
	[7, 8, 9]
]
```

In diesem Beispiel besteht die Liste `hauptliste` aus drei Elementen, die alle ebenfalls Listen sind:

0) Die Liste `[1,2,3,4]`
1) Die Liste `[5,6]`
2) Die Liste `[7,8,9]`

Wenn Sie wie gewohnt mit einer `for`-Schleife durch die `hauptliste` iterieren, werden Sie diese drei Listen in der Laufvariable als Elemente erhalten:

```turtle
hauptliste = [
	[1, 2, 3, 4], 
	[5, 6], 
	[7, 8, 9]
]

print("Wie viele Elemente stecken in der Hauptliste?", len(hauptliste))
print() # Um eine leere Linie zu machen

for element in hauptliste:
	print("Element:", element)
```
## Verschachtelte Listen mit verschachtelten `for`-Schleifen durchlaufen

Sie können verschachtelte Listen durchlaufen, indem Sie auch verschachtelte `for`-Schleifen verwenden. Hier ist ein Beispiel:

```turtle
hauptliste = [
	[1, 2, 3, 4], 
	[5, 6], 
	[7, 8, 9]
]

for unterliste in hauptliste:
	print("Beginn einer neuen Unterliste")
	for element in unterliste:
		print(element)
```

## Unser Bild zeichnen

Sie haben nun das Rüstzeugs, unser Bild zu zeichnen, weil es nichts Anderes als eine verschachtelte Liste ist. Hier ein Beispielbild, dass Sie verwenden können. Es handelt sich um eine Schweizer Organisation, die weltweit Gutes tut.

```python
 
bild = [
['white', 'white', 'white', 'white', 'white', 'white', 'black', 'black', 'black', 'black', 'black', 'white', 'white', 'white', 'white', 'white', 'white'],
['white', 'white', 'white', 'white', 'black', 'black', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'black', 'black', 'white', 'white', 'white', 'white'],
['white', 'white', 'white', 'black', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'black', 'white', 'white', 'white'],
['white', 'white', 'black', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'black', 'white', 'white'],
['white', 'black', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'black', 'black', 'black', 'yellow', 'yellow', 'black', 'white'],
['white', 'black', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'black', 'white', 'white', 'white', 'black', 'yellow', 'black', 'white'],
['black', 'yellow', 'yellow', 'yellow', 'black', 'black', 'black', 'yellow', 'yellow', 'black', 'white', 'black', 'white', 'black', 'yellow', 'yellow', 'black'],
['black', 'yellow', 'yellow', 'black', 'yellow', 'yellow', 'yellow', 'black', 'yellow', 'black', 'white', 'white', 'white', 'black', 'yellow', 'yellow', 'black'],
['black', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'black', 'black', 'black', 'yellow', 'yellow', 'yellow', 'black'],
['black', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'black'],
['black', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'black'],
['white', 'black', 'yellow', 'yellow', 'yellow', 'black', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'black', 'white'],
['white', 'black', 'yellow', 'yellow', 'yellow', 'yellow', 'black', 'black', 'black', 'black', 'black', 'yellow', 'yellow', 'yellow', 'yellow', 'black', 'white'],
['white', 'white', 'black', 'yellow', 'yellow', 'yellow', 'yellow', 'black', 'black', 'black', 'yellow', 'yellow', 'yellow', 'yellow', 'black', 'white', 'white'],
['white', 'white', 'white', 'black', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'black', 'white', 'white', 'white'],
['white', 'white', 'white', 'white', 'black', 'black', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'black', 'black', 'white', 'white', 'white', 'white'],
['white', 'white', 'white', 'white', 'white', 'white', 'black', 'black', 'black', 'black', 'black', 'white', 'white', 'white', 'white', 'white', 'white'],
]
```

## Pixel-perfect Turtle

Man mit der Turtle auch perfekt quadratische Pixel zeichnen. Die Zutaten sind folgende:

1. Wir zeichnen keine Linien, also setzen wir von Beginn an den Stift ab mit `eva.penup()`.
2. Man kann der Turtle eine andere Form geben - z.B. eben ein Quadrat mit `eva.shape('square')`
3. Nun kann man das Bild der Turtle “stempeln” mit `eva.stamp()`

Ein Beispiel:

![[05-listen-verschachteln-mario.png]]

