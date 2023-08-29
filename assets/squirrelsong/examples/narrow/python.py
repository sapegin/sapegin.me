class Squirrel:
  def __init__(self, name):
    self.name = name

  def greet(self):
    print(
      "Hola, %s" % self.name
    )

# Greet the squirrel!
sqrl = Squirrel(
  'Squeaky'
)
