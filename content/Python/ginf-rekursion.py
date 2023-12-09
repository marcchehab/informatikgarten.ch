import gturtle

eva = gturtle.Turtle()
s = 30
angle = 30
def ast(depth):
    if depth == 0:
        return
    eva.left(angle)
    eva.forward(s)
    ast(depth-1)
    eva.back(s)
    eva.right(angle)
    eva.forward(s)
    ast(depth-1)
    eva.back(s)
    eva.right(angle)
    eva.forward(s)
    ast(depth-1)
    eva.back(s)
    eva.left(angle)

eva.forward(s)
ast(3)
