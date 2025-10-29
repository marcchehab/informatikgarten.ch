---
title: Beschleunigungssensor
---
> [!success]  Lernziele
> 
> - **`accelerometer`**: Wir haben Programme mit dem Beschleunigungssensor geschrieben, sowohl mit `was_gesture()` und mit der absoluten Beschleunigung.
### Aufgabe: Bewegungssensor stellt Screen an

Programmieren Sie den Screen so wie bei vielen Handys: Wenn der Microbit flach auf dem Tisch mit der Vorderseite nach unten liegt, schläft er (zeigen Sie z.B. das Smiley `ASLEEP` an). Wenn Sie ihn drehen, damit der Screen nach oben schaut, wird er angestellt (z.B. `HAPPY`).

> [!solution]- Lösung
> 
> ```python
> from microbit import *
> 
> while True:
>     if accelerometer.was_gesture('face up'):
>         display.show(Image.HAPPY)
>     if accelerometer.was_gesture('face down'):
>         display.show(Image.ASLEEP)
> ```

---
### Aufgabe: Erdbeschleunigung füllt Screen auf

Schauen Sie sich in den Referenzen an, wie der Beschleudnigungssensor funktioniert. Programmieren Sie Ihren Microbit dann so, dass er das Display mehr auffüllt, je aufrechter er da steht. Also dass 0 LEDs leuchten, wenn er waagrecht auf dem Tisch liegt, 12 LEDs, wenn er 45 Grad schräg gehalten wird, und voll aufgefüllt, wenn er aufrecht gehalten wird.

---
