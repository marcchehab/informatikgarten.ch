---
title: "L08: Funktionen in Python"
slug: b01l08-funktionen
---
Funktionen in Python sind sehr nützlich, um bestimmte Blöcke von Code in Teilprogramme zu packen, die eine spezifische Aufgabe erfüllen. Sie können sowohl mit als auch ohne Parameter definiert werden.

## Funktionen ohne Parameter

Geschrieben werden Funktionen wie andere Codeblöcke auch ([[ginf-b01l03-wiederholungen|siehe L03]]). Sie können eine Funktion definieren, die keine Argumente benötigt, wie im folgenden Beispiel:

```python
def dreieck():
	for i in range(3):
		eva.forward(100)
		eva.right(360/3)
```

Um diese Funktion auszuführen, müssen Sie sie aufrufen:

```python
dreieck()
```

## Funktionen mit Parametern

Manchmal möchten Sie der Funktion spezifische Informationen übergeben, damit sie ihre Aufgabe erfüllen kann. Diese Informationen nennen wir **Argumente**, die in die **Parameter** der Funktion abgefüllt werden.

```python
def dreieck(seitenlaenge):
	for i in range(3):
		eva.forward(seitenlaenge)
		eva.right(360/3)
```

Um diese Funktion auszuführen, können Sie ihr beim Aufruf beispielsweise den Wert `50` als Argument übergeben, der dann in das Parameter `seitenlaenge` gefüllt wird.

```python
dreieck(50)
```

## Funktionen "verschachteln"

Eine Funktion kann alle anderen Funktionen nutzen. z.B. hier nutzt die Funktion `blume()` die Funktion `dreieck()`. 

```python
def dreieck():
	for i in range(3):
		eva.forward(50)
		eva.right(360/3)

def blume():
	for i in range(8):
		dreieck()
		eva.right(360/8)

blume()
```

## Übungen

### Übung 1

![[Pasted image 20230904192011.png]]
> [!question]- Schreiben Sie eine Funktion `rechteck()`, die ein Rechteck wie oben zeichnet 👆.
> 
> ```python
> eva.left(90) # Das muss man in TigerJython NICHT machen, da die Turtle bereits nach oben schaut.
> 
> def rechteck():
> 	for i in range(2):
> 		eva.forward(30)
> 		eva.right(90)
> 		eva.forward(60)
> 		eva.right(90)
> 
> rechteck()
> ```

### Übung 2

Eine Funktion kann alle anderen Funktionen gebrauchen.

![[Pasted image 20230904192315.png]]
> [!question]- Nutzen Sie Ihre Funktion `rechteck()` in einer zweiten Funktion `treppe(stufen)`, die uns eine Treppe mit Anzahl `stufen` zeichnet – oben beispielsweise mit `treppen(8)` aufgerufen.
> 
> ```python
> 
> eva.left(90) # Das muss man in TigerJython NICHT machen, da die Turtle bereits nach oben schaut.
> 
> def rechteck():
> 	for i in range(2):
> 		eva.forward(30)
> 		eva.right(90)
> 		eva.forward(60)
> 		eva.right(90)
> 
> def treppe(stufen):
> 	for i in range(stufen):
> 		rechteck()
> 		eva.forward(30)
> 
> treppe(8)
> ```` 

### Übung 3

Erinnern Sie sich an folgenden Code aus [[ginf-b01l04-for|Lektion 4]] und lösen Sie damit die anschliessenden Übungen:

```python
for i in range(6):
	eva.forward(50)
	eva.right(360/6)
```

![[Pasted image 20230904183640.png]]
> [!question]- Erstellen Sie eine Funktion `sechseck()` und führen Sie sie zweimal so aus, dass die Form einer Acht wie oben 👆 entsteht.
> 
> ```python
> def sechseck():
> 	for i in range(6):
> 		eva.forward(50)
> 		eva.right(360/6)
> 
> sechseck()
> eva.right(180)
> sechseck()
> ```
### Übung 4
![[Pasted image 20230904183937.png]]
> [!question]- Nutzen Sie `sechseck()` und machen Sie eine Blume 🌺 aus 10 gleichmässig rotierten Sechsecken.
> 
> ```python
> def sechseck():
> 	for i in range(6):
> 		eva.forward(50)
> 		eva.right(360/6)
> 
> for i in range(10):
> 	sechseck()
> 	eva.right(360/10)
> ```
### Übung 5
![[Pasted image 20230904184720.png]]
> [!question]- Verändern Sie die Funktion zu einer Funktion `xeck(ecken)`, bei der man die Anzahl Ecken der Figur als Argument übergeben kann. Machen Sie dann ein Dreieck, ein Viereck und ein Siebeneck.
> 
> ```python
> def xeck(ecken):
> 	for i in range(ecken):
> 		eva.forward(50)
> 		eva.right(360/ecken)
> 
> xeck(3)
> xeck(4)
> xeck(7)
> ```

### Übung 6

Für folgende Aufgabe müssen Sie wissen, wie man [[ginf-b01l06-verschachteltfor#Variabeln während den Wiederholungen verändern|Variabeln während einer Wiederholungsschleife verändert]].

![[Pasted image 20230904190230.png]]
> [!question]- Nutzen Sie Ihre Funktion `xeck(ecken)` und schreiben Sie eine **Wiederholungsschleife**, die alle Figuren von einem Dreieck bis zu einem Zwölfeck zeichnet.
> 
> ```python
> def xeck(ecken):
> 	for i in range(ecken):
> 		eva.forward(50)
> 		eva.right(360/ecken)
> 
> figur = 3
> 
> for i in range(10):
> 	xeck(figur)
> 	figur = figur + 1
> ```` 


> [!note] Eintrag ins Theorieheft
> 
> ## Theorie: Funktionen in Python
> 
> **Funktionen** sind Teilprogramme, die eine bestimmte Aufgabe erfüllen. Man muss eine Funktion:
> 
> - Mit **`def` zuerst definieren** – der Funktion also einen <span style={{backgroundColor: "#12C2FF", color: "black", padding:"2px", borderRadius:"3px"}}>Namen</span> geben und bestimmen, was sie tut (Linie 1 - 4).
> - Die Funktion **ausführen** – der Computer findet die Funktion im Speicher anhand ihres <span style={{backgroundColor: "#12C2FF", color: "black", padding:"2px", borderRadius:"3px"}}>Namens</span> (Linie 5). 
> 
> ![[Pasted image 20230904194355.png]]
> 
> Manchmal möchten wir einer Funktion **Informationen übergeben**. Hier wird beispielsweise der Wert <span style={{backgroundColor: "#15FF74", color: "black", padding:"2px", borderRadius:"3px"}}>6</span> als **Argument** der Funktion übergeben und in das **Parameter** <span style={{backgroundColor: "#15FF74", color: "black", padding:"2px", borderRadius:"3px"}}>ecken</span> der Funktion abgefüllt.
> ![[Pasted image 20230904194406.png]]
> Wichtig: Parameter (<span style={{backgroundColor: "#15FF74", color: "black", padding:"2px", borderRadius:"3px"}}>ecken</span>) werden bei jeder Ausführung **temporär** kreiert und wieder zerstört!


[[ginf-b01l07-funktionen|Zurück zu L07]]
[[ginf-b01l0910-for2|Weiter zu L09]]


