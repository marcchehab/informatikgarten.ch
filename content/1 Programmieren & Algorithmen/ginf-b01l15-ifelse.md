---
title: "L15: If ... else ... in Python"
---
Wenn wir in Python programmieren, nutzen wir oft `if`-Anweisungen, um Entscheidungen zu treffen. Das ist so, als würden wir im echten Leben sagen: "Wenn es regnet, dann nehme ich einen Regenschirm mit."

## Vergleich mit `if`

Wie setzen wir das in Python um? 
### Syntax

```python
if Bedingung:
    # Auszuführende Anweisungen, wenn die Bedingung True (wahr) ist
```

### Beispiel
```python
wetter = "sonnig"

if wetter == "sonnig":
    print("Vergessen Sie nicht, Sonnencreme aufzutragen!")
```

In diesem Beispiel wird die Nachricht nur dann ausgegeben, wenn das Wetter "sonnig" ist. Die Bedingung wird ausgewertet und ist entweder `True` (wahr), dann wir werden die Befehle im `if`-Block ausgeführt, oder `False` (falsch), dann werden sie nicht ausgeführt.

Beachten Sie, dass zwei Gleichheitszeichen verwendet werden:
- Ein einzelnes Gleichheitszeichen `=` ist beim Programmieren **kein *Ver*gleich**, sondern eine **Wert*zuweisung*** - z.B. oft für eine Variabel.
- Zwei Gleichheitsszeichen `==` sind ein **Vergleich**. Also eine Frage, **ob** zwei Werte gleich sind.
- Vergleichsoperatoren `>`, `>=`, `<=`, `<` können Zahlenwerte vergleichen.

Die Werte dieser Bedingungen oder Tests beim `if`-Statement können Sie direkt mit `print()` ausdrucken.

```turtle
wetter = "sonnig"
print( wetter == "regnerisch" ) # False
print( wetter == "sonnig" ) # True
```

## Erweiterung: `if ... else`

Manchmal möchten wir nicht nur eine Aktion ausführen, wenn eine Bedingung wahr ist, sondern auch **eine alternative Aktion, falls die Bedingung nicht erfüllt wird**. Für solche Fälle verwenden wir die `if ... else`-Struktur.

### Syntax

```python
if Bedingung:
    # Auszuführende Anweisungen, wenn die Bedingung True (wahr) ist
else:
    # Auszuführende Anweisungen, wenn die Bedingung False (falsch) ist
```

### Beispiel

```python
wetter = "regnerisch"

if wetter == "sonnig":
    print("Vergessen Sie nicht, Sonnencreme aufzutragen!")
else:
    print("Besser einen Regenschirm mitnehmen!")
```

In diesem Beispiel wird die erste Nachricht ausgegeben, wenn das Wetter "sonnig" ist. Falls das Wetter jedoch nicht "sonnig" ist (also die Bedingung `wetter == "sonnig"` nicht erfüllt ist), wird die zweite Nachricht ausgegeben.
### Aufgabe 1

Schreiben Sie ein Turtle-Programm, dass die User mit `input(...)` aus [[ginf-b01l02-turtleintro|Lektion 2]] um eine Eingabe bittet, und ein eine Treppe zeichnet, wenn sie "treppe" eingeben. Ansonsten soll das Programm mit `print(...)` einfach eine nette Nachricht anzeigen.

```turtle
# Ihr Code
```

> [!question]- Mögliche Lösung
> 
> ```python
> import turtle
> eva = turtle.Turtle()
> 
> eingabe = input("Ihre Eingabe:")
> if eingabe == "treppe":
>     for i in range(4):
>         eva.left(90)
>         eva.forward(20)
>         eva.right(90)
>         eva.forward(20)
> ```

## Komplett: `if ... elif ... else`

Es gibt auch Fälle, in denen wir mehr als zwei Möglichkeiten haben und mehrere Bedingungen prüfen wollen. Dafür können wir `if ... elif ... else` verwenden.

### Syntax

```python
if Bedingung1:
    # Auszuführende Anweisungen, wenn Bedingung1 True (wahr) ist
elif Bedingung2:
    # Auszuführende Anweisungen, wenn Bedingung2 True (wahr) ist
else:
    # Auszuführende Anweisungen, wenn keine der Bedingungen True (wahr) ist
```

### Beispiel

```python
wetter = "bewölkt"

if wetter == "sonnig":
    print("Vergessen Sie nicht, Sonnencreme aufzutragen!")
elif wetter == "regnerisch":
    print("Besser einen Regenschirm mitnehmen!")
else:
    print("Das Wetter ist unklar. Seien Sie auf alles vorbereitet!")
```

In diesem Beispiel wird die entsprechende Nachricht ausgegeben, abhängig vom Wert der Variable `wetter`. Es werden mehrere Bedingungen nacheinander geprüft:
1. Ist das Wetter "sonnig"?
2. Wenn nicht, ist es "regnerisch"?
3. Wenn keines von beiden zutrifft, wird der Text im `else`-Block ausgegeben.

So können wir eine Reihe von Bedingungen prüfen und für jeden Fall unterschiedliche Anweisungen ausführen.
### Aufgabe 2

Erweitern Sie Ihre Programm von Aufgabe 1 mit weiteren Figuren!
- Die Turtle soll Drei- bis und mit Siebeneck ("dreieck", "viereck", etc.) zeichnen.
- Die Turtle soll einen "kreis" zeichnen können, wenn die User das eingeben.

### Aufgabe 3

Erweitern Sie Ihr Turtle-Programm weiter, sodass Ihre User eine Zahl eingeben können, und ein entsprechendes Xeck gezeichnet wird - also ein Eingabe von "5" zeichnet ein Fünfeck. 

Im nächsten Block lernen Sie, was Datentypen sind. Für diese Aufgabe ist bereits folgende Info wichtig: Eine Eingabe wird immer als **Zeichenkette** interpretiert, **nicht als Zahl**. Hierzu zwei Tipps:

1) Python hängt an Zeichenketten viele Funktion an, sogenannte "Methoden". `variabelname.isdigit()` testet beispielsweise, ob eine Zeichenkette nur Zahlen enthält, und wird je nachdem als `True` oder `False` ausgewertet. Ein Beispiel:
```turtle
zahlenmittext = "123hallo" # Zahlen und Buchstaben
nurzahlen = "41232" # Nur Zahlen

print( zahlenmittext.isdigit() )
if zahlenmittext.isdigit():
	print("zahlenmittest.isdigit() wurde als wahr ausgewertet!")

print( nurzahlen.isdigit() )
if nurzahlen.isdigit():
	print("nurzahlen.isdigit() wurde als wahr ausgewertet!")
```

2) Sie können eine Eingabe aber mit der Funktion `int()` in eine natürliche Zahl umwandeln.

### Aufgabe 4

Den Rest einer Division können Sie mit dem "Modulo"-Operator `%` ausrechnen.

```turtle
print ("8 % 3:", 8 % 3 ) # 8 durch 3 hat einen Rest von 2
print ("8 % 4:", 8 % 4 ) # 8 durch 4 hat einen Rest von 0
print ("Ist der Rest 0?", 8 % 4 == 0) # True, weil das stimmt ja
```

Nun Ihr Auftrag, falls Sie ihn annehmen: Addieren Sie alle Zahlen bis 100, die restlos durch 3 teilbar sind und geben Sie das Ergebnis aus!

> [!question]- Lösung
> 
> ```python
> sum = 0
> 
> for i in range(101):
> 	if i % 3 == 0:
> 		sum = sum + i
> print(sum)
> ```

## Einfache boolesche Algebra

Sie können mehrere Wahrheitstests verbinden. Dazu helfen Ihnen folgende Schlagwörter:
### `not` kehrt den Wahrheitswert um
```turtle
x = 5
print ("normal:", x == 5 )
print ("mit not:", not x == 5 )
```

### `and` fragt, ob **beide** Wahrheitstests wahr sind

```turtle
x = 5
print("x < 10:", x < 10 ) # True
print("x % 2  0:", x % 2 == 0) # False
print("Beides zusammen:", x < 10 and x % 2 == 0) # False, weil nicht beides True ist.

# Noch ein Beispiel
print("x < 10 or x % 5 == 0:", x < 10 or x % 5 == 0) # True, weil x ist sowohl kleiner als 10 als auch restlos durch 5 teilbar.
```

### `or` fragt, ob einer der Wahrheitstests wahr ist

```turtle
x = 5

print ( x < 10 or x % 2 == 0 ) # True, weil x ist kleiner als 10. Das reicht für or bereits.

print ( x < 3 or x % 5 == 0 ) # True, weil x ist zwar nicht kleiner als 3, aber dafür restlos durch 5 teilbar.
```

Sie kennen die Logik von `not`, `and` und `or` wahrscheinlich aus der Mengenlehre aus der Mathematik unter dem Schlagwort "Boolesche Algebra".
![[Pasted image 20231024073757.png]]

Entsprechend heissen heissen die Datentypen von `True` und `False` auch "boolean".
### Aufgabe 5

Ändern Sie Ihre Lösung von Aufgabe 4 so ab, dass Sie alle Zahlen bis 100 aufaddieren, die zwar restlos durch 5 teilbar sind, aber **nicht** restlos durch 3 teilbar sind!

> [!question]- Lösung
> 
> ```python
> sum = 0
> 
> for i in range(101):
> 	if i % 5 == 0 and not i % 3 == 0:
> 		sum = sum + i
> print(sum)
> ```

> [!note] Theorieeintrag
> 
> ## Theorie: `if ... elif ... else`-Selektion
> 
> Selektionen funktionieren immer mit **Bedingungen**, oft auch Wahrheitstests genannt, die als Gesamtheit entweder True (wahr) oder False (falsch) sind. Je nachdem werden andere Teile des Programms ausgeführt.
> 
> ```python
> if Bedingung1:
>     # Auszuführende Anweisungen, wenn Bedingung1 True (wahr) ist
> elif Bedingung2:
>     # Auszuführende Anweisungen, wenn Bedingung2 True (wahr) ist
> else:
>     # Auszuführende Anweisungen, wenn keine der Bedingungen True (wahr) ist
> ```
> Vergleichsoperatoren für Tests:
> - Zwei Gleichheitszeichen (`==`) sind ein **Vergleich**: 
> 	```python
> 	x = "beispiel" # Ein Gleichheitszeichen ist eine Wertzuweisung. 
> 	
> 	# Zwei Gleichheitszeichen sind ein Vergleich
> 	if x == "beispiel":
> 		print("x hat den gleichen Wert wie 'Beispiel'!")
> 	
> 	Wir können das Ergebnis dieses Vergleichs auch direkt anzeigen:
> 	print(x == "beispiel") # Das druck True aus
> 	print(x == "sonstetwas") # Das druck False aus
> 	```
> - Vergleichszeichen (`<`, `>`, `<=`, `>=`) vergleichen Zahlen
> 	```` 
> 	y = 5
> 	print(y > 3) # Das wertet zu True aus
> 	print(y <= 4) # Das wertet zu False aus 


[[ginf-b01l0910-for2|Zurück]]
[[ginf-b02l0102-datainfo|Weiter zu Block 2]]
