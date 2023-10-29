# Verschachtelter Einsatz der `for`-Schleife

Wenn Sie zwei `for`-Schleifen ineinander verschachteln, müssen Sie aufpassen, dass Sie **nicht zweimal die Variable `i` gebrauchen**. Typischerweise verwenden wir `i` und `j` – z.B. so:

😎👆👍😍🪴🤷🤔

```turtle
import turtle
eva = turtle.Turtle()

for i in range(2):
	for j in range(4):
		eva.forward(50)
		eva.right(90)
	eva.right(90)
```

> [!example] 😎👆👍😍🪴🤷🤔 Einzelarbeit
> 
> 1. Lösen Sie Ü1 und Ü2 für sich alleine. 
> 2. Besprechen Sie Ihre Lösungen.

```python
for i in range(4):
	for j in range(4):
		eva.forward(50)
		eva.right(90)
	eva.right(90)
```

> [!question] Ü1: ☝️ Machen Sie diese Figur nach.
> ```python
> for i in range(4):
> 	for j in range(4):
> 		eva.forward(50)
> 		eva.right(90)
> 	eva.right(90)
> ```
 
> [!question] Ü2:☝️ Machen Sie diese Figur nach.
> ```python
> for i in range(3):
> 	for j in range(4):
> 		eva.forward(50)
> 		eva.right(90)
> 	eva.forward(50)
> ```

> [!example] Gruppenarbeit
> 
> 1. Tun Sie sich in **Paaren** zusammen. 
> 2. Eine Person löst Ü3, die andere Ü4. 
> 3. Dann erklären Sie einander Ihre Denkweise und Ihre Lösung.

> [!question] Ü3:☝️ Machen Sie diese Figur nach mit einer **Variabel `quadrate`** für die Anzahl Quadrate.
> ```python
> quadrate = 3
> 
> for i in range(quadrate):
> 	for j in range(4):
> 		eva.forward(50)
> 		eva.right(90)
> 	eva.forward(70)
> ```



> [!question] Ü4:☝️ Machen Sie diese Figur nach mit einer **Variabel `quadrate`** für die Anzahl Quadrate.
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

Zum Verschachteln von `for`-Schleifen merken wir uns Folgendes:
> [!NOTE] Eintrag ins Theorieheft
> 
> ## Verschachteln von for-Schleifen
> `for`-Schleifen kann man **verschachteln**. Auch der Körper des inneren Codeblocks (hellblau) braucht wieder **einen Einzug mehr** als erste Linie des blauen Blocks mit dem Doppelpunkt.
> 
> Man muss aufpassen, **nicht zweimal die Variable `i` zu gebrauchen**. Typischerweise verwenden wir `i` und `j`.

## Variabeln während den Wiederholungen verändern

Sie können eine Variabel um 1 erhöhen, indem Sie sie mit sich selbst plus 1 überschreiben – also so:
```turtle
zahl = 3
print("Jetzt hat die Variabel den Wert: ", zahl)
zahl = zahl + 1
print("Jetzt hat die Variabel den Wert: ", zahl)
```

Versuchen Sie mit diesem Wissen Folgendes: 


> [!question] ☝️ Schreiben Sie ein Programm, das hintereinander zuerst ein Dreieck, dann ein Viereck, dann ein Fünfeck und zuletzt ein Sechseck zeichnet.
> ```python
> ecken = 3
> 
> for i in range (4):
> 	for j in range(ecken):
> 		eva.forward(50)
> 		eva.right(360/ecken)
> 	ecken = ecken + 1
> ```

> [!NOTE] Eintrag ins Theorieheft
> 
> Eine Zahlen-Variabel kann man um eins erhöhen, indem man sie mit sich selbst + 1 überschreib.
> ```python
> ecken = ecken + 1
> ```` 


> [!example] Falls noch Zeit bleibt ⏲️
> 
> Eine Herausforderung zum Schluss: Diskutieren und versuchen Sie, **eine Blume mit fünf Blüten** zu zeichnen. Das sieht am Schluss so aus:
> 
> 
> 
> Überlegen Sie sich, oder diskutieren Sie, wie Sie die Blume **in einfachere Schritte aufteilen könnten** und beginnen Sie mit dem einfachsten Teil.

[[ginf-b01l05-verschachteltwiederholen|L05]]
[[ginf-b01l07-funktionen|L07: Funktionen im Pseudocode]]
