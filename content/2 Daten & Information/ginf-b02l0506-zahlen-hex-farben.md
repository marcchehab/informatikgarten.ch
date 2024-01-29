---
title: "L05+L06: Zahlen mit Buchstaben? Hex und das RGB-Farbmodell"
---
> [!success]  Lernziele
> 
> *Hinweis: Wir behandeln keine Umwandlungen, die grösser als zwei Byte oder 65'535<sub>10</sub> sind.*
> 
> - Sie können Binärzahlen und Hexadezimalzahlen in 4-Bit-Paketen ineinander umwandeln.
> - Sie wissen, wie das RGB-Farbmodell funktioniert.
> - Sie wissen, was beispielsweise 3-Bit-Farbtiefe pro Kanal bedeutet und wie viele Farben man daraus mischen kann.
> - Sie verstehen die Inhalte des Theorieeintrags
## Hexadezimal: Zahlen mit Buchstaben?

Stellen Sie sich nun einmal einen Computerspeicher mit mehreren Bytes vor: Natürlich können wir Menschen nichts damit anfangen.

![[Pasted image 20231112160511.png|invert]]

Gäbe es nicht ein Zahlensystem, dass näher an diesen binären Zahlen dran ist, aber trotzdem einfacher zu lesen? 

Führen Sie sich vor Augen, dass ein Byte zweimal 4 Bit hat. Wie viele verschiedene Zahlen können Sie mit 4 Bit darstellen?

Die grösste Zahl ist 1111<sub>2</sub> = 15<sub>10</sub>, und dazu noch 0. Also 16 verschiedene Zahlen. Hätten wir doch ein Zahlensytem, dass 16 als Basis hätte...

![[Pasted image 20231112161555.png|invert]]

Schaffen wir uns unser Glück doch selbst und kreieren ein Zahlensystem, dass 16 als Basis hat! Natürlich haben wir zu wenig Zeichen dafür, weil wir im Dezimalsystem leben. Aber nehmen wir einfach Buchstaben!

Jetzt achten Sie darauf, wie elegant das hexadezimale Zahlensystem aufs binäre passt:

|**Hexadezimal**|**Binär**|**Dez**|
|---:|---|---|
|0|0000'0000|0|
|1|0000'0001|1|
|2|0000'0010|2|
|3|0000'0011|3|
|4|0000'0100|4|
|5|0000'0101|5|
|6|0000'0110|6|
|7|0000'0111|7|
|8|0000'1000|8|
|9|0000'1001|9|
|A|0000'1010|10|
|B|0000'1011|11|
|C|0000'1100|12|
|D|0000'1101|13|
|E|0000'1110|14|
|F|0000'1111|15|
|10|0001'0000|16|
|11|0001'0001|17|
|12|0001'0010|18|
|13|0001'0011|19|
|14|0001'0100|20|
|15|0001'0101|21|
|16|0001'0110|22|
|17|0001'0111|23|
|18|0001'1000|24|
|19|0001'1001|25|
|1A|0001'1010|26|
|1B|0001'1011|27|
|1C|0001'1100|28|
|1D|0001'1101|29|
|1E|0001'1110|30|

Wunderbar! Eine Ziffer aus dem Hexadezimalsystem ist genau vier Bit lang! Das heisst: 
- Sie können ein Byte immer in genau zwei Hex-Ziffern ausdrucken. 
- Anders als beim Dezimalsystem können Sie beide Hex-Ziffern getrennt in Binär umwandeln.

> [!NOTE] Theorieeintrag Binär, Dezimal, Hexadezimal
> 
> Den Theorieeintrag erstellen wir zusammen in Onenote. Wir lernen:
> - Umrechnen hexadezimal zu dezimalen mit der **Summenschreibweise**.
> - Umrechnen dezimal zu hexadezimal mit:
> 	- Divisionsmethode
> 	- Zerlegen in Potenzen
> - Umrechnen binär zu hexadezimal in 4-Bit-Paketen
> - Umrechnen hex zu binär in 4-Bit-Paketen

## Farben in RGB

Gratulation! Jetzt haben Sie das Rüstzeugs, ein grundlegendes Konzept zu verstehen, das Sie täglich umgibt: **Farben und Farbmodelle**!

Wenn Sie Ihren Bildschirm aus der Nähe anschauen, merken Sie, dass sie aus kleinen, farbig leuchtenden Stellen bestehen. Hier eine Nahaufnahme von Wikipedia:
![[ginf-b02l0506-rgb.svg]]

Wie LCDs genau farbiges Licht erzeugen ist sehr interessant! Falls Sie das interessiert, hier [ein Youtube-Video dazu](https://youtu.be/gA2mG6MieV8?si=lFMIjN2Eh-RKs_lO&t=155). Aber Sie können die Informatik problemlos verstehen, ohne die Physik davon überhaupt anzuschauen.

Diese "Lämpchen" sind **rot**, dann **grün**, dann **blau**, und dann wieder rot, grün, blau, und so weiter. Ein Dreierpack aus einem roten, grünen und blauen "Lämpchen" ist ein RGB-Pixel. 

RGB-Pixel haben also mindestens folgende Charakteristiken:
- Werte für Rot, Grün, Blau
- Koordinaten

### Farbtiefe

Stellen Sie sich mal vor, wir könnten diese RGB-Lämpchen einfach nur ganz ein- oder ausschalten. Wie viele Mischfarben könnten wir erzeugen?
> [!question]- Lösung
> 
> Um es sich einfach zu machen, können Sie sich in diesem Beispiel einen RGB-Pixel als eine einzelne Binärzahl vorstellen.
> 
> - <span style={{color:"red"}}>0</span><span style={{color:"green"}}>0</span><span style={{color:"blue"}}>0</span><sub>2</sub> wäre schwarz.
> - 001<sub>2</sub> wäre blau.
> - 010<sub>2</sub> wäre grün.
> - 011<sub>2</sub> wäre die Mischung aus grün und blau, also hellblau.<br />
> 	⋮
> - 111<sub>2</sub> wäre die Mischung aller Farben, also weiss.
> 
> Wie viele Kombinationen gibt es also? 111<sub>2</sub> sind 7<sub>10</sub>, aber da wird 000<sub>2</sub> (Schwarz) nicht mitgezählt. Zusammen mit Schwarz gibt es **8 Farbkombinationen, also 2<sup>3</sup>**. 
> 
> Ohne Weiss und Schwarz sähe der Regenbogen dann so aus:
> 
> ![Pasted image 20231119131705.png](Pasted image 20231119131705.png)

Typischerweise reicht die Werte für Rot, Grün und Blau von 0 bis **255**... Diese Zahl sollte Ihnen bekannt vorkommen. 
- Was sagt Ihnen das über die **Datenstruktur** aus? 
- Wie viele **Mischfarben** können Sie daraus erzeugen?

> [!question]- Lösung
> 
> 255 ist die höchste Zahl, die Sie in einem Byte (also 8 Bit) speichern können. Das heisst: Jeder Farbkanal hat pro Pixel 8 Bit zu Verfügung, um eine Zahl zu speichern.
> 
> Als wir noch 1 Bit pro Kanal hatten, hatten wir pro Kanal 2 Zustände (2<sup>1</sup>) und deswegen 2<sup>3</sup> Farbkombinationen. Daraus erschliesst sich: 
> 
> Farbkombinationen = Zustände pro Kanal<sup>Anzahl Kanäle</sup>
> 
> Jetzt haben wir pro Kanal 2<sup>8</sup> = 256 Zustände pro Kanal (inkl. Null!). Bei drei Kanälen haben wir also 256<sup>3</sup> Kombinationen. Das gibt: 16'777'216 Farben!

Sie sehen also: Je nachdem wie viel Informationen Sie pro Farbkanal haben, desto mehr Mischfarben können Sie erzeugen. Das nennt man die Farbtiefe, die typischerweise in Bit angegeben wird ("8 bits/channel" = eine Farbtiefe von 8 Bit).

![[Pasted image 20231119130057.png]]

Wieso Farb*tiefe*? Weil Sie sich ein Bild nun als Quader vorstellen können.
- Die Anzahl Pixel in der Breite ist die Breite.
- Die Anzahl Pixel in der Höhe ist die Höhe.
- Die Farbtiefe × Anzahl Kanäle ist die Tiefe.

Die Datenmenge, die Sie benötigen, um das Bild zu speichern, ist dann einfach das Volumen des Quaders.

Wenn Sie wenig Farbtiefe haben, haben Sie wenig Mischfarben, aber auch weniger Daten. Ich habe Ihnen das hier zu visualisieren versucht. 
- Links haben Sie 1 Bit Farbtiefe - und deswegen nur wenige Farben. 
- Rechts haben Sie 4 Bit Farbtiefe - und deswegen sehen Sie mehr Farbschattierungen, aber haben auch einen grösseren Block von Daten.

![[ginf-b02-colordepth-comparison.png]]

Im Webdesign werden eben diese Ideen verwendet, um Farben zu mischen. Verändern Sie mal die Hintergrundfarbe des Informatikgartens und versuchen Sie, die Farbnotation mit Hashtag "#" zu verstehen!

```renderhtml
---html
<fieldset>
  <label for="r">R</label>
  <input type="range" min="0" max="255" id="r" step="1" value="0">
  <output for="r" id="r_out">0</output>
</fieldset>  

<fieldset>
  <label for="g">G</label>
  <input type="range" min="0" max="255" id="g" step="1" value="0">
  <output for="g" id="g_out">0</output>
</fieldset>

<fieldset>
  <label for="b">B</label>
  <input type="range" min="0" max="255" id="b" step="1" value="0">
  <output for="b" id="b_out">0</output>
</fieldset>  

<output id="hex">#000000</output>
---js
var body = document.body, 
    r = document.querySelector('#r'),
    g = document.querySelector('#g'),
    b = document.querySelector('#b'),
    r_out = document.querySelector('#r_out'),
    g_out = document.querySelector('#g_out'),
    b_out = document.querySelector('#b_out'),
    hex_out = document.querySelector('#hex');

function setColor(){
  var r_hex = parseInt(r.value, 10).toString(16),
      g_hex = parseInt(g.value, 10).toString(16),
      b_hex = parseInt(b.value, 10).toString(16),
      hex = "#" + pad(r_hex) + pad(g_hex) + pad(b_hex);
  body.style.backgroundColor = hex; 
  hex_out.value = hex;
}

function pad(n){
  return (n.length<2) ? "0"+n : n;
}

r.addEventListener('change', function() {
  setColor();
  r_out.value = r.value;
}, false);

r.addEventListener('input', function() {
  setColor();
  r_out.value = r.value;
}, false);

g.addEventListener('change', function() {
  setColor();
  g_out.value = g.value;
}, false);

g.addEventListener('input', function() {
  setColor();
  g_out.value = g.value;
}, false);

b.addEventListener('change', function() {
  setColor();
  b_out.value = b.value;
}, false);

b.addEventListener('input', function() {
  setColor();
  b_out.value = b.value;
}, false);
---css
@import url(https://fonts.googleapis.com/css?family=Roboto:700);
.renderhtmldiv{
  text-align: center;
}
fieldset{
  border: none;
}
output{
  display: inline-block;
  min-width: 2.5em;
}
label, output{
  padding: 2px 9px;
  border-radius: 3px;
  font-family: 'Roboto', sans-serif;
  color: #000;
  font-size: 1.1em;
}
label[for=r], output[for=r]{
  background-color: #f00;
}
label[for=g], output[for=g]{
  background-color: #0f0;
}
label[for=b], output[for=b]{
  background-color: #00f;
}
#hex{
  min-width: 4.5em;
  font-size: 3em;
  background: rgba(255,255,255,.3);
}
```


### Aufgabe zu Farbtiefe & Datenmenge

Wie viele Bytes an Daten brauchen Sie, wenn Sie ein unkomprimiertes RGB-Bild von 1000 Pixel Breite, 1000 Pixel Höhe und mit 8 Bit Farbtiefe speichern wollen?

> [!example] Theorieeintrag
> 
> ## Theorie: Pixel & Farbtiefe
> 
> Bei Bildern ist die kleinste Einheit ein Pixel. Ein Pixel besteht typischerweise aus:
> - Einer Zahl pro Farbkanal (drei bei RGB, eine bei Graustufe)
> - Zwei Koordinaten für x und y
> 
> Ein RGB-Bild mit 8 Bit Farbtiefe pro Farbkanal kann rund 16,8 Millionen Farben mischen, weil:
> - 8-Bit pro Kanal ⇒
> - 256 verschiedene Zustände pro Kanal ⇒ 
> - 256<sup>3</sup> Kombinationen insgesamt ⇒
> - 16,8 Millionen Kombinationen
> 
> 8-Bit-RGB wird typischerweise dezimal oder hexadezimal notiert. Ein schönes Orange wäre z.B.: 
> - `rgb(255, 64, 16)`
> - `#ff4010`. 
> 
> Das ist zweimal die gleiche Farbe, weil:
> - Rot: 255<sub>10</sub> = ff<sub>16</sub>
> - Grün: 64<sub>10</sub> = 40<sub>16</sub>
> - Blau: 16<sub>10</sub> = 10<sub>16</sub>


[[ginf-b02l0304-zahlen-bin|Zurück zu 0 und 1]]
[[ginf-b02l0708-bilder|RGB-Bilder]]
