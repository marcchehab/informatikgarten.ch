---
title: "L11+12: Aufgaben für die Prüfungsvorbereitung"
---
> [!success]  Die gesammelten Lernziele für diese Prüfung
> 
> - Sie verstehen den Unterschied zwischen **Daten, Semantik und Informationen**.
> - Sie können einen **Semantikfehler** von einem **Syntaxfehler** unterscheiden.
> - Sie können **Binärzahlen und Hexadezimalzahlen** in Dezimalzahlen umrechnen mit der Summenschreibweise.
> - Sie können Dezimalzahlen ins Binärsystem oder ins Hexadezimalsystem umwandeln mit der Divisionsmethode, oder dem Zerlegen in Potenzen.
> - Sie können Binärzahlen und Hexadezimalzahlen in **4-Bit-Paketen** ineinander umwandeln.
> - Sie wissen, wie das **RGB-Farbmodell** funktioniert.
> - Sie wissen, was beispielsweise 3-Bit-Farbtiefe pro Kanal bedeutet und **wie viele Farben** man daraus **mischen** könnte.
> - Sie können berechnen, wie viel **Speicherplatz** für ein unkomprimiertes RGB-Bild mit einer gewissen Auflösung und Farbtiefe nötig wäre.
> - Sie wissen, wie sich die Berechnung der Datenmenge verändert, je nachdem ob Sie ein RGB-Bild oder eine **Graustufen-Bild** haben.
> - Sie können die Prinzipien einer **Rastergrafik** und einer **Vektorgrafik** voneinander unterscheiden.
> - Sie können erklären, wieso **Bildsensoren** eine Schicht aus Farbfilter haben und was das **Bayer-Muster** ist.
> - Sie können erläutern, was **Schriftarten** mit Vektorgrafiken zu tun haben.
> - Sie verstehen die Begriffe **Pfadpunkt** und **Handler** bei **Bézier-Kurven** in Vektorgrafik-Programmen.

## Syntax und Semantik

## Beispiel für Theoriefrage

Behauptung: Semantik ist die Formatierung der Informationen (z.B. kursiv, fett)

Ist das wahr oder falsch? Begründen Sie Ihre Antwort!


> [!question]- Lösung
> 
> Falsch. Semantik beschreibt die **Interpretationsregeln** die man auf Rohdaten anwenden muss, um ihre Informationen zu verstehen. Wir haben uns gemerkt: Daten + Semantik = Information

### Fehler finden

Im folgenden Programm ist je ein Syntax- und ein Semantikfehler versteckt. Markieren Sie beide und erklären Sie:

```python
import turtle
eva = turtle.Turtle()

def dreieck():
	for i in range(4)
		eva.forward(50)
		eva.right(90)

eingabe = input("Geben Sie die Anzahl Ecken ein, die Sie möchten")

if eingabe == "3":
	dreieck()
```


> [!question]- Lösung
> 
> - **Syntaxfehler**: Auf Linie 5 fehlt ein Doppelpunkt am Ende.
> - **Semantikfehler**: Auch wenn die User drei Ecken fordern und offensichtlich ein Dreieck beabsichtigt ist, wird tatsächlich ein Quadrat gezeichnet.

## Zahlensysteme, Bits und Bytes

### Beispiel für Theoriefrage

Wieso verwendet die Informatik oft das Binärsystem?
	a. Es rechnet sich gut ins Hexadezimalsystem um.
	b. Die technische Grundlage der Speicher und Prozessoren ist binär.
	c. Informatikerinnen und Informatiker haben Freude am Umformen.


> [!question]- Lösung
> 
> b: Technisch hat es sich als die beste Lösung erwiesen, Bits zu konstruieren, die einfach zwei Zustände haben - also 0 oder 1.

### Umrechnen
1. Rechnen Sie 245<sub>10</sub> ins Binärsystem um, indem Sie die Zahl in Potenzen zerlegen
2. Schreiben Sie 1101'0011 0010'1111<sub>2</sub> als Dezimalzahl. (Schreiben Sie den Zwischenschritt mit der Summenschreibweise auf!)
3. Schreiben Sie 2C4<sub>16</sub> als Dezimalzahl. (Schreiben Sie den Zwischenschritt mit der Summenschreibweise auf!)
4. Notieren Sie dieses Byte hexadezimal: 0111'1100<sub>2</sub>


> [!question]- Lösungen mit Erklärungen
> 
> 1.) 1111'0101<sub>2</sub>
> <video controls width="100%"><source src="https://v.nostr.build/OPAY.mp4" type="video/mp4" /></video>
> Falls Sie gern nochmal eine grundsätzlichere Erklärung hätten, ich glaube mir ist die Erklärung zur gleichen Aufgabe hier relativ gut gelungen.
> <video controls width="100%"><source src="https://v.nostr.build/vaW7.mp4" type="video/mp4" /></video>
> 2.) 54063<sub>10</sub>
> <video controls width="100%"><source src="https://v.nostr.build/Y27x.mp4" type="video/mp4" /></video>
> 
> 3.) 708<sub>10</sub>
> <video controls width="100%"><source src="https://v.nostr.build/xa67.mp4" type="video/mp4" /></video>
> 
> 4.) 7C<sub>16</sub>
> <video controls width="100%"><source src="https://v.nostr.build/a9eZ.mp4" type="video/mp4" /></video>

## Farben und Bilder

### Farben mischen

Behauptung: 3 Bit Farbtiefe pro Kanal bedeutet, 111<sub>2</sub> also 7<sub>10</sub> ist die höchste Zahl pro Kanal, also kann man 7<sup>3</sup> = 343 Farben mischen.

Ist das wahr oder falsch? Begründen Sie Ihre Antwort!


> [!question]- Lösung mit Erklärung
> 
> Das ist falsch. Bei 3 Bit Farbtiefe ist 111<sub>2</sub> oder 7<sub>10</sub> zwar die höchste Zahl, aber mit 0 dazugezählt hat jeder Farbkanal 8 Zustände. Das heisst, man kann 8<sup>3</sup> = 512 Farben mischen.
> 
> <video controls width="100%"><source src="https://v.nostr.build/lazn.mp4" type="video/mp4" /></video>> 
> 

### Unkomprimierte Datenmenge

Wie viele Megabyte Speicherplatz bräuchten Sie für ein RGB-Bild von 1800px Breite und 1200px Höhe mit 8 Bit Farbtiefe pro Kanal, wenn Sie es nicht komprimieren würden?


> [!question]- Lösung mit Erklärung
> 
> $$ 1800 \times 1200 \times 8\text{ Bit Farbtiefe pro Kanal}$$
> $$ 1800 \times 1200 \times 1\text{ Byte Farbtiefe pro Kanal}$$
> $$ 1800 \times 1200 \times 3\text{ Byte Farbtiefe}$$
> $$ 6'480'000\text{ Byte}$$
> $$ \approx6,48 \text{ Megabyte}$$
> 
> <video controls width="100%"><source src="https://v.nostr.build/8wlE.mp4" type="video/mp4" /></video>
> 

### Vergrösserung von Bildern

Ein Vektorbild wird aktuell auf Ihrem Handy mit einer Bildschirmauflösung von 2532px \* 1170px angezeigt. Nun möchten Sie das gleiche Bild auf ein 25 Meter \* 10 Meter Poster an die Fassade eines Kinos drucken. Bei einer typischen Druckauflösung von 150dpi gibt das ein Bild von ungefähr 147638 \* 59055 Pixel ! Was passiert ungefähr mit der Datenmenge? Begründen Sie Ihre Antwort.


> [!question]- Lösung
> 
> Die Datenmenge bleibt gleich, weil sich Vektorgrafiken stufenlos ohne Qualitätsverlust skalieren lassen.

### Wannabe-Webdesigner

Sie erhalten ein unvollendetes Projekt von einem möchtegern-coolen Webdesigner übergeben, der seine Farben immer binär aufschreibt, weil in seinem Kopf alle andern sowieso keine Ahnung haben. Sie als professionelle Webdesigner rechnen sich das natürlich sofort ins Hexadezimalsystem um.

| Element | Farbe | Hexadezimal |
| --- | --- | --- |
| Hintergrund | 0010'1100 0010'1100 0010'1100 | # |
| Schrift | 1110'1100 1110'1100 1110'1100 | # |
| Akzent | 0000'0000 1000'0000 1101'1001 | # |


> [!question]- Lösung mit Erklärung
> 
> Hintergrund: `#2C2C2C`
> Schrift: `#ECECEC`
> Akzent: `#0080D9`
> 
> <video controls width="100%"><source src="https://v.nostr.build/PWnn.mp4" type="video/mp4" /></video>

### Semantik finden

*Diese Aufgabe ist mir ein bisschen zu kreativ geraten.*

Die Polizei braucht Ihre Hilfe! Ein Meister-Dieb hat folgende kryptische Nachricht hinterlassen, bei der an der entscheidenden Stellen Binärzahlen ohne Semantik angegeben sind. Können Sie weiterhelfen?

*Ha ha! Ihr kommt mir nie auf die Schliche! Ich sag Euch sogar, was ich als Nächstes stehle:     1011   110    Edelsteine!*

Was möchte der Meister-Dieb stehlen? Erklären Sie Ihre Antwort!

![[Pasted image 20231210113619.png]]


> [!question]- Lösung
> 
> - **1011** kann man als Binärzahl interpretieren, dann wären es **11**<sub>10</sub>.
> - **110** kann man als RGB-Farbe mit 1 Bit Farbtiefe pro Kanal interpretieren. Das wäre also ein Gemisch aus Rot und Grün, also **Gelb**.


## Kameras und Schriftarten

### Beschriften Sie Raster- und Vektorgrafiken

In diesem Bildausschnitt eines PDFs, beschriften und begründen Sie, welche Elemente auf Rastergrafiken basieren und welche auf Vektorgrafiken.

![[Pasted image 20231210130329.png]]

> [!question]- Lösung
> 
> - Die Buchstaben des Texts sind Vektorgrafiken.
> - Das Smiley ist gestochen scharf. Es könnte zwar eine Rastergrafik mit sehr hoher Auflösung sein, aber wahrscheinlich ist es eine Vektorgrafik.
> - Das verpixelte Bild links unten ist ganz offensichtlich eine Rastergrafik.

### Benennen Sie

1. Wie heissen die zwei markierten Arme?
2. Der Pfad als Ganzes ist eine Kurve mit einem bestimmten Namen, wie heisst sie?

![[Pasted image 20231210131111.png]]


> [!question]- Lösung
> 
> Der Pfad ist eine **Bézier-Kurve**, benannt nach dem französischen Renault-Autoingenieur Pierre Bézier. Die Kontrollpunkte von Bézierkurven werden in Vektorgrafikprogrammen als Pfadpunkte (z.B. Nr. 4) mit **Handles** ("Griffen") (die markierten Punkte) angezeigt.
