---
title: Schlüsselaustausch
---
> [!success] Lernziele
> 
> - Sie haben mit unserem **Vigenère-Cipher** einen Schlüsseltausch umgesetzt und können ihn erklären.
> - Die können das **diskrete Logarithmusproblem** beschreiben und was es zu einer Einbahnstrasse macht.
> - Sie haben einen **Diffie-Hellman**-Schlüsselaustausch mit einfachen Zahlen absolviert und könne ihn erklären.
> - (Die Herleitung, wieso das funktioniert, wird nicht abgefragt.)

Wir haben das Kerckhoffs-Prinzip kennengelernt: *"Ein kryptografisches System sollte auch dann sicher sein, wenn alles darüber bekannt ist, ausser dem geheimen Schlüssel."* Da stellt sich natürlich die Frage: Wie tauschen wir die Schlüssel aus?
## Experiment mit unserem Vigenère-Cipher

### Testen Ihres Programms

Wir werden die Grundidee  zuerst mit unserem Vigenère-Cipher demonstrieren. Testen Sie, ob Sie das Verfahren gleich implementiert haben. Verschlüsseln Sie dazu folgenden Satz mit dem Schlüssel `MeinSchluessel`.

```
Wir treffen uns im Cybercafe, follow the white rabbit.
```

Sie sollten den gleichen Ciphertext wie Ihre Partnerin oder Ihr Partner erhalten. Wenn Sie den Cipher genau wie im Video implementiert haben, erhalten Sie `Vfs ymejsby rrr js Xyfronlci, guqgoa qsp agfuk mafofe.`

### Demonstration

Jetzt nehmen wir an, Sie kommunizieren ausschliesslich über offene Kanäle. Alle anderen hören Ihre komplette Kommunikation mit! Wie könnten sich zwei Parteien trotzdem **auf einen gemeinsamen geheimen Schlüssel einigen**?

Befolgen Sie beide folgende Schritte:
1) Überlegen Sie sich als Einzelperson einen geheimen Schlüssel. Jede Person hat also einen Schlüssel, den nur sie kennt.
2) Vereinbaren Sie ein Startwort über den offenen Kanal. Dieses Startwort kennt also die ganze Welt!
3) Verschlüsseln Sie einzeln für sich das Startwort mit Ihrem privaten Schlüssel.
4) Schicken Sie Ihrer Partnerin oder Ihrem Partner Ihren Ciphertext. Die ganze Welt hört mit und sieht diesen Ciphertext!
5) Verschlüsseln Sie nun den erhaltenen Ciphertext, den Sie erhalten haben, mit Ihrem privaten Schlüssel.
6) Vergleichen Sie den Ciphertext, den Sie nun beide generiert haben. Sie sollten **beide den gleichen Ciphertext** erhalten! Das ist Ihr Schlüssel, den Sie nun beide für Ihre geheime Kommunikation verwenden können.
![[crypto-04-vigenere-keyexchange.excalidraw]]



> [!discuss] Besprechen und analysieren Sie!
> 
> - Wieso funktioniert das? Diskutieren und erklären Sie sich das.
> - Was für Schwächen gibt es?

> [!solution]- Lösung
> 
> Unser Vigènere-Cipher ist schwach: Mit den ausgetauschten Ciphertexten und dem Originaltext ist es ein Leichtes, die privaten Schlüssel von Alice und Bob herzuleiten. Man müsste bloss die Verschiebung der Buchstaben zählen.

## Das Diskrete Logarithmusproblem (DLP)

Das Diskrete Logarithmusproblem (DLP) ist ein mathematisches Problem, das im Folgenden und in der Kryptographie generell eine zentrale Rolle spielt. Es besagt, dass es schwierig ist, den Exponenten $k$ zu finden, wenn man die Basis $g$, den Modulo $p$ und das Ergebnis $K$ kennt:
![[crypto-dlp.excalidraw]]
In anderen Worten, selbst wenn man $g$, $p$ und $K$ kennt, ist es schwierig, $k$ herauszufinden. Das DLP ist schwierig, weil es keine effizienten Algorithmen gibt, um den Exponenten $k$ zu berechnen, wenn $g$, $p$ und $K$ bekannt sind. Man kann nicht einfach herleiten, wie oft $k$ die Zahl um die Uhr von $\mod p$ gedreht hat.

![[crypto-04-diffie-hellman-dlp-clock.excalidraw]]

Einfacher gesagt, ist das DLP wie eine Einbahnstrasse: Es ist sehr einfach, in eine Richtung zu kommen. Aber der Rückweg, also wieder herauszufinden, dass $k = 3$ ist aufwändig schwer. 

Eine Analogie, die sich anbietet, ist folgende: 
- Aus Kaffeebohnen und Milch einen Cappuccino zu machen, ist relativ einfach (wenn man es kann... 🧐).
- Aus einem Cappuccino wieder Kaffeebohnen und Milch zu machen, ist für Menschen unmöglich.

![[crypto-04-diffie-hellman-2024-11-26-22.46.07.excalidraw]]

### Bedingungen für `p` und `g`

Damit diese Einbahnstrasse sicher ist, sollte man `p` und `g` wie folgt wählen.
- Die **Primzahl $p$ sollte gross sein**, um die Sicherheit des Verfahrens zu gewährleisten. Eine typische Grösse für $p$ ist mindestens 2048 Bits. Das heisst: $2^{2048}$. Diese Zahlen sind extrem gross und werden in der Kryptographie verwendet, um sicherzustellen, dass es für Angreifer praktisch unmöglich ist, die Zahl zu erraten oder zu berechnen.
> [!NOTE]- $2^{2048}$ als Zahl ausgeschrieben
> 
> 32317006071311007300714876688669951960444102669715484032130345427524655138867890893197201411522913463688717960921898019494119559150490921095088152386448283120630877367300996091750197750389652106796057638384067568276792218642619756161838094338476170470581645852036305042887575891541065808607552399123930385521914333389668342420684974786564569494856176035326322058077805659331026192708460314150258592864177116725943603718461857357598351152301645904403697613233287231227125684710820209725157101726931323469678542580656697935045997268352998638215525166389437335543602135433229604645318478604952148193555853611059596230656
> 
> Die Zahlt hat 617 Stellen.
- Die Basis $g$ muss kleiner als $p$ sein.
- $g$ sollte ein sogenannter "**Generator**" für $p$ sein. Das bedeutet, dass die Potenzen $g^k\mod{p}$ alle möglichen Reste (die zyklische Gruppe $\mathbb{Z}_p^*$) durchlaufen sollten.

> [!solution]- Zusatz: Wann ist $g$ ein Generator $\mod{p}$?
> 
> $g$ ist ein Generator $\mod{p}$, wenn $g$ eine "primitive Wurzel" $\mod{p}$ ist. Das bedeutet: Die kleinstmögliche Potenz $k$, für die $g^k\mod{p} \equiv 1$, muss $p-1$ sein. Wieso? Weil das garantiert, dass alle Potenzen bis dahin $\mod{p}$ unterschiedliche Resultate erzeugen. 
> 
> Zum Beweis überlegen Sie das kontrafaktisch: Stellen Sie sich vor, es gäbe zwei deckungsgleiche Potenzen $g^i \equiv g^j \mod{p}$ im Bereich $0 \leq i < j < p-1$. Daraus würde folgen, dass $g^{j-i} \equiv 1 \mod{p}$, also dass es eine Potenz $k$ gäbe, die $g^k\mod{p} \equiv 1$ erfüllt, aber kleiner als $p-1$ ist.

- In unseren Beispielen verwenden wir oft die Zahlen $g=2$ oder $g=5$, da diese Werte einfach zu berechnen sind und in vielen Fällen als Generatoren funktionieren.

## Diffie-Hellman-Key-Exchange

![[crypto-04-diffie-hellman-photo.png]]
*Martin Hellman (links) und Whitfield Diffie (rechts) im Jahr 1977. (Bild: [Chuck Painter/Stanford News Service](https://news.stanford.edu/stories/2016/03/turing-hellman-diffie-030116))*

Der Diffie-Hellman-Key-Exchange wurde 1976 von Martin Hellman und Whitfield Diffie veröffentlicht und revolutionierte die Kryptografie. Das Verfahren nutzt die Einbahnstrasse des DLP für den Schlüsselaustausch.

![[crypto-04-diffie-hellman.excalidraw]]
### Schritte des Diffie-Hellman-Key-Exchanges

1. **Vereinbarung der öffentlichen Parameter:**
   - Eine Primzahl $p$ und eine Basis $g$ werden öffentlich bekannt gegeben.
   - Diese Parameter werden von beiden Parteien verwendet.

2. **Erstellung der privaten Schlüssel:**
   - Jede Partei wählt einen privaten Schlüssel $a$ (für Alice) und $b$ (für Bob).
   - Diese privaten Schlüssel bleiben geheim.

3. **Berechnung der öffentlichen Schlüssel:**
   - Alice berechnet $A = g^a \mod p$.
   - Bob berechnet $B = g^b \mod p$.

4. **Austausch der öffentlichen Schlüssel:**
   - Alice sendet $A$ an Bob.
   - Bob sendet $B$ an Alice.

5. **Berechnung des gemeinsamen geheimen Schlüssels:**
   - Alice berechnet $K_{ba} = B^a \mod p$
   - Bob berechnet $K_{ab} = A^b \mod p$
   - Beide berechnen den gleichen Schlüssel, da $K_{ab} =K_{ba}$

6. **Schlussfolgerung und Fragestellung:**
   - Zusammengefasst heisst das: $(g^a \mod p)^b \mod p = (g^b \mod p)^a \mod p$.

### Beispiel mit dem Rechner

<ModCalc />

### Beispiel in Python

```turtle
import random

def diffie_hellman(p, g):
    # Zufällige private Schlüssel für Alice und Bob wählen
    a = random.randint(2, p-2)  # Alices privater Schlüssel
    b = random.randint(2, p-2)   # Bobs privater Schlüssel

    # Berechnung der öffentlichen Schlüssel
    A = pow(g, a, p)
    B = pow(g, b, p)

    # Berechnung des gemeinsamen geheimen Schlüssels
    K_A = pow(B, a, p)
    K_B = pow(A, b, p)

    return a, b, A, B, K_A, K_B

# Öffentliche Parameter
p = 23
g = 5

# p = 2932031007403  # Eine grössere Primzahl (immer kryptografisch noch sehr klein)

# Durchführung des Diffie-Hellman-Key-Exchanges
a, b, A, B, K_A, K_B = diffie_hellman(p, g)

# Ausgabe der Ergebnisse
print(f"Öffentliche Parameter: p = {p}, g = {g}")
print(f"Alice's privater Schlüssel: a = {a}")
print(f"Bob's privater Schlüssel: b = {b}")
print(f"Alice's öffentlicher Schlüssel: A = {A}")
print(f"Bob's öffentlicher Schlüssel: B = {B}")
print(f"Gemeinsamer geheimer Schlüssel: K_A = {K_A} (Alice), K_B = {K_B} (Bob)")

# Überprüfung, ob die gemeinsamen Schlüssel übereinstimmen
if K_A == K_B:
    print("Der gemeinsame geheime Schlüssel stimmt überein!")
else:
    print("Der gemeinsame geheime Schlüssel stimmt nicht überein.")

```

### Wieso funktioniert das?

Wir haben gesehen, dass $(g^a \mod p)^b \mod p = (g^b \mod p)^a \mod p$.

Intuitiv erinnert Sie das vielleicht an das Potenzgesetz: $(g^a)^b = (g^b)^a = g^{ab}$. Aber können wir uns sicher sein, dass das auch mit Modulo funktioniert?

Der Kern, wieso das funktioniert, ist eine Einsicht der modularen Arithmetik. Experimentieren Sie dazu zunächst selbst:
- Wählen Sie eine Zahl auf dieser Modulo-Uhr für $\mod{7}$ und rechnen Sie die Zahl hoch 2. Markieren Sie die Zahl, die Sie erhalten haben.
- Wählen Sie eine zweite Zahl aus dem gleichen Sektor und rechnen Sie die Zahl ebenfalls hoch 2.
- Wählen Sie eine dritte Zahl aus dem gleichen Sektor und rechnen Sie die Zahl ebenfalls hoch 2.

Was fällt auf?

![[crypto-04-diffie-hellman-2024-12-03-23.28.16.excalidraw]]


> [!solution]- Lösung
> 
> Alle Ergebnisse liegen in ein und demselben Sektor!


Wenn Sie Zahlen aus demselben Ursprungssektor mit der gleichen Zahl potenzieren, werden auch die Ergebnisse immer in einem gemeinsamen Ergebnissektor liegen. Wieso?

Nehmen wir als Basis die Zahl 2 und potenzieren Sie mit 2. 

$$2^2 = 4$$

Wenn wir nun eine Zahl aus demselben Ursprungssektor wie 2 anschauen, muss die gezwungenermassen um ein Vielfaches der Primzahl 7 grösser sein, z.B. $2+1*7=9$, oder $2+2*7=16$. Wir müssen also beweisen, wieso generell $(2+p)^2 \equiv 4$ sein wird.

Klammern wir dazu aus und formen um: 

$$(2+p)^2 = 2^2 + 2p + p^2 = 2^2 + p(2 + p)$$


Damit sieht man: Das Ergebnis wird immer $2^2$ plus ein Vielfaches von $p$ bleiben und damit immer "kongruent" mit $2^2$ bleiben (also $\mod{p}$ das Gleiche ergeben).

Mit anderen Worten: Der Modulo bricht das Potenzgesetz nicht. Das Potenzgesetz "überlebt" den Modulo.

