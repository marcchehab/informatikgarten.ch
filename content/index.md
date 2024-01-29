---
enableToc: false
---
## Grüezi & Willkommen

Herzlich willkommen auf dem neuen Informatikgarten! Ich habe über die Weihnachtsferien die Seite komplett neu programmiert. Damit kommen viele Verbesserungen - und weitere werden folgen.

👈 Neu finden Sie die Inhaltsübersicht hier links.

> [!info]- testeintrag **für** lehrer
> 
> funktioniert dasasas

## Was ist neu?

### Der Code-Editor ist um einiges besser geworden. 
- Sie können die **Turtle mit der Maus herumziehen** und vergrössern.
- Sie können den **Editor als Ganzes vergrössern** oder in Vollbild nutzen.
- Ihr **Code wird auf Ihrem Computer zwischengespeichert**. Sie können die Geschichte Ihres Codes mit den Pfeilen anschauen, oder den Standardcode mit dem Reset-Knopf wiederherstellen.
	![[Pasted image 20240113174026.png]]

```turtle
import turtle
farbliste = ['red', 'purple', 'blue', 'green', 'orange', 'yellow']

eva = turtle.Turtle()
eva.speed(500)

for x in range(360):
    eva.pencolor(farbliste[x%6])
    eva.width(x//100 + 1)
    eva.forward(x)
    eva.left(59)
```

### Mit Schul-Account anmelden
Wenn Sie sich mit Ihrem Microsoft-Account der Schule anmelden (rechts oben), wird der Code mit einer SQL-Datenbank synchronisiert. Sie können sich dann an anderen Computern anmelden und haben Ihren trotzdem Ihren Code. Zukünftig wird uns das ermöglichen, Aufgaben und Code einfach zu teilen.

### Besserer Technologie-Stack
Das merken Sie (noch) nicht, aber die Webseite basiert jetzt auf der heutigen Standardtechnologie für moderne Webapps (namens React). Der grosse Vorteil: In diesem Ökosystem gibt es für ganz viele Probleme fixfertige Lösungen, die man schnell in die Webseite einbinden kann. Wir können den Informatikgarten also viel leichter erweitern. Wenn Sie Ideen und Wünsche haben, kommen Sie unbedingt auf mich zu! 👍