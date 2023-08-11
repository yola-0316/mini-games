import { Application, Graphics } from "pixi.js";

import { getRandomInt } from "../utils";

export class Walker {
  private x = 0;
  private y = 0;

  constructor(private pixiApp: Application) {
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
    const g = new Graphics();
    g.beginFill(0);
    g.drawRect(this.x, this.y, 1, 1);

    this.pixiApp.stage.addChild(g);
  }
}
