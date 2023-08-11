import { Application } from "pixi.js";

// import { Walker } from "../simulation/Walker";
import { RandomDistribution } from "../simulation/RandomDistribution";

export function game() {
  const app = new Application({
    background: "#ffffff",
    resizeTo: window,
  });
  // @ts-ignore
  globalThis.__PIXI_APP__ = app;

  const rootCanvas = app.view;

  // const walker = new Walker(app);
  const rd = new RandomDistribution(app);

  app.ticker.add(() => {
    // walker.update();
    // walker.draw();
    rd.draw();
  });

  return rootCanvas as HTMLCanvasElement;
}
