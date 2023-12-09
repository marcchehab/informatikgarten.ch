from gturtle import *

# Helfervariabeln für uns Menschen
KEY_D = 68
KEY_A = 65
KEY_S = 83
KEY_W = 87

KEY_LEFT = 37
KEY_RIGHT = 39
KEY_UP = 38
KEY_DOWN = 40
KEY_SPACE = 32

KEY_ESC = 27

# Konfigurationsvariabeln
speed = 20

# Steuert beide Turtle bei keypressed-Event
def steuern(key):
    key = key.keyCode
    
    if (key == KEY_ESC):
        RUNNING = False
        
    elif (key == KEY_RIGHT):
        sara.setHeading(90)
    elif (key == KEY_UP):
        sara.setHeading(0)
    elif (key == KEY_LEFT):
        sara.setHeading(270)
    elif (key == KEY_DOWN):
        sara.setHeading(180)

    if (key == KEY_D):
        joe.setHeading(90)
    elif (key == KEY_W):
        joe.setHeading(0)
    elif (key == KEY_S):
        joe.setHeading(180)
    elif (key == KEY_A):
        joe.setHeading(270)
    
tf = TurtleFrame(keyPressed = steuern)

# Erste Spiel-Turtle
sara = Turtle(tf)
sara.setColor("green")
sara.setPenColor("green")
sara.setPenWidth(speed)
sara.setPos(115,-50)

# Zweite Spiel-Turtle
joe = Turtle(tf)
joe.setColor("red")
joe.setPenColor("red")
joe.setPenWidth(speed)
joe.setPos(-135, -50)

# Laufzeit-Variabeln, die uns das Leben erleichtern
RUNNING = True

# Der Eventloop. Läuft solange RUNNING == True.
while RUNNING:
    sara.forward(speed)
    joe.forward(speed)
