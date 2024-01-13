---
title: "L07+L08: Zahlen zu Farben zu Pixel zu Bilder"
---

> [!success]  Lernziele
> 
> *Hinweis: Wir behandeln keine Umwandlungen, die grösser als zwei Byte oder 65'535<sub>10</sub> sind.*
> 
> - Sie können berechnen, wie viel Speicherplatz für ein unkomprimiertes RGB-Bild mit einer gewissen Auflösung und Farbtiefe nötig wäre.
> - Sie wissen, wie sich die Berechnung verändert, wenn es ein Graustufen-Bild ist.
> - Sie können die Prinzipien einer Rastergrafik und einer Vektorgrafik voneinander unterscheiden.
> - Sie verstehen die Inhalte des Theorieeintrags.

Stellen Sie sich vor: Bits könnten in Ihrem Speicher könnten ja direkt einzelne Farben sein. 0 wäre schwarz, 1 wäre weiss.

Ein Smiley könnte dann so aussehen:

![[Pasted image 20231127063226.png]]

Das ist eine sogenannte **Rastergrafik**. Die Grafik ist einfach eine Tabelle, bei der die Zellen mit Farben gefüllt werden.

Die Datenmenge zu bestimmen, ist bei diesem Beispiel relativ einfach: Es sind pro Reihe jeweils zwei Byte und es gibt 16 Reihen. Also insgesamt brauchen wir 32 Byte (= 256 Bit) Speicherplatz dafür.

Aber unsere Semantik ist doch etwas zu einfach: Wir haben ja gar keine Farben - nicht einmal Grautöne! Wir müssen also **mehr als nur 1 Bit Speicherplatz pro Pixel**  haben.
## Interaktiv Farbtiefe verstehen

In der [[ginf-b02l0506-zahlen-hex-farben|letzten Lektion]] haben wir die Farbtiefe angeschaut. Jetzt wollen wir das nochmals interaktiv anschauen, ich habe Ihnen dazu etwas programmiert.

> [!example] Diskutieren Sie
> 
> 
> Als Originalbild (rechts) sehen Sie hier ein RGB-Bild mit 64 x 64 Pixeln und 8 Bit Farbtiefe. Sie können mit den Reglern die Auflösung (damit meint man die Breite und Höhe) sowie die Farbtiefe verändern. Zudem sehen Sie eine 3D-Visualisierung aller Bits, die für ein "rohes" solches Bild nötig wären.
> 
> Spielen Sie mit den Reglern, um ein Gefühl für die Effekte der Regler zu erhalten. Den Effekt der Farbtiefe können Sie auch mit Ihren eigenen Bildern beim [Image Bit Comparer](https://www.csfieldguide.org.nz/en/interactives/image-bit-comparer/) testen! 
> 
> Dann überlegen Sie sich folgende Fragen:
> 1. Was verkörpert die Datenmenge, die nötig ist, um das Bild zu speichern?
> 2. Wie könnten Sie diese Datenmenge berechnen?
> 3. Sie finden zwei Versionen eines Videos: Einmal in *FullHD* und 4 Bit Farbtiefe, und einmal in *4K* mit 8 Bit Farbtiefe (recherchieren Sie die Begriffe selbst). Wie viel länger wird der Download gehen?
> 4. Sie kaufen eine professionelle Kamera mit 24 Megapixeln und 16 Bit Farbtiefe pro Farbkanal. Zudem hat die Kamera eine Funktion, um die Bilder "roh" unkomprimiert zu speichern. Wie viel Speicher bräuchte so das grösst mögliche Bild? 
> 5. Wie würde sich die Datenmenge verändern, wenn Sie keine Farben hätten sondern nur Graustufen?
<p class="codepen" data-height="1005.9999389648438" data-theme-id="dark" data-default-tab="result" data-slug-hash="VwgdRrG" data-editable="true" data-user="marcchehab" style="height: 1005.9999389648438px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/marcchehab/pen/VwgdRrG">
  color depth demo with three.js</a> by marcchehab (<a href="https://codepen.io/marcchehab">@marcchehab</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>


> [!question]- Lösung zu den Fragen
> 
> 1. Das **Volumen** des Quaders ist die Datenmenge.
> 2. Grundsätzlich:
> $$Breite \times Höhe \times Tiefe$$
> In unserem Fall also:
> $$Pixelbreite \times Pixelhöhe \times ( \text{Farbtiefe pro Kanal} \times \text{Anzahl Farbkanäle} )$$
> Oder:
> $$Pixelbreite \times Pixelhöhe \times ( \text{Farbtiefe insgesamt} )$$
> Dass es keine Verwechslung gibt, präzisiert man die Farbtiefe teils mit "bits per channel" (bpc) oder "bits per pixel" (bpp). 8 bpc sind bei RGB 24 bpp.
> 3. **FullHD** (oder "1080p" genannt) ist 1920x1080 Pixel. **4K** ist 3840x2160 Pixel.
> ![[Pasted image 20231127000239.png]]
> 4K ist also eine viermal grössere Fläche als FullHD. Wenn Sie nun auch noch eine doppelt so grosse Farbtiefe haben, haben Sie also **achtmal mehr Daten**, die Sie herunterladen müssen. (Stellen Sie sich das als Würfel vor!)
> 4. Rechnen wir von Beginn an in Byte, das ist einfacher. Pro Farbkanal und Pixel haben wir 16 Bit, also 2 Byte pro Farbe und Pixel. Mit drei Farben sind das 6 Byte pro Pixel. Nun haben wir 24 Megapixel - also rund 24 Millionen Pixel!
> 	$$6 Byte \times 24 Megapixel$$
> 	Das macht 144 Megabyte für ein Bild!
> 5. Ein Bild aus Graustufen hat einfach einen Kanal anstatt drei Kanäle pro Farbe. Das heisst: Die Datenmenge sollte ein Drittel der Datenmenge von RGB sein.

## Vektorgrafiken

Wir haben bislang von Rastergrafiken gesprochen, die ein Bild in Pixel aufteilen. Der andere Haupttyp von Grafiken sind die sogenannten **Vektorgrafiken**.

Anders als Rastergrafiken beschreiben Vektorgrafiken die Inhalte mathematisch als geometrische Formen. Ein Beispiel eines Kreises, bei dem Rastergrafik denkbar schlecht wegkommen:

![[rastervektor 1.svg]]

> [!example] Editieren Sie eine SVG-Grafik
> 
> Gehen Sie zu [svgviewer.dev](https://www.svgviewer.dev/). Dort sehen Sie standardmässig dieses Logo, das vom SVG-Code links kreiert wird.
> 
> ![[Pasted image 20231203215601.png]]
> 
> Versuchen Sie folgende Veränderungen selbst vorzunehmen.
> 
> 1. Vergrössern Sie den Kreis.
> 2. Geben Sie dem Kreis ein passendes Gelb oder Hellorange.
> 3. Verschieben Sie den Kreis weiter rechts.
> 4. Machen Sie das gerundete Quadrat im Hintergrund blau.
> 5. Fügen Sie einen zweiten, grünen Kreis hinzu
> 
> Falls Ihnen noch Zeit bleibt, experimentieren Sie mit weiteren SVG-Grafiken links in der Auswahl.


> [!example] Diskutieren Sie 
> 
> Was sind wohl die Vor- und Nachteile der beiden Grafiktypen? Hier einige Bilder als Inspiration:
> ![[Pasted image 20231127070546.png]]
> ![[Pasted image 20231127070715.png]]
> 
> ```renderhtml
> ---html
> <div class="container">
>     <a class="button is-play" href="#">
>         <div class="button-outer-circle has-scale-animation"></div>
>         <div class="button-outer-circle has-scale-animation has-delay-short"></div>
>         <div class="button-icon is-play"><svg height="100%" width="100%" fill="#f857a6"><polygon class="triangle" points="5,0 30,15 5,30" viewBox="0 0 30 15"></polygon><path class="path" d="M5,0 L30,15 L5,30z" fill="none" stroke="#f857a6" stroke-width="1"></path></svg></div>
>     </a>
> </div>
> ---css
> .container {
>   display: flex;
>   justify-content: center;
>   align-items: center;
>   padding: 50px 0;
>   width: 100%;
> }
> .button {
>   display: inline-block;
>   position: relative;
> }
> .button.is-play {
>   background-color: #fff;
>   border-radius: 50%;
>   width: 100px;
>   height: 100px;
> }
> .button.is-play .button-outer-circle {
>   background: rgba(255,255,255,0.2);
>   border-radius: 50%;
>   position: absolute;
>   top: 0;
>   left: 0;
>   right: 0;
>   bottom: 0;
>   height: 100%;
>   width: 100%;
> }
> .button.is-play .button-icon {
>   position: absolute;
>   top: 50%;
>   left: 50%;
>   width: 30px;
>   height: 30px;
>   transform: translate(-50%, -50%);
> }
> .button.is-play .button-icon .triangle {
>   animation: fadeIn 7s ease;
> }
> .button.is-play .button-icon .path {
>   stroke-dasharray: 90;
>   stroke-dashoffset: 0;
>   animation: triangleStroke 3s;
>   animation-timing-function: ease;
> }
> .has-scale-animation {
>   animation: smallScale 3s infinite;
> }
> .has-delay-short {
>   animation-delay: 0.5s;
> }
> @-moz-keyframes fadeIn {
>   from {
>     opacity: 0;
>   }
>   to {
>     opacity: 1;
>   }
> }
> @-webkit-keyframes fadeIn {
>   from {
>     opacity: 0;
>   }
>   to {
>     opacity: 1;
>   }
> }
> @-o-keyframes fadeIn {
>   from {
>     opacity: 0;
>   }
>   to {
>     opacity: 1;
>   }
> }
> @keyframes fadeIn {
>   from {
>     opacity: 0;
>   }
>   to {
>     opacity: 1;
>   }
> }
> @-moz-keyframes triangleStroke {
>   from {
>     stroke-dashoffset: 90;
>   }
>   to {
>     stroke-dashoffset: 0;
>   }
> }
> @-webkit-keyframes triangleStroke {
>   from {
>     stroke-dashoffset: 90;
>   }
>   to {
>     stroke-dashoffset: 0;
>   }
> }
> @-o-keyframes triangleStroke {
>   from {
>     stroke-dashoffset: 90;
>   }
>   to {
>     stroke-dashoffset: 0;
>   }
> }
> @keyframes triangleStroke {
>   from {
>     stroke-dashoffset: 90;
>   }
>   to {
>     stroke-dashoffset: 0;
>   }
> }
> @-moz-keyframes smallScale {
>   from {
>     transform: scale(1);
>     opacity: 1;
>   }
>   to {
>     transform: scale(1.5);
>     opacity: 0;
>   }
> }
> @-webkit-keyframes smallScale {
>   from {
>     transform: scale(1);
>     opacity: 1;
>   }
>   to {
>     transform: scale(1.5);
>     opacity: 0;
>   }
> }
> @-o-keyframes smallScale {
>   from {
>     transform: scale(1);
>     opacity: 1;
>   }
>   to {
>     transform: scale(1.5);
>     opacity: 0;
>   }
> }
> @keyframes smallScale {
>   from {
>     transform: scale(1);
>     opacity: 1;
>   }
>   to {
>     transform: scale(1.5);
>     opacity: 0;
>   }
> }
> ```

> [!question]- Mögliche Gedanken zur Diskussion
> 
> ### Auflösung
> Einer der Hauptunterschiede zwischen Raster- und Vektordateien ist deren Auflösung. Die Auflösung einer **Rasterdatei** wird in DPI (dots per inch) oder PPI (pixels per inch) angegeben. Wenn man in eine Rastergrafik hineinzoomt oder ihre Grösse vergrössert, beginnt man, die einzelnen Pixel zu erkennen.
> 
> **Rasterdateien** nutzen meist mehr Farben, ermöglichen eine umfangreichere Farbbearbeitung und zeigen feinere Licht- und Schatteneffekte als Vektoren – verlieren jedoch an Bildqualität, wenn sie in der Grösse verändert werden. Ein einfacher Weg, um festzustellen, ob ein Bild eine Raster- oder Vektorgrafik ist, besteht darin, es zu vergrössern. Wenn das Bild unscharf oder pixelig wird, handelt es sich wahrscheinlich um eine Rasterdatei.
> 
> Für **Vektorbilder** ist die Auflösung kein Problem. Man kann Vektoren unendlich skalieren, umformen und anpassen, ohne an Bildqualität zu verlieren. Vektordateien sind beliebt für Bilder, die in einer Vielzahl von Grössen erscheinen müssen, wie z.B. ein Logo, das sowohl auf einer Visitenkarte als auch auf einem Plakat passen muss.
> 
> ### Verwendungszwecke
> Digitale Fotos sind Rasterdateien. Viele Digitalkameras schiessen automatisch Fotos und speichern sie als Rasterdateien – und die Bilder, die man online sieht, sind oft auch Rastergrafiken. Rasterdateien werden auch häufig für die Bearbeitung von Bildern, Fotos und Grafiken verwendet.
> 
> **Vektordateien** eignen sich besser für digitale Illustrationen, komplexe Grafiken und Logos. Das liegt daran, dass die Auflösung von Vektoren beim Skalieren gleich bleibt, was sie für eine Vielzahl von Druckformaten geeignet macht. Das Vektorformat SVG ist ein etablierter Web-Standard und wird auf Webseiten oft gebraucht, um kleine Symbole zu animieren (z.B. der Play-Knopf auf Youtube).
> 
> Manche Dateitypen können sowohl Raster- als auch Vektorbilder kombinieren - allen voran PDFs und Word-Dateien. Zum Beispiel könnte eine Broschüre Vektorgrafiken für das Firmenlogo und den Text verwenden, aber Rasterdateien für die Fotografie.
> 
> ### Dateigrössen
> **Rasterdateien** sind im Allgemeinen grösser als Vektordateien. Sie können Millionen von Pixeln und unglaublich hohe Detailstufen enthalten. Ihre Grösse kann den Speicherplatz von Geräten beeinträchtigen und das Laden von Seiten im Web verlangsamen. Allerdings kann man Rasterdateien komprimieren, um sie für die Speicherung und Web-Optimierung zu optimieren, oder um das Teilen schneller und einfacher zu machen.
> 
> **Vektordateien** brauchen weniger Speicherplatz als Rasterdateien und enthalten nur die mathematischen Formeln, die das Design bestimmen.
> 
> ### Kompatibilität und Konvertierung
> **Rasterdateien** können in vielen verschiedenen Apps und Webbrowsern geöffnet werden, was sie leicht zu betrachten, bearbeiten und teilen macht. Bis auf SVG sind viele andere **Vektordateien** nicht so zugänglich. PDF, AI, oder EPS erfordern spezialisierte Software, um die Dateien zu öffnen und zu bearbeiten.
> 
> ### Datei- und Erweiterungstypen
> Die verwendete Software bestimmt in der Regel den Dateityp, ob Raster oder Vektor. Es gibt mehrere Typen und Erweiterungen von sowohl Raster- als auch Vektordateien, jede mit ihren eigenen Merkmalen.
> 
| Dateityp | Format | Verwendung                   | Besonderheiten                                              |
|----------|--------|------------------------------|-------------------------------------------------------------|
| Raster   | JPEG   | Fotos, Web                   | Hohe Kompression, Verlust an Bildqualität                   |
| Raster   | PNG    | Web, Transparenz             | Unterstützt Transparenz, verlustfreie Kompression           |
| Raster   | GIF    | Animationen, Web             | Einfache Animationen, begrenzte Farbpalette                 |
| Raster   | BMP    | Unkomprimierte Bilder        | Keine Kompression, große Dateigröße                         |
| Raster   | WebP   | Web, fortschrittliche Nutzung| Moderne Bildformat, unterstützt sowohl Verlust- als auch verlustfreie Kompression sowie Animationen |
| Vektor   | SVG    | Web, Druck                   | Skalierbar ohne Qualitätsverlust, Webstandard |
| Vektor   | AI     | Grafikdesign                 | Adobe Illustrator Format, vielseitige Bearbeitungsoptionen  |
| Vektor   | EPS    | Druck, Design                | Weit verbreitet für Druckgrafiken, kompatibel mit vielen Programmen |
| Vektor   | PDF    | Universelle Dokumente        | Hauptsächlich vektorbasiert, kann aber auch Rastergrafiken enthalten |


> [!note] Theorieeintrag
> 
> ## Theorie: Zwei grundlegende Grafikformate
> 
> ### Rastergrafiken
> 
> Die kleinste Einheit einer Rastergrafik ist ein **Pixel**, also ein einzelner kleiner Punkt, meist quadratisch, mit einer Farbe. Pixel wird oft mit "px" abgekürzt. 
> 
> Wir haben uns die **Datenmenge eines Bildes** überlegt. Die gesamte zu speichernde Information ist:
> $$\text{Anzahl Pixel} \times \text{Farbinformation pro Pixel}$$
> Wir haben uns die Datenmenge als Quader vorgestellt und für die Farbinformation pro Pixel den Begriff der **Farbtiefe** benutzt.
> $$\text{Breite (px)} \times \text{Höhe (px)} \times \text{Farbtiefe (Bit)}$$
> ![[ginf-b02-colordepth-comparison.png]]
> 
> Aufgepasst: Die Farbtiefe wird teils pro Farbkanal und teils pro Pixel angegeben – das ist ein grosser Unterschied! Gang und gäbe ist z.B. eine Farbtiefe von **8-Bit pro Farbkanal**. Ein RGB-Bild hat drei Farben, also ist die entsprechende **Farbtiefe pro Pixel 24-Bit**.
> 
> Gängige Formate für Rastergrafiken sind jpg, png, webp, gif. In der Praxis komprimieren all diese Formate die Datenmenge mit verschiedenen Algorithmen.
> 
> ### Vektorgrafiken
> 
> Vektorgrafiken werden mit geometrischen Formen beschrieben: z.B. Kurven, Kreise, Linien, etc. Ihre kleinste Einheit ist also eine Figur – Pixel haben sie nicht. 
> 
> Vektorgrafiken lassen sich **ohne Qualitätsverlust** vergrössern. PDFs bestehen hauptsächlich aus Vektorgrafiken. Typische Beispiele sind Schriftarten, Logos und Grafiken mit scharfen Linien.
> 
> ![[rastervektor 1.svg]]
> 
> Das verbreitetste Grafikformat für Vektoren ist SVG, das Teil der modernen Webstandards ist und sich nahtlos in Webseiten integriert. Als solche können SVG-Elemente direkt animiert werden – wie z.B. der Play-Button bei Youtube.

[[ginf-b02l0506-zahlen-hex-farben|Zurück]]
[[ginf-b02l0910-welchesformat|Weiter]]
