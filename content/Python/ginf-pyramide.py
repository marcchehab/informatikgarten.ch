import gturtle

eva = gturtle.Turtle()
eva.right(90)
s = 30

def quadrat(seite):
    for i in range(4):
        eva.forward(seite)
        eva.left(90)

def reihe(breite):  
    for i in range(breite):  
        quadrat(s)  
        eva.forward(s)
    eva.back(s*breite)

reihe(4)