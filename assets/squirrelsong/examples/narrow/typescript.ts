class Squirrel {
  private name: string;

  public constructor(name) {
    this.name = name;
  }

  public greet() {
    console.log(
      `Hola, ${this.name}`,
    );
  }
}

// Greet the squirrel!
const sqrl = new Squirrel(
  "Squeaky",
);
