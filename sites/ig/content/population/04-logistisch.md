---
title: Logistisches Wachstum
---

In diesem Experiment soll - was ziemlich realistisch ist - exponentielles und beschränktes Wachstum miteinander kombiniert werden. Wir nehmen an, dass die Zunahme proportional zum aktuellen Wolfsbestand **als auch** proportional zur Restkapazität ist. Das bedeutet mathematisch, dass sie proportional zum _Produkt_ der beiden ist.

> [!info] Unser neues Modell
> 
> Auf einer Insel leben 100 Wölfe.
> Die Ressourcen der Insel reichen für höchstens 1000 Wölfe.  
> Die Zunahme der Wölfe pro Jahr sei proportional zum aktuellen Bestand als auch proportional zur Restkapazität.

Wenn bei einem Wachstumsvorgang die Zunahme proportional zum Bestand als auch zur Restkapazität ist, spricht man von **logistischem Wachstum**.

1. Gehen Sie vom Tabellenblatt für das beschränkte Wachstum aus. Kopieren Sie das Tabellenblatt und speichern Sie es unter dem neuen Namen "04 Logistisches Wachstum" ab, damit Sie das alte Tabellenblatt nicht aus Versehen überschreiben.
![[04-logistisch.png]]
2. Nun brauchen wir die **normalisierte Restkapazität**. Das heisst, anstatt eine absolute Anzahl Wölfe zu berechnen, berechnen wir **eine Zahl zwischen 1 für eine leere Insel mit 100% Restkapazität und 0 für eine total volle Insel mit 0% Restkapazität**. So können wir das Wachstum mit diesem normalisierten Faktor multiplizieren und das Wachstum dämpfen, je nachdem, wie viel Platz es auf der Insel noch gibt. Fügen Sie eine **neue Spalte zwischen den Spalten B und C** hinzu, die wir "**Restkapazitätsfaktor**" nennen, und lösen Sie folgende Aufgabe:

> [!exercise] Aufgabe
> 
> Versuchen Sie eine Formel zu entwickeln, die Ihnen diesen Restkapazitätsfaktor ausrechnet. Einige Beispiele, was der Restkapazitätsfaktor wäre, auf einer Insel mit Platz für 1000 Wölfe:
> - Am Anfang leben 100 Wölfe auf einer Insel mit Platz für 1000. Die Restkapazität ist 0.9 (90%).
> - Bei 0 Wölfen wäre die Restkapazität 1 (100%).
> - Bei 700 Wölfen wäre die Restkapazität 0.3 (30%).
> - Bei 990 Wölfen wäre die Restkapazität 0.01 (1%). 

> [!solution]- Lösung
>
> Sie teilen die Differenz zwischen der Kapazität der Insel und der aktuellen Anzahl der Wölfe durch die Kapazität der Insel.
>
> $$\text{Restkapazität in \%} = \frac{\text{Kapazität der Insel} - \text{Wölfe zu Beginn}}{\text{Kapazität der Insel}}$$
> 
> Äquivalent, aber vielleicht etwas eleganter:
> 
> $$
> \text{Restkapazität in \%} = 1 - \frac{\text{Wölfe zu Beginn}}{\text{Kapazität der Insel}}
> $$
>
> *Hinweis: **Rechnen Sie nicht manuell Prozentwerte aus, indem Sie mit 100 multiplizieren!** Das ist mathematisch nicht korrekt, weil $0.3 = 30\%$. In einem Tabellenkalkulationsprogramm sollten Sie dies **unbedingt mit der Formatierung der Zelle** lösen und nicht die Formel verfälschen!*

3. Nun ändern wir die Formel für die **Zunahme** (neu in Spalte D).
	$$
	\text{Zunahme} = \text{Wölfe zu Beginn} \times \text{Wachstumsrate} \times \text{Restkapazitätsfaktor}
	$$
	Erstellen Sie die Formel so, dass Sie sie später einfach auf den Rest der Spalte übertragen können.
4. Wie sieht die logistische Wachstumskurve aus? Erklären Sie sich dieses Aussehen anhand der Werte, die in den Spalten stehen.
5. Spielen Sie mit der Wachstumsrate und der Kapazität. Was bewirkt diese Veränderung?

