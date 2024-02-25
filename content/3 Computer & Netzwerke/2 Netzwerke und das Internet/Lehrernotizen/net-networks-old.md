---
title: "99: Schichten und Netzwerke"
---
## Netzwerk-Adressen

Nun nutzen wir den Dienst [What Is My IP Address](https://whatismyipaddress.com/), um zu schauen, welche IP-Adresse ein Server im Internet denkt, dass wir hätten. Und siehe da: Der Server erhält eine **komplett andere IP-Adresse!** Noch schlimmer: Wahrscheinlich haben alle unsere Computer "gegen aussen" dieselbe IP-Adresse!

![[Pasted image 20230612214144.png]]

Das liegt daran, dass unser Schulnetzwerk teilweise von der Welt abgeschottet ist. Zudem wäre es auch gar nicht möglich, dass alle Geräte auf der Welt eine öffentliche IP-Adresse hätten: **Dafür gäbe es gar nicht genügend IP-Adressen!**

"Gegen aussen" vertritt Sie ein sogenannter "Router". Das sind Geräte, die an **zwei oder mehr Netzwerken angeschlossen sind**. Der Router der Schule ist **unser Tor aus unserem Netzwerk raus (ein "Gateway")** und vertritt uns mit seiner öffentlichen IP-Adresse im Internet. Das ist der erste Schritt auf der Route ins Internet.

![[Pasted image 20230613113211.png|invert]]

Jetzt gehen wir in [[excel_router.xlsx|der Exceldatei]] auf die zweite Lasche und versuchen herauszufinden, wie der Router entscheidet, ob ein Paket für das Internet gedacht ist, oder für das lokale Netzwerk. Dazu muss der Router die **Adresse des Netzwerks** als Ganzes ermitteln können - und alle IPs mit derselben Netzwerk-Adresse, sind Teil des gleichen Netzwerks.

Dafür braucht es die sogenannte **Subnetmaske**. Diese Maske ist sehr simpel, wenn man sie sich in Binärzahlen überlegt: Sie besteht aus 4 Bytes, wie die IP-Adresse. Dann enthält **zuerst mehrere "1", dann "0"**. 

Ein Beispiel:
```
Binär:
1111'1111.1111'1111.1111'1111.0000'0000
Dezimal:
255.255.255.0

Binär:
1111'1111.1111'1111.0000'0000.0000'0000
Dezimal:
255.255.0.0

Binär:
1111'1111.1111'1111.1100'0000.0000'0000
Dezimal:
255.255.192.0
```

Weil die Maske so einfach aufgebaut ist, ist es gang und gäbe, nur die Anzahl binärer "1" anzugeben. z.B. `192.168.0.5/24` impliziert eine Subnetmaske mit 24 binären "1" und dann "0", also `1111'1111.1111'1111.1111'1111.0000'0000` und in dezimal `255.255.255.0`.

Die Subnetmaske ist eine "Maske" für die IP-Adresse - und zwar so: 
* Alle Stellen, die "1" in der Subnetmaske haben, sind Teil der Netzwerk-Adresse.
* Alle Stellen, die "0" in der Subnetmaske haben, können für Computer-Adressen gebraucht werden (sogenannte "Hosts").

Praktisch kann man also die binären Ziffern der IP-Adresse und der Subnetmaske multiplizieren und erhält so die **Netzwerk-Adresse**. Das ist dasselbe wie Bit für Bit ein logisches UND anzuwenden - deshalb nennen das Informatiker **bitwise AND**.

Wenn zwei unterschiedliche IP-Adressen die gleiche Netzwerk-Adresse haben, dann gehören Sie zum gleichen Netzwerk.

Schauen wir uns diese Logik mal in Excel an.

<iframe src="https://onedrive.live.com/embed?cid=FFA11E10DCAE9352&resid=FFA11E10DCAE9352%21108313&authkey=AKX1jKObKcRWVB8&em=2" width="100%" height="400" frameborder="0" scrolling="no"></iframe>




## TCP/IP-Schichtenmodell

Das Internet ist ein etwas komplizierteres Transportsystem als dieses Beispiel, aber auch hier ist die Logik dieselbe. Wir lernen das **TCP/IP-Schichtenmodell** kennen, das ganz ähnlich funktioniert. Beginnen wir bei Ihnen als User: Sie geben Informationen in ein Formular auf einer Webseite ein und drücken "Senden".

* **Anwendungsschicht** (Application Layer): Ihre Informationen werden zuerst von Ihrem Browser **in HTTPS-Daten umgewandelt**.
* **Transportschicht** (Transport Layer): Bereits beim Besuchen der Webseite wurde eine TCP-Verbindung mit dem Webserver-Dienst auf dem Webserver aufgebaut. Jetzt werden die vom Browser gelieferten HTTPS-Daten falls nötig in mehrere Pakete zerlegt. Vorn an die Daten wird der **TCP-Header** angehängt. Teil davon ist die **Port-Nummer** der Quelle und des Empfängers. Typischerweise adressiert Ihr Browser einen **Webserver-Dienst** auf dem Ziel-Server. Standardmässig laufen diese auf **Port 80 (http) oder 443 (https)**. Das ist wie Linie 2 in unserer Analogie: "z.Hd. Party-Service".
* **Internetschicht** (Internet Layer): Diese Schicht ist dazu da, dass Ihre Pakete überhaupt den Weg an den Zielort finden. Das geschieht mit dem **Internetprotokoll**. Wiederum wird den Paketen ein "Header" angehängt: Diesmal enthält er die **IP-Adresse** der Quelle und des Zielcomputers. Auch bei IP-Adressen gibt es eine Art Postleitzahl: die **Netzwerkadresse**.
* **Netzwerkzugangsschicht** (Network Access Layer). Das sind die einzelnen Logistikschritte bei der Post, resp. die Transport-Schritte in verschiedenen Containern wie z.B. **Ethernet-Frames** an die nächste MAC-Adresse.

Sie sehen: Jede Schicht hat eine bestimmte Aufgabe bei der Übertragung von Daten über das Netzwerk und braucht Adress-Informationen. Wenn Sie Daten in den Browser eingeben, werden diese von oben nach unten durch diese Schichten durchgereicht. Jede Schicht hängt ihre Adressinformationen in **Header** und **Footer** an. Dieser Vorgang wird als "Verkapselung" ("Encapsulation") bezeichnet.

![[Pasted image 20230612145307.png|invert]]
