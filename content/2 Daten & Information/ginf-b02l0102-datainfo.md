---
title: "L01+L02: Semantik, Daten, Informationen"
---
Sie können nun ein bisschen programmieren - Glückwunsch! In diesem Block werden wir Programmieren weiterhin gebrauchen, um die digitale Welt besser zu verstehen. Dabei dreht sich dieser Block um die Frage: **Wie werden aus 0 und 1 unsere Informationen?**


> [!success]  Lernziele
> 
> - Sie verstehen den Unterschied zwischen **Daten, Semantik und Informationen**.
> - Sie können einen **Semantikfehler** von einem **Syntaxfehler** unterscheiden.
> - Sie verstehen die Inhalte des Theorieeintrags.

## Was ist Semantik?

Was ist komisch an folgendem Satz?

*Farblose grüne Ideen schlafen zornig.*

Das ist ein berühmter Satz aus der Linguistik, der zeigen soll: Ein Satz kann **grammatikalisch völlig einwandfrei** sein und trotzdem vom Inhalt her **keinen Sinn ergeben**. Diese Ebene der Bedeutung und des Inhalts nennen wir **Semantik**.

Man kann das direkt aufs Programmieren beziehen. Überlegen Sie sich, was ist falsch an diesem Programm?

```turtle
zahl1 = 48
zahl2 = 2
summe = zahl1 / zahl2

print("Die Summe ist:", summe)
```

Das Programm ist vom Syntax her völlig in Ordnung und es läuft einwandfrei. **Der Fehler ist semantisch**: Die Bedeutung "Summe" und das Ergebnis haben nichts miteinander zu tun!

Mit Semantik ist also die Ebene des Inhalts und der Bedeutung gemeint. Ein semantischer Fehler ist ein inhaltlicher Fehler und kein formeller, syntaktischer oder grammatikalischer Fehler.
## Daten und Informationen

Schauen wir uns damit zwei Grundbegriffe an:
- **Daten** = Zeichen, Symbole, Signale, und "rohe" Fakten.
- **Informationen** = Daten + Semantik

Daten also erhalten erst dadurch eine Bedeutung, wenn klar ist, wie sie interpretiert werden müssen. Eben das ist gemeint mit Semantik. Daten ohne Semantik sind einfach nur Nullen und Einsen.

Dazu folgendes Beispiel: Überlegen Sie sich, was Sie hier sehen. Was sind daran Daten, was Informationen?

![[Pasted image 20231105144113.png|invert]]

Es ist nicht so, als hätten sich das irgendwer ausgedacht, um uns zu quälen. Dass man Rohdaten irgendwie interpretieren *muss*, dass daraus Informationen werden, ist ein reales Problem.

> [!question]- Lösung
> 
> Die **Rohdaten**, die Sie hier sehen, haben keine Bedeutung. Es ist einfach ein Rechteck oder eine gerade Linie, und eine gekrümmte Linie.
> 
> Eine **Information** wird daraus erst, wenn Sie wissen, wie Sie die Daten interpretieren sollen. Ist es semantisch eine Zahl oder ein Buchstabe? Je nachdem ist die Bedeutung ganz anders!
> 
> ![[Pasted image 20231105145319.png]]

### Dateiendungen

Wenn Sie Informationen abspeichern, müssen Sie also auch abspeichern, wie diese Daten interpretiert werden müssen. Sie kennen das sicher von **Dateiendungen** (oder "Dateierweiterungen", oder "Suffixe") auf Ihrem Computer.

Wieso weiss der Computer, dass eine Datei ein Word-Dokument ist? Weil die Datei mit ".docx" endet, also z.B. "maturarbeit.docx". Hätten die Datei keine Dateiendung, wären sie schön aufgeschmissen!


> [!info] Bei mir sehe ich keine Dateiendungen!
> 
> Wenn Sie keine Dateiendungen sehen, aber Ihr Computer die Dateien trotzdem richtig öffnet, heisst das, die Endungen sind da, aber Ihr Computer blendet sie aus (weil Sie ja am Icon ansehen, was für eine Datei es ist).
> 
> Hier lesen Sie, wie Sie auf [Windows](https://support.microsoft.com/de-de/windows/allgemeine-dateierweiterungen-in-windows-da4a4430-8e76-89c5-59f7-1cdbbc75cb01#:~:text=Geben%20Sie%20im%20Suchfeld%20auf,%2D%2FAusblenden%20das%20Kontrollk%C3%A4stchen%20Dateinamenerweiterungen.) und [OSX](https://support.apple.com/de-ch/guide/mac-help/mchlp2304/mac) die Dateiendungen anzeigen können.


Man spricht hier vom **Dateiformat**, das festlegt, wie die Daten in der Datei interpretiert werden müssen. Die Dateiendung signalisiert dem Computer das Dateiformat.

Versuchen wir das mal. [[ginf-b02l0102-rohdaten|Laden Sie sich diese Datei ohne Dateiendung herunter]]. 

Ihr Betriebssystem versucht Ihnen eventuell zu helfen und macht daraus eine "**.zip"-Datei, doch das stimmt nicht**!

Öffnen Sie diese im **Texteditor**. Sie werden so etwas sehen:

![[Pasted image 20231105164519.png]]

Versuchen Sie mal herauszufinden, wie Sie die Informationen in der Datei anzeigen können!

> [!question]- Lösung
> 
> Es ist eine Word-Datei. Öffnen Sie sie direkt in Word oder fügen Sie die Dateiendung ".docx" am Ende des Dateinamens hinzu.

### Variabeltypen

Dieselbe Problematik haben wir bereits im Programmieren angetroffen. Schauen Sie sich folgendes Beispiel an:

```turtle
zahl1 = 14
zahl2 = 3
print("Die erste Summe ist", zahl1 + zahl2)

zahl1 = "14"
zahl2 = "3"
print("Die zweite Summe ist", zahl1 + zahl2)
```

> [!question]- Spielen Sie mit den Werten der Variabeln und versuchen Sie, eine gute Erklärung für die Ergebnisse zu finden!
> 
> Im ersten Beispiel sind zahl1 und zahl2 als **Ganzzahlen (Integers)** definiert. Die Addition ergibt daher eine mathematische Summe: 14 + 3 = 17.
> 
> Im zweiten Beispiel sind zahl1 und zahl2 als **Zeichenketten (Strings)** definiert. Die Addition führt hier zu einer Verkettung der Zeichen: "14" + "3" = "143".
> 
> Es kommt also darauf an, als was für eine Art von Daten man die Werte interpretiert. Beim Programmieren nennt man das den **Typ der Variabel**: 
> - Ganzzahlen sind **Integer**.
> - Zeichenketten sind **Strings**.
> - Fliesskommazahlen sind **Floats**.
> - Wahr oder unwahr sind **Bools**.


> [!NOTE] Theorieeintrag
> 
> ## Theorie: Semantik, Daten, Informationen
> 
> Daten erhalten erst eine Bedeutung, wenn klar ist, wie sie interpretiert werden müssen. Diese **Interpretationsregeln** werden in der Informatik **Semantik** genannt. 
> 
> Dazu folgendes Bild:
> ![[Pasted image 20231105144113.png|invert]]
> 
> - **Daten** sind die sinnlosen Rohdaten: Welche Punkte sind schwarz, welche weiss?
> - **Semantik** ist, wenn uns jemand sagt: "Interpretiere diese Daten als Buchstaben"
> - **Informationen** = Daten + Semantik. Erst Daten und Semantik zusammen ergeben die Information "Aha, das ist ein B".
> 
> ## Theorie: Semantikfehler
> 
> Ein Programm kann syntaktisch völlig in Ordnung sein, aber trotzdem vom Sinn her fehlerhaft. Ein einfaches Beispiel: Das ist keine Summe.
> ```python
> summe = 12 / 3
> print("Die Summe ist", summe)
> ```


[Zum Index zurück](/)
[[ginf-b02l0304-zahlen-bin|Weiter zu den Zahlen]]
