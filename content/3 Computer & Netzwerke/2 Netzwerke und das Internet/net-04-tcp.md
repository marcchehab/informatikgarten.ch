---
title: "04: TCP - alle Pakete in der richigen Reihenfolge an die richtige Person"
---
> [!success] Lernziele
> 
> - Sie kennen die Aufgaben der vier Schichten des TCP/IP-Referenzmodells.
> - Sie können einige wichtige Protokolle den Schichten des TCP/IP-Referenzmodells zuordnen, namentlich: Ethernet, Wi-Fi, IP, TCP, UDP, HTTPS, DHCP.
> - Sie müssen die Namen der Schichten _nicht_ auswendig lernen.

Wir haben bislang zwei von vier Schichten des TCP/IP-Referenzmodells kennengelernt. Wir haben gesehen, wie sich eine **Hierarchie aus Abstraktionsschichten** bildet, die Ordnung schafft und klare Verantwortungen zuweist. Höhere Schichten verlassen sich darauf, dass die Schichten darunter korrekt implementiert wurden. 

Es gibt ein generelles, abstraktes 7-Schichtenmodell für die Netzwerkkommunikation ([das OSI-Modell](https://de.wikipedia.org https://de.wikipedia.org/wiki/OSI-Modell#Die_sieben_Schichten)). Wir lernen hier das in der Praxis nützlichere TCP/IP-Referenzmodell, das das OSI-Modell (links) auf vier Schichten zusammenfasst (Mitte).

![[net-04-tcp 2024-03-14 14.46.46.excalidraw]]

## Das Transmission Control Protocol (TCP)

Mit dem Internetprotokoll können wir grundsätzlich bereits Pakete zwischen zwei Computern auf dem ganzen Planeten hin- und herschicken. Das ist toll, aber: 
- Wenn eine grosse Datei in Teile zerstückelt und verpackt wird, wie wissen wir, dass wir alle Teile erhalten und richtig zusammengesetzt haben?
- Wenn mehrere Programme auf einem Computer Daten verschicken und empfangen können, wie stellen wir sicher, dass die richtigen Programme ihre Daten empfangen?
- Wenn wir Tausende einzelner Pakete erhalten, wie wird daraus eine echte "Verbindung"? 

Das sind Probleme, die die **Transportschicht** löst und allermeist das Transmission Control Protocol TCP. 

- **Schritt 1 - SYN:** Der Client sendet ein SYN-Paket (Synchronize) an den Server, um eine Verbindung anzufordern. Dieses Paket enthält eine zufällige Sequenznummer A.

- **Schritt 2 - SYN-ACK:** Der Server antwortet mit einem SYN-ACK-Paket (Synchronize-Acknowledge). Dieses Paket enthält eine eigene zufällige Sequenznummer B und bestätigt den Empfang des SYN-Pakets des Clients durch Erhöhung von A um 1.

- **Schritt 3 - ACK:** Der Client sendet ein ACK-Paket (Acknowledge) zurück an den Server, um den Empfang des SYN-ACK-Pakets zu bestätigen. Dies geschieht durch Erhöhung von B um 1.

Nach diesen drei Schritten ist die TCP-Verbindung hergestellt und Daten können zwischen Client und Server ausgetauscht werden.

Das Tolle an TCP ist, dass es sicherstellt, dass alle Pakete sicher ankommen. Es hält eine Liste aller gesendeten Pakete und überprüft, ob sie am Zielort angekommen sind. Wenn ein Paket verloren geht (ja, das passiert manchmal im Internet!), bittet TCP darum, es erneut zu senden. 

Sobald alle Pakete angekommen sind, setzt TCP sie wieder zusammen, um die ursprüngliche Nachricht zu rekonstruieren. So kannst du sicher sein, dass deine Nachricht genau so ankommt, wie du sie gesendet hast!

