---
title: "02: Netzwerke und Router"
---

> [!success] Lernziele
> 
> - Sie können anhand einer IP und einer Subnetmaske den Adressbereich eines Netzwerks bilden.
> - Sie wissen, was ein Gateway / Router ist und wie er sich entscheidet, zu welchem Netzwerk ein Datenpaket gehört.

Das letzte Mal haben wir IP-Adressen, Subnetmasken und Netzwerkadressen kennengelernt. Nun schauen wir an, wie sich daraus die Grösse des Netzwerks ableitet, und was für ein Gerät den Datenverkehr zwischen verschiedenen Netzwerken hin- und herleitet.
## Netzwerkgrösse

[[net-01-ip|In der letzten Lektion]] haben wir gelernt, dass die Netzwerkadresse die tiefstmögliche Adresse eines Netzwerks ist, weil dort der Hostanteil per Definition 0 ist.

Entsprechend gibt es auch eine **höchste Andresse**, die ebenfalls zu keinem Gerät gehört: die sogenannte Broadcast-Adresse. Pakete an diese Adresse werden **an alle Geräte im Netzwerk gesendet**. 

Der Adressbereich zwischen der Netzwerkadresse und der Broadcastadresse kann für Geräte (Hosts) verwendet werden. Wie viele Hosts können also im Netzwerk `192.168.1.0` mit Subnetmaske `255.255.255.0` adressiert werden?

![[Pasted image 20240303145552.png]]


> [!question]- Lösung (unbedingt anschauen)
> 
> Der Hostteil ist das gesamte letzte Byte. Es gibt also 256 theoretisch mögliche Adressen, nämlich von `192.168.1.0` bis `192.168.1.255`. 
> 
> 256 ist genau die 2er-Potenz von 8 Bit ( = 1 Byte):
> 
> $$2^{8\text{ Host-Bit}} = 256\text{ Adressen}$$
> 
> Jetzt müssen Sie aber beachten, dass man Netzwerk- und Broadcastadresse nicht für Geräte verwenden darf. Also: 
> 
> $$2^{8\text{ Host-Bit}}-2\text{ reservierte Adressen} = 254\text{ nutzbare Hostadressen}$$
> 
> Diese zwei Adressen müssen Sie **immer** abziehen. Merken Sie sich generell:
> 
> $$2^{\text{Anzahl Host-Bit}}-2\text{ reservierte Adressen} = \text{Nutzbare Host-Adressen}$$

Sie können diese Logik interaktiv [[/assets/excel_router_task.xlsx|in dieser Exceldatei]] nachvollziehen.
### Binäres Verständnis
Stellen Sie sich vor wir würden den Hostteil wieder um ein Bit erweitern wie in der letzten Lektion. Die Subnetmaske wäre also `255.255.254.0` und die Netzwerkadresse wäre neu `192.168.0.0`. 

Wie viele Hosts könnten Sie in diesem Netzwerk adressieren?

> [!question]- Lösung
> 
> Sie haben nun 9 Bit für die Hostadressierung, minus Netzwerk- und Broadcastadresse. 
> 
> $$2^{9\text{ Host-Bit}}-2\text{ reservierte Adressen} = 510\text{ nutzbare Hostadressen}$$
> 
> Merken Sie sich generell:
> 
> $$2^{\text{Anzahl Host-Bit}}-2\text{ reservierte Adressen} = \text{Nutzbare Host-Adressen}$$

## Gateway / Router

Nun schauen wir uns an, was passiert, wenn Ihr Computer urteilt, dass sich die Ziel-IP in einem anderen Netzwerk befindet. In diesem Fall muss der Computer die Daten aus dem eigenen Netzwerk herausschicken - aber wie? Dazu ist meistens einen sogenannten **Gateway-IP-Adresse** definiert: Also eine Adresse, die als "Tor zur Welt" dient.

Die meisten Gateways sind sogenannte **Router**. Das sind spezielle Netzwerkgeräte, die gleichzeitig an mehreren Netzwerken angeschlossen sind und den Datenverkehr zwischen diesen Netzwerken hin- und herleiten. Man nennt sie Router, weil sie die "Routen" kennen.

Ihr Internetrouter zuhause beispielsweise ist an mindestens zwei Netzwerke angeschlossen:
- Ihr Heimnetzwerk mit allen Geräten.
- Ein kleines Netzwerk zwischen Ihrem Router und Ihrem Internet-Service-Provider (Swisscom, Sunrise...).

Router sind also selbst immer Teil der Netzwerke, an die sie angeschlossen sind. Schliesslich müssen die Geräte in diesem Netzwerke den Router ja erreichen können. Wie auch Ihr Computer haben Router **pro Netzwerkschnittstelle mindestens eine IP-Adresse und eine dazugehörige Subnetmaske**.

In unserer Schule oder bei Unternehmen gibt es meist mehrere Netzwerke. Wie wir das letzte Mal gesehen haben, gibt es an der Schule mehrere Wifis mit unterschiedlichen Netzwerken. Das könnte so aussehen.
![[netzwerk.svg]]

Wie entscheidet der Router nun, auf welche Schnittstelle er die Pakete weiterleitet? 

Grundsätzlich genau gleich, wie Ihr Computer entscheidet, ob eine Ziel-IP in seinem eigenen Netzwerk liegt oder nicht: 
- Er eruiert und merkt sich vorweg die Netzwerkadressen aller angeschlossenen Netzwerke.
- Dann schaut er mit der jeweiligen Subnetmaske der Netzwerke, ob die IP in einem der angeschlossenen Netzwerke liegt.
- Falls die Ziel-IP in keinem der angeschlossenen Netzwerken liegt, hat der Router (ähnlich des "Gateways") eine Standardroute, wie er Pakete an unbekannte Ziel-IPs weiterleitet.

Das wollen wir nun selbst in Excel testen.

> [!example] Glückwunsch: Sie sind ein Router!
> 
> Der Auftrag an Sie ist nun, dass Sie versuchen die Logik des Routers in Excel zu automatisieren. Stellen Sie sich vor, Sie sind ein Router und erhalten ein IP-Paket. Wie entscheiden Sie, an welches Netzwerk Sie das Paket weiterleiten sollen?
> 
> Laden Sie sich dazu die Datei [[/assets/excel_router_task.xlsx|excel_router_task.xlsx]] herunter.

Die Lektion an der Tafel:
- [[net-02-networks-G1b|G1b]]
- [[net-02-networks-G1j|G1j]]
- [[net-02-networks-G1i|G1i]]
- [[net-02-networks-F1b|F1b]]


> [!question]- Lösung
> 
> [[/assets/excel_router_solution.xlsx]]


[[net-01-ip|Zurück]]
[[net-03-ethernet|Weiter]]