---
title: Intro zu Listen
---

> [!success] Lernziele
> 
> Am Ende dieser Lektion sollten Sie wissen:
> - Mit welchem Syntax Sie in Python eine Liste definieren.
> - Wie der Index einer Liste funktioniert und wie Sie damit ein bestimmtes Element in der Liste abrufen können.
> - Wie Sie for-Schleifen gebrauchen können, um Listen zu durchlaufen.

## Das Konzept von Listen
- Eine Liste ist eine **Sammlung von Elementen**. Das können Zahlen, Zeichenketten, weitere Objekte, ja sogar andere Listen sein.
- In Python wird eine Liste durch eckige Klammern `[]` definiert.
- Elemente in einer Liste sind durch Kommas getrennt.

```python
meine_liste = [1, 2, 3.1, "Hallo", 5, 6, "Velo", 8]
```

### Positionen in der Liste (Index)
- In Listen beginnt die Zählung der Positionen bei 0. Das erste Element hat also den Index 0, das zweite den Index 1, und so weiter.
- Sie können einen Teil der Liste auswählen, indem Sie seine Position in eckigen Klammern angeben:
- Sie können Listen **ineinander verschachteln** (Element 7)

```python
meine_liste = [1, 2, 3.1, "Hallo", 5, 6, "Velo", [3, 5] ]
# index:       0  1   2      3     4  5    6       7

print( meine_liste[0] )  # 1
print( meine_liste[3] )  # "Hallo"
print( meine_liste[7] )  # [3, 5]
print( meine_liste[7][1] ) # 5
```

```turtle
# Drucken Sie "Velo" aus
meine_liste = [1, 2, 3.1, "Hallo", 5, 6, "Velo", 8]

print( meine_liste[3] )
```
### Listen und for-Schleifen
- Die Funktion `range()`, die Sie aus `for`-Schleifen kennen, erzeugt auch eine Art Liste!
- `for`-Schleifen **iterieren** also durch die Elemente einer Liste.
- Dies ist nützlich, um Aktionen mit jedem Element durchzuführen.

```turtle
import turtle
eva = turtle.Turtle()

farbliste = ['red', 'green', 'blue', 'yellow']

for farbe in farbliste:
	print(farbe)
```

### Aufgabe: Quadrat aus Farben
Ändern Sie den Code oben 👆 so ab, dass Turtle `eva` ein Quadrat zeichnet und jede Seite die Farbe eines Elements der Liste hat. Die Stiftfarbe können Sie mit `eva.color(...)` ändern.
### Aufgabe: Liste mit Formen
1. Schreiben Sie eine Funktion `xeck(...)`, die je nach Argument ein Dreieck (`xeck(3)`), Viereck (`xeck(4)`), etc. zeichnet.
2. Erstellen Sie eine Liste namens `xeckliste` mit Werten für die Anzahl Ecken verschiedener X-Ecke. `[4, 7, 12]`.
3. Schreibe eine `for`-Schleife, die die Turtle alle Formen zeichnen lässt.

```python
formen = [4, 7, 12]
# Beispiel-Code hier
```

### Aufgabe: Farbiges xeck!

Mit der Funktion len(...) kann man die Anzahl der Elemente in einer Liste herausfinden.

Erweitern Sie diesen Code mit Ihrer Funktion xeck(...) von oben und zeichnen Sie ein X-Eck mit sovielen Ecken, wie es Farben in der Liste hat.

```turtle
import turtle
eva = turtle.Turtle()

farbliste = ["red", "blue", "yellow", "orange"]

print( len(farbliste) )

```

> [!question]- Videolösung
> 
> <video controls width="100%"><source src="https://v.nostr.build/kLB5.mp4" type="video/mp4" /></video>
> 

---
## Vertiefende Informationen

Diese Aufgaben sind für das Projekt nicht nötig.

### Werte hinzufügen, selektieren, entfernen

Mit der Methode `append` können Elemente am Ende der Liste hinzugefügt werden.
  
```python
zahlen = [1, 2, 3]
zahlen.append(4)  # Ergebnis: [1, 2, 3, 4]
```

Mit der Methode `insert` können Elemente an einer spezifischen Position in der Liste eingefügt werden. Die Syntax ist: `liste.insert(index, element)`

```python
zahlen = [1, 2, 4, 5]
# index:  0  1  2  3
zahlen.insert(2, 3)  # Ergebnis: [1, 2, 3, 4, 5]
```

In diesem Beispiel wird die Zahl 3 an der dritten Position (Index 2) in der Liste `zahlen` eingefügt.
### Entfernen von Elementen
Mit der Methode `remove(...)` wird das erste Element mit dem gewünschten Wert aus der Liste entfernt.
  
```python
zahlen = [7, 3, 5, 4, 8]
# index:  0  1  2  3  4
zahlen.remove(5)  # Ergebnis: [7, 3, 4, 8]
```

Mit der Methode `pop(...)` wird das Element mit dem angegebenen Index aus der Liste gestrichen.
```python
zahlen = [7, 3, 5, 4, 8]
# index:  0  1  2  3  4
zahlen.pop(1)  # Ergebnis: [7, 5, 4, 8]
```

### Teile der Liste auswählen (Slicing)
- Mit Slicing können Teile der Liste ausgewählt werden. Die Logik ist ähnlich wie bei `range(...)`, also `liste[start:ende:schritt]`

```python
zahlen = [7, 3, 5, 4, 8]
# index:  0  1  2  3  4
teil = zahlen[0:3]  # Ergebnis: [7, 3, 5]
```

### Ein Listenelement während `for`-Schleife verändern

Wenn wir eine Liste mit `for` durchlaufen, können wir sie nicht einfach so ändern. 

```turtle
liste = ["Hallo", "Velo"]
for element in liste:
	element = element + "Zusatz"
	print(element)
print(liste)
```

Wieso passiert das? Weil die Zählervariabel `element`eine Art **Kopie des Listenelements** ist und nicht das Listenelement im Speicher.

Wenn wir die Liste verändern wollen, müssen wir die **Position des Elements** in der Liste wissen und es überschreiben. Wir konstruieren mit `len(...)` und `range(...)` eine `for`-Schleife, die uns die Zahlen des Index der Liste gibt. Folgen Sie dazu folgenden Überlegungsschritten:

> [!question]- Wenn `liste = ["Hallo", "das", "sind", "Beispiele"]`, welchen Wert hat `len(liste)` ?
> 
> Genau: 4.


> [!question]- Wenn Sie eine altgebackene `for`-Schleife machen mit `for i in range(4):`, was sind die Werte für `i` und was entspricht das genau?
> 
> Die Werte sind 0, 1, 2, 3. Das sind genau die Werte der Indexzahlen der Liste!

```turtle
liste = ["Hallo", "Velo"]
for i in range(len(liste)):
	liste[i] = liste[i] + "Zusatz"
	print(liste[i])
print(liste)
```


### Aufgabe: Hinzufügen von Farben
1. Gegeben ist folgender Code mit einer Liste `farbliste` mit folgenden Farben: ["red", "blue", "yellow", "orange"]
2. Fügen Sie am Ende die Farben `"turquoise"` hinzu und an der Position mit Index 2 die Farbe `"grey"`
4. Entfernen Sie nun die Farbe `"yellow"` und dann das erste Element der Liste.
5. Starten Sie das Programm, wie sieht das Quadrat aus?

```turtle
import turtle
eva = turtle.Turtle()

farbliste = ["red", "blue", "yellow", "orange"]

# Fügen Sie Ihren Code hier ein

for farbe in farbliste:
	eva.color(farbe)
	eva.forward(50)
	eva.right(90)
```

.