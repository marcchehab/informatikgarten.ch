---
title: Internet - das Netzwerk der Netzwerke
slug: intro-internet
---
Eine der hellsten Galaxien am Nachthimmel, Centaurus A, ist für ihre ausgeprägte "S"-Form bekannt. Es wird angenommen, dass diese Form das Ergebnis eines Zusammenstosses zweier Galaxien ist. 2021 haben Nasa-Wissenschaftler zum ersten Mal die unsichtbaren Magnetfelder von Centaurus A mit Hilfe von Infrarotlicht kartiert. Die beobachteten Magnetfelder sind als Stromlinien über einem Bild der Galaxie dargestellt - hier ist das Bild.

![](https://science.nasa.gov/wp-content/uploads/2023/09/cena-lic-lp-nature-cropped.jpg?w=1536&format=webp)

Was Ihnen wohl gar nicht auffällt: Das Bild liegt gar nicht auf dem gleichen Server wie diese Webseite, sondern irgendwo **auf dem Webserver der Nasa in den USA**. Tatsächlich bedient sich diese Webseite auch anderweitig von über 5 verschiedenen Servern. Mit anderen Worten: Ihr Computer findet in deutlich weniger als einer Sekunde mehr als 5 Server in Europa und den USA und lädt die nötigen Dateien herunter.

Mit der Webseite [geotraceroute.com](https://geotraceroute.com/) habe ich den Weg zu nasa.gov visualisiert. Diese Webseite versucht, zu ermitteln, wo die Geräte sind, die auf der Route genutzt werden. Das ist nur zu circa 90% verlässlich, aber es gibt allemal ein gutes Bild!

<iframe src="https://geotraceroute.com/?node=0&host=nasa.gov" width="100%" height="500"></iframe>

> [!note] Versuchen Sie es selbst
> 
> Gehen Sie selbst auf [geotraceroute.com](https://geotraceroute.com/) und klicken Sie auf "Run another traceroute". Geben Sie eigene Websites an: Finden Sie eine Strecke über 10'000 Kilometer?

Beeindruckende Beispiele, die wir bis jetzt gefunden haben:

| URL | Länge |
| --- | --- |
| ane.com.au | 16'614 km |

Wie ist das so schnell möglich? Willkommen in der Serie zur Funktionsweise des Internets.

[Zur Startseite](/)
[[net-1-tcpip| TCP/IP - die Protokolle des Internets]]