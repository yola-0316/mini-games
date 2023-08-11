import { Application, Graphics } from "pixi.js";

import { getRandomInt } from "../utils";

export class RandomDistribution {
  private randomCounts: number[] = Array.from({ length: 200 }, () => 0);

  constructor(private pixiApp: Application) {}

  draw() {
    const index = getRandomInt(this.randomCounts.length);
    this.randomCounts[index]++;

    const g = new Graphics();
    g.beginFill("666");
    const w = this.pixiApp.screen.width / this.randomCounts.length;

    for (let i = 0; i < this.randomCounts.length; i++) {
      g.drawRect(
        i * w,
        this.pixiApp.screen.height - this.randomCounts[i],
        w - 1,
        this.randomCounts[i]
      );
    }

    this.pixiApp.stage.addChild(g);
  }
}
