from gturtle import *

KEY_LEFT = 37
KEY_RIGHT = 39
KEY_UP = 38
KEY_DOWN = 40

def onKeyPressed(key):
    if (key == KEY_RIGHT):
        setHeading(90)
    if (key == KEY_UP):
        setHeading(0)
    if (key == KEY_LEFT):
        setHeading(270)
    if (key == KEY_DOWN):
        setHeading(180)
    
makeTurtle(keyPressed = onKeyPressed)

speed = [0, 0]

repeat:
    forward(10)
