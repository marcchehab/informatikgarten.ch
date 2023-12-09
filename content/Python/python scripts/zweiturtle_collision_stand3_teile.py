offset = 12

def detectCrash(turtle):
    x = turtle.getX()
    y = turtle.getY()
    if turtle.heading() == 0:
        y = y + offset
    elif turtle.heading() == 90:
        x = x + offset
    elif turtle.heading() == 180:
        y = y - offset
    elif turtle.heading() == 270:
        x = x - offset
    detector.setPos(x, y)
    if detector.getPixelColor() == background:
        crash = False
    else:
        crash = True
    return crash

# Unsichtbare Detector-Turtle
detector = Turtle(tf)
detector.setColor("black")
detector.ht()
background = detector.getPixelColor()

# Der Eventloop. Läuft solange RUNNING == True.
while RUNNING:
    if detectCrash(sara):
        print("Sara crashed!")
        sara.label("CRASH!")
        RUNNING = False
    else:
        sara.forward(speed)
    
    if detectCrash(joe):
        print("Joe crashed!")
        joe.label("CRASH!")
        RUNNING = False
    else:
        joe.forward(speed)
