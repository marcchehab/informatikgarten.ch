Wir haben bei der [[binarysearch|binären Suche]] gesehen, dass es wesentlich einfacher (also auch schneller) geht, eine Liste zu durchsuchen, wenn sie sortiert ist. Wie sortieren wir also eine Liste effizient?

Dazu müssen wir uns zwei Gegebenheiten vor Augen halten:
1. Ein Computer hat **keinen Überblick der Liste** und sieht nicht alle Elemente auf einmal. Einen Wert einer Liste auszulesen, oder Werte zu vergleichen, sind alles **Prozessoroperationen**, die wir programmieren müssen und die Zeit benötigen.
2. Eine Liste kann Tausende oder Millionen Elemente enthalten.

Die Situation ist für Computer also so, wie wenn wir Menschen **optisch identische Büchsen dem Gewicht nach sortieren** müssten. Wir müssen sie in die Hand nehmen und einzeln vergleichen. Und die Frage ist: Wie geht das wohl am schnellsten?

![[Pasted image 20230528143949.png]]

[[index|Zum Anfang zurück]]
[[1 Programmieren & Algorithmen/Lektionsnotizen/sort-bubblesort|Bubble Sort]]