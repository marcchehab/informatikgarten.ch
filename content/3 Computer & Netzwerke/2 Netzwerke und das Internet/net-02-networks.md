---
title: "02: Netzwerke und Router"
---
Das letzte Mal haben wir IP-Adressen und Subnetmasken kennengelernt. Daraus leitet sich direkt die Netzwerk-Adresse ab.
## Netzwerk-Adresse
Ähnlich wie die Ortsangabe "5430 Wettingen" addressiert die Netzwerkadresse kein bestimmtes Gerät, sondern meint einfach das Netzwerk als Ganzes. Man muss sich auch hier die Adressen wieder **binär überlegen**:

- Der Netzwerkteil der IPs wird übernommen.
- Der Hostteil ist 0.

Etwas technischer erklärt: Man kann eine beliebige IP eines Netzwerks mit der Subnetmaske binär Bit für Bit vergleich. 
Nur wenn bei der IP *und* bei der Subnetmaske eine 1 steht, schreibt man eine 1, sonst aber eine 0.

Hier wird also ein logischer AND-Operator Bit für Bit angewandt. Deswegen heisst diese Operation **"Bitwise AND"** mit dem Zeichen **"&"**. Im Beispiel sieht man:
$$\text{Meine IP } \& \text{ Subnet-Maske} = \text{Netzwerkadresse}$$

![[Pasted image 20240225234031.png]]

Die Logik für einen einzelnen Computer beim Versenden ist also relativ einfach:
- Errechnet sich mit der IP-Adresse des Empfängers die gleiche Netzwerkadresse, schickt der Computer das Paket direkt ins eigene Subnetz.
- Ansonsten schickt er das Paket an sein "Ausgangstor" - den Gateway.
## Router
Aber was ist das - ein Gateway? Typischerweise sind das spezielle Netzwerkgeräte, die gleichzeitig an mehreren Netzwerken angeschlossen sind und den Datenverkehr zwischen diesen Netzwerken hin- und herleiten. Weil sie also die "Routen" kennen, nennt man sie Router.

Ihr Internetrouter zuhause ist an mindestens zwei Netzwerke angeschlossen:
- Ihr Heimnetzwerk mit allen Geräten.
- Ein kleines Netzwerk zwischen Ihrem Router und Ihrem Internet-Service-Provider (Swisscom, Sunrise...).

Router sind also selbst immer Teil der Netzwerke, an die sie angeschlossen sind. Schliesslich müssen die Geräte in diesem Netzwerke den Router ja erreichen können.

In unserer Schule oder bei Unternehmen gibt es meist mehrere Netzwerke. Wie wir das letzte Mal gesehen haben, gibt es an der Schule mehrere Wifis mit unterschiedlichen Netzwerkadressen.
![[netzwerk.svg]]
> [!example] Glückwunsch: Sie sind ein Router!
> 
> Der Auftrag an Sie ist nun, dass Sie versuchen die Logik des Routers in Excel zu automatisieren. Stellen Sie sich vor, Sie sind ein Router und erhalten ein IP-Paket. Wie entscheiden Sie, an welches Netzwerk Sie das Paket weiterleiten sollen?
> 
> Laden Sie sich dazu die Datei [[/assets/excel_router_task.xlsx|excel_router_task.xlsx]] herunter.

.