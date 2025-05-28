---
title: HTML - Hypertext Markup Language
---
# Hypertext Markup Language
> [!success] Lernziele
> 
> - Sie wissen, was HTML-Tags sind und können verschachtelte Tags erstellen.
> - Sie können fehlerhafte Verschachtelungen erkennen - z.B. `<p><i>Text</p></i>`
> - Sie haben erste rudimentäre Inhalte mit HTML kreiert.

Am Anfang von Webseiten steht oft https://. Das steht für "Hypertext Transfer Protocol Secure". Da wird also ein *Hyper*-text übermittelt, was so viel bedeutet wie *Übertext* - also etwas, das mehr als nur reiner Text ist. Konkret handelt es sich um Text mit Formatierungen (**fett**, *kursiv*, etc.) und Extrafunktionen wie z.B. Hyperlinks, die man anklicken kann. (Stellen Sie sich mal schreibmaschinenschreibende Babyboomer vor, dann realisieren Sie, was das für eine Revolution war!)
## HTML - die Sprache für Hypertext

HTML ist die mit Abstand verbreiteste Variante von Hypertext. Die Buchstaben stehen für "Hypertext Markup Language" und beschreibt solche Hypertexte. Heutzutage ist das weit mehr als Text - sondern ganze Websites. HTML gibt die Struktur und damit auch das rudimentäre Aussehen von Webseiten vor.
## HTML-Tags

HTML-Dokumente bestehen aus sogenannten "Tags". Ein Tag ist eine Textmarke mit eckigen Klammern, die Inhalte auf bestimmte Weise kennzeichnet. Zum Beispiel sieht ein Paragraph-Tag so aus:

```html
<h1>Das ist ein Titel des. 1. Rangs.</h1>
<p>Dies ist ein Paragraph.</p>
```

Die meisten Tags werden paarweise verwendet: ein öffnender Tag `<p>` und ein schliessender Tag mit einem `/`-Slash `</p>` umschliessen den Inhalt. 

Es gibt auch Tags, die kein Textinhalt umschliessen müssen und deswegen auch kein schliessendes Tag brauchen - wie z.B. ein Bild, das mit einem `<img>`-Tag definiert wird. 

> [!NOTE]- Übrigens... ein bisschen Detailwissen
> 
> In einigen verwandten Sprachen (XML, XHTML, JSX) schliesst man diese Tags direkt (`<img />`), in HTML würde der Slash einfach ignoriert.

Tags können hierarchisch verschachtelt werden. 

```html
<h1>Das ist ein Titel des. 1. Rangs.</h1>
<p>Dies ist ein Paragraph mit ein bisschen <i>kursivem Text</i>.</p>
```

## Die Struktur eines HTML-Dokuments

Ein HTML-Dokument stellt als Ganzes eine Baumstruktur dar, in der die Tags nach einer hierarchischen Logik geöffnet und geschlossen werden, sodass letztlich alles Teil der logischen Struktur ist.

Hier ist ein einfaches Beispiel für die Struktur eines HTML-Dokuments:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Meine erste Webseite</title>
  </head>
  <body>
    <h1>Willkommen auf meiner Webseite!</h1>
    <p>Dies ist ein Paragraph.</p>
    <p>Und hier ist ein zweiter Paragraph!</p>
  </body>
</html>
```

In diesem Beispiel ist `<html>` das Wurzel- oder "root"-element des Baums. Es hat zwei Kinder: `<head>` und `<body>`. Das `<head>`-Element hat wiederum ein Kind, das `<title>`-Element. Das `<body>`-Element hat drei Kinder: ein `<h1>`-Element und zwei `<p>`-Elemente.

Diese Struktur mit `<html>` als Wurzelelement und zwei Kindern `<head>` und `<body>` bildet die Grundlage aller HTML-Dokumente und bieten viele Möglichkeiten, um strukturierte und interaktive Webseiten zu erstellen.

Aber für was sind diese Tags konkret?

| Tag | Beschreibung |
| --- | --- |
| `<!DOCTYPE html>` | Definiert den Dokumenttyp und die HTML-Version. |
| `<html>` | Definiert das Wurzelelement eines HTML-Dokuments. |
| `<head>` | Enthält Metainformationen wie den Titel der Webseite und Verweise auf Stylesheets. |
| `<title>` | Definiert den Titel des Dokuments, der in der Titelleiste des Browsers angezeigt wird. |
| `<body>` | Definiert den Hauptinhalt des HTML-Dokuments. |
| `<h1>` bis `<h6>` | Definieren Überschriften. `<h1>` ist die höchste (und grösste) Überschriftenebene, `<h6>` die niedrigste (und kleinste). |
| `<p>` | Definiert einen Absatz. |


> [!warning] Achtung
> HTML ist keine Programmiersprache, weil sie keine Logik oder Funktionen beinhaltet, die Dinge berechnen oder Entscheidungen treffen können. Es ist stattdessen eine "Markup"-Sprache, die dazu dient, Inhalt, Struktur und Format einer Webseite zu beschreiben.

## Ihre erste Webseite

Wir erstellen nun in einem Online-Editor mit Live-Vorschau eine Webseite, damit wir sehen, wie das mit den Tags funktioniert. [Bei Codepen habe ich Ihnen eine Vorlage dazu erstellt.](https://codepen.io/marcchehab/pen/LYgBaJz)

```codepen
---html
<h1>Ein grosser Titel</h1>
<h2>Über diese Seite</h2>
<p>Dies ist eine Beispielwebseite, die zu Demonstrationszwecken erstellt wurde. Wir lernen über HTML!</p>

<h2>HTML-Grundlagen</h2>
<p>HTML steht für Hypertext Markup Language. Es wird verwendet, um Inhalte im Web zu strukturieren.</p>
<h2>Kontakt</h2>
<p>Bei Fragen können Sie mich gerne kontaktieren. Vielen Dank für Ihren Besuch auf meiner Webseite!</p>
```


> [!example] Jetzt sind Sie dran!
> 
> Erstellen Sie das HTML-Grundgerüst Ihrer ersten Webseite bei Codepen. Ihre Webseite soll mindestens 
> - drei Überschriften, 
> - fünf Paragraphen, 
> - zwei Bilder und 
> - eine Liste enthalten.
> 
> Wenn Sie eine Herausforderung wollen: Versuchen Sie eine Tabelle zu erstellen, oder gehen Sie auf Youtube, suchen Sie ein Video und suchen Sie den "Einbetten"-Code unter "Teilen".

Für diese Aufgabe können Sie folgende HTML-Tags verwenden.

| Tag                  | Beschreibung                                                                                                                          |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `<h1>` bis `<h6>`    | Definieren Überschriften. `<h1>` ist die höchste (und grösste) Überschriftenebene, `<h6>` die niedrigste (und kleinste).              |
| `<p>`                | Definiert einen Absatz.                                                                                                               |
| `<br>`               | Fügt einen Zeilenumbruch ein (wird nicht geschlossen).                                                                                |
| `<hr>`               | Fügt eine horizontale Trennlinie ein.                                                                                                 |
| `<a href="url">`     | Definiert einen Hyperlink.                                                                                                            |
| `<img src="url">`    | Definiert ein Bild.                                                                                                                   |
| `<ul>`               | Definiert eine ungeordnete (Aufzählungs-)Liste.                                                                                       |
| `<ol>`               | Definiert eine geordnete (nummerierte) Liste.                                                                                         |
| `<li>`               | Definiert ein Listen-Element in einer `<ul>` oder `<ol>` Liste.                                                                       |
| `<div>`              | Definiert einen Abschnitt in einem Dokument. Wird oft verwendet, um Boxen oder Blöcke von Elementen für Styling-Zwecke zu gruppieren. |
| `<span>`             | Definiert einen "Inline"-Abschnitt im Lauftext. Wird oft verwendet, um einen Teil eines Textes für Styling-Zwecke zu kennzeichnen.    |
| `<table>`            | Definiert eine Tabelle.                                                                                                               |
| `<tr>`               | Definiert eine Tabellenreihe.                                                                                                         |
| `<td>`               | Definiert eine Tabellenzelle.                                                                                                         |
| `<th>`               | Definiert eine Tabellenüberschrift.                                                                                                   |
| `<iframe src="url">` | Bettet eine andere HTML-Seite komplett unabhängig ein, z.B. ein Youtube-Video.                                                        |
|                      |                                                                                                                                       |

"url" steht für *Uniform Resource Locator* und kann eine komplette Webadresse sein.

![[url-parts.excalidraw]]
## Attribute in HTML-Tags

In HTML können Tags zusätzliche Informationen in Form von Attributen enthalten. Attribute bieten weitere Spezifikationen oder Eigenschaften des Elements. Sie erscheinen immer im Start-Tag und ihre Werte sind immer in Anführungszeichen eingeschlossen.

Ein `<img>`-Tag könnte [dieses Gif von giphy.com](https://giphy.com/gifs/HostGator-webhosting-hostgator-webhost-fuJPZBIIqzbt1kAYVc) so einfügen:

```html
<img src="giphy.gif" alt="Ein schönes Bild zu HTML, CSS und Javascript" width="400">
```

In diesem Beispiel definiert das `src`-Attribut den Pfad zur Bilddatei, das `alt`-Attribut liefert eine Beschreibung des Bildes und die Attribute `width` und `height` definieren die Abmessungen des Bildes. Das sieht dann so aus:

![[giphy.gif]]

Hier einige häufig verwendete Attribute:

- **`src="bild.jpg"`**: Wird in Tags wie `<img>`, `<script>` und `<iframe>` verwendet, um die Quelle der eingebetteten Inhalte zu definieren.
- **`href="https://www.google.com/"`**: Wird im `<a>`-Tag als Link verwendet, um die URL der Destination zu definieren.
- **`class="headline activated"`**: Definiert eine oder mehrere Klassen für ein Element. Dieses Attribut wird oft verwendet, um Elemente für CSS- oder JavaScript-Anweisungen auszuwählen.
- **`id="shoppingcart"`**: Definiert eine eindeutige ID für ein Element. Dieses Attribut wird oft verwendet, um ein spezielles Element für CSS- oder JavaScript-Anweisungen auszuwählen.
- **`style="color:red;"`**: Wird verwendet, um Inline-CSS-Stile direkt auf das Element anzuwenden.
- **`alt`**: Wird im `<img>`-Tag verwendet, um alternativen Text für ein Bild zu liefern, der angezeigt wird, wenn das Bild nicht geladen werden kann, oder für Menschen mit Sehbeeinträchtigungen.
## Aussicht: Webseiten bestehen aus mehreren Sprachen

Auf der Codepen Homepage ist es so, dass der Inhalt der HTML-Box dem Inhalt des `<body>`-Tags entspricht. D.h. Sie müssen nicht die ganze HTML-Struktur kopieren, sondern Codepen erstellt automatisch die HTML-Struktur und fügt den Code an der richtigen Stelle ein:

```html
<!DOCTYPE html>
<html>
  <head>
	  <style>
```
![[css.png]]
```html
	  </style>
	  <script>
```
![[js.png]]
```html
	  </script>
  </head>
  
  <body>
  ```
![[html.png]]
  ```
  </body>
</html>
```

Als Aussicht auf die nächste Lektion sehen Sie hier das Zusammenspiel von HTML und CSS:

```codepen
---html
<p>HTML steht für Hypertext Markup Language. Es wird verwendet, um Inhalte im Web zu strukturieren.</p>
---js
let a = 5; //Einfach als Beispiel
---css
body {
  background-color:#FFF455;
}

p {
	color:#007F73;
  background-color: #4CCD99;
  padding: 5px;
  border-radius:5px;
}
```

Als Nächstes schauen wir, wie man HTML schön aussehen lässt: mit CSS.
