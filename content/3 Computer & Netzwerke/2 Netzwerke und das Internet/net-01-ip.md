---
title: "01: IP - wie adressieren Sie Computer im Netzwerk?"
---

> [!success] Lernziele
> 
> - Sie kennen den Aufbau einer IP-Adresse (Version 4).
> - Sie wissen, wie man dezimal aus IP-Adresse und Standard-Subnetmaske die Netzwerkadresse herleitet.
> - Sie können erklären, wie ein Computer anhand der Netzwerkadresse entscheidet, ob eine Ziel-IP-Adresse im selben Netzwerk liegt, oder nicht.
> - *Sie wissen, wie man binär aus IP-Adresse und Subnet-Maske die Netzwerkadresse herleitet.*

Computer kommunizieren in Netzwerken in einer **Serie von Paketen**. In den nächsten Lektionen behandeln wir, **wie diese Paketen Ihren Weg durchs Netzwerk** finden.

Als Analogie stellen Sie sich den Paketversand der Post vor. Dort finden die Pakete den richtigen Empfänger anhand der Adresse:

```
Marc Chéhab
Lehrerstrasse 3
8000 Zürich
```

Nun beachten Sie etwas an dieser Adresse, das wir auch bei Computernetzwerken sehen werden: Die Adresse hat die verschiedene Elemente (Ort, Strasse, Person, evtl. sogar Land), die **vorzu genauer definieren, wo das Paket hin muss**.

Wieso macht man das so? Besprechen Sie das kurz.

> [!question] Lösung
> 
> Das ist wieder eine Art, wie man ein grosses Problem in kleinere Probleme zerlegt. 
> - Anstatt alle Adressen der Schweiz anzuschauen, engt die Ortsangabe dies ein auf alle Adressen eines Ortes.
> - Anstatt alle Adressen des Ortes anzuschauen, engt der Strassenname das auf eine einzelne Strasse ein, und die Hausnummer sagt genau, welches Haus.
> - Anstatt alle Personen im Haus, definiert der Empfängername die exakte Person, die das Paket erhalten soll.
> 
> Diese Angaben sind **voneinander abhängig**: Der Strassenname ist ohne Ortsangabe meistens wertlos! So gibt es beispielsweise in 650 Schweizer Orten eine "Dortstrasse".

## IP: Das "Internet Protokoll"

In der Analogie zum Postversand ist Ihr Computer ein Gebäude. Wie Sie sich sicher vorstellen können, hat Ihr Computer eine Hauptadresse. Das ist die **Adresse des "Internet Protokolls", oder kurz: IP**. Und wie bei einem Gebäude ist diese Adresse unterteilt in eine Art Ortsangabe und eine spezifische Adresse für den Computer.

 Schauen wir uns aber zuerst die IP-Adresse als Ganzes an. Hier vier Beispiele für IP-Adressen: 

```
192.168.1.4
10.32.4.12
243.123.129.45
88.210.255.25
```

> [!question]- Wie würden Sie diese Zahlen beschreiben? Was ist die grösste einzelne Zahl, die Sie finden? Was für eine Datenmenge könnte das sein?
> 
> - Es sind jeweils vier Dezimalzahlen durch Punkte getrennt.
> - Die höchste Zahl ist 255. Das ist in der Informatik immer eine verdächtige Zahl, weil es genau einem vollen Byte entspricht: 1111'1111<sub>2</sub> = 255<sub>10</sub>.
> - Und so vermuten wir korrekt: IP-Adressen bestehen aus **vier Bytes**.

Bei Ihnen zuhause könnten mögliche IP-Adressen so aussehen:

```
192.168.1.5
192.168.1.41
192.168.1.53
```

Sie sehen: 
- Der **erste Teil aller IP-Adressen ist gleich**, weil alle Computer im **gleichen Netzwerk** sind. Das ist wie bei der Post die **Ortsangabe**. 
- Der zweite Teil ist bei allen Geräten im Netzwerk (**Hosts**) unterschiedlich. Dieser Teil ist wie bei der Post die genaue Adresse des Gebäudes.

![[Pasted image 20240219130050.png]]

Aber Achtung: Wo die Grenze zwischen ist zwischen Netzwerk- und Hostteil, ist **nicht fix**! Diese Unterteilung geschieht durch die **Subnetmaske**. Sie besteht ebenfalls aus vier Bytes und bestimmt, **bis wo der Netzwerkteil geht**. Aber wie? Bei Ihren IPs zuhause wäre das so:
```
IP-Adressen:
192.168.1.6
192.168.1.41
192.168.1.23

Subnetmaske:
255.255.255.0
```

Diese Subnetmasken, die nur aus vollen (255) und leeren (0) Bytes bestehen, nennen wir **Standard-Subnet-Masken**. Bei diesen kann man sich die Logik dezimal erklären:
- Im Netzwerkteil sind die Bytes der Subnetmaske 255. 
- Im Hostteil sind die Bytes der Subnetmaske 0.

### Mein Netzwerk - oder nicht? Und was dann?

Wie entscheidet der Computer nun, ob eine IP-Adresse im gleichen Netzwerk ist wie er? Indem er **gemäss seiner eigenen Subnetmaske** den Netzwerkteil der eigene IP und der Ziel-IP vergleicht. Dazu bildet er für beide Adressen die sogenannte **Netzwerkadresse**. Die setzt sich so zusammen:
- Der **Netzwerkteil** wird von der IP-Adresse übernommen.
- Der **Hostteil** ist 0 (Null).

Die Netzwerkadresse ist eine spezielle Adresse, die zu keinem Gerät im Netzwerk gehört - genau wie eine Ortsangabe (8000 Zürich) kein Gebäude adressiert. Da der Hostanteil per Definition 0 ist, ist es immer die tiefstmögliche Adresse eines Netzwerks. Und: Alle IP-Adressen desselben Netzwerks ergeben dieselbe Netzwerkadresse. 

![[Pasted image 20240303141552.png]]

Mit der Eigenschaft kann Ihr Computer also sehr einfach urteilen:
- Wenn sich aus beiden IP-Adressen zweimal die gleiche Netzwerkadresse bildet, urteilt er, dass sich das Ziel im gleichen Netzwerk befindet und er das Paket selbst direkt verschicken kann.
- Wenn sich die Netzwerkteile unterscheiden und somit verschiedene Netzwerkadressen bilden (rote Kreise), urteilt er, dass sich das Ziel in einem anderen Netzwerk befindet. Dann braucht er quasi die Hilfe der Post, um das Paket zu verschicken (mehr dazu in der nächsten Lektion).
### Ein binäres Verständnis Subnetmasken

Letztlich muss man Subnetmasken aber **binär verstehen**. Hier dieselben Beispiele nochmals mit den Binärzahlen. 

So gesehen besteht eine Subnetmaske aus einer Serie von `1`, gefolgt von `0`. Nun kann aber die Grenze zwischen Netzwerk- und Host-Teil **mitten durch eines der vier Byte** laufen! Diese **Grenze muss klar sein** - d.h. es darf nur eine Grenze zwischen `1` und `0` haben. Man kann die Subnetmaske deshalb auch kürzer angeben, indem man einfach die Anzahl `1` notiert: hier also 24.

![[Pasted image 20240303142332.png]]

Binär wird die Erklärung dafür, wie IP und Subnetmaske die Netzwerkadresse bilden, paradoxerweise eher einfacher. Wir multiplizieren eigentlich einfach Bit um Bit die IP mit der Subnetmaske. Das ist eine logische UND-Operation, weil nur wenn **IP und Subnetmaske eine `1` haben**, ergibt sich in der Netzwerkadresse auch eine `1`.

Hier wird also ein logischer UND-Operator Bit für Bit angewandt. Deswegen heisst diese Operation **"Bitwise AND"** mit dem Zeichen **"&"**. Im Beispiel sieht man:
$$\text{Meine IP } \& \text{ Subnet-Maske} = \text{Netzwerkadresse}$$

Achten Sie sich nun auf die erste IP-Adresse `192.168.0.13`. Die Netzwerkadresse unterscheidet sich zu unserer (orangen) Netzwerkadresse bloss im letzten Bit des Netzwerkteils. 

Wenn wir unser Netzwerk grösser machen möchten, dass diese Adresse auch noch in unser Netzwerk gehört, müssten wir die Grenze zwischen Netzwerkteil und Hostteil in der Subnetmaske um ein Bit nach vorne verschieben. 

Überlegen Sie sich, was für eine Dezimalzahl Sie bei der Subnetmaske eingeben müssten, um das zu erzeugen.

> [!question]- Lösung (unbedingt anschauen!)
> 
> Sie müssten die Subnetmaske zu `255.255.254` ändern. Alle IP-Adressen in den Bereichen `192.168.0.x` und `192.168.1.x` bilden nun dieselbe Netzwerkadresse: nämlich `192.168.0.0` 
> 
> ![[Pasted image 20240303143606.png]]

## Praktisches Beispiel

Als Beispiel meine IP-Adresse zuhause.

![[Pasted image 20230612211154.png]]


> [!example] Jetzt sind Sie dran
> 
> Versuchen Sie die IP-Adresse Ihres Geräts herauszufinden. Dazu finden Sie auf Google leicht eine Anleitung, z.B. `IP-Adresse finden Windows 10` oder `IP-Adresse finden Android`

### An welcher Tür klopfe ich an?

Wie bei der Post muss man neben dem Ziel-Computer noch genauer angeben, "wer" oder "was" die Daten erhalten soll. Das geschieht mit dem sogennanten **"Port" - also welche "Tür"**. 

Wenn Sie im Internet surfen, verbinden Sie sich ständig mit Webservern, die standardmässig auf **Port 443 (HTTPS)** laufen (unverschlüsselt auch **Port 80 (HTTP)**). Das macht Ihr Browser automatisch, ohne dass Sie das merken. 

Wenn Sie aber den Port selbst manuell definieren wollen, können Sie ihn mit einem Doppelpunkt nach der IP angegeben. Drei Beispiele:
- Wenn Sie `https://192.168.1.4` im Browser eingeben, wird der Browser versuchen, über den Standardport `443` eine HTTPS-Verbindung mit dem Webserver aufzubauen.
- Wenn Sie `http://192.168.1.4` im Browser eingeben, versucht der Browser eine unverschlüsselte HTTP-Verbindung über Port `80` aufzubauen.
- Wenn Sie `http://192.168.1.4:3000` eingeben, wird der Browser eine HTTP-Verbindung über Port `3000` aufbauen.

Weitere übliche Ports finden Sie [hier auf Wikipedia](https://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers#Well-known_ports).

> [!note] Ein Versuch
> 
> Ich lasse auf meinem Laptop einen HTTP-Webserver laufen. Meine IP-Adresse sage ich Ihnen in der Lektion. Versuchen Sie mal, die Webseite aufzurufen!

[[net-00-intro|Zurück zum Intro]]
[[net-02-networks|Weiter]]