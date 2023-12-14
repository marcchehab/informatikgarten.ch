from gpanel import *

xRed = 200
yRed = 200
xGreen = 300
yGreen = 200
xBlue = 250
yBlue = 300

makeGPanel(Size(501, 501))
window(0, 501, 501, 0)    # y axis downwards
bm = GBitmap(500, 500)
for x in range(500):
  for y in range(500):
      red = green = blue = 0
      if (x - xRed)**2 + (y - yRed)**2 < 16000:
         red = 255
      if (x - xGreen)**2 + (y - yGreen)**2 < 16000:
         green = 255
      if (x - xBlue)**2 + (y - yBlue)**2 < 16000:
         blue = 255
      bm.setPixelColor(x, y, makeColor(red, green, blue))

image(bm, 0, 500)
