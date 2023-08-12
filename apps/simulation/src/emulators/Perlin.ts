import P5 from "p5";

import { Emulator } from "../types";

export class Perlin implements Emulator {
  private x = 0;
  private y = 0;
  private tx = 0;
  private ty = 10000;

  constructor(private sk: P5) {
    console.log(sk.pixelDensity());
    this.cloud();
  }

  method1() {
    const noise = this.sk.noise.bind(this.sk);

    this.x = noise(this.tx) * this.sk.width;
    this.y = noise(this.ty) * this.sk.height;

    this.tx += 0.005;
    this.ty += 0.005;

    this.sk.stroke(0);
    this.sk.ellipse(this.x, this.y, 1);
  }

  cloud() {
    const { int } = this.sk;
    const noise = this.sk.noise.bind(this.sk);

    const d = this.sk.pixelDensity();
    this.sk.loadPixels();

    let xoff = 0.0;
    for (let x = 0; x < this.sk.width * d; x++) {
      let yoff = 0.0;
      for (let y = 0; y < this.sk.height * d; y++) {
        const index = 4 * (x + y * this.sk.width * d);
        const bright = int(noise(xoff, yoff) * 255);
        yoff += 0.001;
        this.sk.pixels[index] = 0;
        this.sk.pixels[index + 1] = 0;
        this.sk.pixels[index + 2] = 0;
        this.sk.pixels[index + 3] = bright;
      }
      xoff += 0.001;
    }

    this.sk.updatePixels();
  }

  update() {
    // this.method1();
    // this.cloud();
  }

  draw() {}
}
