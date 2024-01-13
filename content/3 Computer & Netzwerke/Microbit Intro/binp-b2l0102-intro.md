---
title: "L01+L02: Einführung Microbit"
---
Wir lernen in dieser Lektion den Microbit-Computer kennen. Dazu haben Sie ein Arbeitsblatt auf Onenote erhalten. Wichtig für die Prüfung sind hierbei die Lernziele:

> [!success] Lernziele
> 
> - Sie sind vertraut mit dem Microbit-Online-Editor. Insbesondere,
> 	- wie Sie ein Programm auf Ihren Microbit laden können,
> 	- dass Ihnen während des Schreibens mögliche Befehle **vorgeschlagen und erklärt** werden,
> 	- dass Sie links die Referenz kennen und gebrauchen können.

Wir haben auf Onenote gesehen, wie man ein pochendes Herz programmiert.

```python
# Imports go at the top
from microbit import *

# Wir machen endlos das Gleiche
while True:
	# Wir zeigen das grosse Herz
    display.show(Image.HEART)
    # Warten eine halbe Sekunde
    sleep(500)
    # Zeigen das kleine Herz
    display.show(Image.HEART_SMALL)
    # Und warten nochmal eine halbe Sekunde
    sleep(500)
```

[Zum Index zurück](/)
[[binp-b2l0506-leds|Weiter]]
