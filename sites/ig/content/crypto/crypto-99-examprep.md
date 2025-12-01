---
title: Prüfungsvorbereitung
---

> [!success] Hinweise zur Prüfung
> 
> Diese Prüfungsvorbereitung ist dazu da, dass Sie die Art der Fragestellungen abschätzen können.
> - **Stoffumfang**: bis und mit "5 asymmetrische Kryptografie" im Kapitel "Kryptologie" auf Informatikgarten. Dort finden Sie auch die Lernziele.
> - Ihre generellen **Pythonkenntnisse** werden vorausgesetzt.
> - Sie werden wieder eine **Befehlsliste**, eine **ASCII-Tabelle** und die **Verschiebungstabelle** für Vigènere (Tabula Recta) erhalten. (Python-Strukturen werden darauf nicht erklärt!)
> - Sie finden [hier](https://exam.net/student?code=5Zrb45) eine **technische Vorschau** auf Exam.net, um den Programmiereditor zu versuchen.

## Klassische Verfahren verstehen

Erklären Sie das Kerckhoffs-Prinzip in eigenen Worten.

> [!solution]- Lösung
> 
> Mögliche Antworten:
> 
> - Eine Verschlüsselungssystem sollte auch dann sicher sein, wenn alle Details des Systems, mit Ausnahme des geheimen Schlüssels, öffentlich bekannt sind.
> - Ein kryptografisches System sollte sicher bleiben, selbst wenn alle Informationen über das System, ausser dem geheimen Schlüssel, bekannt sind.
> - Die Sicherheit eines kryptografischen Systems sollte ausschliesslich auf der Geheimhaltung des Schlüssels basieren, während alle anderen Aspekte des Systems öffentlich zugänglich sein können, ohne die Sicherheit zu beeinträchtigen.

Sie erhalten eine Nachricht, die mit Caesar und dem Schlüssel 5 verschlüsselt wurde: `Anjq Jwktql!`

Was steht in der Nachricht?

> [!solution]- Lösung
> 
> `Viel Erfolg!`

Ein sehr schlechter Comedian hat seinen flachsten aller Flachwitze verschlüsselt. Aber keine Sorge: Sie wissen, wie er verschlüsselt wurde! 

Warum sind Mathebücher immer traurig? Weil sie haben viele `VVVFTQSI`.

Die Pointe wurde mit Vigènere, dem Schlüssel GEHEIM und folgender Tabula Recta verschlüsselt. Können Sie die Pointe wieder entschlüsseln?
![[crypto-01-klassisch-vigenere-tabularecta.excalidraw]]


> [!solution]- Lösung
> 
> Warum sind Mathebücher immer traurig? Weil sie haben viele `Probleme`.
> 
> Für die Entschlüsselung müssen Sie das Verfahren rückwärts durchführen. D.h. Sie nehmen den ersten Buchstaben des Schlüssels, G, und schauen in der Reihe G nach dem Buchstaben des Ciphertexts, also V. So gelanten Sie zur Spalte mit dem Klartext: P.


Was ist der Unterschied zwischen einer monoalphabetischen und einer polyalphabetischen Substitution? Kennen Sie Beispiele für Verschlüsselungsverfahren für beide?


> [!solution]- Lösung
> 
> Bei einer monoalphabetischen Substitution ersetzt einen Buchstaben im Klartext immer mit dem gleichen Ciphertext. Caesar ist ein Beispiel dafür.
> 
> Bei einer polyalphabetischen Substitution wird ein Buchstabe im Klartext je nach Position durch unterschiedliche Buchstaben im Ciphertext ersetzt. Ein Beispiel dafür ist Vigènere.


## Caesar in Python

*Hinweis: Sie können jeweils das kürzest mögliche Programm schreiben, um die Aufgabenstellung zu erfüllen. Sie müssen keine Bedingungen erfüllen, die nicht explizit gefordert werden.*

Was tun die Python-Funktionen `ord()` und `chr()`?

> [!solution]- Lösung
> 
> `ord()` gibt uns die Zahl eines Symbols, z.B. eines Buchstabens, in der ASCII/Unicode-Tabelle. `ord("A")` wird beispielsweise zur Zahl 65, was dem Buchstaben "A" in der Tabelle entspricht.
> 
> `chr()` tut das Gegenteil und macht aus einer Zahl das entsprechende Symbol in der ASCII/Unicode-Tabelle. `chr(65)` würde zu "A".

Schreiben Sie ein Python-Programm, das alle Buchstaben der Wortes "kryptografie" zusammen mit ihrem Unicode-Code einzeln ausdruckt.

> [!solution]- Lösung
> 
> ```python
> text = "kryptografie"
> 
> for buchstabe in text:
>     print(buchstabe, ord(buchstabe))
> ```

Entwickeln Sie das Programm weiter, sodass die Buchstaben um eine Stelle verschoben ausgegeben werden.

> [!solution]- Lösung
> 
> ```python
> text = "kryptografie"
> 
> for buchstabe in text:
>     position = ord(buchstabe)
>     print(chr(position + 1))
> ```

Entwickeln Sie das Programm weiter, sodass der Ciphertext als ein einzelnes Wort ausgegeben wird.

> [!solution]- Lösung
> 
> ```python
> text = "Kryptografie"
> 
> ciphertext = ""
> for buchstabe in text:
>     position = ord(buchstabe)
>     ciphertext = ciphertext + chr(position + 1)
> 
> print(ciphertext)
> ```

Stellen Sie die Verschlüsselung auf sechs Verschiebungen um. Entwickeln Sie dann Ihr Programm so weiter, dass die Kleinbuchstaben, die weiter als "z" verschoben werden, wieder bei "a" beginnen. 

Ein Beispiel: **y** > z > a > b > c > d > **e**. "y" im Klartext wird also zu "e" im Ciphertext.

> [!solution]- Lösung
> 
> ```python
> 
> text = "kryptografie"
> 
> ciphertext = ""
> for buchstabe in text:
>     position = ord(buchstabe)
>     neue_position = (position + 6 - 97) % 26 + 97
>     ciphertext = ciphertext + chr(neue_position)
> 
> print(ciphertext)
> ```

Was würden die folgenden Rechnungen in Python ergeben?

1) `15 % 6`
2) `13 % 5`
3) `33 % 11`

> [!solution]- Lösung
> 
> 1) `15 % 6 = 3`
> 2) `13 % 5 = 3`
> 3) `33 % 11 = 0`

## Vigènere in Python

*Hinweis: Sie können jeweils das kürzest mögliche Programm schreiben, um die Aufgabenstellung zu erfüllen. Sie müssen keine Bedingungen erfüllen, die nicht explizit gefordert werden.*

Schreiben Sie ein Python-Programm, das alle Buchstabenpaare der Wörter "verschluesseln" und "entschluesseln" einzeln ausdruckt. Also so:

```
v e
e n
r t
s s
c c
h h
l l
u u
e e
s s
s s
e e
l l
n n
```

Nehmen Sie nun als zwei Wörter "geheimenachricht" und "key". Entwickeln Sie das Programm weiter, dass sich "key" fortwährend wiederholt, bis alle Buchstaben von "geheimenachricht" ausgedruckt wurden.

> [!solution]- Lösung
> 
> ```python
> text1 = "geheimenachricht"
> text2 = "key"
> 
> for i in range(len(text1)):
>     print(text1[i], text2[i % len(text2)])
> ```

## Diffie-Hellman-Schlüsseltausch

Welches Problem löst der Diffie-Hellman-Schlüsseltausch?

> [!solution]- Lösung
> 
> Mit dem Diffie-Hellman-Schlüsseltausch können zwei Parteien über ein unsicheres Kommunikationsmedium, wie das Internet, einen gemeinsamen kryptografischen Schlüssel erzeugen, um damit anschliessend ihren Datenverkehr zu verschlüsseln.

Alice und Bob wollen mit Diffie-Hellman einen gemeinsamen Schlüssel generieren. Erklären Sie die Schritte des Schlüsseltauschs. Sie müssen keine Zahlenbeispiele oder Formeln verwenden. Es reicht, wenn Sie Konzepte wie öffentliche Parameter, Alices privater Schlüssel, Bobs öffentlicher Ciphertext, etc. verwenden.

> [!solution]- Lösung
> 
> Alice und Bob einigen sich auf öffentliche Parameter und wählen je einen privaten Schlüssel. Alice berechnet ihren öffentlichen Schlüssel-Ciphertext und sendet ihn an Bob, während Bob dasselbe tut und seinen öffentlichen Schlüssel-Ciphertext an Alice sendet. Beide berechnen dann den gemeinsamen geheimen Schlüssel-Ciphertext, indem sie den öffentlichen Schlüssel-Ciphertext des anderen mit ihrem eigenen privaten Schlüssel kombinieren.

Was ist das Diskrete Logarithmusproblem (DLP)? Erklären Sie, wie das eine "Einbahnstrasse" kreiert? 

> [!solution]- Lösung
> 
> Das Diskrete Logarithmusproblem besagt, dass es schwierig ist, den Exponenten $k$ zu finden, selbst wenn man die Basis $g$, den Modulo $p$ und das Ergebnis $K$ kennt.
> 
> ![[crypto-dlp.excalidraw]]
> 
> Es ist keine Art bekannt, mathematisch herzuleiten, wie oft $k$ die Zahl $g^k$ um die Uhr von $\mod{p}$ gedreht hat. Anders gesagt: Wir haben bloss den Rest der Division durch $p$ und wissen nicht, wie viele Ganze erzeugt wurden.
> 
> ![[crypto-04-diffie-hellman-dlp-clock.excalidraw]]

Die öffentliche Parameter seien $g = 2$ und $p=11$. Alice wählt den privaten Schlüssel 4, Bob wählt 5. 

Nachdem sie die öffentlichen Parameter bestummen haben, welche Zahl sendet Alice an Bob, was sendet Bob an Alice?

> [!solution]- Lösung
> 
> Alice: $2^4\mod{11} = 16\mod{11} = 5$. Alice sendet 5.
> 
> Bob: $2^5 \mod{11} = 32 \mod{11}=10$. Bob sendet 10.

## Asymmetrische Kryptografie

Was ist "asymmetrisch" an der "asymmetrischen Kryptografie".


> [!solution]- Lösung
> 
> Die Schlüssel: Es wird ein anderer Schlüssel verwendet für das verschlüsseln wie für das entschlüsseln.

Was ist ein "öffentlicher Schlüssel"? Wenn er öffentlich ist, können ja alle die Nachrichten lesen, die ich damit verschlüssle?

> [!solution]- Lösung
> 
> Nein, genau das ist der Clou an der asymmetrischen Kryptografie. 
> - Nachrichten, die mit dem öffentlichen Schlüssel verschlüsselt werden, können nur noch mit dem privaten Schlüssel entschlüsselt werden. 
> - Umgekehrt gilt auch: Nachrichten, die mit dem privaten Schlüssel verschlüsselt werden, können nur mit dem öffentlichen Schlüssel entschlüsselt werden. (Wobei natürlich die Person mit dem geheimen privaten Schlüssel auch den öffentlichen Schlüssel besitzt.)

Eine Firma kontaktiert Sie per Telefon, aber Sie sind sich unsicher, da es sich auch um Betrüger handeln könnte. Glücklicherweise hat die Firma einen öffentlichen Schlüssel auf ihrer Webseite veröffentlicht. 

Was sagen Sie der Person am Telefon? Was soll die Person tun, um ihre Identität zu beweisen?

> [!solution]- Lösung
> 
> Sie diktieren der Person eine Nachricht, die sie bitte mit dem privaten Schlüssel der Firma verschlüsseln soll. Dann soll die Person Ihnen den Ciphertext sagen.
> 
> Wenn sich der Ciphertext mit dem öffentlichen Schlüssel auf der Webeseite der Firma entschlüsseln lässt, können Sie sich sicher sein, dass die Person Zugang zum geheimen privaten Schlüssel der Firma hat und folglich ziemlich sicher zur Firma gehört.

