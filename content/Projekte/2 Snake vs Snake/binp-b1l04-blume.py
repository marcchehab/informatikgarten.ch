import gturtle

tf = gturtle.TurtleFrame()

eva = gturtle.Turtle(tf)
joe = gturtle.Turtle(tf)

eva.setColor("green")
eva.setPenColor("green")
eva.setPenWidth(3)
eva.setPos(115,-50)
eva.ht()

joe.setColor("red")
joe.setPenColor("red")
joe.setPenWidth(3)
joe.setPos(-115,-50)
joe.ht()

def blatt(turtle, size = 2):
    for j in range(2):
        for i in range(60):
            turtle.forward(size)
            turtle.right(1)
        turtle.right(120)

def blume(turtle, leaves, size = 2):
    for i in range (leaves):
        blatt(turtle, size)
        turtle.right(360/leaves)

blume(joe, 3)
blume(eva, 5, 3)
