# Javascript
In diesem Teil lernen wir JavaScript kennen, eine dynamische Programmiersprache für jeden Browser, die das Internet revolutioniert hat! Mit JavaScript können Sie interaktive Webseiten erstellen, von **simplen Animationen bis hin zu komplexen Webanwendungen**, die in Echtzeit Daten verarbeiten. Wer moderne Webentwicklung verstehen will, wird neben HTML und CSS mindestens eine weitere Sprache nicht ignorieren können: Javascript!

## Amuse-bouche: Wie HTML, CSS und Javascript zusammenarbeiten

Das [[CSS#wer-gewinnt-bei-widersprüchen|CSS-Prinzip der Spezifität]] wird oft gebraucht, um zusammen mit Javascript einfache, fallbasierte Formatierung vorzunehmen. Versuchen Sie dieses Beispiel hier nachzuvollziehen. 

```codepen
---html
<button onclick="changeColor(this)">Change color</button>
---css
button {
  background: #0084ff;
  border: none;
  border-radius: 5px;
  padding: 8px 14px;
  font-size: 15px;
  color: #fff;
  cursor: pointer;
}

button.alt {
  background: #fff;
  color: #000;
}
---js
function changeColor(elem) {
  elem.classList.toggle("alt");
}
```

Sie sehen, dem Element `<button>` wird die Klasse "alt" hinzugefügt und wieder entfernt. Und weil im CSS das Element mit der Klasse dann mehr Punkte (Spezifität) hat, wird die Formatierungsregel angewandt.

Jetzt möchten wir dieses einfache Prinzip mal etwas auf die Spitze treiben, um diesen Effekt hier zu erzeugen:

```renderhtml
---html
<div id="banner-message" class="alt">
  <p>Hello World</p>
  <button onclick="changeColor(this)">Change color</button>
</div>
---css
#banner-message {
  background: #fff;
  border-radius: 4px;
  padding: 20px;
  font-size: 25px;
  text-align: center;
  transition: all 0.2s;
  margin: 0 auto;
  width: 300px;
}

button {
  background: #0084ff;
  border: none;
  border-radius: 5px;
  padding: 8px 14px;
  font-size: 15px;
  color: #fff;
  cursor: pointer;
}

#banner-message.alt {
  background: #0084ff;
  color: #fff;
  margin-top: 40px;
  width: 200px;
}

#banner-message.alt button {
  background: #fff;
  color: #000;
}
---js
function changeColor(button) {
  let elem = button.parentNode;
  elem.classList.toggle("alt");
}
```

> [!example] Jetzt sind Sie dran!
> 
> Machen Sie diesen Effekt nach! Dazu müssen Sie hier die CSS-Formatierung so erweitern, dass der Knopf wie gewünscht die Farben ändert. 

```codepen {{ data-height=600 }}
---html
<div id="banner-message" class="alt">
  <p>Hello World</p>
  <button onclick="changeColor(this)">Change color</button>
</div>
---css
#banner-message {
  background: #fff;
  border-radius: 4px;
  padding: 20px;
  font-size: 25px;
  text-align: center;
  transition: all 0.2s;
  margin: 0 auto;
  width: 300px;
}

button {
  background: #0084ff;
  border: none;
  border-radius: 5px;
  padding: 8px 14px;
  font-size: 15px;
  color: #fff;
}
---js
function changeColor(button) {
  let banner = button.parentNode;
  banner.classList.toggle("alt");
}
```

## Events führen Funktionen aus

Das obige Beispiel funktioniert mit einem sogenannten **Eventhandler**. Das ist eine **Verknüpfung zwischen einem Ereignis auf der Webseite und einer Funktion in Javascript**. Im Beispiel ist `onclick` der Eventhandler. Er legt fest, dass beim Klicken auf den Button die Funktion `changeColor` ausgeführt wird.

```html
<button onclick="changeColor(this)">
```

Die Funktion `changeColor` ist im JavaScript-Teil definiert (unten 👇 nochmals aufgeführt). Sie sehen, dass diese Javascript-Funktion in der Klammer ein Parameter `button` verlangt. Was da rein kommt, haben wir direkt im HTML oben 👆 angegeben: `this`. Also "das da". In diesem Kontext heisst das: **Das Element, das das Ereignis auslöst** - der `<button>`.

```javascript
function changeColor(button) { ... }
```

Die Javascript funktion erhält also das Element `<button>` - und was macht sie damit?

```javascript
let banner = button.parentNode;
```

Sie definiert eine Variabel `banner`, die die `parentNode` (also das "Eltern-Element") des `<button>` ist. Welches Element ist das? Na das `<div id="banner-message">`. Und diesem Element schauen wir nun auf die Liste der CSS-Klassen, die es hat, und nutzen `classList.toggle`, um die CSS-Klasse "alt" hinzuzufügen oder zu entfernen, was wiederum das Aussehen des Banners verändert. 

Diese Interaktion, gesteuert durch JavaScript und die Eventhandler, ermöglicht dynamische und interaktive Webseiten. Die fünf wichtigsten Eventhandler in JavaScript sind:

1. `onclick`: Wird ausgelöst, wenn auf ein Element geklickt wird.
2. `onload`: Wird ausgelöst, sobald das Dokument oder ein Element vollständig geladen ist.
3. `onchange`: Wird ausgelöst, wenn der Inhalt eines Formularelements, wie z.B. eines Input-Feldes, geändert wurde.
4. `onmouseover`: Wird ausgelöst, wenn die Maus über ein bestimmtes Element bewegt wird.
5. `onmouseout`: Wird ausgelöst, wenn die Maus ein bestimmtes Element wieder verlässt.

> [!example] Jetzt sind Sie dran!
> 
> Das elegante an Eventhandlern mit `this` ist, dass eine winzige Funktion viel bewirken kann. Schauen Sie sich diesen Code an und versuchen Sie nachzuvollziehen, wie es funktioniert, dass man diese Boxen anklicken kann, und sie rot werden. Dann versuchen Sie den Code (HTML, CSS & Javascript) so zu erweitern, dass die Boxen grün werden, wenn man mit der Maus über sie fährt.

```codepen
---html
<div class="wrapper">
  <div onclick="makeRed(this)" class="box" id="A">A</div>
  <div onclick="makeRed(this)" class="box">B</div>
  <div onclick="makeRed(this)" class="box rot">C</div>
  <div onclick="makeRed(this)" class="box">D</div>
  <div onclick="makeRed(this)" class="box">E</div>
  <div onclick="makeRed(this)" class="box">F</div>
</div>
---css
.wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-gap: 10px;
  margin-bottom: 10px;
}

.box {
  background-color: #20262e;
  color: #fff;
  border-radius: 3px;
  padding: 20px;
  font-size: 14px;
}

.box.red {
  background-color: red;
}
---js
function makeRed(elem) {
elem.classList.toggle("red");
}
```

> [!hint] Ein Tipp! 
> Sie kennen ja jetzt `elem.classList.toggle("green")`, um eine CSS-Klasse hinzuzufügen und zu entfernen. Es gibt auch `elem.classList.add("green")`, die eine Klasse allenfalls hinzufügt, aber nie entfernt. Handkehrum gibt es `elem.classList.remove("green")`, die eine Klasse entfernt, aber nie hinzufügt.

Wenn Sie das mit Javascript gemacht haben, zeige ich Ihnen eine Art, das mit reinem CSS und sogenannten Pseudoklassen zu tun.

Aber generell wird dieser Mechanismus sehr häufig auch für wirklich schöne Menü-Strukturen verwendet. Hier ein schönes Beispiel einfach für den Genuss. Wichtig ist mir, dass Sie realisieren: **Hier wird der gleiche Mechanismus verwendet**!

```codepen
---html
<main class='nav'>
  <div class='nav-toggle'>
    <div class='nav-mask'></div>
  </div>
  <ul class='nav-menu'>
    <li class='nav-tab' data-tab='0'>
      <a href='#' class='nav-link'>
        <ion-icon name="home-outline" class='nav-icon'></ion-icon>
        <span class='nav-info'>Home</span>
      </a>
    </li>
    <li class='nav-tab' data-tab='1'>
      <a href='#' class='nav-link'>
        <ion-icon name="earth-outline" class='nav-icon'></ion-icon>
        <span class='nav-info'>Destination</span>
      </a>
    </li>
    <li class='nav-tab' data-tab='2'>
      <a href='#' class='nav-link'>
        <ion-icon name="airplane-outline" class='nav-icon'></ion-icon>
        <span class='nav-info'>Airline</span>
      </a>
    </li>
    <li class='nav-tab' data-tab='3'>
      <a href='#' class='nav-link'>
        <ion-icon name="calendar-outline" class='nav-icon'></ion-icon>
        <span class='nav-info'>Booking</span>
      </a>
    </li>
    <li class='nav-tab' data-tab='4'>
      <a href='#' class='nav-link'>
        <ion-icon name="cart-outline" class='nav-icon'></ion-icon>
        <span class='nav-info'>Cart</span>
      </a>
    </li>
  </ul>
</main>

<script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
<script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
---css
:root {
  --bg: rgb(59, 55, 62);
  --primary: rgb(45, 211, 208);
  --distance: 0;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  height: 100vh;
  display: grid;
  place-items: center;
  background-color: var(--bg);
}

.nav { position: relative; }

.nav-toggle {
  position: absolute;
  top: -2.5rem;
  left: 2rem;
  width: 5rem;
  height: 5rem;
  background-color: var(--primary);
  border: 8px solid var(--bg);
  border-radius: 50%;
  transform: translateX(var(--distance));
  transition: transform 0.8s;
}

.nav-mask { position: relative; }

.nav-mask::before, .nav-mask::after {
  content: '';
  position: absolute;
  width: 1.25rem;
  height: 1.25rem;
}

.nav-mask::before {
  left: -1.5rem;
  top: 2rem;
  border-top-right-radius: 1.25rem;
  box-shadow: 3px -5px var(--bg); 
}

.nav-mask::after {
  right: -1.5rem;
  top: 2rem;
  border-top-left-radius: 1.25rem;
  box-shadow: -3px -5px var(--bg);
}

.nav-menu {
  display: flex;
  list-style-type: none;
  background-color: white;
  padding: 0 2rem;
  border-radius: 1em;
}

.nav-tab {
  width: 5rem;
  height: 5rem;
  display: grid;
  place-items: center;
}

.nav-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: var(--bg);
  font: 400 0.8rem poppins,helvetica,sans-serif;
}

.nav-icon {
  font-size: 2rem;
  transition: transform 0.8s;
}

.nav-info {
  position: absolute;
  transform: translateY(2.5rem);
  visibility: hidden;
}

.active.nav-icon { transform: translateY(-2.5rem); }

.active.nav-info {
  visibility: visible;
  transform: translateY(1.5rem);
  transition: transform 0.8s, visibility 0.5s;
}
---js
const toggle = document.querySelector('.nav-toggle');
const tabs = document.querySelectorAll('.nav-tab');
const icons = document.querySelectorAll('.nav-icon');
const infos = document.querySelectorAll('.nav-info');

function reset() {
  icons.forEach((icon,i) => {
    icon.classList.remove('active');
    infos[i].classList.remove('active');
  });
}

function activate(index) {
  icons[index].classList.add('active');
  infos[index].classList.add('active');
}

function scroll() {
  const i = this.dataset.tab;
  toggle.style.setProperty('--distance',`${i}00%`)
  reset();
  activate(i);
}

window.addEventListener('load',activate(0),false);
tabs.forEach((tab) => tab.addEventListener('click',scroll,false));
```

## Input & Output
Genau dieselbe Logik mit Eventhandlern kann man auch gebrauchen, um Input und Output in Javascript zu verarbeiten. Schauen Sie sich dieses Beispiel an und versuchen Sie, den Code nachzuvollziehen. 

```codepen
---html
<h1>Input und Output</h1>
<button id="name" onclick="outputName()">Name</button>
<p>
  Ihr Name ist also <span id="outputName">____</span>. Schön, willkommen!
</p>
---js
function outputName() {
	let name = prompt("Geben Sie bitte Ihren Namen ein.");
  document.getElementById("outputName").innerHTML = name;
}
---css
#outputName {
  color: red;
}
```

Sie sehen, wir haben in der Funktion `outputName()` eine einfache Javascript-Funktion `prompt()` benutzt, die ein kleines Fenster aufspringen lässt, in dem der Nutzer etwas eingeben kann, das dann in der Variabel `name` gespeichert wird.

```javascript
let name = prompt("Geben Sie bitte Ihren Namen ein.");
```

Zudem sehen Sie, dass man den inneren Teil eines html-Tags auslesen und überschreiben kann (also `<span>`**diesen Teil**`</span>`) mit `.innerHTML`. Das HTML-Element selektieren wir hier anhand seiner ID mit `getElementByID`.

```javascript
document.getElementById("outputName").innerHTML = name;
```

> [!example] Jetzt sind Sie dran!
> Können Sie den Code so erweitern, dass es einen separaten Knopf `Wohnort` gibt, der ähnlich wie `Name` nach dem Wohnort der Person fragt, und die Antwort dann in den Satz einfüllt?
> Schaffen Sie es, dass es einen dritten Knopf `Farbe ändern` gibt, der beide Outputs `Name` sowie `Wohnort` zwischen grün und rot hin- und herwechselt?

## Ein Pirat wertet Ihren Input aus
Nun programmieren wir ein Mini-Game. Dafür brauchen wir zuerst eine gute Geschichte. Ich schlage Folgendes vor: Sie sind eines Abends in schönen Bucht vor Anker, als plötzlich eine Horde Piraten den Strand stürmt!

Der einäugige **Piratenkapitän Rotbart** ist allerdings ein Spieler. Geistesgegenwärtig schlagen Sie ihm einen Deal vor: Wenn er sich eine Zahl zwischen 1 und 100 ausdenkt, und Sie die Zahl erraten können, dürfen Sie Ihr Geld behalten. 

> [!hint] Hinweis
> Wenn "//" steht, wird der Rest der Linie als Kommentare interpretiert und vom Computer ignoriert.

```codepen {data-height="600"}
---html
<h3>Harhar, errate die Zahl oder ich klau dir all dein Geld!</h1>
<img src="https://easydrawingguides.com/wp-content/uploads/2021/06/how-to-draw-a-pirate-featured-image-1200.png" />
<p>
    <input type='text' name="inputGuess" id="inputGuess" class="" placeholder="Eine Nummer von 1-100" />
    <button id="submit" class="" onclick="aGuess()">Rate</button>

<div class='results' id='results'></div>
---js

var secretNum = 0;
var message = "Das sagt Piratenkapitän Rotbart";
var count = 0;
var results = document.getElementById('results');

// Diese Funktion wird zu Beginn des Spiels ausgeführt, um das Spiel zu starten.
function initialisiereGame(){
	// Das hier könnte man noch verbesser, sodass die Zufallszahl tatsächlich jedesmal zufällig generiert wird.
  secretNum = 34;
  count = 0;
}

// Diese Funktion wird ausgeführt, wenn der Nutzer auf den Button "Rate" klickt.
function aGuess(){
	var num = document.getElementById('inputGuess').value;
	// Hier fügen wir unsere Spiellogik ein
  results.innerHTML = '<p>' + message + '</p>';
}

// Beim Start soll das Spiel initialisiert werden.
initialisiereGame();

---css
img {
  width:200px;
}

body {
  text-align: center;
}
```


> [!example] Jetzt sind Sie dran!
> 
> Schauen Sie sich die grundsätzliche Logik meiner Vorlage an, die Ihnen bereits eine Grundstruktur bietet.

Jetzt konzentrieren wir uns aufs Javascript. Wir wollen eine einfache Spiellogik bauen, damit der Piratenkapitän andere Sachen sagt, je nach dem, ob Sie zu hoch oder zu niedrig geraten haben.

Dazu brauchen Sie Fallunterscheidungen, wie es sie in fast jeder Programmiersprache gibt: mit **If-Else-Anweisungen**. Das ist eine grundlegende Steuerungsstruktur, die entscheidet, welchen Codeblock das Programm ausführen soll, basierend auf einer bestimmten Bedingung.

Die **If-Anweisung** wird verwendet, um einen Codeblock auszuführen, wenn eine bestimmte Bedingung erfüllt ist. 

```javascript
if (Bedingung) {
  // Code, der ausgeführt wird, wenn die Bedingung wahr ist
}
```

Die Bedingung wird mit **booleschen Algebra** ausgewertet: Wenn die Bedingung wahr ist (`true`), wird der Code innerhalb des Blocks ausgeführt. Wenn die Bedingung nicht wahr ist (`false`), wird der Codeblock übersprungen.

In unserem Beispiel könnte eine Bedingung so aussehen:
```javascript
if (gerateneZahl > richtigeZahl) {
	// Piratenkapitän Rotbart lacht Sie aus, weil Sie zu hoch geraten haben.
}
```

Die **If-Else-Anweisung** ist eine Erweiterung der If-Anweisung. Hiermit kann man einen anderen Codeblock ausführen, wenn die Bedingung nicht wahr ist. 

```javascript
if (Bedingung) {
  // Code, der ausgeführt wird, wenn die Bedingung wahr ist
} else {
  // Code, der ausgeführt wird, wenn die Bedingung nicht wahr ist
}
```
Wenn die Bedingung wahr ist, wird der Code im If-Block ausgeführt. Wenn die Bedingung nicht wahr ist, wird stattdessen der Code im Else-Block ausgeführt.

If-Else-Anweisungen kann man **aneinanderhängen**. Das ist nützlich, wenn man mehrere Bedingungen prüfen muss. Hiermit kann man mehrere Codeblöcke basierend auf unterschiedlichen Bedingungen ausführen.

```javascript
if (Bedingung1) {
  // Code, der ausgeführt wird, wenn Bedingung1 wahr ist
} else if (Bedingung2) {
  // Code, der ausgeführt wird, wenn Bedingung1 nicht wahr ist, aber Bedingung2 wahr ist
} else {
  // Code, der ausgeführt wird, wenn weder Bedingung1 noch Bedingung2 wahr sind
}
```
Bei dieser Struktur wird zuerst die erste Bedingung geprüft. Wenn diese wahr ist, wird der entsprechende Codeblock ausgeführt. Ist die erste Bedingung nicht wahr, wird die zweite Bedingung geprüft. Ist auch diese nicht wahr, wird der Code im Else-Block ausgeführt. Wichtig ist, dass Sie sich immer fragen, was wann passieren soll, wenn eine bestimmte Bedingung erfüllt ist. 

> [!example] Jetzt sind Sie dran!
> 
> Erstellen Sie mal die Grundlogik des Spiels. Der Nutzer soll Zahlen raten können, und je nachdem soll der Piratenkapitän den Nutzer anders beleidigen. Und, natürlich, wenn die Zahl stimmt, soll er auch etwas anderes sagen.

Wenn das funktioniert, verfeinern Sie die Spiellogik mit folgenden Challenges:
- Wenn die Zahl richtig getippt wurde, soll das **Spiel neustarten**.
- Die geheime Zahl des Piraten soll tatsächlich zufällig generiert werden. Eine Zufallszahl zwischen 1 und 100 erhalten Sie mit `Math.round(Math.random()*100)`
- Man könnte es so machen, dass die Nutzer **nur fünf Versuche** haben, bis der Pirat sie ausraubt.
- Wenn die Nutzer ausgeraubt werden, könnten Sie ein **lustiges Gif** einblenden. z.B. das hier wäre witzig (Rechtsklick und "Link kopieren"):
  https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2YwOTJjZWVkZTlhZDE3MTM0ZThjNzM5OTFlMWJlNDM0NjU3MjcxNiZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/Q86oTbWkaj5jUasG9d/giphy.gif

Für die Schnellen: Hier eine Version, bei der ich die Beleidigungen zufällig aus einer ganzen Liste aussuche. Versuchen Sie mal, das nachzuvollziehen und bei sich einzubauen. Oder noch viel besser: Entwerfen Sie doch ein eigenes Game!

```codepen {data-height="600"}
---html
<h3>Harhar, errate die Zahl oder ich klau dir all dein Geld!</h1>
<img src="https://easydrawingguides.com/wp-content/uploads/2021/06/how-to-draw-a-pirate-featured-image-1200.png" />
<p>
    <input type='text' name="inputGuess" id="inputGuess" class="" placeholder="Eine Nummer von 1-100" />
    <button id="submit" class="" onclick="aGuess()">Rate</button>

<div class='results' id='results'></div>
---js
insults_low = ["Ha! Zu niedrig! Versuchs nochmal, du Landei!", "So tief wie du ratest, sinken nicht mal die Schiffe, die ich gekapert habe!", "Hahaha! Viel zu tief! Du könntest doch nicht mal einen Schatz auf einer einsamen Insel finden!", "So tief wie du schätzt, da tut mir ja der Holzfuss weh!"];
insults_high = ["So hoch wie du ratest, könntest du genauso gut den Himmel erklimmen und nach fliegenden Delphinen Ausschau halten!", "Wow! Da fällt mir fast der Bart ab, die Schätzung ist so schlecht! Viel zu hoch!", "Sag mal, willst du dein Geld gar nicht mehr? So hoch schätzt nicht einmal mein Papagei!", "Du würdest doch nicht einmal den Treffpunkt am HB finden, du Möchtegern du!", "Hahaha... Viel zu hoch! So hoch ist nicht mal mein Kopfgeld!"];

var secretNum = 0;
var message = '';
var count = 0;
var results = document.getElementById('results');

function initialisiereGame(){
  secretNum = Math.round(Math.random()*100);
  count = 0;
}
initialisiereGame();

function aGuess(){
	var num = document.getElementById('inputGuess').value;
  if (num < secretNum){
	  position = Math.round(Math.random()*(insults_low.length-1));
	  message= insults_low[position];
  } else if (num > secretNum){
	  position = Math.round(Math.random()*(insults_high.length-1))
	  message=insults_high[position];
  } else if (num == secretNum){
    message='Ooh.... Das, das stimmt! Naja, dann raub ich eben den Herrn Chéhab aus. Der schaffts bestimmt nicht in ' + count + ' Versuchen.';
  }
  results.innerHTML = '<p>' + message + '</p>';
  count++;
}
---css
img {
  width:200px;
}

body {
  text-align: center;
}
```

[[CSS]]
[[index|Vorwärts nach Hause zurück!]]