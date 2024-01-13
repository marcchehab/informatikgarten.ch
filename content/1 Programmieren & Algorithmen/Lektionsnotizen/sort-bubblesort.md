## BubbleSort – Elemente blubbern sortiert ans Ende der Liste

Stellen wir uns vor, dass wir identisch aussehende Büchsen dem Gewicht nach sortieren müssen. Der Bubble Sort ist ein einfacher Sortieralgorithmus, der in unserem Beispiel immer die aktuell schwerste Büchse ans Ende der Liste transportiert.

Schauen wir uns zuerst **einen Durchgang einer einzelnen Büchse** an:
```python
funktion BubbleSort(Liste):
	Die erste Büchse nennen wir "A"
	Solange wir nicht am Ende sind:
		Nenne die auf "A" folgende Büchse "B"
		Wäge "A" und "B" zusammen
		Falls "A" schwerer ist als "B":
			Vertausche die Büchsen
			Lösche die Bezeichnung "B"
		Sonst:
			Lösche die Bezeichnungen "A"
			"B" heisst neu "A"

```

Nach diesem Durchgang können wir uns sicher sein, dass die **schwerste Büchse am Ende der Liste** angekommen ist, weil es wurde ja bei jedem Vergleich die schwerste Büchse weitergezogen.

Damit wir gut sehen, was passiert, habe ich das Gewicht jeder Büchse einfach als Balken dargestellt, der grösser (schwerer) oder kleiner (leichter) ist.

```renderhtml
---css
.sortcontainer {
	height: 120px;
	position: relative;
	margin: auto;
}

.block {
	width: 28px;
	background-color: #6b5b95;
	position: absolute;
	bottom: 0px;
	transition: 0.1s all ease;
}

.block_id {
	position: absolute;
	color: var(--gray);
	font-family: var(--font-body);
	margin-top: -20px;
	width: 100%;
	text-align: center;
}
---jssrc
sorting.js
---html
<div class="playstop stopped"><div></div></div>
<div class="sortcontainer" data-algo="bubbleonce"></div>
<label>Anzahl Boxen:</label><input type="range" min="5" max="100" value="30" class="nrofboxes"></input>
```

Wenn wir den Vorgang ein zweites Mal wiederholen, könnten wir uns bereits sicher sein, dass auch **die zweitletzte Büchse am zweitschwersten ist**. Jetzt die Frage:

> [!question]- Wie viele Male müssten wir den Algorithmus wiederholen, bis die ganze Liste garantiert sortiert ist?
> 
> Wir müssten den Vorgang einmal weniger machen, als es Büchsen hat. Wenn die Anzahl Büchsen `n` ist, also (n-1)-mal.


```renderhtml
---html
<div class="playstop stopped"><div></div></div>
<div class="sortcontainer" data-algo="bubblesort"></div>
<label>Anzahl Boxen:</label><input type="range" min="5" max="100" value="30" class="nrofboxes"></input>
<label>Verzögerung:</label>
<input type="range" min="1" max="300" value="100" class="speed">
```

## Kleine Optimierung
