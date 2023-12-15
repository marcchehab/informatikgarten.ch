# Gradient
## for
### heading
#### levels
##### until
###### h6
Well and some text here.
# Codeeditor for Python with zoomable Turtle

<TurtleEditor id="really_my_editor">
{`print("hallo!")

import turtle

eva = turtle.Turtle()
eva.forward(100)`}
</TurtleEditor>

# Testing callouts

collapsed
> [!info]- Notiz für Lehrer
> 
> Übungen verteilen und machen wir jeweils in OneNote. Sie finden alles [in diesem Notizbuch](https://kswe-my.sharepoint.com/:o:/g/personal/cha_kswe_ch/EoV9M1uM6bdBuBRAetwQGdgB4LmAyYwvPxW6xpmzYIY3SQ?e=V2Q19j).
> 
> Beginnen Sie mit [[ginf-intro|diesem Intro]], um zu zeigen, wie **extrem schnell** moderne Computer sind. 

open
> [!info]+ Notiz für Lehrer
> 
> Übungen verteilen und machen wir jeweils in OneNote. Sie finden alles [in diesem Notizbuch](https://kswe-my.sharepoint.com/:o:/g/personal/cha_kswe_ch/EoV9M1uM6bdBuBRAetwQGdgB4LmAyYwvPxW6xpmzYIY3SQ?e=V2Q19j).
> 
> Beginnen Sie mit [[ginf-intro|diesem Intro]], um zu zeigen, wie **extrem schnell** moderne Computer sind. 
> 

nothing special
> [!info] Notiz für Lehrer
> 
> Übungen verteilen und machen wir jeweils in OneNote. Sie finden alles [in diesem Notizbuch](https://kswe-my.sharepoint.com/:o:/g/personal/cha_kswe_ch/EoV9M1uM6bdBuBRAetwQGdgB4LmAyYwvPxW6xpmzYIY3SQ?e=V2Q19j).
> 

blockquote
> Beginnen Sie mit [[ginf-intro|diesem Intro]], um zu zeigen, wie **extrem schnell** moderne Computer sind. 
> 
> Dann Frage: Wie haben es Informatiker nur geschaft, eine solche Maschine zu bauen? Indem sie **grosse Probleme in kleine Probleme aufgeteilt haben**. Genau das nutzen wir auch beim Programmieren.
> 
> **Übergang zu Algorithmen**: Grosses Problem in kleine Schritte zerlegen. Wird auch bei Kochrezepten, Möbelbauen und Lego so gemacht. Man muss nur Einzelschritte können, Ergebnis entsteht von alleine.

# linenumbers

```
Frage User nach ersten Zahl und speichere Input in der Variable zahl1.
Frage User nach zweiten Zahl und speichere Input in der Variable zahl2.
Addiere zahl1 und zahl2 und speichere das Ergebnis in der Variable ergebnis.
Zeige die Variable ergebnis an.
```

Diesen Algorithmus kann man **in einer Programmiersprache implementieren**, z.B. hier Python:

```python
zahl1 = input("Bitte geben Sie die erste Zahl an")
zahl2 = input("Bitte geben Sie die zweite Zahl an")
ergebnis = zahl1 + zahl2
print(ergebnis)
```