<?php
class Squirrel {
  private string $name;

  public function __construct(string $name) {
    $this->name = $name;
  }

  public function greet() {
    print "Hola, {$this->name}";
  }
}

// Greet the squirrel!
$sqrl = new Squirrel(
	'Squeaky'
);
?>
