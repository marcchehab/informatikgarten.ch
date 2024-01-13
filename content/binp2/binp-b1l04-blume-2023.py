import gturtle
    
tf = gturtle.TurtleFrame()

# Erste Spiel-Turtle
eva = gturtle.Turtle(tf)
eva.ht()
eva.setColor("green")
eva.setPenColor("green")
eva.setPenWidth(3)
eva.setPos(115,-50)

# Zweite Spiel-Turtle
joe = gturtle.Turtle(tf)
joe.ht()
joe.setColor("red")
joe.setPenColor("red")
joe.setPenWidth(3)
joe.setPos(-135, -50)


def blatt(turtle, groesse):
    repeat 2:
        repeat 60:
            turtle.forward(groesse)
            turtle.right(1)
        turtle.right(120)

def blume(turtle, blaetter, groesse):
    repeat blaetter:
        blatt(turtle, groesse)
        turtle.right(360/blaetter)

blume(eva, 100, 100)
blume(joe, 20, 5)

