---
title: Klassen & Objekte
---
# Einführung in Objekte in Python

In dieser Lektion möchten wir Ihnen das wichtige Konzept der **Objektorientierten Programmierung (OOP)** in Python näherbringen. Bei der objektorientierten Programmierung geht es darum, den Code in wiederverwendbare "Objekte" zu organisieren, die sowohl Daten als auch Verhaltensweisen (Methoden) bündeln.

## Was ist ein Objekt?

Stellen Sie sich ein Computerspiel vor. Wenn da Tausende Gegner auf Sie zukommen, möchten Sie ja nicht für jeden einzelnen Gegner eigene Variablen und Funktionen kreieren müssten. Das wäre unmöglich!

In einem Spiel möchten Sie z.B. nicht jeden Gegner einzeln programmieren. Stattdessen ist es einfacher, eine **Klasse** `Gegner` zu definieren, die alle typischen Daten (Variabeln) und Methoden (Funktionen) beinhaltet, die Gegner normalerweise brauchen.

## Erstellung eines einfachen Objekts

In Python verwenden wir **Klassen als Vorlagen für Objekte**. Hier ist ein einfaches Beispiel:

```python
class Gegner:
    def __init__(self, lebenspunke, marke):
        self.lebenspunkte = 100
        self.typ = marke

    def fahren(self):
        print("Das Auto fährt.")

    def bremsen(self):
        print("Das Auto bremst.")
```

## Erzeugung von Objektinstanzen

Nachdem die Klasse definiert ist, können wir Objekte (Instanzen der Klasse) erzeugen:

```python
mein_auto = Auto("rot", "Toyota")
```

## Zugriff auf Eigenschaften und Methoden

Sobald das Objekt erstellt ist, können wir auf seine Eigenschaften und Methoden zugreifen:

```python
print(mein_auto.farbe)  # Ausgabe: rot
print(mein_auto.marke)  # Ausgabe: Toyota

mein_auto.fahren()  # Ausgabe: Das Auto fährt.
mein_auto.bremsen()  # Ausgabe: Das Auto bremst.
```

