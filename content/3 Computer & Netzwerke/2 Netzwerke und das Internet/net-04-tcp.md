---
title: "04: TCP - alle Pakete in der richigen Reihenfolge an die richtige Person"
---
> [!success] Lernziele
> 
> - Sie kennen die Aufgaben der vier Schichten des TCP/IP-Referenzmodells.
> - Sie können beschreiben, was für ein Problem die Transportschicht löst und was Ports sind.
> - Sie kennen den Unterschied zwischen Server und Client.
> - Sie können einige wichtige Protokolle den Schichten des TCP/IP-Referenzmodells zuordnen, namentlich: Ethernet, Wi-Fi, IP, TCP, UDP, HTTPS, DHCP.
> - Sie müssen die Namen der Schichten _nicht_ auswendig lernen.
> - Sie müssen *keine* Port-Nummern auswendig lernen.
> - Sie müssen *nicht* wissen, wie genau HTTPS oder DHCP funktionieren, das sind bloss Beispiele.

Wir haben bislang zwei von vier Schichten des TCP/IP-Referenzmodells kennengelernt. Wir haben gesehen, wie sich eine **Hierarchie aus Abstraktionsschichten** bildet, die Ordnung schafft und klare Verantwortungen zuweist. Höhere Schichten verlassen sich darauf, dass die Schichten darunter korrekt implementiert wurden. 

Es gibt ein generelles, abstraktes 7-Schichtenmodell für die Netzwerkkommunikation ([das OSI-Modell](https://de.wikipedia.org https://de.wikipedia.org/wiki/OSI-Modell#Die_sieben_Schichten)). Wir lernen hier das in der Praxis nützlichere TCP/IP-Referenzmodell, das das OSI-Modell (links) auf vier Schichten zusammenfasst (Mitte).
![[net-04-tcp tcpip-modell.excalidraw]]

## Das Transmission Control Protocol (TCP)

Mit dem Internetprotokoll können wir grundsätzlich bereits Pakete zwischen zwei Computern auf dem ganzen Planeten hin- und herschicken. Das ist toll, aber: 
- Wenn eine Datei in Teile **zerstückelt** wird, wie wissen wir, dass wir am anderen Ende alle Teile erhalten und wieder **richtig zusammengesetzt** haben?
- Wenn **mehrere Programme** auf einem Computer Daten verschicken und empfangen können, wie stellen wir sicher, dass die richtigen Programme ihre Daten empfangen?
- Wie bauen wir eine **Verbindung** auf, die über mehrere Pakete hinweg bestehen bleibt? 

Das sind Probleme, die die **Transportschicht** löst und meist wird dazu das Transmission Control Protocol (TCP) benutzt. Es regelt die grundlegenden Operationen der Verbindung: Verbindungsaufbau, Datenaustausch, Zustellung ans richtige Programm, und ein geregeltes Verbindungsende. 

> [!NOTE]- Verbindungsaufbau mit einem TCP-Handshake (optional, nur falls es Sie interessiert)
> 
> Sagen wir ein Browser (Client) möchte eine Verbindung mit einem Webserver aufbauen.
> 
> - **Schritt 1 - SYN:** Der Client sendet ein SYN-Paket (Synchronize) an den Server, um eine Verbindung anzufordern. Dieses Paket enthält eine zufällige Sequenznummer A.
> - **Schritt 2 - SYN-ACK:** Der Server antwortet mit einem SYN-ACK-Paket (Synchronize-Acknowledge). Dieses Paket enthält eine eigene zufällige Sequenznummer B und bestätigt den Empfang des SYN-Pakets des Clients durch Erhöhung von A um 1.
> - **Schritt 3 - ACK:** Der Client sendet ein ACK-Paket (Acknowledge) zurück an den Server, um den Empfang des SYN-ACK-Pakets zu bestätigen. Dies geschieht durch Erhöhung von B um 1.
> 
> Diesen Prozess nennt man einen TCP-Handshake. Nach diesen drei Schritten ist die TCP-Verbindung hergestellt und beide Stellen können sich relativ sicher sein, dass sie tatsächlich miteinander kommunizieren. Nun können sie Daten ausgetauschen. 
> 
> Der Verbindungsabbruch funktioniert übrigens analog.

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

## UDP - verbindungslose Übertragung

Im Vergleich zu TCP ist das Protokoll UDP einfacher: Es merkt sich keine Verbindung und verifiziert auch nicht, ob Pakete angekommen sind. UDP ermöglicht so eine schnelle, verbindungslose Kommunikation, da es keine Handshakes für Verbindungsbestätigungen durchführt. Es ist ideal für Anwendungen, bei denen Geschwindigkeit wichtiger ist als Zuverlässigkeit, wie z.B. Live-Streaming oder Online-Spiele. UDP bietet keine Garantie für die Reihenfolge der Pakete, sie können in beliebiger Reihenfolge ankommen.

UDP kennt einzig **Ports** und eine Art, um fehlerhafte Pakete zu erkennen.
## Server-Client-Verbindung
Die meisten Netzwerkverbindungen werden zwischen einem Server-Programm und einem Client-Programm aufgebaut.
- Das **Server**-Programm läuft immer und wartet, bis jemand mit ihm eine Verbindung aufbauen will. Ein Webserver wie informatikgarten.ch läuft immer, egal ob Sie gerade hier sind oder nicht. Es steht immer in den Ports 443 (reserviert für HTTPS) und 80 (reserviert für das alte, unverschlüsselte HTTP).
- Ein **Client**-Programm baut dann eine Verbindung mit dem Server auf, wann immer es will. Ihr Internet-Browser, in dem Sie diese Webseite anschauen, ist ein Client-Programm. Wenn Sie informatikgarten.ch aufrufen, wählt der Browser automatisch irgendeinen Port im Client-Bereich und nutzt ihn für die Verbindung mit dem Webserver informatikgarten.ch. Sobald Sie den Browser schliessen, beendet der Browser die Verbindung und damit den Port - aber der Server läuft natürlich weiter.

> [!NOTE]- "Server" - Ist das eine Maschine oder ein Programm?
> 
> Ein kleiner Hinweis: "Server" kann sowohl das Server-Programm meinen, das ständig läuft, oder den Computer, auf dem das Programm ständig läuft. Es gibt spezielle Server-Computer, die oft in einem klimatisierten Server-Raum in 19-Zoll-Schränke eingebaut werden und dazu gemacht sind, immer zu laufen.
> 
> ![[Pasted image 20240315103938.png]]

## Die Anwendungsschicht
Mit diesem Beispiel sind wir bereits in der Anwendungsschicht. Die ersten drei Schichten des TCP/IP-Modells lösen die gesamte Netzwerklogik für die Programme, die eine Verbindung für eine gewisse Anwendung aufbauen wollen. Die Programme müssen sich nicht mehr um die grundlegende Logik der Netzwerkverbindung kümmern.
![[net-04-tcp tcpip-modell.excalidraw]]

### Beispiel 1: HTTPS/HTTP

Aber eine Anwendung kann ja in sich selbst durchaus komplex sein: Denken Sie nur an diese Webseite. Sie erhalten eine interaktive, grafische Anwendung serviert und alles funktioniert (hoffentlich) einwandfrei. Dafür müssen mein Webserver und Ihr Browser (Client) sich über ganz viele Dinge einig sind:
- Wie soll der Client nach Dateien fragen?
- Wie soll der Server die Dateien schicken?
- Wie soll der Client Informationen an der Server schicken?
- Wie wird das ganze verschlüsselt, damit nicht alle mithören können (bei HTTPS)?

Das ist einfach ein Beispiel des Hypertext Transfer Protocol (HTTPS/HTTP). Es ist ein Anwendungsprotokoll, weil es spezifisch für eine Anwendung gemacht wurde: Hypertext (z.B. HTML) im Internet austauschen.

### Beispiel 2: DHCP
Eine weitere Anwendung, die für Sie tagtäglich gute Dienste verrichtet, ist DHCP. Das ist das Protokoll, das Sie gebrauchen, um automatische IP-Adressen zu erhalten.

Aber Moment! Wie können Sie etwas verschicken *bevor* Sie eine IP-Adresse haben? Mit "absoluten" Broadcast-Adressen und UDP.

Wenn Sie Ihren Computer an ein Ihm unbekanntes Netzwerk hängen und keine IP-Adresse konfiguriert ist, verschickt er folgendes Paket:

![[net-04-tcp 2024-03-15 11.53.07.excalidraw]]

1. Diese Nachricht, genannt "Discover", geht theoretisch an alle Geräte im lokalen Netzwerk. 
2. Typischerweise existiert ein DHCP-Server im Netzwerk, der dann eine IP-Adresse über die Broadcast-Adresse des Netzwerks anbietet (eine "Offer"). Das Paket beinhaltet je nach Anfrage auch Subnetmaske, Gateway, DNS-Serveradressen, etc. 
3. Ihr Computer sollte dann überprüfen ob die offerierte IP-Adresse tatsächlich frei ist. Falls ja, beansprucht er über Broadcast diese Adresse beim DHCP-Server ("Request").
4. Der DHCP-Server bestätigt zum Schluss, dass Sie die Adresse immer noch haben dürfen und reserviert die IP-Adresse für Sie. 

Diesen Austausch habe ich bei mir zuhause mit einem Netzwerk-Paket-Sniffer aufgezeichnet:
![[net-04-tcp 2024-03-15 12.49.32.excalidraw]]

