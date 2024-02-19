---
title: "L01: IP - wie adressieren Sie Computer und Dienste im Netzwerk?"
---
Der Schlüssel, um Netzwerkkommunikation zu verstehen, steckt in zwei Ideen:
1. Informationen werden in einer **Serie von Paketen** transportiert.
2. Jedes dieser Pakete wird durch **hierarchisch angeordnete Schichten mehrfach verpackt**.

Als Analogie stellen Sie sich den Paketversand der Post vor. Eine Adresse könnte z.B. so aussehen:

```
Marc Chéhab
Lehrerstrasse 3
8000 Zürich
```

Auch in dieser Adresse gibt es hierarchisch angeordnete Schichten. 

* Die Paketzentrale der Post orientiert sich an Linie 3, dem **Ort**. 
* Die Poststelle vor Ort liefert das Paket an die Adresse in Linie 2, also ins richtige **Gebäude**.
* Auf Linie 1 ist angegeben, **für wen im Gebäude** das Paket ist.
## Schritt 1: Wie weiss man, wohin wir ein Paket schicken müssen?

Wie Sie sich mit diesen wenigen Infos bereits vorstellen können, hat Ihr Computer eine Hauptadresse. Das ist die **Adresse des "Internet Protokolls", oder kurz: IP**. Einige Beispiele für IP-Adressen:

```
192.168.1.4
10.32.4.12
243.123.129.45
88.210.255.25
```

> [!question]- Wie würden Sie diese Zahlen beschreiben? Was ist die grösste einzelne Zahl, die Sie finden?
> 
> - Es sind jeweils vier Zahlen durch Punkte getrennt.
> - Die höchste Zahl ist 255 - das ist verdächtig...

Bei Ihnen zuhause könnten mögliche IP-Adressen so aussehen:

```
192.168.1.5
192.168.1.41
192.168.1.53
```

Sie sehen: Der **erste Teil aller IP-Adressen ist gleich**, weil alle Computer im **gleichen Netzwerk** sind. Das ist wie bei der Post **Ortsangabe**.
![[network-host.excalidraw]]

Wie lang der Netzwerkteil der Adresse ist wird durch die **Subnetmaske** angegeben. Hier wäre Sie <span style="color:red">255.255.255</span><span style="color:green">.0</span>. Die Subnetmaske ist im Netzwerkteil 255, im Hostteil dann 0.

Als Beispiel meine IP-Adresse zuhause.

![[Pasted image 20230612211154.png]]

Die Logik mit der **Subnetmaske müssen Sie binär verstehen**. Wir schauen das zusammen im Schulnetz an.

> [!example] Jetzt sind Sie dran
> 
> Versuchen Sie die IP-Adresse Ihres Geräts herauszufinden. Dazu finden Sie auf Google leicht eine Anleitung, z.B. `IP-Adresse finden Windows 10` oder `IP-Adresse finden Android`

Wenn Ihr Computer zuhause ein Paket verschickt, überprüft er zuerst, ob sich der Empfänger im gleichen Netzwerk bei Ihnen zuhause befindet.
- Falls ja, schickt er das Paket direkt an den Empfänger.
- Falls nein, schickt er das Paket an die Adresse des "Gateway". Das ist ein Gerät, das als Eingangs- oder Ausgangstor des Netzwerks dienst. Bei Ihnen zuhause wäre das der Internetrouter, der die Daten an Swisscom oder Sunrise weiterleitet... Und wie es dann weitergeht schauen wir später an.
## Und an welcher Tür klopfe ich an?

Wie bei der Post muss man neben dem Ziel-Computer noch genauer angeben, "wer" oder "was" die Daten erhalten soll. Das geschieht mit dem sogennanten **"Port" - also welche "Tür"**.

Internet-Protokolls gibt es auch eine Art, auf demselben Computer das richtige Protokoll (also den richtigen Dienstleister) anzusprechen: nämlich den **Port**. Wenn Sie im Internet Surfen, verbinden Sie sich ständig mit Webservern, die typischerweise auf **Port 80 (HTTP)** oder **443 (HTTPS)** laufen. Der Port wird oft mit einem Doppelpunkt nach der IP angegeben, z.B.

```
192.168.1.4:80 = Ich möchte den HTTP-Server auf dieser Maschine
192.168.1.4:443 = Ich möchte den HTTPS-Server auf dieser Maschine
```

Weitere übliche Ports finden Sie [hier auf Wikipedia](https://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers#Well-known_ports).

> [!note] Ein Versuch
> 
> Ich lasse auf meinem Laptop einen Webserver laufen. Meine IP-Adresse und den Port sage ich Ihnen in der Lektion. Versuchen Sie mal, die Webseite aufzurufen!


[[net-00-intro|Zurück zum Intro]]
