---
title: Asymmetrische Kryptografie
---
> [!success] Lernziele
> 
> - Sie können die Grundkonzepte der asymmetrischen Kryptografie erklären, namentlich den öffentlichen und den privaten Schlüssel.
> - Sie haben grundlegende Einsatzarten der asymmetrischen Kryptografie kennengelernt und können sie konzeptionell erklären.

## Einführung zur asymmetrischen Kryptografie

![[crypto-05-publickey-rsa-photo.png]]
*V.l.n.r: Adi Shamir, Ron Rivest, and Len Adleman. Photo: Dan Wrights RSA-Algorithmuskurs auf imps.mcmaster.ca.*

Kurz nach Diffie und Hellman veröffentlichten drei Forscher - Ronald Rivest, Adi Shamir und Leonard Adleman - im Jahr 1977 das **RSA-Kryptosystem**. Sie entdeckten, dass man mit diskreten Logarithmen durch die geschickte Wahl der Zahlen ein System schaffen kann, bei dem **zwei Schlüssel jeweils in umgekehrter Richtung eine Einbahnstrasse schaffen**:

> Wenn man einen Klartext mit einem der Schlüssel verschlüsselt, kann er ausschliesslich mit dem anderen Schlüssel wieder entschlüsselt werden.

Man nennt das ***asymmetrische* Kryptografie**, weil man unterschiedliche Schlüssel für das ver- und entschlüsseln nutzt. Oft wird dabei **ein öffentlicher und ein privater Schlüssel** erstellt. Der öffentliche Schlüssel wird frei verteilt, während der private Schlüssel geheim gehalten wird. 


![[crypto-05-publickey-basic.excalidraw]]

Anders als bei Diffie-Hellman wird für den Modulo keine Primzahl verwendet, sondern das Produkt zweier Primzahlen. Der genaue Prozess der Schlüsselgenerierung und Verschlüsselung erklären wir hier nicht, aber wichtig zu wissen, ist, dass die Sicherheit von RSA primär auf dem sogenannten Faktorisierungsproblem beruht. Das heisst: Es ist einfach, zwei grosse Primzahlen zu multiplizieren, aber extrem schwierig, aus dem Produkt wieder die ursprünglichen Primzahlen zu ermitteln.

**Beispiel Faktorisierungsproblem:**

$$61 \times 53 = 3233$$

Die Multiplikation ist einfach und dauert Sekundenbruchteile. Aber wenn Sie nur die Zahl 3233 haben und herausfinden müssen, welche zwei Primzahlen multipliziert wurden, wird es deutlich schwieriger. Bei grossen Zahlen (mit hunderten von Stellen) ist dies praktisch unmöglich.

### Ein Beispiel:

Unser öffentlicher Schlüssel ist $\textcolor{lightgreen}{k_{pub}} = \textcolor{lightgreen}{1007}$, unser privater Schlüssel ist $\textcolor{orange}{k_{priv}} = \textcolor{orange}{1103}$ und $n = 3233$. Diese Zahlen wurden **speziell gewählt**!

Nehmen wir an, jemand möchte uns eine Nachricht schicken, die nur wir verstehen, z.B. den **Buchstaben "a", also eine 97 in der ASCII-Tabelle**. Die Person würde mit dem öffentlichen Schlüssel $\textcolor{lightgreen}{k_{pub}} = \textcolor{lightgreen}{1007}$ und $n$ verschlüsseln, nämlich so:

$$\textcolor{cyan}{\text{klartext}}^{\textcolor{lightgreen}{k_{pub}}}\mod{n}= \textcolor{lightgreen}{\text{ciphertext}_{pub}}$$

$$\textcolor{cyan}{\text{97}}^{\textcolor{lightgreen}{1007}} \mod{3233}= \textcolor{lightgreen}{1388}$$

Beachten Sie: Mit dem öffentlichen Schlüssel $\textcolor{lightgreen}{k_{pub}}$ lässt sich der $\textcolor{lightgreen}{ciphertext_{pub}}$ nicht mehr entschlüsseln - es gibt eine ganz andere Zahl!

$$\textcolor{lightgreen}{1388^{1007}} \mod 3233 = \textcolor{red}{1056}$$

Aber mit dem privaten Schlüssel $\textcolor{orange}{k_{priv}} = \textcolor{orange}{1103}$ können wir die Nachricht entschlüsseln, 

$$ \textcolor{lightgreen}{\text{ciphertext}_{pub}}^{\textcolor{orange}{k_{priv}}} \mod{n}= \textcolor{cyan}{\text{klartext}}$$


$$\textcolor{lightgreen}{1388}^{\textcolor{orange}{1103}} \mod 3233 = \textcolor{cyan}{97}$$

### Nachrechnen

<ModCalc />

## Demonstration: Briefumschläge mit Schlössern

Um das Konzept der asymmetrischen Kryptografie besser zu veranschaulichen, habe ich Briefumschläge vorbereitet, die mit einem speziellen Schloss versehen sind. Dieses Schloss kann nur mit dem privaten Schlüssel nach rechts gedreht und mit dem öffentlichen Schlüssel nach links gedreht werden. Diese Umschläge sollen Ihnen helfen, sich selbst Gedanken darüber zu machen, was alles möglich ist.

- **Öffentlicher Schlüssel**: Der öffentliche Schlüssel kann von jedem verwendet werden, um das Schloss nach links zu drehen.
- **Privater Schlüssel**: Nur der Besitzer des privaten Schlüssels kann das Schloss nach rechts drehen.


> [!discuss] Diskutieren Sie
> 
> Was von diesen folgenden Dingen können Sie mit asymmetrischer Verschlüsselung tun?
> - Wie könnten Sie verschlüsselt kommunizieren?
> - Wie könnten Sie Schlüssel austauschen?
> - Wie könnten Sie beweisen, dass Sie tatsächlich die Person sind, die eine Nachricht geschrieben hat?
> - Wie könnten Sie eine Person dazu auffordern, Ihre Identität zu beweisen?

## Anwendungsbeispiele
### 1. **Verschlüsselung von Nachrichten**
- **Erklärung**: Investigativjournalisten veröffentlichen ihre öffentlichen Schlüssel, damit Quellen sie sicher kontaktieren können.
- **Beispiel**: Alice möchte Bob eine geheime Nachricht senden. Alice verwendet Bobs öffentlichen Schlüssel, um die Nachricht zu verschlüsseln. Nur Bob, der den entsprechenden privaten Schlüssel besitzt, kann die Nachricht entschlüsseln und lesen.

![[crypto-05-publickey-guardian.png]]
### 2. **Digitale Signaturen**
- **Erklärung**: Digitale Signaturen gewährleisten die Authentizität und Integrität einer Nachricht. Der Sender verwendet seinen privaten Schlüssel, um eine digitale Signatur zu erstellen, die von jedem mit dem öffentlichen Schlüssel des Senders überprüft werden kann.
- **Beispiel**: Alice möchte Bob ein Dokument senden und sicherstellen, dass Bob weiss, dass es von Alice kommt und nicht verändert wurde. Alice erstellt eine digitale Signatur mit ihrem privaten Schlüssel und fügt sie dem Dokument hinzu. Bob kann die Signatur mit Alice' öffentlichem Schlüssel überprüfen.
## Wieso nicht nur asymmetrische Cipher?

Diffie-Hellman wird oft mit temporären Schlüsseln verwendet, um zusätzliche Sicherheit zu bieten und die Verwendung von langfristigen Schlüsseln zu vermeiden. Hier einige Gründe:

1. **Perfect Forward Secrecy (PFS)**:
    - **Erklärung**: Sie können heute verschlüsselte Kommunikation speichern, die Sie zwar aktuell nicht entschlüsseln können, aber vielleicht in Zukunft irgendwann doch. "Perfect Forward Secrecy" meint Methoden, die genau das verhindern sollen. Diffie-Hellman ist so eine Methode, weil für jede Sitzung ein neuer, temporärer Schlüssel kreiert wird.
    - **Beispiel**: In SSL/TLS kann Diffie-Hellman verwendet werden, um einen temporären Sitzungsschlüssel zu erzeugen, der für die Datenverschlüsselung verwendet wird. Selbst wenn der langfristige private Schlüssel des Servers kompromittiert wird, können vergangene Sitzungen nicht entschlüsselt werden, da die temporären Schlüssel für jede Sitzung neu erzeugt werden.
2. **Effizienz**:
    - **Erklärung**: Asymmetrische Verschlüsselung ist viel rechenintensiver als symmetrische Verschlüsselung. Durch die Verwendung von Diffie-Hellman mit temporären Schlüsseln kann der Schlüsselaustausch effizienter gestaltet werden, da die asymmetrische Verschlüsselung nur kurz für die Generierung des gemeinsamen Sitzungsschlüssels verwendet wird. Für die eigentlichen Daten wird dann eine symmetrische Verschlüsselung verwendet.
    - **Beispiel**: In VPNs (Virtual Private Networks) kann Diffie-Hellman verwendet werden, um einen temporären Sitzungsschlüssel zu erzeugen, der dann für die symmetrische Verschlüsselung der Datenübertragung verwendet wird.
