---
Title: TCP/IP - wie adressieren Sie Computer und Dienste im Netzwerk?
---

Der Schlüssel, um Netzwerkkommunikation zu verstehen, steckt in zwei Ideen:
1. Informationen werden in einer **Serie von Paketen** transportiert.
2. Jedes dieser Pakete wird durch **hierarchisch angeordnete Schichten mehrfach verpackt**.

Um zu zeigen, dass das eigentlich ganz logisch ist, beginnen wir mit einer **Analogie**.

## Wir organisieren eine Gala

Stellen Sie sich vor, Sie müssen ein grosses Gala-Dinner in einem Kongresshaus organisieren. Dazu brauchen Sie natürlich viel feines Essen, kühle Getränke und Stühle für die Gäste. Was tun Sie? Sie engagieren **Dienstleister**: einen Party-Service für das Essen, eine DJ für die Musik und eine Eventfirma, die Tische und Bühne aufstellt. Nun stellen Sie sich vor, wie diese Waren in Paketen ins Kongresshaus geliefert würden.


![](https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Gala_Dinner_Beau-Rivage_%285807894278%29.jpg/1024px-Gala_Dinner_Beau-Rivage_%285807894278%29.jpg)

* Die **Post** orientiert sich bei der Zieladresse zunächst nur an der **Postleitzahl** (the clue is in the title). Erst die Poststelle vor Ort schaut die **genaue Adresse** an. Und welcher Ihrer Dienstleister das Paket braucht, ist der Post egal.
* Auf dem Weg zum Kongresshaus verfrachtet die Post die Waren mehrmals anders: 
	* zuerst in LKWs ins Sortierzentrum, 
	* dann mit Containern in ein anderes Sortierzentrum,
	* dann in LKWs zur Poststelle vor Ort,
	* und letztlich auf Elektro-Mopets an die Zieladresse.
* Ihre **Dienstleister** vor Ort müssen die richtigen Waren erhalten. Die Eventfirma braucht die Stühle und Bänke, die DJ das Mischpult, und der Partyservice seine Zutaten. Dafür schreiben Sie etwas in die Adresse der Pakete, weil die ja alle an die gleiche Adresse geliefert werden: "z.Hd. Eventfirma XY".

Das spiegelt sich in der Adresse wieder. Z.B. könnte der Kuchen mit dieser Adresse angeliefert werden:

```
Kongresshaus
z.Hd. Party-Service
Eventstrasse 3
8000 Zürich
```

* Die Post orientiert sich an Linie 4, dem **Ort**.
* Die Poststelle vor Ort liefert das Paket an die Adresse in Linie 1 und Linie 3, also ins richtige **Gebäude**.
* Die Dienstleister haben auf Linie 2 einen Vermerk angebracht, **für wen im Gebäude** das Paket ist.

## TCP/IP-Schichtenmodell

Das Internet ist ein etwas komplizierteres Transportsystem als dieses Beispiel, aber auch hier ist die Logik dieselbe. Wir lernen das **TCP/IP-Schichtenmodell** kennen, das ganz ähnlich funktioniert. Beginnen wir bei Ihnen als User: Sie geben Informationen in ein Formular auf einer Webseite ein und drücken "Senden".

* **Anwendungsschicht** (Application Layer): Ihre Informationen werden zuerst von Ihrem Browser **in HTTPS-Daten umgewandelt**.
* **Transportschicht** (Transport Layer): Bereits beim Besuchen der Webseite wurde eine TCP-Verbindung mit dem Webserver-Dienst auf dem Webserver aufgebaut. Jetzt werden die vom Browser gelieferten HTTPS-Daten falls nötig in mehrere Pakete zerlegt. Vorn an die Daten wird der **TCP-Header** angehängt. Teil davon ist die **Port-Nummer** der Quelle und des Empfängers. Typischerweise adressiert Ihr Browser einen **Webserver-Dienst** auf dem Ziel-Server. Standardmässig laufen diese auf **Port 80 (http) oder 443 (https)**. Das ist wie Linie 2 in unserer Analogie: "z.Hd. Party-Service".
* **Internetschicht** (Internet Layer): Diese Schicht ist dazu da, dass Ihre Pakete überhaupt den Weg an den Zielort finden. Das geschieht mit dem **Internetprotokoll**. Wiederum wird den Paketen ein "Header" angehängt: Diesmal enthält er die **IP-Adresse** der Quelle und des Zielcomputers. Auch bei IP-Adressen gibt es eine Art Postleitzahl: die **Netzwerkadresse**.
* **Netzwerkzugangsschicht** (Network Access Layer). Das sind die einzelnen Logistikschritte bei der Post, resp. die Transport-Schritte in verschiedenen Containern wie z.B. **Ethernet-Frames** an die nächste MAC-Adresse.

Sie sehen: Jede Schicht hat eine bestimmte Aufgabe bei der Übertragung von Daten über das Netzwerk und braucht Adress-Informationen. Wenn Sie Daten in den Browser eingeben, werden diese von oben nach unten durch diese Schichten durchgereicht. Jede Schicht hängt ihre Adressinformationen in **Header** und **Footer** an. Dieser Vorgang wird als "Verkapselung" ("Encapsulation") bezeichnet.

![[Pasted image 20230612145307.png|-invert]]

## IP-Adresse und Port

Wie Sie sich mit diesen wenigen Infos bereits vorstellen können, hat Ihr Computer eine Hauptadresse. Das ist die **Adresse des "Internet Protokolls", oder kurz: IP**.  Eine Liste möglicher IPs.

Falls Sie die Excel-Übung bereits gemacht haben, fällt Ihnen hier etwas auf?

```
192.168.1.4
10.32.4.12
243.123.129.45
```

Im Schichtenmodell "oberhalb" des Internet-Protokolls gibt es auch eine Art, auf demselben Computer das richtige Protokoll (also den richtigen Dienstleister) anzusprechen: nämlich den **Port**. Wenn Sie im Internet Surfen, verbinden Sie sich ständig mit Webservern, die typischerweise auf Port 80 (HTTP) oder 443 (HTTPS) laufen. Der Port wird oft mit einem Doppelpunkt nach der IP angegeben, z.B.

```
192.168.1.4:80 = Ich möchte den HTTP-Server auf dieser Maschine
192.168.1.4:443 = Ich möchte den HTTPS-Server auf dieser Maschine
```

Weitere übliche Ports finden Sie [hier auf Wikipedia](https://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers#Well-known_ports).

> [!example] Jetzt sind Sie dran
> 
> Versuchen Sie die IP-Adresse Ihres Geräts herauszufinden. Dazu finden Sie auf Google leicht eine Anleitung, z.B. `IP-Adresse finden Windows 10` oder `IP-Adresse finden Android`

Ein Beispiel: Meine IP-Adresse zuhause.

![[Pasted image 20230612211154.png]]

Wenn Sie Ihre IP-Adresse gefunden haben, tauschen Sie diese mit Ihrer Tischnachbarin oder Ihrem Tischnachbarn aus. Jetzt versuchen wir mal, zu schauen, ob unsere Computer sich über das Netzwerk erreichen. 

* Auf Windows öffnen Sie dazu das Startmenü und suchen nach `cmd`. Damit sollten Sie die Kommandozeile / "Eingabeaufforderung" finden. Öffnen Sie diese.
* Bei OSX öffnen Sie das `Terminal`.
* Bei Ubuntu-Linux öffnen Sie ebenfalls das Terminal.

Nun testen wir die Erreichbarkeit des anderen Computers mit folgendem Befehl:

```bash
ping <IP-Adresse>
ping 192.168.1.36
```

Wie lange dauert es, bis Sie eine Anwort erhalten? Vergleichen Sie das einmal mit einem `ping` an google.com:

```
ping google.com
```

Sie sehen, der ping nach google.com dauert (hoffentlich) etwas länger, als zum Gerät gleich neben Ihnen. Des Weiteren sehen Sie, **dass der Hostname google.com in eine IP-Adresse verwandelt wird**. Wie genau das geschieht, besprechen wir viel später. Wichtig ist aktuell: Die Hauptadresse in Netzwerken und im Internet ist die **IP**.

> [!note] Ein Versuch
> 
> Ich lasse auf meinem Laptop einen Webserver laufen. Meine IP-Adresse und den Port sage ich Ihnen in der Lektion. Versuchen Sie mal, die Webseite aufzurufen!

## Netzwerk-Adressen

Nun nutzen wir den Dienst [What Is My IP Address](https://whatismyipaddress.com/), um zu schauen, welche IP-Adresse ein Server im Internet denkt, dass wir hätten. Und siehe da: Der Server erhält eine **komplett andere IP-Adresse!** Noch schlimmer: Wahrscheinlich haben alle unsere Computer "gegen aussen" dieselbe IP-Adresse!

![[Pasted image 20230612214144.png]]

Das liegt daran, dass unser Schulnetzwerk teilweise von der Welt abgeschottet ist. Zudem wäre es auch gar nicht möglich, dass alle Geräte auf der Welt eine öffentliche IP-Adresse hätten: **Dafür gäbe es gar nicht genügend IP-Adressen!**

"Gegen aussen" vertritt Sie ein sogenannter "Router". Das sind Geräte, die an **zwei oder mehr Netzwerken angeschlossen sind**. Der Router der Schule ist **unser Tor aus unserem Netzwerk raus (ein "Gateway")** und vertritt uns mit seiner öffentlichen IP-Adresse im Internet. Das ist der erste Schritt auf der Route ins Internet.

![[Pasted image 20230613113211.png|-invert-100%ed]]

Jetzt gehen wir in [[excel_router.xlsx|der Exceldatei]] auf die zweite Lasche und versuchen herauszufinden, wie der Router entscheidet, ob ein Paket für das Internet gedacht ist, oder für das lokale Netzwerk. Dazu muss der Router die **Adresse des Netzwerks** als Ganzes ermitteln können - und alle IPs mit derselben Netzwerk-Adresse, sind Teil des gleichen Netzwerks.

Dafür braucht es die sogenannte **Subnet-Maske**. Diese Maske ist sehr simpel, wenn man sie sich in Binärzahlen überlegt: Sie besteht aus 4 Bytes, wie die IP-Adresse. Dann enthält **zuerst mehrere "1", dann "0"**. 

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

Weil die Maske so einfach aufgebaut ist, ist es gang und gäbe, nur die Anzahl binärer "1" anzugeben. z.B. `192.168.0.5/24` impliziert eine Subnet-Maske mit 24 binären "1" und dann "0", also `1111'1111.1111'1111.1111'1111.0000'0000` und in dezimal `255.255.255.0`.

Die Subnet-Maske ist eine "Maske" für die IP-Adresse - und zwar so: 
* Alle Stellen, die "1" in der Subnet-Maske haben, sind Teil der Netzwerk-Adresse.
* Alle Stellen, die "0" in der Subnet-Maske haben, können für Computer-Adressen gebraucht werden (sogenannte "Hosts").

Praktisch kann man also die binären Ziffern der IP-Adresse und der Subnet-Maske multiplizieren und erhält so die **Netzwerk-Adresse**. Das ist dasselbe wie Bit für Bit ein logisches UND anzuwenden - deshalb nennen das Informatiker **bitwise AND**.

Wenn zwei unterschiedliche IP-Adressen die gleiche Netzwerk-Adresse haben, dann gehören Sie zum gleichen Netzwerk.

Schauen wir uns diese Logik mal in Excel an.

<iframe src="https://onedrive.live.com/embed?cid=FFA11E10DCAE9352&resid=FFA11E10DCAE9352%21108313&authkey=AKX1jKObKcRWVB8&em=2" width="100%" height="400" frameborder="0" scrolling="no"></iframe>



[[net-intro|Zurück zum Intro]]
