import gturtle

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

speed = 20
RUNNING = True

def onKeyPressed(key):
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
    
tf = gturtle.TurtleFrame(keyPressed = onKeyPressed)

sara = gturtle.Turtle(tf)
sara.setColor("green")
sara.setPenColor("green")
sara.setPenWidth(10)
sara.setPos(115,-50)

joe = gturtle.Turtle(tf)
joe.setColor("red")
joe.setPenColor("red")
joe.setPenWidth(10)
joe.setPos(-135, -50)

detector = gturtle.Turtle(tf)
detector.setColor("black")
detector.ht()
detector.setPos(0, 0)
background = detector.getPixelColor()

def clearAhead(turtle):
    x = turtle.getX()
    y = turtle.getY()
    if turtle.heading() == 0:
        y = y + speed
    elif turtle.heading() == 90:
        x = x + speed
    elif turtle.heading() == 180:
        y = y - speed
    elif turtle.heading() == 270:
        x = x - speed
    detector.setPos(x, y)
    if detector.getPixelColor() == background:
        wayisclear = True
    else:
        wayisclear = False
    return wayisclear
    

while RUNNING:
    if clearAhead(sara):
        sara.forward(speed)
    else:
        print("Sara crashed!")
        RUNNING = False
    
    if clearAhead(joe):
        joe.forward(speed)
    else:
        print("Joe crashed!")
        RUNNING = False
