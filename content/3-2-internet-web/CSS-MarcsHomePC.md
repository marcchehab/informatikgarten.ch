# Einführung in CSS

## Was ist CSS?

CSS steht für "Cascading Style Sheets" und ist eine Stylesheet-Sprache, die verwendet wird, um das Aussehen und Layout von Webseiten zu gestalten, die in HTML geschrieben sind. Kurz gesagt, während HTML die Struktur und den Inhalt einer Webseite beschreibt, bestimmt CSS, wie diese Elemente aussehen und angeordnet sind.


> [!warning] Achtung
> Auch CSS ist keine Programmiersprache, weil sie keine Logik oder Funktionen beinhaltet, die Dinge berechnen oder Entscheidungen treffen können.

## CSS-Selektoren

Eine typische CSS-Anweisung ist im `<head>`-Teil des HTML-Elements in `<style>`-Tags eingeschlossen und sieht so aus:

```html
<style>
h1 {
	color: red;
	font-family: Arial, sans-serif;
	font-weight: 700;
}
</style>
```

Der Schlüssel zur Arbeit mit CSS sind die "Selektoren" vor der geschweiften Klammer `{`, hier also `h1`. Ein Selektor ist der Teil einer CSS-Regel, der bestimmt, welche Elemente im HTML-Dokument vom nachfolgenden Formatierungsstil betroffen sind. Es gibt verschiedene Arten von Selektoren:

- **Elementselektor:** Stile werden auf alle Elemente eines bestimmten Typs angewendet. Zum Beispiel wendet `p { color: red; }` den Stil auf alle `<p>` (Paragraph) Elemente an.

- **Klassenselektor:** Stile werden auf alle Elemente mit einer bestimmten Klasse angewendet. Klassen werden im HTML-Element mit dem Attribut `class` definiert. Zum Beispiel wendet `.myClass { color: red; }` den Stil auf alle Elemente mit `class="myClass"` an.

- **ID-Selektor:** Stile werden auf das Element mit einer bestimmten ID angewendet. IDs werden im HTML-Element mit dem Attribut `id` definiert und sollten eindeutig sein. Zum Beispiel wendet `#myID { color: red; }` den Stil auf das Element mit `id="myID"` an.

Diese drei Arten von Selektoren können fast beliebig kombiniert werden. Folgendes Beispiel selektiert nicht alle `<h1>`-Elemente, sondern nur die mit der Klasse "`artikelheadline`".

```css
h1.artikelheadlline {
	font-weight: 900;
}
```

Überlegen Sie sich mal, welche der folgenden Tags jetzt selektiert würde:
1. `<h1 class="artikelheadline blau">Wichtige Headline!</h1>` 
2. `<h1 class="blau">Über uns</h1>`
3. `<p class="artikelheadline blau">Möchtegern Headline</p>`
4. `<h1 class="artikelheadline orange">Noch eine Headline!</h1>`

## Häufig verwendete CSS-Formatierungen

1. **Farbe (`color`):** Definiert die Textfarbe. Zum Beispiel: `color: red;`

2. **Hintergrundfarbe (`background-color`):** Definiert die Hintergrundfarbe eines Elements. Zum Beispiel: `background-color: blue;`

3. **Schriftart (`font-family`):** Definiert die Schriftart des Textes. Zum Beispiel: `font-family: Arial, sans-serif;`

4. **Schriftgröße (`font-size`):** Definiert die Größe des Textes. Zum Beispiel: `font-size: 16px;`

5. **Rand (`border`):** Definiert einen Rand um ein Element. Zum Beispiel: `border: 1px solid black;`

6. **Padding (`padding`):** Definiert den Abstand zwischen dem Inhalt eines Elements und seinem Rand. Zum Beispiel: `padding: 10px;`

7. **Margin (`margin`):** Definiert den Abstand zwischen Elementen. Zum Beispiel: `margin: 20px;`

8. **Breite (`width`):** Definiert die Breite eines Elements. Zum Beispiel: `width: 50%;`

9. **Höhe (`height`):** Definiert die Höhe eines Elements. Zum Beispiel: `height: 100px;`

10. **Text-Ausrichtung (`text-align`):** Definiert die horizontale Ausrichtung des Textes. Zum Beispiel: `text-align: center;`

Die Kombination von HTML und CSS ermöglicht es uns, sowohl den Inhalt als auch das Aussehen von Webseiten zu steuern.

> [!example] Jetzt sind Sie dran!
> 
> Formatieren Sie das HTML-Grundgerüst Ihrer ersten Webseite bei Codepen. Erstellen Sie mindestens vier Regeln für HTML-Elemente. 
> Geben Sie einem Bild eine Breite von 200px und dann 50%.
> Machen Sie Ihre Paragraphen *kursiv*.

## Verschachtelte Selektion

Selektoren können auch "verschachtelt" selektieren. 

```css
p .highlight {
  background:red;
}
```

Das CSS mit einem **Leerschlag** zwischen `p` und `.highlight` selektiert alle Elemente mit der Klasse `highlight`, **aber nur, wenn die Elemente innerhalb eines `<p>`-Elements verschachtelt sind.**


> [!warning] Achtung
> `<p>` muss nicht direkt oberhalb des Elements mit der Klasse `highlight` sein. Es kann auch ein entferntes Eltern-Element sein - die Grosseltern oder Ur-Grosseltern zum Beispiel.

Schauen wir uns das in der Praxis an.

```codepen
---html
<p>Hier ein erster Paragraph</p>

<p>Ein zweiter Paragraph mit <span class="highlight">einem Highlight</span>.</p>

<span>Funktioniert dieser dritte Paragraph <span class="highlight">mit einem Highlight</span>, ohne ein übergeordnetes &lt;p&gt;-Tag?</span>

<p><span>Vierter Paragraph: Wird auch <span class="highlight">ein Highlight</span> selektiert, das indirekt ein &lt;p&gt;-Tag als Eltern hat? Ja, offenbar.</span></p>
---css
p .highlight {
  background:red;
}
```

Wie Sie sehen:
* Im zweiten Paragraph funktioniert das Highlight, weil es einem `<p>`-Tag untergeordnet ist.
* Im dritten Paragraph funktioniert das Highlight nicht, weil es keinem `<p>`-Tag untergeordnet ist.
* Auch im vierten Paragraph funktioniert das Highlight, weil es indirekt einem `<p>`-Tag untergeordnet ist.

## Selektoren-Spiel

So, nun haben Sie alle Infos, um die Challenge "CSS Diner" bis ins Level 11 zu bestehen. Sie sehen rechts jeweils den HTML-Code und müssen links eine CSS-Selektor für die gefragten Elemente schreiben.

Falls CSS Diner auf dieser Webseite zu wenig Platz hat, können Sie [die Webseite auch direkt öffnen](https://flukeout.github.io/).

<iframe src="https://flukeout.github.io/" width="100%" height="800px"></iframe>

## Wer gewinnt bei Widersprüchen?
Was, wenn verschiedene Selektoren widersprüchliche Stile definieren? Schauen Sie bei diesem Beispiel **zuerst das HTML und CSS** an und überlegen Sie sich, wo der Widerspruch entsteht.

```codepen { data-default-tab="html" }
---html
<h1>Willkommen auf meiner Webseite!</h1>
<p>Dies ist ein Paragraph.</p>
<p>Und hier ist ein zweiter Paragraph!</p>
<p class="rot">Dies ist dritter Paragraph.</p>
<p>Und hier ist ein zweiter Paragraph!</p>
---css
p.rot {
	color: red;
}
p {
	color: grey;
}
```

Der Widerspruch ist im dritten Paragraphen: Die erste CSS-Stilregel formatiert den Paragraphen rot mit `p.rot`, die zweite formatiert ihn aber grau mit `p`! Was zählt nun und wieso? Schauen Sie sich jetzt das Resultat an.

Wenn es widersprüchliche CSS-Regeln gibt, folgt der Browser dem Prinzip der **Spezifität**. Das heisst, die Regel mit der detailliertesten Zielauswahl wird angewendet. Die Spezifität wird durch ein Punktesystem bestimmt: 
* Element- und Pseudoelement-Selektoren (zum Beispiel `p` oder `::before`) haben die Spezifität 1
* Klassenselektoren, Attributselektoren und Pseudoklassenselektoren (zum Beispiel `.class`, `[attr=value]` oder `:hover`) haben die Spezifität 10 
* ID-Selektoren (zum Beispiel `#id`) haben die Spezifität 100

Deswegen wird der dritte Paragraph im obigen Beispiel rot!
* `p.rot` besteht aus einem Tag und einer Klasse, das gibt der Regel 11 Punkte.
* `p` besteht bloss aus einem Tag, das gibt der Regel bloss einen Punkt.

Mit diesem Wissen können Sie mir helfen, den Fehler in meinem Code [hier auf Codepen](https://codepen.io/marcchehab/pen/rNqPOKq) zu finden!

<nav class="bottomnav">
[[HTML]]
[[Javascript]]
</nav>