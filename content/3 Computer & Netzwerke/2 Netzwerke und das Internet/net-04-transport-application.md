---
title: "04: Transport- und Anwendungsschicht"
---
> [!success] Lernziele
> 
> - Sie kennen die Aufgaben der vier Schichten des TCP/IP-Referenzmodells.
> - Sie können beschreiben, welches Problem die Transport-Schicht löst und was Ports sind.
> - Sie kennen den Unterschied zwischen Server und Client.
> - Sie können einige wichtige Protokolle den Schichten des TCP/IP-Referenzmodells zuordnen, namentlich: Ethernet, Wi-Fi, IP, TCP, HTTP/HTTPS.
> 
> ## Was nicht
> - Sie müssen das OSI-Modell _nicht_ auswendig lernen.
> - Sie müssen *keine* Port-Nummern auswendig lernen.
> - Sie müssen *nicht* wissen, wie genau HTTPS oder DHCP funktionieren, das sind bloss Beispiele.

Wir haben bislang zwei von vier Schichten des TCP/IP-Referenzmodells kennengelernt. Wir haben gesehen, wie sich eine **Hierarchie aus Abstraktionsschichten** bildet, die Ordnung schafft und klare Verantwortungen zuweist. Höhere Schichten verlassen sich darauf, dass die Schichten darunter korrekt implementiert wurden. 

Es gibt ein generelles, abstraktes 7-Schichtenmodell für die Netzwerkkommunikation ([das OSI-Modell](https://de.wikipedia.org/wiki/OSI-Modell#Die_sieben_Schichten)). Wir lernen hier das in der Praxis nützlichere TCP/IP-Referenzmodell, das das OSI-Modell (links) auf vier Schichten zusammenfasst (Mitte).
![[net-04-tcp tcpip-modell.excalidraw]]

## Transportschicht

### Das Transmission Control Protocol (TCP)

Mit dem Internetprotokoll können wir grundsätzlich bereits Pakete zwischen zwei Computern auf dem ganzen Planeten hin- und herschicken. Das ist toll, aber: 
- Wie bauen wir eine **Verbindung** auf, die über mehrere Pakete hinweg bestehen bleibt? 
- Wenn eine Datei in Teile **zerstückelt** wird, wie wissen wir, dass wir am anderen Ende **alle Teile erhalten** und wieder richtig zusammengesetzt haben?
- Wenn **mehrere Programme** auf einem Computer Daten verschicken und empfangen können, wie stellen wir sicher, dass die richtigen Programme ihre Daten empfangen?

Das sind Probleme, die das Transmission Control Protocol (TCP) löst. Es regelt die grundlegenden Operationen der Verbindung: Verbindungsaufbau, Datenaustausch, Zustellung ans richtige Programm, und ein geregeltes Verbindungsende.

> [!NOTE]- Details zu TCP-Handshake & Datenaustausch (optional, nur falls es Sie interessiert)
> 
> Sagen wir ein Browser (Client) möchte eine Verbindung mit einem Webserver aufbauen.
> 
> - **Schritt 1 - SYN:** Der Client sendet ein SYN-Paket (Synchronize) an den Server, um eine Verbindung anzufordern. Dieses Paket enthält eine zufällige Sequenznummer A.
> - **Schritt 2 - SYN-ACK:** Der Server antwortet mit einem SYN-ACK-Paket (Synchronize-Acknowledge). Dieses Paket enthält eine eigene zufällige Sequenznummer B und bestätigt den Empfang des SYN-Pakets des Clients durch Erhöhung von A um 1.
> - **Schritt 3 - ACK:** Der Client sendet ein ACK-Paket (Acknowledge) zurück an den Server, um den Empfang des SYN-ACK-Pakets zu bestätigen. Dies geschieht durch Erhöhung von B um 1.
> 
> Diesen Prozess nennt man einen TCP-Handshake. Nach diesen drei Schritten ist die TCP-Verbindung hergestellt und beide Stellen können sich sicher sein, dass sie tatsächlich miteinander kommunizieren. 
> 
> Nun können sie Daten ausgetauschen. Sie nutzen dabei die Werte von **SYN** und **ACK** weiter, um mitzuzählen und zu bestätigen, **wie viele Bytes gesendet und empfangen wurden**.

Am sichtbarsten für Nutzer ist TCPs Art, den Netzwerkverkehr verschiedener Programme auf demselben Computer zu unterscheiden. Bei unserer Postanalogie ist die Idee ähnlich dem Namen über einer Adresse: Mit der Adresse (IP) haben wir das richtige Haus (Gerät/Host) gefunden, nun müssen wir die richtige Person (Programm) in diesem Haus finden.

```
Marc Chéhab
Lehrerstrasse 3
8000 Zürich
```

TCP nutzt dazu nicht die Namen der Programme, sondern sogenannte **Ports**. Das sind 2-Byte-lange Nummern (also von 0 bis 65'535), die **verschiedene Türen** an Ihrem Computer sein könnten. Um über einer dieser Ports Daten zu senden oder zu empfangen, steht ein Programm quasi in die Tür und reserviert diesen Port.

![[net-04-tcp 2024-03-15 09.26.01.excalidraw]]

Die Portnummern können Sie frei bestimmen, aber folgende Regeln gelten im Internet:
- 0-1023 sind reserviert für etablierte Anwendungen wie HTTPS (Webserver), SMTP/POP (Email), SSH (Kommandozeile), etc.
- 1024-49151 sind für Server-Applikationen vorgesehen (z.B. ein Game-Server),
- 49152-65535 sind für Client-Applikationen vorgesehen (z.B. ein Browser oder Game-Client).

### UDP - verbindungslose Übertragung (optional)

Im Vergleich zu TCP ist das Protokoll UDP einfacher: Es merkt sich keine Verbindung und verifiziert auch nicht, ob Pakete angekommen sind. UDP ermöglicht so eine schnelle, verbindungslose Kommunikation, da es keine Handshakes für Verbindungsbestätigungen durchführt. Es ist ideal für Anwendungen, bei denen Geschwindigkeit wichtiger ist als Zuverlässigkeit, wie z.B. Live-Streaming oder Online-Spiele. UDP bietet keine Garantie für die Reihenfolge der Pakete, sie können in beliebiger Reihenfolge ankommen.

UDP kennt einzig **Ports** und eine Art, um fehlerhafte Pakete zu erkennen.
## Server-Client-Verbindung
Die meisten Netzwerkverbindungen werden zwischen einem Server-Programm und einem Client-Programm aufgebaut.
- Das **Server**-Programm **läuft immer** und wartet, bis jemand mit ihm eine Verbindung aufbauen will. Ein **Webserver** wie informatikgarten.ch läuft immer, egal ob Sie gerade hier sind oder nicht. Es steht immer in den Ports 443 (reserviert für HTTPS) und 80 (reserviert für das alte, unverschlüsselte HTTP).
- Ein **Client**-Programm **läuft nicht immer** und baut dann eine Verbindung mit dem Server auf, wenn er benötigt wird. Ihr **Internet-Browser**, in dem Sie diese Webseite anschauen, ist ein Client-Programm. Wenn Sie informatikgarten.ch aufrufen, wählt der Browser automatisch irgendeinen Port im Client-Bereich und nutzt ihn für die Verbindung mit dem Webserver informatikgarten.ch. Sobald Sie den Browser schliessen, beendet der Browser die Verbindung und damit den Port - aber der Server läuft natürlich weiter.

> [!NOTE]- "Server" - Ist das eine Maschine oder ein Programm?
> 
> Ein kleiner Hinweis: "Server" kann sowohl das Server-Programm meinen, das ständig läuft, oder den Computer, auf dem das Programm ständig läuft. Es gibt spezielle Server-Computer, die oft in einem klimatisierten Server-Raum in 19-Zoll-Schränke eingebaut werden und dazu gemacht sind, immer zu laufen.
> 
> ![[Pasted image 20240315103938.png]]

## Die Anwendungsschicht
Mit diesem Beispiel sind wir bereits in der Anwendungsschicht. Die ersten drei Schichten des TCP/IP-Modells lösen die gesamte Verbindungslogik für die Programme, die eine Verbindung für eine gewisse Anwendung aufbauen wollen. Die Programme müssen sich also nicht mehr um die grundlegende Logik der Netzwerkverbindung kümmern.

Nun gibt es **viele verschiedene Anwendungen**: Schauen Sie eine Webseite an? Ein Videocall? Ein Multiplayer-Spiel? All das sind **Anwendungen, die definieren müssen, was für Informationen sie wie austauschen**. Mehr müssen Sie sich dazu nicht merken.

Wir schauen uns zwei Beispiele an, aber **wir konzentrieren uns auf die unteren drei Schichten**!
### Beispiel 1: HTTP/HTTPS
![[net-04-tcp tcpip-http.excalidraw]]

HTTP oder HTTPS regelt, wie Dateien und Informationen einer Webseite zwischen Ihrem Webbrowser (Client) und einem Webserver (Server) ausgetauscht werden. 

HTTP steht dabei für "**Hypertext Transfer Protokoll**". HTTPS ist dasselbe, einfach verschlüsselt (S für "Secure"). Beide nutzen TCP/IP um Webseiten (sogenannten Hypertext, z.B. HTML) im Internet austauschen.

Ein Paket, das Ihr Webbrowser an den Server sendet, könnte dann so aussehen:

![[net-04-tcp http.excalidraw]]

Achten Sie auf die Transport-Ebene und die Port-Nummern:
- Für einen Webserver mit HTTP ist standardmässig Port 80 reserviert, für HTTPS wäre es Port 443. 
- Der Webbrowser (Client) hat sich einfach einen zufälligen Client-Port ausgesucht und hat 53'152 erwischt.

### Beispiel 2: DHCP (optional)
![[net-04-tcp tcpip-dhcp.excalidraw]]

Eine weitere Anwendung, die für Sie tagtäglich gute Dienste verrichtet, ist DHCP. Das ist das Protokoll, das Sie gebrauchen, **um automatische IP-Adressen zu erhalten**.

Aber Moment! Wie können Sie etwas verschicken und erhalten *bevor* Sie eine IP-Adresse haben? 

Die Antwort ist folgende: Im lokalen Netzwerk kann man allein mit der Netzzugangsschicht und der Broadcast-MAC-Adresse FF:FF:FF:FF:FF:FF theoretisch alle Geräte im Netzwerk erreichen. Als IP nutzen wir die "netzwerklose" Broadcast-Adresse 255.255.255.255, und als Absender nichts (0.0.0.0). Und wir nutzen UDP, weil wir ohne IP sowieso keine TCP-Verbindung aufbauen könnten.

Wenn Sie Ihren Computer an ein unbekanntes Netzwerk hängen und keine IP-Adresse vorkonfiguriert ist, verschickt er also folgendes Paket ans gesamte Netzwerk:

![[net-04-tcp 2024-03-15 11.53.07.excalidraw]]

1. Diese Nachricht, genannt "Discover", geht theoretisch an alle Geräte im lokalen Netzwerk. 
2. Typischerweise existiert ein DHCP-Server im Netzwerk, der diese Nachricht erhält und ebenfalls über diese Broadcast-Adressen eine IP-Adresse anbietet (eine "Offer"). Die Offer beinhaltet je nach Anfrage Subnetmaske, Gateway, DNS-Serveradressen, Reservationszeitraum (Lease-Time), etc. 
3. Ihr Computer sollte dann überprüfen, ob die offerierte IP-Adresse tatsächlich frei ist. Falls ja, beansprucht er über Broadcast diese Adresse beim DHCP-Server ("Request").
4. Der DHCP-Server bestätigt zum Schluss, dass Sie die Adresse immer noch haben dürfen und reserviert die IP-Adresse für Sie.

Diesen Austausch habe ich bei mir zuhause mit einem Netzwerk-Paket-Sniffer aufgezeichnet:
![[net-04-tcp 2024-03-15 12.49.32.excalidraw]]

## Abschliessender Überblick
*Hier folgt noch ein Video.*

![[net-04-transport-application 2024-03-17 17.22.11.excalidraw]]