---
title: Aufgaben für die Prüfungsvorbereitung
display: hidden
---

## Bemerkungen zum Prüfungsumfang

Es gelten die Lernziele der behandelten Lektionen, sofern hier nichts anderes angegeben ist.

[[01-datainfo|Theorieteil über Daten, Kodierung und Information]]
- Achtung: Simple Datentypen & Semantikfehler haben wir kurz behandelt, unbedingt nochmal anschauen! Von den simplen Datentypen müssen Sie einfach die Namen kennen.

[[02-barcode|Kapitel über Barcodes]]
- Berechnung der Prüfziffer kommt nicht, aber Sie sollten wissen, wozu die Prüfziffer da ist (Fehlererkennung).

[[03-hex|Kapitel zum hexadezimalen Zahlensystem]]

[[04-qrcode|Kapitel über QR-Codes und Buchstaben]]
- ACHTUNG: Die Vorlage des QR-Codes, die Sie erhalten werden, enthält keine Hilfsmuster!

[[05-farben|Kapitel über das RGB-Farbmodell]]

[[06-bilder|Kapitel über Bilder (Rastergrafiken & Vektorgrafiken)]]

[[08-welchesformat|Kapitel, wann welches Grafikformat Sinn macht]]
- Wir haben den Inhalt anders abgedeckt, aber die Inhalte auf Informatikgarten zu Kameras und Schriftarten haben wir *nicht* angeschaut und sie sind nicht Teil der Prüfung.

## Syntax und Semantik

### Beispiele für Theoriefragen

Behauptung: "Kodierung" definiert, wie bestehende Informationen dargestellt werden (z.B. kursiv, fett, unterstrichen)

Ist das wahr oder falsch? Begründen Sie Ihre Antwort!

> [!solution]- Lösung
> 
> Falsch. Die Kodierung definiert die **Interpretationsregeln**, die man auf Rohdaten anwenden muss, um ihre Informationen überhaupt zu verstehen. Wir haben uns gemerkt: Rohdaten + Kodierung = Information

Wieso verwendet die Informatik oft das Binärsystem?
	a. Es rechnet sich gut ins Hexadezimalsystem um.
	b. Die technische Grundlage der Speicher und Prozessoren ist binär.
	c. Informatikerinnen und Informatiker haben Freude am Umformen.

> [!solution]- Lösung
> 
> b: Technisch hat es sich als die beste Lösung erwiesen, Bits zu konstruieren, die einfach zwei Zustände haben - also 0 oder 1.

### Fehler finden

Im folgenden Programm ist je ein Syntax- und ein Semantikfehler versteckt. Markieren Sie beide und erklären Sie:

```python
print("Hallo, schön bereiten Sie sich auf die Prüfung vor. In diesem Programm bilden wir die Summe von zwei Zahlen.)

a = "5"
b = "7"
ergebnis = a + b

print("Das Ergebnis ist", ergebnis)
```

> [!solution]- Lösung
> 
> - **Syntaxfehler**: Auf Linie 1 fehlt das Anführungszeichen am Ende.
> - **Semantikfehler**: Das Programm würde keine Summe bilden, weil "5" und "7" Strings sind. Es würde einfach die Symbole aneinanderhängen, also "57".

## Zahlensysteme umrechnen
1. Schreiben Sie 2C4<sub>16</sub> als Dezimalzahl. 
2. Notieren Sie dieses Byte hexadezimal: 0111'1100<sub>2</sub>

> [!solution]- Lösungen mit Erklärungen
> 
> 1.) 708<sub>10</sub>
> 
> ![[explainer-2C4-hex.mp4]]
> 
> 2.) 7C<sub>16</sub>
> 
> ![[explainer-bin-to-hex.mp4]]

## Barcodes

### Ein Rätsel aus dem Alltag

Unglücklicher Mann: "Ich war gestern beim Self-Checkout im Coop und als ich meine Zweifel-Chips scannen wollte, wurde einfach ein Glas Gurken von Chirat verrechnet. Wahrscheinlich hat sich der Scanner verlesen - blöde Technik! Und meine Frau fand das Ganze auch noch lustig und hat ständig gekichert!"

Wie wahrscheinlich ist die Erklärung des Mannes? Haben Sie eine Idee für eine alternative Erklärung?

> [!solution]- Lösung
> 
> Die Erklärung ist sehr unwahrscheinlich. Zwei Gründe: 
> - Wegen der **Prüfziffer** kann man recht sicher sein, dass ein Barcode korrekt gelesen wurde. 
> - Auch hat **jedes Produkt weltweit einen eigenen Barcode**: Dass per Zufall ein Produkt im gleichen Laden von einem anderen Hersteller getroffen würde, ist ebenfalls sehr unwahrscheinlich.
> 
> Eine sehr viel wahrscheinlichere Erklärung ist, dass irgendjemand den Barcode überklebt hat und sich einen Scherz erlaubt.

### Barcode formen

Schreiben Sie einen kompletten EAN-13 Barcode in 0 (weiss) und 1 (schwarz). Trennen Sie dabei die Kodierung der einzelnen Ziffern mit Bindestrichen ("-"), z.B. `0001101-0011001-1100110`

```text
8 517935 713780
```

![[10-vorbereitung-nohex-2025-03-21-06.56.20.excalidraw]]

> [!solution]- Lösung
> 
> ```text
> 517935 713780
> LGLGGL RRRRRR
> 
> 0110001-0110011-0111011-0010111-0100001-0110001-
> 1000100-1100110-1000010-1000100-1001000-1110010
> ```

## QR-Codes


![[ascii-table.excalidraw]]
### QR-Code bilden

Füllen Sie in folgenden Barcode die Nachricht ein: "F1e rules!"

Geben Sie zunächst an, welche Dezimalzahlen Sie in die *vollen* Bytes schreiben wollen.

Dann füllen Sie den Barcode aus.

(Keine Sorge: Eine so lange Nachricht müssen Sie an der Prüfung nicht abfüllen, aber zum Üben ist es hoffentlich hilfreich.)

![[qr-template-plain.excalidraw.light.svg]]

> [!solution]- Lösung
> ```text
> Länge -> 10
> F -> 70
> 1 -> 49
> e -> 101
> [space] -> 32
> r -> 114
> u -> 117
> l -> 108
> e -> 101
> s -> 115
> ! -> 33
> ```
> ![[qrcode-f1e-solution.excalidraw.light.svg]]

## Farben und Bilder

### Farben mischen

Behauptung: 3 Bit Farbtiefe pro Kanal bedeutet, 111<sub>2</sub> also 7<sub>10</sub> ist die höchste Zahl pro Kanal, also kann man 7<sup>3</sup> = 343 Farben mischen.

Ist das wahr oder falsch? Begründen Sie Ihre Antwort!

> [!solution]- Lösung mit Erklärung
> 
> Das ist falsch. Bei 3 Bit Farbtiefe ist 111<sub>2</sub> oder 7<sub>10</sub> zwar die höchste Zahl, aber mit 0 dazugezählt hat jeder Farbkanal 8 Zustände. Das heisst, man kann 8<sup>3</sup> = 512 Farben mischen.
> 
> ![[explainer-colordepth-claim.mp4]]
> 

### Unkomprimierte Datenmenge

Wie viele Megabyte Speicherplatz bräuchten Sie für ein RGB-Bild von 1800px Breite und 1200px Höhe mit 8 Bit Farbtiefe pro Kanal, wenn Sie es nicht komprimieren würden?

> [!solution]- Lösung mit Erklärung
> 
> $$ 1800 \times 1200 \times 8\text{" Bit Farbtiefe pro Kanal"}$$
> $$ 1800 \times 1200 \times 1\text{" Byte Farbtiefe pro Kanal"}$$
> $$ 1800 \times 1200 \times 3\text{" Byte Farbtiefe"}$$
> $$ 6'480'000\text{" Byte"}$$
> $$ \approx6,48 \text{" Megabyte"}$$
> 
> ![[explainer-datenmenge-bild.mp4]]

### Vergrösserung von Bildern

WEin Vektorbild wird aktuell auf Ihrem Handy mit einer Bildschirmauflösung von 2532px \* 1170px angezeigt. Nun möchten Sie das gleiche Bild auf ein 25 Meter \* 10 Meter Poster an die Fassade eines Kinos drucken. Bei einer typischen Druckauflösung von 150dpi gibt das ein Bild von ungefähr 147638 \* 59055 Pixel ! Was passiert ungefähr mit der Datenmenge? Begründen Sie Ihre Antwort.

> [!solution]- Lösung
> 
> Die Datenmenge bleibt gleich, weil sich Vektorgrafiken stufenlos ohne Qualitätsverlust skalieren lassen.

### Wannabe-Webdesigner

Sie erhalten ein unvollendetes Projekt von einem möchtegern-coolen Webdesigner übergeben, der seine Farben immer binär aufschreibt, weil in seinem Kopf alle andern sowieso keine Ahnung haben. Sie als professionelle Webdesigner rechnen sich das natürlich sofort ins Hexadezimalsystem um und notieren das mit der gängigen Form #RRGGBB.

| Element | Farbe | Hexadezimal |
| --- | --- | --- |
| Hintergrund | 0010'1100 0010'1100 0010'1100 | # |
| Schrift | 1110'1100 1110'1100 1110'1100 | # |
| Akzent | 0000'0000 1000'0000 1101'1001 | # |


> [!solution]- Lösung mit Erklärung
> 
> Hintergrund: `#2C2C2C`
> Schrift: `#ECECEC`
> Akzent: `#0080D9`
> 
> ![[explainer-webdesigner-bin-hex.mp4]]

## Kameras und Schriftarten

### Beschriften Sie Raster- und Vektorgrafiken

In diesem Bildausschnitt eines PDFs, beschriften und begründen Sie, welche Elemente auf Rastergrafiken basieren und welche auf Vektorgrafiken.

![[Pasted-image-20231210130329.png]]

> [!solution]- Lösung
> 
> - Die Buchstaben des Texts sind Vektorgrafiken.
> - Das Smiley ist gestochen scharf. Es könnte zwar eine Rastergrafik mit sehr hoher Auflösung sein, aber wahrscheinlich ist es eine Vektorgrafik.
> - Das verpixelte Bild links unten ist ganz offensichtlich eine Rastergrafik.

### Benennen Sie

1. Wie heissen die zwei markierten Arme?
2. Der Pfad als Ganzes ist eine Kurve mit einem bestimmten Namen, wie heisst sie?

![[Pasted-image-20231210131111.png]]


> [!solution]- Lösung
> 
> Der Pfad ist eine **Bézier-Kurve**, benannt nach dem französischen Renault-Autoingenieur Pierre Bézier. Die Kontrollpunkte von Bézierkurven werden in Vektorgrafikprogrammen als Pfadpunkte (z.B. Nr. 4) mit **Handles** ("Griffen") (die markierten Punkte) angezeigt.
