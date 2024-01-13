---
title: "L03+L04: Bits, Bytes, Zahlen mit nur 0 und 1"
---

> [!success]  Lernziele
> 
> *Hinweis: Wir behandeln keine Umwandlungen, die grösser als zwei Byte oder 65'535<sub>10</sub> sind.*
> 
> - Sie können Binärzahlen und Hexadezimalzahlen in Dezimalzahlen umrechnen mit der Summenschreibweise.
> - Sie können Dezimalzahlen ins Binärsystem oder ins Hexadezimalsystem umwandeln mit der Divisionsmethode, oder dem Zerlegen in Potenzen.
> - Sie verstehen die Inhalte des Theorieeintrags.

## Bit und Bytes

* Eine einzelne Stelle im Speicher kann ein einzelnes 0 oder 1 repräsentieren. Das nennen wir ein **Bit**. 
* Acht von diesen Bits zusammen ergeben ein **Byte**.

![[Pasted image 20231105171033.png|-invert]]

## Binär: Zahlen aus nur 0 und 1?

Selbst die einfachsten Zahlen sind als rohe Daten im Speicher Ihres Computers einfach 0 und 1. Man muss dem Computer dazu schon sagen, dass es sich um eine Zahl handelt und um welche *Art von Zahl* es sich handelt: Hat sie ein Vorzeichen (+ / -)? Hat sie Nachkommastellen?

Schauen wir uns zuerst Ganzzahlen ohne Vorzeichen an (auf Englisch: **unsigned Integer**).

> [!example] Wie würden Sie mit nur 0 und 1 ganze Zahlen speichern?
> 
> Tun Sie sich in Zweier- oder Dreiergruppen zusammen. Sie erhalten acht Quadrate, mit einer weissen und einer bedruckten Seite. Das sind Ihre Bits! Sie haben also **ein ganzes Byte Speicherplatz**! 👍😬👍 
> 
> (Zum Vergleich: Ihr Handy hat vermutlich 64 Gigabyte Speicherplatz, also über **64 Milliarden Bytes**.)
> 
> Wie könnten Sie damit eine Zahl speichern? Versuchen Sie eine so effiziente Lösung wie möglich herauszufinden. Was ist die grösste Zahl, die Sie speichern können?

Nun schauen wir uns in Onenote an, wie wir Binärzahlen zu Dezimalzahlen umwandeln können!

> [!hint] Üben
> 
> Ich habe Ihnen [[ginf-b02uebungen.xlsx|eine Excel-Datei erstellt]], die automatisch Dezimal- und Binärzahlen ausrechnet. Damit können Sie, so lange Sie wollen, üben.


> [!NOTE] Theorieeintrag Binär ⬅️➡️ Dezimal
> 
> Den Theorieeintrag zum Umwandeln von Binärzahlen erstellen wir zusammen in Onenote. Wir lernen:
> - Binär zu dezimal umwandeln mit der **Summenschreibweise**
> - Dezimal zu binär umwandeln mit:
> 	- Divisionsmethode
> 	- Zerlegen in Potenzen

[[ginf-b02l0102-datainfo|Zurück]]
[[ginf-b02l0506-zahlen-hex-farben|Zahlen mit Buchstaben + Bilder?]]