---
title: "Zusatz: Gifs animieren?"
---
Das Turtle-Modul spielt animierte Gifs nicht ab. Es gibt auch keine Möglichkeit, ihm das beizubringen. Aber man kann mit etwas Aufwand das Verhalten fingieren.

Erstellen Sie für ein "animiertes Gif" dazu einen Ordner "spaceship" mit allen Frames Ihrer Animation als einzelne Gifs. Sie können alle Frames Ihres Gifs z.B. mit www.ezgif.com als einzelne Gifs extrahieren.

Die Grundidee ist, dass Sie nun alle diese Gifs als Shapes in Turtle registrieren und dann einfach regelmässig das Shape Ihrer Turtle ändern.

Hier die Bauteile im Code: 

```python filename="main.py"
from os import listdir
from itertools import cycle

# ...der Rest Ihres Codes _vor_ dem Main-Loop

# List files in spaceship dir
def register_shape_dir(dir):
    dir_shapes = []
    for shape in listdir(dir):
        turtle.register_shape(dir + "/" + shape)
        dir_shapes.append(dir + "/" + shape)
    return cycle(dir_shapes)

# ...

ship.shapes = register_shape_dir("spaceship")

# ...

while running:

	# ...
    ship.shape(next(ship.shapes))
	# ...
    
```

Die Funktion `register_shape_dir()` registriert alle Dateien im Ordner als Shapes im Turtle-Modul und kreiert aus der Liste einen zyklischen Iterator. Iteratoren sind alle Datenstrukturen, bei der man "nächstes Element" sagen kann und es kommt immer