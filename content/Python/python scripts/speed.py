from gturtle import *

KEY_LEFT = 37
KEY_RIGHT = 39
KEY_UP = 38
KEY_DOWN = 40

def onKeyPressed(key):
    global speed
    if (key == KEY_RIGHT):
        right(5)
    if (key == KEY_LEFT):
        left(5)
    if (key == KEY_UP):
        speed = speed + 1
    if (key == KEY_DOWN):
        speed = speed - 1

makeTurtle(keyPressed = onKeyPressed)

speed = 0

repeat:
    forward(speed)