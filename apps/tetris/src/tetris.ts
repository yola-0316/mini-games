import P5 from "p5";

const cubeSize = 20;

const tetriminoI = [];
const tetriminoO = [];
const tetriminoT = [];
const tetriminoJ = [];
const tetriminoL = [];
const tetriminoS = [];
const tetriminoZ = [];

export class Tetris {
  private x = 0;
  private y = 0;
  private elapsedTime = 0;

  constructor(private sk: P5) {
    sk.createCanvas(cubeSize * 10, cubeSize * 20);
    sk.frameRate(60);
    this.x = cubeSize * 2;
  }

  update() {
    this.elapsedTime += this.sk.deltaTime;

    const movementDistance = cubeSize;

    if (this.elapsedTime >= 1000) {
      this.y += movementDistance;
      this.elapsedTime = 0;
      if (this.y >= this.sk.height - cubeSize) {
        this.y = this.sk.height - cubeSize;
        this.sk.frameRate(0);
      }
    }
  }

  draw() {
    this.sk.background(0);
    this.sk.fill(255);
    this.sk.rect(this.x, this.y, cubeSize, cubeSize);
  }
}
