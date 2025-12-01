---
title: Netzwerke und Router
---

> [!success] Lernziele
> 
> - Sie können anhand einer IP und einer Subnetmaske den Adressbereich eines Netzwerks bilden.
> - Sie wissen, was ein Gateway / Router ist und wie er sich entscheidet, zu welchem Netzwerk ein Datenpaket gehört.

Das letzte Mal haben wir IP-Adressen, Subnetmasken und Netzwerkadressen kennengelernt. Nun schauen wir an, wie sich daraus die Grösse des Netzwerks ableitet, und was für ein Gerät den Datenverkehr zwischen verschiedenen Netzwerken hin- und herleitet.
## Netzwerkgrösse

[In der letzten Lektion](net-01-ip) haben wir gelernt, dass die Netzwerkadresse die tiefstmögliche Adresse eines Netzwerks ist, weil dort der Hostanteil per Definition 0 ist.

Entsprechend gibt es auch eine **höchste Andresse**, die ebenfalls zu keinem Gerät gehört: die sogenannte Broadcast-Adresse. Pakete an diese Adresse werden **an alle Geräte im Netzwerk gesendet**.

Der Adressbereich zwischen der Netzwerkadresse und der Broadcastadresse kann für Geräte (Hosts) verwendet werden. Wie viele Hosts können also im Netzwerk `192.168.1.0{:text}` mit Subnetmaske `255.255.255.0{:text}` adressiert werden?

![[net-02-networks-20240612102725.png]]


> [!solution]- Lösung (unbedingt anschauen)
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

Sie können diese Logik interaktiv [in dieser Exceldatei](/assets/net/excel_router_task.xlsx) nachvollziehen.
### Binäres Verständnis (nicht Prüfungsstoff)
Stellen Sie sich vor wir würden den Hostteil wieder um ein Bit erweitern wie in der letzten Lektion. Die Subnetmaske wäre also `255.255.254.0` und die Netzwerkadresse wäre neu `192.168.0.0`. 

Wie viele Hosts könnten Sie in diesem Netzwerk adressieren?

> [!solution]- Lösung
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

### Standardroute (Default Route)

Die **Standardroute** ist der "Notausgang" eines Routers: Wenn ein Paket an eine Ziel-IP geht, die in keinem bekannten Netzwerk liegt, wird es an einen vordefinierten nächsten Router weitergeleitet. Dieser kennt vielleicht weitere Netzwerke oder hat selbst wieder eine Standardroute.

So entsteht eine Kette von Routern, die Pakete Schritt für Schritt weitergeben - bis sie schliesslich am Ziel ankommen. Das Internet funktioniert genau nach diesem Prinzip.

## Übungsaufgaben

### Aufgabe 1: Netzwerkgrösse bestimmen

Ein Netzwerk hat die Subnetmaske `255.255.255.0`. Wie viele Geräte (Hosts) können in diesem Netzwerk maximal adressiert werden?

> [!solution]- Lösung
>
> Bei der Subnetmaske `255.255.255.0` ist das letzte Byte (8 Bit) für den Hostanteil reserviert.
>
> $$2^{8\text{ Host-Bit}} - 2 = 256 - 2 = 254\text{ nutzbare Hostadressen}$$
>
> **Dezimaler Merksatz:** Ein Byte kann 256 verschiedene Werte annehmen (0-255). Minus die 2 reservierten Adressen ergibt das 254 nutzbare Hosts.
>
> Es können also **254 Geräte** adressiert werden.

### Aufgabe 2: Netzwerkgrösse bei anderer Subnetmaske

Ein Unternehmen benötigt ein Netzwerk für 500 Geräte. Die IT-Abteilung wählt die Subnetmaske `255.255.0.0`.

a) Wie viele Hosts können mit dieser Subnetmaske adressiert werden?

b) Ist diese Subnetmaske für 500 Geräte geeignet?

> [!solution]- Lösung
>
> a) Bei `255.255.0.0` sind die letzten zwei Bytes (16 Bit) für den Hostanteil reserviert.
>
> $$2^{16\text{ Host-Bit}} - 2 = 65'536 - 2 = 65'534\text{ nutzbare Hostadressen}$$
>
> **Tipp:** Man kann das auch dezimal rechnen: Ein Byte hat 256 mögliche Werte. Bei zwei Bytes sind es $256 \times 256 = 256^2 = 65'536$ Adressen.
>
> b) Ja, die Subnetmaske ist geeignet - sogar deutlich überdimensioniert. Für 500 Geräte würde auch eine kleinere Maske reichen, aber `255.255.0.0` funktioniert.

### Aufgabe 3: Netzwerkadresse bestimmen

Bestimmen Sie die Netzwerkadresse für folgende Kombinationen:

a) IP: `192.168.5.42`, Subnetmaske: `255.255.255.0`

b) IP: `10.20.30.40`, Subnetmaske: `255.255.0.0`

c) IP: `172.16.100.200`, Subnetmaske: `255.0.0.0`

> [!solution]- Lösung
>
> Die Netzwerkadresse ergibt sich, indem man den Hostanteil auf 0 setzt:
>
> a) Hostanteil ist das letzte Byte → Netzwerkadresse: **`192.168.5.0`**
>
> b) Hostanteil sind die letzten zwei Bytes → Netzwerkadresse: **`10.20.0.0`**
>
> c) Hostanteil sind die letzten drei Bytes → Netzwerkadresse: **`172.0.0.0`**

### Aufgabe 4: Broadcast-Adresse bestimmen

Bestimmen Sie die Broadcast-Adresse für folgende Kombinationen:

a) IP: `192.168.5.42`, Subnetmaske: `255.255.255.0`

b) IP: `10.20.30.40`, Subnetmaske: `255.255.0.0`

c) IP: `172.16.100.200`, Subnetmaske: `255.0.0.0`

> [!solution]- Lösung
>
> Die Broadcast-Adresse ergibt sich, indem man den Hostanteil auf den Maximalwert (255) setzt:
>
> a) Hostanteil ist das letzte Byte → Broadcast: **`192.168.5.255`**
>
> b) Hostanteil sind die letzten zwei Bytes → Broadcast: **`10.20.255.255`**
>
> c) Hostanteil sind die letzten drei Bytes → Broadcast: **`172.255.255.255`**

### Aufgabe 5: Adressbereich bestimmen

Ein Gerät hat die IP `10.50.0.100` mit der Subnetmaske `255.255.0.0`.

a) Was ist die Netzwerkadresse?

b) Was ist die Broadcast-Adresse?

c) Welche IP-Adressen können für Geräte verwendet werden?

> [!solution]- Lösung
>
> a) Netzwerkadresse: **`10.50.0.0`** (Hostanteil auf 0)
>
> b) Broadcast-Adresse: **`10.50.255.255`** (Hostanteil auf Maximum)
>
> c) Nutzbare Hostadressen: **`10.50.0.1`** bis **`10.50.255.254`**
>
> Das sind $256^2 - 2 = 65'534$ nutzbare Adressen (zwei Host-Bytes à 256 Werte, minus 2 reservierte).

### Aufgabe 6: Gleiches Netzwerk?

Prüfen Sie, ob die folgenden Geräte im gleichen Netzwerk sind:

a) Gerät A: `192.168.1.10`, Gerät B: `192.168.1.200` - beide mit Subnetmaske `255.255.255.0`

b) Gerät A: `10.0.1.5`, Gerät B: `10.0.2.5` - beide mit Subnetmaske `255.255.255.0`

c) Gerät A: `172.16.5.100`, Gerät B: `172.16.200.50` - beide mit Subnetmaske `255.255.0.0`

> [!solution]- Lösung
>
> Zwei Geräte sind im gleichen Netzwerk, wenn sie die gleiche Netzwerkadresse haben:
>
> a) Netzwerkadresse A: `192.168.1.0`, Netzwerkadresse B: `192.168.1.0` → **Ja, gleiches Netzwerk**
>
> b) Netzwerkadresse A: `10.0.1.0`, Netzwerkadresse B: `10.0.2.0` → **Nein, verschiedene Netzwerke**
>
> c) Netzwerkadresse A: `172.16.0.0`, Netzwerkadresse B: `172.16.0.0` → **Ja, gleiches Netzwerk**

### Aufgabe 7: Router-Entscheidung

Ein Router ist an drei Netzwerke angeschlossen:

| Schnittstelle | Netzwerkadresse | Subnetmaske |
|---------------|-----------------|-------------|
| eth0 | `192.168.1.0` | `255.255.255.0` |
| eth1 | `192.168.2.0` | `255.255.255.0` |
| eth2 | `10.0.0.0` | `255.0.0.0` |
| eth3 (Standardroute) | - | - |

An welche Schnittstelle leitet der Router Pakete mit folgenden Ziel-IPs weiter?

a) `192.168.1.50`

b) `192.168.2.200`

c) `10.100.50.25`

d) `172.16.5.10`

> [!solution]- Lösung
>
> Der Router prüft für jede Ziel-IP, in welchem seiner Netzwerke sie liegt:
>
> a) `192.168.1.50` → Netzwerkadresse `192.168.1.0` → **eth0**
>
> b) `192.168.2.200` → Netzwerkadresse `192.168.2.0` → **eth1**
>
> c) `10.100.50.25` → Netzwerkadresse `10.0.0.0` → **eth2**
>
> d) `172.16.5.10` → Liegt in keinem der angeschlossenen Netzwerke → **eth3 (Standardroute)**

### Aufgabe 8: Netzwerkplanung

Sie planen ein kleines Firmennetzwerk mit drei Abteilungen:
- Buchhaltung: 20 Geräte
- Entwicklung: 50 Geräte
- Vertrieb: 10 Geräte

Alle Abteilungen sollen eigene Netzwerke mit der Subnetmaske `255.255.255.0` erhalten.

a) Reicht die Subnetmaske für alle Abteilungen aus?

b) Definieren Sie je eine Netzwerkadresse für jede Abteilung.

> [!solution]- Lösung
>
> a) Bei `255.255.255.0` gibt es 254 nutzbare Hostadressen pro Netzwerk. Das reicht für alle Abteilungen aus (20, 50 und 10 sind alle kleiner als 254). **Ja, die Subnetmaske reicht.**
>
> b) Mögliche Netzwerkadressen (es gibt viele richtige Lösungen):
> - Buchhaltung: `192.168.1.0`
> - Entwicklung: `192.168.2.0`
> - Vertrieb: `192.168.3.0`
>
> Wichtig ist, dass jede Abteilung eine **eigene** Netzwerkadresse hat.
