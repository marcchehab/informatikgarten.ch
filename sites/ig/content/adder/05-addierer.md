---
title: Wir bauen einen Addierer
---

> [!success] Lernziele
> 
> - Sie können eine logische Schaltung für einen **Halbaddierer** und einen **Addierer** mit den korrekten Symbolen zeichnen und nachvollziehen.
> - Sie können erklären, wie man grössere Zahlen mit mehreren Addierern zusammenzählen kann (**Multibit-Addierer**).

## Intuitive Annäherung

Führen Sie sich folgende binäre Addition von zwei Bits vor Augen. Achtung: Wir sind im **Binärsystem**!

![[adder-stellen.excalidraw]]

Ich habe immer zwei Stellen beim Ergebnis hingeschrieben, damit wir uns folgendes überlegen können: Was ist die Logik beider Stellen?

Überlegen Sie sich nun die Logik:
1. Wann gibt es bei den 2ern (blau) eine 1 im Ergebnis?
2. Wann gibt es bei den 1ern (grün) eine 1 im Ergebnis?
> [!solution]- Lösung
> 
> 1. Bei den 2ern gibt es eine 1, wenn A und B 1 sind.
> 2. Bei den 1ern gibt es eine 1, wenn nur A oder nur B 1 sind.

### Umsetzung

Dieser Teil wird in diesem Video erklärt.

![[aufbau-nandgame-02.mp4]]
### Halbaddierer (und wieso das nicht reicht)

Wir haben zuerst einen sogenannten Halbaddierer gebaut, der zwei Bits "A" und "B" zusammenzählt, wie oben bei der Rechnung. "Low" ist die tiefere Stelle, "high" die höhere Stelle.
![[halbaddierer.excalidraw]]
Damit können wir nur eine einzelne Stelle einer binären Zahl addieren. Für eine Addition von längeren Zahlen müssten wir **nicht zwei sondern drei Bits addieren** können. Wieso?

Schauen Sie sich dazu folgende schriftliche Addition zweier Binärzahlen an:

![[adder-schriftlich-addieren.excalidraw]]
Man könnte denken, dass man die 1er, 2er, 4er und 8er nacheinander mit dem Halbaddierer addieren kann - es sind ja jeweils zwei Bits.

| Stelle                         | Rechnung | Ergebnis |
| ------------------------------ | -------- | -------- |
| Bei den 1ern geht das:         | 1+0      | = 1      |
| Bei den 2ern auch:             | 0+1      | = 1      |
| Aber die 4ern machen Probleme! | 1+1      | = 10     |

Sie würden das als Mensch mit einem "Behalte" auf die nächste Stelle lösen. Auf Englisch wird das "Carry" genannt, deswegen schreiben wir im Folgenden "C". Überlegen wir uns also die Rechnung:

- Bei den 4ern würden Sie also 0 ins Ergebnis schreiben, aber ein Behalte 1 in die nächste Stelle - die 8er (blaue Pfeile). 
- Bei den 8er hätten Sie dann entsprechend **drei Bits, die Sie addieren müssen** (in diesem Fall drei Einsen).

![[adder-schriftlich-carry.excalidraw]]

Sie sehen: Um zwei Binärzahlen mit mehreren Stellen addieren zu können, müssen wir **pro Stelle nicht zwei sondern drei Bits addieren können**: wegen dem "Behalte" (oder auf Englisch: "Carry"). Und genau das macht der "Voll"-Addierer (oder auch einfach Addierer genannt).

### Mit Abstraktion zum Addierer

Um die Schaltung für den (Voll-)Addierer zu verstehen, schlage ich vor, dass Sie auf dem Halbaddierer aufbauen und seine Funktionsweise total ausblenden. Überlegen Sie sich **den Halbaddierer als eine Box, die zwei Inputs zusammenzählt**:
- Wenn beide Inputs 1 sind, kommt beim "high" 1 raus.
- Wenn nur einer der Inputs 1 ist, kommt beim "low" 1 raus.
- Wenn keiner der Inputs 1 ist, kommt nirgends eine 1 raus.

![[adder-full-step1.excalidraw]]
Jetzt wollen wir dazu einfach noch einen weiteren Input **C zum Ergebnis dazuaddieren**. Überlegen wir uns die Stellen wieder einzeln:
- Wenn das "h" des ersten Halbaddierers 1 ist, sind die Inputs A und B beide 1. Wir können uns also sicher sein, dass das Signal irgendwie zum "HIGH" der gesamten Schaltung muss - weil **wir haben bereits den Zahlenwert zwei**.
- Wenn beim "l" des ersten Halbaddierers 1 rauskommt, war entweder A oder B 1 und wir können das als normalen Input betrachten! Wir können **"l" mit einem zweiten Halbaddierer mit C zusammenrechnen**.

![[adder-full-step2.excalidraw]]

Überlegen wir uns die Outputs des zweiten Halbaddierers:
- Wenn das "h" beim zweiten Halbaddierer 1 ist, kam von entweder A oder B 1 und von C eine zusätzliche 1. Das Signal muss weiter zum "HIGH" der gesamten Schaltung - weil **wir haben den Zahlenwert zwei**.
- Wenn das "l" des zweiten Halbaddierers eins ist, heisst das, er hat nur eine 1 empfangen. Das muss also zum "LOW" der Schaltung.

Eine Schwierigkeit ist noch, dass entweder vom ersten **oder** vom zweiten Halbaddierer ein Signal kommen kann und beide müssen zum "HIGH" der gesamten Schaltung. Wie hängen wir das zusammen? Nun, die Logik ist bereits im Satz: mit einem **OR**-Gate.

![[adder-full-step3.excalidraw]]

Wenn Sie das nun ohne unsere abstrakten Boxen zusammenstecken wollen, müssen Sie sich überlegen, was denn nochmal in den Halbaddierern steckt. Voilà, Sie haben einen Volladdierer gebaut!
![[adder-full-step4.excalidraw]]


## Multibit-Addierer

Wir haben nun einen Addierer gebaut, der drei Inputs zusammenrechnen kann. Das heisst: Wir können nun **die schriftliche Addition von Binärzahlen automatisieren**!

Hier ein Beispiel, wie sie vier Addierer zu einem Multibit-Addierer zusammenhängen würden, um 13+5 zu rechnen.

![[adder-multibit.excalidraw]]

Hierzu habe ich einige Schablonen vorbereitet:
- **Multibit-Addierer** mit Beispielrechnung als [PDF](/adder/multibit.pdf) und [Inkscape-SVG](/adder/multibit.svg)
- **Multibit-Addierer** mit Platzhaltern als [PDF](/adder/multibit-blank.pdf) und [Inkscape-SVG](/adder/multibit-blank.svg)

Hier der Mutlibit-Addierer in Action!

![[aufbau-adder-multibit.mp4]]

