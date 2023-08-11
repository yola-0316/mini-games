import * as PIXI from "pixi.js";

import { getRandomInt } from "../utils";

export function game() {
  const app = new PIXI.Application({
    background: "#ffffff",
    resizeTo: window,
  });
  // @ts-ignore
  globalThis.__PIXI_APP__ = app;

  const rootCanvas = app.view;

  // const walker = new Walker(app);
  const randomCounts = new RandomCounts(app);

  app.ticker.add(() => {
    // walker.update();
    // walker.draw();
    randomCounts.draw();
  });

  return rootCanvas as HTMLCanvasElement;
}

class Walker {
  private x = 0;
  private y = 0;

  constructor(private pixiApp: PIXI.Application) {
    this.x = pixiApp.screen.width / 2;
    this.y = pixiApp.screen.height / 2;
  }

  setup() {}

  update() {
    const stepx = getRandomInt(3) - 1;
    const stepy = getRandomInt(3) - 1;
    this.x += stepx;
    this.y += stepy;
  }

  draw() {
    const g = new PIXI.Graphics();
    g.beginFill(0);
    g.drawRect(this.x, this.y, 1, 1);

    this.pixiApp.stage.addChild(g);
  }
}

class RandomCounts {
  private randomCounts: number[] = Array.from({ length: 20 }, () => 0);

  constructor(private pixiApp: PIXI.Application) {}

  draw() {
    const index = getRandomInt(this.randomCounts.length);
    this.randomCounts[index]++;

    const g = new PIXI.Graphics();
    g.beginFill(127);
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
