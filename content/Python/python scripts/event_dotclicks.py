from gturtle import *

def onMouseHit(x, y):
    setPos(x, y)
    dot(50)

makeTurtle(mouseHit = onMouseHit)
speed(-1)