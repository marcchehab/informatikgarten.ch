import gturtle

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
speed = 15
messabstand = 10

# Steuert beide Turtle bei keypressed-Event
def onKeyPressed(key):
    key = key.keyCode
    
    if (key == KEY_ESC):
        RUNNING = False
        
    elif (key == KEY_RIGHT):
        eva.setHeading(90)
    elif (key == KEY_UP):
        eva.setHeading(0)
    elif (key == KEY_LEFT):
        eva.setHeading(270)
    elif (key == KEY_DOWN):
        eva.setHeading(180)

    if (key == KEY_D):
        joe.setHeading(90)
    elif (key == KEY_W):
        joe.setHeading(0)
    elif (key == KEY_S):
        joe.setHeading(180)
    elif (key == KEY_A):
        joe.setHeading(270)

def detectCrash(turtle):
    crash = False

    # Ab hier setzen wir die Position der detector-Turtle
    x = turtle.getX()
    y = turtle.getY()

    if turtle.heading() == 0:
        y = y + messabstand
    elif turtle.heading() == 90:
        x = x + messabstand
    elif turtle.heading() == 180:
        y = y - messabstand
    elif turtle.heading() == 270:
        x = x - messabstand
    detector.setPos(x, y)

    # Jetzt können wir die Farbmessung vornehmen
    farbmessung = detector.getPixelColor() # Die Farbe am Ort der Detector-Turtle
    if farbmessung == hintergrundsfarbe:
        crash = False
    else:
        crash = True
    return crash
    
tf = gturtle.TurtleFrame(keyPressed = onKeyPressed)

# Erste Spiel-Turtle
eva = gturtle.Turtle(tf)
eva.setColor("green")
eva.setPenColor("green")
eva.setPenWidth(speed)
eva.setPos(115,-50)

# Zweite Spiel-Turtle
joe = gturtle.Turtle(tf)
joe.setColor("red")
joe.setPenColor("red")
joe.setPenWidth(speed)
joe.setPos(-135, -50)

# Unsichtbare Detector-Turtle
detector = gturtle.Turtle(tf)
#detector.ht()
hintergrundsfarbe = detector.getPixelColor()


# Laufzeit-Variabeln, die uns das Leben erleichtern
RUNNING = True

# Der Eventloop. Läuft solange RUNNING == True.
while RUNNING:
    if detectCrash(eva):
        print("eva crashed!")
        eva.label("CRASH!")
        RUNNING = False
    else:
        eva.forward(speed)
    
    if detectCrash(joe):
        print("Joe crashed!")
        joe.label("CRASH!")
        RUNNING = False
    else:
        joe.forward(speed)
