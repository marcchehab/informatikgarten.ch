---
title: "L01: Einführung ins algorithmische Denken mit Pseudocode"
slug: b01l01-pseudocode
---

> [!info] Notiz für Lehrer
> 
> Übungen verteilen und machen wir jeweils in OneNote. Sie finden alles [in diesem Notizbuch](https://kswe-my.sharepoint.com/:o:/g/personal/cha_kswe_ch/EoV9M1uM6bdBuBRAetwQGdgB4LmAyYwvPxW6xpmzYIY3SQ?e=V2Q19j).
> 
> Beginnen Sie mit [[1 Programmieren & Algorithmen/index|diesem Intro]], um zu zeigen, wie **extrem schnell** moderne Computer sind. 
> 
> Dann Frage: Wie haben es Informatiker nur geschaft, eine solche Maschine zu bauen? Indem sie **grosse Probleme in kleine Probleme aufgeteilt haben**. Genau das nutzen wir auch beim Programmieren.
> 
> **Übergang zu Algorithmen**: Grosses Problem in kleine Schritte zerlegen. Wird auch bei Kochrezepten, Möbelbauen und Lego so gemacht. Man muss nur Einzelschritte können, Ergebnis entsteht von alleine.

Der Begriff Algorithmus umfasst eine breite Spanne von Verfahren in der Mathematik und der Informatik. Folglich lesen sich Definitionen je nach Quelle ein wenig unterschiedlich.
## Was sind Algorithmen?

Stellen Sie sich einen **Algorithmus wie ein Kochrezept** vor. Es ist eine genaue Anleitung, die Ihnen Schritt für Schritt sagt, was Sie tun müssen, um ein bestimmtes Ergebnis oder Ziel zu erreichen. Bei einem Rezept folgen Sie den Anweisungen, um ein Gericht zu kochen. Bei einem Algorithmus folgen Sie den Anweisungen, um ein bestimmtes Problem zu lösen oder eine Aufgabe zu erledigen.

Machen wir ein Beispiel: Ein Algorithmus soll unsere Benutzer nach zwei Zahlen fragen, diese addieren, und dann das Ergebnis anzeigen. Das könnten wir so schreiben (in sogenanntem **Pseudocode**):

```
Frage User nach ersten Zahl und speichere Input in der Variable zahl1.
Frage User nach zweiten Zahl und speichere Input in der Variable zahl2.
Addiere zahl1 und zahl2 und speichere das Ergebnis in der Variable ergebnis.
Zeige die Variable ergebnis an.
```

Diesen Algorithmus kann man **in einer Programmiersprache implementieren**, z.B. hier Python:

```python
zahl1 = input("Bitte geben Sie die erste Zahl an")
zahl2 = input("Bitte geben Sie die zweite Zahl an")
ergebnis = zahl1 + zahl2
print(ergebnis)
```

In der Informatik ist ein Algorithmus also die Beschreibung eines Ablaufs, der dann in einem Programm umgesetzt werden kann. Die wichtigsten Kriterien sind:

**Eindeutigkeit**: Die Anweisungen des Algorithmus müssen klar und präzise sein. Es darf keinen Raum für Mehrdeutigkeit geben.
- Jeder **Schritt** muss so beschrieben sein, so dass er immer auf die gleiche Weise durchgeführt wird.
- Die **Schrittabfolge** muss eindeutig klar sein.

**Nicht unendlich**: 
- Die **Anzahl Schritte** im Algorithmus muss endlich sein.
- Die **Zeit**, die der Algorithmus braucht, sollte endlich sein. Anders gesagt: Der Algorithmus sollte in allen Fällen ein Ende haben.

Tragen wir also folgende Definition in unser Theorieheft ein. Merken Sie sich dabei die vier Kriterien.

> [!note] Eintrag ins Theorieheft
> 
> ## Definition "Algorithmus"
> Ein Algorithmus ist eine **eindeutige Abfolge** von **eindeutigen Schritten**, die zusammen ein Problem in einer **endlichen Anzahl Schritte** und in einem **endlichen Zeitraum** lösen.
> 
> Ein Algorithmus kann in Flussdiagrammen, Pseudocode und Programmiersprachen beschrieben werden.

## Algorithmus, Pseudocode, Code

Algorithmen können abstrakt beschrieben werden mit **Flussdiagrammen** oder Pseudocode. Wir konzentrieren uns hier auf **Pseudocode**, den wir bereits gebraucht haben. Pseudocode ist einfach eine logische Beschreibung des Algorithmus in natürlicher Sprache–wobei er bei Fortgeschrittenen durchaus sehr technisch werden kann.

Algorithmen können aber auch einer **Programmiersprache implementiert oder umgesetzt** werden. Das heisst: Auch der Programmier-Code beschreibt eigentlich einfach den Algorithmus–einfach auf eine Weise, die der Computer umsetzen kann.

> [!note] Eintrag ins Theorieheft
> 
> Ein Algorithmus kann auf mehrere Arten beschrieben werden:
> ```mermaid
> flowchart TD
> 	Algorithmus --> Flussdiagramm & Pseudocode & Code
> ```

## Mit Algorithmen zeichnen

> [!example] Jetzt sind Sie dran!
> 
> ## L01: Häuschenaufgabe
> 
> Tun Sie sich in Zweiergruppen zusammen. Eine Person kopiert sich in Onenote "L01: Häuschenaufgabe A" in Ihr Aufgabennotebook, die andere "L01: Häuschenaufgabe B". 
> 
> Setzen Sie sich so hin, dass Sie die Pixelgrafik Ihres Gegenübers nicht sehen! Versuchen Sie nun, Ihre Grafik dem Gegenüber zu beschreiben, damit sie oder er die Grafik exakt gleich zeichnet, ohne sie aber zu sehen.
> 
> Falls Sie zu viel Zeit haben, können Sie anschliessend je eine eigene Pixelgrafik zeichnen und dann erklären. Das könnte dann so aussehen.
> 
> ![[Pasted image 20230815060449.png]]

[[1 Programmieren & Algorithmen/index|Zurück zum Intro]]
[[ginf-b01l02-turtleintro|Los geht’s mit Python!]]