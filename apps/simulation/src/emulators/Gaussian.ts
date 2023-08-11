import P5 from "p5";

import { Emulator } from "../types";

export class Gaussian implements Emulator {
  private x = 0;
  private y = 0;

  constructor(private sk: P5) {
    sk.resizeCanvas(sk.windowWidth / 1.5, sk.windowHeight / 2);
  }

  update() {
    const randomGaussian = this.sk.randomGaussian.bind(this.sk);

    this.x = randomGaussian(this.sk.width / 2, 60);
    this.y = randomGaussian(this.sk.height / 2, 30);
  }

  draw() {
    this.sk.noStroke();
    this.sk.fill(0, 10);
    this.sk.ellipse(this.x, this.y, 20, 20);
  }
}
