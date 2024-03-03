---
title: "03: Ethernet - unsere Postcontainer"
---

> [!success] Lernziele
> 
> - Sie erkennen eine MAC-Adresse und können sie von IP-Adressen unterscheiden
> - Sie können erklären, welche IP- und MAC-Adresse in einem Paket steht, wenn es:
>   - im lokalen Netzwerk verschickt wird,
>   - an den Gateway geschickt wird.

Wir haben gesehen, dass ein IP-Paket jeweils eine Absender- und eine Ziel-Adresse hat. Nun haben Sie sich vielleicht schon gefragt: Wie schickt mein Computer etwas an den Gateway, ohne die Ziel-Adresse zu überschreiben?

Die Antwort ist: Er überschreibt sie nicht. Ihre Pakete an den Webserver von kswe.ch mit der Ziel-IP `80.74.148.30` enthalten **immer** über alle Stationen hinweg die gleiche Ziel-IP. Die IP-Pakete bleiben erhalten. Aber: Die IP-Pakete werden von Station zu Station einzeln in rudimentäre Postcontainer geladen: sogenannte Ethernet-Frames. 

## Ethernet-Frames und die MAC-Adresse

Die Aufgabe dieser Postcontainer ist viel rudimentärer als die der IP-Pakete, die letztlich um die ganze Welt reisen können. Ethernet kümmert sich bloss darum, 
- dass die Daten bis zur nächsten Stelle im gleichen Netzwerk gelangen,
- dass keine Kollisionen passieren.

Diese Ethernet-Frames brauchen nicht die IP-Adresse, sondern die sogenannte MAC-Adresse des Ziels, die auch "physische" oder "Hardware"-Adresse genannt wird, weil sie vom Hersteller der Netzwerkkarte voreingestellt ist. Normalerweise verändert man diese nicht.

Sie müssen MAC-Adresse von IP-Adressen unterscheiden können. Typischerweise werden MAC-Adressen hexadezimal mit Doppelpunkten (:) oder Bindestrichen (-) notiert und sie sind (allermeistens) **6 Byte lang**.

```
8b:3b:06:af:9c:df
0a:a4:3c:e5:55:04
81:03:ce:85:fa:d1
```

Wenn Ihr Computer also ein IP-Paket an `80.74.148.30` (kswe.ch) verschickt, dann verpackt er das IP-Paket mit der original Ziel-Adresse in ein Ethernet-Frame mit der MAC-Adresse des Gateways.

Für die Computer mit IP-Adresse im gleichen Netzwerk führt Ihr Computer eine Tabelle, welcher Host (IP-Adresse) welche MAC-Adresse hat. Sie können diese in einer Kommandozeile mit `arp -a` anzeigen.

Sie sehen also: Daten werden in der Netzwerkkommunikation mehrfach verschachtelt. Und darum geht es auch in der nächsten Lektion.

[[net-02-networks|Zurück]]
