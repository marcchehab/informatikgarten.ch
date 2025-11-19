---
title: Internet - das Netzwerk der Netzwerke
---

# Das Inter-Net

Im Jahr 2001 kam der erste **Herr der Ringe** Film in die Kinos. Im Film wurden normalgrosse Schauspieler mit genialen Filmtricks zu kleinen Hobbits gemacht. Ein Beispiel: Filmsets wurden einmal sehr gross gebaut für die Hobbits, damit sie klein wirken; und einmal sehr klein für die Menschen und Zauberer, damit sie gross wirken. Viel wurde auch mit Perspektiven gespielt, sodass Menschen im Vordergrund stehen und gross wirken, während die Hobbits viel weiter im Hintergrund stehen, als man vermuten würde, und dadurch klein wirken.

Das Dorf der Hobbits heisst Hobbiton und liegt im Auenland in Mittelerde. In unserer Welt wurde das Dorf in Neuseeland gebaut und kann bis heute besichtigt werden. Touristen können die Filmsets besuchen und die Häuser der Hobbits sehen.

![](https://www.wairualodge.co.nz/wordpress/wp-content/uploads/2020/03/Hobbiton-3-e1583826897607.jpg)

Nun denken Sie vielleicht: "Das ist ja alles schön und gut, aber **was hat das mit Informatik zu tun?**" 

Nun, das Bild da oben 👆 von Hobbiton ist gar nicht auf dem gleichen Server wie `informatikgarten.ch` gespeichert, sondern **auf dem Server `wairualodge.co.nz` in Neuseeland**. Tatsächlich setzt sich `informatikgarten.ch` aus Daten von über fünf verschiedenen Servern zusammen. Ihr Computer findet in deutlich weniger als einer Sekunde mehr als fünf Server weltweit und lädt die nötigen Dateien herunter!

Mit der Webseite [geotraceroute.com](https://geotraceroute.com/) habe ich den Weg zum Server `wairualodge.co.nz` mit dem Bild von Hobbiton visualisiert. Diese Webseite versucht, zu ermitteln, wo sich die Geräte befinden, die auf der Route nach Neuseeland genutzt werden. Das ist nur zu circa 90% verlässlich und **findet nicht alle involvierten Geräte**, aber es gibt allemal ein gutes Bild!

<iframe src="https://geotraceroute.com/?node=1761&host=wairualodge.co.nz" width="100%" height="500"></iframe>

## Terminal/Konsole öffnen

Jetzt überlegen wir uns mal, die involvierten Geschwindigkeiten. Sie können das selbst auf Ihrem Computer ausprobieren, indem Sie die Konsole öffnen und `ping wairualodge.co.nz` eingeben.

Zuerst müssen Sie ein Terminal (auch Konsole genannt) öffnen:

**Windows:**
- Drücken Sie `Windows-Taste + R`
- Geben Sie `cmd` ein und drücken Sie Enter
- Alternativ: Suchen Sie im Startmenü nach "Eingabeaufforderung" oder "PowerShell"

**macOS:**
- Drücken Sie `Cmd + Leertaste` um Spotlight zu öffnen
- Geben Sie "Terminal" ein und drücken Sie Enter
- Alternativ: Öffnen Sie Programme > Dienstprogramme > Terminal

**Linux:**
- Drücken Sie `Ctrl + Alt + T` (bei den meisten Distributionen)
- Oder suchen Sie im Anwendungsmenü nach "Terminal"

Was macht der Befehl `ping`? Er schickt ein kleines Datenpaket an den Server und wartet auf eine Antwort. Dabei misst er die Zeit, die das Paket braucht, um zum Server zu gelangen und wieder zurück. Diese Zeit wird als "Ping" bezeichnet und gibt an, wie schnell Ihr Computer mit dem Server kommunizieren kann.

Das Ergebnis des Befehls könnte so aussehen:

```bash
$ ping wairualodge.co.nz

PING wairualodge.co.nz (119.47.117.103) 56(84) bytes of data.
64 bytes from sulu.hosts.net.nz (119.47.117.103): icmp_seq=1 ttl=48 time=350 ms
64 bytes from sulu.hosts.net.nz (119.47.117.103): icmp_seq=2 ttl=48 time=271 ms
64 bytes from sulu.hosts.net.nz (119.47.117.103): icmp_seq=3 ttl=48 time=293 ms
64 bytes from sulu.hosts.net.nz (119.47.117.103): icmp_seq=4 ttl=48 time=317 ms

--- wairualodge.co.nz ping statistics ---
4 packets transmitted, 4 received, 0% packet loss, time 5006ms
rtt min/avg/max/mdev = 248.442/303.558/350.340/36.340 ms
```

Das bedeutet, dass unser Computer die Strecke nach Neuseeland über das Internet und zurück in durchschnittlich 303.558 Millisekunden (ms) zurücklegt. Das sind 0.3 Sekunden, also ziemlich schnell!

Die Verbindung von der Schweiz nach Neuseeland ist gemäss geotraceroute.com _mindestens_ 19'963 Kilometer. Da der Ping die Roundtrip-Zeit misst (hin und zurück), legt das Datenpaket die doppelte Strecke zurück: 2 × 19'963 km = 39'926 km. Wenn wir die Zeit von 0.303558 Sekunden nehmen, können wir die Geschwindigkeit berechnen, mit der die Datenpakete reisen:

$$
\text{Geschwindigkeit} = \frac{\text{Strecke}}{\text{Zeit}} = \frac{2 \times 19'963 \text{ km}}{0.303558 \text{ s}} = \frac{39'926 \text{ km}}{0.303558 \text{ s}} \approx 131'526 \text{ km/s}
$$

Vergleichen Sie das mit der Lichtgeschwindigkeit $c$ von 299'792 km/s:

$$
\text{Prozent der Lichtgeschwindigkeit} = \frac{131'526 \text{ km/s}}{299'792 \text{ km/s}} \approx 43.9\%
$$

Das bedeutet, dass die Reise hin und zurück von der Schweiz nach Neuseeland über das Internet mit einer Geschwindigkeit von etwa 43.9% der Lichtgeschwindigkeit erfolgt ist.

> [!note] Versuchen Sie es selbst
> 
> Gehen Sie selbst auf [geotraceroute.com](https://geotraceroute.com/) und klicken Sie auf "Run another traceroute". Geben Sie eigene Websites an oder wählen Sie ein Land aus. 
> - Finden Sie eine Strecke über 10'000 Kilometer?

Zwei Beispiele, die man gut findet:

| URL | Länge | Ping |
| ---- | ---- | ---- |
| example.com | 9'409km | 100ms |
| smh.com.au | 384km | 16ms |


> [!discuss] Diskutieren Sie
> 
> Wieso werden wir für die australische Zeitung Sydney Morning Herald (smh.com.au) auf einen Server in Paris geleitet?

## Die eigene IP-Adresse herausfinden

Schauen wir uns nun an, wie Sie die IP-Adresse Ihres eigenen Computers herausfinden können.

Öffnen Sie ein Terminal (siehe oben) und geben Sie folgenden Befehl ein:

**Windows:**
```bash
ipconfig
```

Suchen Sie nach dem Eintrag "IPv4-Adresse" - das ist Ihre lokale IP-Adresse im Netzwerk.

**macOS und Linux:**
```bash
ifconfig
```
oder
```bash
ip addr show
```

Suchen Sie nach dem Eintrag "inet" gefolgt von einer Zahl wie 192.168.1.x oder 10.0.0.x - das ist Ihre lokale IP-Adresse im Netzwerk.

> [!note] Lokale vs. öffentliche IP-Adresse
>
> Die IP-Adresse, die Sie hier sehen, ist Ihre **lokale IP-Adresse** in Ihrem Heimnetzwerk (z.B. 192.168.1.5). Diese wird von Ihrem Router vergeben.
>
> Ihre **öffentliche IP-Adresse**, mit der Sie im Internet sichtbar sind, können Sie auf Webseiten wie [whatismyip.com](https://www.whatismyip.com/) herausfinden. Diese wird von Ihrem Internetanbieter vergeben.
