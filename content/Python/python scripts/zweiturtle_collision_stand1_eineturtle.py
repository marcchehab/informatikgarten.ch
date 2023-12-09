import gturtle

# Helfervariabeln für uns Menschen
KEY_LEFT = 37
KEY_RIGHT = 39
KEY_UP = 38
KEY_DOWN = 40

# Konfigurationsvariabeln
speed = 20

# Steuert beide Turtle bei keypressed-Event
def steuern(key):
        
    if (key.keyCode == KEY_RIGHT):
        eva.setHeading(90)
    elif (key.keyCode == KEY_UP):
        eva.setHeading(0)
    elif (key.keyCode == KEY_LEFT):
        eva.setHeading(270)
    elif (key.keyCode == KEY_DOWN):
        eva.setHeading(180)
    
tf = gturtle.TurtleFrame(keyPressed = steuern)

# Erste Spiel-Turtle
eva = gturtle.Turtle(tf)
eva.setColor("green")
eva.setPenColor("green")
eva.setPenWidth(10)
eva.setPos(115,-50)

# Zweite Spiel-Turtle
joe = gturtle.Turtle(tf)
joe.setColor("red")
joe.setPenColor("red")
joe.setPenWidth(10)
joe.setPos(-135, -50)

# Der Eventloop. Läuft solange RUNNING == True.
for i in range(1000):
    eva.forward(speed)
