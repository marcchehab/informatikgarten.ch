---
title: IP - wie adressieren Sie Computer im Netzwerk?
---

> [!success] Lernziele
> 
> - Sie kennen den Aufbau einer IP-Adresse (Version 4).
> - Sie wissen, wie man dezimal aus IP-Adresse und Standard-Subnetmaske die Netzwerkadresse herleitet.
> - Sie können erklären, wie ein Computer anhand der Netzwerkadresse entscheidet, ob eine Ziel-IP-Adresse im selben Netzwerk liegt, oder nicht.

Computer kommunizieren in Netzwerken in einer **Serie von Paketen**. In den nächsten Lektionen behandeln wir, **wie diese Paketen Ihren Weg durchs Netzwerk** finden.

Als Analogie stellen Sie sich den Paketversand der Post vor. Dort finden die Pakete den richtigen Empfänger anhand der Adresse:

```text
Marc Chéhab
Lehrerstrasse 3
8000 Zürich
```

Nun beachten Sie etwas an dieser Adresse, das wir auch bei Computernetzwerken sehen werden: Die Adresse hat die verschiedene Elemente (Ort, Strasse, Person, evtl. sogar Land), die **vorzu genauer definieren, wo das Paket hin muss**.

Wieso macht man das so? Besprechen Sie das kurz.

> [!question]- Lösung
> 
> Das ist wieder eine Art, wie man ein grosses Problem in kleinere Probleme zerlegt. 
> - Anstatt alle Adressen der Schweiz anzuschauen, engt die Ortsangabe dies ein auf alle Adressen eines Ortes.
> - Anstatt alle Adressen des Ortes anzuschauen, engt der Strassenname das auf eine einzelne Strasse ein, und die Hausnummer sagt genau, welches Haus.
> - Anstatt alle Personen im Haus, definiert der Empfängername die exakte Person, die das Paket erhalten soll.
> 
> Diese Angaben sind **voneinander abhängig**: Der Strassenname ist ohne Ortsangabe meistens wertlos! So gibt es beispielsweise in 650 Schweizer Orten eine "Dortstrasse".

## IP: Das "Internet Protokoll"

In der Analogie zum Postversand ist Ihr Computer ein Gebäude. Wie Sie sich sicher vorstellen können, hat Ihr Computer eine Hauptadresse. Das ist die **Adresse des "Internet Protokolls", oder kurz: IP**. Und wie bei einem Gebäude ist diese Adresse unterteilt in eine Art Ortsangabe und eine spezifische Adresse für den Computer. 

Wieso ist das wichtig? Weil wenn Sie wissen, dass sich eine Adresse am gleichen Ort befindet, können Sie Ihr Paket **lokal direkt verschicken**. Wenn die Adresse nicht im eigenen Dort ist, müssen Sie auf die Post...

Soweit die Analogie. Schauen wir uns nun IP-Adressen an. Hier vier Beispiele: 

```text
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

```text
192.168.1.5
192.168.1.41
192.168.1.53
```

Sie sehen: 
- Der **erste Teil aller IP-Adressen ist gleich**. Das ist, weil alle Computer im **gleichen Netzwerk** sind. Man nennt das den **Netzwerkteil** der Adresse. Das ist wie bei der Post die **Ortsangabe**. 
- Der **zweite Teil ist pro Gerät (Host) unterschiedlich**. Man nennt das den **Hostteil**. Dieser Teil ist wie bei der Post die genaue Adresse des Gebäudes. 

Diese Unterscheidung ist für den Netzwerkverkehr so elementar, wie die Ortsangabe bei der Post: Denn wenn etwas im **gleichen Netzwerk** ist, kann man es **lokal direkt verschicken**. Wenn es nicht im eigenen Netzwerk ist, müssen wir in ein anderes Netzwerk oder ins Internet.
### Klassische Subnetmasken

Aber Achtung: **Die Grenze** zwischen Netzwerk- und Hostteil ist **nicht fix vorgegeben**, sondern muss mit einer **Subnetmaske** selbst konfiguriert werden. Sie besteht ebenfalls aus vier Bytes und bestimmt, bis wo der Netzwerkteil geht und wo der Hostteil beginnt. Aber wie?

Merken Sie sich: **Beim Hostteil ist die Subnetmaske 0**.

- Wenn Ihre eigene IP-Adresse `192.168.1.5` ist und Sie die Subnetmaske `255.255.255.0` haben, erachten Sie alle IP-Adressen des Musters `192.168.1.x` als Teil Ihres Netzwerks.
- Wenn Sie aber mit derselben IP-Adresse `192.168.1.5` die Subnetmaske `255.255.0.0` hätten, müssten IP-Adressen nur das Muster `192.168.x.x` erfüllen, damit Sie als Teil Ihres Netzwerks anerkannt werden.

![[net-01-ip-2024-06-12-09.23.58.excalidraw]]

Solche Subnetmasken, die nur aus vollen (255) und leeren (0) Bytes bestehen, nennt man **klassische Subnetmasken**. Bei diesen kann man sich die Logik also dezimal erklären:
- Im Netzwerkteil sind die Bytes der Subnetmaske 255. 
- Im Hostteil sind die Bytes der Subnetmaske 0.

Die Subnetmaske ist also eine "Maske", weil man sie auf die IP-Adresse legt und sieht, was der Netzwerkteil und was der Hostteil ist.
### Wie machen das Computer konkret? Mit der Netzwerkadresse

Bisher war die Erklärung der Logik für Sie als Menschen nachvollziehbar. Aber **wie rechnet sich das ein Computer aus?** Dahinter muss ja letztlich ein Algorithmus oder eine Rechnung stecken.

Obwohl die Grenze zwischen Netzwerk- und Hostteil bei jedem Netzwerk von unterschiedlichen Subnetmasken definiert sein kann, wurde eine elegante Lösung gefunden, die in allen Fällen funktioniert: die sogenannte **Netzwerkadresse**. Das ist die tiefstmögliche Adresse eines Netzwerks, nämlich dort wo der **gesamte Hostteil 0** ist. Die Netzwerkadresse ist eine spezielle Adresse, die zu keinem Gerät im Netzwerk gehört - genau wie eine **Ortsangabe** (8000 Zürich) kein Gebäude adressiert.

![[net-01-ip-2024-06-13-20.00.46.excalidraw]]

Wie erleichtert das unseren Maschinen die Entscheidung, ob eine Ziel-IP-Adresse im gleichen Netzwerk liegt? Die Netzwerkadresse setzt ja den Hostteil 0. Das heisst: **Alle IP-Adressen eines Netzwerks sollten die gleiche Netzwerkadresse erzeugen**.

Ein Computer mit einer IP-Adresse `192.168.1.5` und einer Subnetmaske `255.255.255.0` geht also wie folgt vor:
1) Wenn die IP konfiguriert wird, formt und speichert er bereits die Netzwerkadresse seines eigenen Netzwerks: `192.168.1.0`.
2) Wenn er jetzt eine Nachricht an die IP-Adresse `192.168.1.12` senden soll, testet er, ob mit seiner eigenen Subnetmaske **dieselbe Netzwerkadresse** resultieren würde. In diesem Fall stimmt das: `192.168.1.0`, also liegt die IP **im selben Netzwerk**.
3) Wenn er eine Nachricht an die IP-Adresse `192.168.2.54` senden soll, testet er erneut mit seiner eigenen Subnetmaske, ob die Netzwerkadresse übereinstimmt. In diesem Fall tut sie das nicht: `192.168.2.0`, also liegt die IP **in einem fremden Netzwerk**.

Weitere solche Beispiele:

![[net-01-ip-20240612100308.png]]

Mit der Eigenschaft kann Ihr Computer also sehr einfach urteilen:
- Wenn sich aus beiden IP-Adressen zweimal die gleiche Netzwerkadresse bildet, urteilt er, dass sich das Ziel im **gleichen Netzwerk** befindet und er das **Paket selbst direkt verschicken** kann.
- Wenn sich die Netzwerkteile unterscheiden und somit verschiedene Netzwerkadressen bilden (rote Kreise), urteilt er, dass sich das Ziel in einem **anderen Netzwerk** befindet. Dann braucht er quasi die **Hilfe der Post**, um das Paket zu verschicken: Er schickt das Paket an seinen **Default Gateway** (auch Standardgateway genannt) – das ist typischerweise Ihr Router. Dieser kennt den Weg ins Internet und leitet das Paket weiter (mehr dazu in der nächsten Lektion).

### Ein binäres Verständnis Subnetmasken (nicht Prüfungsstoff)

Letztlich muss man Subnetmasken aber **binär verstehen**. Hier dieselben Beispiele nochmals mit den Binärzahlen. 

So gesehen besteht eine Subnetmaske aus einer Serie von `1`, gefolgt von `0`. Nun kann aber die Grenze zwischen Netzwerk- und Host-Teil **mitten durch eines der vier Byte** laufen! Diese **Grenze muss klar sein** - d.h. es darf nur eine Grenze zwischen `1` und `0` haben. Man kann die Subnetmaske deshalb auch kürzer angeben, indem man einfach die Anzahl `1` notiert: hier also 24.

![[net-01-ip-20240612100058.png]]

Binär wird die Erklärung dafür, wie IP und Subnetmaske die Netzwerkadresse bilden, paradoxerweise eher einfacher. Wir multiplizieren eigentlich einfach Bit um Bit die IP mit der Subnetmaske. Das ist eine logische UND-Operation, weil nur wenn **IP und Subnetmaske eine `1` haben**, ergibt sich in der Netzwerkadresse auch eine `1`.

Hier wird also ein logischer UND-Operator Bit für Bit angewandt. Deswegen heisst diese Operation **"Bitwise AND"** mit dem Zeichen **"&"**. Im Beispiel sieht man:
$$\text{Meine IP } \& \text{ Subnet-Maske} = \text{Netzwerkadresse}$$

Achten Sie sich nun auf die erste IP-Adresse `192.168.0.13`. Die Netzwerkadresse unterscheidet sich zu unserer (orangen) Netzwerkadresse bloss im letzten Bit des Netzwerkteils. 

Wenn wir unser Netzwerk grösser machen möchten, dass diese Adresse auch noch in unser Netzwerk gehört, müssten wir die Grenze zwischen Netzwerkteil und Hostteil in der Subnetmaske um ein Bit nach vorne verschieben. 

Überlegen Sie sich, was für eine Dezimalzahl Sie bei der Subnetmaske eingeben müssten, um das zu erzeugen.

> [!solution]- Lösung (unbedingt anschauen!)
> 
> Sie müssten die Subnetmaske zu `255.255.254` ändern. Alle IP-Adressen in den Bereichen `192.168.0.x` und `192.168.1.x` bilden nun dieselbe Netzwerkadresse: nämlich `192.168.0.0` 
> 
> ![[net-01-ip-20240612100442.png]]


![[net-01-ip-20240612102102.png]]


> [!example] Jetzt sind Sie dran
> 
> Versuchen Sie die IP-Adresse Ihres Geräts herauszufinden. Dazu finden Sie auf Google leicht eine Anleitung, z.B. `IP-Adresse finden Windows 10` oder `IP-Adresse finden Android`
