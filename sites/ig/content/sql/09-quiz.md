---
title: Checkpoint-Quiz
---
In diesem Quiz arbeiten Sie mit Daten von Netflix ([Quelle](https://github.com/lerocha/netflixdb)), die zeigen, was beim Streaminganbieter wie oft geschaut wird.

## Datenbankschema und Primärschlüssel

Typischerweise stellt man Datenbanken in einem sogenannten **Schema** dar: Das ist eine Übersicht der Tabellen, ihren Spalten, deren Datentypen, sowie den Beziehungen zwischen den Tabellen - aber ohne Daten! In unserem Beispiel sieht das Schema so aus:

<StickMe>
![[netflixdb.png]] 
</StickMe>

Einige Beobachtungen, damit Sie sehen, was hier alles dargestellt ist:

-   Boxen: Es gibt eine Tabelle `movie` mit den Spalten `title`, `runtime`, `release_date`, etc.
-   Datentypen rechts: Die Spalte `available_globally` hat den Datentyp `boolean` und ist demzufolge ein Wahr/Falsch-Wert. (Sie müssen die SQL-Datentypen nicht lernen.)
-   Pfeile: Die Tabelle `view_summary` hat eine Relation mit der Tabelle `movie`. Beim Pfeil steht "movie_id:id". Das bedeutet: Die Daten in der Spalte `movie_id` in `view_summary` entsprechen den Daten in der Spalte `id` der Tabelle `movie`.
-   Goldener Schlüssel: Die Tabelle `movie` hat eine Spalte `id` als **Primärschlüssel**. Das bedeutet, dass jeder Datensatz (jede Reihe) dort einen eindeutigen Wert hat. Das Datenbanksystem garantiert uns, dass es keine zwei Filme mit dem gleichen Wert in der Spalte `id` zulassen wird.
-   Blauer Schlüssel: `movie_id` der Tabelle `view_summary` ist ein **Fremdschlüssel**. Das Datenbanksystem kann diese Beziehung überwachen und je nach Konfiguration sicherstellen, dass es keine Einträge mit einer `movie_id` gibt, die es in der Tabelle `movie` unter `id` gar nicht gibt.

Schauen wir uns nun an, wie die Daten in der Tabelle `view_summary` vorliegen. Eine Frage, die sich stellt: Offenbar werden die Zuschauerzahlen für spezifische Zeitperioden rapportiert. Sind das Stunden, Tage, Wochen, Monate? Ein Beispiel-Query, wie Sie das herausfinden können.

Was gibt es für Zeitperioden? (Diese Lösung ist so korrekt.)

<SQLQuestion id="select-distinct"
defaultQuery={`SELECT DISTINCT duration
FROM view_summary;`} />

Wunderbar. Machen Sie sich das Leben also einfach: Schauen Sie im Weiteren jeweils **Halbjahresperioden** an. Jetzt sind Sie dran:

## Frage 1: Meistgeschaute Inhalte

Selektieren Sie aus der Tabelle `view_summary` die Spalten `id` und `hours_viewed` der zehn Datensätze, die in einem halben Jahr am meisten geschaut wurden.

<SQLQuestion id="most-watched"
defaultQuery={`SELECT id, hours_viewed
FROM view_summary 
LIMIT 5;`}
correctQuery="SELECT id, hours_viewed FROM view_summary WHERE duration =
'SEMI_ANNUALLY' ORDER BY hours_viewed DESC LIMIT 10"/>

## Frage 2: Meistgeschaute Filme

Finden Sie nun die Filmtitel (`title`) und `hours_viewed` der zehn meistgeschauten **Filme** in einem Halbjahr heraus. Wir selektieren also **nur Filme**, Serien werden ignoriert.

<SQLQuestion id="most-watched-movietitle"
defaultQuery={`SELECT title, hours_viewed 
FROM view_summary 
JOIN movie ON view_summary.movie_id = movie.id 
LIMIT 5;`}
correctQuery={`SELECT title, hours_viewed 
FROM view_summary 
JOIN movie ON view_summary.movie_id = movie.id 
WHERE duration = 'SEMI_ANNUALLY' 
ORDER BY hours_viewed DESC 
LIMIT 10;`}
/>

## Frage 3: Serien dominieren

Hmm... Jetzt haben sich die Zahlen aber stark verändert. Können Sie sich das erklären? Schauen wir uns doch mal die **50 meistgeschauten Dinge** in einem Halbjahr an. Selektieren Sie erneut die Filmtitel (`title`) und `hours_viewed`, aber zeigen Sie zusätzlich auch die `hours_viewed` von Serien an - die also keinen `title` in der Tabelle `movie` haben.

<SQLQuestion id="most-watched-thing"
defaultQuery={`SELECT title, hours_viewed 
FROM view_summary 
JOIN movie ON view_summary.movie_id = movie.id 
LIMIT 5;`}
correctQuery={`SELECT title, hours_viewed FROM view_summary LEFT JOIN movie ON view_summary.movie_id = movie.id WHERE duration = 'SEMI_ANNUALLY' ORDER BY hours_viewed DESC LIMIT 50;`}
/>

## Frage ?: Meistgeschaute Serien und Filme

<SQLQuestion id="most-watched-50"
defaultQuery={`movie.title AS movie_title, tv_show.title AS tv_show, ... as hours ...`}
correctQuery={`SELECT movie.title AS movie_title, tv_show.title AS tv_show, sum(hours_viewed) as hours FROM view_summary s LEFT JOIN season ON s.season_id = season.id LEFT JOIN tv_show ON season.tv_show_id = tv_show.id LEFT JOIN movie ON s.movie_id = movie.id WHERE duration = "WEEKLY" GROUP BY movie_title, tv_show ORDER BY hours DESC LIMIT 50`}
/>
