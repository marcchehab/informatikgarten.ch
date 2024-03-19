---
title: "03: WiFi und Ethernet - unsere Postcontainer"
---

> [!success] Lernziele
> 
> - Sie kennen den Hauptvorteil, die *logische* Internetschicht (IP) von der *physischen* Netzzugangschicht (MAC) zu abstrahieren.
> - Sie erkennen eine MAC-Adresse und können sie von IP-Adressen unterscheiden
> - Sie können erklären, welche IP- und MAC-Adresse in einem Paket steht, wenn es:
>   - im lokalen Netzwerk verschickt wird (IP und MAC des Ziel-Computers),
>   - in ein anderes Netzwerk gesendet wird (IP des Ziel-Computers, MAC des Gateways).
> - Sie müssen die Namen der Schichten *nicht* auswendig lernen.

Wir haben gesehen, dass ein IP-Paket jeweils eine Absender- und eine Ziel-Adresse hat. Nun haben Sie sich vielleicht schon gefragt: **Wie schickt mein Computer etwas an den Gateway, ohne die Ziel-IP-Adresse zu überschreiben?**

Die Antwort ist: Er überschreibt sie nicht. Die IP-Pakete bleiben in unseren einfachen Netzwerken auf dem ganzen Weg unverändert erhalten. Aber: **Die IP-Pakete werden von Station zu Station einzeln in rudimentäre Postcontainer geladen: sogenannte "Frames"**. Auf diesen Frames steht jeweils die Adresse der nächsten Stelle drauf - z.B. die Adresse des Gateways.
## Schichtmodell der Kommunikation

Bevor Ihr Computer Daten abschickt, **verschachtelt** er sie also **mehrmals** hintereinander. Diese **Schichten** existieren nicht einfach, weil Informatiker sie toll finden, sondern weil jede Schicht ein reales Problemfeld der Kommunikation lösen muss.
* Die Schicht des Internet-Protokolls, das Sie bereits kennen, wird **Internetschicht** genannt, und das *Inter*-net Protokoll löst das Problem, mit welcher **Adresslogik** man Daten über mehrere Netzwerke hinweg vermitteln kann. Deswegen wird die IP-Adresse teils auch "logische" Adresse genannt. 
* Neu lernen Sie hier diese unterste Schicht kennen: die **Netzzugangschicht**. Die Protokolle dieser Schicht (z.B. **Wi-Fi und Ethernet**) lösen das physische Problem, wie Pakete mit Antennen (Wi-Fi) oder über Ethernet-Kabel **zur nächsten Stelle** übermittelt werden können, ohne dass z.B. Pakete kollidieren.

![[Pasted image 20240314080153.png]]

Merken Sie sich den **Hauptvorteil**, diese zwei Schichten so voneinander zu abstrahieren: **Das IP-Paket wird von Stelle zu Stelle immer wieder in neue Frames verladen und muss sich nicht darum kümmern, wie es nun genau physisch weiter zur nächsten Stelle versendet wird - über Wi-Fi, ein Kupferkabel, oder Glasfaser.** Es surft quasi auf einer Welle von Frames von Stelle zu Stelle.

![[net-03-ethernet frame-wave.excalidraw]]
## Frames und die MAC-Adresse

Schauen wir uns jetzt diese unterste Schicht, die Netzzugangsschicht, genauer an. Es ist die Verantwortung der Protokolle dieser Schicht (z.B. Wi-Fi und Ethernet), 
- dass die Daten über das physische Medium (Kupferkabel, Wi-Fi, optische Kabel...) bis zur nächsten Stelle gelangen,
- dass dabei keine Kollisionen passieren.

Die Container ("Frames") verwenden nicht IP-Adressen, sondern die Hardware-ID der nächsten Stelle, die sogenannte **MAC-Adresse**. Diese wird auch "physische" Adresse genannt, weil sie vom Hersteller der Netzwerkkarte voreingestellt ist. Normalerweise verändert man diese nicht.

Sie sollten MAC-Adresse einfach von IP-Adressen unterscheiden können. Typischerweise werden MAC-Adressen hexadezimal mit **Doppelpunkten (:) oder Bindestrichen (-)** notiert und sind **6 Byte lang**. Wie bei IP-Netzwerken ist bei MAC-Adressen die höchstmögliche Adresse die **Broadcast-Adresse**, die an alle Geräte im Netzwerk weitergeleitet wird. 

```
8b:3b:06:af:9c:df
0a:a4:3c:e5:55:04
81:03:ce:85:fa:d1
ff:ff:ff:ff:ff:ff (Broadcast-Adresse)
```

Für die Computer mit IP-Adressen im gleichen Netzwerk führt Ihr Computer eine Tabelle, welche IP-Adresse welche MAC-Adresse hat. Sie können die aktuelle Tabelle Ihres Computers in einer Kommandozeile mit `arp -a` anzeigen. Das sieht bei mir zuhause auf Windows so aus:

```
Interface: 192.168.1.180 --- 0xe
  Internet Address      Physical Address      Type
  192.168.1.1           50-e0-39-61-4f-40     dynamic
  192.168.1.75          dc-e5-5b-77-ef-a7     dynamic
  192.168.1.116         d8-47-32-fa-d4-60     dynamic
  192.168.1.171         a8-6b-ad-81-b0-58     dynamic
```

Was, wenn ihr Computer die **MAC-Adresse** einer IP-Adresse im lokalen Netzwerk noch **nicht kennt?** Dann sendet er eine Frage per **Broadcast-MAC-Adresse** ans ganze Netzwerk: "Das Gerät mit dieser IP soll mir bitte seine MAC-Adresse mitteilen." 

![[net-04-tcp arp.excalidraw]]

Wenn das Gerät antwortet, trägt Ihr Computer das IP-MAC-Adresspaar der Geräts in seiner ARP-Tabelle ein. Nun können sie direkt kommunizieren.

![[Pasted image 20240314101056.png]]

Das funktioniert genau gleich, auch wenn mehrere Geräte mit einem Switch oder über einen Wireless-Access-Point zusammengehängt sind. Diese Geräte ändern nichts an den weitergeleiteten Frames und beherrschen IP-Adressen nicht. D.h. Sie können sich Switches einfach als eine etwas kompliziertere **Mehrfachsteckdosen** vorstellen.

![[Pasted image 20240314103453.png]]
> [!question]- Infos zu Switches und Access-Points (optional, falls Sie das interessiert)
> 
> Switches sind eher günstige Netzwerkgeräte, die sich vorzu in einer Tabelle merken, an welchen Anschlüssen welche MAC-Adressen Daten schicken und dann die Frames anhand dieser Tabelle an die richtigen Anschlüsse weiterleiten. Billige Switches für zuhause gibt es ab knapp 30 Franken.
> 
> ![[Pasted image 20240314103538.png]]
> 
> Wireless Access-Points benutzen ebenfalls MAC-Adressen. Sie können sich das so vorstellen: Jeder Computer baut eine verschlüsselte Verbindung mit dem Access-Point auf (mit WPA), die ähnlich eines Kabels eine exklusive 1:1 Verbindung ist. D.h. der Verkehr läuft immer über den Access-Point, der im Wesentlichen wie ein Switch agiert.

Die Idee des Mehrfachverschachtelung kommt richtig zum tragen, wenn mehrere Netzwerke und Router im Spiel sind. Wenn Computer "A" ein IP-Paket an Computer "B" verschickt, der in einem anderen Netzwerk liegt, dann **verpackt er das IP-Paket mit der Ziel-IP-Adresse von Computer "B" in ein Ethernet-Frame mit der MAC-Adresse des Routers**. 

Ich habe hier die konkreten IP- und MAC-Adressen weggelassen, damit das Prinzip einfacher erkennbar ist. 

![[Pasted image 20240314094050.png]]

Sie sehen hier, wie das IP-Paket auf einer Serie von unterschiedlichen Frames surft. Die Logik der Internetschicht (IP) besteht über mehrere Übertragungsschritte der Netzzugangsschicht (MAC) hinweg fort.

[[net-02-networks|Zurück]]
[[net-04-transport-application|Weiter]]
