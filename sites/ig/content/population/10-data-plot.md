---
title: Daten mit Trendlinie plotten
---
**Achtung**: Die Trendlinien sind nicht Teil des Arbeitsauftrags. 

Populationen entwickeln sich selten genau nach vorher vorgestellten Modellen. Wenn wir im Internet reelle Daten zu Populationsentwicklungen finden, ist es manchmal aus den Zahlen oft erkennbar, um was wir Entwicklung („Wachstum“) es sich handelt. Ein Beispiel dafür ist die Entwicklung der Wolfspopulation in der Schweiz in der Abbildung 3 unten. Trotzdem können wir mit solchen Grafiken keine Berechnungen anstellen, bis wir die Zahlen vollständig übernommen haben und diese auch variieren können, um verschiedene Hypothesen aufzustellen und zu überprüfen.

![[10-data-plot.png]]
_Wolfsbestand in der Schweiz; Quelle: https://statista.nanoo.security/statistik/daten/studie/1179300/umfrage/entwicklung-des-wolfbestands-in-der-schweiz/_

Schauen wir uns am Beispiel der statistischen Zahlen des Wolfbestands in der Schweiz, wie uns Excel dabei unterstützen kann. Die Datenquelle der Grafik ist [www.statista.de](http://www.statista.de/). Oft ist es möglich und sinnvoll, die Daten mithilfe der Quellenangaben direkt ins Excel zu übernehmen bzw. zu importieren.

Ist die Datenquelle aber nicht bekannt oder zugänglich, und wir die Zahlen nur aus Grafiken oder Tabellen ablesen können, bleibt uns für unsere eigene Modellierung solcher Daten das Übertragen durchs manuelle Eintippen.

1. Lesen Sie News Artikel [https://intranet.kswe.ch/news/article/5110](https://intranet.kswe.ch/news/article/5110). Unsere Schule hat vor Kurzem einen kostenlosen Zugang zu Statista lizenziert. Logen Sie sich bei Statista für Schulen gemäss Beschreibung ein. Laden Sie die Excel Datei mit Daten über Wölfe herunter.
2. Kopieren Sie die Werte aus der von Statista heruntergeladenen Excel Datei in Ihre eigene Tabelle (Spalten A, B) und fertigen Sie ein Diagramm dazu, wie unten dargestellt.
![[10-data-plot-1.png]]

Offensichtlich zeigt der Verlauf des Wolfsbestandes am ehesten eine **exponentielle Entwicklung**, die wir nun auch mathematisch beschreiben wollen, um allenfalls Prognosen für künftigen Jahre zu machen. Excel kann uns mit **Trendlinien (Trendkurven)** helfen, Entwicklung der wachsenden Wolfszahlen mathematisch genauer zu beschreiben. Dazu blenden wir uns die Trendlinie ein.

3. Blenden Sie in Ihrem Diagramm die Trendlinie ein. Dies erfolgt je nach Betriebssystemversion unterschiedlich.
**Hinweis**: In Microsoft Excel könnten Sie eine lineare Trendlinie (gestrichelt) einfügen, nicht aber eine exponentielle - obwohl sie sich offensichtlich besser eignen würde. Der Grund dafür ist vielleicht nicht auf Anhieb erkennbar: Unter unseren Wolfsdaten befinden Beobachtungsjahre, in welchen keine Wolfe gezählt wurden, also deren Anzahl 0 ist. Mit dem Bestand 0 lässt sich aber keine exponentielle Funktion aufstellen.
![[10-data-plot-2025-09-03-10.23.29.excalidraw]]

> [!question] Frage
> 
> Diskutieren Sie, wie Sie ein solches „Datenproblem“ lösen könnten.

> [!solution]- Lösung
> 
> Sie hätten zwei Optionen:
> - Die Daten erst ab dem Jahr 1998 darstellen, da sind alle Wolfszahlen positiv.
> - Die Daten in den Jahren mit dem Bestand 0 (1994 und 1997) leer zu lassen.
> 
> Ich empfehle Ihnen, dass Sie eine separate Spalte "Bereinigter Wolfsbestand" machen. Dort können Sie mit der Funktion =WENN() die Nullwerteabfangen und durch "nicht verfügbar" ersetzen mit NV().
> ```excel
> =WENN(B2=0;NV();B2)
> ```

4. Mit den bereinigten Daten lässt sich nun auch die exponentielle Trendlinie auswählen. Blenden Sie noch die Annäherungsformel für die Daten und den sogenannten R²-Wert, die Sie unter „Weitere Optionen...“ finden.
![[10-data-plot-2025-09-03-11.32.00.excalidraw]]

- Die gestrichelte "Trendlinie", besser Trendkurve genannt, wird **Regressionskurve** genannt. Sie ist eine "glatte" Kurve oder Linie, welche **die mathematisch bestmögliche Annäherung an die gemessenen Daten mit der gewählten Funktionsart verspricht**. Im obigen Beispiel ist dies:

$$
y = 0.6666 \times e^{0.1806x}
$$


## Auswahl der besten Trendlinie

Wenn Sie eine Trendlinie hinzufügen möchten, können Sie verschiedenen Trend-/Regressionstypen auswählen. Egal welche Sie auswählen, fragt sich: "**Wie genau passt die Trendlinie auf die Daten?**"

Dazu kann man das Bestimmtheitsmass **R²** ausrechnen. Wenn Sie eine Trendlinie in Ihre Daten legen, können Sie für diese Trendlinie auch den Wert von R² berechnen lassen. Wenn Sie möchten, können Sie diesen Wert in Ihrem Diagramm anzeigen, wie wir dies auf der früheren Seite gemacht haben.
- Der Bestimmtheitsgrad **R²** ist ein statistisches Mass dafür, wie dicht die tatsächlichen Daten an der Regressionskurve liegen. **Je näher der R² Wert sich der Zahl 1 nähert, desto besser ist das Modell**.
- R² funktioniert so, dass es jeweils die Unterschiede zwischen Realität und Modell (also den **Fehler**) quadriert und alle Fehlerquadrate summiert. Dann vergleicht es die Summe der Flächen des **Modells** (z.B. hier blau) mit der Nullhypothese, wenn man gar kein Modell anwenden würde und einfach den **Durchschnitt** der Daten verwenden würde (rot). Diese Summe der quadrierten Abweichungen vom Durchschnitt nennt man auch die **Varianz** der Daten, das ist ein Mass, wie breit die Daten verstreut sind.
	- Ein R² näher bei 1 bedeutet, unser Modell schlägt den Durchschnitt um ein Vielfaches. Mit unserem Modell können wir die Daten also besser erklären, als wenn wir kein Modell hätten.
	- Ein R² näher bei 0 bedeutet, die Nullhypothese mit dem Durchschnitt ist ähnlich gut wie unser Modell - also ist unser Modell unnötig.
	- Ein negatives R² würde bedeuten, die Nullhypothese mit dem Durchschnitt ist sogar besser als unser Modell - also ist unser Modell extrem schlecht!

![[10-data-plot-6.png]]
*By Orzetto - Own work, CC BY-SA 3.0, https://commons.wikimedia.org/w/index.php?curid=11398293*

### Lineare Trendlinie (->Lineares Wachstum)

Eine lineare Trendlinie ist eine am besten geeignete gerade Linie, die mit einfachen linearen Daten verwendet wird. Ihre Daten sind linear, wenn das Muster in ihren Datenpunkten einer Linie ähnelt. Eine lineare Trendlinie zeigt normalerweise, dass etwas gleichmässig zunimmt oder abnimmt.

Im folgenden Beispiel zeigt eine lineare Trendlinie deutlich, dass die Kühlgeräteverkäufe über einen Zeitraum von 13 Jahren konstant gestiegen sind. Beachten Sie, dass der R-Quadratwert 0,9036 ist, was eine gute Anpassung der Linie an die Daten ist.

![[10-data-plot-3.png]]

### Exponentielle Trendlinie (->Exponentielles Wachstum)

Eine exponentielle Trendlinie ist eine gekrümmte Linie, die besonders nützlich ist, wenn Datenwerte mit immer höheren Raten steigen oder fallen. Sie können keine exponentielle Trendlinie erstellen, wenn die Daten Werte enthalten, die kleiner oder gleich 0 sind.

Im folgenden Beispiel wird eine exponentielle Trendlinie verwendet, um die abnehmende Menge an Kohlenstoff 14 in einem Objekt zu veranschaulichen, wenn es altert. Beachten Sie, dass der R-Quadratwert 1 ist, was bedeutet, dass die Linie perfekt zu den Daten passt.

![[10-data-plot-expo.png]]

### Logarithmische Trendlinie (Beschränktes Wachstum)

Eine logarithmische Trendlinie ist eine gekrümmte Linie, die am nützlichsten ist, wenn die Änderungsrate in den Daten schnell zu- oder abnimmt und sich später beruhigt. Eine logarithmische Trendlinie kann negative und/oder positive Werte verwenden.

Im folgenden Beispiel wird eine logarithmische Trendlinie verwendet, um das vorhergesagte Bevölkerungswachstum von Tieren in einem festen Raum zu veranschaulichen, in dem sich das Populationswachstum verlangsamte, da der Platz für die Tiere abgenommen hat. Beachten Sie, dass der R-Quadratwert 0,9407 ist, was eine verhältnismässig gute Anpassung der Linie an die Daten ist.

![[10-data-plot-4.png]]

### Polynomische Trendlinie

Eine polynomiale Trendlinie ist nützlich, wenn Daten eine längere Wachstums- und eine längere Zerfallsphase ausweisen. Der Grad des Polynoms kann durch die Anzahl der Schwankungen in den Daten (Anzahl von Hügel und Täler in der Kurve) bestimmt werden. Eine Polynom-Trendlinie der Ordnung 2 (Quadratische Funktion, Parabel) weist in der Regel nur einen Hügel oder ein Tal auf. Ordnung 3 hat in der Regel ein oder zwei Hügel oder Täler. Ordnung 4 hat in der Regel bis zu drei.

Das folgende Beispiel zeigt eine Polynom-Trendlinie der Ordnung 2 (Parabel), um die Beziehung zwischen Geschwindigkeit und Benzinverbrauch zu veranschaulichen. Der R-Quadratwert 0,9474 ist eine sehr gute Annäherung der Kurve an die Daten.

![[10-data-plot-5.png]]

### Potenz Trendlinie

Eine Potenz Trendlinie ist eine gekrümmte Linie, die am besten mit Datensätzen verwendet wird, die Messungen vergleichen, die mit einer bestimmten Geschwindigkeit steigen - z. B. die Beschleunigung eines Rennwagens in Intervallen von einer Sekunde. Sie können keine Stromtrendlinie erstellen, wenn Ihre Daten null oder negative Werte enthalten.

Im folgenden Beispiel werden Beschleunigungsdaten angezeigt, indem die Entfernung in Metern nach Sekunden dargestellt wird. Der R-Quadratwert hat eine nahezu perfekte Anpassung der Linie an die Daten.

