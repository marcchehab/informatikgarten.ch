S17 mit Waage / Büchsen (8 Büchsen)
Fragen in die Klasse: Wie habt ihr es gemacht? 
Idee, eine **neue Liste** zu beginnen

Aufgabe A12 alleine **mit Bleistift**
[[../../../3 Teaching/archiv/KSL/attachments/A12 Algorithmus]]
Dann **zusammen Reinschrift**

**HA**: Aufgabe A13, mit binärer Suche: A14

* mach Platz für eine neue, sortierte Liste
* wiederhole solange es noch Büchsen in der unsortierten Liste hat:
	* nimm eine Büchse n von der unsortierten Liste
	* falls die sortierte Liste leer ist:
		* setze **n** an die erste Stelle der sortierten Liste
	* andernfalls:
		* bezeichne die erste (leichteste) Büchse der sortierten Liste als <font color="#ff0000">s</font>
		* wiederhole solange **n** > <font color="#ff0000">s</font> und <font color="#ff0000">s</font> noch nicht die letzte Büchse ist:
			* bezeichne die Büchse nach <font color="#ff0000">s</font> neu als <font color="#ff0000">s</font>
		* setze **n** vor <font color="#ff0000">s</font>
		* falls <font color="#ff0000">s</font> die letzte Büchse ist und falls **n** > <font color="#ff0000">s</font> :
			* tausche **n** und <font color="#ff0000">s</font>