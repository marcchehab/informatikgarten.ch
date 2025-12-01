---
title: Was sind Datenbanken?
---
Wir beginnen diese Einführung mit einem Gedankenexperiment...

## Schulverwaltung mit Excel...

Stellen Sie sich vor, Sie müssten die **Schülerdaten Ihrer Schule verwalten**. Mit normalen Tabellenblättern (wie z.B. in Excel) wird das schnell sehr schwer und unübersichtlich. Wieso?

Sie würden ja vermutlich eine **Excel-Datei** mit einem Tabellenblatt pro Klasse erstellen mit den Schülern und Ihren Absenzpunkten. Aber da blüht Ihnen bereits ein ganzer Blumenstrauss an Problemen! Stellen wir uns mal vor, Sie würden Ihrer Chefin diese Lösung präsentieren...

- **Ordnung**: Wir möchten gern noch Halbklassen-Unterricht und Spezialkurse mit Schülern aus mehreren Klassen - natürlich ohne ein Chaos aus Dublikaten zu erstellen. Können Sie das bitte einbauen? Nein???
- **Schnelligkeit**: Können Sie mir bitte die durchschnittlichen Absenzpunkte pro Fach sagen? Wie bitte? Was meinen Sie mit "Kommen Sie morgen wieder, das geht eine Weile"!?
- **Datensicherheit**: Stellen Sie bitte sicher, dass Schüler nur ihre eigenen Absenzen sehen. W-H-A-T!? ALLE SEHEN ALLES!? Haben Sie eigentlich den Verstand verloren???
- **Datenintegrität**: Zu guter Letzt, aber das sollte ja nur eine Formalität sein: Legen Sie bitte die Hand ins Feuer, dass auch bei Hunderten Schülern keine doppelten Einträge oder ungültigen E-Mail-Adressen erfasst wurden. Merci!

### ...oder einer relationalen Datenbank?

All diese Probleme lösen relationale Datenbanken. Sie bestehen auch aus Tabellen, aber:
- **Ordnung**: Sie können Ordnung wahren, weil Sie **Beziehungen** zwischen Tabellen herstellen können. Ihr Datenbankserver überwacht dann die Integrität dieser Beziehungen zwischen den Tabellen. Eine Schülerin in einer Tabelle "Schüler" könnte so ohne Probleme Teil von mehreren Klassen einer Tabelle "Klassen" sein. Wie das funktioniert, werden Sie lernen!
- **Schnelligkeit**: Datenbanksysteme wurden dafür konzipiert, riesige Datenmengen effizient zu verwalten. Auch eine komplizierte Abfrage der Schülerdaten würde in Millisekunden (10<sup>-3</sup>) gemessen.
- **Datensicherheit**: Wer welche Berechtigung hat, auf die Datenbank zuzugreifen, können Sie an mehreren Stellen beinahe beliebig genau anpassen. (Typischerweise erhalten Benutzer gar nie direkten Zugriff auf die Datenbank, sondern nur über eine kontrollierte Oberfläche.)
- **Datenintegrität**: Datenbankserver überprüft bei jedem Schreibzugriff, ob die neuen Daten den geforderten Datentypen der Spalten entsprechen (das beinhaltet auch die Beziehungen zu Daten in anderen Tabellen).

Wir steigen in das Thema ein mit einer Sprache, die Millionen von Datenbanken verstehen...

## SQL - Eine Sprache, viele Datenbanken

Stellen Sie sich vor, Sie lernen Autofahren. Ihre Fahrlehrerin bringt Ihnen bei, **wie man lenkt, schaltet und bremst**. Sobald Sie es beherrschen, können Sie nicht nur einen Toyota fahren, sondern auch einen Peugeot, einen BMW, einen Ford, einen Volvo, einen Fiat, einen Hyundai oder sogar einen Traktor...

Genauso ist es mit der **"Structured Query Language" - SQL**. Lernen Sie SQL einmal, können Sie mit einer Vielzahl von Datenbanken sprechen. Einige Beispiele:

- **SQLite** - Winzig, läuft sogar auf Ihrem Smartphone
- **PostgreSQL** - Flexibel und mächtig, ideal für komplexe Daten
- **MySQL** - Beliebt für Websites, z. B. WordPress
- **Microsoft SQL Server** - Oft in Unternehmen im Einsatz
- **Oracle Database** - Für riesige Unternehmenssysteme
- ... und viele mehr!

Jede dieser Datenbanken hat ihre eigenen Besonderheiten, aber sie alle sprechen **SQL**. Das bedeutet:
- Die Grundbefehle zum **Abrufen (SELECT)**, **Einfügen (INSERT)**, **Ändern (UPDATE)** und **Löschen (DELETE)** sind überall gleich.
- Einmal gelernt, können Sie mit SQL **Daten abfragen und verwalten**, egal welche Datenbank dahintersteckt.
- Selbst wenn Sie von MySQL auf PostgreSQL oder von SQLite auf SQL Server wechseln - Ihr Wissen bleibt nützlich!

Kurz gesagt: SQL ist der Führerschein für Datenbanken. Sie lernen eine Sprache und können damit viele Systeme steuern. 🚗💨

Weiter geht's mit SQLBolt, [[00-eibeorg|wie in der Übersicht beschrieben]].