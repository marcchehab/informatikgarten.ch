# Tu15b.py

from gturtle import *

def wall():
    setPenColor("green")
    setPenWidth(10)
    setPos(-200, -50)
    forward(100)
    setPos(200, -50)
    forward(100)    

makeTurtle()
hideTurtle()
enableRepaint(False)

x = -170
dx = 10

while True:
    clear()
    wall()
    setPos(x, 0)
    setPenColor("red")
    dot(60)
    repaint()
    x = x + dx
    if x > 165 or x < -165:
        dx = -dx      
    delay(40) 