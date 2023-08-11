import P5 from "p5";

import { Emulator } from "../types";

export class Walker implements Emulator {
  private x = 0;
  private y = 0;

  constructor(private sk: P5) {
    this.x = sk.width / 2;
    this.y = sk.height / 2;
  }

  method1() {
    const { int } = this.sk;
    const random = this.sk.random.bind(this.sk);

    const stepx = int(random(3)) - 1;
    const stepy = int(random(3)) - 1;
    this.x += stepx;
    this.y += stepy;
  }

  method2() {
    const random = this.sk.random.bind(this.sk);

    const r = random(1);
    if (r < 0.4) {
      this.x++;
    } else if (r < 0.6) {
      this.x--;
    } else if (r < 0.8) {
      this.y++;
    } else {
      this.y--;
    }
  }

  method3() {
    const random = this.sk.random.bind(this.sk);

    const r = random(1);
    if (r < 0.5) {
      this.x += this.sk.mouseX > this.x ? 1 : -1;
      this.y += this.sk.mouseY > this.y ? 1 : -1;
    } else if (r < 0.6) {
      this.x++;
    } else if (r < 0.7) {
      this.x--;
    } else if (r < 0.8) {
      this.y++;
    } else {
      this.y--;
    }
  }

  update() {
    this.method1();
  }

  draw() {
    this.sk.stroke(0);
    this.sk.point(this.x, this.y);
  }
}
