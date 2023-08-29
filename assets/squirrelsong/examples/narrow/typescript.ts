class Squirrel {
  private name: string;

  constructor(name) {
    this.name = name;
  }

  greet() {
    console.log(
      `Hola, ${this.name}`,
    );
  }
}

// Greet the squirrel!
const sqrl = new Squirrel(
  "Squeaky",
);
