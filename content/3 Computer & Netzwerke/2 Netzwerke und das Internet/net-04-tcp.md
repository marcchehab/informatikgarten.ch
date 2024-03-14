---
title: "04: TCP - alle Pakete in der richigen Reihenfolge an die richtige Person"
---
> [!success] Lernziele
> 
> - Sie kennen die Aufgaben der vier Schichten des TCP/IP-Referenzmodells.
> - Sie können einige wichtige Protokolle den Schichten des TCP/IP-Referenzmodells zuordnen, namentlich: Ethernet, Wi-Fi, IP, TCP, UDP, HTTPS, DHCP.
> - Sie müssen die Namen der Schichten _nicht_ auswendig lernen.

Wir haben bislang die unteren beiden Schichten des TCP/IP-Referenzmodells kennengelernt. WIr haben gesehen, wie sich eine **Hierarchie aus Abstraktionsschichten**, die Ordnung schafft und klare Verantwortungen zuweist. Höhere Schichten verlassen sich darauf, dass die Schichten darunter korrekt implementiert wurden. 

Mit dem Internetprotokoll können wir grundsätzlich bereits Pakete zwischen zwei Computern auf dem ganzen Planeten hin- und herschicken.

Das ist toll, aber: 
- Wenn eine grosse Datei in Teile zerstückelt und verpackt wird, wie wissen wir, dass wir alle Teile erhalten und richtig zusammengesetzt haben? Das ist die Aufgabe der Transportschicht.
- Wenn mehrere Programme auf einem Computer Daten verschicken und empfangen können, wie stellen wir sicher, dass die richtigen Programme ihre Daten empfangen?
- Wenn wir Tausende einzelner Pakete erhalten, wie wird daraus eine echte "Verbindung"? 

Das sind Probleme, die die **Transportschicht** löst, die wir zuerst anschauen.
## Das Transmission Control Protocol (TCP)



Es gibt ein generelles, abstraktes 7-Schichtenmodell für die Netzwerkkommunikation ([das OSI-Modell](https://de.wikipedia.org/wiki/OSI-Modell#Die_sieben_Schichten)). Wir lernen hier das in der Praxis relevantere 4-schichtige TCP/IP-Referenzmodell. 

