import P5 from "p5";

import { Emulator } from "../types";

export class Gaussian implements Emulator {
  private x = 0;

  constructor(private sk: P5) {
    sk.resizeCanvas(sk.windowWidth / 1.5, sk.windowHeight / 15);
  }

  update() {
    const randomGaussian = this.sk.randomGaussian.bind(this.sk);

    const mean = this.sk.width / 2;
    const sd = 100;
    this.x = randomGaussian(mean, sd);
  }

  draw() {
    this.sk.noStroke();
    this.sk.fill(0, 10);
    this.sk.ellipse(this.x, this.sk.height / 2, 20, 20);
  }
}
