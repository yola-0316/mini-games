import P5 from "p5";

import { Emulator } from "../types";

export class RandomDistribution implements Emulator {
  private randomCounts: number[] = Array.from({ length: 50 }, () => 0);

  constructor(private sk: P5) {}

  draw() {
    const { int } = this.sk;
    const random = this.sk.random.bind(this.sk);

    const index = int(random(this.randomCounts.length));
    this.randomCounts[index]++;

    this.sk.stroke(0);
    this.sk.fill(127);
    const w = this.sk.width / this.randomCounts.length;

    for (let i = 0; i < this.randomCounts.length; i++) {
      this.sk.rect(
        i * w,
        this.sk.height - this.randomCounts[i],
        w - 1,
        this.randomCounts[i]
      );
    }
  }
}
