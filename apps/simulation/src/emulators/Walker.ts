import P5 from "p5";

import { Emulator } from "../types";

export class Walker implements Emulator {
  private x = 0;
  private y = 0;

  constructor(private sk: P5) {
    this.x = sk.width / 2;
    this.y = sk.height / 2;
  }

  update() {
    const { int } = this.sk;
    const random = this.sk.random.bind(this.sk);

    const stepx = int(random(3)) - 1;
    const stepy = int(random(3)) - 1;
    this.x += stepx;
    this.y += stepy;
  }

  draw() {
    this.sk.stroke(0);
    this.sk.point(this.x, this.y);
  }
}
